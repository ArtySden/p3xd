function HomeContent() {
  const { usuario, setUsuario } = useApp();
  const [nombre, setNombre] = React.useState(usuario || "");
  const [mensaje, setMensaje] = React.useState("");

  const secciones = [
    { titulo: "Tareas", texto: "Registra cursos, fechas, documentos y estados.", href: "tareas.html" },
    { titulo: "Comida", texto: "Busca lugares económicos y revisa su mapa.", href: "comida.html" },
    { titulo: "Eventos", texto: "Consulta actividades académicas, sociales y deportivas.", href: "eventos.html" },
    { titulo: "Lugares", texto: "Encuentra espacios útiles dentro o cerca del campus.", href: "lugares.html" },
    { titulo: "Tips", texto: "Mejora productividad, memoria y bienestar.", href: "tips.html" },
    { titulo: "Contacto", texto: "Envía tus consultas.", href: "contactanos.html" }
  ];

  function guardarUsuario(evento) {
    evento.preventDefault();
    if (!validarTexto(nombre, 3)) {
      setMensaje("Escribe un nombre de usuario válido de al menos 3 caracteres.");
      return;
    }
    setUsuario(nombre);
    setMensaje("Usuario guardado correctamente.");
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 fade-in">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-10 slide-up">
            <p className="font-black text-purple-700">Proyecto universitario</p>
            <h2 className="mt-3 text-4xl md:text-6xl font-black text-gray-950 leading-tight">
              Tu vida universitaria organizada en un solo sitio.
            </h2>
            <p className="mt-5 text-lg text-gray-700">
              UniGo! Una excelente página para ti.
            </p>

            <form onSubmit={guardarUsuario} className="mt-8 bg-purple-50 border border-purple-200 rounded-3xl p-5" noValidate>
              <label htmlFor="usuario" className="block font-bold text-gray-900">Nombre de usuario</label>
              <div className="mt-3 flex gap-3 xs-stack">
                <input
                  id="usuario"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="focus-ring flex-1 border border-purple-300 rounded-xl px-4 py-3 outline-none"
                  placeholder="Ejemplo: estudiante01"
                  aria-describedby="mensajeUsuario"
                />
                <button className="focus-ring xs-full bg-purple-700 hover:bg-purple-800 text-white rounded-xl px-6 py-3 font-black transition">
                  Guardar
                </button>
              </div>
              {mensaje && <p id="mensajeUsuario" className="mt-3 text-sm font-semibold text-purple-900" aria-live="polite">{mensaje}</p>}
            </form>
          </div>

          <div className="bg-gray-950 text-white rounded-[32px] shadow-2xl p-6 md:p-8 slide-up">
            <h3 className="text-2xl font-black">Funcionalidades principales</h3>
            <ul className="mt-5 space-y-3 text-gray-100">
              <li>• Guarda todos tus trabajos subidos.</li>
              <li>• Cualquier dato se almacena.</li>
              <li>• Tiene formularios.</li>
              <li>• Diseño disponible tanto para celular y laptop.</li>
              <li>• Accesible y una navegación tranquila.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {secciones.map((seccion) => (
            <a key={seccion.href} href={seccion.href} className="card-hover focus-ring block bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
              <h3 className="text-xl font-black text-gray-950">{seccion.titulo}</h3>
              <p className="mt-2 text-gray-700">{seccion.texto}</p>
              <span className="inline-block mt-4 font-black text-purple-700">Entrar →</span>
            </a>
          ))}
        </div>
      </section>
  );
}

function HomePage() {
  return <PageLayout><HomeContent /></PageLayout>;
}

ReactDOM.render(<HomePage />, document.getElementById("root"));
