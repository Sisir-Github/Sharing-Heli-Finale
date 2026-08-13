import { AdminLayout } from "@/components/admin/AdminLayout";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Sharing Heli Admin",
  alternates: { canonical: null },
  robots: { index: false, follow: false }
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
