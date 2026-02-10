import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  type MediaItem = {
    id: string;
    fileName: string;
    fileUrl: string;
    altText: string | null;
    type: string;
  };

  const assets = (await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } })) as MediaItem[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Media Library</h1>
        <p className="mt-2 text-sm text-haze">Upload and manage assets for the site.</p>
      </div>

      <form
        action="/api/media/upload"
        method="post"
        encType="multipart/form-data"
        className="glass rounded-2xl p-6 grid gap-4 md:grid-cols-2"
      >
        <input type="file" name="file" accept="image/*,application/pdf" className="input" required />
        <input name="altText" placeholder="Alt text" className="input" />
        <button className="w-fit rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-black">Upload</button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <div key={asset.id} className="glass rounded-2xl p-4">
            <p className="text-sm text-white">{asset.fileName}</p>
            <p className="text-xs text-haze">{asset.fileUrl}</p>
            {asset.type.startsWith("image/") ? (
              <Image
                src={asset.fileUrl}
                alt={asset.altText || asset.fileName}
                width={480}
                height={320}
                className="mt-3 h-36 w-full rounded-xl object-cover"
              />
            ) : (
              <p className="mt-3 text-xs text-haze">PDF uploaded</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
