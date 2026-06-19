export const PROFILES = [
  "Arquitecto",
  "Constructor",
  "Desarrollador",
  "Integrador",
  "Electricista",
  "Particular",
  "Otro",
] as const;

export const PROJECT_TYPES = [
  "Casa",
  "Edificio",
  "Barrio privado",
  "Hotel",
  "Oficina",
  "Local comercial",
  "Industria",
  "Otro",
] as const;

export const PROJECT_STAGES = [
  "Idea",
  "Proyecto",
  "Obra por comenzar",
  "En construcción",
  "Terminando",
  "Vivienda habitada",
] as const;

export const PROJECT_TIMINGS = [
  "Ya empezó",
  "Menos de 3 meses",
  "3 a 6 meses",
  "Más de 6 meses",
  "No definido",
] as const;

export const INTERESTS = [
  "Domótica",
  "Seguridad",
  "Cámaras",
  "Redes/WiFi",
  "Energía solar",
  "Audio",
  "Home Theater",
  "Streaming",
  "Inteligencia Artificial",
  "Automatización de cortinas",
  "Climatización",
  "Control por voz",
] as const;

export const LEAD_STATUSES = [
  "Nuevo",
  "Contactar",
  "Contactado",
  "Reunión agendada",
  "Propuesta enviada",
  "Cliente",
  "Descartado",
] as const;

export const TEST_QUESTIONS = [
  {
    key: "rack",
    text: "¿Está definido el lugar del rack técnico?",
    recommendation:
      "Definir un rack técnico central antes de avanzar con instalaciones.",
  },
  {
    key: "canalizaciones",
    text: "¿Hay canalizaciones vacías previstas?",
    recommendation:
      "Prever cañerías vacías puede evitar roturas y sobrecostos futuros.",
  },
  {
    key: "wifi",
    text: "¿Está planificada la red WiFi profesional?",
    recommendation:
      "El WiFi debe diseñarse como infraestructura, no resolverse con repetidores.",
  },
  {
    key: "camaras",
    text: "¿Está prevista una red cableada para cámaras y access points?",
    recommendation:
      "Conviene dejar cableado previsto para cámaras aunque se instalen más adelante.",
  },
  {
    key: "ups",
    text: "¿Está previsto respaldo eléctrico o UPS?",
    recommendation:
      "Un sistema inteligente necesita respaldo eléctrico para red, seguridad y control.",
  },
  {
    key: "iluminacion",
    text: "¿Se pensó en domótica para iluminación?",
    recommendation:
      "La iluminación automatizada debe planificarse desde el tablero y las cargas.",
  },
  {
    key: "cortinas",
    text: "¿Se pensó en automatización de cortinas?",
    recommendation:
      "Las cortinas motorizadas requieren alimentación y previsión estructural.",
  },
  {
    key: "climatizacion",
    text: "¿Se pensó en climatización inteligente?",
    recommendation:
      "El control térmico inteligente mejora confort y eficiencia energética.",
  },
  {
    key: "seguridad",
    text: "¿Se pensó en seguridad perimetral?",
    recommendation:
      "La seguridad perimetral debe integrarse al diseño tecnológico general.",
  },
  {
    key: "solar",
    text: "¿Se pensó en energía solar?",
    recommendation:
      "La energía solar se aprovecha mejor cuando se deja prevista desde el proyecto.",
  },
  {
    key: "audio",
    text: "¿Se pensó en audio distribuido?",
    recommendation:
      "El audio distribuido requiere cableado, ubicación de parlantes y zonas.",
  },
  {
    key: "ia",
    text: "¿Se pensó en asistentes de voz o IA?",
    recommendation:
      "Las viviendas nuevas deberían quedar preparadas para asistentes inteligentes.",
  },
] as const;

export const ANSWER_OPTIONS = ["Sí", "No", "No sé"] as const;

export const ANSWER_SCORES: Record<(typeof ANSWER_OPTIONS)[number], number> = {
  Sí: 10,
  "No sé": 4,
  No: 0,
};

export const DIGITAL_RESOURCES = [
  {
    id: "libro",
    title: "De la cueva al hogar inteligente",
    description: "Libro digital sobre evolución del hogar inteligente",
    type: "pdf" as const,
    url: "/resources/libro.pdf",
  },
  {
    id: "audiolibro",
    title: "Audiolibro",
    description: "Escuchá la guía completa en formato audio",
    type: "audio" as const,
    url: "/resources/audiolibro.mp3",
  },
  {
    id: "podcast",
    title: "Podcast exclusivo BATEV",
    description: "Contenido exclusivo de la feria BATEV",
    type: "audio" as const,
    url: "/resources/podcast.mp3",
  },
  {
    id: "checklist",
    title: "Checklist profesional para viviendas inteligentes",
    description: "Lista de verificación para profesionales",
    type: "pdf" as const,
    url: "/resources/checklist.pdf",
  },
  {
    id: "canalizaciones",
    title: "Guía de canalizaciones recomendadas",
    description: "Mejores prácticas de preinstalación",
    type: "pdf" as const,
    url: "/resources/canalizaciones.pdf",
  },
  {
    id: "errores",
    title: "Guía de errores frecuentes en obras",
    description: "Evitá los errores más comunes en obra",
    type: "pdf" as const,
    url: "/resources/errores.pdf",
  },
  {
    id: "reunion",
    title: "Solicitar reunión",
    description: "Agendá una consultoría con PI Proyectos Inteligentes",
    type: "meeting" as const,
    url: "mailto:contacto@piproyectos.com?subject=Consulta%20BATEV%20-%20Jaime%20Smart%20Advisor",
  },
] as const;

export type Profile = (typeof PROFILES)[number];
export type ProjectType = (typeof PROJECT_TYPES)[number];
export type ProjectStage = (typeof PROJECT_STAGES)[number];
export type ProjectTiming = (typeof PROJECT_TIMINGS)[number];
export type Interest = (typeof INTERESTS)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type AnswerOption = (typeof ANSWER_OPTIONS)[number];
