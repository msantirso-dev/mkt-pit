"use client";

import { useEffect, useState } from "react";
import { LeadTable, LeadTableRow } from "@/components/ui/LeadTable";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  INTERESTS,
  LEAD_STATUSES,
  PROFILES,
} from "@/lib/constants";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState("");
  const [status, setStatus] = useState("");
  const [interest, setInterest] = useState("");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchLeads = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (profile) params.set("profile", profile);
    if (status) params.set("status", status);
    if (interest) params.set("interest", interest);
    if (search) params.set("search", search);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);

    const res = await fetch(`/api/leads?${params.toString()}`);
    const data = await res.json();
    setLeads(
      (data.leads ?? []).map(
        (l: {
          id: string;
          createdAt: string;
          firstName: string;
          lastName: string;
          company: string | null;
          profile: string;
          projectType: string;
          projectStage: string;
          projectTiming: string;
          technicalScore: number;
          status: string;
        }) => ({
          id: l.id,
          createdAt: l.createdAt,
          firstName: l.firstName,
          lastName: l.lastName,
          company: l.company,
          profile: l.profile,
          projectType: l.projectType,
          projectStage: l.projectStage,
          projectTiming: l.projectTiming,
          technicalScore: l.technicalScore,
          status: l.status,
        })
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leads</h1>
        <p className="text-muted text-sm mt-1">
          Gestión completa de leads captados
        </p>
      </div>

      <div className="glass-card rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          label="Buscar"
          placeholder="Nombre, email, empresa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          label="Perfil"
          options={PROFILES}
          placeholder="Todos"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
        <Select
          label="Estado"
          options={LEAD_STATUSES}
          placeholder="Todos"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Select
          label="Interés"
          options={INTERESTS}
          placeholder="Todos"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
        <Input
          label="Desde"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <Input
          label="Hasta"
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
        <div className="sm:col-span-2 lg:col-span-3">
          <Button onClick={fetchLeads} loading={loading}>
            Filtrar
          </Button>
        </div>
      </div>

      <LeadTable leads={leads} />
    </div>
  );
}
