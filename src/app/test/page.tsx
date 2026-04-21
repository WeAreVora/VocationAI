"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BLOCKS = [
  { name: "Bloque 1: Holland RIASEC", category: "Personalidad e Intereses" },
  { name: "Bloque 2: Gardner", category: "Inteligencias Múltiples" },
  { name: "Bloque 3: Kolb", category: "Estilos de Aprendizaje" },
  { name: "Bloque 4: Schwartz", category: "Valores y Motivaciones" },
];

type Opt = { icon: string; label: string; desc: string };
type Q = { block: number; q: string; opts: [Opt, Opt, Opt, Opt] };

const QUESTIONS: Q[] = [
  // --- Bloque 1: Holland RIASEC ---
  {
    block: 0,
    q: "¿Qué actividad te resulta más gratificante al trabajar en un proyecto?",
    opts: [
      { icon: "architecture", label: "Diseñar la estructura", desc: "Planificar cómo funcionará todo desde cero." },
      { icon: "groups", label: "Liderar al equipo", desc: "Organizar personas hacia un objetivo común." },
      { icon: "terminal", label: "Resolver problemas técnicos", desc: "Encontrar soluciones a retos complejos." },
      { icon: "palette", label: "Cuidar la estética", desc: "Que el resultado sea visualmente impactante." },
    ],
  },
  {
    block: 0,
    q: "En tu tiempo libre, ¿qué preferís hacer?",
    opts: [
      { icon: "build", label: "Armar o reparar cosas", desc: "Trabajar con las manos en proyectos físicos." },
      { icon: "search", label: "Investigar temas nuevos", desc: "Leer y aprender sobre lo que te apasiona." },
      { icon: "music_note", label: "Crear arte o música", desc: "Expresarte a través de medios creativos." },
      { icon: "celebration", label: "Organizar eventos sociales", desc: "Conectar con personas y armar experiencias." },
    ],
  },
  {
    block: 0,
    q: "Si pudieras elegir un ambiente de trabajo ideal, ¿cuál sería?",
    opts: [
      { icon: "park", label: "Al aire libre o con herramientas", desc: "Espacios físicos con maquinaria y movimiento." },
      { icon: "science", label: "Un laboratorio o centro de investigación", desc: "Explorar y descubrir cosas nuevas." },
      { icon: "brush", label: "Un estudio creativo o agencia", desc: "Crear y diseñar en un entorno estimulante." },
      { icon: "support_agent", label: "Una oficina de ayuda a personas", desc: "Trabajar directamente con y para la gente." },
    ],
  },
  {
    block: 0,
    q: "¿Cuál de estas habilidades describís como tu mayor fortaleza?",
    opts: [
      { icon: "handyman", label: "Habilidades manuales y técnicas", desc: "Construir, reparar y operar con destreza." },
      { icon: "analytics", label: "Capacidad analítica y crítica", desc: "Analizar datos y encontrar patrones." },
      { icon: "auto_awesome", label: "Expresión artística y creatividad", desc: "Generar ideas originales e inspiradoras." },
      { icon: "chat", label: "Comunicación y empatía", desc: "Conectar con las personas naturalmente." },
    ],
  },
  {
    block: 0,
    q: "Cuando tenés que resolver un problema, ¿qué hacés primero?",
    opts: [
      { icon: "data_exploration", label: "Buscás datos e información", desc: "Investigar antes de tomar cualquier decisión." },
      { icon: "group", label: "Lo hablás con otras personas", desc: "Escuchar distintas perspectivas primero." },
      { icon: "lightbulb", label: "Explorás soluciones creativas", desc: "Generar ideas originales y fuera de la caja." },
      { icon: "checklist", label: "Organizás un plan paso a paso", desc: "Establecer un método ordenado y claro." },
    ],
  },
  {
    block: 0,
    q: "¿Qué tipo de proyectos te atraen más?",
    opts: [
      { icon: "construction", label: "Construir algo con las manos", desc: "Crear objetos o estructuras físicas reales." },
      { icon: "biotech", label: "Investigar y descubrir", desc: "Ampliar el conocimiento en algún campo." },
      { icon: "design_services", label: "Diseñar algo visualmente impactante", desc: "Crear experiencias o piezas visuales." },
      { icon: "manage_accounts", label: "Liderar un equipo hacia una meta", desc: "Coordinar personas para lograr resultados." },
    ],
  },
  {
    block: 0,
    q: "En un grupo de trabajo, ¿qué rol tomás naturalmente?",
    opts: [
      { icon: "engineering", label: "El que ejecuta las tareas técnicas", desc: "Implementar la parte práctica del proyecto." },
      { icon: "strategy", label: "El analista o estratega", desc: "Pensar la lógica y la dirección del proyecto." },
      { icon: "tips_and_updates", label: "El creativo que genera ideas", desc: "Proponer enfoques nuevos e innovadores." },
      { icon: "hub", label: "El que coordina al equipo", desc: "Unir a las personas y mantener el foco." },
    ],
  },
  {
    block: 0,
    q: "¿Cuál de estas materias disfrutabas más en la escuela?",
    opts: [
      { icon: "sports_gymnastics", label: "Educación física o talleres técnicos", desc: "Actividades prácticas y físicas." },
      { icon: "calculate", label: "Matemática, Física o Biología", desc: "Ciencias exactas y naturales." },
      { icon: "music_note", label: "Arte, Música o Literatura", desc: "Materias creativas y expresivas." },
      { icon: "public", label: "Historia, Geografía o Sociales", desc: "Ciencias humanas y sociales." },
    ],
  },
  {
    block: 0,
    q: "¿Qué te motiva más en el trabajo?",
    opts: [
      { icon: "task_alt", label: "Ver resultados tangibles y concretos", desc: "Que el producto final sea visible y real." },
      { icon: "school", label: "Aprender cosas nuevas constantemente", desc: "Estar siempre en modo de crecimiento." },
      { icon: "create", label: "Expresar tu visión y creatividad", desc: "Dejar tu huella en lo que hacés." },
      { icon: "volunteer_activism", label: "Impactar positivamente en otros", desc: "Que tu trabajo mejore vidas." },
    ],
  },
  {
    block: 0,
    q: "¿Cuál de estas carreras te llama más la atención?",
    opts: [
      { icon: "architecture", label: "Ingeniería o Arquitectura", desc: "Diseñar y construir estructuras y sistemas." },
      { icon: "biotech", label: "Ciencias o Investigación", desc: "Descubrir y generar conocimiento nuevo." },
      { icon: "brush", label: "Diseño, Arte o Comunicación", desc: "Crear y transmitir ideas visualmente." },
      { icon: "psychology", label: "Psicología, Educación o Social", desc: "Ayudar a las personas a crecer y mejorar." },
    ],
  },
  // --- Bloque 2: Gardner ---
  {
    block: 1,
    q: "¿De qué manera aprendés mejor información nueva?",
    opts: [
      { icon: "menu_book", label: "Leyendo y escribiendo", desc: "Procesar información a través del texto." },
      { icon: "bar_chart", label: "Con gráficos y diagramas", desc: "Entender mediante representaciones visuales." },
      { icon: "hearing", label: "Escuchando y discutiendo", desc: "Aprender en conversaciones y debates." },
      { icon: "sports_handball", label: "Haciendo y experimentando", desc: "La práctica directa como mejor maestra." },
    ],
  },
  {
    block: 1,
    q: "Cuando explicás algo a alguien, ¿cómo lo hacés?",
    opts: [
      { icon: "text_fields", label: "Con palabras precisas y ordenadas", desc: "Articulando ideas verbalmente con claridad." },
      { icon: "draw", label: "Dibujando o haciendo esquemas", desc: "Representar visualmente lo que querés decir." },
      { icon: "lightbulb", label: "Con ejemplos de la vida real", desc: "Conectar con situaciones cotidianas." },
      { icon: "calculate", label: "Con números y lógica", desc: "Demostrar con datos y razonamiento concreto." },
    ],
  },
  {
    block: 1,
    q: "¿En qué tipo de actividades sobresalís naturalmente?",
    opts: [
      { icon: "format_quote", label: "Debates, escritura o narración", desc: "Comunicar ideas con palabras con habilidad." },
      { icon: "extension", label: "Cálculos, puzzles o estrategia", desc: "Resolver problemas lógicos y abstractos." },
      { icon: "directions_run", label: "Deportes, danza o actividad física", desc: "Actividades que involucran el cuerpo." },
      { icon: "psychology", label: "Entender personas y emociones", desc: "Leer y conectar profundamente con los demás." },
    ],
  },
  {
    block: 1,
    q: "Si tuvieras que memorizar algo importante, ¿cómo lo harías?",
    opts: [
      { icon: "edit_note", label: "Escribiéndolo repetidamente", desc: "La escritura como herramienta de memoria." },
      { icon: "account_tree", label: "Creando un mapa mental visual", desc: "Representar la información visualmente." },
      { icon: "music_note", label: "Poniéndolo en una canción o ritmo", desc: "Usar la música como recurso mnemónico." },
      { icon: "self_improvement", label: "Moviéndote o actuándolo", desc: "El movimiento como apoyo a la memoria." },
    ],
  },
  {
    block: 1,
    q: "¿Cuál de estas actividades disfrutarías más?",
    opts: [
      { icon: "article", label: "Escribir un relato o artículo", desc: "Expresarte a través de las palabras escritas." },
      { icon: "extension", label: "Resolver un rompecabezas o acertijo", desc: "Desafiar tu mente con lógica y estrategia." },
      { icon: "music_note", label: "Tocar un instrumento o cantar", desc: "Crear o interpretar música con emoción." },
      { icon: "group_work", label: "Liderar un proyecto grupal", desc: "Trabajar en equipo hacia una meta común." },
    ],
  },
  {
    block: 1,
    q: "¿Cómo describís tu relación con la música?",
    opts: [
      { icon: "favorite", label: "La sentís profundamente", desc: "La música te mueve y afecta emocionalmente." },
      { icon: "volume_down", label: "La usás de fondo solamente", desc: "Te acompaña pero no es central en tu vida." },
      { icon: "directions_run", label: "Preferís actividades físicas", desc: "El movimiento es tu forma de expresión." },
      { icon: "self_improvement", label: "Preferís el silencio para concentrarte", desc: "Necesitás quietud para funcionar bien." },
    ],
  },
  {
    block: 1,
    q: "¿Cómo preferís recibir instrucciones para una tarea nueva?",
    opts: [
      { icon: "description", label: "Por escrito con todos los detalles", desc: "Una guía clara y completa en papel." },
      { icon: "image", label: "Con diagramas o ejemplos visuales", desc: "Ilustraciones que muestren el proceso." },
      { icon: "record_voice_over", label: "Explicado verbalmente por alguien", desc: "Escuchar la explicación de otra persona." },
      { icon: "touch_app", label: "Directamente intentándolo", desc: "Aprender en la práctica, sin preámbulos." },
    ],
  },
  {
    block: 1,
    q: "¿Cuál de estos trabajos te parecería más interesante?",
    opts: [
      { icon: "gavel", label: "Escritor, periodista o abogado", desc: "Profesiones centradas en el lenguaje." },
      { icon: "code", label: "Matemático, programador o científico", desc: "Lógica, datos y tecnología." },
      { icon: "theater_comedy", label: "Músico, actor o bailarín", desc: "Arte performativo y expresión corporal." },
      { icon: "school", label: "Terapeuta, maestro o líder social", desc: "Ayudar y guiar a otras personas." },
    ],
  },
  {
    block: 1,
    q: "¿Qué describís mejor la forma en que pensás?",
    opts: [
      { icon: "chat_bubble", label: "Pienso en palabras y frases", desc: "Tu mente trabaja en lenguaje verbal." },
      { icon: "image_search", label: "Pienso en imágenes y espacios", desc: "Tu mente crea representaciones visuales." },
      { icon: "hub", label: "Pienso en relaciones y patrones", desc: "Ves conexiones y estructuras lógicas." },
      { icon: "accessibility_new", label: "Pienso en sensaciones y movimientos", desc: "Procesás el mundo de forma kinestésica." },
    ],
  },
  {
    block: 1,
    q: "Cuando tenés tiempo libre, ¿qué actividad elegís más seguido?",
    opts: [
      { icon: "local_library", label: "Leer, escribir o aprender algo", desc: "Expandir tu mente con contenido nuevo." },
      { icon: "nature", label: "Explorar la naturaleza", desc: "Conectar con el mundo natural que te rodea." },
      { icon: "people", label: "Pasar tiempo con personas queridas", desc: "Disfrutar de conexiones interpersonales." },
      { icon: "sports", label: "Hacer deporte o actividad física", desc: "Mover el cuerpo y liberar energía." },
    ],
  },
  // --- Bloque 3: Kolb ---
  {
    block: 2,
    q: "Cuando empezás algo nuevo, ¿qué hacés primero?",
    opts: [
      { icon: "bolt", label: "Te lanzás y aprendés haciendo", desc: "La acción directa como punto de partida." },
      { icon: "visibility", label: "Observás cómo lo hacen otros", desc: "Ver antes de intentarlo vos mismo/a." },
      { icon: "search", label: "Buscás teoría e información primero", desc: "Entender el marco antes de actuar." },
      { icon: "science", label: "Experimentás directamente con el problema", desc: "Explorar distintas soluciones de inmediato." },
    ],
  },
  {
    block: 2,
    q: "¿Cuál es tu forma más natural de aprender algo?",
    opts: [
      { icon: "explore", label: "Viviendo experiencias directas", desc: "El aprendizaje viene de la vida misma." },
      { icon: "self_improvement", label: "Reflexionando sobre lo observado", desc: "Procesar mentalmente las experiencias vividas." },
      { icon: "lightbulb", label: "Analizando conceptos abstractos", desc: "Comprender teorías y marcos de referencia." },
      { icon: "touch_app", label: "Probando activamente alternativas", desc: "Experimentar hasta encontrar lo que funciona." },
    ],
  },
  {
    block: 2,
    q: "¿Qué se te da con mayor facilidad en un proyecto nuevo?",
    opts: [
      { icon: "sync", label: "Adaptarme rápido a los cambios", desc: "La flexibilidad es tu mayor fortaleza." },
      { icon: "tips_and_updates", label: "Generar múltiples ideas creativas", desc: "Imaginar posibilidades desde distintos ángulos." },
      { icon: "sort", label: "Organizar información lógicamente", desc: "Crear estructuras ordenadas y coherentes." },
      { icon: "build_circle", label: "Encontrar soluciones prácticas", desc: "Ir directo al problema concreto." },
    ],
  },
  {
    block: 2,
    q: "Cuando cometés un error, ¿cómo reaccionás?",
    opts: [
      { icon: "hiking", label: "Lo tomás como aprendizaje directo", desc: "Seguís adelante con la experiencia ganada." },
      { icon: "psychology", label: "Reflexionás sobre qué salió mal", desc: "Analizar el error profundamente antes de avanzar." },
      { icon: "troubleshoot", label: "Analizás las causas sistemáticamente", desc: "Descomponer el error para entenderlo bien." },
      { icon: "replay", label: "Probás otra solución de inmediato", desc: "Iterar rápidamente hacia una mejor respuesta." },
    ],
  },
  {
    block: 2,
    q: "¿Qué tipo de actividades preferís en el trabajo o estudio?",
    opts: [
      { icon: "travel_explore", label: "Prácticas en campo o terreno", desc: "Aprender mediante experiencias reales." },
      { icon: "forum", label: "Debates y lluvia de ideas", desc: "Explorar perspectivas en grupo." },
      { icon: "import_contacts", label: "Lecturas y material teórico", desc: "Profundizar en el conocimiento base." },
      { icon: "science", label: "Laboratorios y proyectos aplicados", desc: "Poner la teoría en práctica concreta." },
    ],
  },
  {
    block: 2,
    q: "¿Cómo tomás decisiones importantes?",
    opts: [
      { icon: "favorite", label: "Siguiendo tu intuición y sentimiento", desc: "Tu instinto es tu mejor guía." },
      { icon: "panorama", label: "Observando todas las perspectivas", desc: "Ver el panorama completo antes de elegir." },
      { icon: "balance", label: "Analizando pros y contras metódicamente", desc: "Evaluar cada opción con lógica." },
      { icon: "directions_run", label: "Actuando y ajustando sobre la marcha", desc: "La acción genera la claridad." },
    ],
  },
  {
    block: 2,
    q: "¿Cuál de estas palabras te define mejor?",
    opts: [
      { icon: "bolt", label: "Espontáneo/a y adaptable", desc: "Fluís con lo que sucede naturalmente." },
      { icon: "auto_awesome", label: "Imaginativo/a y empático/a", desc: "Tu creatividad y sensibilidad son únicas." },
      { icon: "checklist", label: "Analítico/a y organizado/a", desc: "Estructurás todo con claridad y método." },
      { icon: "flag", label: "Práctico/a y orientado/a a resultados", desc: "Enfocado/a en cumplir objetivos concretos." },
    ],
  },
  {
    block: 2,
    q: "¿Cómo preferís trabajar?",
    opts: [
      { icon: "groups", label: "En grupos activos e interactivos", desc: "Disfrutás la energía y colaboración grupal." },
      { icon: "visibility", label: "Observando y reflexionando el trabajo", desc: "Preferís entender bien antes de participar." },
      { icon: "person", label: "Solo/a con un plan claro", desc: "La independencia y estructura son clave." },
      { icon: "task_alt", label: "Enfocado/a en resolver problemas", desc: "Lo que importa es el resultado final." },
    ],
  },
  {
    block: 2,
    q: "¿Qué tipo de contenido preferís consumir?",
    opts: [
      { icon: "auto_stories", label: "Autobiografías y relatos reales", desc: "Aprender de las experiencias vividas por otros." },
      { icon: "psychology", label: "Contenido reflexivo y profundo", desc: "Ideas que desafían tu forma de pensar." },
      { icon: "school", label: "Textos académicos y teóricos", desc: "Material riguroso y bien fundamentado." },
      { icon: "menu_book", label: "Guías prácticas y tutoriales", desc: "Contenido orientado directamente a la acción." },
    ],
  },
  {
    block: 2,
    q: "¿Cómo describís tu proceso para resolver un problema?",
    opts: [
      { icon: "rocket_launch", label: "Lo intentás directamente primero", desc: "La acción genera el aprendizaje." },
      { icon: "manage_search", label: "Lo estudiás desde distintos ángulos", desc: "Una perspectiva completa antes de actuar." },
      { icon: "architecture", label: "Construís un marco teórico primero", desc: "La teoría guía la práctica." },
      { icon: "speed", label: "Buscás la solución más eficiente", desc: "Implementar lo que funciona mejor y rápido." },
    ],
  },
  // --- Bloque 4: Schwartz ---
  {
    block: 3,
    q: "¿Qué es lo más importante para vos en una carrera profesional?",
    opts: [
      { icon: "key", label: "Libertad de tomar mis propias decisiones", desc: "La autonomía es innegociable para mí." },
      { icon: "explore", label: "Desafíos nuevos y constante estimulación", desc: "Necesito que cada día sea diferente." },
      { icon: "emoji_events", label: "El reconocimiento y el éxito visible", desc: "Que mi trabajo sea valorado por otros." },
      { icon: "volunteer_activism", label: "Contribuir al bienestar de los demás", desc: "El impacto social es mi motor principal." },
    ],
  },
  {
    block: 3,
    q: "¿Cuál de estos valores es más importante para vos?",
    opts: [
      { icon: "self_improvement", label: "Independencia y autonomía", desc: "Ser dueño/a de mis propias decisiones." },
      { icon: "balance", label: "Justicia e igualdad", desc: "Que el mundo sea más justo para todos." },
      { icon: "favorite", label: "Lealtad y cuidado de los cercanos", desc: "Proteger y apoyar a quienes querés." },
      { icon: "shield", label: "Seguridad y estabilidad", desc: "Tener una base firme bajo tus pies." },
    ],
  },
  {
    block: 3,
    q: "¿Qué te motivaría más en tu trabajo diario?",
    opts: [
      { icon: "auto_awesome", label: "Explorar ideas nuevas y ser creativo/a", desc: "La libertad creativa como combustible." },
      { icon: "flag", label: "Tener metas claras y alcanzarlas", desc: "El progreso medible genera satisfacción." },
      { icon: "handshake", label: "Buenas relaciones con mis colegas", desc: "El ambiente humano es lo primero." },
      { icon: "savings", label: "Un trabajo estable y bien remunerado", desc: "La estabilidad económica como base." },
    ],
  },
  {
    block: 3,
    q: "Si pudieras cambiar algo del mundo, ¿qué sería?",
    opts: [
      { icon: "diversity_3", label: "Reducir las desigualdades sociales", desc: "Que todos tengan las mismas oportunidades." },
      { icon: "eco", label: "Proteger el medio ambiente", desc: "Un planeta más sano para el futuro." },
      { icon: "open_in_new", label: "Crear más oportunidades de crecimiento", desc: "Que cada persona pueda desarrollar su potencial." },
      { icon: "rule", label: "Establecer más orden y estructura eficiente", desc: "Sistemas que funcionen para todos." },
    ],
  },
  {
    block: 3,
    q: "¿Cómo describís tu forma de relacionarte con los demás?",
    opts: [
      { icon: "person", label: "Valoro mi espacio y la independencia", desc: "Las relaciones deben respetar la autonomía." },
      { icon: "celebration", label: "Me gusta romper rutinas con otros", desc: "La espontaneidad hace especiales los vínculos." },
      { icon: "groups", label: "Priorizo el bienestar del grupo", desc: "Lo colectivo por encima de lo individual." },
      { icon: "star", label: "Me importa el reconocimiento mutuo", desc: "Valorar y ser valorado/a en los vínculos." },
    ],
  },
  {
    block: 3,
    q: "¿Qué tipo de logros te generan mayor satisfacción?",
    opts: [
      { icon: "flag", label: "Metas que yo mismo/a me propuse", desc: "La autodirección como fuente de orgullo." },
      { icon: "public", label: "Logros que impactan a muchas personas", desc: "El cambio colectivo como medida del éxito." },
      { icon: "emoji_events", label: "Logros que demuestran mi capacidad", desc: "El reconocimiento externo valida el esfuerzo." },
      { icon: "home", label: "Logros que aseguran mi futuro", desc: "La estabilidad a largo plazo como meta." },
    ],
  },
  {
    block: 3,
    q: "Ante un conflicto ético en el trabajo, ¿cómo reaccionarías?",
    opts: [
      { icon: "gavel", label: "Defendés tus principios aunque cueste", desc: "La integridad personal es innegociable." },
      { icon: "handshake", label: "Buscás la solución que beneficie a todos", desc: "El consenso y el bien común primero." },
      { icon: "rule", label: "Seguís las reglas y procedimientos", desc: "El orden institucional da seguridad." },
      { icon: "strategy", label: "Tomás la decisión más estratégica", desc: "El resultado final es lo que importa." },
    ],
  },
  {
    block: 3,
    q: "¿Qué tipo de sociedad te parece más deseable?",
    opts: [
      { icon: "key", label: "Que promueva la libertad individual", desc: "Cada persona libre de elegir su propio camino." },
      { icon: "volunteer_activism", label: "Que cuide a los más vulnerables", desc: "La solidaridad como valor central." },
      { icon: "security", label: "Con orden, reglas y estructura clara", desc: "La predictibilidad genera bienestar colectivo." },
      { icon: "emoji_events", label: "Meritocrática donde el esfuerzo paga", desc: "El trabajo duro como camino al éxito." },
    ],
  },
  {
    block: 3,
    q: "Si pudieras elegir libremente tu estilo de vida, ¿cuál sería?",
    opts: [
      { icon: "explore", label: "Llena de aventuras y experiencias nuevas", desc: "La novedad constante como forma de vida." },
      { icon: "public", label: "Dedicada a un propósito mayor", desc: "Vivir para algo más grande que uno mismo." },
      { icon: "workspace_premium", label: "Con logros reconocidos y éxito", desc: "El prestigio y los resultados como metas." },
      { icon: "home", label: "Tranquila, estable y segura", desc: "La paz y la previsibilidad como felicidad." },
    ],
  },
  {
    block: 3,
    q: "¿Cuál de estas frases te representa más?",
    opts: [
      { icon: "navigation", label: "\"Prefiero decidir sobre mi propio camino\"", desc: "La autonomía y auto-dirección te definen." },
      { icon: "eco", label: "\"Quiero dejar el mundo mejor de lo que lo encontré\"", desc: "El impacto y la trascendencia te mueven." },
      { icon: "fitness_center", label: "\"El éxito se construye con esfuerzo\"", desc: "El logro y el mérito son tu filosofía." },
      { icon: "shield", label: "\"La seguridad es la base de todo\"", desc: "La estabilidad es tu valor fundamental." },
    ],
  },
];

function getProfileKey(answers: (number | null)[]): string {
  const bc: number[][] = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  answers.forEach((a, i) => { if (a !== null) bc[QUESTIONS[i].block][a]++; });
  const d = bc.map(c => c.indexOf(Math.max(...c)));
  const [h, g, k, s] = d;
  if (h === 1) {
    if (g === 1) return "innovador-tech";
    if (g === 3) return "explorador-naturalista";
    if (k === 2) return "cientifico-analitico";
    return "explorador-naturalista";
  }
  if (h === 2) {
    if (g === 0) return "comunicador-estrategico";
    if (g === 1) return "creativo-digital";
    return "artista-expresivo";
  }
  if (h === 3) {
    if (s === 2) return "lider-emprendedor";
    if (s === 1) return "humanista-social";
    return "agente-cambio";
  }
  if (s === 2) return "estratega-negocios";
  return "constructor-pragmatico";
}

export default function TestPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "quiz" | "outro">("intro");
  const [profileKey, setProfileKey] = useState("");

  // Intro state
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  // Quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(40).fill(null));

  // Outro state
  const [outroStep, setOutroStep] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    if (phase !== "intro") return;
    const timers = [
      setTimeout(() => setVisibleMsgs(1), 600),
      setTimeout(() => setVisibleMsgs(2), 2000),
      setTimeout(() => setVisibleMsgs(3), 3400),
      setTimeout(() => setShowBtn(true), 4600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "outro") return;
    const t = setTimeout(() => setOutroStep(1), 800);
    return () => clearTimeout(t);
  }, [phase]);

  const q = QUESTIONS[currentQ];
  const selected = answers[currentQ];
  const qNum = currentQ + 1;
  const progressPct = `${Math.round((qNum / 40) * 100)}%`;

  const handleSelect = (idx: number) => {
    const next = [...answers];
    next[currentQ] = idx;
    setAnswers(next);
  };

  const handleNext = () => {
    if (selected === null) return;
    if (currentQ < 39) {
      setCurrentQ((n) => n + 1);
    } else {
      setProfileKey(getProfileKey(answers));
      setPhase("outro");
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((n) => n - 1);
  };

  const handleSendFeedback = () => {
    if (!feedback.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => setOutroStep(2), 900);
    setTimeout(() => setOutroStep(3), 2400);
  };

  const BotAvatar = () => (
    <div className="flex items-center space-x-4 mb-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(178,161,255,0.15)]">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-tertiary rounded-full border-4 border-surface shadow-[0_0_10px_rgba(102,255,199,0.5)]" />
      </div>
      <div>
        <h2 className="font-headline font-bold text-xl leading-tight">VocaIA</h2>
        <p className="text-on-surface-variant text-sm flex items-center">
          <span className="w-2 h-2 bg-tertiary rounded-full mr-2 inline-block" />
          AI Counselor Online
        </p>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0e0e13]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(178,161,255,0.08)]">
        <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto font-headline tracking-tight">
          <a href="/" className="text-2xl font-black bg-gradient-to-br from-[#b2a1ff] to-[#7857f8] bg-clip-text text-transparent">
            VocacionAI
          </a>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors" href="/">Inicio</a>
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors" href="#">Careers</a>
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors" href="#">Mentors</a>
          </div>
        </nav>
      </header>

      <main className="min-h-screen pt-24 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-tertiary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto">

          {/* ── INTRO ── */}
          {phase === "intro" && (
            <section className="flex flex-col space-y-6">
              <BotAvatar />

              <div className="space-y-4 max-w-2xl">
                <div className={`glass-panel p-5 rounded-2xl rounded-tl-none border-l-4 border-primary/40 transition-all duration-500 ease-out ${
                  visibleMsgs >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <p className="text-on-surface leading-relaxed">¡Hola! Soy VocaIA, tu guía en esta misión de descubrimiento profesional. 🚀</p>
                </div>

                <div className={`glass-panel p-5 rounded-2xl rounded-tl-none border-l-4 border-primary/40 transition-all duration-500 ease-out ${
                  visibleMsgs >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <p className="text-on-surface leading-relaxed">
                    Tengo preparado un análisis profundo para vos:{" "}
                    <span className="text-primary font-bold">40 preguntas</span> divididas en{" "}
                    <span className="text-primary font-bold">4 bloques</span> estratégicos.
                  </p>
                </div>

                <div className={`glass-panel p-5 rounded-2xl rounded-tl-none border-l-4 border-primary/40 transition-all duration-500 ease-out ${
                  visibleMsgs >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="material-symbols-outlined text-tertiary">timer</span>
                    <span className="font-bold">8 minutos aproximados</span>
                  </div>
                  <p className="text-on-surface-variant">Solo respondé con sinceridad. ¿Estás listo para despegar?</p>
                </div>
              </div>

              <div className={`pt-8 transition-all duration-500 ease-out ${
                showBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                <button
                  onClick={() => setPhase("quiz")}
                  className="group relative px-10 py-5 bg-gradient-to-br from-primary to-primary-dim rounded-xl font-headline font-black text-on-primary text-lg shadow-[0_10px_40px_rgba(120,87,248,0.3)] hover:scale-[1.03] transition-all duration-300 active:scale-95"
                >
                  Sí, empezar el test
                  <span className="ml-2 material-symbols-outlined align-middle transition-transform group-hover:translate-x-1">rocket_launch</span>
                </button>
              </div>
            </section>
          )}

          {/* ── QUIZ ── */}
          {phase === "quiz" && (
            <section>
              {/* Progress header */}
              <div className="mb-12 space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-on-surface-variant text-sm font-bold uppercase tracking-widest">Misión Actual</span>
                    <h3 className="font-headline text-2xl font-black text-primary">{BLOCKS[q.block].name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black font-headline tabular-nums">
                      {String(qNum).padStart(2, "0")}
                      <span className="text-on-surface-variant text-lg">/40</span>
                    </span>
                  </div>
                </div>
                <div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full shadow-[0_0_15px_rgba(102,255,199,0.3)] transition-all duration-500 ease-out"
                    style={{ width: progressPct }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="glass-panel p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                <div className="relative z-10 space-y-8">
                  <div className="space-y-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-tighter">
                      {BLOCKS[q.block].category}
                    </span>
                    <h4 className="text-2xl md:text-4xl font-headline font-extrabold leading-tight tracking-tight">
                      {q.q}
                    </h4>
                  </div>

                  {/* Options grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.opts.map((opt, idx) => {
                      const isSelected = selected === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(idx)}
                          className={`flex flex-col items-start p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                            isSelected
                              ? "bg-primary/5 border-primary shadow-[0_0_30px_rgba(178,161,255,0.1)]"
                              : "bg-surface-container-high hover:bg-surface-container-highest border-transparent hover:border-primary/50"
                          }`}
                        >
                          <div className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isSelected ? "bg-primary text-on-primary" : "bg-primary/10 text-primary"
                          }`}>
                            <span
                              className="material-symbols-outlined"
                              style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              {opt.icon}
                            </span>
                          </div>
                          <span className="font-bold text-lg mb-1 text-on-surface">{opt.label}</span>
                          <p className="text-sm text-on-surface-variant">{opt.desc}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                    <button
                      onClick={handlePrev}
                      disabled={currentQ === 0}
                      className="flex items-center space-x-2 text-on-surface-variant hover:text-on-surface transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                      <span>Anterior</span>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={selected === null}
                      className="px-8 py-3 bg-primary rounded-xl font-headline font-bold text-on-primary shadow-lg hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {currentQ === 39 ? "Finalizar test →" : "Siguiente pregunta"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-4 opacity-40">
                <span className="text-xs uppercase tracking-widest font-bold">Tip de VocaIA:</span>
                <p className="text-sm">No hay respuestas incorrectas, solo tu esencia.</p>
              </div>
            </section>
          )}

          {/* ── OUTRO ── */}
          {phase === "outro" && (
            <section className="flex flex-col space-y-6">
              <BotAvatar />

              <div className="space-y-4 max-w-2xl">
                {/* Bot msg 1 */}
                <div className={`glass-panel p-5 rounded-2xl rounded-tl-none border-l-4 border-primary/40 transition-all duration-500 ease-out ${
                  outroStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <p className="text-on-surface leading-relaxed">
                    🎉 ¡Felicitaciones por completar el test! ¿Qué te pareció la experiencia?
                  </p>
                </div>

                {/* User input */}
                {outroStep >= 1 && !feedbackSent && (
                  <div className="flex gap-3 items-end animate-fade-in-up">
                    <div className="flex-1 bg-surface-container-high rounded-2xl border border-outline-variant/20">
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendFeedback();
                          }
                        }}
                        placeholder="Contame tu experiencia..."
                        rows={2}
                        className="w-full bg-transparent px-4 py-3 text-on-surface placeholder:text-on-surface-variant text-sm resize-none focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={handleSendFeedback}
                      disabled={!feedback.trim()}
                      className="p-4 bg-primary rounded-xl text-on-primary disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform active:scale-95"
                    >
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                )}

                {/* User message bubble */}
                {feedbackSent && (
                  <div className="flex justify-end animate-fade-in-up">
                    <div className="bg-primary/10 border border-primary/20 p-5 rounded-2xl rounded-tr-none max-w-lg">
                      <p className="text-on-surface">{feedback}</p>
                    </div>
                  </div>
                )}

                {/* Bot msg 2 */}
                {outroStep >= 2 && (
                  <div className="glass-panel p-5 rounded-2xl rounded-tl-none border-l-4 border-primary/40 animate-fade-in-up">
                    <p className="text-on-surface leading-relaxed">
                      ¡Gracias por compartirlo! Tu opinión nos ayuda a mejorar y calibrar cada vez mejor nuestro análisis. 🙌
                    </p>
                  </div>
                )}

                {/* Bot msg 3 */}
                {outroStep >= 3 && (
                  <div className="glass-panel p-5 rounded-2xl rounded-tl-none border-l-4 border-tertiary/40 animate-fade-in-up">
                    <p className="text-on-surface leading-relaxed">
                      ✨ Acá te comparto cuál es tu perfil vocacional. ¡Estoy seguro de que te va a sorprender!
                    </p>
                  </div>
                )}

                {/* Ver Perfil button */}
                {outroStep >= 3 && (
                  <div className="pt-4 animate-fade-in-up">
                    <button
                      onClick={() => router.push("/resultados?perfil=" + profileKey)}
                      className="group px-10 py-5 bg-gradient-to-br from-primary to-primary-dim rounded-xl font-headline font-black text-on-primary text-lg shadow-[0_10px_40px_rgba(120,87,248,0.3)] hover:scale-[1.03] transition-all duration-300 active:scale-95 flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person_check</span>
                      Ver mi Perfil Vocacional
                      <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

        </div>
      </main>

      <footer className="w-full mt-12 pt-12 pb-8 bg-[#0e0e13] border-t border-[#48474d]/15 text-sm">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="text-lg font-bold text-[#b2a1ff]">VocacionAI</span>
            <p className="text-[#acaab1]">Tu futuro no es una probabilidad, es una misión.</p>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="font-bold text-on-surface mb-2">Legal</span>
            <a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Privacy Policy</a>
            <a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Terms of Service</a>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="font-bold text-on-surface mb-2">Soporte</span>
            <a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Contact Support</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-12 text-center text-[#acaab1]/50 text-xs">
          © 2024 VocacionAI. Launch your mission.
        </div>
      </footer>

      <nav className="md:hidden fixed bottom-0 left-0 w-full glass-panel border-t border-outline-variant/10 px-6 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center space-y-1 text-primary font-bold">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>assessment</span>
          <span className="text-[10px]">Test</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-on-surface-variant">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px]">Explore</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-on-surface-variant">
          <span className="material-symbols-outlined">school</span>
          <span className="text-[10px]">Mentors</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-on-surface-variant">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>
    </>
  );
}
