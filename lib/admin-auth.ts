import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session?.user?.email || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function getAdminSession() {
  if (!process.env.NEXTAUTH_SECRET) return null;

  try {
    const session = await getServerSession(authOptions);
    return session?.user?.email && session.user.role === "ADMIN" ? session : null;
  } catch (error) {
    console.error("admin_session_error", error);
    return null;
  }
}
