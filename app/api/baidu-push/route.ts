import { NextResponse } from "next/server";

import { SITE_URL } from "@/lib/constants";
import { ZH_PATHS } from "@/lib/i18n/zh-index";
import { INDEXABLE_PATHS } from "@/lib/seo/page-seo";

export const dynamic = "force-dynamic";

const base = SITE_URL.replace(/\/$/, "");

/**
 * Baidu real-time URL submission ("主动推送").
 *
 * Baidu discovers new pages far more slowly than Google does; the active push
 * API is the fastest route into its index and is capped per site per day.
 *
 * Setup:
 *   1. Verify the site in Baidu Ziyuan (ziyuan.baidu.com).
 *   2. Copy the push token from 资源提交 → 普通收录 → API 提交.
 *   3. Set BAIDU_PUSH_TOKEN in the environment.
 *   4. POST to /api/baidu-push with header `x-push-secret: <SEO_PUSH_SECRET>`,
 *      optionally { "urls": ["/zh", "/zh/tours"] } to push specific paths.
 *
 * Run it after publishing new Chinese pages, not on a tight schedule — Baidu
 * penalises repeatedly pushing unchanged URLs by cutting the daily quota.
 */
export async function POST(request: Request) {
  const token = process.env.BAIDU_PUSH_TOKEN;
  const secret = process.env.SEO_PUSH_SECRET;

  if (!token) {
    return NextResponse.json({ error: "BAIDU_PUSH_TOKEN is not configured" }, { status: 501 });
  }
  if (!secret || request.headers.get("x-push-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  let paths: string[] = [...ZH_PATHS, ...INDEXABLE_PATHS];
  try {
    const body = (await request.json()) as { urls?: unknown };
    if (Array.isArray(body?.urls)) {
      paths = body.urls.filter((value): value is string => typeof value === "string" && value.startsWith("/"));
    }
  } catch {
    // No body: push the full known set.
  }

  const urls = Array.from(new Set(paths)).map((path) => `${base}${path}`);
  const host = new URL(base).host;

  const response = await fetch(`http://data.zz.baidu.com/urls?site=${encodeURIComponent(host)}&token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: urls.join("\n")
  });

  const result = await response.text();
  return NextResponse.json({ submitted: urls.length, baiduResponse: result }, { status: response.ok ? 200 : 502 });
}
