import Image from "next/image";
import Link from "next/link";

type PiLogoSize = "sm" | "md" | "lg" | "xl";

interface PiLogoProps {
  size?: PiLogoSize;
  href?: string | null;
  showText?: boolean;
  showUrl?: boolean;
  align?: "left" | "center";
  className?: string;
  priority?: boolean;
}

const iconSizeMap: Record<PiLogoSize, { width: number; height: number; className: string }> = {
  sm: { width: 40, height: 40, className: "h-8 w-8" },
  md: { width: 48, height: 48, className: "h-10 w-10 sm:h-11 sm:w-11" },
  lg: { width: 64, height: 64, className: "h-14 w-14 sm:h-16 sm:w-16" },
  xl: { width: 88, height: 88, className: "h-20 w-20 sm:h-24 sm:w-24" },
};

const textSizeMap: Record<
  PiLogoSize,
  { line: string; url: string; gap: string }
> = {
  sm: { line: "text-[9px] leading-[1.1]", url: "text-[8px]", gap: "gap-2" },
  md: { line: "text-[10px] sm:text-[11px] leading-[1.1]", url: "text-[9px]", gap: "gap-2.5" },
  lg: { line: "text-xs sm:text-sm leading-[1.1]", url: "text-[10px]", gap: "gap-3" },
  xl: { line: "text-sm sm:text-base leading-[1.1]", url: "text-xs", gap: "gap-4" },
};

function PiLogoText({
  size,
  showUrl,
  align,
}: {
  size: PiLogoSize;
  showUrl: boolean;
  align: "left" | "center";
}) {
  const styles = textSizeMap[size];

  return (
    <div
      className={[
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
      ].join(" ")}
    >
      <span className={`font-bold uppercase tracking-[0.12em] text-white ${styles.line}`}>
        Proyectos
      </span>
      <span className={`font-bold uppercase tracking-[0.12em] text-white ${styles.line}`}>
        Inteligentes
      </span>
      {showUrl && (
        <span className={`text-white/65 lowercase tracking-normal mt-1 ${styles.url}`}>
          pit.com.ar
        </span>
      )}
    </div>
  );
}

export function PiLogo({
  size = "md",
  href = "/",
  showText = true,
  showUrl = false,
  align = "left",
  className = "",
  priority = false,
}: PiLogoProps) {
  const icon = iconSizeMap[size];
  const styles = textSizeMap[size];

  const content = (
    <span
      className={[
        "inline-flex items-center",
        showText ? styles.gap : "",
        align === "center" ? "flex-col" : "flex-row",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src="/logo-pi-icon.png"
        alt="PI"
        width={icon.width}
        height={icon.height}
        className={`${icon.className} shrink-0`}
        priority={priority}
      />
      {showText && (
        <PiLogoText size={size} showUrl={showUrl} align={align} />
      )}
    </span>
  );

  if (href === null) {
    return content;
  }

  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-flex shrink-0">
      {content}
    </Link>
  );
}

export function PiIcon({
  size = "md",
  className = "",
  priority = false,
}: {
  size?: PiLogoSize;
  className?: string;
  priority?: boolean;
}) {
  const icon = iconSizeMap[size];

  return (
    <Image
      src="/logo-pi-icon.png"
      alt="PI Proyectos Inteligentes"
      width={icon.width}
      height={icon.height}
      className={`${icon.className} ${className}`}
      priority={priority}
    />
  );
}
