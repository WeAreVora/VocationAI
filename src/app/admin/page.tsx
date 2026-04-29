import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/adminAuth";
import { getAdminSalesStats } from "@/lib/salesStore";

function formatDate(value: string): string {
  return new Date(value).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = verifyAdminSessionToken(sessionToken);

  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getAdminSalesStats();

  async function handleLogout() {
    "use server";

    const store = await cookies();
    store.delete(ADMIN_SESSION_COOKIE);
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8 relative overflow-hidden">
      <div className="glow-orb bg-primary w-[500px] h-[500px] -top-56 -left-56" />
      <div className="glow-orb bg-tertiary w-[420px] h-[420px] top-1/3 -right-64" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <header className="glass-card rounded-3xl px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary font-black">Backoffice VocacionIA</p>
            <h1 className="font-headline text-4xl font-black mt-2">Panel de ventas y perfiles</h1>
            <p className="text-on-surface-variant text-sm mt-2">
              Sesion iniciada como {session.username}
            </p>
          </div>
          <form action={handleLogout}>
            <button
              type="submit"
              className="bg-surface-container-high border border-outline-variant/30 hover:border-primary/30 px-5 py-3 rounded-xl text-sm font-bold transition-colors"
            >
              Cerrar sesion
            </button>
          </form>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/mensajes"
            className="glass-card rounded-3xl px-8 py-6 flex items-center justify-between gap-5 border border-outline-variant/30 hover:border-primary/30 transition-colors"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Mensajes de contacto</p>
              <h2 className="font-headline text-xl font-black">Revisar mensajes recibidos</h2>
            </div>
            <span className="text-primary font-bold">Ver mensajes</span>
          </Link>

          <Link
            href="/admin/comentarios"
            className="glass-card rounded-3xl px-8 py-6 flex items-center justify-between gap-5 border border-outline-variant/30 hover:border-tertiary/30 transition-colors"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-1">Comentarios</p>
              <h2 className="font-headline text-xl font-black">Ver opiniones y estrellas</h2>
            </div>
            <span className="text-tertiary font-bold">Ver comentarios</span>
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-3">Servicios vendidos</p>
            <p className="text-5xl font-headline font-black text-primary">{stats.totalSold}</p>
            <p className="text-on-surface-variant text-sm mt-2">Pagos aprobados y validados por servidor.</p>
          </article>

          <article className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-3">Perfil lider</p>
            <p className="text-2xl font-headline font-black text-secondary">
              {stats.profiles[0]?.label ?? "Sin datos"}
            </p>
            <p className="text-on-surface-variant text-sm mt-2">
              {stats.profiles[0] ? `${stats.profiles[0].count} ventas` : "Todavia no hay conversiones."}
            </p>
          </article>

          <article className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-3">Pais lider</p>
            <p className="text-2xl font-headline font-black text-tertiary">
              {stats.countries[0]?.label ?? "Sin datos"}
            </p>
            <p className="text-on-surface-variant text-sm mt-2">
              {stats.countries[0] ? `${stats.countries[0].count} ventas` : "Todavia no hay conversiones."}
            </p>
          </article>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-headline text-2xl font-black">Perfiles mas comprados</h2>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">Top perfiles</span>
            </div>
            <div className="space-y-3">
              {stats.profiles.length === 0 && (
                <p className="text-sm text-on-surface-variant">No hay ventas registradas todavia.</p>
              )}
              {stats.profiles.map((profile) => {
                const percent = stats.totalSold > 0
                  ? Math.round((profile.count / stats.totalSold) * 100)
                  : 0;

                return (
                  <div key={profile.key} className="bg-surface-container-high rounded-xl p-3 border border-outline-variant/20">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-sm">{profile.label}</p>
                      <p className="text-xs text-on-surface-variant">{profile.count} ({percent}%)</p>
                    </div>
                    <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-dim" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-headline text-2xl font-black">Ventas por pais</h2>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">Distribucion</span>
            </div>
            <div className="space-y-3">
              {stats.countries.length === 0 && (
                <p className="text-sm text-on-surface-variant">No hay ventas registradas todavia.</p>
              )}
              {stats.countries.map((country) => {
                const percent = stats.totalSold > 0
                  ? Math.round((country.count / stats.totalSold) * 100)
                  : 0;

                return (
                  <div key={country.key} className="bg-surface-container-high rounded-xl p-3 border border-outline-variant/20">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-sm">{country.label}</p>
                      <p className="text-xs text-on-surface-variant">{country.count} ({percent}%)</p>
                    </div>
                    <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-tertiary to-tertiary-dim" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-headline text-2xl font-black">Ultimas ventas</h2>
            <span className="text-xs uppercase tracking-widest text-on-surface-variant">Live log</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="text-on-surface-variant border-b border-outline-variant/20">
                  <th className="text-left font-bold py-3 pr-4">Fecha</th>
                  <th className="text-left font-bold py-3 pr-4">Perfil</th>
                  <th className="text-left font-bold py-3 pr-4">Pais</th>
                  <th className="text-left font-bold py-3 pr-4">Payment ID</th>
                  <th className="text-left font-bold py-3">Referencia</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSales.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-on-surface-variant">
                      Aun no hay ventas registradas.
                    </td>
                  </tr>
                )}
                {stats.recentSales.map((sale) => (
                  <tr key={sale.paymentId} className="border-b border-outline-variant/10 hover:bg-surface-container-high/40">
                    <td className="py-3 pr-4">{formatDate(sale.approvedAt)}</td>
                    <td className="py-3 pr-4">{sale.perfil}</td>
                    <td className="py-3 pr-4">{sale.pais}</td>
                    <td className="py-3 pr-4 font-mono text-xs">{sale.paymentId}</td>
                    <td className="py-3 font-mono text-xs">{sale.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
