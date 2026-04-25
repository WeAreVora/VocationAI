"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setStatus("error");
        setError(data?.error ?? "No se pudo enviar el mensaje.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("No se pudo enviar el mensaje. Intentalo nuevamente.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1" htmlFor="contact-name">Nombre</label>
          <input
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full bg-surface-container-high border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-primary/40 transition-all"
            placeholder="Tu nombre"
            type="text"
            maxLength={120}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1" htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-surface-container-high border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-primary/40 transition-all"
            placeholder="tu@email.com"
            type="email"
            maxLength={200}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold ml-1" htmlFor="contact-message">Mensaje</label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full bg-surface-container-high border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-primary/40 transition-all"
          placeholder="¿En qué podemos ayudarte?"
          rows={4}
          maxLength={5000}
          required
        />
      </div>
      {status === "error" && (
        <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </div>
      )}
      {status === "success" && (
        <div className="rounded-xl border border-tertiary/30 bg-tertiary/10 px-4 py-3 text-sm text-tertiary">
          Mensaje enviado. Te responderemos pronto.
        </div>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-primary text-on-primary-fixed font-black rounded-xl hover:bg-primary-dim transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
