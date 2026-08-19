"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Star, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

export type LibraryImage = { id: string; fileUrl: string; altText: string | null };

type ImagePickerProps = {
  /** Submitted as a comma-separated list, matching the existing server action. */
  name: string;
  defaultValue?: string[];
  library?: LibraryImage[];
  /** false keeps a single image and submits a bare path instead of a list. */
  multiple?: boolean;
};

/**
 * Upload-or-pick image manager for the admin editors. Replaces the raw
 * "comma separated URLs" text field: images can be uploaded directly, chosen
 * from the media library, reordered, and removed. The first image is the one
 * used as the card/hero image, which the UI states explicitly.
 */
export function ImagePicker({ name, defaultValue = [], library = [], multiple = true }: ImagePickerProps) {
  const [images, setImages] = useState<string[]>(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showLibrary, setShowLibrary] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  function add(url: string) {
    if (!multiple) {
      setImages([url]);
      return;
    }
    setImages((current) => (current.includes(url) ? current : [...current, url]));
  }

  function remove(index: number) {
    setImages((current) => current.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    setImages((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");

    try {
      for (const file of Array.from(files).slice(0, multiple ? files.length : 1)) {
        const body = new FormData();
        body.append("file", file);
        body.append("altText", file.name.replace(/\.[^.]+$/, ""));

        const response = await fetch("/api/media/upload", { method: "POST", body });
        const result = await response.json();
        if (!response.ok || !result.ok) throw new Error(result.error || "Upload failed");
        add(result.fileUrl);
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setBusy(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  const unusedLibrary = library.filter((asset) => !images.includes(asset.fileUrl));

  return (
    <div className="md:col-span-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
        >
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {busy ? "Uploading" : "Upload images"}
        </button>

        {library.length ? (
          <button
            type="button"
            onClick={() => setShowLibrary((open) => !open)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ImagePlus size={14} />
            {showLibrary ? "Hide library" : "Choose from library"}
          </button>
        ) : null}

        <span className="text-xs text-haze">
          {!images.length
            ? multiple
              ? "No images yet"
              : "No photo yet"
            : multiple
              ? `${images.length} image${images.length > 1 ? "s" : ""} · first is the main photo`
              : "1 photo"}
        </span>
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={multiple}
        className="hidden"
        onChange={(event) => upload(event.target.files)}
      />

      {error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}

      {showLibrary && unusedLibrary.length ? (
        <div className="mt-3 grid max-h-56 grid-cols-3 gap-2 overflow-y-auto rounded-xl border border-white/10 p-2 sm:grid-cols-5">
          {unusedLibrary.map((asset) => (
            <button
              key={asset.id}
              type="button"
              onClick={() => add(asset.fileUrl)}
              title={asset.altText || asset.fileUrl}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 transition-colors hover:border-gold"
            >
              <Image src={asset.fileUrl} alt={asset.altText || ""} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      {images.length ? (
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((url, index) => (
            <li key={`${url}-${index}`} className="relative overflow-hidden rounded-xl border border-white/10">
              <div className="relative aspect-[4/3] bg-black/30">
                <Image src={url} alt="" fill sizes="160px" className="object-cover" />
                {multiple && index === 0 ? (
                  <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-md bg-gold px-1.5 py-0.5 text-[10px] font-semibold text-black">
                    <Star size={10} /> Main
                  </span>
                ) : null}
              </div>
              <div className="flex items-center justify-between gap-1 p-1.5">
                <div className={multiple ? "flex gap-1" : "hidden"}>
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label="Move earlier"
                    className="rounded-md border border-white/15 p-1 text-white/70 hover:bg-white/10 disabled:opacity-30"
                  >
                    <ArrowLeft size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === images.length - 1}
                    aria-label="Move later"
                    className="rounded-md border border-white/15 p-1 text-white/70 hover:bg-white/10 disabled:opacity-30"
                  >
                    <ArrowRight size={12} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label="Remove image"
                  className="rounded-md border border-rose-400/40 p-1 text-rose-300 hover:bg-rose-400/10"
                >
                  <X size={12} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Multi mode keeps the comma-separated contract the tour action expects;
          single mode submits just the one path. */}
      <input type="hidden" name={name} value={multiple ? images.join(", ") : images[0] || ""} />
    </div>
  );
}
