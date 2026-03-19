"use client";

import { useState } from "react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Compass,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

// ── Sample questions ──────────────────────────────────────────────────────────
const questions = [
  {
    category: "Intereses",
    categoryIcon: <Compass size={14} />,
    question: "¿Qué actividad disfrutás más en tu tiempo libre?",
    hint: "Elegí la opción que mejor te represente. No hay respuestas correctas o incorrectas.",
    answers: [
      { letter: "A", text: "Leer, escribir o crear contenido artístico" },
      { letter: "B", text: "Resolver problemas lógicos o matemáticos" },
      { letter: "C", text: "Organizar eventos o ayudar a otras personas" },
      { letter: "D", text: "Investigar temas científicos o tecnológicos" },
    ],
  },
  {
    category: "Intereses",
    categoryIcon: <Compass size={14} />,
    question: "¿En qué tipo de entorno preferís trabajar?",
    hint: "Pensá en el día a día ideal para vos.",
    answers: [
      { letter: "A", text: "Al aire libre o en contacto con la naturaleza" },
      { letter: "B", text: "En una oficina o espacio de trabajo estructurado" },
      { letter: "C", text: "En equipo, colaborando con otras personas" },
      { letter: "D", text: "De forma independiente y flexible" },
    ],
  },
  {
    category: "Habilidades",
    categoryIcon: <Compass size={14} />,
    question: "¿Cuál es tu punto fuerte cuando trabajás en grupo?",
    hint: "Elegí la que más te identifique en situaciones reales.",
    answers: [
      { letter: "A", text: "Lidero y organizo al equipo" },
      { letter: "B", text: "Aporto ideas creativas" },
      { letter: "C", text: "Me encargo de los detalles y la ejecución" },
      { letter: "D", text: "Media y resuelvo conflictos" },
    ],
  },
];

const progressSteps = [
  { label: "Datos personales", done: true },
  { label: "Intereses y preferencias", active: true },
  { label: "Habilidades", done: false },
  { label: "Estilo de trabajo", done: false },
];

export default function TestPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const totalQ = 20;
  const question = questions[currentQ % questions.length];

  const goNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  };

  const goBack = () => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
      setSelected(null);
    }
  };

  const progress = ((currentQ + 1) / totalQ) * 100;

  return (
    <div
      className="flex flex-col h-full gap-[6px] p-[6px]"
      style={{ background: "var(--bg-sand)" }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between rounded-2xl px-12 py-[14px] w-full"
        style={{ background: "var(--bg-cream)" }}
      >
        {/* Logo + step */}
        <div className="flex items-center gap-3">
          <span
            className="text-[18px] font-medium tracking-[0.5px]"
            style={{ color: "var(--text-primary)" }}
          >
            VocaciónIA
          </span>
          <div className="w-px h-5" style={{ background: "var(--border)" }} />
          <span className="text-[14px]" style={{ color: "var(--text-muted)" }}>
            Test Vocacional
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <div
            className="relative rounded-full overflow-hidden"
            style={{ width: 200, height: 6, background: "var(--border)" }}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: "var(--bg-dark)" }}
            />
          </div>
          <span
            className="text-[13px] font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {currentQ + 1} / {totalQ}
          </span>
        </div>

        {/* Exit */}
        <a
          href="/"
          className="flex items-center gap-[6px] rounded-lg px-4 py-2 transition-opacity hover:opacity-70"
          style={{ border: "1px solid var(--border)" }}
        >
          <X size={14} color="var(--text-muted)" />
          <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
            Salir
          </span>
        </a>
      </div>

      {/* ── Main content ── */}
      <div className="flex gap-[6px] flex-1 min-h-0">
        {/* Question panel */}
        <div
          className="flex flex-col justify-center gap-10 rounded-2xl px-16 py-16 flex-1"
          style={{ background: "var(--bg-cream)" }}
        >
          {/* Category + question number */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-[6px] rounded-full px-[14px] py-[5px]"
              style={{ background: "var(--bg-teal)" }}
            >
              <span style={{ color: "var(--text-primary)" }}>
                {question.categoryIcon}
              </span>
              <span
                className="text-[12px] font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {question.category}
              </span>
            </div>
            <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
              Pregunta {currentQ + 1} de {totalQ}
            </span>
          </div>

          {/* Question text */}
          <div className="flex flex-col gap-4">
            <h2
              className="text-[36px] font-normal leading-[1.15]"
              style={{ color: "var(--text-primary)" }}
            >
              {question.question}
            </h2>
            <p className="text-[15px] leading-[1.5]" style={{ color: "var(--text-muted)" }}>
              {question.hint}
            </p>
          </div>

          {/* Answers */}
          <div className="flex flex-col gap-3 w-full">
            {question.answers.map((ans) => {
              const isSelected = selected === ans.letter;
              return (
                <button
                  key={ans.letter}
                  onClick={() => setSelected(ans.letter)}
                  className="flex items-center gap-4 rounded-xl px-6 py-4 w-full text-left transition-all"
                  style={{
                    background: isSelected ? "#FFFFFF" : "transparent",
                    border: isSelected
                      ? `2px solid var(--accent)`
                      : "1px solid var(--border)",
                  }}
                >
                  {/* Radio */}
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 22,
                      height: 22,
                      border: `2px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
                    }}
                  >
                    {isSelected && (
                      <div
                        className="rounded-full"
                        style={{
                          width: 10,
                          height: 10,
                          background: "var(--accent)",
                        }}
                      />
                    )}
                  </div>

                  {/* Answer content */}
                  <div className="flex flex-col gap-[2px] flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] font-medium px-2 py-[2px] rounded"
                        style={{
                          background: isSelected ? "var(--accent)" : "var(--border)",
                          color: isSelected ? "#FFFFFF" : "var(--text-muted)",
                        }}
                      >
                        {ans.letter}
                      </span>
                    </div>
                    <span
                      className="text-[15px]"
                      style={{
                        color: "var(--text-primary)",
                        fontWeight: isSelected ? "500" : "normal",
                      }}
                    >
                      {ans.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div
          className="flex flex-col gap-[6px]"
          style={{ width: 380, flexShrink: 0 }}
        >
          {/* Progress card */}
          <div
            className="flex flex-col gap-6 rounded-2xl px-7 py-8 flex-shrink-0"
            style={{ background: "var(--bg-teal)" }}
          >
            <span
              className="text-base font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Tu progreso
            </span>
            <div className="flex flex-col gap-4 w-full">
              {progressSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{
                      width: 24,
                      height: 24,
                      background: step.done
                        ? "var(--bg-dark)"
                        : step.active
                        ? "var(--bg-dark)"
                        : "transparent",
                      border: !step.done && !step.active
                        ? "1.5px solid var(--text-secondary)"
                        : "none",
                    }}
                  >
                    {step.done ? (
                      <CheckCircle2 size={14} color="#F3EBE2" />
                    ) : step.active ? (
                      <span className="text-[11px] font-bold text-[#F3EBE2]">
                        {i + 1}
                      </span>
                    ) : (
                      <span
                        className="text-[11px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {i + 1}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-[14px]"
                    style={{
                      color: step.done || step.active
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                      fontWeight: step.active ? "500" : "normal",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tip card */}
          <div
            className="flex flex-col gap-4 rounded-2xl p-7"
            style={{ background: "var(--bg-cream)" }}
          >
            <div className="flex items-center gap-2">
              <Lightbulb size={16} color="var(--accent)" />
              <span
                className="text-[14px] font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Consejo
              </span>
            </div>
            <p
              className="text-[14px] leading-[1.6]"
              style={{ color: "var(--text-secondary)" }}
            >
              Respondé de forma intuitiva, sin pensar demasiado. Tu primera
              reacción suele ser la más auténtica.
            </p>
          </div>

          {/* Keyboard shortcuts card */}
          <div
            className="flex flex-col gap-4 rounded-2xl p-7 flex-1"
            style={{ background: "var(--bg-olive)" }}
          >
            <span
              className="text-[14px] font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Atajos de teclado
            </span>
            <div className="flex flex-col gap-[10px] w-full">
              <div className="flex items-center justify-between w-full">
                <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  Seleccionar opción
                </span>
                <div className="flex gap-1">
                  {["A", "B", "C", "D"].map((k) => (
                    <span
                      key={k}
                      className="rounded px-2 py-[3px] text-[11px] font-medium"
                      style={{ background: "var(--bg-cream)", color: "var(--text-secondary)" }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                  Siguiente
                </span>
                <span
                  className="rounded px-3 py-[3px] text-[11px] font-medium"
                  style={{ background: "var(--bg-cream)", color: "var(--text-secondary)" }}
                >
                  Enter ↵
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className="flex items-center justify-between rounded-2xl px-12 py-[14px] w-full"
        style={{ background: "var(--bg-cream)" }}
      >
        {/* Back */}
        <button
          onClick={goBack}
          disabled={currentQ === 0}
          className="flex items-center gap-[6px] rounded-lg px-5 py-[10px] transition-opacity disabled:opacity-30"
          style={{ border: "1px solid var(--border)" }}
        >
          <ArrowLeft size={16} color="var(--text-secondary)" />
          <span className="text-[14px]" style={{ color: "var(--text-secondary)" }}>
            Anterior
          </span>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-[6px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === currentQ % 10 ? 8 : 6,
                height: i === currentQ % 10 ? 8 : 6,
                background:
                  i === currentQ % 10 ? "var(--accent)" : "var(--border)",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={goNext}
          className="flex items-center gap-[6px] rounded-lg px-6 py-[10px] font-bold transition-opacity hover:opacity-80"
          style={{ background: "var(--bg-dark)", color: "#F3EBE2" }}
        >
          <span className="text-[14px]">Siguiente</span>
          <ArrowRight size={16} color="#F3EBE2" />
        </button>
      </div>
    </div>
  );
}
