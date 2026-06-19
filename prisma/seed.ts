import { PrismaClient } from "@prisma/client";
import {
  calculateCommercialScore,
  calculateTechnicalScore,
  getLeadTemperature,
} from "../src/lib/scoring";

const prisma = new PrismaClient();

async function main() {
  const leads = [
    {
      firstName: "María",
      lastName: "González",
      email: "maria.gonzalez@estudio.com",
      whatsapp: "+5491123456789",
      company: "Estudio González Arquitectos",
      role: "Socia",
      city: "Buenos Aires",
      profile: "Arquitecto",
      projectType: "Casa",
      projectStage: "En construcción",
      projectTiming: "Ya empezó",
      interests: ["Domótica", "Seguridad", "Energía solar"],
      testAnswers: [
        { key: "rack", answer: "Sí" },
        { key: "canalizaciones", answer: "Sí" },
        { key: "wifi", answer: "No sé" },
        { key: "camaras", answer: "Sí" },
        { key: "ups", answer: "No" },
        { key: "iluminacion", answer: "Sí" },
        { key: "cortinas", answer: "No sé" },
        { key: "climatizacion", answer: "Sí" },
        { key: "seguridad", answer: "Sí" },
        { key: "solar", answer: "No" },
        { key: "audio", answer: "No sé" },
        { key: "ia", answer: "No" },
      ],
    },
    {
      firstName: "Carlos",
      lastName: "Ruiz",
      email: "carlos.ruiz@constructora.com",
      whatsapp: "+5491198765432",
      company: "Ruiz Construcciones",
      role: "Director",
      city: "Córdoba",
      profile: "Constructor",
      projectType: "Barrio privado",
      projectStage: "Obra por comenzar",
      projectTiming: "Menos de 3 meses",
      interests: ["Domótica", "Seguridad", "Inteligencia Artificial", "Redes/WiFi"],
      testAnswers: [
        { key: "rack", answer: "No" },
        { key: "canalizaciones", answer: "Sí" },
        { key: "wifi", answer: "No" },
        { key: "camaras", answer: "No" },
        { key: "ups", answer: "No" },
        { key: "iluminacion", answer: "No sé" },
        { key: "cortinas", answer: "No" },
        { key: "climatizacion", answer: "No" },
        { key: "seguridad", answer: "Sí" },
        { key: "solar", answer: "No sé" },
        { key: "audio", answer: "No" },
        { key: "ia", answer: "No" },
      ],
    },
    {
      firstName: "Laura",
      lastName: "Fernández",
      email: "laura.fernandez@gmail.com",
      whatsapp: null,
      company: null,
      role: null,
      city: "Rosario",
      profile: "Particular",
      projectType: "Casa",
      projectStage: "Proyecto",
      projectTiming: "3 a 6 meses",
      interests: ["Domótica", "Climatización"],
      testAnswers: [
        { key: "rack", answer: "No sé" },
        { key: "canalizaciones", answer: "No" },
        { key: "wifi", answer: "No sé" },
        { key: "camaras", answer: "No" },
        { key: "ups", answer: "No" },
        { key: "iluminacion", answer: "No sé" },
        { key: "cortinas", answer: "No" },
        { key: "climatizacion", answer: "Sí" },
        { key: "seguridad", answer: "No" },
        { key: "solar", answer: "No" },
        { key: "audio", answer: "No" },
        { key: "ia", answer: "No sé" },
      ],
    },
  ];

  for (const data of leads) {
    const { testAnswers, ...leadData } = data;

    const commercialScore = calculateCommercialScore({
      profile: leadData.profile,
      projectType: leadData.projectType,
      projectStage: leadData.projectStage,
      projectTiming: leadData.projectTiming,
      interests: leadData.interests,
      whatsapp: leadData.whatsapp,
    });

    const technicalScore = calculateTechnicalScore(
      testAnswers.map((a) => ({ questionKey: a.key, answer: a.answer }))
    );

    const lead = await prisma.lead.create({
      data: {
        ...leadData,
        commercialScore,
        technicalScore,
        leadTemperature: getLeadTemperature(commercialScore),
        status: "Nuevo",
      },
    });

    const questions: Record<string, string> = {
      rack: "¿Está definido el lugar del rack técnico?",
      canalizaciones: "¿Hay canalizaciones vacías previstas?",
      wifi: "¿Está planificada la red WiFi profesional?",
      camaras: "¿Está prevista una red cableada para cámaras y access points?",
      ups: "¿Está previsto respaldo eléctrico o UPS?",
      iluminacion: "¿Se pensó en domótica para iluminación?",
      cortinas: "¿Se pensó en automatización de cortinas?",
      climatizacion: "¿Se pensó en climatización inteligente?",
      seguridad: "¿Se pensó en seguridad perimetral?",
      solar: "¿Se pensó en energía solar?",
      audio: "¿Se pensó en audio distribuido?",
      ia: "¿Se pensó en asistentes de voz o IA?",
    };

    const scores: Record<string, number> = { Sí: 10, "No sé": 4, No: 0 };

    await prisma.testAnswer.createMany({
      data: testAnswers.map((a) => ({
        leadId: lead.id,
        questionKey: a.key,
        questionText: questions[a.key],
        answer: a.answer,
        score: scores[a.answer] ?? 0,
      })),
    });
  }

  console.log("Seed completado: 3 leads de ejemplo creados.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
