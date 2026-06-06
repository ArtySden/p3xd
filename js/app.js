function Header({ titulo = "UniGo" }) {
  const [abierto, setAbierto] = React.useState(false);

  const enlaces = [
    { href: "index.html", texto: "Inicio" },
    { href: "tareas.html", texto: "Tareas" },
    { href: "comida.html", texto: "Comida" },
    { href: "eventos.html", texto: "Eventos" },
    { href: "lugares.html", texto: "Lugares" },
    { href: "tips.html", texto: "Tips" },
    { href: "contactanos.html", texto: "Contáctanos" }
  ];

  return (
    <header className="bg-gray-950 text-white sticky top-0 z-50 shadow-xl">
      <a href="#contenido-principal" className="skip-link">Saltar al contenido principal</a>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <a href="index.html" className="focus-ring rounded-xl" aria-label="Ir al inicio de UniGo">
          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-300 to-amber-200 bg-clip-text text-transparent">
            {titulo}
          </h1>
        </a>

        <nav className="hidden md:block" aria-label="Menú principal">
          <ul className="flex items-center gap-3 lg:gap-5">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  className="focus-ring rounded-lg px-2 py-2 text-sm lg:text-base font-semibold text-gray-100 hover:text-amber-200 transition"
                >
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto(!abierto)}
          className="md:hidden focus-ring rounded-xl bg-white/10 px-4 py-2 font-black hover:bg-white/20 transition"
        >
          ☰
        </button>
      </div>

      <nav id="menu-movil" className={`menu-mobile md:hidden bg-gray-900 ${abierto ? "open" : ""}`} aria-label="Menú móvil">
        <ul className="px-4 pb-4 space-y-2">
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <a
                href={enlace.href}
                className="block focus-ring rounded-xl px-4 py-3 font-semibold hover:bg-white/10 transition"
              >
                {enlace.texto}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-12 bg-gray-950 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 grid gap-4 md:grid-cols-3">
        <div>
          <h2 className="font-black text-xl text-white">UniGo</h2>
          <p className="mt-2 text-sm">Organiza tareas, eventos, comida, lugares útiles y consejos universitarios.</p>
        </div>
        <div>
          <h3 className="font-bold text-white">Proyecto</h3>
          <p className="mt-2 text-sm">Hecho con HTML, CSS, JavaScript, React CDN, Babel, Tailwind CDN y JSON.</p>
        </div>
        <div>
          <h3 className="font-bold text-white">Acceso rápido</h3>
          <a href="contactanos.html" className="inline-block mt-2 text-amber-200 hover:underline focus-ring rounded">Enviar consulta</a>
        </div>
      </div>
    </footer>
  );
}

function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 fade-in" role="status" aria-live="polite">
      <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
        <p className="text-3xl">⌛</p>
        <p className="mt-3 font-black text-gray-900">Cargando información...</p>
      </div>
    </div>
  );
}

function ErrorBox({ mensaje, onRetry }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 fade-in" role="alert">
      <div className="bg-red-50 border border-red-300 rounded-3xl p-6 shadow-lg">
        <h2 className="text-xl font-black text-red-800">No se pudo completar la acción</h2>
        <p className="mt-2 text-red-700">{mensaje}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="focus-ring mt-4 bg-red-700 hover:bg-red-800 text-white px-5 py-3 rounded-xl font-bold transition"
          >
            Intentar nuevamente
          </button>
        )}
      </div>
    </section>
  );
}

function PageLayout({ children, titulo = "UniGo" }) {
  return (
    <AppProvider>
      <Header titulo={titulo} />
      <main id="contenido-principal" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </AppProvider>
  );
}
