import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { CANONICAL_HOST } from "@/lib/constants";

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (host.startsWith(`www.${CANONICAL_HOST}`)) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  if (host === CANONICAL_HOST && forwardedProto === "http") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith("/admin")) {
    const token = process.env.NEXTAUTH_SECRET
      ? await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
      : null;
    if (!token || token.role !== "ADMIN") {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
