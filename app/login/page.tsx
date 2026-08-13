import { LoginForm } from "@/components/admin/LoginForm";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { safeAdminCallback } from "@/lib/safe-url";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin Login | Sharing Heli",
  alternates: { canonical: null },
  robots: { index: false, follow: false }
};

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <main className="min-h-screen bg-midnight text-white">
      <div className="shell grid min-h-screen place-items-center py-16">
        <div className="login-panel w-full max-w-md rounded-lg p-8">
          <BrandLogo imageClassName="brand-logo-inverse h-12" priority />
          <h1 className="mt-7 font-display text-2xl text-white">Admin Login</h1>
          <p className="mt-2 text-sm text-haze">Use your admin credentials to access the CMS.</p>
          <LoginForm callbackUrl={safeAdminCallback(callbackUrl)} />
        </div>
      </div>
    </main>
  );
}
