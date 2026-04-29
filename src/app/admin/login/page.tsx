"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Usuario o contrasena incorrectos.");
        setIsSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("No se pudo iniciar sesion. Intentalo nuevamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10 relative overflow-hidden flex items-center justify-center">
      <div className="glow-orb bg-primary w-[500px] h-[500px] -top-56 -left-56" />
      <div className="glow-orb bg-secondary w-[400px] h-[400px] bottom-0 -right-56" />

      <section className="w-full max-w-4xl glass-card rounded-[2rem] p-2 grid md:grid-cols-2 relative z-10">
        <aside className="rounded-[1.7rem] bg-gradient-to-br from-primary/25 via-primary/10 to-transparent border border-primary/20 p-10 flex flex-col justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-black uppercase tracking-wider border border-primary/20 w-fit">
            <span className="material-symbols-outlined text-sm">shield_lock</span>
            Backoffice
          </div>
          <div className="space-y-5 mt-10">
            <h1 className="font-headline text-4xl font-black leading-tight">
              Panel administrativo
              <br />
              de VocacionIA
            </h1>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm">
              Ingresa con tus credenciales para ver ventas, perfiles mas elegidos y distribucion por pais.
            </p>
          </div>
          <p className="text-xs text-on-surface-variant/80 mt-12">
            Acceso restringido. Todas las sesiones quedan protegidas con cookie httpOnly.
          </p>
        </aside>

        <div className="p-10 md:p-12">
          <h2 className="font-headline text-3xl font-black mb-2">Iniciar sesion</h2>
          <p className="text-sm text-on-surface-variant mb-8">Solo administradores autorizados.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Usuario</label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
                className="w-full rounded-xl bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-on-surface outline-none focus:border-primary"
                placeholder="admin"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Contrasena</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-xl bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-on-surface outline-none focus:border-primary"
                placeholder="********"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-3 bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed py-3.5 rounded-xl font-black hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Validando..." : "Entrar al backoffice"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
