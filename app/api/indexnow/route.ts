import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
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

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        host: "sharingheli.com",
        key,
        keyLocation: keyLocation || `https://sharingheli.com/${key}.txt`,
        urlList: [payload.url]
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
