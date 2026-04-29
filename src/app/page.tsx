import Link from "next/link";
import Emoji3D from "@/app/components/Emoji3D";
import ContactForm from "@/app/components/ContactForm";

export default function HomePage() {
  return (
    <>
      <nav className="bg-[#0e0e13]/80 backdrop-blur-xl top-0 sticky z-50 shadow-[0_0_40px_rgba(178,161,255,0.08)]">
        <div className="flex justify-between items-center w-full px-4 sm:px-8 py-3 sm:py-4 max-w-7xl mx-auto gap-2 sm:gap-4">
          <div className="text-xl sm:text-2xl font-black bg-gradient-to-br from-[#b2a1ff] to-[#7857f8] bg-clip-text text-transparent font-headline whitespace-nowrap">
            VocacionIA
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors font-label font-medium" href="#como-funciona">Cómo funciona</a>
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors font-label font-medium" href="#vista-previa">Vista previa</a>
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors font-label font-medium" href="#faq">FAQ</a>
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors font-label font-medium" href="#contacto">Contacto</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="/test" className="bg-gradient-to-br from-[#b2a1ff] to-[#7857f8] text-on-primary-fixed font-bold py-3 px-8 sm:px-6 rounded-xl text-xs sm:text-base hover:scale-105 transition-transform active:scale-95 whitespace-nowrap">
              <span className="sm:hidden">Empezar</span>
              <span className="hidden sm:inline">Empezar test gratis</span>
            </a>
          </div>
        </div>
        <div className="md:hidden border-t border-outline-variant/10">
          <div className="px-4 py-2 flex items-center gap-4 overflow-x-auto whitespace-nowrap">
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors font-label font-medium text-sm shrink-0" href="#como-funciona">Cómo funciona</a>
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors font-label font-medium text-sm shrink-0" href="#vista-previa">Vista previa</a>
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors font-label font-medium text-sm shrink-0" href="#faq">FAQ</a>
            <a className="text-[#acaab1] hover:text-[#b2a1ff] transition-colors font-label font-medium text-sm shrink-0" href="#contacto">Contacto</a>
          </div>
        </div>
      </nav>

      <main className="relative overflow-hidden">
        <div className="glow-orb bg-primary w-[500px] h-[500px] -top-48 -left-48"></div>
        <div className="glow-orb bg-secondary w-[400px] h-[400px] top-1/2 -right-48"></div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-highest border border-outline-variant/20 text-primary text-sm font-semibold tracking-wide">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              ✦ QUIZ VOCACIONAL CON INTELIGENCIA ARTIFICIAL
            </div>
            <h1 className="text-6xl lg:text-7xl font-black font-headline leading-tight tracking-tight">
              Descubrí qué{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                carrera es ideal
              </span>{" "}
              para vos
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
              Una herramienta inicial e interactiva que, mediante 40 preguntas, te ayuda a descubrir tus afinidades académicas, diseñada para darte el primer empujón en tu búsqueda.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/test" className="px-8 py-4 bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(178,161,255,0.3)]">
                Empezar test gratis
              </a>
            </div>
            <div className="flex items-center gap-12 pt-8 border-t border-outline-variant/10">
              <div>
                <div className="text-3xl font-black text-on-surface">15k+</div>
                <div className="text-on-surface-variant text-sm">Estudiantes</div>
              </div>
              <div>
                <div className="text-3xl font-black text-secondary">98%</div>
                <div className="text-on-surface-variant text-sm">Precisión AI</div>
              </div>
              <div>
                <div className="text-3xl font-black text-tertiary">200+</div>
                <div className="text-on-surface-variant text-sm">Carreras</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-3xl space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h3 className="text-lg font-bold">Tipologías de Holland (RIASEC)</h3>
              <p className="text-sm text-on-surface-variant">Para identificar los ambientes laborales que mejor hacen "match" con tu personalidad.</p>
            </div>
            <div className="glass-card p-6 rounded-3xl space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <h3 className="text-lg font-bold">Inteligencias Múltiples (Gardner)</h3>
              <p className="text-sm text-on-surface-variant">Para mapear tus áreas de mayor facilidad y talento natural.</p>
            </div>
            <div className="glass-card p-6 rounded-3xl space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/20 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">schema</span>
              </div>
              <h3 className="text-lg font-bold">Estilos de Aprendizaje (Kolb)</h3>
              <p className="text-sm text-on-surface-variant">Para entender cómo absorbés mejor la información (haciendo, leyendo, experimentando).</p>
            </div>
            <div className="glass-card p-6 rounded-3xl space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed/20 flex items-center justify-center text-primary-fixed">
                <span className="material-symbols-outlined">balance</span>
              </div>
              <h3 className="text-lg font-bold">Valores Básicos (Schwartz)</h3>
              <p className="text-sm text-on-surface-variant">Para alinear tus motivaciones personales con tu futura rutina profesional.</p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section id="como-funciona" className="max-w-7xl mx-auto px-8 py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black font-headline tracking-tight">Tres pasos para descubrir tu camino</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Nuestro proceso está diseñado para ser simple pero profundamente revelador.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="text-8xl font-black opacity-10 absolute -top-4 -right-2 group-hover:scale-110 transition-transform duration-500">1</div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">assignment</span>
                </div>
                <h4 className="text-2xl font-bold">Test Gratuito</h4>
                <p className="text-on-surface-variant">Respondé 40 preguntas rápidas diseñadas por marcos teóricos reconocidos.</p>
              </div>
            </div>
            <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="text-8xl font-black opacity-10 absolute -top-4 -right-2 group-hover:scale-110 transition-transform duration-500">2</div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-3xl">hub</span>
                </div>
                <h4 className="text-2xl font-bold">Análisis AI</h4>
                <p className="text-on-surface-variant">Nuestros algoritmos cruzan tus datos con miles de perfiles exitosos en el mercado laboral.</p>
              </div>
            </div>
            <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="text-8xl font-black opacity-10 absolute -top-4 -right-2 group-hover:scale-110 transition-transform duration-500">3</div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-3xl">article</span>
                </div>
                <h4 className="text-2xl font-bold">Informe Elite</h4>
                <p className="text-on-surface-variant">Recibís un PDF de 15 páginas con carreras, universidades y consejos personalizados.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Preview */}
        <section id="vista-previa" className="bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-black font-headline tracking-tight">Tu mapa profesional personalizado</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  No te damos solo una lista de carreras. Te entregamos un análisis de por qué encajás en cada área y qué universidades son las mejores para vos.
                </p>
                <ul className="space-y-6">
                  {[
                    "Ranking de 5 carreras con mayor afinidad.",
                    "Gráficos de radar sobre tus inteligencias dominantes.",
                    "Links directos a planes de estudio de universidades reales.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <div className="mt-1 w-6 h-6 bg-tertiary/20 text-tertiary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-xs">check</span>
                      </div>
                      <span className="text-on-surface">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-tertiary rounded-[3rem] opacity-20 blur-2xl"></div>
                <div className="glass-card rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          alt="Estudiante universitario con lentes"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW_CIAwbh945QfyUHZuz7x9upigUURf9GoflMPWtryiCpN26Djis2XpvOsPjCrufdcZ-CPXsWwOc3YTY7sizEpchYf7OhmsEp-tnJrcWrSlrfOcH2BloAgG8fE0TGteeF_sp-dg9rYjM0EvOoqNbspNyYpsS58aVoq6dq--8g8d71y_QU164cHU1zchhFnohaYUaiDBy5opLNZlX1nl4n1T_09Nc665Xg9lWTwDYUXpqRXiRmYZHy_5Pkkn3XX-mCd5huW44tc1m4"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold">Mateo García</div>
                        <div className="text-[10px] text-on-surface-variant">Reporte Generado: May 2024</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-full">PERFIL COMPLETO</div>
                  </div>

                  <div className="mb-8">
                    <h5 className="text-3xl font-black font-headline">The Multifaceted Explorer</h5>
                    <p className="text-on-surface-variant text-sm">Tu perfil destaca por una alta capacidad analítica mezclada con creatividad aplicada.</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      { label: "Liderazgo Estratégico", pct: "92%", color: "text-tertiary", bg: "bg-tertiary" },
                      { label: "Resolución Técnica", pct: "85%", color: "text-primary", bg: "bg-primary" },
                    ].map(({ label, pct, color, bg }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[11px] mb-1 font-bold">
                          <span>{label}</span>
                          <span className={color}>{pct}</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className={`h-full ${bg}`} style={{ width: pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Carreras Recomendadas</div>
                    <div className="flex flex-wrap gap-2">
                      {["Ing. en Software", "Diseño UX/UI", "Marketing Data"].map((c) => (
                        <span key={c} className="px-4 py-2 bg-surface-container-highest text-xs rounded-xl border border-outline-variant/20">{c}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center gap-4 grayscale opacity-50">
                    <div className="h-6 w-16 bg-on-surface/20 rounded"></div>
                    <div className="h-6 w-20 bg-on-surface/20 rounded"></div>
                    <div className="h-6 w-14 bg-on-surface/20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="max-w-7xl mx-auto px-8 py-24">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-4xl font-black font-headline">Por qué VocacionIA es diferente</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Nacimos de la frustración de ver a miles de jóvenes elegir carreras por inercia o presión social. Combinamos la precisión de la Inteligencia Artificial con los marcos teóricos más respetados del mundo para darte una respuesta real y accionable.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                No somos un simple cuestionario; somos tu primer paso hacia una vida profesional satisfactoria y exitosa.
              </p>
              <div className="pt-4">
                <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                  Conocé nuestra metodología <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-3 grid md:grid-cols-2 gap-4">
              {[
                { icon: "psychology_alt", color: "text-primary", title: "Modelos de Referencias", desc: "Basado en las tipologias de Holland y las inteligencias multiples de Gardner entre otros." },
                { icon: "auto_graph", color: "text-secondary", title: "Reporte AI", desc: "Análisis profundo generado por modelos de lenguaje avanzados." },
                { icon: "bolt", color: "text-tertiary", title: "Resultados Instantáneos", desc: "Nada de esperar días. Tu futuro está listo en 5 minutos." },
                { icon: "savings", color: "text-primary", title: "Precio Accesible", desc: "Mucho más económico que una sesión de orientación privada." },
                { icon: "school", color: "text-secondary", title: "Unis Reales", desc: "Conectamos tus resultados con ofertas académicas vigentes." },
                { icon: "picture_as_pdf", color: "text-tertiary", title: "Formato PDF", desc: "Descargá tu reporte y compartilo con tus padres o amigos." },
              ].map(({ icon, color, title, desc }) => (
                <div key={title} className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/10 space-y-4">
                  <span className={`material-symbols-outlined ${color} text-3xl`}>{icon}</span>
                  <h4 className="font-bold text-xl">{title}</h4>
                  <p className="text-sm text-on-surface-variant">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-black font-headline">Lo que dicen los futuros profesionales</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  text: "\"Estaba totalmente perdida entre Derecho y Psicología. El test me mostró que mi perfil era mucho más analítico y me recomendó Ciencia de Datos. ¡Me cambió la vida!\"",
                  name: "Sofía Martínez",
                  role: "Estudiante de Data Science",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbH4sBTY0h12YZVrc5n_F3ckMKipRMPaYNmgk1zMBsTAQySLBi4c0oR4Yst0ut8FQECZur_7q7P2lC4Uc8cf21LPR-Bw6sHO9cVjxpkByOmrRCUQrzVZzHEwvILe_1wZUPym1p4f-gZA_ex0E-ZCwXvvPTudvlevgtZeueGJks9hvJu3OhqkBPa0BaRGOP6_W8fMo0TT-p1HPgy1EaosOqT7n4NWRnCWTF0yXyeRC4e2KsL-ZZJl_AtbzcsAi-Vak1Svab7Rk1I6A",
                },
                {
                  text: "\"El reporte es increíblemente detallado. Las opciones de universidades que me dio me ahorraron meses de investigación. Super recomendado.\"",
                  name: "Lucas Pérez",
                  role: "Estudiante de Arquitectura",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKxeodKPTQysugxiR8Ti60n0NAf2xAYELX3gh7JNRZ9Vs4C9O4HEOS5s4ICGqGFbQ7UmHIBLQz2H_YZ3blskqo-56se_xJZ-8O9fJNE0daYtOFJlcOvFZS9xTPakfoHBvNvTi1BZIwHgQEiUgYRPNiDkkFwbG_ZLAkVuc7X2koLX8VQkbatQTdsxqe6bQ-yNv2zIvYRCa9tr3kkE9z67XbyI_Zt9_Jqtd1mApjHO1Z3gHUQmK9rmtwT4snJHWXjPIqGQxvS0k1DK4",
                },
                {
                  text: "\"No creía que una IA pudiera conocerme tanto. El análisis de mis inteligencias fue spot-on. Gracias VocacionIA por la claridad.\"",
                  name: "Martina Díaz",
                  role: "Ingeniería Industrial",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4rjwM8iYX37XNPeyGmkeG_rO2FfVhrxJr87fVRSmS947JW0PtQjl-zcqeen6shX6xEab0ZKehapDUbzXakNvJxR7UAdJpZmF6FhFBA1fRO6KLO78W-QuqCl2wWMz-yfg18bs_MoosNG7CEqcNd-RK6td4TOSgP2qIUU5esn9E0v5nIo3bnKanN-y8sYwWguCtXPNJkFfxGEBIs7s9r2xPMrSbKmp0cV9j-d_u0V4Tbhzxw5KkmS071MVMly8KdeUZuq0CDP7smss",
                },
              ].map(({ text, name, role, img }) => (
                <div key={name} className="glass-card p-8 rounded-3xl space-y-6">
                  <div className="flex text-tertiary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-on-surface-variant italic">{text}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden">
                      <img className="w-full h-full object-cover" alt={name} src={img} />
                    </div>
                    <div>
                      <div className="font-bold">{name}</div>
                      <div className="text-xs text-on-surface-variant">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-headline">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "¿El test es realmente gratis?",
                a: "Sí, el cuestionario interactivo de 40 preguntas y tu resultado básico de afinidad son 100% gratuitos. Si querés ir un paso más allá, ofrecemos un 'Reporte Elite' de pago, donde nuestra IA analiza tu perfil en profundidad y te entrega un mapa detallado de carreras y universidades.",
              },
              {
                q: "¿Cómo funciona el análisis de la IA?",
                a: "Nuestro motor cruza tus respuestas con modelos de datos educativos y cuatro marcos teóricos reconocidos mundialmente (como las tipologías de Holland y las inteligencias múltiples de Gardner). A partir de ahí, la IA encuentra patrones de afinidad para recomendarte los caminos académicos que mejor hacen match con tu forma de ser.",
              },
              {
                q: "¿Esto reemplaza a un orientador vocacional humano?",
                a: "No, y no busca hacerlo. VocacionIA es una brújula inicial excelente para descubrir tus intereses, explorar opciones que quizás no conocías y dar el primer paso. Es una herramienta complementaria, pero no reemplaza el acompañamiento profundo de un profesional de la salud mental o la educación.",
              },  
              {
                q: "¿Tengo que crearme una cuenta para participar?",
                a: "¡Para nada! Sabemos que querés respuestas, no llenar formularios. Podés hacer el test completo y ver tus resultados iniciales sin necesidad de registrarte ni dejar contraseñas."
              },
              {
                q: "¿Sirve para cualquier país?",
                a: "Sí. Los perfiles vocacionales, los intereses y las habilidades son universales. Tené en cuenta que nuestro catálogo específico de recomendaciones de universidades está enfocado inicialmente en Latinoamérica y España, pero el análisis de tu perfil te servirá estés donde estés.",
              },
              {
                q: "¿Qué hacen con mis datos y mis respuestas?",
                a: "Tu privacidad es prioridad. No almacenamos las respuestas individuales de tu cuestionario ni las asociamos a tu identidad. El algoritmo procesa la información en el momento para darte tu resultado y luego la descarta. No vendemos tus datos ni los usamos para entrenar modelos de IA de terceros sin tu permiso."
              }
            ].map(({ q, a }) => (
              <details key={q} className="group bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                  <span className="font-bold">{q}</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-on-surface-variant">{a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-8 py-24">
          <div className="bg-gradient-to-br from-primary-dim to-secondary rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="relative z-10 space-y-8">
              <div className="flex justify-center"><Emoji3D emoji="🚀" size={96} /></div>
              <h2 className="text-4xl lg:text-6xl font-black font-headline text-on-primary-fixed leading-tight">
                ¿Listo para lanzar tu <br />misión profesional?
              </h2>
              <p className="text-on-primary-fixed/80 text-xl max-w-2xl mx-auto font-medium">
                No dejes tu futuro al azar. Dejá que la ciencia y la tecnología te guíen.
              </p>
              <a href="/test" className="inline-block bg-on-surface text-surface-dim px-12 py-5 rounded-2xl text-xl font-black hover:scale-110 transition-transform active:scale-95 shadow-2xl">
                Empezar mi test ahora
              </a>
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary-fixed/20 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Contact */}
        <section id="contacto" className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-4xl font-black font-headline">Hablemos</h2>
            <p className="text-on-surface-variant text-lg">¿Tenés dudas sobre cómo implementar VocacionIA en tu colegio o simplemente querés saludarnos?</p>
            <div className="space-y-4">
              <div className="rounded-2xl bg-surface-container-low border border-outline-variant/10 p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div className="space-y-1">
                  <div className="font-bold">Soporte, colegios y alianzas</div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Usá el formulario para consultas sobre implementación, seguimiento del informe, experiencia de estudiantes o integración institucional.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-surface-container-low border border-outline-variant/10 p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">database</span>
                </div>
                <div className="space-y-1">
                  <div className="font-bold">Qué guardamos al contactarnos</div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    El sitio registra nombre, email y mensaje para responderte y hacer seguimiento desde el panel interno.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">share</span>
                </div>
                <div>
                  <div className="text-sm text-on-surface-variant">Seguinos en</div>
                  <div className="font-bold">@vocacionia</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem]">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="bg-[#0e0e13] w-full mt-20 pt-12 pb-8 border-t border-[#48474d]/15">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-4">
            <div className="text-lg font-bold text-[#b2a1ff] font-headline">VocacionIA</div>
            <p className="text-[#acaab1] text-sm leading-relaxed">
              Conectando a la próxima generación de profesionales con su vocación a través de IA.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="font-bold text-on-surface">Plataforma</div>
              <ul className="space-y-2">
                <li><Link className="text-[#acaab1] hover:text-[#66ffc7] transition-colors text-sm" href="/test">Test Vocacional</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="font-bold text-on-surface">Legal</div>
              <ul className="space-y-2">
                <li><a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors text-sm" href="/privacy-policy">Privacy Policy</a></li>
                <li><a className="text-[#acaab1] hover:text-[#66ffc7] transition-colors text-sm" href="/terms-of-service">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 text-center text-[#acaab1] text-xs border-t border-outline-variant/10 pt-8">
          © 2024 VocacionIA. Launch your mission.
        </div>
      </footer>
    </>
  );
}
