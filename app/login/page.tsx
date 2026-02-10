import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage({ searchParams }: { searchParams: { callbackUrl?: string } }) {
  const callbackUrl = searchParams?.callbackUrl || "/admin";

  return (
    <main className="min-h-screen bg-midnight text-white">
      <div className="shell grid min-h-screen place-items-center py-16">
        <div className="glass w-full max-w-md rounded-2xl p-8">
          <h1 className="font-display text-2xl text-white">Admin Login</h1>
          <p className="mt-2 text-sm text-haze">Use your admin credentials to access the CMS.</p>
          <LoginForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </main>
  );
}
