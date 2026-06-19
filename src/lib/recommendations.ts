import { TEST_QUESTIONS } from "./constants";

export interface TestAnswerForRecommendation {
  questionKey: string;
  answer: string;
}

export function generateRecommendations(
  answers: TestAnswerForRecommendation[]
): string[] {
  const recommendations: string[] = [];

  for (const question of TEST_QUESTIONS) {
    const answer = answers.find((item) => item.questionKey === question.key);
    if (answer && (answer.answer === "No" || answer.answer === "No sé")) {
      recommendations.push(question.recommendation);
    }
  }

  return recommendations;
}
