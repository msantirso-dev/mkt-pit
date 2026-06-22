"use client";

import Link from "next/link";
import { Button } from "./Button";

interface ResourceCardProps {
  title: string;
  description: string;
  type: "pdf" | "audio" | "meeting" | "page";
  url: string;
  onAccess?: () => void;
}

const typeIcons: Record<ResourceCardProps["type"], string> = {
  pdf: "📄",
  audio: "🎧",
  meeting: "📅",
  page: "✅",
};

export function ResourceCard({
  title,
  description,
  type,
  url,
  onAccess,
}: ResourceCardProps) {
  const handleOpen = () => {
    onAccess?.();
    window.open(url, "_blank");
  };

  const isAudio = type === "audio";
  const isPage = type === "page";

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{typeIcons[type]}</span>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted mt-1">{description}</p>
        </div>
      </div>

      {isAudio && (
        <audio controls preload="metadata" className="w-full rounded-lg" src={url}>
          Tu navegador no soporta audio HTML5.
        </audio>
      )}

      <div className="flex flex-col gap-2">
        {isPage ? (
          <Link href={url} onClick={() => onAccess?.()}>
            <Button variant="outline" size="sm" fullWidth>
              Abrir checklist interactivo
            </Button>
          </Link>
        ) : (
          <Button
            variant={type === "meeting" ? "success" : "outline"}
            size="sm"
            fullWidth
            onClick={handleOpen}
          >
            {type === "meeting"
              ? "Solicitar reunión"
              : isAudio
                ? "Abrir en nueva pestaña"
                : "Descargar / Acceder"}
          </Button>
        )}
        {!isPage && type !== "meeting" && (
          <a
            href={url}
            download={isAudio ? undefined : true}
            onClick={() => onAccess?.()}
            className="text-xs text-electric hover:underline break-all text-center"
          >
            {url}
          </a>
        )}
      </div>
    </div>
  );
}
