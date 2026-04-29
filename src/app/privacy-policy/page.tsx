import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | VocacionIA",
  description: "Cómo VocacionIA recopila, usa y protege los datos del test, del contacto y del pago.",
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

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 sm:py-14 relative overflow-hidden">
      <div className="glow-orb bg-primary w-[460px] h-[460px] -top-56 -left-56" />
      <div className="glow-orb bg-secondary w-[360px] h-[360px] top-1/3 -right-56" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        <header className="glass-card rounded-[2rem] p-8 sm:p-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-highest border border-outline-variant/20 text-primary text-sm font-semibold tracking-wide">
            <span className="material-symbols-outlined text-sm">security</span>
            Privacidad y tratamiento de datos
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black font-headline leading-tight">Privacy Policy</h1>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-3xl">
              Esta política explica qué datos recolecta VocacionIA, para qué los usamos y cómo los protegemos cuando
              completás el test, nos escribís desde el formulario o iniciás el pago del informe. VocacionIA opera bajo
              la Ley 25.326 de Protección de los Datos Personales de la República Argentina.
            </p>
          </div>
        </header>

        <SectionCard title="Qué datos recolectamos">
          <p>
            Durante el uso del sitio NO almacenamos las respuestas individuales de tus 40 preguntas del test. Solo guardamos de forma totalmente anónima tu valoración y comentarios finales sobre la herramienta.
          </p>
          <p>
            Además, almacenamos el perfil vocacional resultante, el país seleccionado para el informe y los datos técnicos necesarios para verificar pagos y entregas.
          </p>
        </SectionCard>

        <SectionCard title="Para qué usamos esa información">
          <p>
            Usamos los datos para responder consultas, generar el resultado vocacional, verificar el acceso al informe
            pago, mejorar la experiencia del producto y administrar el panel interno de mensajes, comentarios y ventas.
          </p>
          <p>
            También podemos usar información agregada y anónima para entender qué perfiles vocacionales, países y
            contenidos generan más interés dentro de la plataforma.
          </p>
        </SectionCard>

        <SectionCard title="Uso de Inteligencia Artificial">
          <p>
            Las respuestas del test se procesan para generar el perfil vocacional, las recomendaciones y el informe
            final. No utilizamos tus datos personales identificables para entrenar modelos de IA de terceros sin tu
            consentimiento explícito.
          </p>
          <p>
            Podemos usar datos anonimizados o agregados para mejorar la calidad de las recomendaciones, detectar
            errores y afinar la experiencia del servicio. Si en el futuro incorporamos entrenamiento con datos
            personales, lo informaremos y pediremos autorización previa.
          </p>
        </SectionCard>

        <SectionCard title="Menores de edad">
          <p>
            El servicio está pensado para usuarios de 16 años o más. Si tenés entre 16 y 17 años, debés contar con la
            autorización de tu madre, padre o tutor legal para aceptar esta política, usar el test y, si corresponde,
            completar una compra.
          </p>
          <p>
            Si detectamos datos de un menor sin la autorización requerida, podremos suspender el acceso y solicitar la
            intervención de un adulto responsable.
          </p>
        </SectionCard>

        <SectionCard title="Cómo la guardamos y con quién la compartimos">
          <p>
            Los mensajes de contacto y los pagos pendientes o aprobados se guardan localmente dentro de la aplicación
            para que el equipo pueda gestionarlos desde el backoffice. No vendemos tus datos personales.
          </p>
          <p>
            Solo compartimos lo necesario con proveedores externos de pago cuando iniciás una compra. Mercado Pago
            procesa la transacción y devuelve el estado de la operación para habilitar tu informe.
          </p>
        </SectionCard>

        <SectionCard title="Seguridad y transferencias">
          <p>
            Aplicamos medidas razonables de seguridad para proteger la información almacenada, incluyendo control de
            acceso al backoffice, separación de registros y uso de conexiones seguras cuando están disponibles.
          </p>
          <p>
            Si un servicio externo procesa datos fuera de la República Argentina, solo lo haremos cuando sea necesario
            para prestar el servicio y bajo los resguardos técnicos y contractuales correspondientes.
          </p>
        </SectionCard>

        <SectionCard title="Tus derechos">
          <p>
            Podés solicitar acceso, corrección o eliminación de tus datos escribiéndonos desde el formulario de
            contacto. Si querés que revisemos una compra o un mensaje guardado, indicá el email usado y la referencia
            del caso para ubicarlo más rápido.
          </p>
          <p>
            Seguiremos esta política actualizada a medida que sumemos nuevas funciones relacionadas con orientación
            vocacional, soporte y pagos.
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