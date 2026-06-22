"use client";

import { Button } from "./Button";

interface PodcastPlayerProps {
  title?: string;
  description?: string;
  url?: string;
  showDownload?: boolean;
}

const DEFAULT_URL = "/resources/podcast.m4a";

export function PodcastPlayer({
  title = "Podcast: ¿Cada inteligente?",
  description = "Podcast exclusivo BATEV — PI Proyectos Inteligentes",
  url = DEFAULT_URL,
  showDownload = true,
}: PodcastPlayerProps) {
  return (
    <div className="glass-card rounded-2xl p-6 border border-pi-red/20">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl">🎙️</span>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted mt-1">{description}</p>
        </div>
      </div>

      <audio
        controls
        preload="metadata"
        className="w-full mb-4 rounded-lg"
        src={url}
      >
        Tu navegador no soporta audio HTML5.
      </audio>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {showDownload && (
          <a href={url} download="podcast-cada-inteligente.m4a">
            <Button variant="outline" size="sm">
              Descargar podcast
            </Button>
          </a>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-electric hover:underline break-all"
        >
          {url}
        </a>
      </div>
    </div>
  );
}
