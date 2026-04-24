"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Emoji3D from "@/app/components/Emoji3D";

const TRAIT_COLORS = [
  { color: "text-primary", barFrom: "from-primary", barTo: "to-primary-dim" },
  { color: "text-secondary", barFrom: "from-secondary", barTo: "to-secondary-dim" },
  { color: "text-tertiary", barFrom: "from-tertiary", barTo: "to-tertiary-dim" },
  { color: "text-primary-fixed", barFrom: "from-primary-fixed", barTo: "to-primary-fixed-dim" },
  { color: "text-on-surface", barFrom: "from-on-surface", barTo: "to-on-surface" },
] as const;

type Profile = {
  emoji: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  quote: string;
  traits: { label: string; pct: string }[];
  careers: string[];
  methods: { method: string; result: string }[];
};

const PROFILES: Record<string, Profile> = {
  "innovador-tech": {
    emoji: "💻",
    title: "El Innovador",
    titleHighlight: "Tecnológico",
    subtitle: "Mente lógica con visión de futuro: convertís problemas complejos en soluciones digitales elegantes.",
    quote: "Tu perfil combina un pensamiento analítico excepcional con una capacidad innata para anticipar tendencias. Sos de los que construyen el futuro desde cero, línea a línea.",
    traits: [
      { label: "Lógica Analítica", pct: "94%" },
      { label: "Pensamiento Sistemático", pct: "88%" },
      { label: "Capacidad de Foco", pct: "85%" },
      { label: "Creatividad Técnica", pct: "76%" },
      { label: "Liderazgo Tech", pct: "72%" },
    ],
    careers: ["Full-Stack Developer", "Data Scientist", "Tech Entrepreneur"],
    methods: [
      { method: "Holland", result: "Investigativo" },
      { method: "Gardner", result: "Lógico-Matemático" },
      { method: "Kolb", result: "Convergente" },
      { method: "Schwartz", result: "Logro" },
    ],
  },
  "cientifico-analitico": {
    emoji: "🔬",
    title: "El Científico",
    titleHighlight: "Analítico",
    subtitle: "Mente profunda que no se conforma con respuestas superficiales. Buscás el por qué detrás de todo.",
    quote: "Tu fortaleza está en la profundidad de tu pensamiento. Procesás información de manera metódica y sistemática, convirtiendo datos caóticos en conocimiento claro y accionable.",
    traits: [
      { label: "Pensamiento Crítico", pct: "96%" },
      { label: "Rigor Metodológico", pct: "91%" },
      { label: "Curiosidad Intelectual", pct: "89%" },
      { label: "Autonomía Analítica", pct: "82%" },
      { label: "Comunicación Científica", pct: "68%" },
    ],
    careers: ["Investigador Científico", "Analista de Datos", "Académico / Docente"],
    methods: [
      { method: "Holland", result: "Investigativo" },
      { method: "Gardner", result: "Lógico-Abstracto" },
      { method: "Kolb", result: "Asimilador" },
      { method: "Schwartz", result: "Auto-Dirección" },
    ],
  },
  "explorador-naturalista": {
    emoji: "🌿",
    title: "El Explorador",
    titleHighlight: "Naturalista",
    subtitle: "Curiosidad sin límites y amor por el mundo real. Encontrás patrones donde otros ven caos.",
    quote: "Tenés una sensibilidad especial para entender sistemas complejos, ya sean ecosistemas, sociedades o tecnologías. Tu aprendizaje viene de la experiencia directa con el mundo.",
    traits: [
      { label: "Observación Sistemática", pct: "90%" },
      { label: "Pensamiento Holístico", pct: "85%" },
      { label: "Adaptabilidad", pct: "88%" },
      { label: "Conexión Empática", pct: "79%" },
      { label: "Creatividad Aplicada", pct: "74%" },
    ],
    careers: ["Biólogo / Ecólogo", "Ingeniero Ambiental", "Geógrafo / Explorador"],
    methods: [
      { method: "Holland", result: "Investig.-Realista" },
      { method: "Gardner", result: "Naturalista" },
      { method: "Kolb", result: "Acomodador" },
      { method: "Schwartz", result: "Universalismo" },
    ],
  },
  "creativo-digital": {
    emoji: "🎨",
    title: "El Creativo",
    titleHighlight: "Digital",
    subtitle: "Donde otros ven pantallas, vos ves posibilidades. Combinás arte y tecnología con precisión quirúrgica.",
    quote: "Tu perfil es el de alguien que vive en la intersección perfecta entre el arte y la lógica digital. Podés imaginar experiencias únicas y también ejecutarlas con precisión técnica.",
    traits: [
      { label: "Creatividad Visual", pct: "95%" },
      { label: "Pensamiento Digital", pct: "87%" },
      { label: "Estética e Impacto", pct: "91%" },
      { label: "Autonomía Creativa", pct: "83%" },
      { label: "Colaboración", pct: "74%" },
    ],
    careers: ["UX/UI Designer", "Creative Director", "Motion Designer"],
    methods: [
      { method: "Holland", result: "Artístico-Investig." },
      { method: "Gardner", result: "Visual-Espacial" },
      { method: "Kolb", result: "Divergente" },
      { method: "Schwartz", result: "Auto-Dirección" },
    ],
  },
  "comunicador-estrategico": {
    emoji: "🗣️",
    title: "El Comunicador",
    titleHighlight: "Estratégico",
    subtitle: "Las palabras son tu superpoder. Transformás ideas complejas en mensajes que impactan y movilizan.",
    quote: "Tenés una habilidad única para entender audiencias y construir narrativas que conectan. Sos el puente natural entre el conocimiento experto y las personas que lo necesitan.",
    traits: [
      { label: "Comunicación Verbal", pct: "93%" },
      { label: "Narrativa Estratégica", pct: "89%" },
      { label: "Empatía Comunicativa", pct: "85%" },
      { label: "Creatividad Lingüística", pct: "82%" },
      { label: "Pensamiento Crítico", pct: "76%" },
    ],
    careers: ["Periodista / Escritor", "Estratega de Contenido", "Director de Comunicación"],
    methods: [
      { method: "Holland", result: "Artístico-Social" },
      { method: "Gardner", result: "Lingüístico-Verbal" },
      { method: "Kolb", result: "Divergente" },
      { method: "Schwartz", result: "Auto-Dirección" },
    ],
  },
  "artista-expresivo": {
    emoji: "🎭",
    title: "El Artista",
    titleHighlight: "Expresivo",
    subtitle: "Tu mundo interior es tu mayor recurso. Convertís emociones y experiencias en arte que trasciende.",
    quote: "Tenés una sensibilidad artística excepcional y una capacidad para expresar lo que otros sienten pero no pueden articular. El arte es tu lenguaje nativo y tu forma de entender el mundo.",
    traits: [
      { label: "Expresión Artística", pct: "97%" },
      { label: "Sensibilidad Emocional", pct: "91%" },
      { label: "Originalidad", pct: "88%" },
      { label: "Resiliencia Creativa", pct: "79%" },
      { label: "Comunicación No Verbal", pct: "85%" },
    ],
    careers: ["Artista Visual / Músico", "Diseñador Gráfico", "Productor Creativo"],
    methods: [
      { method: "Holland", result: "Artístico" },
      { method: "Gardner", result: "Musical-Espacial" },
      { method: "Kolb", result: "Divergente" },
      { method: "Schwartz", result: "Estimulación" },
    ],
  },
  "lider-emprendedor": {
    emoji: "🚀",
    title: "El Líder",
    titleHighlight: "Emprendedor",
    subtitle: "Naciste para construir imperios. Ves oportunidades donde otros ven obstáculos y llevás a otros con vos.",
    quote: "Tu perfil combina visión estratégica con capacidad de ejecución. Sos un catalizador natural que convierte ideas en realidades, equipos en comunidades y metas en legados.",
    traits: [
      { label: "Visión Estratégica", pct: "92%" },
      { label: "Liderazgo Natural", pct: "89%" },
      { label: "Orientación a Resultados", pct: "94%" },
      { label: "Resiliencia", pct: "87%" },
      { label: "Networking", pct: "81%" },
    ],
    careers: ["Emprendedor / Founder", "Product Manager", "Director de Marketing"],
    methods: [
      { method: "Holland", result: "Emprendedor-Social" },
      { method: "Gardner", result: "Interpersonal" },
      { method: "Kolb", result: "Acomodador" },
      { method: "Schwartz", result: "Logro" },
    ],
  },
  "humanista-social": {
    emoji: "🤝",
    title: "El Humanista",
    titleHighlight: "Comprometido",
    subtitle: "Tu mayor talento es hacer que las personas se sientan vistas, escuchadas y valoradas.",
    quote: "Tenés una capacidad innata para conectar con las personas y entender sus necesidades profundas. Tu vocación está en el servicio genuino a los demás, y en eso encontrás tu mayor satisfacción.",
    traits: [
      { label: "Empatía Profunda", pct: "95%" },
      { label: "Habilidad Social", pct: "90%" },
      { label: "Compromiso Social", pct: "92%" },
      { label: "Comunicación Humana", pct: "87%" },
      { label: "Paciencia y Escucha", pct: "85%" },
    ],
    careers: ["Psicólogo / Trabajador Social", "Docente / Educador", "Líder de ONG"],
    methods: [
      { method: "Holland", result: "Social" },
      { method: "Gardner", result: "Interpersonal" },
      { method: "Kolb", result: "Divergente" },
      { method: "Schwartz", result: "Benevolencia" },
    ],
  },
  "agente-cambio": {
    emoji: "⚖️",
    title: "El Agente",
    titleHighlight: "de Cambio",
    subtitle: "No te conformás con el mundo tal como está. Tu misión es transformarlo, con principios y acción.",
    quote: "Combinás una visión clara del mundo que querés con la determinación de actuar para lograrlo. Tu perfil es el de quienes dejan una huella histórica en las sociedades que habitan.",
    traits: [
      { label: "Conciencia Social", pct: "96%" },
      { label: "Determinación", pct: "91%" },
      { label: "Pensamiento Crítico", pct: "88%" },
      { label: "Comunicación Persuasiva", pct: "84%" },
      { label: "Autonomía de Valores", pct: "93%" },
    ],
    careers: ["Abogado / Activista", "Político / Diplomático", "Periodista de Investigación"],
    methods: [
      { method: "Holland", result: "Social-Artístico" },
      { method: "Gardner", result: "Lingüístico-Interp." },
      { method: "Kolb", result: "Acomodador" },
      { method: "Schwartz", result: "Auto-Dirección" },
    ],
  },
  "estratega-negocios": {
    emoji: "📊",
    title: "El Estratega",
    titleHighlight: "de Negocios",
    subtitle: "Ves el tablero completo donde otros ven piezas sueltas. Convertís recursos en resultados medibles.",
    quote: "Tu mente combina pragmatismo con visión amplia. Sabés exactamente cómo convertir un problema en una oportunidad y una idea en un plan ejecutable con métricas claras.",
    traits: [
      { label: "Pensamiento Estratégico", pct: "92%" },
      { label: "Orientación a Resultados", pct: "94%" },
      { label: "Gestión de Recursos", pct: "88%" },
      { label: "Liderazgo Operativo", pct: "82%" },
      { label: "Análisis de Datos", pct: "78%" },
    ],
    careers: ["Consultor de Negocios", "Analista Financiero", "Project Manager"],
    methods: [
      { method: "Holland", result: "Convenc.-Emprendedor" },
      { method: "Gardner", result: "Lógico-Matemático" },
      { method: "Kolb", result: "Convergente" },
      { method: "Schwartz", result: "Logro" },
    ],
  },
  "constructor-pragmatico": {
    emoji: "🏗️",
    title: "El Constructor",
    titleHighlight: "Pragmático",
    subtitle: "Tus manos y tu mente trabajan juntas para crear cosas que duran. El mundo tangible es tu lienzo.",
    quote: "Tenés una orientación excepcional hacia los resultados físicos y concretos. Sos de los que terminan los proyectos, construyen lo que prometieron y confían en el trabajo bien hecho.",
    traits: [
      { label: "Habilidades Técnicas", pct: "91%" },
      { label: "Pragmatismo", pct: "93%" },
      { label: "Fiabilidad", pct: "90%" },
      { label: "Resolución de Problemas", pct: "82%" },
      { label: "Orientación a Resultados", pct: "88%" },
    ],
    careers: ["Ingeniero Civil / Industrial", "Arquitecto", "Diseñador Industrial"],
    methods: [
      { method: "Holland", result: "Realista" },
      { method: "Gardner", result: "Kinestésico-Espacial" },
      { method: "Kolb", result: "Convergente" },
      { method: "Schwartz", result: "Seguridad" },
    ],
  },
};

function ResultadosContent() {
  const searchParams = useSearchParams();
  const key = searchParams.get("perfil") || "creativo-digital";
  const country = searchParams.get("pais") || "arg";
  const p: Profile = PROFILES[key] ?? PROFILES["creativo-digital"];
  const [isPaying, setIsPaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: `Mi perfil vocacional: ${p.title} ${p.titleHighlight}`,
      text: p.subtitle,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* ignorar si cancela */ }
    } else {
      handleCopyLink();
    }
  };

  const handleCheckout = async () => {
    try {
      setIsPaying(true);
      const res = await fetch("/api/payments/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ perfil: key, pais: country }),
      });

      if (!res.ok) {
        throw new Error("No se pudo iniciar el pago");
      }

      const data = await res.json();
      const checkoutUrl = data.checkoutUrl || data.checkoutSandboxUrl;

      if (!checkoutUrl) {
        throw new Error("No se recibió URL de checkout");
      }

      window.location.href = checkoutUrl;
    } catch {
      alert("No pudimos redirigirte a Mercado Pago. Intentá nuevamente.");
      setIsPaying(false);
    }
  };

  return (
    <>
      <header className="bg-[#0e0e13]/80 backdrop-blur-xl top-0 sticky z-50 shadow-[0_0_40px_rgba(178,161,255,0.08)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto font-headline tracking-tight">
          <div className="text-2xl font-black bg-gradient-to-br from-[#b2a1ff] to-[#7857f8] bg-clip-text text-transparent">VocacionAI</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="bg-gradient-to-br from-[#b2a500] to-[#7857f8] text-on-primary-fixed font-bold px-6 py-2 rounded-xl hover:scale-105 transition-transform active:scale-95 duration-200 inline-block">
              Inicio
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-glow pointer-events-none -z-10"></div>

        {/* Result Header */}
        <section className="text-center mb-16">
          <div className="inline-block mb-6"><Emoji3D emoji={p.emoji} size={120} /></div>
          <h1 className="font-headline text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none">
            {p.title}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {p.titleHighlight}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant font-medium max-w-2xl mx-auto">
            {p.subtitle}
          </p>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {/* Traits */}
          <div className="md:col-span-7 bg-surface-container-low rounded-xl p-8 glass-border">
            <h3 className="font-headline text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">bar_chart</span>
              Tu Perfil Psicométrico
            </h3>
            <div className="space-y-6">
              {p.traits.map(({ label, pct }, i) => {
                const { color, barFrom, barTo } = TRAIT_COLORS[i];
                return (
                  <div key={label}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-on-surface">{label}</span>
                      <span className={`${color} font-bold`}>{pct}</span>
                    </div>
                    <div className="h-3 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${barFrom} ${barTo} rounded-full`} style={{ width: pct }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 p-4 bg-surface-container-highest/50 rounded-xl border-l-4 border-primary italic text-on-surface-variant">
              &ldquo;{p.quote}&rdquo;
            </div>
          </div>

          {/* Careers & Badges */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container-low rounded-xl p-8 glass-border">
              <h3 className="font-headline text-xl font-bold mb-6">Top Recomendaciones</h3>
              <div className="flex flex-wrap gap-3">
                {p.careers.map((career, i) => {
                  const cls = [
                    "px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold text-sm",
                    "px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-bold text-sm",
                    "px-4 py-2 bg-tertiary/10 text-tertiary border border-tertiary/20 rounded-full font-bold text-sm",
                  ][i % 3];
                  return <span key={career} className={cls}>{career}</span>;
                })}
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-8 glass-border">
              <h3 className="font-headline text-xl font-bold mb-6">Metodologías Aplicadas</h3>
              <div className="grid grid-cols-2 gap-4">
                {p.methods.map(({ method, result }) => (
                  <div key={method} className="p-3 bg-surface-container-highest rounded-lg text-center">
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">{method}</p>
                    <span className="text-xs font-bold text-on-surface">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        <section className="bg-gradient-to-br from-surface-container-high to-surface-container-highest rounded-2xl p-1 md:p-1.5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-tertiary/10 to-secondary/20 blur-3xl opacity-50"></div>
          <div className="relative bg-surface-container-lowest rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 border border-outline-variant/15">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-xs font-black uppercase tracking-tighter mb-6 border border-tertiary/20">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Informe completo
              </div>
              <h2 className="font-headline text-3xl md:text-5xl font-black mb-6 leading-tight">Tu guía vocacional personalizada y completa</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  "Más de 8 páginas de análisis profundo",
                  "Top 10 carreras detalladas",
                  "Links a universidades en tu zona",
                  "Roadmap de aprendizaje 2024",
                  "Tus principales motivadores intrínsecos",
                  "Tips para entrevistas y portfolios",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-80 flex flex-col items-center justify-center p-8 bg-surface-container-high rounded-2xl border border-primary/10 shadow-2xl">
              <div className="text-center mb-8">
                <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-1">Inversión única</p>
                <div className="flex flex-col items-center">
                  {country === "arg" ? (
                    <span className="text-4xl font-black text-on-surface">ARS $15.000</span>
                  ) : (
                    <span className="text-4xl font-black text-on-surface">USD $5</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isPaying}
                className="w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed font-black py-5 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(178,161,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">description</span>
                {isPaying ? "Redirigiendo a Mercado Pago..." : "Descargar mi Informe Completo"}
              </button>
              <p className="text-[10px] text-on-surface-variant mt-4 text-center">Acceso instantáneo por email y descarga directa.</p>
            </div>
          </div>
        </section>

        {/* Share */}
        <section className="mt-20 text-center">
          <h4 className="font-headline text-lg font-bold text-on-surface-variant mb-6 uppercase tracking-widest">Comparte tu resultado</h4>
          <div className="flex justify-center gap-4">
            <button onClick={handleShare} className="p-4 bg-surface-container-low rounded-full hover:bg-primary/20 transition-colors border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary">share</span>
            </button>
            <button onClick={handleCopyLink} className="flex items-center gap-2 px-6 py-4 bg-surface-container-low rounded-full hover:bg-on-surface/5 transition-colors border border-outline-variant/10 text-sm font-bold text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">content_copy</span>
              {copied ? "¡Enlace copiado!" : "Copiar Enlace"}
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-[#0e0e13] w-full mt-20 pt-12 pb-8 border-t border-[#48474d]/15 text-sm">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-bold text-[#b2a1ff] mb-4">VocacionAI</div>
            <p className="text-[#acaab1] mb-4 leading-relaxed">
              Orientación vocacional potenciada por Inteligencia Artificial para la próxima generación de profesionales globales.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-on-surface font-bold mb-2">Plataforma</h5>
            <a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Career Roadmap</a>
            <a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Terms of Service</a>
            <a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Privacy Policy</a>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-on-surface font-bold mb-2">Ayuda</h5>
            <a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Contact Support</a>
            <div className="mt-4 text-[#acaab1]">© 2024 VocacionAI. Launch your mission.</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function ResultadosPage() {
  return (
    <Suspense>
      <ResultadosContent />
    </Suspense>
  );
}
