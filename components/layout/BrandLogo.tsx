import Image from "next/image";

import { cn } from "@/lib/utils";
import { safeLocalImageSource } from "@/lib/safe-url";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  src?: string | null;
  priority?: boolean;
};

export function BrandLogo({ className, imageClassName, src, priority = false }: BrandLogoProps) {
  const imageSrc = safeLocalImageSource(src, "/images/sharing-heli-logo.png");

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={imageSrc}
        alt="Sharing Heli Nepal"
        width={600}
        height={200}
        sizes="(max-width: 640px) 168px, 190px"
        className={cn("brand-logo-image h-12 w-auto object-contain", imageClassName)}
        priority={priority}
      />
    </span>
  );
}
