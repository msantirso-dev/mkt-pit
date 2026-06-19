import { NextRequest, NextResponse } from "next/server";
import { DIGITAL_RESOURCES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return NextResponse.json({ resources: DIGITAL_RESOURCES });
}

export async function POST(request: NextRequest) {
  try {
    const { leadId, resourceName } = (await request.json()) as {
      leadId: string;
      resourceName: string;
    };

    if (!leadId || !resourceName) {
      return NextResponse.json(
        { error: "leadId y resourceName requeridos" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      return NextResponse.json({ error: "Lead no encontrado" }, { status: 404 });
    }

    const access = await prisma.resourceAccess.create({
      data: {
        leadId,
        resourceName,
      },
    });

    return NextResponse.json({ access }, { status: 201 });
  } catch (error) {
    console.error("Error logging resource access:", error);
    return NextResponse.json(
      { error: "Error al registrar acceso" },
      { status: 500 }
    );
  }
}
