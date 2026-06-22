export interface ChecklistItem {
  id: string;
  text: string;
  tip?: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: ChecklistItem[];
}

export const SMART_HOME_CHECKLIST: ChecklistCategory[] = [
  {
    id: "proyecto",
    title: "Proyecto y planificación",
    icon: "📋",
    description: "Definiciones previas que evitan retrabajos en obra.",
    items: [
      {
        id: "proyecto-1",
        text: "Existe un plano tecnológico integrado al proyecto arquitectónico.",
        tip: "La tecnología debe diseñarse junto con la obra, no después.",
      },
      {
        id: "proyecto-2",
        text: "Está definido el rack o gabinete técnico central con ubicación, ventilación y acceso.",
      },
      {
        id: "proyecto-3",
        text: "Hay cuarto o espacio previsto para equipos de red, domótica y respaldo eléctrico.",
      },
      {
        id: "proyecto-4",
        text: "Se documentaron los sistemas previstos: domótica, seguridad, audio, climatización e IA.",
      },
      {
        id: "proyecto-5",
        text: "El equipo de obra conoce qué canalizaciones y reservas deben respetarse.",
      },
    ],
  },
  {
    id: "canalizaciones",
    title: "Canalizaciones y preinstalación",
    icon: "🔧",
    description: "La base física de un hogar inteligente premium.",
    items: [
      {
        id: "canal-1",
        text: "Hay cañerías vacías hacia todas las zonas tecnológicas relevantes.",
      },
      {
        id: "canal-2",
        text: "Existen canalizaciones independientes para baja tensión, datos y TV/coaxial.",
      },
      {
        id: "canal-3",
        text: "Se previeron registros eléctricos y de datos en ambientes principales.",
      },
      {
        id: "canal-4",
        text: "Hay reserva de conductos para cámaras exteriores e interiores.",
      },
      {
        id: "canal-5",
        text: "Las canalizaciones evitan curvas imposibles y puntos sin acceso futuro.",
      },
      {
        id: "canal-6",
        text: "Se dejó previsión para automatización de cortinas y persianas.",
      },
    ],
  },
  {
    id: "red",
    title: "Red, WiFi y conectividad",
    icon: "📶",
    description: "El WiFi profesional es infraestructura, no un repetidor improvisado.",
    items: [
      {
        id: "red-1",
        text: "Está planificada una red cableada con cable categoría 6 o superior.",
      },
      {
        id: "red-2",
        text: "Hay cableado hacia access points en posiciones centrales por zona.",
        tip: "Un AP bien ubicado rinde mucho más que varios repetidores.",
      },
      {
        id: "red-3",
        text: "Se previó red dedicada para cámaras, domótica y equipos críticos.",
      },
      {
        id: "red-4",
        text: "El rack incluye switch administrable y patch panel ordenado.",
      },
      {
        id: "red-5",
        text: "Hay previsión de fibra o backbone entre plantas o sectores amplios.",
      },
      {
        id: "red-6",
        text: "Se consideró cobertura WiFi en exteriores, garage y áreas de servicio.",
      },
    ],
  },
  {
    id: "electrico",
    title: "Electricidad y respaldo",
    icon: "⚡",
    description: "Un sistema inteligente necesita energía estable y segura.",
    items: [
      {
        id: "elec-1",
        text: "Existe tablero eléctrico con reserva de espacio para automatización.",
      },
      {
        id: "elec-2",
        text: "Está previsto UPS o respaldo para red, rack y sistemas de seguridad.",
      },
      {
        id: "elec-3",
        text: "Las cargas de iluminación automatizada están identificadas en el diseño.",
      },
      {
        id: "elec-4",
        text: "Hay circuitos independientes para climatización, audio y equipos sensibles.",
      },
      {
        id: "elec-5",
        text: "Se consideró protección contra sobretensiones y buena puesta a tierra.",
      },
    ],
  },
  {
    id: "iluminacion",
    title: "Iluminación inteligente",
    icon: "💡",
    description: "La domótica de luz se planifica desde el tablero y las cargas.",
    items: [
      {
        id: "luz-1",
        text: "Están definidos los circuitos de iluminación por escena y por zona.",
      },
      {
        id: "luz-2",
        text: "Hay previsión de dimerización o protocolo compatible con domótica.",
      },
      {
        id: "luz-3",
        text: "Se planificaron pulsadores inteligentes o puntos de comando adecuados.",
      },
      {
        id: "luz-4",
        text: "La iluminación exterior y de circulación está integrada al diseño.",
      },
      {
        id: "luz-5",
        text: "Existen escenas previstas: llegada, noche, ausencia, cine, etc.",
      },
    ],
  },
  {
    id: "climatizacion",
    title: "Climatización inteligente",
    icon: "🌡️",
    description: "Confort, eficiencia y control por zonas.",
    items: [
      {
        id: "clima-1",
        text: "Está previsto control por zonas independientes.",
      },
      {
        id: "clima-2",
        text: "Hay integración entre equipos de frío/calor y sistema domótico.",
      },
      {
        id: "clima-3",
        text: "Se consideraron sensores de temperatura en ambientes clave.",
      },
      {
        id: "clima-4",
        text: "La preinstalación permite automatizar cortinas térmicas o black-out.",
      },
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad y cámaras",
    icon: "🔒",
    description: "Seguridad perimetral integrada al diseño tecnológico.",
    items: [
      {
        id: "seg-1",
        text: "Hay cableado previsto para cámaras exteriores e interiores.",
      },
      {
        id: "seg-2",
        text: "Están definidos los puntos de acceso, perímetro y áreas críticas.",
      },
      {
        id: "seg-3",
        text: "Se previó alimentación para sensores, sirenas y cerraduras inteligentes.",
      },
      {
        id: "seg-4",
        text: "El sistema de alarmas puede integrarse con domótica y notificaciones.",
      },
      {
        id: "seg-5",
        text: "Hay registro de eventos y posibilidad de monitoreo remoto seguro.",
      },
    ],
  },
  {
    id: "audio",
    title: "Audio y entretenimiento",
    icon: "🎵",
    description: "Audio distribuido, home theater y experiencias premium.",
    items: [
      {
        id: "audio-1",
        text: "Están previstas zonas de audio multiroom.",
      },
      {
        id: "audio-2",
        text: "Hay canalización hacia ubicaciones de parlantes en techo o pared.",
      },
      {
        id: "audio-3",
        text: "Se definió un espacio o preinstalación para home theater.",
      },
      {
        id: "audio-4",
        text: "Los equipos de TV/streaming tienen red cableada y no solo WiFi.",
      },
    ],
  },
  {
    id: "energia",
    title: "Energía solar y eficiencia",
    icon: "☀️",
    description: "Aprovechar la energía desde el diseño del proyecto.",
    items: [
      {
        id: "solar-1",
        text: "Se evaluó orientación y sombras para futura instalación solar.",
      },
      {
        id: "solar-2",
        text: "Hay espacio técnico previsto para inversor y equipos asociados.",
      },
      {
        id: "solar-3",
        text: "La domótica puede integrar consumo, cargas y escenarios de ahorro.",
      },
      {
        id: "solar-4",
        text: "Se consideraron cargas inteligentes y horarios de alto consumo.",
      },
    ],
  },
  {
    id: "ia",
    title: "Inteligencia artificial y control por voz",
    icon: "🤖",
    description: "Preparar la vivienda para asistentes y automatizaciones avanzadas.",
    items: [
      {
        id: "ia-1",
        text: "La red y el rack soportan servicios locales o en la nube según el proyecto.",
      },
      {
        id: "ia-2",
        text: "Hay previsión para micrófonos, escenas por voz y automatizaciones.",
      },
      {
        id: "ia-3",
        text: "Los sistemas pueden escalar sin rehacer la instalación base.",
      },
      {
        id: "ia-4",
        text: "Se priorizó privacidad, accesos y respaldo de configuraciones.",
      },
    ],
  },
];

export const CHECKLIST_TOTAL = SMART_HOME_CHECKLIST.reduce(
  (sum, cat) => sum + cat.items.length,
  0
);

export const CHECKLIST_URL = "/checklist";
