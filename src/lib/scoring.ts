import {
  ANSWER_SCORES,
  TEST_QUESTIONS,
  type AnswerOption,
  type Interest,
  type Profile,
  type ProjectStage,
  type ProjectTiming,
  type ProjectType,
} from "./constants";

export interface LeadScoringInput {
  profile: string;
  projectType: string;
  projectStage: string;
  projectTiming: string;
  interests: string[];
  whatsapp?: string | null;
}

export interface TestAnswerInput {
  questionKey: string;
  answer: string;
}

export function getAnswerScore(answer: string): number {
  return ANSWER_SCORES[answer as AnswerOption] ?? 0;
}

export function calculateTechnicalScore(answers: TestAnswerInput[]): number {
  const maxScore = TEST_QUESTIONS.length * 10;
  const total = answers.reduce((sum, item) => sum + getAnswerScore(item.answer), 0);
  return Math.round((total / maxScore) * 100);
}

export function getTechnicalCategory(score: number): string {
  if (score <= 39) return "Proyecto con baja preparación tecnológica";
  if (score <= 69) return "Proyecto con preparación media";
  if (score <= 89) return "Proyecto bien encaminado";
  return "Proyecto altamente preparado";
}

export function getTechnicalSummary(score: number): string {
  if (score <= 39) {
    return "Tu proyecto tiene oportunidades importantes de mejora tecnológica. Con pequeñas decisiones ahora podés evitar costos y retrabajos futuros.";
  }
  if (score <= 69) {
    return "Tu proyecto tiene bases parciales. Con ajustes estratégicos en preinstalación podés elevar significativamente el nivel tecnológico.";
  }
  if (score <= 89) {
    return "Tu proyecto está bien encaminado. Refinando algunos puntos clave podés alcanzar un estándar premium de hogar inteligente.";
  }
  return "Tu proyecto muestra una excelente preparación tecnológica. Estás listo para integrar soluciones de alto nivel con confianza.";
}

export function calculateCommercialScore(input: LeadScoringInput): number {
  let score = 0;
  const profile = input.profile as Profile;
  const projectStage = input.projectStage as ProjectStage;
  const projectTiming = input.projectTiming as ProjectTiming;
  const projectType = input.projectType as ProjectType;
  const interests = input.interests as Interest[];

  if (["Arquitecto", "Constructor", "Desarrollador"].includes(profile)) {
    score += 30;
  }

  if (projectTiming === "Ya empezó" || projectTiming === "Menos de 3 meses") {
    score += 25;
  }

  if (projectStage === "Obra por comenzar" || projectStage === "En construcción") {
    score += 20;
  }

  if (interests.includes("Domótica")) score += 15;
  if (interests.includes("Seguridad")) score += 15;
  if (interests.includes("Energía solar")) score += 15;
  if (interests.includes("Inteligencia Artificial")) score += 15;

  if (["Barrio privado", "Hotel", "Edificio", "Casa"].includes(projectType)) {
    score += 10;
  }

  if (input.whatsapp && input.whatsapp.trim().length > 0) {
    score += 10;
  }

  return score;
}

export function getLeadTemperature(commercialScore: number): string {
  if (commercialScore <= 39) return "Frío";
  if (commercialScore <= 69) return "Medio";
  if (commercialScore <= 100) return "Caliente";
  return "Muy caliente";
}
