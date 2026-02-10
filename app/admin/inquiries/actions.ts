"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function updateInquiryStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !status) return;

  await prisma.inquiryLead.update({
    where: { id },
    data: { status }
  });

  revalidatePath("/admin/inquiries");
  return;
}
