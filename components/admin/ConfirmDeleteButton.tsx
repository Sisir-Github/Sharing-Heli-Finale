"use client";

import { Trash2 } from "lucide-react";

/**
 * Submit button for a destructive server action. Deletions here are permanent
 * and cannot be undone from the admin, so the click is gated behind a native
 * confirm rather than firing straight through.
 */
export function ConfirmDeleteButton({
  formAction,
  confirmMessage,
  label = "Delete",
  className = ""
}: {
  formAction: (formData: FormData) => void | Promise<void>;
  confirmMessage: string;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      formAction={formAction}
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) event.preventDefault();
      }}
      className={
        className ||
        "inline-flex items-center gap-2 rounded-lg border border-rose-400/50 px-4 py-2.5 text-sm font-semibold text-rose-200 transition-colors hover:bg-rose-400/10"
      }
    >
      <Trash2 size={15} /> {label}
    </button>
  );
}
