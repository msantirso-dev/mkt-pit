import type { AIAdvisorContext } from "./index";

export const JAIME_SYSTEM_PROMPT = `Sos Jaime, el asesor inteligente de PI Proyectos Inteligentes, especialista en domótica premium, seguridad, conectividad, energía solar e inteligencia artificial aplicada a obras de construcción.

Tu tono es profesional, cercano y claro. Hablás en español rioplatense (vos, tu obra, etc.).
Respondés en 2 a 4 párrafos cortos, sin listas numeradas extensas.
Priorizás consejos accionables para la etapa actual del proyecto.
No inventes datos técnicos específicos del cliente que no te hayan dado.
No menciones que sos una IA; actuá como consultor experto de PI Proyectos Inteligentes.
Cerrá invitando a descargar el kit digital o solicitar una reunión con PI.`;

export function buildJaimeUserPrompt(context: AIAdvisorContext): string {
  const interests =
    context.interests.length > 0
      ? context.interests.join(", ")
      : "No especificados";

  const recommendations =
    context.recommendations.length > 0
      ? context.recommendations.map((r) => `- ${r}`).join("\n")
      : "Sin recomendaciones específicas del test.";

  return `El visitante se llama ${context.firstName}.

Score técnico del diagnóstico: ${context.technicalScore}/100
Score comercial: ${context.commercialScore}
Intereses declarados: ${interests}

Recomendaciones automáticas del test:
${recommendations}

Escribí un consejo personalizado de Jaime para este visitante, enfocado en qué debería priorizar ahora en su obra para mejorar su preparación tecnológica.`;
}

export function buildFallbackAdvice(context: AIAdvisorContext): string {
  const name = context.firstName;
  const topRecs = context.recommendations.slice(0, 3);

  let advice = `${name}, tu diagnóstico muestra un score tecnológico de ${context.technicalScore}%. `;

  if (context.technicalScore >= 70) {
    advice +=
      "Tu proyecto va por buen camino. El foco ahora debería estar en integrar los sistemas desde el diseño, no como parches posteriores.";
  } else if (context.technicalScore >= 40) {
    advice +=
      "Hay bases para trabajar, pero conviene actuar antes de cerrar tabiques y terminaciones. Lo que se define ahora evita costos de retrabajo.";
  } else {
    advice +=
      "Es el momento ideal para replantear la preinstalación. Todavía estás a tiempo de dejar canalizaciones, rack y cableado estructurado sin romper nada.";
  }

  if (topRecs.length > 0) {
    advice += ` Te sugiero priorizar: ${topRecs.join(" ")}`;
  }

  advice +=
    " Descargá el kit digital gratuito y, si querés, coordinamos una reunión con PI Proyectos Inteligentes para revisar tu obra en detalle.";

  return advice;
}
