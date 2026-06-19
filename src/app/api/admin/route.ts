import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  getAdminCookieName,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/auth";
import { LEAD_STATUSES } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "login") {
      const { password } = body;
      if (!verifyAdminPassword(password)) {
        return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
      }

      const cookieStore = await cookies();
      cookieStore.set(getAdminCookieName(), "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json({ success: true });
    }

    if (action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete(getAdminCookieName());
      return NextResponse.json({ success: true });
    }

    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (action === "updateStatus") {
      const { leadId, status } = body;
      if (!leadId || !status) {
        return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
      }
      if (!(LEAD_STATUSES as readonly string[]).includes(status)) {
        return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
      }

      const lead = await prisma.lead.update({
        where: { id: leadId },
        data: { status },
      });

      return NextResponse.json({ lead });
    }

    if (action === "addNote") {
      const { leadId, note } = body;
      if (!leadId || !note?.trim()) {
        return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
      }

      const adminNote = await prisma.adminNote.create({
        data: {
          leadId,
          note: note.trim(),
        },
      });

      return NextResponse.json({ note: adminNote }, { status: 201 });
    }

    if (action === "updateNotes") {
      const { leadId, notes } = body;
      if (!leadId) {
        return NextResponse.json({ error: "leadId requerido" }, { status: 400 });
      }

      const lead = await prisma.lead.update({
        where: { id: leadId },
        data: { notes: notes?.trim() || null },
      });

      return NextResponse.json({ lead });
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const leads = await prisma.lead.findMany({
      include: { testAnswers: true },
    });

    const leadsToday = leads.filter((l) => l.createdAt >= today).length;
    const hotLeads = leads.filter(
      (l) => l.leadTemperature === "Caliente" || l.leadTemperature === "Muy caliente"
    ).length;
    const architects = leads.filter((l) => l.profile === "Arquitecto").length;
    const builders = leads.filter((l) => l.profile === "Constructor").length;
    const developers = leads.filter((l) => l.profile === "Desarrollador").length;
    const startingSoon = leads.filter(
      (l) =>
        l.projectTiming === "Ya empezó" || l.projectTiming === "Menos de 3 meses"
    ).length;

    const countInterest = (interest: string) =>
      leads.filter((l) => (l.interests as string[]).includes(interest)).length;

    return NextResponse.json({
      metrics: {
        totalLeads: leads.length,
        leadsToday,
        hotLeads,
        architects,
        builders,
        developers,
        startingSoon,
        domotica: countInterest("Domótica"),
        seguridad: countInterest("Seguridad"),
        solar: countInterest("Energía solar"),
        ia: countInterest("Inteligencia Artificial"),
      },
    });
  } catch (error) {
    console.error("Admin metrics error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
