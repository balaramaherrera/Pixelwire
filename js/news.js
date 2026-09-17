// Módulo central de noticias de RicardoInfoTv.
// Unifica las 7 noticias "de fábrica" con las que el usuario va creando,
// y con las ediciones que se le hacen a cualquiera de ellas.

const NEWS_OVERRIDES_KEY = "ricardoinfotv-cards";
const CUSTOM_NEWS_KEY = "ricardoinfotv-custom-news";

const defaultCards = {
  "main-story": {
    title: "Análisis: cómo evoluciona el equilibrio de poder entre las grandes potencias",
    category: "Exclusiva",
    author: "Redacción RicardoInfoTv",
    time: "Hace 12 min",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1400&auto=format&fit=crop",
    content: "El tablero geopolítico global se mueve más rápido que en las últimas décadas, con nuevas alianzas comerciales y militares tomando forma en distintas regiones.\n\nEn este análisis repasamos las tendencias que marcarán la agenda internacional en los próximos meses y qué significan para los mercados y la ciudadanía.",
    section: "analisis"
  },
  "side-story-1": {
    title: "Guía rápida: cómo leer los indicadores económicos clave del mes",
    category: "Bono y banca",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    content: "Inflación, tasas de interés y tipo de cambio son los datos que más se repiten en la conversación económica, pero no siempre queda claro cómo interpretarlos en conjunto.\n\nEsta guía rápida explica, en términos simples, qué mide cada indicador y por qué le importa a cualquier persona, no solo a los inversores.",
    section: "bono"
  },
  "side-story-2": {
    title: "Rumores apuntan a una nueva ronda de negociaciones diplomáticas",
    category: "Política y geopolítica",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop",
    content: "Distintas fuentes diplomáticas señalan que podría convocarse una nueva ronda de conversaciones entre los bloques regionales en las próximas semanas.\n\nAunque ningún gobierno lo ha confirmado oficialmente, el tema ya domina la agenda de varios encuentros multilaterales previstos para este trimestre.",
    section: "analisis"
  },
  "news-1": {
    title: "Bancos centrales evalúan ajustes en la política monetaria",
    category: "Bono y banca",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&auto=format&fit=crop",
    content: "Varios bancos centrales analizan modificar sus tasas de referencia ante el comportamiento reciente de la inflación y el consumo.\n\nLos analistas esperan mayor claridad en las próximas reuniones de política monetaria, que podrían marcar el rumbo de los mercados durante el resto del año.",
    section: "bono"
  },
  "news-2": {
    title: "Opinión: los retos de la gobernabilidad en un mundo multipolar",
    category: "Análisis y opinión",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
    content: "La fragmentación del poder global obliga a los gobiernos a repensar sus estrategias de alianzas y negociación.\n\nEn esta columna se examinan los principales desafíos que enfrentan los líderes actuales para sostener consensos internos mientras navegan un escenario internacional cada vez más impredecible.",
    section: "opinion"
  },
  "news-3": {
    title: "Claves para entender el impacto cultural de la nueva integración regional",
    category: "Cultura y economía",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop",
    content: "Los acuerdos de integración regional no solo mueven aranceles y aduanas: también cambian el consumo cultural de millones de personas.\n\nRepasamos cómo la circulación de bienes y servicios está transformando la producción artística y mediática de la región.",
    section: "cultura"
  },
  "news-4": {
    title: "Cumbre internacional confirma fecha para el próximo encuentro",
    category: "Política y geopolítica",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop",
    content: "La organización de la cumbre confirmó la fecha y sede del próximo encuentro internacional, que reunirá a delegaciones de distintos países.\n\nSe espera una amplia cobertura mediática, tanto de la agenda oficial como de los encuentros bilaterales paralelos.",
    section: "analisis"
  }
};

// IDs de noticias por defecto que se muestran fijas en cada sección.
const defaultSectionMap = {
  analisis: ["main-story", "side-story-2", "news-4"],
  opinion: ["news-2"],
  bono: ["side-story-1", "news-1"],
  cultura: ["news-3"]
};

function isDefaultCard(id) {
  return Boolean(defaultCards[id]);
}

function getCardOverrides() {
  try {
    return JSON.parse(localStorage.getItem(NEWS_OVERRIDES_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function getCustomCards() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_NEWS_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function saveCustomCards(cards) {
  localStorage.setItem(CUSTOM_NEWS_KEY, JSON.stringify(cards));
}

// Devuelve una noticia (de fábrica o creada por el usuario) con sus
// ediciones ya aplicadas, o null si no existe.
function getCard(id) {
  if (isDefaultCard(id)) {
    const overrides = getCardOverrides();
    return { ...defaultCards[id], ...(overrides[id] || {}), id };
  }
  const custom = getCustomCards();
  return custom[id] ? { ...custom[id], id } : null;
}

// Crea una noticia nueva y la guarda. Devuelve su id.
function addCustomCard(data) {
  const custom = getCustomCards();
  const id = `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  custom[id] = { ...data, createdAt: Date.now() };
  saveCustomCards(custom);
  return id;
}

// Guarda cambios sobre una noticia existente, sea de fábrica o creada por el usuario.
function saveCardEdit(id, data) {
  if (isDefaultCard(id)) {
    const overrides = getCardOverrides();
    overrides[id] = data;
    localStorage.setItem(NEWS_OVERRIDES_KEY, JSON.stringify(overrides));
  } else {
    const custom = getCustomCards();
    if (custom[id]) {
      custom[id] = { ...custom[id], ...data };
      saveCustomCards(custom);
    }
  }
}

// Ids de todas las noticias (de fábrica + creadas) que pertenecen a una sección.
function getSectionCardIds(sectionId) {
  const ids = [...(defaultSectionMap[sectionId] || [])];
  const custom = getCustomCards();
  Object.entries(custom).forEach(([id, card]) => {
    if (card.section === sectionId) ids.push(id);
  });
  return ids;
}

// Ids de las noticias creadas por el usuario, más recientes primero.
function getCustomCardIds() {
  const custom = getCustomCards();
  return Object.keys(custom).sort((a, b) => (custom[b].createdAt || 0) - (custom[a].createdAt || 0));
}
