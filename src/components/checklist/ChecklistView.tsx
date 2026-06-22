"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CHECKLIST_TOTAL,
  SMART_HOME_CHECKLIST,
  type ChecklistCategory,
} from "@/lib/checklist";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "pi-checklist-progress";

function loadChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function ChecklistView() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChecked(loadChecked());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    }
  }, [checked, mounted]);

  const completedCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reset = () => {
    setChecked({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const categoryProgress = (category: ChecklistCategory) => {
    const done = category.items.filter((item) => checked[item.id]).length;
    return { done, total: category.items.length };
  };

  if (!mounted) {
    return <p className="text-muted text-center py-12">Cargando checklist...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-2xl p-6 border border-success/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-sm text-muted">Tu progreso</p>
            <p className="text-2xl font-bold text-success">
              {completedCount} / {CHECKLIST_TOTAL} ítems
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={reset}>
            Reiniciar checklist
          </Button>
        </div>
        <ProgressBar
          value={completedCount}
          max={CHECKLIST_TOTAL}
          label="Preparación del proyecto"
        />
        <p className="text-xs text-muted mt-3">
          Marcá cada punto según tu obra. El progreso se guarda en este dispositivo.
        </p>
      </div>

      {SMART_HOME_CHECKLIST.map((category) => {
        const { done, total } = categoryProgress(category);
        return (
          <section key={category.id} className="glass-card rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold">{category.title}</h2>
                  <p className="text-sm text-muted mt-1">{category.description}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-electric whitespace-nowrap">
                {done}/{total}
              </span>
            </div>

            <ul className="space-y-3">
              {category.items.map((item) => {
                const isChecked = !!checked[item.id];
                return (
                  <li key={item.id}>
                    <label
                      className={[
                        "flex gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors",
                        isChecked
                          ? "border-success/40 bg-success/10"
                          : "border-white/10 bg-white/5 hover:border-white/20",
                      ].join(" ")}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(item.id)}
                        className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-success focus:ring-success shrink-0"
                      />
                      <span className="min-w-0">
                        <span
                          className={`text-sm block ${
                            isChecked ? "text-muted line-through" : "text-white"
                          }`}
                        >
                          {item.text}
                        </span>
                        {item.tip && (
                          <span className="text-xs text-muted block mt-1">
                            💡 {item.tip}
                          </span>
                        )}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <div className="glass-card rounded-2xl p-6 text-center border border-pi-red/20">
        <h3 className="font-semibold text-lg mb-2">¿Querés validar tu proyecto?</h3>
        <p className="text-sm text-muted mb-5">
          Hacé el diagnóstico gratuito de Jaime Smart Advisor y recibí un score
          personalizado con recomendaciones para tu obra.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/diagnostico">
            <Button size="lg">Comenzar diagnóstico</Button>
          </Link>
          <a href="mailto:contacto@piproyectos.com?subject=Consulta%20Checklist%20-%20PI%20Proyectos">
            <Button variant="outline" size="lg">
              Consultar con PI
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
