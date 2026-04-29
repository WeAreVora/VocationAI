import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/adminAuth";
import { getCommentsNewestFirst } from "@/lib/commentsStore";

function formatDate(value: string): string {
  return new Date(value).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-primary" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="material-symbols-outlined text-[20px]"
          style={{ fontVariationSettings: index < rating ? "'FILL' 1" : "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default async function AdminCommentsPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = verifyAdminSessionToken(sessionToken);

  if (!session) {
    redirect("/admin/login");
  }

  const comments = await getCommentsNewestFirst();

  return (
    <main className="min-h-screen bg-background px-6 py-8 relative overflow-hidden">
      <div className="glow-orb bg-primary w-[500px] h-[500px] -top-56 -left-56" />
      <div className="glow-orb bg-secondary w-[420px] h-[420px] top-1/3 -right-64" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <header className="glass-card rounded-3xl px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary font-black">Backoffice VocacionIA</p>
            <h1 className="font-headline text-4xl font-black mt-2">Comentarios</h1>
            <p className="text-on-surface-variant text-sm mt-2">
              Opiniones del test con puntuacion de 1 a 5 estrellas.
            </p>
          </div>
          <Link
            href="/admin"
            className="bg-surface-container-high border border-outline-variant/30 hover:border-primary/30 px-5 py-3 rounded-xl text-sm font-bold transition-colors w-fit"
          >
            Volver al panel
          </Link>
        </header>

        {comments.length === 0 && (
          <section className="glass-card rounded-3xl p-8">
            <p className="text-on-surface-variant">Todavia no hay comentarios registrados.</p>
          </section>
        )}

        <section className="space-y-4">
          {comments.map((item) => (
            <article key={item.id} className="glass-card rounded-3xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-black">Comentario #{item.id.slice(0, 8)}</h2>
                  <StarRating rating={item.rating} />
                </div>
                <div className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                  {formatDate(item.createdAt)}
                </div>
              </div>
              <p className="text-on-surface whitespace-pre-wrap leading-relaxed">{item.message}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}