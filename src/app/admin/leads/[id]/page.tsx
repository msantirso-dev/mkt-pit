"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ScoreCard } from "@/components/ui/ScoreCard";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LEAD_STATUSES } from "@/lib/constants";
import {
  getTechnicalCategory,
  getTechnicalSummary,
} from "@/lib/scoring";
import { generateRecommendations } from "@/lib/recommendations";

interface LeadDetail {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string | null;
  company: string | null;
  role: string | null;
  city: string | null;
  profile: string;
  projectType: string;
  projectStage: string;
  projectTiming: string;
  interests: string[];
  technicalScore: number;
  commercialScore: number;
  leadTemperature: string;
  status: string;
  notes: string | null;
  testAnswers: {
    questionKey: string;
    questionText: string;
    answer: string;
    score: number;
  }[];
  adminNotes: {
    id: string;
    note: string;
    createdAt: string;
  }[];
}

export default function AdminLeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/leads`)
      .then((r) => r.json())
      .then((data) => {
        const found = (data.leads ?? []).find(
          (l: LeadDetail) => l.id === leadId
        );
        if (found) {
          setLead({
            ...found,
            interests: found.interests as string[],
          });
          setStatus(found.status);
          setInternalNotes(found.notes ?? "");
        }
        setLoading(false);
      });
  }, [leadId]);

  const updateStatus = async () => {
    setSaving(true);
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "updateStatus", leadId, status }),
    });
    setLead((prev) => (prev ? { ...prev, status } : prev));
    setSaving(false);
  };

  const addNote = async (e: FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addNote", leadId, note }),
    });
    const data = await res.json();
    if (data.note) {
      setLead((prev) =>
        prev
          ? { ...prev, adminNotes: [data.note, ...prev.adminNotes] }
          : prev
      );
      setNote("");
    }
    setSaving(false);
  };

  const saveInternalNotes = async () => {
    setSaving(true);
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updateNotes",
        leadId,
        notes: internalNotes,
      }),
    });
    setSaving(false);
  };

  if (loading) {
    return <p className="text-muted">Cargando...</p>;
  }

  if (!lead) {
    return <p className="text-warning">Lead no encontrado</p>;
  }

  const recommendations = generateRecommendations(
    lead.testAnswers.map((a) => ({
      questionKey: a.questionKey,
      answer: a.answer,
    }))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {lead.firstName} {lead.lastName}
          </h1>
          <p className="text-muted text-sm mt-1">
            Registrado el {new Date(lead.createdAt).toLocaleString("es-AR")}
          </p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScoreCard
          title="Score técnico"
          score={lead.technicalScore}
          category={getTechnicalCategory(lead.technicalScore)}
          subtitle={getTechnicalSummary(lead.technicalScore)}
        />
        <div className="glass-card rounded-2xl p-6">
          <p className="text-sm text-muted mb-2">Score comercial</p>
          <p className="text-5xl font-bold text-electric">{lead.commercialScore}</p>
          <p className="mt-3 text-lg font-medium">{lead.leadTemperature}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Datos personales">
          <InfoRow label="Email" value={lead.email} />
          <InfoRow label="WhatsApp" value={lead.whatsapp ?? "—"} />
          <InfoRow label="Ciudad" value={lead.city ?? "—"} />
        </Section>
        <Section title="Empresa">
          <InfoRow label="Empresa" value={lead.company ?? "—"} />
          <InfoRow label="Cargo" value={lead.role ?? "—"} />
          <InfoRow label="Perfil" value={lead.profile} />
        </Section>
        <Section title="Proyecto">
          <InfoRow label="Tipo" value={lead.projectType} />
          <InfoRow label="Etapa" value={lead.projectStage} />
          <InfoRow label="Tiempo de obra" value={lead.projectTiming} />
        </Section>
        <Section title="Intereses">
          <div className="flex flex-wrap gap-2">
            {lead.interests.map((i) => (
              <span
                key={i}
                className="rounded-full bg-electric/10 border border-electric/20 px-3 py-1 text-xs"
              >
                {i}
              </span>
            ))}
          </div>
        </Section>
      </div>

      {lead.testAnswers.length > 0 && (
        <Section title="Respuestas del test">
          <div className="space-y-3">
            {lead.testAnswers.map((a) => (
              <div
                key={a.questionKey}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-white/5 px-4 py-3"
              >
                <p className="text-sm">{a.questionText}</p>
                <span className="text-sm font-medium text-electric whitespace-nowrap">
                  {a.answer} ({a.score} pts)
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {recommendations.length > 0 && (
        <Section title="Recomendaciones generadas">
          <ul className="space-y-2">
            {recommendations.map((r, idx) => (
              <li key={idx} className="text-sm text-muted flex gap-2">
                <span className="text-electric">→</span> {r}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold">Estado comercial</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={LEAD_STATUSES}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex-1"
          />
          <Button onClick={updateStatus} loading={saving}>
            Actualizar estado
          </Button>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold">Notas internas</h3>
        <textarea
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-electric focus:outline-none"
          placeholder="Notas generales sobre el lead..."
        />
        <Button onClick={saveInternalNotes} loading={saving} size="sm">
          Guardar notas
        </Button>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold">Agregar nota</h3>
        <form onSubmit={addNote} className="flex flex-col sm:flex-row gap-3">
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Nueva nota..."
            className="flex-1"
          />
          <Button type="submit" loading={saving}>
            Agregar
          </Button>
        </form>
        {lead.adminNotes?.length > 0 && (
          <div className="space-y-3 mt-4">
            {lead.adminNotes.map((n) => (
              <div key={n.id} className="rounded-xl bg-white/5 px-4 py-3">
                <p className="text-sm">{n.note}</p>
                <p className="text-xs text-muted mt-1">
                  {new Date(n.createdAt).toLocaleString("es-AR")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
