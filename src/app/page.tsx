"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Timer,
  Users,
  ShieldCheck,
  Brain,
  Target,
  ListChecks,
  FileText,
  Award,
  CircleCheck,
  Check,
  Minus,
  Plus,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <div
      className="flex items-center justify-between rounded-2xl px-12 py-4 w-full"
      style={{ background: "var(--bg-cream)" }}
    >
      <span
        className="text-xl font-medium tracking-[0.5px]"
        style={{ color: "var(--text-primary)" }}
      >
        VocaciónIA
      </span>
      <div className="flex items-center gap-8">
        {["Cómo Funciona", "Beneficios", "Planes", "Preguntas"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
            className="text-sm tracking-[0.5px] hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-secondary)" }}
          >
            {item}
          </a>
        ))}
        <a
          href="/test"
          className="flex items-center rounded-lg px-6 py-[10px] text-sm font-bold transition-opacity hover:opacity-80"
          style={{ background: "var(--bg-dark)", color: "#F3EBE2" }}
        >
          Empezar Test
        </a>
      </div>
    </div>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <div className="flex gap-[6px] w-full rounded-2xl overflow-hidden" style={{ height: 540 }}>
      {/* Left: content */}
      <div
        className="flex flex-col justify-center gap-8 rounded-2xl px-12 py-16 flex-1"
        style={{ background: "var(--bg-cream)" }}
      >
        {/* Badge */}
        <div
          className="flex items-center gap-2 rounded-full px-4 py-[6px] self-start"
          style={{ background: "var(--bg-teal)" }}
        >
          <Sparkles size={16} color="var(--text-primary)" />
          <span
            className="text-[11px] font-medium tracking-[2px]"
            style={{ color: "var(--text-primary)" }}
          >
            TEST VOCACIONAL CON IA
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-[64px] font-normal leading-[1.02] tracking-[-0.5px]"
          style={{ color: "var(--text-primary)" }}
        >
          Descubrí qué
          <br />
          carrera es
          <br />
          ideal para vos
        </h1>

        {/* Subtitle */}
        <p
          className="text-base leading-[1.6]"
          style={{ color: "var(--text-secondary)" }}
        >
          Hacé el test vocacional con inteligencia artificial
          <br />y descubrí tu camino profesional en solo 5 minutos.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <a
            href="/test"
            className="flex items-center gap-2 rounded-lg px-8 py-4 text-base font-bold transition-opacity hover:opacity-80"
            style={{ background: "var(--bg-dark)", color: "#F3EBE2" }}
          >
            Empezar test gratis
            <ArrowRight size={18} color="#F3EBE2" />
          </a>
          <a
            href="#planes"
            className="text-[15px] transition-opacity hover:opacity-70"
            style={{ color: "var(--text-secondary)" }}
          >
            Ver planes →
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center gap-6">
          {[
            { icon: <Timer size={14} />, text: "Test de 5 minutos" },
            { icon: <Users size={14} />, text: "+12.000 usuarios" },
            { icon: <ShieldCheck size={14} />, text: "Gratuito" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-[6px]">
              <span style={{ color: "var(--text-muted)" }}>{icon}</span>
              <span
                className="text-[13px]"
                style={{ color: "var(--text-muted)" }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: image */}
      <div className="relative rounded-2xl overflow-hidden flex-1">
        <Image
          src="https://images.unsplash.com/photo-1627634770818-eee600e6c92e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Estudiante con laptop"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

// ── How It Works ─────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Hacé el test vocacional",
      desc: "Respondé preguntas sobre tus intereses, habilidades y personalidad.",
      bg: "var(--bg-teal)",
    },
    {
      num: "02",
      title: "Recibí tu plan personalizado",
      desc: "Durante 7 días completarás actividades diseñadas por IA para descubrir tu vocación.",
      bg: "var(--bg-blue)",
    },
    {
      num: "03",
      title: "Obtené tu informe profesional",
      desc: "Recibirás análisis de perfil, carreras recomendadas y certificado vocacional.",
      bg: "var(--bg-olive)",
    },
  ];

  return (
    <div
      id="cómo-funciona"
      className="flex flex-col gap-12 rounded-2xl px-12 py-16 w-full"
      style={{ background: "var(--bg-cream)" }}
    >
      <span
        className="text-[11px] font-medium tracking-[2px] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        CÓMO FUNCIONA
      </span>
      <h2
        className="text-[44px] font-normal leading-[1.1]"
        style={{ color: "var(--text-primary)" }}
      >
        Tres pasos hacia
        <br />
        tu vocación
      </h2>
      <div className="flex gap-[6px] w-full">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex flex-col gap-4 rounded-2xl p-8 flex-1"
            style={{ background: step.bg }}
          >
            <span
              className="text-[40px] font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {step.num}
            </span>
            <p
              className="text-[17px] font-medium leading-[1.3]"
              style={{ color: "var(--text-primary)" }}
            >
              {step.title}
            </p>
            <p
              className="text-[15px] leading-[1.6]"
              style={{ color: "var(--text-secondary)" }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Benefits ──────────────────────────────────────────────────────────────────
function BenefitsSection() {
  const benefits = [
    {
      icon: <Brain size={32} color="var(--accent)" />,
      title: "Psicología vocacional",
      desc: "Test basado en principios de psicología vocacional y orientación profesional.",
    },
    {
      icon: <Sparkles size={32} color="var(--accent)" />,
      title: "IA entrenada",
      desc: "Inteligencia artificial entrenada específicamente para orientación profesional.",
    },
    {
      icon: <Target size={32} color="var(--accent)" />,
      title: "Resultados personalizados",
      desc: "Análisis único basado en tus respuestas con recomendaciones a medida.",
    },
    {
      icon: <ListChecks size={32} color="var(--accent)" />,
      title: "Actividades prácticas",
      desc: "7 días de actividades diseñadas para explorar tu vocación de forma práctica.",
    },
    {
      icon: <FileText size={32} color="var(--accent)" />,
      title: "Informe descargable",
      desc: "Descargá tu informe vocacional completo en formato PDF profesional.",
    },
    {
      icon: <Award size={32} color="var(--accent)" />,
      title: "Certificado vocacional",
      desc: "Certificado de perfil vocacional que valida tu proceso de orientación.",
    },
  ];

  return (
    <div
      id="beneficios"
      className="flex flex-col w-full rounded-2xl"
      style={{ background: "var(--bg-cream)" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 px-12 pt-16 pb-0">
        <span
          className="text-[11px] font-medium tracking-[2px] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          BENEFICIOS
        </span>
        <h2
          className="text-[44px] font-normal leading-[1.1]"
          style={{ color: "var(--text-primary)" }}
        >
          ¿Por qué elegir nuestro
          <br />
          test vocacional?
        </h2>
      </div>

      {/* Row 1 */}
      <div className="flex gap-6 px-12 pt-6">
        {benefits.slice(0, 3).map((b) => (
          <div
            key={b.title}
            className="flex flex-col gap-4 rounded-2xl p-8 flex-1"
            style={{ background: "var(--bg-card)" }}
          >
            {b.icon}
            <p
              className="text-[17px] font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {b.title}
            </p>
            <p
              className="text-[15px] leading-[1.6]"
              style={{ color: "var(--text-secondary)" }}
            >
              {b.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex gap-6 px-12 pb-16 mt-6">
        {benefits.slice(3).map((b) => (
          <div
            key={b.title}
            className="flex flex-col gap-4 rounded-2xl p-8 flex-1"
            style={{ background: "var(--bg-card)" }}
          >
            {b.icon}
            <p
              className="text-[17px] font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {b.title}
            </p>
            <p
              className="text-[15px] leading-[1.6]"
              style={{ color: "var(--text-secondary)" }}
            >
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Results Example ───────────────────────────────────────────────────────────
function ResultsSection() {
  const features = [
    "Perfil vocacional detallado",
    "Gráficos de habilidades e intereses",
    "Top 5 carreras recomendadas",
    "Certificado de perfil vocacional",
  ];

  return (
    <div
      className="flex gap-[6px] w-full rounded-2xl overflow-hidden"
      style={{ height: 520 }}
    >
      {/* Left: text */}
      <div
        className="flex flex-col justify-center gap-8 rounded-2xl px-12 py-16 flex-1"
        style={{ background: "var(--bg-cream)" }}
      >
        <span
          className="text-[11px] font-medium tracking-[2px]"
          style={{ color: "var(--text-muted)" }}
        >
          EJEMPLO DE RESULTADOS
        </span>
        <h2
          className="text-[44px] font-normal leading-[1.1]"
          style={{ color: "var(--text-primary)" }}
        >
          Mirá cómo es
          <br />
          tu informe
          <br />
          vocacional
        </h2>
        <p
          className="text-base leading-[1.6]"
          style={{ color: "var(--text-secondary)" }}
        >
          Recibí un análisis completo de tu perfil vocacional con gráficos de
          habilidades, carreras recomendadas y un plan de acción personalizado.
        </p>
        <div className="flex flex-col gap-3">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-[10px]">
              <CircleCheck size={18} color="var(--accent)" />
              <span
                className="text-[15px]"
                style={{ color: "var(--text-secondary)" }}
              >
                {f}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: mock report */}
      <div
        className="flex flex-col gap-6 rounded-2xl p-8 flex-1"
        style={{ background: "var(--bg-teal)" }}
      >
        {/* Mock header */}
        <div className="flex items-center justify-between w-full">
          <span
            className="text-base font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Informe Vocacional
          </span>
          <span
            className="text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            2026
          </span>
        </div>

        {/* Mock profile */}
        <div
          className="flex flex-col gap-3 rounded-xl p-6 w-full"
          style={{ background: "var(--bg-cream)" }}
        >
          <span
            className="text-[13px] font-medium tracking-[1px]"
            style={{ color: "var(--text-muted)" }}
          >
            PERFIL VOCACIONAL
          </span>
          <span
            className="text-lg font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Analítico · Creativo · Social
          </span>
          <div className="flex flex-col gap-2 mt-1">
            {[
              { label: "Creatividad", pct: "82%" },
              { label: "Análisis", pct: "75%" },
              { label: "Liderazgo", pct: "60%" },
            ].map(({ label, pct }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </span>
                  <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                    {pct}
                  </span>
                </div>
                <div
                  className="w-full rounded-full h-[6px]"
                  style={{ background: "var(--border)" }}
                >
                  <div
                    className="h-[6px] rounded-full"
                    style={{ width: pct, background: "var(--accent)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Careers */}
        <div
          className="flex flex-col gap-3 rounded-xl p-6 w-full"
          style={{ background: "var(--bg-cream)" }}
        >
          <span
            className="text-[13px] font-medium tracking-[1px]"
            style={{ color: "var(--text-muted)" }}
          >
            CARRERAS RECOMENDADAS
          </span>
          {[
            "Diseño UX/UI",
            "Psicología",
            "Comunicación Social",
            "Marketing Digital",
            "Arquitectura",
          ].map((c, i) => (
            <div key={c} className="flex items-center gap-3">
              <span
                className="text-[13px] font-medium w-5"
                style={{ color: "var(--accent)" }}
              >
                {i + 1}.
              </span>
              <span className="text-[14px]" style={{ color: "var(--text-primary)" }}>
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function PricingSection() {
  const planIA = [
    "Test vocacional completo",
    "Plan de 7 días con actividades IA",
    "Informe vocacional descargable",
    "Certificado de perfil vocacional",
    "Carreras recomendadas personalizadas",
  ];

  const planPremium = [
    "Todo lo del Plan IA",
    "Chatbot asistente IA 24/7",
    "Seguimiento personalizado",
    "Reunión 1:1 con psicólogo vocacional",
    "Informe vocacional ampliado",
  ];

  return (
    <div
      id="planes"
      className="flex flex-col w-full rounded-2xl"
      style={{ background: "var(--bg-cream)" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4 px-12 pt-16 pb-8">
        <span
          className="text-[11px] font-medium tracking-[2px]"
          style={{ color: "var(--text-muted)" }}
        >
          PLANES
        </span>
        <h2
          className="text-[44px] font-normal leading-[1.1] text-center"
          style={{ color: "var(--text-primary)" }}
        >
          Elegí el plan que mejor
          <br />
          se adapte a vos
        </h2>
        <p className="text-base leading-[1.6]" style={{ color: "var(--text-muted)" }}>
          Pago único. Sin suscripciones. Sin sorpresas.
        </p>
      </div>

      {/* Cards */}
      <div className="flex gap-6 px-12 pb-16">
        {/* Plan IA */}
        <div
          className="flex flex-col gap-8 rounded-2xl p-12 flex-1"
          style={{
            background: "var(--bg-cream)",
            border: "1px solid var(--border)",
          }}
        >
          <span
            className="text-[11px] font-medium tracking-[2px]"
            style={{ color: "var(--text-muted)" }}
          >
            PLAN IA
          </span>
          <div className="flex items-end gap-2">
            <span
              className="text-[48px] font-normal leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              USD 5
            </span>
            <span className="text-[15px] pb-1" style={{ color: "var(--text-muted)" }}>
              pago único
            </span>
          </div>
          <p className="text-[15px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
            Todo lo que necesitás para descubrir tu vocación con inteligencia artificial.
          </p>
          <div className="flex flex-col gap-[14px]">
            {planIA.map((f) => (
              <div key={f} className="flex items-center gap-[10px]">
                <Check size={16} color="var(--accent)" />
                <span className="text-[14px]" style={{ color: "var(--text-secondary)" }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
          <a
            href="/test"
            className="flex items-center justify-center rounded-lg py-4 px-8 text-base font-bold mt-auto transition-opacity hover:opacity-80"
            style={{ background: "var(--bg-dark)", color: "#F3EBE2" }}
          >
            Elegir Plan IA
          </a>
        </div>

        {/* Plan Premium */}
        <div
          className="flex flex-col gap-8 rounded-2xl p-12 flex-1"
          style={{ background: "var(--bg-dark)" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-medium tracking-[2px]"
              style={{ color: "var(--border)" }}
            >
              PLAN PREMIUM
            </span>
            <span
              className="rounded-xl px-[10px] py-1 text-[10px] font-bold tracking-[1px] text-white"
              style={{ background: "var(--accent)" }}
            >
              POPULAR
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[48px] font-normal leading-none" style={{ color: "#F3EBE2" }}>
              USD 15–25
            </span>
            <span className="text-[15px] pb-1" style={{ color: "var(--border)" }}>
              pago único
            </span>
          </div>
          <p className="text-[15px] leading-[1.6]" style={{ color: "var(--border)" }}>
            La experiencia completa: IA + acompañamiento profesional con psicólogo vocacional.
          </p>
          <div className="flex flex-col gap-[14px]">
            {planPremium.map((f) => (
              <div key={f} className="flex items-center gap-[10px]">
                <Check size={16} color="var(--accent)" />
                <span className="text-[14px]" style={{ color: "var(--border)" }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
          <a
            href="/test"
            className="flex items-center justify-center rounded-lg py-4 px-8 text-base font-bold mt-auto transition-opacity hover:opacity-80 text-white"
            style={{ background: "var(--accent)" }}
          >
            Elegir Plan Premium
          </a>
        </div>
      </div>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqItems = [
  {
    q: "¿El test es gratis?",
    a: "Sí, el test inicial es completamente gratuito. Solo pagás si querés acceder al informe vocacional completo y las actividades de los 7 días.",
  },
  {
    q: "¿Cuánto dura el proceso?",
    a: "El test toma 5 minutos. Luego, el programa de actividades dura 7 días. Al finalizar, recibís tu informe vocacional completo.",
  },
  {
    q: "¿Recibo un informe?",
    a: "Sí, recibís un informe vocacional profesional en PDF con análisis de perfil, gráficos de habilidades, carreras recomendadas y certificado.",
  },
  {
    q: "¿Puedo hablar con un profesional?",
    a: "Sí, en el Plan Premium incluimos una reunión 1:1 con un psicólogo vocacional profesional para acompañarte en tu decisión.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      id="preguntas"
      className="flex gap-[6px] w-full rounded-2xl overflow-hidden"
    >
      {/* Left: header */}
      <div
        className="flex flex-col justify-center gap-6 rounded-2xl px-12 py-16"
        style={{ background: "var(--bg-blue)", width: 480, flexShrink: 0 }}
      >
        <span
          className="text-[11px] font-medium tracking-[2px]"
          style={{ color: "var(--text-secondary)" }}
        >
          PREGUNTAS FRECUENTES
        </span>
        <h2
          className="text-[44px] font-normal leading-[1.1]"
          style={{ color: "var(--text-primary)" }}
        >
          Todo lo que
          <br />
          necesitás saber
        </h2>
        <p
          className="text-[15px] leading-[1.6]"
          style={{ color: "var(--text-secondary)" }}
        >
          ¿Tenés alguna otra pregunta?
          <br />
          Escribinos a hola@vocacionia.com
        </p>
      </div>

      {/* Right: items */}
      <div
        className="flex flex-col rounded-2xl px-12 py-12 flex-1"
        style={{ background: "var(--bg-cream)" }}
      >
        {faqItems.map((item, i) => (
          <div
            key={item.q}
            className="flex flex-col gap-3 py-6 cursor-pointer"
            style={{
              borderBottom:
                i < faqItems.length - 1 ? "1px solid var(--border)" : "none",
            }}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="flex items-center justify-between w-full">
              <span
                className="text-base font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {item.q}
              </span>
              {openIndex === i ? (
                <Minus size={18} color="var(--text-muted)" />
              ) : (
                <Plus size={18} color="var(--text-muted)" />
              )}
            </div>
            {openIndex === i && (
              <p
                className="text-[14px] leading-[1.6]"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <div
      className="flex flex-col items-center gap-8 rounded-2xl px-12 py-20 w-full"
      style={{ background: "var(--bg-cream)" }}
    >
      <span
        className="text-[11px] font-medium tracking-[2px]"
        style={{ color: "var(--text-secondary)" }}
      >
        EMPEZÁ HOY
      </span>
      <h2
        className="text-[48px] font-normal leading-[1.05] text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Tu futuro profesional
        <br />
        empieza con una pregunta
      </h2>
      <p
        className="text-base leading-[1.6] text-center"
        style={{ color: "var(--text-secondary)" }}
      >
        Hacé el test vocacional gratuito y descubrí las carreras
        <br />
        que mejor se alinean con tu personalidad.
      </p>
      <div className="flex items-center gap-4">
        <a
          href="/test"
          className="flex items-center gap-2 rounded-lg px-10 py-[18px] text-base font-bold transition-opacity hover:opacity-80"
          style={{ background: "var(--bg-dark)", color: "#F3EBE2" }}
        >
          Empezar test gratis
          <ArrowRight size={18} color="#F3EBE2" />
        </a>
        <a
          href="#planes"
          className="text-[15px] transition-opacity hover:opacity-70"
          style={{ color: "var(--text-secondary)" }}
        >
          Ver planes y precios →
        </a>
      </div>
      <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
        Gratis · 5 minutos · Sin compromiso
      </span>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <div
      className="flex flex-col gap-12 rounded-2xl p-12 w-full"
      style={{ background: "var(--bg-dark)" }}
    >
      {/* Top */}
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-3" style={{ width: 300 }}>
          <span
            className="text-xl font-medium tracking-[0.5px]"
            style={{ color: "#F3EBE2" }}
          >
            VocaciónIA
          </span>
          <p className="text-[14px] leading-[1.6]" style={{ color: "var(--text-muted)" }}>
            Test vocacional con inteligencia artificial.
            <br />
            Descubrí tu camino profesional.
          </p>
        </div>

        <div className="flex gap-16">
          {[
            {
              title: "Producto",
              links: ["Test Vocacional", "Plan IA", "Plan Premium", "Informe Ejemplo"],
            },
            {
              title: "Empresa",
              links: ["Sobre Nosotros", "Blog", "Contacto"],
            },
            { title: "Legal", links: ["Términos", "Privacidad"] },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <span
                className="text-[12px] font-medium tracking-[1px]"
                style={{ color: "var(--border)" }}
              >
                {col.title.toUpperCase()}
              </span>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[14px] transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-muted)" }}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div
        className="flex items-center justify-between w-full pt-6"
        style={{ borderTop: "1px solid var(--text-secondary)" }}
      >
        <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
          © 2026 VocaciónIA. Todos los derechos reservados.
        </span>
        <div className="flex items-center gap-4">
          {[Instagram, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="transition-opacity hover:opacity-70">
              <Icon size={18} color="var(--text-muted)" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main
      className="flex flex-col gap-[6px] min-h-full p-[6px]"
      style={{ background: "var(--bg-sand)" }}
    >
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <ResultsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
