import Link from "next/link";

export const metadata = {
  title: "Terms of Service | VocacionAI",
  description: "Condiciones de uso de VocacionAI para el test vocacional, el informe y el flujo de pago.",
};

function SectionCard({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-4">
      <h2 className="text-2xl font-black font-headline">{title}</h2>
      <div className="space-y-3 text-sm sm:text-base text-on-surface-variant leading-relaxed">{children}</div>
    </section>
  );
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 sm:py-14 relative overflow-hidden">
      <div className="glow-orb bg-primary w-[460px] h-[460px] -top-56 -left-56" />
      <div className="glow-orb bg-tertiary w-[360px] h-[360px] top-1/3 -right-56" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        <header className="glass-card rounded-[2rem] p-8 sm:p-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-highest border border-outline-variant/20 text-tertiary text-sm font-semibold tracking-wide">
            <span className="material-symbols-outlined text-sm">description</span>
            Términos de uso del servicio
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black font-headline leading-tight">Terms of Service</h1>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-3xl">
              Estas condiciones regulan el uso de VocacionAI, el test vocacional, el informe generado por IA y la
              compra del reporte completo a través de Mercado Pago. Estos términos se rigen por las leyes de la
              República Argentina.
            </p>
          </div>
        </header>

        <SectionCard title="Uso del servicio">
          <p>
            VocacionAI está pensado para personas que quieren explorar opciones académicas y profesionales. El test y
            los resultados gratuitos son informativos y no reemplazan el criterio de un orientador, docente o
            profesional de la salud mental.
          </p>
          <p>
            Para usar el sitio debés proporcionar información real y mantener la confidencialidad de cualquier acceso
            administrativo que se te otorgue por una relación institucional o de soporte.
          </p>
        </SectionCard>

        <SectionCard title="Resultados, pagos y entrega">
          <p>
            El informe completo se activa después de confirmar el pago. El contenido del reporte puede incluir
            sugerencias de carreras, universidades, perfiles y recomendaciones personalizadas según tus respuestas y el
            país elegido.
          </p>
          <p>
            El precio, la disponibilidad y el contenido del reporte pueden cambiar para mejorar el producto. Si una
            transacción queda pendiente o rechazada, el acceso al informe no se libera hasta verificar el estado final.
          </p>
          <p>
            El reporte digital se entrega para uso personal, privado y no transferible. VocacionAI conserva la
            titularidad del software, el algoritmo, la interfaz, la marca y los materiales del servicio. El usuario no
            adquiere derechos de explotación comercial sobre la plataforma ni sobre sus componentes.
          </p>
        </SectionCard>

        <SectionCard title="Propiedad intelectual">
          <p>
            Todo el software, el algoritmo de recomendación, el diseño de la plataforma, los textos, gráficos y la
            marca VocacionAI están protegidos por el Derecho de Autor y demás normas aplicables. Cualquier uso no
            autorizado, copia, ingeniería inversa o redistribución queda prohibido.
          </p>
          <p>
            El informe generado para cada usuario se licencia solo para consulta personal. No está permitido revenderlo,
            sublicenciarlo, publicarlo como propio ni usarlo para fines comerciales sin autorización expresa y por
            escrito.
          </p>
        </SectionCard>

        <SectionCard title="Edad mínima y consentimiento">
          <p>
            Debés tener al menos 16 años para usar VocacionAI. Si tenés entre 16 y 17 años, declarás contar con la
            autorización de tu padre, madre o tutor legal para aceptar estos términos y, si corresponde, realizar la
            compra del informe.
          </p>
          <p>
            Podemos solicitar verificaciones adicionales si necesitamos confirmar la edad o la autorización del adulto
            responsable.
          </p>
        </SectionCard>

        <SectionCard title="Reembolsos">
          <p>
            Debido a la naturaleza digital e inmediata del informe, no realizamos reembolsos una vez que el documento
            fue entregado o habilitado para descarga, salvo fallas técnicas comprobables imputables a la plataforma.
          </p>
          <p>
            Si el pago fue aprobado pero el reporte no pudo generarse por un error técnico verificable, revisaremos el
            caso y podremos reintentar la entrega o, si corresponde, ofrecer una solución alternativa según el estado
            de la operación.
          </p>
        </SectionCard>

        <SectionCard title="Conducta esperada">
          <p>
            No podés usar el sitio para enviar spam, intentar eludir validaciones de pago, alterar resultados, ni
            interferir con el funcionamiento del sistema o con los datos de otros usuarios.
          </p>
          <p>
            El equipo puede limitar el acceso, revisar registros o desactivar funciones si detecta abuso, fraude o uso
            contrario al propósito educativo de la plataforma.
          </p>
        </SectionCard>

        <SectionCard title="Limitación de responsabilidad">
          <p>
            Hacemos nuestro mejor esfuerzo para ofrecer recomendaciones útiles y actualizadas, pero no garantizamos que
            un perfil vocacional, una carrera o una universidad produzcan un resultado específico en la vida de cada
            usuario.
          </p>
          <p>
            El uso del sitio implica aceptar que los contenidos son una guía orientativa basada en datos y marcos
            teóricos, no una promesa de empleo, ingreso académico o éxito profesional.
          </p>
        </SectionCard>

        <SectionCard title="Modificaciones y jurisdicción">
          <p>
            Podemos modificar estos términos en cualquier momento. Las versiones actualizadas reemplazarán a las
            anteriores desde su publicación en el sitio.
          </p>
          <p>
            Cualquier controversia derivada del uso del servicio será interpretada conforme a las leyes de la República
            Argentina y, en la medida permitida por la normativa aplicable, se someterá a la jurisdicción de los
            tribunales competentes de la Ciudad Autónoma de Buenos Aires.
          </p>
        </SectionCard>

        <footer className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-on-surface-variant">
          <p>Última actualización: abril de 2026.</p>
          <Link href="/" className="text-primary font-bold hover:underline">
            Volver al inicio
          </Link>
        </footer>
      </div>
    </main>
  );
}