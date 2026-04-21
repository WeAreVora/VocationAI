export default function InformePage() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-surface-dim/80 backdrop-blur-xl border-b border-outline-variant/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium">
            <span className="material-symbols-outlined">arrow_back</span>
            Volver
          </a>
          <div className="h-6 w-px bg-outline-variant/20 hidden md:block"></div>
          <span className="text-on-surface-variant text-sm font-label hidden md:block">Informe de Resultados • Mateo García</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-surface-container-high text-on-surface px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-surface-container-highest transition-all active:scale-95 font-medium">
            <span className="material-symbols-outlined">share</span>
            Compartir
          </button>
          <button className="bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed px-6 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(178,161,255,0.2)] active:scale-95 font-bold">
            <span className="material-symbols-outlined">picture_as_pdf</span>
            Guardar como PDF
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto pt-32 pb-20 px-6 space-y-24">
        {/* Cover */}
        <header className="relative glass-card p-12 md:p-20 rounded-[2.5rem] overflow-hidden text-center flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-tertiary/5 pointer-events-none"></div>
          <div className="mb-10 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary font-bold text-xs tracking-widest uppercase">
            INFORME VOCACIONAL IA
          </div>
          <div className="mb-8 text-8xl md:text-9xl">🚀</div>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-none mb-6">
            El Arquitecto <br />
            <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">Sistémico</span>
          </h1>
          <p className="text-on-surface-variant text-xl md:text-2xl max-w-2xl mx-auto mb-12">
            &ldquo;Tu mente combina la precisión técnica con una visión global para construir el futuro.&rdquo;
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-left border-t border-outline-variant/15 pt-8 w-full max-w-xl">
            <div>
              <p className="text-outline text-xs uppercase tracking-widest font-bold">USUARIO</p>
              <p className="text-on-surface font-headline font-bold text-lg">Mateo García</p>
            </div>
            <div className="h-10 w-px bg-outline-variant/15"></div>
            <div>
              <p className="text-outline text-xs uppercase tracking-widest font-bold">FECHA</p>
              <p className="text-on-surface font-headline font-bold text-lg">24 Mayo, 2024</p>
            </div>
            <div className="h-10 w-px bg-outline-variant/15"></div>
            <div>
              <p className="text-outline text-xs uppercase tracking-widest font-bold">ID DE MISIÓN</p>
              <p className="text-on-surface font-headline font-bold text-lg">#VX-9921-AI</p>
            </div>
          </div>
        </header>

        {/* Frameworks */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">Dimensiones del Perfil</h2>
            <span className="text-on-surface-variant text-sm font-label italic">Basado en algoritmos psicométricos avanzados</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "psychology", color: "text-primary", bg: "bg-primary/10", badge: "R-I-E", badgeColor: "text-primary", title: "Código Holland", desc: "Predominancia en áreas Realistas e Investigadoras con matices Emprendedores. Buscas soluciones tangibles basadas en datos." },
              { icon: "calculate", color: "text-tertiary", bg: "bg-tertiary/10", badge: "92%", badgeColor: "text-tertiary", title: "Inteligencias Múltiples", desc: "Tu inteligencia Lógico-Matemática y Visual-Espacial sobresalen. Tienes facilidad para visualizar estructuras complejas." },
              { icon: "model_training", color: "text-secondary", bg: "bg-secondary/10", badge: "Convergente", badgeColor: "text-secondary", title: "Estilo de Aprendizaje (Kolb)", desc: "Aprendes mejor mediante la aplicación práctica de ideas. Te enfocas en la resolución de problemas específicos." },
              { icon: "star", color: "text-surface-tint", bg: "bg-surface-tint/10", badge: "Logro", badgeColor: "text-surface-tint", title: "Valores (Schwartz)", desc: "Te motiva la competencia personal y el éxito demostrado a través de estándares sociales y de eficiencia." },
            ].map(({ icon, color, bg, badge, badgeColor, title, desc }) => (
              <div key={title} className="glass-card p-8 rounded-3xl hover:bg-surface-container-low transition-colors group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 ${bg} rounded-2xl group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                  </div>
                  <span className={`${badgeColor} font-black text-2xl`}>{badge}</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-2">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Analysis */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">Análisis Profundo de la IA</h2>
            <div className="space-y-4 text-on-surface-variant text-lg leading-relaxed">
              <p>
                Tras procesar más de 450 puntos de datos de tus respuestas, la IA de VocacionAI identifica un patrón de pensamiento altamente estructurado pero con una curiosidad insaciable por la innovación. No solo te conformas con entender cómo funcionan las cosas, sino que buscas optimizarlas.
              </p>
              <p>
                Tu perfil destaca en entornos que requieren una combinación de abstracción teórica y ejecución técnica. Posees una &ldquo;Visión de Túnel Productiva&rdquo; que te permite concentrarte en detalles técnicos minúsculos sin perder de vista el objetivo macro del proyecto.
              </p>
              <p>
                Sin embargo, el informe sugiere que tu mayor crecimiento vendrá de colaborar con perfiles más orientados a la comunicación, donde tú puedas ser el pilar estructural que da viabilidad a las ideas creativas.
              </p>
            </div>
          </div>
          <div className="bg-surface-container p-8 rounded-[2rem] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">work_outline</span>
              <h4 className="font-headline font-bold text-on-surface">Ideal Work Style</h4>
            </div>
            <ul className="space-y-4">
              {[
                "Entornos de trabajo asíncronos y por objetivos.",
                "Uso intensivo de herramientas de automatización.",
                "Cargos con alta autonomía en la toma de decisiones.",
                "Desafíos que involucren \"escalabilidad\".",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
                  <span className="text-sm text-on-surface-variant">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Careers */}
        <section>
          <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-10">Carreras Recomendadas</h2>
          <div className="space-y-6">
            {/* Career 1 - Full */}
            <div className="glass-card p-1 rounded-3xl group overflow-hidden transition-all hover:ring-2 hover:ring-primary/30">
              <div className="p-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                  <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-square mb-4">
                    <img
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      alt="Código en pantalla con iluminación neon"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbjSqgWkqgdEVoh4Mzzvd5Ao7N6xALutGYJGNJINfU5IuG3q9WENEMOHLkJrYJ13wBQV8YHjlsIC3y4usl1jQtA2hpDit4ezstIOyz2KveXYDSkVd6qb2907yJihW01g0b1IDew3zv_lXR73DMizNJCicWyqbjbmFrEh94a2UQKxarezG4Ej7BNALywMR_aFMZRe_RojySl12WMWih_wTZwGd9h4AdSny47hI4IjJAtG0tNn0Lsnc6ZC3qpUXk72G5cTUo0zk3M90"
                    />
                    <div className="absolute top-3 left-3 bg-surface-dim/90 backdrop-blur text-tertiary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">trending_up</span>
                      Alta Demanda
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Duración:</span>
                      <span className="text-on-surface font-bold">5 años</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Sueldo inicial:</span>
                      <span className="text-tertiary font-bold">$2.5k - $4k USD</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/3 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline text-2xl font-black text-primary">Ingeniería en Inteligencia Artificial</h3>
                    <span className="bg-surface-container-highest px-4 py-1 rounded-full text-xs text-on-surface-variant font-medium">Match: 98%</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-xs uppercase tracking-tighter font-black text-outline mb-2">Qué estudia</h4>
                      <p className="text-sm text-on-surface-variant">Modelado matemático, redes neuronales, ética algorítmica y estructuras de datos masivos.</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-tighter font-black text-outline mb-2">Qué hace</h4>
                      <p className="text-sm text-on-surface-variant">Diseña sistemas que &ldquo;aprenden&rdquo;, automatiza procesos complejos y crea predicciones basadas en big data.</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-outline-variant/10">
                    <p className="text-xs font-bold text-on-surface-variant mb-3">DÓNDE ESTUDIAR (TOP LATAM)</p>
                    <div className="flex flex-wrap gap-4">
                      {["ITBA (Argentina)", "Tec de Monterrey (México)", "PUC (Chile)"].map((u) => (
                        <a key={u} className="text-xs bg-surface-container px-3 py-2 rounded-lg border border-outline-variant/20 hover:border-primary/50 transition-colors flex items-center gap-2" href="#">
                          {u} <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Career 2 */}
            <div className="glass-card p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
              <div className="w-16 h-16 bg-surface-tint/20 rounded-2xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-surface-tint text-3xl">architecture</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-headline text-xl font-bold">Arquitectura de Software</h3>
                  <span className="text-tertiary text-xs font-black">PROYECCIÓN GLOBAL: 10/10</span>
                </div>
                <p className="text-on-surface-variant text-sm">Planificación de alto nivel para infraestructuras tecnológicas. Ideal para tu perfil sistémico.</p>
              </div>
              <button className="w-full md:w-auto px-6 py-3 bg-surface-container-highest rounded-xl text-sm font-bold hover:text-primary transition-colors">Ver Detalles</button>
            </div>

            {/* Career 3 */}
            <div className="glass-card p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-3xl">database</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-headline text-xl font-bold">Científico de Datos Biotecnológicos</h3>
                  <span className="text-tertiary text-xs font-black">PROYECCIÓN GLOBAL: 9/10</span>
                </div>
                <p className="text-on-surface-variant text-sm">Fusión de biología y computación para el desarrollo de nuevas medicinas.</p>
              </div>
              <button className="w-full md:w-auto px-6 py-3 bg-surface-container-highest rounded-xl text-sm font-bold hover:text-primary transition-colors">Ver Detalles</button>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-black text-on-surface mb-4">Hoja de Ruta Personalizada</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Pasos concretos para pasar de la duda a la acción profesional.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/10 hidden md:block"></div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-primary text-on-primary-fixed flex items-center justify-center font-black">1</span>
                <h3 className="font-headline text-2xl font-bold">Ahora (Colegio)</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-container-low p-5 rounded-2xl border-l-4 border-primary">
                  <p className="font-bold text-sm mb-1">Refuerza Ciencias Exactas</p>
                  <p className="text-xs text-on-surface-variant">Inscríbete en cursos extra de Cálculo o Estadística aplicada.</p>
                </div>
                <div className="bg-surface-container-low p-5 rounded-2xl border-l-4 border-primary">
                  <p className="font-bold text-sm mb-1">Primer Portafolio</p>
                  <p className="text-xs text-on-surface-variant">Aprende Python básico y crea un script que resuelva un problema diario.</p>
                </div>
              </div>
              <div className="pt-6">
                <h4 className="text-xs font-black text-outline uppercase mb-4 tracking-widest">Recursos Recomendados</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-surface-container flex flex-col gap-2">
                    <span className="material-symbols-outlined text-primary">school</span>
                    <span className="text-xs font-bold">Khan Academy: Álgebra</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container flex flex-col gap-2">
                    <span className="material-symbols-outlined text-primary">code</span>
                    <span className="text-xs font-bold">Harvard CS50P (Free)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary-fixed flex items-center justify-center font-black">2</span>
                <h3 className="font-headline text-2xl font-bold">Antes de Matricularte</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-container-low p-5 rounded-2xl border-l-4 border-tertiary">
                  <p className="font-bold text-sm mb-1">Shadowing Profesional</p>
                  <p className="text-xs text-on-surface-variant">Contacta a un egresado por LinkedIn y pide una charla de 15 min.</p>
                </div>
                <div className="bg-surface-container-low p-5 rounded-2xl border-l-4 border-tertiary">
                  <p className="font-bold text-sm mb-1">Check de Idiomas</p>
                  <p className="text-xs text-on-surface-variant">Asegura un nivel B2 de Inglés; es el lenguaje de la tecnología.</p>
                </div>
              </div>
              <div className="bg-surface-container-highest p-6 rounded-3xl">
                <h4 className="text-xs font-black text-primary uppercase mb-4 tracking-widest">Preguntas de Reflexión</h4>
                <ul className="space-y-3">
                  <li className="text-sm italic text-on-surface-variant">&ldquo;¿Me veo resolviendo problemas abstractos por 8 horas?&rdquo;</li>
                  <li className="text-sm italic text-on-surface-variant">&ldquo;¿Qué impacto social quiero que tenga mi tecnología?&rdquo;</li>
                  <li className="text-sm italic text-on-surface-variant">&ldquo;¿Estoy dispuesto a aprender herramientas nuevas cada año?&rdquo;</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <footer className="pt-20 border-t border-outline-variant/15 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="font-headline text-4xl font-black text-on-surface">Tu misión apenas comienza.</h2>
            <p className="text-on-surface-variant leading-relaxed">
              Este informe no es un destino, sino un mapa. Las carreras del futuro aún se están inventando, y personas con tu perfil serán quienes las definan. Confía en tu capacidad de ver patrones donde otros ven caos.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-primary/10 text-primary px-8 py-4 rounded-2xl font-black hover:bg-primary/20 transition-all">Explorar Mentores</button>
              <button className="bg-tertiary/10 text-tertiary px-8 py-4 rounded-2xl font-black hover:bg-tertiary/20 transition-all">Ver Roadmap 2025</button>
            </div>
          </div>
        </footer>
      </main>

      <footer className="w-full mt-20 pt-12 pb-8 bg-[#0e0e13] border-t border-[#48474d]/15">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-lg font-bold text-[#b2a1ff]">VocacionAI</div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-sm text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Privacy Policy</a>
            <a className="text-sm text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Terms of Service</a>
            <a className="text-sm text-[#acaab1] hover:text-[#66ffc7] transition-colors" href="#">Contact Support</a>
          </div>
          <div className="text-right text-sm text-[#acaab1]">© 2024 VocacionAI. Launch your mission.</div>
        </div>
      </footer>
    </>
  );
}
