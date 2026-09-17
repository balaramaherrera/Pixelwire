const defaultSections = {
  analisis: {
    title: "Política y geopolítica",
    description: "Las noticias más importantes de política internacional y las tensiones que redefinen el mapa global.",
    color: "#D92640"
  },
  opinion: {
    title: "Análisis y opinión",
    description: "Miradas y columnas de opinión sobre los hechos que marcan la agenda política y social.",
    color: "#6C5AB3"
  },
  bono: {
    title: "Bono y banca",
    description: "Mercados de deuda, bancos centrales y todo lo que mueve al sistema financiero.",
    color: "#2380B5"
  },
  cultura: {
    title: "Cultura y economía",
    description: "El cruce entre la economía global y los fenómenos culturales que la acompañan.",
    color: "#2D8C72"
  }
};

function getSections() {
  try {
    return { ...defaultSections, ...JSON.parse(localStorage.getItem("ricardoinfotv-sections") || "{}") };
  } catch (error) {
    return defaultSections;
  }
}

function saveSection(sectionId, section) {
  const sections = getSections();
  sections[sectionId] = section;
  localStorage.setItem("ricardoinfotv-sections", JSON.stringify(sections));
}
