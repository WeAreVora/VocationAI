import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/adminAuth";
import { getContactMessagesNewestFirst } from "@/lib/contactStore";

function formatDate(value: string): string {
  return new Date(value).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default async function AdminMessagesPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = verifyAdminSessionToken(sessionToken);

  if (!session) {
    redirect("/admin/login");
  }

  const messages = await getContactMessagesNewestFirst();

  return (
    <main className="min-h-screen bg-background px-6 py-8 relative overflow-hidden">
      <div className="glow-orb bg-primary w-[500px] h-[500px] -top-56 -left-56" />
      <div className="glow-orb bg-secondary w-[420px] h-[420px] top-1/3 -right-64" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <header className="glass-card rounded-3xl px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary font-black">Backoffice VocacionAI</p>
            <h1 className="font-headline text-4xl font-black mt-2">Mensajes de contacto</h1>
            <p className="text-on-surface-variant text-sm mt-2">
              Ordenados de mas nuevo a mas viejo.
            </p>
          </div>
          <Link
            href="/admin"
            className="bg-surface-container-high border border-outline-variant/30 hover:border-primary/30 px-5 py-3 rounded-xl text-sm font-bold transition-colors w-fit"
          >
            Volver al panel
          </Link>
        </header>

        {messages.length === 0 && (
          <section className="glass-card rounded-3xl p-8">
            <p className="text-on-surface-variant">Todavia no hay mensajes de contacto.</p>
          </section>
        )}

        <section className="space-y-4">
          {messages.map((item) => (
            <article key={item.id} className="glass-card rounded-3xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl font-black">{item.name}</h2>
                  <p className="text-sm text-on-surface-variant">{item.email}</p>
                </div>
                <div className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                  {formatDate(item.createdAt)}
                </div>
              </div>
              <p className="text-on-surface whitespace-pre-wrap">{item.message}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
