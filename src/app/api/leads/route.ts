import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateCommercialScore, getLeadTemperature } from "@/lib/scoring";
import type { CreateLeadPayload } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateLeadPayload;

    if (
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.profile ||
      !body.projectType ||
      !body.projectStage ||
      !body.projectTiming
    ) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const commercialScore = calculateCommercialScore({
      profile: body.profile,
      projectType: body.projectType,
      projectStage: body.projectStage,
      projectTiming: body.projectTiming,
      interests: body.interests ?? [],
      whatsapp: body.whatsapp,
    });

    const lead = await prisma.lead.create({
      data: {
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        email: body.email.trim().toLowerCase(),
        whatsapp: body.whatsapp?.trim() || null,
        company: body.company?.trim() || null,
        role: body.role?.trim() || null,
        city: body.city?.trim() || null,
        profile: body.profile,
        projectType: body.projectType,
        projectStage: body.projectStage,
        projectTiming: body.projectTiming,
        interests: body.interests ?? [],
        commercialScore,
        leadTemperature: getLeadTemperature(commercialScore),
      },
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Error al crear el lead" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profile = searchParams.get("profile");
    const status = searchParams.get("status");
    const interest = searchParams.get("interest");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const minScore = searchParams.get("minScore");
    const maxScore = searchParams.get("maxScore");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (profile) where.profile = profile;
    if (status) where.status = status;

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        (where.createdAt as Record<string, Date>).gte = new Date(dateFrom);
      }
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        (where.createdAt as Record<string, Date>).lte = end;
      }
    }

    if (minScore || maxScore) {
      where.technicalScore = {};
      if (minScore) {
        (where.technicalScore as Record<string, number>).gte = parseInt(minScore);
      }
      if (maxScore) {
        (where.technicalScore as Record<string, number>).lte = parseInt(maxScore);
      }
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ];
    }

    let leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        testAnswers: true,
        adminNotes: { orderBy: { createdAt: "desc" } },
        resourceAccess: true,
      },
    });

    if (interest) {
      leads = leads.filter((lead) => {
        const interests = lead.interests as string[];
        return interests.includes(interest);
      });
    }

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error listing leads:", error);
    return NextResponse.json(
      { error: "Error al listar leads" },
      { status: 500 }
    );
  }
}
