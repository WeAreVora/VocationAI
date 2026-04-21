"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
type Career = {
  name: string; match: string; projection: string; summary: string;
  image: string; badge: string; duration: string; salary: string;
  queEstudia: string; queHace: string; universities: string[];
};
type Dimension = {
  icon: string; color: string; bg: string; badge: string;
  badgeColor: string; title: string; desc: string;
};
type RoadmapPhase = {
  step: string; color: string; title: string;
  items: { title: string; desc: string }[];
  extras: { icon: string; label: string }[];
};
type InformeData = {
  emoji: string; title: string; titleHighlight: string;
  fromColor: string; toColor: string;
  tagline: string; quote: string;
  dimensions: Dimension[]; aiAnalysis: string[]; workStyle: string[];
  careers: Career[]; roadmap: [RoadmapPhase, RoadmapPhase]; closing: string;
};

const UNIVERSITY_URLS: Record<string, string> = {
  "ITBA (Argentina)": "https://www.itba.edu.ar/",
  "Tec de Monterrey (México)": "https://tec.mx/",
  "PUC (Chile)": "https://www.uc.cl/",
  "UBA (Argentina)": "https://www.uba.ar/",
  "UNAM (México)": "https://www.unam.mx/",
  "U. de Chile": "https://www.uchile.cl/",
  "UTN (Argentina)": "https://utn.edu.ar/",
  "IPN (México)": "https://www.ipn.mx/",
  "UAI (Chile)": "https://www.uai.cl/",
  "UNSAM (Argentina)": "https://www.unsam.edu.ar/",
  "ITAM (México)": "https://www.itam.mx/",
  "U. de los Andes (Colombia)": "https://uniandes.edu.co/",
  "CENPAT–CONICET (Argentina)": "https://www.conicet.gov.ar/centros-cientificos-tecnologicos/cct-conicet-cenpat/",
  "U. de Concepción (Chile)": "https://www.udec.cl/",
  "UP (Argentina)": "https://www.palermo.edu/",
  "IBERO (México)": "https://ibero.mx/",
  "UBA – FADU (Argentina)": "https://www.fadu.uba.ar/",
  "Duoc UC (Chile)": "https://www.duoc.cl/",
  "Da Vinci (Argentina)": "https://davinci.edu.ar/",
  "Centro de Diseño (México)": "https://centro.edu.mx/",
  "ARCOS (Chile)": "https://www.arcos.cl/",
  "UCA (Argentina)": "https://www.uca.edu.ar/",
  "UNLP (Argentina)": "https://unlp.edu.ar/",
  "UCEMA (Argentina)": "https://ucema.edu.ar/",
  "ITESM (México)": "https://tec.mx/",
};

function getUniversityHref(university: string): string {
  return UNIVERSITY_URLS[university] ?? `https://www.google.com/search?q=${encodeURIComponent(university)}`;
}

// ─── Profile Data ─────────────────────────────────────────────────────────────
const INFORMES: Record<string, InformeData> = {
  "innovador-tech": {
    emoji: "💻", title: "El Innovador", titleHighlight: "Tecnológico",
    fromColor: "from-primary", toColor: "to-tertiary",
    tagline: "Tu mente construye el futuro: convertís problemas complejos en soluciones digitales que escalan.",
    quote: "Tras procesar más de 450 puntos de datos, el sistema identifica un perfil builder de alto rendimiento. Combinás rigor analítico con una capacidad innata para visualizar sistemas completos. No te conformás con que algo funcione — necesitás que funcione elegantemente, a escala, y mejor que antes.",
    dimensions: [
      { icon: "psychology", color: "text-primary", bg: "bg-primary/10", badge: "R-I-E", badgeColor: "text-primary", title: "Código Holland: Investigativo-Realista", desc: "Predominancia marcada en el tipo Investigativo con fuerte componente Realista. Preferís problemas concretos con soluciones verificables. El tipo Emprendedor emerge cuando liderás técnicamente." },
      { icon: "calculate", color: "text-tertiary", bg: "bg-tertiary/10", badge: "94%", badgeColor: "text-tertiary", title: "Gardner: Lógico-Matemático", desc: "Tu inteligencia dominante es Lógico-Matemática con alta presencia Visual-Espacial. Visualizás estructuras de datos, flujos de sistemas y arquitecturas complejas de forma casi natural." },
      { icon: "model_training", color: "text-secondary", bg: "bg-secondary/10", badge: "Convergente", badgeColor: "text-secondary", title: "Kolb: Estilo Convergente", desc: "Aprendés combinando la conceptualización abstracta con la experimentación activa. Sos más efectivo cuando podés probar hipótesis directamente en código o prototipos funcionales." },
      { icon: "star", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Logro", badgeColor: "text-surface-tint", title: "Schwartz: Valor de Logro", desc: "Tu motivación central es demostrar competencia y alcanzar estándares de excelencia. Esto, combinado con alta Autodirección, te hace ideal para roles técnicos con alta autonomía." },
    ],
    aiAnalysis: [
      "Tu perfil tecnológico es de los más definidos que el sistema ha procesado. Combinás una capacidad analítica en el percentil 94 con una orientación concreta hacia la construcción: no te quedás en la teoría. Las respuestas indican que tenés lo que los reclutadores tech llaman 'product sense' natural — la capacidad de pensar en el usuario final mientras optimizás el código.",
      "Un patrón especialmente interesante: mostrás alta tolerancia a la ambigüedad técnica (hallazgo poco común), lo que significa que prosperás en entornos de startups o proyectos con requisitos cambiantes. Tu perfil sugiere que serás más exitoso en organizaciones que valoren la velocidad de iteración sobre la planificación exhaustiva.",
    ],
    workStyle: ["Entornos async con métricas claras de output.", "Stack moderno: TypeScript, Python, cloud nativo.", "Alta autonomía para elegir el cómo de cada solución.", "Sprints cortos con demos reales, no reuniones de status."],
    careers: [
      { name: "Ingeniería de Software", match: "98%", projection: "10/10", summary: "Construís los sistemas digitales que mueven el mundo.", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "5 años", salary: "$3k – $5k USD/mes", queEstudia: "Algoritmos, estructuras de datos, arquitectura de software y computación en la nube.", queHace: "Diseña, construye y escala aplicaciones utilizadas por millones de personas.", universities: ["ITBA (Argentina)", "Tec de Monterrey (México)", "PUC (Chile)"] },
      { name: "Ciencia de Datos e IA", match: "94%", projection: "10/10", summary: "Extraés inteligencia de datos masivos para guiar decisiones críticas.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", badge: "Tendencia", duration: "4–5 años", salary: "$2.5k – $4.5k USD/mes", queEstudia: "Estadística, machine learning, Python/R y visualización de datos.", queHace: "Construye modelos predictivos y comunica insights que transforman estrategias de negocio.", universities: ["UBA (Argentina)", "UNAM (México)", "U. de Chile"] },
      { name: "Ciberseguridad", match: "89%", projection: "9/10", summary: "Protegés infraestructura digital ante amenazas globales.", image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=600&q=80", badge: "Escasez Global", duration: "4–5 años", salary: "$3.5k – $6k USD/mes", queEstudia: "Redes, criptografía, ethical hacking y forense digital.", queHace: "Audita sistemas, responde incidentes de seguridad y diseña arquitecturas de defensa.", universities: ["UTN (Argentina)", "IPN (México)", "UAI (Chile)"] },
    ],
    roadmap: [
      { step: "1", color: "bg-primary", title: "Ahora (Colegio / Pre-uni)", items: [{ title: "Fundamentos de programación", desc: "Aprendé Python con CS50P de Harvard (gratuito en edX). Hacé un proyecto real en 30 días." }, { title: "Matemática como herramienta", desc: "Álgebra lineal y estadística básica son tus mejores aliados. Khan Academy tiene el camino completo." }], extras: [{ icon: "code", label: "CS50P — Harvard (Free)" }, { icon: "school", label: "Khan Academy: Math" }] },
      { step: "2", color: "bg-tertiary", title: "Antes de Matricularte", items: [{ title: "Primer proyecto en GitHub", desc: "Un portfolio con 2–3 proyectos reales vale más que cualquier certificado introductorio." }, { title: "Participá en un hackathon", desc: "Conocés la comunidad y testás tus habilidades bajo presión real en 48 horas." }], extras: [{ icon: "hub", label: "GitHub — Portafolio" }, { icon: "groups", label: "Hackathon universitario" }] },
    ],
    closing: "Los sistemas más importantes del mundo los están construyendo personas con tu perfil. Tu desafío no es llegar — es elegir en qué problema vale la pena trabajar. El primer commit siempre es el más importante.",
  },

  "cientifico-analitico": {
    emoji: "🔬", title: "El Científico", titleHighlight: "Analítico",
    fromColor: "from-secondary", toColor: "to-primary",
    tagline: "Tu mente no acepta respuestas fáciles. Convertís incertidumbre en conocimiento demostrable.",
    quote: "El análisis identifica un perfil de pensamiento profundo poco común: alta metacognición, síntesis abstracta y tolerancia excepcional a la ambigüedad intelectual. No buscás certezas rápidas — buscás verdades bien fundamentadas. Eso es exactamente lo que el mundo científico necesita.",
    dimensions: [
      { icon: "psychology", color: "text-secondary", bg: "bg-secondary/10", badge: "I puro", badgeColor: "text-secondary", title: "Código Holland: Investigativo", desc: "Perfil Investigativo casi puro: motivado por la comprensión profunda, el descubrimiento y el rigor metodológico. El componente Social emerge cuando enseñás o comunicás tu conocimiento." },
      { icon: "functions", color: "text-primary", bg: "bg-primary/10", badge: "91%", badgeColor: "text-primary", title: "Gardner: Lógico-Abstracto", desc: "Tu Lógica-Matemática está orientada a modelos formales y teoría, no solo a la aplicación inmediata. Capacidad de abstracción en el percentil 91." },
      { icon: "model_training", color: "text-tertiary", bg: "bg-tertiary/10", badge: "Asimilador", badgeColor: "text-tertiary", title: "Kolb: Estilo Asimilador", desc: "Combinás la conceptualización abstracta con la observación reflexiva. Aprendés mejor cuando tenés tiempo para integrar información diversa y construir modelos mentales completos." },
      { icon: "self_improvement", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Auto-Dir.", badgeColor: "text-surface-tint", title: "Schwartz: Autodirección", desc: "Tu valor central es la independencia intelectual. Necesitás libertad para elegir tus preguntas y tu ritmo. La conformidad y las reglas rígidas son tu mayor obstáculo." },
    ],
    aiAnalysis: [
      "Tu perfil científico-analítico es consistente a través de los cuatro marcos de evaluación, lo que indica alta autenticidad vocacional. El sistema identifica una capacidad de procesamiento profundo rara incluso en perfiles universitarios avanzados, con lo que los psicólogos cognitivos llaman 'tolerancia a la ambigüedad epistemológica'.",
      "El análisis también detecta un patrón de 'comunicación diferida': tu fortaleza está en el pensamiento individual profundo, pero tu mayor impacto vendrá cuando aprendas a traducir ese conocimiento para audiencias no técnicas. Los mejores científicos no solo descubren — también enseñan y publican.",
    ],
    workStyle: ["Laboratorios con autonomía metodológica completa.", "Trabajo de largo plazo orientado a publicaciones.", "Equipos pequeños con alta densidad intelectual.", "Acceso a literatura científica y herramientas estadísticas avanzadas."],
    careers: [
      { name: "Investigación Científica", match: "97%", projection: "10/10", summary: "Empujás las fronteras del conocimiento en laboratorios de élite.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "5 años + posgrado", salary: "$2k – $5k USD/mes", queEstudia: "Metodología científica, estadística avanzada, diseño experimental y escritura académica.", queHace: "Diseña y conduce experimentos, publica hallazgos en journals y aplica por grants de investigación.", universities: ["UBA – CONICET (Argentina)", "UNAM (México)", "U. de Chile"] },
      { name: "Biotecnología", match: "93%", projection: "9/10", summary: "Usás biología molecular y computación para crear innovaciones médicas.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80", badge: "Tendencia", duration: "5 años", salary: "$2.5k – $4k USD/mes", queEstudia: "Biología celular, genómica, bioinformática y farmacología molecular.", queHace: "Desarrolla terapias genéticas, diseña biomarcadores y conduce ensayos clínicos en laboratorios farmacéuticos.", universities: ["UNSAM (Argentina)", "Tec de Monterrey (México)", "PUC (Chile)"] },
      { name: "Actuaría y Estadística", match: "89%", projection: "9/10", summary: "Modelás riesgos complejos para que grandes organizaciones decidan con información.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "4–5 años", salary: "$3k – $5k USD/mes", queEstudia: "Probabilidad, modelos estadísticos, finanzas cuantitativas y programación actuarial.", queHace: "Evalúa riesgos financieros, diseña modelos de seguros y asesora sobre incertidumbre a gran escala.", universities: ["UBA (Argentina)", "ITAM (México)", "U. de los Andes (Colombia)"] },
    ],
    roadmap: [
      { step: "1", color: "bg-secondary", title: "Ahora (Desarrollo Temprano)", items: [{ title: "Metodología científica", desc: "Tomá un curso de diseño experimental. Aprender a formular hipótesis es la base de todo." }, { title: "Estadística con R o Python", desc: "Son las herramientas del científico moderno. Aprendé lo básico antes de entrar a la universidad." }], extras: [{ icon: "science", label: "Coursera: Research Methods" }, { icon: "bar_chart", label: "R for Data Analysis" }] },
      { step: "2", color: "bg-primary", title: "Antes de Matricularte", items: [{ title: "Contactá investigadores activos", desc: "Escribí a un doctorado de tu área. El 80% responde y muchos ofrecen voluntariados en laboratorio." }, { title: "Primera co-autoría", desc: "Buscá oportunidades para aparecer en un paper universitario. Cambia tu CV para siempre." }], extras: [{ icon: "contact_mail", label: "LinkedIn: Researchers" }, { icon: "article", label: "Google Scholar" }] },
    ],
    closing: "La ciencia necesita personas que no acepten el 'siempre fue así'. Tu capacidad analítica es un recurso escaso y valioso. Empezá con una pregunta que nadie haya respondido todavía.",
  },

  "explorador-naturalista": {
    emoji: "🌿", title: "El Explorador", titleHighlight: "Naturalista",
    fromColor: "from-tertiary", toColor: "to-secondary",
    tagline: "Curiosidad sin límites y amor por el mundo real. Encontrás patrones donde otros ven caos.",
    quote: "Tu perfil combina una sensibilidad especial para entender sistemas complejos — ya sean ecosistemas, sociedades o tecnologías — con una orientación práctica hacia el mundo tangible. Aprendés mejor del contacto directo con la naturaleza y los fenómenos reales.",
    dimensions: [
      { icon: "park", color: "text-tertiary", bg: "bg-tertiary/10", badge: "I-R", badgeColor: "text-tertiary", title: "Código Holland: Investig.-Realista", desc: "Combinás la curiosidad investigadora con la orientación práctica hacia el mundo físico. Te atraen las ciencias naturales aplicadas y los ambientes de trabajo al aire libre o en campo." },
      { icon: "eco", color: "text-secondary", bg: "bg-secondary/10", badge: "Naturalista", badgeColor: "text-secondary", title: "Gardner: Inteligencia Naturalista", desc: "Tu inteligencia naturalista es excepcional: reconocés patrones en el mundo vivo, clasificás especies, comprendés ecosistemas y sentís una conexión profunda con el medio ambiente." },
      { icon: "explore", color: "text-primary", bg: "bg-primary/10", badge: "Acomodador", badgeColor: "text-primary", title: "Kolb: Estilo Acomodador", desc: "Aprendés haciendo y sintiendo. Te va mejor en campo que en el aula, en experimentos reales que en simulaciones. La experiencia directa es tu forma natural de construir conocimiento." },
      { icon: "public", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Universal.", badgeColor: "text-surface-tint", title: "Schwartz: Universalismo", desc: "Te motiva el bienestar de todos los seres vivos y la protección del ambiente. Esta orientación de valores es rara y valiosa: convierte tu trabajo en una causa con sentido profundo." },
    ],
    aiAnalysis: [
      "Tu perfil naturalista es de los más coherentes del sistema: el amor por la naturaleza no es una tendencia superficial sino una orientación cognitiva profunda. Procesás la información del mundo físico con una velocidad y precisión que muchos perfilen como 'instinto', pero que en realidad es una inteligencia altamente desarrollada.",
      "El análisis destaca una característica inusual: alta 'pensamiento sistémico ecosistémico', la capacidad de ver cómo los elementos interactúan dentro de un sistema complejo. Esto es valioso no solo en las ciencias naturales, sino también en áreas como la sostenibilidad corporativa, la planificación territorial y la ingeniería ambiental.",
    ],
    workStyle: ["Trabajo de campo combinado con análisis en laboratorio.", "Proyectos con impacto ambiental medible y verificable.", "Equipos interdisciplinarios que incluyan ciencias sociales.", "Conexión con comunidades y ecosistemas locales."],
    careers: [
      { name: "Biología y Ecología", match: "96%", projection: "9/10", summary: "Estudiás y protegés los sistemas vivos que sostienen el planeta.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80", badge: "Propósito", duration: "5 años", salary: "$1.5k – $3k USD/mes", queEstudia: "Biología celular, ecología, taxonomía, conservación y metodología de campo.", queHace: "Investiga ecosistemas, diseña planes de conservación y asesora políticas ambientales.", universities: ["UBA (Argentina)", "UNAM (México)", "U. de Chile"] },
      { name: "Ingeniería Ambiental", match: "92%", projection: "9/10", summary: "Diseñás soluciones técnicas para los grandes desafíos ecológicos del siglo XXI.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "5 años", salary: "$2k – $3.5k USD/mes", queEstudia: "Química ambiental, hidrología, gestión de residuos y energías renovables.", queHace: "Diseña sistemas de tratamiento de agua, gestiona impacto ambiental de industrias y evalúa proyectos de energía limpia.", universities: ["UTN (Argentina)", "Tec de Monterrey (México)", "PUC (Chile)"] },
      { name: "Oceanografía / Geografía", match: "87%", projection: "8/10", summary: "Explorás y documentás los sistemas físicos del planeta.", image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=600&q=80", badge: "Especializado", duration: "5 años", salary: "$1.5k – $3k USD/mes", queEstudia: "Ciencias del mar, climatología, SIG (sistemas de información geográfica) y geomorfología.", queHace: "Estudia procesos oceánicos y terrestres, crea mapas de riesgo y asesora sobre cambio climático.", universities: ["CENPAT–CONICET (Argentina)", "UNAM (México)", "U. de Concepción (Chile)"] },
    ],
    roadmap: [
      { step: "1", color: "bg-tertiary-dim", title: "Ahora (Conexión con la naturaleza)", items: [{ title: "Voluntariado ambiental", desc: "Sumarte a un grupo de restauración ecológica o monitoreo de fauna te da experiencia real e invaluable." }, { title: "Aprendé a identificar especies", desc: "Usá iNaturalist para registrar biodiversidad local. Es ciencia ciudadana real que va a tu CV." }], extras: [{ icon: "eco", label: "iNaturalist App" }, { icon: "forest", label: "Voluntariado FARN" }] },
      { step: "2", color: "bg-secondary", title: "Antes de Matricularte", items: [{ title: "Participá en campamentos científicos", desc: "Muchas universidades ofrecen programas de verano en campo para pre-universitarios." }, { title: "Aprendé GIS básico", desc: "QGIS es gratuito y una de las habilidades más demandadas en ciencias ambientales." }], extras: [{ icon: "map", label: "QGIS Tutorials" }, { icon: "groups", label: "Campamento Científico UBA" }] },
    ],
    closing: "El planeta necesita urgentemente personas con tu perfil: que lo entiendan, lo respeten y puedan diseñar soluciones reales. Tu vocación tiene el propósito más grande de todos. Salí, explorá, registrá.",
  },

  "creativo-digital": {
    emoji: "🎨", title: "El Creativo", titleHighlight: "Digital",
    fromColor: "from-primary", toColor: "to-secondary",
    tagline: "Donde otros ven pantallas, vos ves posibilidades. Combinás arte y tecnología con precisión quirúrgica.",
    quote: "Tu perfil vive en la intersección perfecta entre el arte y la lógica digital. Podés imaginar experiencias únicas Y ejecutarlas con precisión técnica. Esta combinación es extraordinariamente escasa y enormemente valorada en la economía creativa.",
    dimensions: [
      { icon: "palette", color: "text-primary", bg: "bg-primary/10", badge: "A-I", badgeColor: "text-primary", title: "Código Holland: Artístico-Investigativo", desc: "Perfil Artístico con fuerte componente Investigativo: no te conformás con crear algo bonito, necesitás entender por qué funciona y cómo podría funcionar mejor." },
      { icon: "visibility", color: "text-secondary", bg: "bg-secondary/10", badge: "95%", badgeColor: "text-secondary", title: "Gardner: Visual-Espacial", desc: "Tu inteligencia Visual-Espacial está en el percentil 95: pensás en imágenes, composiciones y espacios. Ves soluciones de diseño antes de poder articularlas verbalmente." },
      { icon: "brush", color: "text-tertiary", bg: "bg-tertiary/10", badge: "Divergente", badgeColor: "text-tertiary", title: "Kolb: Estilo Divergente", desc: "Combinás experiencia concreta con observación reflexiva. Sos especialmente bueno generando múltiples alternativas creativas ante un mismo problema." },
      { icon: "self_improvement", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Auto-Dir.", badgeColor: "text-surface-tint", title: "Schwartz: Autodirección", desc: "Necesitás libertad creativa y autonomía para expresarte. Los entornos corporativos rígidos apagan tu potencial; los ambientes de agencia o startup lo potencian." },
    ],
    aiAnalysis: [
      "Tu perfil creativo-digital muestra una característica inusual: alta consistencia entre las dimensiones artística y técnica. Muchos creativos puntúan alto en expresión pero bajo en rigor técnico, o viceversa. Vos mostrás ambas, lo que abre carreras de mayor impacto y mejor remuneración en la intersección de ambos mundos.",
      "El análisis detecta una orientación hacia el 'diseño centrado en el usuario' — no solo hacés cosas bonitas, pensás en cómo las personas van a interactuar con ellas. Esta es la base del UX/UI, el motion design y la dirección creativa de productos digitales, las tres áreas de mayor demanda para tu perfil.",
    ],
    workStyle: ["Agencias creativas o equipos de producto digital.", "Libertad para proponer, experimentar y fallar rápido.", "Herramientas de punta: Figma, After Effects, Framer.", "Proyectos con impacto visual medible en audiencias reales."],
    careers: [
      { name: "Diseño UX/UI", match: "95%", projection: "10/10", summary: "Diseñás las experiencias digitales que usa el mundo.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "4 años", salary: "$2.5k – $5k USD/mes", queEstudia: "Psicología del usuario, tipografía, diseño de sistemas, prototipado e investigación UX.", queHace: "Diseña interfaces de apps y webs, conduce tests de usabilidad y trabaja junto a developers para dar vida a productos digitales.", universities: ["UP (Argentina)", "IBERO (México)", "UAI (Chile)"] },
      { name: "Dirección de Arte Digital", match: "91%", projection: "9/10", summary: "Definís la identidad visual de marcas, campañas y productos.", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80", badge: "Creativo", duration: "4 años", salary: "$2k – $4k USD/mes", queEstudia: "Comunicación visual, fotografía, dirección de arte, branding y cultura visual.", queHace: "Lidera equipos creativos, define la estética de marcas globales y supervisa la producción de contenido visual en múltiples plataformas.", universities: ["UBA – FADU (Argentina)", "UNAM (México)", "Duoc UC (Chile)"] },
      { name: "Motion Design & Animación", match: "87%", projection: "9/10", summary: "Dás vida a ideas mediante animación, VFX y narrativa visual en movimiento.", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80", badge: "Tendencia", duration: "3–4 años", salary: "$2k – $3.5k USD/mes", queEstudia: "Animación 2D/3D, efectos visuales, storyboarding y diseño de sonido.", queHace: "Crea videos de marca, animaciones explicativas, intros de productos y contenido para plataformas de streaming.", universities: ["Da Vinci (Argentina)", "Centro de Diseño (México)", "ARCOS (Chile)"] },
    ],
    roadmap: [
      { step: "1", color: "bg-primary", title: "Ahora (Construí tu ojo)", items: [{ title: "Aprendé Figma", desc: "Es la herramienta estándar de la industria UX/UI. Hay miles de tutoriales gratuitos en YouTube." }, { title: "Seguí a referentes", desc: "Awwwards, Behance y Dribbble son tus museos. Mirá qué está haciendo el top mundial." }], extras: [{ icon: "design_services", label: "Figma — Free Plan" }, { icon: "palette", label: "Awwwards / Behance" }] },
      { step: "2", color: "bg-secondary", title: "Antes de Matricularte", items: [{ title: "Portfolio de 3 proyectos", desc: "Rediseñá una app que uses y expliqué tu proceso. Es mejor que cualquier CV." }, { title: "Concurso de diseño", desc: "Participá en un brief de diseño online. Los premios y menciones pesan mucho en admisiones." }], extras: [{ icon: "web", label: "Framer — Portfolio" }, { icon: "emoji_events", label: "Brief / Concursos" }] },
    ],
    closing: "El diseño digital mueve economías enteras. Las marcas más valiosas del mundo pagan por personas que piensan como vos. Construí tu portfolio desde hoy: cada pixel cuenta.",
  },

  "comunicador-estrategico": {
    emoji: "🗣️", title: "El Comunicador", titleHighlight: "Estratégico",
    fromColor: "from-secondary", toColor: "to-tertiary",
    tagline: "Las palabras son tu superpoder. Transformás ideas complejas en mensajes que impactan y movilizan.",
    quote: "Tenés una habilidad única para entender audiencias y construir narrativas que conectan. Sos el puente natural entre el conocimiento experto y las personas que lo necesitan. En la economía de la atención, eso es exactamente lo que las organizaciones más buscan.",
    dimensions: [
      { icon: "record_voice_over", color: "text-secondary", bg: "bg-secondary/10", badge: "A-S", badgeColor: "text-secondary", title: "Código Holland: Artístico-Social", desc: "Combinás la expresión creativa con una orientación genuina hacia las personas. No comunicás por comunicar — buscás generar un cambio real en quien te escucha o lee." },
      { icon: "translate", color: "text-primary", bg: "bg-primary/10", badge: "93%", badgeColor: "text-primary", title: "Gardner: Lingüístico-Verbal", desc: "Tu inteligencia lingüística está en el percentil 93. Tenés una capacidad excepcional para usar el lenguaje con precisión, persuasión y creatividad simultáneamente." },
      { icon: "forum", color: "text-tertiary", bg: "bg-tertiary/10", badge: "Divergente", badgeColor: "text-tertiary", title: "Kolb: Estilo Divergente", desc: "Generás múltiples ideas y perspectivas ante un mismo problema. Sos excelente brainstormeando, escuchando e integrando puntos de vista de diversas fuentes." },
      { icon: "star", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Auto-Dir.", badgeColor: "text-surface-tint", title: "Schwartz: Autodirección", desc: "Necesitás expresarte con autenticidad. Las organizaciones que te pidan comunicar mensajes en los que no creés verán tu rendimiento caer drásticamente." },
    ],
    aiAnalysis: [
      "Tu perfil de comunicación estratégica es uno de los más demandados en la economía digital actual. Las marcas, instituciones y medios necesitan personas que puedan no solo hablar bien, sino pensar estratégicamente sobre qué decir, a quién, cuándo y en qué formato.",
      "El análisis identifica una combinación inusual: alta inteligencia verbal con razonamiento estratégico por encima de la media. Esto te ubica en el segmento de mayor valor del mercado: no solo sos un buen comunicador, podés diseñar estrategias de comunicación completas y liderar equipos creativos.",
    ],
    workStyle: ["Agencias de comunicación, medios o departamentos de marketing.", "Proyectos variados con libertad de tono y formato.", "Audiencias reales con métricas de impacto medibles.", "Colaboración con perfiles técnicos y creativos visuales."],
    careers: [
      { name: "Estrategia de Contenido y Marketing Digital", match: "93%", projection: "10/10", summary: "Diseñás las narrativas que construyen marcas y mueven audiencias.", image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "4 años", salary: "$2k – $4k USD/mes", queEstudia: "Marketing digital, SEO/SEM, storytelling, análisis de audiencias y gestión de redes sociales.", queHace: "Diseña estrategias de contenido omnicanal, gestiona comunidades digitales y optimiza el funnel de conversión.", universities: ["UTDT (Argentina)", "IBERO (México)", "UAI (Chile)"] },
      { name: "Comunicación Corporativa y PR", match: "89%", projection: "9/10", summary: "Manejás la reputación y el mensaje de organizaciones ante sus públicos clave.", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80", badge: "Estable", duration: "4 años", salary: "$1.8k – $3.5k USD/mes", queEstudia: "Relaciones públicas, gestión de crisis, comunicación institucional y teoría de la comunicación.", queHace: "Gestiona la imagen de empresas, coordina voceros, maneja crisis de reputación y diseña planes de comunicación.", universities: ["UCA (Argentina)", "UNAM (México)", "PUC (Chile)"] },
      { name: "Periodismo Digital e Investigativo", match: "85%", projection: "9/10", summary: "Investigás y narrás las historias que la sociedad necesita conocer.", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80", badge: "Propósito", duration: "4 años", salary: "$1.5k – $3k USD/mes", queEstudia: "Periodismo digital, datos abiertos, investigación periodística y ética mediática.", queHace: "Reporta, investiga y publica historias de impacto social usando datos, fuentes y narrativa multimedia.", universities: ["UNLP (Argentina)", "UNAM (México)", "U. de Chile"] },
    ],
    roadmap: [
      { step: "1", color: "bg-secondary", title: "Ahora (Desarrollá tu voz)", items: [{ title: "Creá un blog o newsletter", desc: "Empezá a escribir semanalmente sobre algo que te apasione. La constancia construye audiencias." }, { title: "Aprendé analítica básica", desc: "Google Analytics y las métricas de redes sociales son el lenguaje del marketing moderno." }], extras: [{ icon: "article", label: "Substack — Newsletter" }, { icon: "analytics", label: "Google Analytics Free" }] },
      { step: "2", color: "bg-tertiary", title: "Antes de Matricularte", items: [{ title: "Portfolio de contenido", desc: "Recopilá tus mejores piezas: artículos, campañas o presentaciones. La evidencia supera al CV." }, { title: "Prácticas en medios o agencias", desc: "Muchas aceptan pasantes secundarios. Una experiencia real antes de la facu es invaluable." }], extras: [{ icon: "work", label: "LinkedIn: Internships" }, { icon: "web", label: "Portfolio en Notion" }] },
    ],
    closing: "Vivimos en la era donde el contenido mueve economías. Las personas que saben comunicar estratégicamente nunca van a sobrar. Empezá a escribir hoy. Tu audiencia te está esperando.",
  },

  "artista-expresivo": {
    emoji: "🎭", title: "El Artista", titleHighlight: "Expresivo",
    fromColor: "from-primary", toColor: "to-secondary",
    tagline: "Tu mundo interior es tu mayor recurso. Convertís emociones y experiencias en arte que trasciende.",
    quote: "Tenés una sensibilidad artística excepcional y una capacidad para expresar lo que otros sienten pero no pueden articular. El arte es tu lenguaje nativo. Eso no es un capricho — es una inteligencia específica que la cultura, la industria creativa y la sociedad necesitan profundamente.",
    dimensions: [
      { icon: "theater_comedy", color: "text-primary", bg: "bg-primary/10", badge: "A puro", badgeColor: "text-primary", title: "Código Holland: Artístico", desc: "Perfil Artístico casi puro: orientado a la expresión creativa, la originalidad y la libertad. Cualquier ambiente de trabajo que limite tu expresión te genera conflicto interno." },
      { icon: "music_note", color: "text-secondary", bg: "bg-secondary/10", badge: "97%", badgeColor: "text-secondary", title: "Gardner: Musical-Espacial", desc: "Tu inteligencia Musical es excepcional y se potencia con una desarrollada inteligencia Espacial. Percibís patrones, ritmos y composiciones de manera que otros no pueden." },
      { icon: "brush", color: "text-tertiary", bg: "bg-tertiary/10", badge: "Divergente", badgeColor: "text-tertiary", title: "Kolb: Estilo Divergente", desc: "Tu imaginación creativa es tu mayor herramienta de aprendizaje. Aprendés a través de la experiencia vivida, la observación y la generación de nuevas perspectivas." },
      { icon: "favorite", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Estimulación", badgeColor: "text-surface-tint", title: "Schwartz: Estimulación", desc: "Te motiva lo nuevo, lo intenso, lo inesperado. La rutina es tu enemigo. Buscás constantemente experiencias que desafíen tu percepción y expandan tu mundo interior." },
    ],
    aiAnalysis: [
      "Tu perfil artístico-expresivo muestra una coherencia interna notable: no es una tendencia pasajera sino una identidad vocacional profunda. El sistema detecta una capacidad de traducir experiencias emocionales en formas expresivas que otros pueden comprender y sentir — eso es exactamente lo que define a los artistas que dejan huella.",
      "El análisis también destaca que tu perfil incluye una dimensión empática inusualmente alta. Los grandes artistas no solo se expresan a sí mismos: comprenden profundamente a su audiencia. Esa combinación de expresión auténtica y empatía receptiva es la fórmula de los creativos que construyen carreras sustentables.",
    ],
    workStyle: ["Estudios creativos, productoras o trabajo freelance.", "Proyectos con libertad de concepto e interpretación.", "Colaboración con otros artistas y directores creativos.", "Ciclos de creación–exhibición–retroalimentación real."],
    careers: [
      { name: "Producción Musical y Audiovisual", match: "97%", projection: "9/10", summary: "Creás y producís obras musicales y audiovisuales para audiencias globales.", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "4 años", salary: "$1.5k – $4k USD/mes", queEstudia: "Producción musical, teoría musical, ingeniería de audio y composición para imagen.", queHace: "Produce discos, bandas sonoras para films, content musical para marcas y shows en vivo.", universities: ["Berklee (Online)", "EMT (Argentina)", "Centro de Capacitación Musical (México)"] },
      { name: "Artes Visuales y Diseño Gráfico", match: "91%", projection: "9/10", summary: "Comunicás ideas y emociones a través de la imagen visual.", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=600&q=80", badge: "Creativo", duration: "4 años", salary: "$1.5k – $3.5k USD/mes", queEstudia: "Diseño gráfico, ilustración, fotografía, arte digital y teoría del color.", queHace: "Crea identidades visuales, ilustraciones editoriales, arte para marcas y exhibiciones propias.", universities: ["UBA – FADU (Argentina)", "UNAM – ENAP (México)", "U. de Chile – FAU"] },
      { name: "Dirección y Producción Teatral/Cinematográfica", match: "86%", projection: "8/10", summary: "Construís narrativas visuales y escénicas que emocionan audiencias.", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80", badge: "Propósito", duration: "4–5 años", salary: "$1.2k – $3k USD/mes", queEstudia: "Dirección teatral/cinematográfica, dramaturgia, actuación y producción ejecutiva.", queHace: "Dirige espectáculos y producciones, trabaja con actores y equipos técnicos para crear experiencias escénicas.", universities: ["IUNA (Argentina)", "Centro Universitario de Teatro (México)", "ARCIS (Chile)"] },
    ],
    roadmap: [
      { step: "1", color: "bg-primary", title: "Ahora (Creá sin parar)", items: [{ title: "Proyectos personales constantes", desc: "La calidad viene de la cantidad. Publicá algo cada semana, sin importar si es 'perfecto'." }, { title: "Encontrá tu comunidad artística", desc: "Estudios abiertos, colectivos de arte, jam sessions: el ambiente creativo te nutre." }], extras: [{ icon: "music_note", label: "SoundCloud / Bandcamp" }, { icon: "palette", label: "Instagram / Behance" }] },
      { step: "2", color: "bg-secondary", title: "Antes de Matricularte", items: [{ title: "Portfolio artístico sólido", desc: "Para admisiones en arte, el portfolio es todo. Armá uno con tu mejor trabajo de los últimos 2 años." }, { title: "Audiciones y concursos", desc: "Participar en convocatorias te expone, te da feedback y abre puertas a becas." }], extras: [{ icon: "collections", label: "Portfolio Físico/Digital" }, { icon: "emoji_events", label: "Concursos y Becas" }] },
    ],
    closing: "El mundo necesita más belleza, más catarsis y más verdad. Solo los artistas pueden darlo. Tu sensibilidad no es un lujo — es una necesidad social. Creá con todo.",
  },

  "lider-emprendedor": {
    emoji: "🚀", title: "El Líder", titleHighlight: "Emprendedor",
    fromColor: "from-tertiary", toColor: "to-primary",
    tagline: "Naciste para construir imperios. Ves oportunidades donde otros ven obstáculos y llevás a otros con vos.",
    quote: "Tu perfil combina visión estratégica con capacidad de ejecución. Sos un catalizador natural que convierte ideas en realidades, equipos en comunidades y metas en legados. Los mejores founders tienen exactamente este balance de ambición y empatía.",
    dimensions: [
      { icon: "rocket_launch", color: "text-tertiary", bg: "bg-tertiary/10", badge: "E-S", badgeColor: "text-tertiary", title: "Código Holland: Emprendedor-Social", desc: "Combinás la ambición emprendedora con una orientación genuina hacia las personas. Querés construir grandes cosas, pero también que esas cosas le importen a la gente." },
      { icon: "group", color: "text-primary", bg: "bg-primary/10", badge: "92%", badgeColor: "text-primary", title: "Gardner: Interpersonal", desc: "Tu inteligencia interpersonal es excepcional: lees el estado emocional de las personas, entendés sus motivaciones y sabés exactamente cómo moverlas hacia una meta común." },
      { icon: "trending_up", color: "text-secondary", bg: "bg-secondary/10", badge: "Acomodador", badgeColor: "text-secondary", title: "Kolb: Estilo Acomodador", desc: "Aprendés mejor actuando y adaptándote a resultados reales. Sos el primero en lanzar, testear y pivotar. La inacción te genera más ansiedad que el fracaso." },
      { icon: "star", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Logro", badgeColor: "text-surface-tint", title: "Schwartz: Logro y Poder Social", desc: "Te motiva alcanzar metas ambiciosas y tener influencia real sobre el entorno. El poder que buscás no es dominación — es la capacidad de hacer que las cosas pasen." },
    ],
    aiAnalysis: [
      "Tu perfil de liderazgo emprendedor muestra la combinación más alta de orientación a resultados + capacidad interpersonal del sistema. Esto no es común: muchos líderes tienen uno de los dos, rara vez ambos. Esa dualidad es lo que separa a los managers de los founders que realmente construyen algo que importa.",
      "El análisis identifica una característica clave: alta resiliencia ante el fracaso. Tus respuestas sugieren que procesás los errores como datos, no como amenazas. Eso es el motor psicológico del emprendimiento: la capacidad de mantenerte orientado al objetivo cuando todo sale mal.",
    ],
    workStyle: ["Startups, scale-ups o roles de liderazgo en corporaciones.", "Alta variedad de tareas con impacto directo en resultados.", "Equipos donde puedas construir cultura y visión.", "Entornos donde la velocidad de decisión sea una ventaja."],
    careers: [
      { name: "Emprendimiento y Entrepreneurship", match: "94%", projection: "10/10", summary: "Construís empresas desde cero que resuelven problemas reales.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80", badge: "Alto Riesgo/Reward", duration: "4 años + experiencia", salary: "Variable / $5k–$20k+ USD/mes", queEstudia: "Gestión empresarial, finanzas, marketing, operaciones y pensamiento innovador.", queHace: "Identifica oportunidades de mercado, arma equipos fundadores, levanta capital y ejecuta hasta el product-market fit.", universities: ["UTDT (Argentina)", "IPADE (México)", "ESE (Chile)"] },
      { name: "Product Management", match: "91%", projection: "10/10", summary: "Liderás el desarrollo de productos digitales de alto impacto.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "4–5 años", salary: "$3k – $6k USD/mes", queEstudia: "Management, UX, análisis de datos, estrategia de producto y desarrollo ágil.", queHace: "Define la visión del producto, prioriza features, coordina equipos de tech y diseño y mide impacto en usuarios.", universities: ["UDESA (Argentina)", "ITAM (México)", "UAI (Chile)"] },
      { name: "Marketing Estratégico y Growth", match: "87%", projection: "9/10", summary: "Diseñás las estrategias que hacen crecer marcas y productos de forma exponencial.", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80", badge: "Tendencia", duration: "4 años", salary: "$2.5k – $4.5k USD/mes", queEstudia: "Marketing, comportamiento del consumidor, growth hacking, branding y analítica.", queHace: "Diseña estrategias de adquisición y retención, lidera campañas y optimiza el funnel de crecimiento.", universities: ["UCEMA (Argentina)", "TEC Campus Ciudad de México", "P. Universidad Católica (Chile)"] },
    ],
    roadmap: [
      { step: "1", color: "bg-tertiary", title: "Ahora (Desarrollá el músculo)", items: [{ title: "Lanzá algo pequeño", desc: "Una venta, un proyecto para el colegio, un servicio para el barrio. El primer negocio siempre es humilde." }, { title: "Leé biografías de founders", desc: "Zero to One, Shoe Dog, The Lean Startup. El conocimiento emprendedor empieza por historias reales." }], extras: [{ icon: "store", label: "Tienda Nube / Shopify" }, { icon: "book", label: "The Lean Startup" }] },
      { step: "2", color: "bg-primary", title: "Antes de Matricularte", items: [{ title: "Participá en un concurso de startups", desc: "NAVES, Endeavor, StartupWeekend. La adrenalina de un pitch real no tiene sustituto." }, { title: "Encontrá un mentor", desc: "Un founder con 5 años de experiencia te ahorra 2 años de errores evitables." }], extras: [{ icon: "emoji_events", label: "Endeavor / NAVES" }, { icon: "handshake", label: "LinkedIn Mentors" }] },
    ],
    closing: "El mundo necesita founders que quieran construir cosas que importen. Tu visión combinada con tu capacidad de llevar personas es extraordinariamente escasa. El mejor momento para empezar fue hace 5 años. El segundo mejor momento es hoy.",
  },

  "humanista-social": {
    emoji: "🤝", title: "El Humanista", titleHighlight: "Comprometido",
    fromColor: "from-secondary", toColor: "to-primary",
    tagline: "Tu mayor talento es hacer que las personas se sientan vistas, escuchadas y valoradas.",
    quote: "Tenés una capacidad innata para conectar con las personas y entender sus necesidades profundas. Tu vocación está en el servicio genuino a los demás — y en eso encontrás tu mayor satisfacción y energía. Eso no es una debilidad: es exactamente lo que hace falta en salud, educación y sector social.",
    dimensions: [
      { icon: "people", color: "text-secondary", bg: "bg-secondary/10", badge: "S puro", badgeColor: "text-secondary", title: "Código Holland: Social", desc: "Perfil Social casi puro: orientado a ayudar, enseñar y cuidar a las personas. Te realizás en entornos donde podés generar un impacto directo y visible en el bienestar de otros." },
      { icon: "connect_without_contact", color: "text-primary", bg: "bg-primary/10", badge: "95%", badgeColor: "text-primary", title: "Gardner: Interpersonal", desc: "Tu inteligencia interpersonal está en el percentil 95. Entendés los estados emocionales de las personas antes de que ellas los articulen, y respondés de una manera que genera confianza." },
      { icon: "psychology_alt", color: "text-tertiary", bg: "bg-tertiary/10", badge: "Divergente", badgeColor: "text-tertiary", title: "Kolb: Estilo Divergente", desc: "Tu aprendizaje es experiencial y empático: aprendés escuchando, observando y conectando con las personas afectadas por los problemas que estudiás." },
      { icon: "favorite", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Benev.", badgeColor: "text-surface-tint", title: "Schwartz: Benevolencia", desc: "Tu valor más alto es el bienestar de las personas cercanas y de la sociedad en general. Esto genera una motivación intrínseca extraordinaria cuando tu trabajo se alinea con este valor." },
    ],
    aiAnalysis: [
      "Tu perfil humanista-social es uno de los más coherentes del sistema: cada dimensión apunta en la misma dirección. Esto suele indicar una vocación sólida, no una elección por descarte. El análisis detecta una combinación inusual de empatía profunda con capacidad de acción concreta — no solo sentís el dolor ajeno, hacés algo al respecto.",
      "El sistema también identifica una característica importante: alta capacidad de sostener espacios emocionalmente seguros para otros. Esto es la base de la psicología clínica, la docencia transformadora y el liderazgo de organizaciones sociales. Tu mayor riesgo vocacional no es el fracaso — es el burnout por exceso de entrega. Aprender a poner límites es parte de tu formación.",
    ],
    workStyle: ["Instituciones educativas, de salud o sociales con propósito.", "Trabajo en contacto directo con personas y comunidades.", "Equipos colaborativos con cultura de cuidado mutuo.", "Espacio para la reflexión y la supervisión emocional."],
    careers: [
      { name: "Psicología Clínica y Organizacional", match: "95%", projection: "9/10", summary: "Acompañás a personas en sus procesos de cambio y bienestar mental.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "5 años + especialización", salary: "$1.5k – $3.5k USD/mes", queEstudia: "Psicología clínica, psicopatología, teorías del desarrollo y técnicas terapéuticas.", queHace: "Realiza evaluaciones psicológicas, conduce procesos terapéuticos individuales y grupales y asesora en bienestar organizacional.", universities: ["UBA (Argentina)", "UNAM (México)", "PUC (Chile)"] },
      { name: "Educación y Pedagogía", match: "91%", projection: "9/10", summary: "Transformás vidas a través del aprendizaje y la enseñanza.", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80", badge: "Propósito", duration: "4–5 años", salary: "$1k – $2.5k USD/mes", queEstudia: "Pedagogía, psicología educativa, didáctica, neurociencias del aprendizaje y política educativa.", queHace: "Diseña currículas, enseña en aulas o plataformas digitales y trabaja en políticas de inclusión educativa.", universities: ["UNIPE (Argentina)", "UPN (México)", "U. de Chile"] },
      { name: "Trabajo Social y ONG Leadership", match: "87%", projection: "8/10", summary: "Liderás intervenciones sociales que cambian las condiciones de vida de comunidades.", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80", badge: "Impacto", duration: "4–5 años", salary: "$1k – $2.5k USD/mes", queEstudia: "Trabajo social, políticas públicas, gestión de proyectos sociales y derechos humanos.", queHace: "Diseña e implementa programas sociales, gestiona financiamiento y coordina equipos de intervención comunitaria.", universities: ["UBA (Argentina)", "UNAM (México)", "U. de Chile"] },
    ],
    roadmap: [
      { step: "1", color: "bg-secondary", title: "Ahora (Conectá con el terreno)", items: [{ title: "Voluntariado social activo", desc: "No esperes la uni para empezar. Una ONG, un hospital, un comedor: el campo te forma tanto como los libros." }, { title: "Formación en primeros auxilios emocionales", desc: "Crisis Line, primeros auxilios psicológicos — habilidades que podés usar hoy." }], extras: [{ icon: "volunteer_activism", label: "ONG / Banco de Alimentos" }, { icon: "health_and_safety", label: "IFRC: FARE Course" }] },
      { step: "2", color: "bg-primary", title: "Antes de Matricularte", items: [{ title: "Leer Freud, Rogers y Frankl", desc: "Conocer las corrientes psicológicas fundamentales antes de entrar te da una ventaja enorme en primer año." }, { title: "Autoconocimiento y terapia personal", desc: "Los mejores psicólogos son los que conocen su propio mapa emocional. Empezá tu propio proceso." }], extras: [{ icon: "book", label: "El Hombre en Busca de Sentido" }, { icon: "self_improvement", label: "Psicoanálisis / ACT Intro" }] },
    ],
    closing: "El mundo tiene un déficit profundo de personas que realmente escuchen y acompañen. Tu vocación no es un sacrificio — es una misión. Cuidarte a vos mismo es la condición para cuidar a otros.",
  },

  "agente-cambio": {
    emoji: "⚖️", title: "El Agente", titleHighlight: "de Cambio",
    fromColor: "from-primary", toColor: "to-tertiary",
    tagline: "No te conformás con el mundo tal como está. Tu misión es transformarlo, con principios y acción.",
    quote: "Combinás una visión clara del mundo que querés con la determinación de actuar para lograrlo. El análisis detecta una combinación inusual: alta conciencia crítica de las injusticias sistémicas más una capacidad de comunicación persuasiva que convierte el pensamiento en movimiento.",
    dimensions: [
      { icon: "gavel", color: "text-primary", bg: "bg-primary/10", badge: "S-A", badgeColor: "text-primary", title: "Código Holland: Social-Artístico", desc: "Combinás la orientación hacia el bienestar social con una fuerte expresión artística y lingüística. Sos de los que transforman la indignación en argumento y el argumento en acción colectiva." },
      { icon: "translate", color: "text-tertiary", bg: "bg-tertiary/10", badge: "88%", badgeColor: "text-tertiary", title: "Gardner: Lingüístico-Interpersonal", desc: "Alta inteligencia verbal combinada con profunda inteligencia interpersonal. Sabés cómo construir un caso y cómo conectar con la audiencia que necesitás convencer." },
      { icon: "change_circle", color: "text-secondary", bg: "bg-secondary/10", badge: "Acomodador", badgeColor: "text-secondary", title: "Kolb: Estilo Acomodador", desc: "Aprendés en el campo de batalla: en la militancia, el activismo y la acción directa. La experiencia vivida y el contacto con las personas afectadas es tu mayor fuente de conocimiento." },
      { icon: "balance", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Auto-Dir.", badgeColor: "text-surface-tint", title: "Schwartz: Autodirección y Universalismo", desc: "Tu doble motor: autonomía de valores combinada con preocupación genuina por el bienestar de todos. Esto es lo que define a quienes dejan una huella histórica." },
    ],
    aiAnalysis: [
      "Tu perfil de agente de cambio combina tres características raramente juntas: claridad moral sobre qué está mal, capacidad analítica para entender las causas estructurales, y habilidad comunicativa para articular soluciones convincentes. Esa triada es la base de los grandes reformadores históricos.",
      "El sistema también detecta alta autonomía de valores: no adoptás posiciones por presión social sino por convicción genuina. Esto puede generarte conflictos en ambientes jerárquicos, pero es precisamente lo que hace que tu trabajo sea auténtico y, por ende, más poderoso e influyente.",
    ],
    workStyle: ["Organizaciones con misión clara y valores alineados con los tuyos.", "Trabajo con comunidades directamente afectadas.", "Autonomía para investigar, denunciar y proponer.", "Entornos de alta carga moral que requieran resiliencia."],
    careers: [
      { name: "Derecho y Derechos Humanos", match: "96%", projection: "9/10", summary: "Usás el sistema legal como herramienta de justicia y transformación social.", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80", badge: "Propósito", duration: "5 años", salary: "$2k – $5k USD/mes", queEstudia: "Derecho constitucional, derechos humanos, derecho penal, litigio estratégico y derecho internacional.", queHace: "Litiga casos de impacto, asesora a organizaciones de la sociedad civil y diseña políticas públicas.", universities: ["UBA (Argentina)", "UNAM (México)", "U. de Chile"] },
      { name: "Ciencias Políticas y Diplomacia", match: "90%", projection: "9/10", summary: "Analizás y diseñás sistemas de poder para que funcionen al servicio de las personas.", image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80", badge: "Estratégico", duration: "4–5 años", salary: "$2k – $4k USD/mes", queEstudia: "Teoría política, relaciones internacionales, diplomacia, gestión pública y geopolítica.", queHace: "Trabaja en organismos internacionales, cancillerías, think tanks y organismos gubernamentales de diseño de políticas.", universities: ["FLACSO (Argentina)", "UNAM (México)", "PUC (Chile)"] },
      { name: "Periodismo de Investigación", match: "85%", projection: "8/10", summary: "Investigás y exponés las verdades que el poder prefiere ocultar.", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80", badge: "Propósito", duration: "4 años", salary: "$1.5k – $3k USD/mes", queEstudia: "Periodismo, datos abiertos, técnicas de investigación y ética periodística.", queHace: "Investiga casos de corrupción, violaciones de derechos humanos y diseña reportajes de impacto social.", universities: ["UNLP (Argentina)", "UNAM (México)", "U. de Chile"] },
    ],
    roadmap: [
      { step: "1", color: "bg-primary", title: "Ahora (Desarrollá tu perspectiva)", items: [{ title: "Leé pensamiento crítico", desc: "Chomsky, bell hooks, Gramsci, Arendt. Construir un marco teórico sólido es tu armadura." }, { title: "Activismo y voluntariado político", desc: "Sumarte a un movimiento real te da el conocimiento que ningún libro da." }], extras: [{ icon: "book", label: "La Pedagogía del Oprimido" }, { icon: "groups", label: "Organizaciones barriales" }] },
      { step: "2", color: "bg-tertiary", title: "Antes de Matricularte", items: [{ title: "Modelo ONU o parlamento juvenil", desc: "Desarrollás argumentación, negociación y visión estratégica en un ambiente real." }, { title: "Documentá injusticias locales", desc: "Un ensayo, un documental corto, un artículo viral. Empezá a construir tu voz pública." }], extras: [{ icon: "language", label: "Modelo de Naciones Unidas" }, { icon: "article", label: "Medium / Periódico escolar" }] },
    ],
    closing: "La historia la cambian personas que no se resignan. Tu combinación de valores sólidos, mente analítica y voz poderosa es exactamente lo que los movimientos más importantes necesitan. La injusticia no espera — y vos tampoco tenés que hacerlo.",
  },

  "estratega-negocios": {
    emoji: "📊", title: "El Estratega", titleHighlight: "de Negocios",
    fromColor: "from-tertiary", toColor: "to-secondary",
    tagline: "Ves el tablero completo donde otros ven piezas sueltas. Convertís recursos en resultados medibles.",
    quote: "Tu mente combina pragmatismo con visión amplia. Sabés exactamente cómo convertir un problema en una oportunidad y una idea en un plan ejecutable con métricas claras. Eso tiene un nombre en el mercado: estrategia — y es una de las habilidades más escasas y mejor pagadas.",
    dimensions: [
      { icon: "analytics", color: "text-tertiary", bg: "bg-tertiary/10", badge: "C-E", badgeColor: "text-tertiary", title: "Código Holland: Convencional-Emprendedor", desc: "Combinás la precisión analítica del tipo Convencional con la ambición ejecutora del Emprendedor. Esta combinación es la base de los mejores directivos y consultores de negocios." },
      { icon: "calculate", color: "text-primary", bg: "bg-primary/10", badge: "92%", badgeColor: "text-primary", title: "Gardner: Lógico-Matemático", desc: "Tu inteligencia Lógico-Matemática está orientada al negocio: modelos financieros, análisis de mercado, métricas de desempeño. Ves números y relaciones causales donde otros ven datos." },
      { icon: "trending_up", color: "text-secondary", bg: "bg-secondary/10", badge: "Convergente", badgeColor: "text-secondary", title: "Kolb: Estilo Convergente", desc: "Aprendés combinando teoría y práctica con foco en la solución de problemas concretos. Sos muy efectivo en casos de estudio, simulaciones de negocios y situaciones de toma de decisión bajo presión." },
      { icon: "star", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Logro", badgeColor: "text-surface-tint", title: "Schwartz: Logro y Seguridad", desc: "Querés demostrar competencia y alcanzar posiciones de influencia, pero también valorás la estabilidad y la planificación. Eso te hace especialmente apto para roles ejecutivos de alto impacto." },
    ],
    aiAnalysis: [
      "Tu perfil estratégico-empresarial muestra una consistencia notable entre pensamiento analítico y orientación ejecutiva. Muchas personas tienen una: vos tenés ambas. Eso es lo que distingue a los analistas que solo reportan de los estrategas que deciden y lideran.",
      "El análisis también detecta alta tolerancia al riesgo calculado — tomás decisiones bajo incertidumbre, pero solo después de reducirla al máximo posible con datos y análisis. Eso es exactamente el patrón cognitivo de los mejores directivos de empresas y los más exitosos consultores independientes.",
    ],
    workStyle: ["Consultoría estratégica, banca de inversión o corporaciones.", "Trabajo orientado a métricas con ciclos de feedback cortos.", "Acceso a datos de negocio y libertad de análisis.", "Presentaciones ejecutivas y toma de decisión de alto impacto."],
    careers: [
      { name: "Consultoría Estratégica de Negocios", match: "94%", projection: "10/10", summary: "Asesorás a las organizaciones más grandes del mundo en sus decisiones críticas.", image: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "5 años + MBA", salary: "$4k – $8k USD/mes", queEstudia: "Estrategia empresarial, análisis financiero, gestión de operaciones y metodologías de consultoría.", queHace: "Resuelve problemas estratégicos complejos para Fortune 500, diseña planes de reestructuración y evalúa M&A.", universities: ["UTDT (Argentina)", "IPADE (México)", "U. Adolfo Ibáñez (Chile)"] },
      { name: "Finanzas Corporativas y Banca", match: "90%", projection: "10/10", summary: "Manejás y optimizás el flujo de capital de empresas e instituciones financieras.", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "4–5 años", salary: "$3.5k – $7k USD/mes", queEstudia: "Finanzas corporativas, mercados de capitales, contabilidad avanzada y modelos de valoración.", queHace: "Evalúa inversiones, estructura financiamientos, analiza carteras y asesora en operaciones de capital.", universities: ["UBA (Argentina)", "ITAM (México)", "PUC (Chile)"] },
      { name: "Administración y Project Management", match: "87%", projection: "9/10", summary: "Liderás la ejecución de proyectos complejos de alto impacto organizacional.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80", badge: "Versátil", duration: "4 años", salary: "$2.5k – $5k USD/mes", queEstudia: "Administración de proyectos, gestión de operaciones, liderazgo de equipos y metodologías ágiles.", queHace: "Coordina proyectos multidisciplinarios, gestiona riesgos y tiempos, y asegura el delivery de resultados en plazo y presupuesto.", universities: ["UCEMA (Argentina)", "ITESM (México)", "UAI (Chile)"] },
    ],
    roadmap: [
      { step: "1", color: "bg-tertiary", title: "Ahora (Pensá como estratega)", items: [{ title: "Casebook de consultoría", desc: "Practicá casos de McKinsey, BCG y Bain. Son el mejor entrenamiento mental que existe." }, { title: "Aprendé Excel avanzado y SQL básico", desc: "Toda decisión de negocios vive en datos. Dominár las herramientas te separa del promedio." }], extras: [{ icon: "analytics", label: "Case in Point (Libro)" }, { icon: "table_chart", label: "Excel / Power BI Free" }] },
      { step: "2", color: "bg-secondary", title: "Antes de Matricularte", items: [{ title: "Simulaciones de negocio", desc: "Competencias como Global Management Challenge o Capsim te dan experiencia real de decisión estratégica." }, { title: "Lectura del Economist y FT", desc: "Entender el contexto macro es la base del pensamiento estratégico global." }], extras: [{ icon: "emoji_events", label: "Global Mgmt Challenge" }, { icon: "newspaper", label: "The Economist / FT" }] },
    ],
    closing: "Las organizaciones más importantes del mundo pagan más por estrategas que por cualquier otro perfil. Tu capacidad de ver el bosque y los árboles simultáneamente es un activo extraordinario. Empezá a pensar en grande desde hoy.",
  },

  "constructor-pragmatico": {
    emoji: "🏗️", title: "El Constructor", titleHighlight: "Pragmático",
    fromColor: "from-primary", toColor: "to-secondary",
    tagline: "Tus manos y tu mente trabajan juntas para crear cosas que duran. El mundo tangible es tu lienzo.",
    quote: "Tenés una orientación excepcional hacia los resultados físicos y concretos. Sos de los que terminan los proyectos, construyen lo que prometieron y confían en el trabajo bien hecho. En un mundo que habla mucho y construye poco, eso es un superpoder.",
    dimensions: [
      { icon: "handyman", color: "text-primary", bg: "bg-primary/10", badge: "R puro", badgeColor: "text-primary", title: "Código Holland: Realista", desc: "Perfil Realista dominante: preferís trabajar con herramientas, máquinas y estructuras físicas. Tu satisfacción viene del resultado tangible, no de la teoría ni de las relaciones interpersonales." },
      { icon: "architecture", color: "text-secondary", bg: "bg-secondary/10", badge: "91%", badgeColor: "text-secondary", title: "Gardner: Kinestésico-Espacial", desc: "Tu inteligencia kinestésico-espacial es excepcional: entendés cómo funcionan los objetos físicos, visualizás estructuras tridimensionales y sentís la calidad de los materiales y procesos." },
      { icon: "build", color: "text-tertiary", bg: "bg-tertiary/10", badge: "Convergente", badgeColor: "text-tertiary", title: "Kolb: Estilo Convergente", desc: "Aprendés aplicando. No querés teoría sin práctica: necesitás tocar, construir, probar. Las simulaciones no te convencen; el resultado real, sí." },
      { icon: "security", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Seguridad", badgeColor: "text-surface-tint", title: "Schwartz: Seguridad y Conformidad", desc: "Valorás la estabilidad, la confiabilidad y el cumplimiento de compromisos. Construís tu reputación sobre lo que entregás, no sobre lo que prometés. Esa ética de trabajo tiene alta demanda." },
    ],
    aiAnalysis: [
      "Tu perfil pragmático-constructor es uno de los más consistentes del sistema. Hay una coherencia perfecta entre cómo pensás (concreto, sistemático) y cómo aprendés (por experiencia directa). Esto predice alta satisfacción laboral en carreras de ingeniería, arquitectura y diseño industrial.",
      "El análisis destaca una característica diferencial: alta orientación a la calidad del resultado por encima de la velocidad. Eso te hace especialmente valioso en proyectos de infraestructura y diseño donde los errores tienen consecuencias reales. Las empresas pagan más por la confiabilidad que por la velocidad.",
    ],
    workStyle: ["Ingeniería de campo, arquitectura o diseño industrial.", "Proyectos con resultados físicos medibles y verificables.", "Equipos técnicos con cultura de excelencia operativa.", "Ciclos largos con entregables claros y especificaciones precisas."],
    careers: [
      { name: "Ingeniería Civil e Industrial", match: "93%", projection: "9/10", summary: "Diseñás y construís la infraestructura que sostiene la civilización moderna.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80", badge: "Alta Demanda", duration: "5 años", salary: "$2k – $4.5k USD/mes", queEstudia: "Mecánica estructural, diseño de proyectos, gestión de obra, materiales e ingeniería de procesos.", queHace: "Diseña y supervisa la construcción de edificios, puentes, plantas industriales y sistemas de infraestructura.", universities: ["UTN (Argentina)", "IPN (México)", "U. de Santiago (Chile)"] },
      { name: "Arquitectura", match: "89%", projection: "9/10", summary: "Creás espacios que dan forma a cómo las personas viven, trabajan y sienten.", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80", badge: "Creativo-Técnico", duration: "5–6 años", salary: "$1.8k – $4k USD/mes", queEstudia: "Diseño arquitectónico, urbanismo, estructuras, instalaciones y gestión de proyectos.", queHace: "Diseña edificios y espacios urbanos, dirige estudios de arquitectura y asesora en proyectos de desarrollo inmobiliario.", universities: ["UBA – FADU (Argentina)", "UNAM – FA (México)", "U. de Chile – FAU"] },
      { name: "Diseño Industrial", match: "85%", projection: "9/10", summary: "Diseñás los objetos y productos físicos que la gente usa a diario.", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80", badge: "Innovación", duration: "4–5 años", salary: "$1.8k – $3.5k USD/mes", queEstudia: "Diseño de producto, ergonomía, modelado 3D, materiales y proceso de manufactura.", queHace: "Diseña objetos, muebles, packaging y equipamiento médico o industrial, balanceando funcionalidad, estética y producción.", universities: ["FADU – UBA (Argentina)", "UNAM (México)", "DUOC UC (Chile)"] },
    ],
    roadmap: [
      { step: "1", color: "bg-primary", title: "Ahora (Construí de verdad)", items: [{ title: "Proyectos de maker", desc: "Arduino, carpintería, impresión 3D, electrónica básica. Los makers de hoy son los ingenieros de mañana." }, { title: "Aprendé AutoCAD o SketchUp", desc: "Son las herramientas de diseño técnico más usadas. Muchos tutoriales gratuitos en YouTube." }], extras: [{ icon: "build", label: "Arduino / Tinkercad" }, { icon: "design_services", label: "AutoCAD Free Student" }] },
      { step: "2", color: "bg-secondary", title: "Antes de Matricularte", items: [{ title: "Visitá obras e industrias", desc: "Nada reemplaza ver una obra en construcción o una planta industrial funcionando." }, { title: "Concursos de diseño técnico", desc: "Olimpíadas de ingeniería, concursos de arquitectura estudiantil o challenges de diseño." }], extras: [{ icon: "factory", label: "Visita Técnica Industrial" }, { icon: "emoji_events", label: "Olimpíadas Ingeniería" }] },
    ],
    closing: "Cada puente, cada edificio, cada producto bien diseñado existe porque alguien como vos decidió hacerlo bien. El mundo físico necesita constructores que piensen. Ese sos vos.",
  },
};

const DEFAULT_KEY = "innovador-tech";

// ─── Share Modal ──────────────────────────────────────────────────────────────
function ShareModal({ title, onClose }: { title: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `Descubrí mi perfil vocacional: "${title}" con VocacionAI 🚀`;

  const copy = () => {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const socials = [
    { label: "Twitter / X", icon: "𝕏", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, color: "hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/40" },
    { label: "WhatsApp", icon: "💬", href: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, color: "hover:bg-[#25D366]/20 hover:border-[#25D366]/40" },
    { label: "LinkedIn", icon: "in", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, color: "hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/40" },
    { label: "Facebook", icon: "f", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: "hover:bg-[#1877F2]/20 hover:border-[#1877F2]/40" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative glass-card rounded-3xl p-8 w-full max-w-md space-y-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h3 className="font-headline text-xl font-bold">Compartir resultado</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {socials.map(({ label, icon, href, color }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3 bg-surface-container rounded-xl border border-outline-variant/20 transition-all ${color} font-bold text-sm`}>
              <span className="w-6 h-6 flex items-center justify-center font-black">{icon}</span>
              {label}
            </a>
          ))}
        </div>
        <div className="border-t border-outline-variant/10 pt-4">
          <p className="text-xs text-on-surface-variant mb-3">O copiá el enlace directo</p>
          <div className="flex gap-2">
            <input readOnly value={url} className="flex-1 bg-surface-container-high text-xs px-3 py-2 rounded-lg text-on-surface-variant" />
            <button onClick={copy} className="px-4 py-2 bg-primary text-on-primary-fixed rounded-lg text-xs font-bold hover:bg-primary-dim transition-colors">
              {copied ? "✓ Copiado" : "Copiar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Career Card ──────────────────────────────────────────────────────────────
function CareerCard({ career, isFirst, expanded, onToggle }: {
  career: Career; isFirst: boolean; expanded: boolean; onToggle?: () => void;
}) {
  const show = isFirst || expanded;

  if (show) {
    return (
      <div className="glass-card p-1 rounded-3xl group overflow-hidden transition-all hover:ring-2 hover:ring-primary/30">
        <div className="p-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-square mb-4">
              <img className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                alt={career.name} src={career.image} />
              <div className="absolute top-3 left-3 bg-surface-dim/90 backdrop-blur text-tertiary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                {career.badge}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Duración:</span>
                <span className="text-on-surface font-bold">{career.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Sueldo inicial:</span>
                <span className="text-tertiary font-bold">{career.salary}</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline text-2xl font-black text-primary">{career.name}</h3>
              <span className="bg-surface-container-highest px-4 py-1 rounded-full text-xs text-on-surface-variant font-medium shrink-0 ml-2">Match: {career.match}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-xs uppercase tracking-tighter font-black text-outline mb-2">Qué estudia</h4>
                <p className="text-sm text-on-surface-variant">{career.queEstudia}</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-tighter font-black text-outline mb-2">Qué hace</h4>
                <p className="text-sm text-on-surface-variant">{career.queHace}</p>
              </div>
            </div>
            <div className="mt-auto pt-6 border-t border-outline-variant/10">
              <p className="text-xs font-bold text-on-surface-variant mb-3">DÓNDE ESTUDIAR (TOP LATAM)</p>
              <div className="flex flex-wrap gap-3">
                {career.universities.map((u) => (
                  <a
                    key={u}
                    href={getUniversityHref(u)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-surface-container px-3 py-2 rounded-lg border border-outline-variant/20 flex items-center gap-2 hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {u} <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                  </a>
                ))}
              </div>
            </div>
            {!isFirst && (
              <button onClick={onToggle} className="mt-6 self-start text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">expand_less</span>
                Cerrar detalles
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center hover:ring-1 hover:ring-outline-variant/30 transition-all">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
        <img src={career.image} alt={career.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2 gap-4">
          <h3 className="font-headline text-xl font-bold">{career.name}</h3>
          <span className="text-tertiary text-xs font-black shrink-0">PROYECCIÓN GLOBAL: {career.projection}</span>
        </div>
        <p className="text-on-surface-variant text-sm">{career.summary}</p>
      </div>
      <button onClick={onToggle}
        className="w-full md:w-auto px-6 py-3 bg-surface-container-highest rounded-xl text-sm font-bold hover:text-primary hover:bg-primary/10 transition-all active:scale-95">
        Ver Detalles
      </button>
    </div>
  );
}

// ─── Main Content ─────────────────────────────────────────────────────────────
function InformeContent() {
  const searchParams = useSearchParams();
  const key = searchParams.get("perfil") || DEFAULT_KEY;
  const p: InformeData = INFORMES[key] ?? INFORMES[DEFAULT_KEY];
  const paymentStatus = searchParams.get("status") || searchParams.get("collection_status");
  const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id");
  const isPaid = paymentStatus === "approved" && Boolean(paymentId);

  const [reportDate, setReportDate] = useState("");

  useEffect(() => {
    setReportDate(
      new Date().toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  const missionId = useMemo(() => {
    const seed = `${key}:${p.title}:${p.titleHighlight}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return `#VX-${1000 + (hash % 9000)}-AI`;
  }, [key, p.title, p.titleHighlight]);

  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [showShare, setShowShare] = useState(false);

  const toggleExpanded = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handlePDF = () => window.print();
  const handleShare = async () => {
    const title = `${p.title} ${p.titleHighlight}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Mi perfil: ${title}`, text: `Descubrí mi perfil vocacional con VocacionAI: "${title}" 🚀`, url: window.location.href });
        return;
      } catch { /* cancelled, fall through */ }
    }
    setShowShare(true);
  };

  if (!isPaid) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <section className="max-w-xl w-full glass-card rounded-3xl p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-tertiary/10 mb-6">
            <span className="material-symbols-outlined text-tertiary">lock</span>
          </div>
          <h1 className="font-headline text-3xl font-black mb-4">Informe completo bloqueado</h1>
          <p className="text-on-surface-variant mb-8">
            Para acceder al informe completo primero necesitás completar el pago en Mercado Pago.
          </p>
          <a
            href={`/resultados?perfil=${encodeURIComponent(key)}`}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Ir a pagar ahora
          </a>
        </section>
      </main>
    );
  }

  return (
    <>
      {showShare && <ShareModal title={`${p.title} ${p.titleHighlight}`} onClose={() => setShowShare(false)} />}

      <nav className="fixed top-0 left-0 w-full z-50 bg-surface-dim/80 backdrop-blur-xl border-b border-outline-variant/10 px-6 py-4 flex justify-between items-center no-print">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium">
            <span className="material-symbols-outlined">arrow_back</span>
            Volver
          </a>
          <div className="h-6 w-px bg-outline-variant/20 hidden md:block"></div>
          <span className="text-on-surface-variant text-sm font-label hidden md:block">Informe de Resultados • {p.title} {p.titleHighlight}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleShare} className="bg-surface-container-high text-on-surface px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-surface-container-highest transition-all active:scale-95 font-medium">
            <span className="material-symbols-outlined">share</span>
            Compartir
          </button>
          <button onClick={handlePDF} className="bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed px-6 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(178,161,255,0.2)] active:scale-95 font-bold">
            <span className="material-symbols-outlined">picture_as_pdf</span>
            Guardar como PDF
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto pt-32 pb-20 px-6 space-y-24">
        {/* Cover */}
        <header className="relative glass-card p-12 md:p-20 rounded-[2.5rem] overflow-hidden text-center flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-tertiary/5 pointer-events-none"></div>
          <div className="mb-10 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary font-bold text-xs tracking-widest uppercase">
            INFORME VOCACIONAL IA
          </div>
          <div className="mb-8 text-8xl md:text-9xl">{p.emoji}</div>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-none mb-6">
            {p.title} <br />
            <span className={`bg-gradient-to-r ${p.fromColor} ${p.toColor} bg-clip-text text-transparent`}>{p.titleHighlight}</span>
          </h1>
          <p className="text-on-surface-variant text-xl md:text-2xl max-w-2xl mx-auto mb-12">&ldquo;{p.tagline}&rdquo;</p>
          <div className="flex flex-wrap justify-center gap-8 text-left border-t border-outline-variant/15 pt-8 w-full max-w-xl">
            <div>
              <p className="text-outline text-xs uppercase tracking-widest font-bold">PERFIL</p>
              <p className="text-on-surface font-headline font-bold text-lg">{p.title} {p.titleHighlight}</p>
            </div>
            <div className="h-10 w-px bg-outline-variant/15"></div>
            <div>
              <p className="text-outline text-xs uppercase tracking-widest font-bold">FECHA</p>
              <p className="text-on-surface font-headline font-bold text-lg">{reportDate || "--"}</p>
            </div>
            <div className="h-10 w-px bg-outline-variant/15"></div>
            <div>
              <p className="text-outline text-xs uppercase tracking-widest font-bold">ID DE MISIÓN</p>
              <p className="text-on-surface font-headline font-bold text-lg">{missionId}</p>
            </div>
          </div>
        </header>

        {/* Dimensions */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">Dimensiones del Perfil</h2>
            <span className="text-on-surface-variant text-sm font-label italic hidden md:block">Basado en algoritmos psicométricos avanzados</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {p.dimensions.map(({ icon, color, bg, badge, badgeColor, title, desc }) => (
              <div key={title} className="glass-card p-8 rounded-3xl hover:bg-surface-container-low transition-colors group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 ${bg} rounded-2xl group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                  </div>
                  <span className={`${badgeColor} font-black text-2xl`}>{badge}</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-2">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Analysis */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">Análisis Profundo de la IA</h2>
            <div className="space-y-4 text-on-surface-variant text-lg leading-relaxed">
              {p.aiAnalysis.map((par, i) => <p key={i}>{par}</p>)}
            </div>
          </div>
          <div className="bg-surface-container p-8 rounded-[2rem] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">work_outline</span>
              <h4 className="font-headline font-bold text-on-surface">Ideal Work Style</h4>
            </div>
            <ul className="space-y-4">
              {p.workStyle.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="material-symbols-outlined text-tertiary text-sm mt-0.5">check_circle</span>
                  <span className="text-sm text-on-surface-variant">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Careers */}
        <section>
          <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-10">Carreras Recomendadas</h2>
          <div className="space-y-6">
            {p.careers.map((career, i) => (
              <CareerCard key={career.name} career={career} isFirst={i === 0}
                expanded={expanded.has(i)} onToggle={() => toggleExpanded(i)} />
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-black text-on-surface mb-4">Hoja de Ruta Personalizada</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Pasos concretos para pasar de la duda a la acción profesional.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/10 hidden md:block"></div>
            {p.roadmap.map((phase) => (
              <div key={phase.step} className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-full ${phase.color} text-on-primary-fixed flex items-center justify-center font-black`}>{phase.step}</span>
                  <h3 className="font-headline text-2xl font-bold">{phase.title}</h3>
                </div>
                <div className="space-y-4">
                  {phase.items.map((item) => (
                    <div key={item.title} className={`bg-surface-container-low p-5 rounded-2xl border-l-4 ${phase.color.replace("bg-", "border-")}`}>
                      <p className="font-bold text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-on-surface-variant">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {phase.extras.map((e) => (
                    <div key={e.label} className="p-4 rounded-xl bg-surface-container flex flex-col gap-2">
                      <span className={`material-symbols-outlined text-primary`}>{e.icon}</span>
                      <span className="text-xs font-bold">{e.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing */}
        <footer className="pt-20 border-t border-outline-variant/15 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-6xl">{p.emoji}</div>
            <h2 className="font-headline text-4xl font-black text-on-surface">Tu misión apenas comienza.</h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">{p.closing}</p>
            <div className="flex justify-center gap-4 no-print">
              <button onClick={handleShare} className="bg-primary/10 text-primary px-8 py-4 rounded-2xl font-black hover:bg-primary/20 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">share</span>
                Compartir
              </button>
              <button onClick={handlePDF} className="bg-tertiary/10 text-tertiary px-8 py-4 rounded-2xl font-black hover:bg-tertiary/20 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">picture_as_pdf</span>
                Guardar PDF
              </button>
            </div>
          </div>
        </footer>
      </main>

      <footer className="w-full mt-20 pt-12 pb-8 bg-[#0e0e13] border-t border-[#48474d]/15 no-print">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-lg font-bold text-[#b2a1ff]">VocacionAI</div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-sm text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Privacy Policy</a>
            <a className="text-sm text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Terms of Service</a>
          </div>
          <div className="text-right text-sm text-[#acaab1]">© 2024 VocacionAI. Launch your mission.</div>
        </div>
      </footer>
    </>
  );
}

export default function InformePage() {
  return (
    <Suspense>
      <InformeContent />
    </Suspense>
  );
}
