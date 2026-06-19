import type { Lead, TestAnswer, AdminNote, ResourceAccess } from "@prisma/client";

export type LeadWithRelations = Lead & {
  testAnswers: TestAnswer[];
  adminNotes: AdminNote[];
  resourceAccess: ResourceAccess[];
};

export interface CreateLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp?: string;
  company?: string;
  role?: string;
  city?: string;
  profile: string;
  projectType: string;
  projectStage: string;
  projectTiming: string;
  interests: string[];
}

export interface TestAnswerPayload {
  leadId: string;
  answers: {
    questionKey: string;
    answer: string;
  }[];
}

export interface AdminLeadFilters {
  profile?: string;
  status?: string;
  interest?: string;
  dateFrom?: string;
  dateTo?: string;
  minScore?: number;
  maxScore?: number;
  search?: string;
}
