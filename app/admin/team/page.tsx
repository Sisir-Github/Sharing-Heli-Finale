import { createTeamMember, deleteTeamMember, updateTeamMember } from "@/app/admin/team/actions";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { ImagePicker, type LibraryImage } from "@/components/admin/ImagePicker";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Member = {
  id: string;
  name: string;
  title: string;
  role: string;
  photo: string | null;
  order: number;
  visible: boolean;
};

function MemberFields({ member, library }: { member?: Member; library: LibraryImage[] }) {
  return (
    <>
      <input name="name" defaultValue={member?.name} placeholder="Full name" className="input" required />
      <input name="title" defaultValue={member?.title} placeholder="Role title, e.g. Flight Desk Lead" className="input" required />
      <input
        name="role"
        defaultValue={member?.role}
        placeholder="What they handle, e.g. Route planning & confirmations"
        className="input md:col-span-2"
        required
      />
      <input name="order" type="number" min="0" defaultValue={member?.order ?? 0} placeholder="Display order" className="input" required />
      <label className="flex items-center gap-2 text-sm text-haze">
        <input type="checkbox" name="visible" defaultChecked={member?.visible ?? true} /> Show on the website
      </label>
      <div className="md:col-span-2">
        <p className="mb-2 text-xs text-haze">Photo — portrait crops work best (4:5). Without one, initials are shown.</p>
        <ImagePicker
          name="photo"
          multiple={false}
          defaultValue={member?.photo ? [member.photo] : []}
          library={library}
        />
      </div>
    </>
  );
}

export default async function AdminTeamPage() {
  const [members, library] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }) as Promise<Member[]>,
    prisma.mediaAsset.findMany({
      where: { type: { startsWith: "image/" } },
      orderBy: { createdAt: "desc" },
      take: 60,
      select: { id: true, fileUrl: true, altText: true }
    }) as Promise<LibraryImage[]>
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Flight desk team</h1>
        <p className="mt-2 text-sm text-haze">
          Shown in &ldquo;Meet Our Flight Desk&rdquo; on the homepage and the About page.
        </p>
      </div>

      <form action={createTeamMember} className="glass grid gap-3 rounded-2xl p-6 md:grid-cols-2">
        <p className="text-sm font-semibold text-white md:col-span-2">Add a team member</p>
        <MemberFields library={library} />
        <button className="w-fit rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black md:col-span-2">
          Add member
        </button>
      </form>

      <div className="grid gap-4">
        {members.length ? (
          members.map((member) => (
            <form key={member.id} action={updateTeamMember} className="glass grid gap-3 rounded-2xl p-4 md:grid-cols-2">
              <input type="hidden" name="id" value={member.id} />
              <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                <p className="text-sm font-semibold text-white">{member.name}</p>
                <span className="rounded-md border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-haze">
                  {member.title}
                </span>
                {!member.photo ? (
                  <span className="rounded-md border border-amber-400/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-amber-300">
                    No photo — showing initials
                  </span>
                ) : null}
                {!member.visible ? (
                  <span className="rounded-md border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-haze">
                    Hidden
                  </span>
                ) : null}
              </div>

              <MemberFields member={member} library={library} />

              <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                <button className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white">Save</button>
                <ConfirmDeleteButton
                  formAction={deleteTeamMember}
                  label="Remove"
                  confirmMessage={`Remove ${member.name} from the team section?`}
                  className="rounded-xl border border-rose-400/50 px-4 py-2 text-sm text-rose-200"
                />
              </div>
            </form>
          ))
        ) : (
          <p className="rounded-2xl border border-white/10 p-6 text-sm text-haze">
            No team members yet. The section is hidden on the website until you add one.
          </p>
        )}
      </div>
    </div>
  );
}
