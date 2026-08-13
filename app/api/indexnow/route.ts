import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { SITE_URL } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.INDEXNOW_KEY;
  const keyLocation = process.env.INDEXNOW_KEY_LOCATION;

  if (!key) {
    return NextResponse.json(
      {
        success: false,
        error: "IndexNow is not configured. Set INDEXNOW_KEY to enable submission."
      },
      { status: 503 }
    );
  }

  let payload: { url?: string };

  try {
    payload = (await request.json()) as { url?: string };
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request payload"
      },
      { status: 400 }
    );
  }

  if (!payload.url) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing url"
      },
      { status: 400 }
    );
  }

  let submittedUrl: URL;
  try {
    submittedUrl = new URL(payload.url);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid url" }, { status: 400 });
  }

  if (submittedUrl.origin !== new URL(SITE_URL).origin) {
    return NextResponse.json({ success: false, error: "URL must use the canonical site host" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        host: "sharingheli.com",
        key,
        keyLocation: keyLocation || `${SITE_URL.replace(/\/$/, "")}/indexnow-key.txt`,
        urlList: [submittedUrl.toString()]
      })
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `IndexNow submission failed with status ${response.status}`
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error("indexnow_error", error);
    return NextResponse.json(
      {
        success: false,
        error: "IndexNow submission failed"
      },
      { status: 500 }
    );
  }
}
