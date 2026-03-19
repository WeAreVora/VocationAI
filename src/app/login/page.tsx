"use client";

import { Globe } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div
      className="flex h-full p-[6px] gap-[6px]"
      style={{ background: "var(--bg-sand)" }}
    >
      {/* ── Left panel: image + overlay ── */}
      <div className="relative flex-1 rounded-2xl overflow-hidden flex flex-col justify-center p-16">
        <Image
          src="https://images.unsplash.com/photo-1689626696802-aca2b99bb2e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Background"
          fill
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 w-full">
          <span className="text-[28px] font-medium tracking-[0.5px] text-white">
            VocaciónIA
          </span>
          <h1
            className="text-[40px] font-normal leading-[1.1] text-center text-white"
            style={{ maxWidth: 380 }}
          >
            Descubrí qué carrera
            <br />
            es ideal para vos
          </h1>
          {/* Social proof */}
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex items-center gap-3">
              {["+12.000", "usuarios", "ya lo hicieron"].map((t) => (
                <span key={t} className="text-[14px] text-white/80">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div
        className="flex flex-col items-center justify-center gap-10 rounded-2xl px-20 py-16 flex-1"
        style={{ background: "var(--bg-cream)" }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 w-full">
          <h2
            className="text-[32px] font-normal leading-[1.1] text-center"
            style={{ color: "var(--text-primary)" }}
          >
            Bienvenido de vuelta
          </h2>
          <p
            className="text-[15px] text-center"
            style={{ color: "var(--text-muted)" }}
          >
            Ingresá para continuar con tu test vocacional
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4 w-full" style={{ maxWidth: 400 }}>
          {/* Email */}
          <div className="flex flex-col gap-[6px]">
            <label
              className="text-[13px] font-medium tracking-[0.3px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Correo electrónico
            </label>
            <div
              className="flex items-center gap-[10px] rounded-[10px] px-4 py-[14px] w-full"
              style={{
                background: "#FFFFFF",
                border: "1px solid var(--border)",
              }}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 bg-transparent text-[15px] outline-none"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[6px]">
            <label
              className="text-[13px] font-medium tracking-[0.3px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Contraseña
            </label>
            <div
              className="flex items-center justify-between gap-[10px] rounded-[10px] px-4 py-[14px] w-full"
              style={{
                background: "#FFFFFF",
                border: "1px solid var(--border)",
              }}
            >
              <input
                type="password"
                placeholder="••••••••"
                className="flex-1 bg-transparent text-[15px] outline-none"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
          </div>

          {/* Forgot */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-[13px] transition-opacity hover:opacity-70"
              style={{ color: "var(--text-muted)" }}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg py-4 px-8 text-base font-bold w-full mt-2 transition-opacity hover:opacity-80"
            style={{ background: "var(--bg-dark)", color: "#F3EBE2" }}
          >
            Ingresar
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full my-1">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-[13px]" style={{ color: "var(--text-placeholder)" }}>
              o continuá con
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          {/* Google */}
          <button
            type="button"
            className="flex items-center justify-center gap-[10px] rounded-lg py-[14px] px-8 w-full transition-opacity hover:opacity-80"
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--border)",
            }}
          >
            <Globe size={18} color="var(--text-secondary)" />
            <span
              className="text-[15px] font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Continuar con Google
            </span>
          </button>
        </form>

        {/* Sign up link */}
        <div className="flex items-center gap-1">
          <span className="text-[14px]" style={{ color: "var(--text-muted)" }}>
            ¿No tenés cuenta?
          </span>
          <a
            href="/test"
            className="text-[14px] font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            Registrate gratis →
          </a>
        </div>
      </div>
    </div>
  );
}
