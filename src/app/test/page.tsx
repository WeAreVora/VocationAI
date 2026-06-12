"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CountryCode = "arg";

const COUNTRY_OPTIONS: { code: CountryCode; label: string }[] = [
  { code: "arg", label: "Argentina" },
];

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
    q: "¿Qué describe mejor la forma en que pensás?",
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
  // --- Bloque 1: Holland RIASEC (Argentina extension) ---
  {
    block: 0,
    q: "Si pudieras armar tu propio proyecto o negocio independiente, ¿a qué área apuntaría principalmente?",
    opts: [
      { icon: "smart_toy", label: "Software, app móvil o IA", desc: "Brindar servicios tecnológicos o de inteligencia artificial." },
      { icon: "gavel", label: "Estudio profesional legal", desc: "Asesorar, defender clientes o mediar en conflictos normativos." },
      { icon: "storefront", label: "Marca, e-commerce o consultoría", desc: "Administrar un negocio digital o brindar consultoría financiera." },
      { icon: "medical_services", label: "Consultorio o clínica privada", desc: "Atención médica, nutrición o kinesiología." },
    ],
  },
  {
    block: 0,
    q: "¿En cuál de estos entornos laborales sentís que tu personalidad encajaría mejor en el día a día?",
    opts: [
      { icon: "biotech", label: "Hospital, clínica o laboratorio", desc: "Investigar y cuidar la salud biológica." },
      { icon: "account_balance", label: "Estudio contable o financiera", desc: "Analizar inversiones, costos y estados corporativos." },
      { icon: "sports_basketball", label: "Escuela, club o universidad", desc: "Enseñar, entrenar o capacitar grupos." },
      { icon: "campaign", label: "Agencia de marketing o estudio creativo", desc: "Diseñar contenido visual y campañas digitales." },
    ],
  },
  {
    block: 0,
    q: "Cuando consumís contenido en medios digitales por puro interés, ¿qué temática te atrapa más?",
    opts: [
      { icon: "forum", label: "Psicología, sociología o política", desc: "Análisis de comportamiento humano e historia social." },
      { icon: "rocket_launch", label: "Startups, marcas y negocios", desc: "Detrás de escena de inversiones y negocios digitales." },
      { icon: "construction", label: "Obras, planos y automatización", desc: "Construcción, arquitectura o automatización industrial." },
      { icon: "code", label: "Programación, ciberseguridad y datos", desc: "Software, modelos de IA y lanzamientos tecnológicos." },
    ],
  },
  {
    block: 0,
    q: "Si te dieran un presupuesto libre para hacer un curso corto de especialización, ¿cuál elegirías?",
    opts: [
      { icon: "trending_up", label: "Marketing digital y growth", desc: "Dirección de negocios online y growth hacking." },
      { icon: "psychology_alt", label: "Neuromarketing o terapia actual", desc: "Comportamiento del consumidor y psicología aplicada." },
      { icon: "videogame_asset", label: "Videojuegos, 3D o cine", desc: "Modelado 3D y edición cinematográfica profesional." },
      { icon: "eco", label: "Sustentabilidad y agro tech", desc: "Gestión ambiental y tecnologías aplicadas al agro." },
    ],
  },
  {
    block: 0,
    q: "Si tuvieras la oportunidad de hacer una pasantía mañana mismo, ¿cuál elegirías sin dudar?",
    opts: [
      { icon: "precision_manufacturing", label: "Robótica o ingeniería automotriz", desc: "Diseño mecánico, automatización o automotriz." },
      { icon: "science", label: "Laboratorio biotecnológico o farmacia", desc: "Análisis de compuestos químicos y genéticos." },
      { icon: "shield", label: "Ciberseguridad corporativa", desc: "Auditar riesgos y proteger datos sensibles." },
      { icon: "inventory", label: "Logística y procesos industriales", desc: "Gestión de distribución y optimización operativa." },
    ],
  },
  {
    block: 0,
    q: "Pensando en tu futuro profesional, ¿cuál de estas dinámicas te resultaría más insoportable a largo plazo?",
    opts: [
      { icon: "request_quote", label: "Planillas, balances y auditorías", desc: "100% aislado con presupuestos y auditorías fiscales." },
      { icon: "local_hospital", label: "Hospital, cirugías y dolor físico", desc: "Contacto diario con enfermedades y emergencias." },
      { icon: "palette", label: "Crear ideas visuales bajo presión", desc: "Diseño creativo obligatorio todos los días." },
      { icon: "agriculture", label: "Esfuerzo físico, campo o tierra", desc: "Trabajar al aire libre con herramientas pesadas." },
    ],
  },
  // --- Bloque 2: Gardner (Argentina extension) ---
  {
    block: 1,
    q: "¿En cuál de estas tareas cotidianas sentís que tu mente trabaja con mayor facilidad?",
    opts: [
      { icon: "favorite", label: "Contener emociones de otros", desc: "Detectar y acompañar problemas psicológicos cercanos." },
      { icon: "record_voice_over", label: "Argumentar y debatir normas", desc: "Expresarte oralmente o por escrito con lógica." },
      { icon: "calculate", label: "Organizar cuentas y presupuestos", desc: "Calcular y detectar variables económicas." },
      { icon: "fitness_center", label: "Entrenamiento, nutrición y kinesiología", desc: "Entender el funcionamiento biológico del cuerpo." },
    ],
  },
  {
    block: 1,
    q: "Si tuvieras que liderar un equipo de urgencia, ¿de qué rol te harías cargo?",
    opts: [
      { icon: "monitoring", label: "Viabilidad comercial y costos", desc: "Controlar rentabilidad y modelo económico." },
      { icon: "terminal", label: "Programar la herramienta digital", desc: "Configurar el sistema o resolver fallas de código." },
      { icon: "description", label: "Informe legal y argumental", desc: "Defender, redactar y cumplir normativas." },
      { icon: "design_services", label: "Diseño y comunicación visual", desc: "Estética, interfaces y comunicación estratégica." },
    ],
  },
  {
    block: 1,
    q: "Si tuvieras que rendir una prueba práctica ante un jurado, ¿en cuál tendrías más éxito?",
    opts: [
      { icon: "code", label: "Resolver problema de programación", desc: "Lógica de software o minería de datos en computadora." },
      { icon: "architecture", label: "Diseñar un plano o croquis 3D", desc: "Espacio urbano, casa u objeto tridimensional." },
      { icon: "sports", label: "Coordinar clase de entrenamiento", desc: "Evaluar movilidad y planificar una rutina física." },
      { icon: "school", label: "Explicar tema teórico complejo", desc: "Didáctica clara frente a un auditorio lleno." },
    ],
  },
  {
    block: 1,
    q: "Frente a un accidente imprevisto en la vía pública, ¿cuál es tu primera reacción mental?",
    opts: [
      { icon: "medical_services", label: "Aplicar primeros auxilios", desc: "Mantener la calma y asistir médicamente." },
      { icon: "balance", label: "Evaluar responsabilidad legal", desc: "Qué normas se rompieron y registrar el hecho." },
      { icon: "build", label: "Reparar técnicamente lo dañado", desc: "Solución inmediata desarmando o manipulando." },
      { icon: "diversity_3", label: "Contener y coordinar al grupo", desc: "Apoyar emocionalmente y organizar la ayuda." },
    ],
  },
  {
    block: 1,
    q: "¿Qué habilidad con las manos o el cuerpo dominás con mayor naturalidad?",
    opts: [
      { icon: "keyboard", label: "Tipeo veloz y atajos de PC", desc: "Comandos lógicos y herramientas de software." },
      { icon: "draw", label: "Dibujo, retoque y diseño fino", desc: "Precisión manual para arte, foto o moda." },
      { icon: "directions_run", label: "Coordinación deportiva o quirúrgica", desc: "Fuerza, agilidad y destreza médica." },
      { icon: "biotech", label: "Muestras de laboratorio o agro", desc: "Manipular instrumental químico, plantas o biología." },
    ],
  },
  {
    block: 1,
    q: "Cuando analizás un dispositivo o tecnología nueva, ¿en qué se enfoca tu mente?",
    opts: [
      { icon: "palette", label: "Estética y UX/UI", desc: "Colores, interfaz y diseño visual." },
      { icon: "settings", label: "Hardware: placas y motores", desc: "Ingeniería interna mecánica y electrónica." },
      { icon: "memory", label: "Algoritmo de IA y backend", desc: "Código que procesa los datos y la lógica." },
      { icon: "lock", label: "Privacidad y términos legales", desc: "Seguridad de la información y compliance." },
    ],
  },
  // --- Bloque 3: Kolb (Argentina extension) ---
  {
    block: 2,
    q: "Cuando empezás una materia nueva, ¿qué tipo de ejemplos prácticos necesitás para entender rápido?",
    opts: [
      { icon: "medical_services", label: "Casos clínicos y anatomía", desc: "Diagnósticos médicos y biología celular." },
      { icon: "show_chart", label: "Balances y métricas de startups", desc: "Modelos comerciales y números reales." },
      { icon: "architecture", label: "Planos, maquetas o motores", desc: "Estructuras arquitectónicas y despieces técnicos." },
      { icon: "gavel", label: "Juicios, fallos y debates", desc: "Leyes vigentes e historia de la sociedad." },
    ],
  },
  {
    block: 2,
    q: "¿Qué tipo de error te genera más molestia y buscás corregir de inmediato?",
    opts: [
      { icon: "savings", label: "Diferencia en las cuentas", desc: "Ineficiencia en la administración del dinero." },
      { icon: "bug_report", label: "Un bug en el código", desc: "Error de sintaxis que frena un sistema." },
      { icon: "sports_gymnastics", label: "Postura o técnica corporal mala", desc: "Riesgo de lesión por mala ejecución." },
      { icon: "groups", label: "Malentendido o injusticia grupal", desc: "Problema de comunicación o ética social." },
    ],
  },
  {
    block: 2,
    q: "¿Qué formato de examen final te resulta más cómodo para demostrar lo que sabés?",
    opts: [
      { icon: "record_voice_over", label: "Defensa oral con debate", desc: "Argumentar leyes y convencer al jurado." },
      { icon: "code", label: "Entrega de software funcional", desc: "Código limpio o sistema de datos estructurado." },
      { icon: "psychology", label: "Casos de psicología o pedagogía", desc: "Analizar la mente y metodologías humanas." },
      { icon: "trending_up", label: "Plan de negocios o campaña", desc: "Costos, rentabilidad y estrategia comercial." },
    ],
  },
  {
    block: 2,
    q: "Si tuvieras que leer una guía extensa de capacitación, ¿qué sección irías a buscar primero?",
    opts: [
      { icon: "psychology", label: "Teoría psicológica del consumidor", desc: "Comportamiento humano y social." },
      { icon: "schema", label: "Diagramas y arquitectura técnica", desc: "Flujos lógicos y líneas de código." },
      { icon: "gavel", label: "Marco regulatorio y contratos", desc: "Leyes aplicables y normativas legales." },
      { icon: "trending_up", label: "Casos de éxito comercial", desc: "Estrategias de ventas y balances económicos." },
    ],
  },
  {
    block: 2,
    q: "Cuando te trabás resolviendo un problema complejo, ¿cuál es tu método para destrabarte?",
    opts: [
      { icon: "account_tree", label: "Mapas conceptuales o esquemas", desc: "Dibujar y maquetar la idea de forma visual." },
      { icon: "calculate", label: "Lógica pura y fórmulas", desc: "Descomponer en datos duros y patrones." },
      { icon: "forum", label: "Explicárselo a otra persona", desc: "Discutir el impacto humano de la solución." },
      { icon: "build_circle", label: "Probar directo en la práctica", desc: "Prueba y error con herramientas o código." },
    ],
  },
  {
    block: 2,
    q: "En un equipo de estudio o trabajo, ¿qué rol metodológico adoptás naturalmente?",
    opts: [
      { icon: "dashboard", label: "Organizar herramientas digitales", desc: "Drive, Notion, Trello y software del equipo." },
      { icon: "description", label: "Redactar documentación formal", desc: "Lenguaje técnico, contratos y estructura." },
      { icon: "school", label: "Asegurar comprensión teórica", desc: "Verificar que todos entiendan los conceptos." },
      { icon: "favorite", label: "Cuidar el clima emocional", desc: "Resolver tensiones y motivar al grupo." },
    ],
  },
  // --- Bloque 4: Schwartz (Argentina extension) ---
  {
    block: 3,
    q: "¿Cuál de estos legados profesionales te haría sentir que tu carrera valió la pena?",
    opts: [
      { icon: "medical_services", label: "Salvar vidas y curar pacientes", desc: "Rehabilitar y devolver bienestar de salud." },
      { icon: "balance", label: "Garantizar justicia legal", desc: "Defender derechos y combatir corrupción." },
      { icon: "memory", label: "Crear tecnología innovadora", desc: "Software o IA que simplifique vidas." },
      { icon: "school", label: "Formar futuras generaciones", desc: "Transmitir conocimiento pedagógicamente." },
    ],
  },
  {
    block: 3,
    q: "Al proyectar tu estilo de vida profesional a mediano plazo, ¿qué beneficio valorás por encima del resto?",
    opts: [
      { icon: "language", label: "Salida global y home office", desc: "Flexibilidad remota con herramientas del futuro." },
      { icon: "trending_up", label: "Estabilidad y liderazgo corporativo", desc: "Crecer en finanzas o negocios digitales." },
      { icon: "person", label: "Consultorio o estudio propio", desc: "Independencia atendiendo pacientes o clientes." },
      { icon: "directions_run", label: "Rutina activa y al aire libre", desc: "Lejos de la oficina, ligada al cuerpo o la tierra." },
    ],
  },
  {
    block: 3,
    q: "¿Cuál de estas situaciones laborales chocaría inmediatamente con tu ética profesional?",
    opts: [
      { icon: "gavel", label: "Manipulación de leyes o fondos", desc: "Injusticias institucionales o corrupción pública." },
      { icon: "money_off", label: "Estafa financiera o balances falsos", desc: "Evasión de impuestos o fraude contable." },
      { icon: "sentiment_dissatisfied", label: "Pacientes o alumnos como números", desc: "Sistema frío y automatizado de salud o educación." },
      { icon: "visibility_off", label: "Software espía o ciberataques", desc: "Algoritmos para vulnerar usuarios ilegalmente." },
    ],
  },
  {
    block: 3,
    q: "Si recibieras un premio nacional en tu profesión, ¿por qué logro preferirías que sea?",
    opts: [
      { icon: "science", label: "Descubrimiento científico clave", desc: "Patente biotecnológica o química medicinal." },
      { icon: "apartment", label: "Obra arquitectónica icónica", desc: "Infraestructura urbana o producto industrial." },
      { icon: "rocket_launch", label: "Startup disruptiva exitosa", desc: "Negocio digital innovador en el mercado." },
      { icon: "diversity_3", label: "Programa social de impacto", desc: "Reducción de vulnerabilidad comunitaria nacional." },
    ],
  },
  {
    block: 3,
    q: "¿Qué tipo de ambiente de trabajo apagaría por completo tu motivación diaria?",
    opts: [
      { icon: "palette", label: "Sin libertad creativa ni arte", desc: "Donde censuren propuestas estéticas y de media." },
      { icon: "trending_down", label: "Organización ineficiente y analógica", desc: "Sin uso de tecnología, datos ni métricas." },
      { icon: "chair", label: "100% sedentario y de oficina", desc: "Sin movimiento físico ni atención a la salud." },
      { icon: "psychology_alt", label: "Sin foco en lo humano", desc: "Donde no importe el comportamiento o la pedagogía." },
    ],
  },
  {
    block: 3,
    q: "Sobre las prioridades del desarrollo futuro de la Argentina, ¿qué postura defenderías con más fuerza?",
    opts: [
      { icon: "memory", label: "Inversión en IA y ciberseguridad", desc: "Software, datos y blindaje contra ciberataques." },
      { icon: "agriculture", label: "Agro, alimentos y medio ambiente", desc: "Soberanía alimentaria y producción sustentable." },
      { icon: "diversity_3", label: "Educación pública y salud mental", desc: "Acceso y contención de sectores vulnerables." },
      { icon: "gavel", label: "Marco jurídico e institucional", desc: "Transparencia legal y atracción de inversiones." },
    ],
  },
];

function BotAvatar() {
  return (
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
          Asesor IA en línea
        </p>
      </div>
    </div>
  );
}

type OptionMapping = { slugs: string[]; negative?: boolean };

const PROFILE_ALIASES: Record<string, string> = {
  "protector-ambiental": "explorador-naturalista",
  "bienestar-comunitario": "humanista-social",
  "comunicador-estratego": "comunicador-estrategico",
};

const NEW_QUESTION_MAPPINGS: OptionMapping[][] = [
  [ // Q41
    { slugs: ["innovador-tech"] },
    { slugs: ["agente-cambio"] },
    { slugs: ["estratega-negocios", "lider-emprendedor"] },
    { slugs: ["salud-clinica", "salud-rehabilitacion"] },
  ],
  [ // Q42
    { slugs: ["salud-clinica", "tecnico-quimico-biologico"] },
    { slugs: ["estratega-negocios"] },
    { slugs: ["divulgador-humanistico", "deporte-bienestar-corporal"] },
    { slugs: ["creativo-digital", "comunicador-estrategico"] },
  ],
  [ // Q43
    { slugs: ["humanista-social", "bienestar-comunitario"] },
    { slugs: ["lider-emprendedor", "estratega-negocios"] },
    { slugs: ["disenador-tecnico-espacial", "constructor-pragmatico"] },
    { slugs: ["innovador-tech", "cientifico-analitico"] },
  ],
  [ // Q44
    { slugs: ["lider-emprendedor"] },
    { slugs: ["humanista-social", "bienestar-comunitario"] },
    { slugs: ["creador-contenido-media"] },
    { slugs: ["protector-ambiental", "produccion-agro-tierra"] },
  ],
  [ // Q45
    { slugs: ["desarrollador-mecanico-industrial"] },
    { slugs: ["tecnico-quimico-biologico"] },
    { slugs: ["analista-legal-datos"] },
    { slugs: ["optimizador-logistico"] },
  ],
  [ // Q46 — descarta
    { slugs: ["estratega-negocios"], negative: true },
    { slugs: ["salud-clinica", "salud-rehabilitacion", "tecnico-quimico-biologico"], negative: true },
    { slugs: ["creativo-digital", "artista-expresivo", "creador-contenido-media"], negative: true },
    { slugs: ["produccion-agro-tierra", "desarrollador-mecanico-industrial"], negative: true },
  ],
  [ // Q47
    { slugs: ["humanista-social"] },
    { slugs: ["agente-cambio"] },
    { slugs: ["estratega-negocios"] },
    { slugs: ["deporte-bienestar-corporal", "salud-rehabilitacion"] },
  ],
  [ // Q48
    { slugs: ["estratega-negocios"] },
    { slugs: ["innovador-tech"] },
    { slugs: ["agente-cambio"] },
    { slugs: ["creativo-digital", "comunicador-estrategico"] },
  ],
  [ // Q49
    { slugs: ["innovador-tech", "cientifico-analitico"] },
    { slugs: ["disenador-tecnico-espacial"] },
    { slugs: ["deporte-bienestar-corporal"] },
    { slugs: ["divulgador-humanistico"] },
  ],
  [ // Q50
    { slugs: ["salud-clinica"] },
    { slugs: ["agente-cambio"] },
    { slugs: ["desarrollador-mecanico-industrial"] },
    { slugs: ["humanista-social", "bienestar-comunitario"] },
  ],
  [ // Q51
    { slugs: ["innovador-tech"] },
    { slugs: ["creativo-digital"] },
    { slugs: ["deporte-bienestar-corporal", "salud-clinica"] },
    { slugs: ["tecnico-quimico-biologico", "produccion-agro-tierra"] },
  ],
  [ // Q52
    { slugs: ["creativo-digital"] },
    { slugs: ["desarrollador-mecanico-industrial"] },
    { slugs: ["innovador-tech", "cientifico-analitico"] },
    { slugs: ["analista-legal-datos", "agente-cambio"] },
  ],
  [ // Q53
    { slugs: ["salud-clinica", "tecnico-quimico-biologico"] },
    { slugs: ["estratega-negocios", "lider-emprendedor"] },
    { slugs: ["disenador-tecnico-espacial", "desarrollador-mecanico-industrial"] },
    { slugs: ["agente-cambio", "bienestar-comunitario"] },
  ],
  [ // Q54
    { slugs: ["estratega-negocios"] },
    { slugs: ["innovador-tech"] },
    { slugs: ["deporte-bienestar-corporal", "salud-rehabilitacion"] },
    { slugs: ["humanista-social", "bienestar-comunitario"] },
  ],
  [ // Q55
    { slugs: ["agente-cambio", "comunicador-estrategico"] },
    { slugs: ["innovador-tech"] },
    { slugs: ["humanista-social", "divulgador-humanistico"] },
    { slugs: ["estratega-negocios", "lider-emprendedor"] },
  ],
  [ // Q56
    { slugs: ["bienestar-comunitario", "humanista-social"] },
    { slugs: ["innovador-tech", "cientifico-analitico"] },
    { slugs: ["agente-cambio"] },
    { slugs: ["estratega-negocios", "lider-emprendedor"] },
  ],
  [ // Q57
    { slugs: ["creativo-digital", "disenador-tecnico-espacial"] },
    { slugs: ["cientifico-analitico"] },
    { slugs: ["divulgador-humanistico", "humanista-social"] },
    { slugs: ["innovador-tech", "desarrollador-mecanico-industrial"] },
  ],
  [ // Q58
    { slugs: ["innovador-tech"] },
    { slugs: ["agente-cambio", "estratega-negocios"] },
    { slugs: ["divulgador-humanistico"] },
    { slugs: ["humanista-social", "bienestar-comunitario"] },
  ],
  [ // Q59
    { slugs: ["salud-clinica", "salud-rehabilitacion"] },
    { slugs: ["agente-cambio"] },
    { slugs: ["innovador-tech"] },
    { slugs: ["divulgador-humanistico"] },
  ],
  [ // Q60
    { slugs: ["innovador-tech", "creativo-digital"] },
    { slugs: ["estratega-negocios", "lider-emprendedor"] },
    { slugs: ["humanista-social", "salud-clinica"] },
    { slugs: ["deporte-bienestar-corporal", "produccion-agro-tierra"] },
  ],
  [ // Q61
    { slugs: ["agente-cambio"] },
    { slugs: ["estratega-negocios"] },
    { slugs: ["salud-clinica", "divulgador-humanistico"] },
    { slugs: ["innovador-tech", "analista-legal-datos"] },
  ],
  [ // Q62
    { slugs: ["tecnico-quimico-biologico", "cientifico-analitico"] },
    { slugs: ["disenador-tecnico-espacial", "constructor-pragmatico"] },
    { slugs: ["lider-emprendedor"] },
    { slugs: ["bienestar-comunitario"] },
  ],
  [ // Q63
    { slugs: ["creativo-digital", "creador-contenido-media"] },
    { slugs: ["estratega-negocios", "innovador-tech"] },
    { slugs: ["deporte-bienestar-corporal", "salud-rehabilitacion"] },
    { slugs: ["humanista-social", "divulgador-humanistico"] },
  ],
  [ // Q64
    { slugs: ["innovador-tech", "analista-legal-datos"] },
    { slugs: ["produccion-agro-tierra", "protector-ambiental"] },
    { slugs: ["divulgador-humanistico", "humanista-social", "bienestar-comunitario"] },
    { slugs: ["agente-cambio", "estratega-negocios"] },
  ],
];

function getBaselineProfile(answers: (number | null)[]): string {
  const bc: number[][] = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  for (let i = 0; i < Math.min(40, answers.length); i++) {
    const a = answers[i];
    if (a !== null) bc[QUESTIONS[i].block][a]++;
  }
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

function getProfileKey(answers: (number | null)[]): string {
  const baseline = getBaselineProfile(answers);
  const tally = new Map<string, number>();
  // Head start so baseline can still win for users whose extension answers are scattered.
  tally.set(baseline, 3);

  for (let i = 40; i < answers.length && i - 40 < NEW_QUESTION_MAPPINGS.length; i++) {
    const a = answers[i];
    if (a === null) continue;
    const opt = NEW_QUESTION_MAPPINGS[i - 40][a];
    const points = 1 / opt.slugs.length;
    for (const raw of opt.slugs) {
      const slug = PROFILE_ALIASES[raw] ?? raw;
      const delta = opt.negative ? -points : points;
      tally.set(slug, (tally.get(slug) ?? 0) + delta);
    }
  }

  let best = baseline;
  let max = -Infinity;
  for (const [slug, score] of tally) {
    if (score > max) { max = score; best = slug; }
  }
  return best;
}

// ── Paywall antes de empezar el cuestionario + persistencia del progreso ──
// El cobro ocurre al apretar "Comenzar Test", antes de la primera pregunta.
// Como el usuario se va a Mercado Pago y vuelve, el estado del test (que vive
// solo en React state) se persiste en localStorage para poder retomar al regresar.
const STORAGE_KEY = "vocacionia_test_progress";
const PRICE_LABEL = "ARS $7.999";
const ANCHOR_PRICE_LABEL = "ARS $10.000"; // precio anterior, mostrado tachado en el paywall

const PAYWALL_BENEFITS: { icon: string; title: string; desc: string }[] = [
  { icon: "psychology", title: "Tu perfil vocacional completo", desc: "Análisis con IA basado en 4 marcos científicos: Holland, Gardner, Kolb y Schwartz." },
  { icon: "school", title: "Las 3 carreras ideales para vos", desc: "Con % de compatibilidad, qué se estudia, qué hace un profesional y proyección laboral." },
  { icon: "account_balance", title: "Universidades de Argentina", desc: "Dónde estudiar cada carrera, con links directos a UBA, ITBA, UTN y muchas más." },
  { icon: "map", title: "Roadmap de acción + Plan 2026", desc: "Pasos concretos para arrancar hoy y objetivos trimestre a trimestre para todo el año." },
  { icon: "description", title: "Guía para armar tu primer CV", desc: "Paso a paso con ejemplo visual: estructura, resumen profesional, proyectos y formato que pasa filtros de reclutamiento." },
  { icon: "group", title: "Mentores y referentes", desc: "A quiénes seguir en tu área para aprender de los mejores desde el día uno." },
  { icon: "picture_as_pdf", title: "Informe descargable en PDF", desc: "Guardalo, imprimilo y compartilo con tu familia cuando quieras." },
];

type TestProgress = {
  v: 1;
  answers: (number | null)[];
  currentQ: number;
  country: CountryCode | null;
  paid: boolean;
  ref: string | null; // external_reference del pago aprobado
  paymentId: string | null; // payment_id devuelto por Mercado Pago
};

function loadProgress(): TestProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as TestProgress;
    if (p?.v !== 1 || !Array.isArray(p.answers) || p.answers.length !== QUESTIONS.length) {
      return null;
    }
    return p;
  } catch {
    return null;
  }
}

function saveProgress(p: TestProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* localStorage no disponible (incógnito / deshabilitado): se ignora */
  }
}

function clearProgress() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

export default function TestPage() {
  const router = useRouter();
  // El estado arranca con los valores por defecto (iguales en server y client
  // para evitar mismatch de hidratación). La rehidratación desde localStorage
  // ocurre en el useEffect de montaje, ya en el cliente.
  const [phase, setPhase] = useState<"intro" | "quiz" | "outro">("intro");
  const [profileKey, setProfileKey] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Intro state
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  // Quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));

  // Payment / paywall state
  const [paid, setPaid] = useState(false);
  const [paymentRef, setPaymentRef] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const didProcessReturn = useRef(false);

  // Outro state
  const [outroStep, setOutroStep] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [sendingFeedback, setSendingFeedback] = useState(false);

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

  // Persistir el progreso del test mientras se responde el cuestionario.
  useEffect(() => {
    if (phase !== "quiz") return;
    saveProgress({
      v: 1,
      answers,
      currentQ,
      country: selectedCountry,
      paid,
      ref: paymentRef,
      paymentId,
    });
  }, [phase, answers, currentQ, selectedCountry, paid, paymentRef, paymentId]);

  // Al volver de Mercado Pago, verificar el pago y reanudar el test.
  useEffect(() => {
    if (didProcessReturn.current) return;
    didProcessReturn.current = true;

    // Rehidratar el progreso guardado (ya en el cliente, tras la hidratación).
    // Solo se entra directo al cuestionario si el pago ya está confirmado;
    // si no, el usuario queda en la intro y el paywall se muestra al continuar.
    const saved = loadProgress();
    if (saved) {
      setAnswers(saved.answers);
      setCurrentQ(saved.currentQ);
      if (saved.country) setSelectedCountry(saved.country);
      setPaid(saved.paid);
      setPaymentRef(saved.ref);
      setPaymentId(saved.paymentId);
      if (saved.paid) {
        setAcceptedTerms(true);
        setPhase("quiz");
      }
    }

    const sp = new URLSearchParams(window.location.search);
    const urlPaymentId = sp.get("payment_id") || sp.get("collection_id");
    const urlRef = sp.get("ref") || sp.get("external_reference");
    const pagoStatus = sp.get("pago");
    const urlPais = sp.get("pais");
    const devBypass = process.env.NODE_ENV === "development" && sp.get("bypass") === "1";

    // Fallback de país si se perdió el progreso (otro navegador / localStorage borrado).
    if (urlPais === "arg") setSelectedCountry((c) => c ?? "arg");

    if (devBypass) {
      setPaid(true);
      setShowPaywall(false);
      setPhase("quiz");
      window.history.replaceState({}, "", "/test");
      return;
    }

    if (urlPaymentId && urlRef) {
      setShowPaywall(true);
      setVerifying(true);
      fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: urlPaymentId, ref: urlRef }),
      })
        .then((r) => (r.ok ? r.json() : { paid: false }))
        .then((data: { paid?: boolean }) => {
          if (data.paid) {
            setPaid(true);
            setPaymentRef(urlRef);
            setPaymentId(urlPaymentId);
            setShowPaywall(false);
            setPaymentError("");
            // Pago confirmado: arranca (o retoma) el cuestionario.
            setAcceptedTerms(true);
            setPhase("quiz");
          } else {
            setPaymentError(
              "No pudimos confirmar tu pago. Si ya pagaste, esperá unos segundos y reintentá.",
            );
          }
        })
        .catch(() => setPaymentError("Hubo un error verificando el pago. Reintentá."))
        .finally(() => {
          setVerifying(false);
          window.history.replaceState({}, "", "/test");
        });
    } else if (pagoStatus === "pendiente" || pagoStatus === "rechazado") {
      setShowPaywall(true);
      setPaymentError(
        pagoStatus === "pendiente"
          ? "Tu pago quedó pendiente de acreditación. Cuando se confirme, volvé a esta página para continuar."
          : "El pago fue rechazado o cancelado. Probá nuevamente.",
      );
      window.history.replaceState({}, "", "/test");
    }
  }, []);

  const q = QUESTIONS[currentQ];
  const selected = answers[currentQ];
  const qNum = currentQ + 1;
  const progressPct = `${Math.round((qNum / QUESTIONS.length) * 100)}%`;

  const handleSelect = (idx: number) => {
    const next = [...answers];
    next[currentQ] = idx;
    setAnswers(next);
  };

  const handleNext = () => {
    if (selected === null) return;
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((n) => n + 1);
    } else {
      setProfileKey(getProfileKey(answers));
      setPhase("outro");
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((n) => n - 1);
  };

  // "Comenzar Test": si ya pagó, arranca el cuestionario; si no, abre el
  // paywall. El progreso se persiste por si se va a Mercado Pago y vuelve.
  const handleStartTest = () => {
    if (paid) {
      setPhase("quiz");
      return;
    }
    saveProgress({
      v: 1,
      answers,
      currentQ,
      country: selectedCountry,
      paid,
      ref: paymentRef,
      paymentId,
    });
    setPaymentError("");
    setShowPaywall(true);
  };

  const handlePaywallCheckout = async () => {
    try {
      setIsPaying(true);
      setPaymentError("");
      // Persistir antes de salir a Mercado Pago para no perder las respuestas.
      saveProgress({
        v: 1,
        answers,
        currentQ,
        country: selectedCountry,
        paid,
        ref: paymentRef,
        paymentId,
      });
      const res = await fetch("/api/payments/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Perfil placeholder: el real recién se calcula al terminar las 64
        // preguntas. verify no valida el perfil de la URL del informe.
        body: JSON.stringify({ perfil: "pendiente", pais: selectedCountry ?? "arg" }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const checkoutUrl = data.checkoutUrl || data.checkoutSandboxUrl;
      if (!checkoutUrl) throw new Error();
      window.location.href = checkoutUrl;
    } catch {
      setPaymentError("No pudimos redirigirte a Mercado Pago. Intentá nuevamente.");
      setIsPaying(false);
    }
  };

  // Navegar al informe pago. El feedback final es opcional: un usuario que ya
  // pagó siempre puede llegar a su informe sin depender de /api/contact.
  const goToInforme = () => {
    const country = selectedCountry ?? "arg";
    const params = new URLSearchParams({ perfil: profileKey, pais: country });
    if (paymentRef) params.set("ref", paymentRef);
    if (paymentId) params.set("payment_id", paymentId);
    // En dev sin pago real, permitir ver el informe con el bypass existente.
    if (process.env.NODE_ENV === "development" && !paymentRef) {
      params.set("bypass", "1");
    }
    clearProgress();
    router.push(`/informe?${params.toString()}`);
  };

  const handleSendFeedback = async () => {
    if (!feedback.trim() || rating < 1) return;

    setSendingFeedback(true);
    setFeedbackError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, message: feedback }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setFeedbackError(data?.error ?? "No se pudo guardar tu comentario.");
        setSendingFeedback(false);
        return;
      }

      setFeedbackSent(true);
      setSendingFeedback(false);
      setTimeout(() => setOutroStep(2), 900);
      setTimeout(() => setOutroStep(3), 2400);
    } catch {
      setFeedbackError("No se pudo guardar tu comentario. Intentalo nuevamente.");
      setSendingFeedback(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0e0e13]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(178,161,255,0.08)]">
        <nav className="flex justify-between items-center w-full px-4 sm:px-8 py-3 sm:py-4 max-w-7xl mx-auto font-headline tracking-tight">
          <Link href="/" className="text-xl sm:text-2xl font-black bg-gradient-to-br from-[#b2a1ff] to-[#7857f8] bg-clip-text text-transparent">
            VocacionIA
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors" href="/">Inicio</Link>
          </div>
        </nav>
      </header>

      <main className="min-h-screen pt-20 sm:pt-24 pb-28 sm:pb-20 px-3 sm:px-4 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-primary/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[240px] h-[240px] sm:w-[400px] sm:h-[400px] bg-tertiary/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto">

          {/* ── INTRO ── */}
          {phase === "intro" && (
            <section className="flex flex-col space-y-4 sm:space-y-6">
              <BotAvatar />

              <div className="space-y-4 max-w-2xl">
                <div className={`glass-panel p-4 sm:p-5 rounded-2xl rounded-tl-none border-l-4 border-primary/40 transition-all duration-500 ease-out ${
                  visibleMsgs >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <p className="text-on-surface leading-relaxed">¡Hola! Soy VocaIA, tu guía en esta misión de descubrimiento profesional. 🚀</p>
                </div>

                <div className={`glass-panel p-4 sm:p-5 rounded-2xl rounded-tl-none border-l-4 border-primary/40 transition-all duration-500 ease-out ${
                  visibleMsgs >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <p className="text-on-surface leading-relaxed">
                    Tengo preparado un análisis profundo para vos:{" "}
                    <span className="text-primary font-bold">64 preguntas</span> divididas en{" "}
                    <span className="text-primary font-bold">4 bloques</span> estratégicos.
                  </p>
                </div>

                <div className={`glass-panel p-4 sm:p-5 rounded-2xl rounded-tl-none border-l-4 border-primary/40 transition-all duration-500 ease-out ${
                  visibleMsgs >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="material-symbols-outlined text-tertiary">timer</span>
                    <span className="font-bold">8 minutos aproximados</span>
                  </div>
                  <p className="text-on-surface-variant">Solo respondé con sinceridad. ¿Estás listo para despegar?</p>
                </div>

                <div className={`glass-panel p-4 sm:p-5 rounded-2xl rounded-tl-none border-l-4 border-tertiary/40 transition-all duration-500 ease-out ${
                  visibleMsgs >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 rounded-2xl border border-outline-variant/15 bg-surface-container-high/50 p-4">
                      <input
                        id="accept-terms"
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1 h-5 w-5 rounded border-outline-variant bg-surface text-primary focus:ring-2 focus:ring-primary/40"
                      />
                      <label htmlFor="accept-terms" className="text-sm leading-relaxed text-on-surface">
                        Acepto los <Link href="/terms-of-service" className="text-primary font-bold hover:underline">Terms of Service</Link> y la <Link href="/privacy-policy" className="text-primary font-bold hover:underline">Privacy Policy</Link>.
                      </label>
                    </div>

                    {acceptedTerms ? (
                      <>
                        <p className="text-on-surface leading-relaxed">
                          Antes de arrancar, ¿de qué país sos? Voy a personalizar las universidades de tu informe final.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                          {COUNTRY_OPTIONS.map((country) => {
                            const isSelected = selectedCountry === country.code;
                            return (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => setSelectedCountry(country.code)}
                                className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-sm font-bold transition-all ${
                                  isSelected
                                    ? "bg-primary/15 border-primary text-primary"
                                    : "bg-surface-container-high border-outline-variant/20 text-on-surface-variant hover:border-primary/50"
                                }`}
                              >
                                {country.label}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        Aceptá los términos para habilitar la selección de país y continuar.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className={`pt-6 sm:pt-8 transition-all duration-500 ease-out ${
                showBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                <button
                  type="button"
                  onClick={handleStartTest}
                  disabled={!selectedCountry || !acceptedTerms}
                  className="group relative w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-br from-primary to-primary-dim rounded-xl font-headline font-black text-on-primary text-base sm:text-lg shadow-[0_10px_40px_rgba(120,87,248,0.3)] hover:scale-[1.03] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Comenzar Test
                  <span className="ml-2 material-symbols-outlined align-middle transition-transform group-hover:translate-x-1">rocket_launch</span>
                </button>
                {!paid && (
                  <p className="mt-3 text-xs text-on-surface-variant">
                    Acceso único al informe completo:{" "}
                    <span className="line-through opacity-60">{ANCHOR_PRICE_LABEL}</span>{" "}
                    <span className="font-bold text-primary">{PRICE_LABEL}</span> · Pago seguro con Mercado Pago
                  </p>
                )}
              </div>
            </section>
          )}

          {/* ── QUIZ ── */}
          {phase === "quiz" && (
            <section>
              {/* Progress header */}
              <div className="mb-8 sm:mb-12 space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-on-surface-variant text-sm font-bold uppercase tracking-widest">Misión Actual</span>
                    <h3 className="font-headline text-xl sm:text-2xl font-black text-primary">{BLOCKS[q.block].name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black font-headline tabular-nums">
                      {String(qNum).padStart(2, "0")}
                      <span className="text-on-surface-variant text-lg">/{QUESTIONS.length}</span>
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
              <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                <div className="relative z-10 space-y-6 sm:space-y-8">
                  <div className="space-y-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-tighter">
                      {BLOCKS[q.block].category}
                    </span>
                    <h4 className="text-xl sm:text-2xl md:text-4xl font-headline font-extrabold leading-tight tracking-tight">
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
                          className={`flex flex-col items-start p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
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
                          <span className="font-bold text-base sm:text-lg mb-1 text-on-surface">{opt.label}</span>
                          <p className="text-sm text-on-surface-variant">{opt.desc}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pt-6 border-t border-outline-variant/10">
                    <button
                      onClick={handlePrev}
                      disabled={currentQ === 0}
                      className="w-full sm:w-auto justify-center sm:justify-start flex items-center space-x-2 text-on-surface-variant hover:text-on-surface transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                      <span>Anterior</span>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={selected === null}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary rounded-xl font-headline font-bold text-on-primary shadow-lg hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {currentQ === QUESTIONS.length - 1 ? "Finalizar test →" : "Siguiente pregunta"}
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
                  <div className="space-y-3 animate-fade-in-up">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-sm font-bold text-on-surface">Puntua tu experiencia</p>
                        <p className="text-xs text-on-surface-variant">Del 1 al 5 estrellas</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => {
                          const value = index + 1;
                          const isActive = value <= rating;

                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setRating(value)}
                              className="text-primary transition-transform hover:scale-110 active:scale-95"
                              aria-label={`${value} estrellas`}
                            >
                              <span
                                className="material-symbols-outlined text-[32px]"
                                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                              >
                                star
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
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
                        disabled={!feedback.trim() || rating < 1 || sendingFeedback}
                        className="w-full sm:w-auto p-4 bg-primary rounded-xl text-on-primary disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform active:scale-95"
                      >
                        <span className="material-symbols-outlined">{sendingFeedback ? "hourglass_top" : "send"}</span>
                      </button>
                    </div>

                    {feedbackError && (
                      <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                        {feedbackError}
                      </div>
                    )}

                    {/* El feedback es opcional: siempre se puede ir directo al informe. */}
                    <div className="pt-1 text-center sm:text-left">
                      <button
                        type="button"
                        onClick={goToInforme}
                        className="text-sm font-bold text-on-surface-variant underline underline-offset-4 transition-colors hover:text-on-surface"
                      >
                        Prefiero ver mi informe ahora →
                      </button>
                    </div>
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
                      onClick={goToInforme}
                      className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-br from-primary to-primary-dim rounded-xl font-headline font-black text-on-primary text-base sm:text-lg shadow-[0_10px_40px_rgba(120,87,248,0.3)] hover:scale-[1.03] transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
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

      {/* ── PAYWALL (antes de empezar el cuestionario) ── */}
      {showPaywall && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6">
          <div className="glass-panel w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border border-primary/30 p-6 sm:p-8 shadow-2xl">
            {/* Cerrar */}
            {!verifying && (
              <button
                type="button"
                onClick={() => setShowPaywall(false)}
                aria-label="Cerrar"
                className="float-right -mt-1 -mr-1 flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            )}

            <div className="text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-3">
                <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl font-black mb-2 text-on-surface leading-tight">
                Desbloqueá tu informe vocacional completo
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Un solo pago y arrancás las <span className="font-bold text-on-surface">64 preguntas</span> (~8 min).
                Al terminar, recibís al instante un informe 100% personalizado con:
              </p>
            </div>

            {/* Qué incluye el informe */}
            <ul className="mt-5 space-y-3 text-left">
              {PAYWALL_BENEFITS.map((b) => (
                <li key={b.title} className="flex items-start gap-3 rounded-2xl bg-surface-container-high/60 border border-outline-variant/10 p-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary">
                    <span className="material-symbols-outlined text-xl">{b.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface leading-snug">{b.title}</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Precio */}
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="text-sm text-on-surface-variant line-through">{ANCHOR_PRICE_LABEL}</span>
                <span className="font-headline text-3xl font-black text-primary">{PRICE_LABEL}</span>
                <span className="rounded-full bg-tertiary/15 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-tertiary">20% OFF</span>
              </div>
              <p className="mt-1 text-xs text-on-surface-variant">
                Pago único · Sin suscripción · Mucho menos que una sesión de orientación privada
              </p>
            </div>

            {paymentError && (
              <p className="mt-3 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">{paymentError}</p>
            )}

            <button
              type="button"
              onClick={handlePaywallCheckout}
              disabled={isPaying || verifying}
              className="mt-4 w-full rounded-xl bg-gradient-to-br from-primary to-primary-dim py-4 font-headline font-black text-on-primary text-lg shadow-[0_10px_40px_rgba(120,87,248,0.3)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
            >
              {isPaying
                ? "Redirigiendo a Mercado Pago..."
                : verifying
                  ? "Verificando pago..."
                  : "Pagar y empezar el test →"}
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-tertiary">lock</span>
              Pago 100% seguro procesado por Mercado Pago
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setPaid(true);
                    setShowPaywall(false);
                    setPaymentError("");
                    setPhase("quiz");
                  }}
                  className="mt-3 text-xs text-on-surface-variant underline hover:text-on-surface"
                >
                  [dev] Saltar pago
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="w-full mt-10 sm:mt-12 pt-10 sm:pt-12 pb-24 md:pb-8 bg-[#0e0e13] border-t border-[#48474d]/15 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="text-lg font-bold text-[#b2a1ff]">VocacionIA</span>
            <p className="text-[#acaab1]">Tu futuro no es una probabilidad, es una misión.</p>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="font-bold text-on-surface mb-2">Legal</span>
            <a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="/privacy-policy">Privacy Policy</a>
            <a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="/terms-of-service">Terms of Service</a>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="font-bold text-on-surface mb-2">Soporte</span>
            <Link className="text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="/#contacto">Contact Support</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 sm:mt-12 text-center text-[#acaab1]/50 text-xs">
          © 2024 VocacionIA. Launch your mission.
        </div>
      </footer>

    </>
  );
}
