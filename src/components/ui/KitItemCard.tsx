"use client";

import { PODCAST_URL } from "@/lib/constants";
import { Button } from "./Button";

export interface KitItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

interface KitItemCardProps {
  item: KitItem;
}

export function KitItemCard({ item }: KitItemCardProps) {
  if (item.id === "podcast") {
    return (
      <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 sm:col-span-2 lg:col-span-3 border border-pi-red/20">
        <div className="flex items-start gap-4">
          <span className="text-2xl">{item.icon}</span>
          <div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-muted mt-1">{item.desc}</p>
          </div>
        </div>

        <audio
          controls
          preload="metadata"
          className="w-full rounded-lg"
          src={PODCAST_URL}
        >
          Tu navegador no soporta audio HTML5.
        </audio>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <a href={PODCAST_URL} download="podcast-cada-inteligente.m4a">
            <Button variant="outline" size="sm">
              Descargar podcast
            </Button>
          </a>
          <a
            href={PODCAST_URL}
            className="text-sm text-electric hover:underline break-all"
          >
            {PODCAST_URL}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
      <span className="text-2xl">{item.icon}</span>
      <div>
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-muted mt-1">{item.desc}</p>
      </div>
    </div>
  );
}
