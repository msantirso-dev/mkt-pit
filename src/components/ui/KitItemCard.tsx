"use client";

import Link from "next/link";
import { CHECKLIST_URL } from "@/lib/checklist";
import { LIBRO_URL, PODCAST_URL } from "@/lib/constants";
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
  if (item.id === "libro") {
    return (
      <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 sm:col-span-2 border border-electric/20">
        <div className="flex items-start gap-4">
          <span className="text-2xl">{item.icon}</span>
          <div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-muted mt-1">{item.desc}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <a href={LIBRO_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              Leer / descargar PDF
            </Button>
          </a>
          <a
            href={LIBRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-electric hover:underline break-all"
          >
            {LIBRO_URL}
          </a>
        </div>
      </div>
    );
  }

  if (item.id === "checklist") {
    return (
      <Link
        href={CHECKLIST_URL}
        className="glass-card rounded-2xl p-5 flex flex-col gap-4 border border-success/20 hover:border-success/40 transition-colors group"
      >
        <div className="flex items-start gap-4">
          <span className="text-2xl">{item.icon}</span>
          <div>
            <h3 className="font-medium group-hover:text-success transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-muted mt-1">{item.desc}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="pointer-events-none">
          Ver checklist interactivo →
        </Button>
      </Link>
    );
  }

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
