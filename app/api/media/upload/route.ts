import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { randomUUID } from "crypto";

import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

function hasValidSignature(buffer: Buffer, mimeType: string) {
  if (mimeType === "image/jpeg") {
    return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (mimeType === "image/png") {
    return buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  if (mimeType === "image/webp") {
    return buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
  }
  if (mimeType === "image/avif") {
    const brand = buffer.length >= 12 ? buffer.toString("ascii", 8, 12) : "";
    return buffer.toString("ascii", 4, 8) === "ftyp" && (brand === "avif" || brand === "avis");
  }
  return false;
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: false, error: "Media storage is temporarily unavailable" }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const altText = String(formData.get("altText") || "");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file uploaded" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type) || file.size <= 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { ok: false, error: "Upload a JPEG, PNG, WebP, or AVIF image up to 8 MB." },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  if (!hasValidSignature(buffer, file.type)) {
    return NextResponse.json({ ok: false, error: "The uploaded file is not a valid image." }, { status: 400 });
  }
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const extensionByType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif"
  };
  const fileName = `${randomUUID()}.${extensionByType[file.type]}`;
  const filePath = path.join(uploadsDir, fileName);
  const fileUrl = `/uploads/${fileName}`;

  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(filePath, buffer, { flag: "wx" });
    await prisma.mediaAsset.create({
      data: {
        fileName,
        fileUrl,
        altText: altText.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 180) || null,
        type: file.type,
        size: buffer.length
      }
    });
  } catch (error) {
    await fs.unlink(filePath).catch(() => undefined);
    console.error("media_upload_error", error);
    return NextResponse.json({ ok: false, error: "Media upload failed" }, { status: 500 });
  }

  return NextResponse.json(
    { ok: true, fileUrl },
    { headers: { "Cache-Control": "no-store" } }
  );
}
