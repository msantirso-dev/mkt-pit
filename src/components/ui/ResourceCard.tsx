"use client";

import { Button } from "./Button";

interface ResourceCardProps {
  title: string;
  description: string;
  type: "pdf" | "audio" | "meeting";
  url: string;
  onAccess?: () => void;
}

const typeIcons: Record<ResourceCardProps["type"], string> = {
  pdf: "📄",
  audio: "🎧",
  meeting: "📅",
};

export function ResourceCard({
  title,
  description,
  type,
  url,
  onAccess,
}: ResourceCardProps) {
  const handleClick = () => {
    onAccess?.();
    if (type === "meeting") {
      window.open(url, "_blank");
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{typeIcons[type]}</span>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted mt-1">{description}</p>
        </div>
      </div>
      <Button
        variant={type === "meeting" ? "success" : "outline"}
        size="sm"
        fullWidth
        onClick={handleClick}
      >
        {type === "meeting" ? "Solicitar reunión" : "Descargar / Acceder"}
      </Button>
    </div>
  );
}
