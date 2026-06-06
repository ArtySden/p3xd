function ContactanosContent() {
  const [formulario, setFormulario] = React.useState({ nombre: "", email: "", pais: "peru", mensaje: "" });
  const [errores, setErrores] = React.useState({});
  const [estado, setEstado] = React.useState({ tipo: "", texto: "" });
  const [enviando, setEnviando] = React.useState(false);

  function actualizar(evento) {
    const { name, value } = evento.target;
    setFormulario({ ...formulario, [name]: value });
  }

  function validarFormulario() {
    const nuevosErrores = {};
    if (!validarTexto(formulario.nombre, 3)) nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    if (!validarEmail(formulario.email)) nuevosErrores.email = "Escribe un correo válido, por ejemplo nombre@dominio.com.";
    if (!validarTexto(formulario.mensaje, 10)) nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    return nuevosErrores;
  }

  async function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarFormulario();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setEstado({ tipo: "error", texto: "Revisa los campos marcados antes de enviar." });
      return;
    }

    setEnviando(true);
    setEstado({ tipo: "", texto: "" });

    try {
      const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formulario.nombre.trim(),
          correo: formulario.email.trim(),
          pais: formulario.pais,
          mensaje: formulario.mensaje.trim(),
          proyecto: "UniGo"
        })
      });

      if (!respuesta.ok) throw new Error("El servidor no respondió correctamente.");

      setEstado({ tipo: "exito", texto: "Mensaje enviado correctamente al servidor de prueba." });
      setFormulario({ nombre: "", email: "", pais: "peru", mensaje: "" });
      setErrores({});
    } catch (error) {
      setEstado({ tipo: "error", texto: "No se pudo enviar el formulario. Revisa tu conexión e inténtalo otra vez." });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 fade-in">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <form onSubmit={enviar} className="bg-white rounded-[32px] shadow-2xl p-6 md:p-8" noValidate>
            <p className="font-black text-purple-700">Formulario</p>
            <h2 className="text-4xl font-black text-gray-950">Contáctanos</h2>
            <p className="mt-2 text-gray-700">Los datos son validados.</p>

            <div className="mt-6 grid gap-5">
              <div>
                <label htmlFor="nombre" className="block font-bold text-gray-900">Nombre</label>
                <input id="nombre" name="nombre" value={formulario.nombre} onChange={actualizar} className="focus-ring mt-2 w-full border border-gray-300 rounded-xl px-4 py-3" aria-invalid={!!errores.nombre} aria-describedby="errorNombre" />
                {errores.nombre && <p id="errorNombre" className="mt-2 text-sm font-bold text-red-700">{errores.nombre}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block font-bold text-gray-900">Correo electrónico</label>
                <input id="email" name="email" type="email" value={formulario.email} onChange={actualizar} className="focus-ring mt-2 w-full border border-gray-300 rounded-xl px-4 py-3" aria-invalid={!!errores.email} aria-describedby="errorEmail" />
                {errores.email && <p id="errorEmail" className="mt-2 text-sm font-bold text-red-700">{errores.email}</p>}
              </div>

              <div>
                <label htmlFor="pais" className="block font-bold text-gray-900">País</label>
                <select id="pais" name="pais" value={formulario.pais} onChange={actualizar} className="focus-ring mt-2 w-full border border-gray-300 rounded-xl px-4 py-3">
                  <option value="peru">Perú</option>
                  <option value="colombia">Colombia</option>
                  <option value="mexico">México</option>
                  <option value="argentina">Argentina</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block font-bold text-gray-900">Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows="5" value={formulario.mensaje} onChange={actualizar} className="focus-ring mt-2 w-full border border-gray-300 rounded-xl px-4 py-3" aria-invalid={!!errores.mensaje} aria-describedby="errorMensaje"></textarea>
                {errores.mensaje && <p id="errorMensaje" className="mt-2 text-sm font-bold text-red-700">{errores.mensaje}</p>}
              </div>
            </div>

            {estado.texto && (
              <p className={`mt-5 rounded-2xl px-4 py-3 font-bold ${estado.tipo === "exito" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`} role="status" aria-live="polite">
                {estado.texto}
              </p>
            )}

            <button disabled={enviando} className="focus-ring mt-6 w-full bg-purple-700 hover:bg-purple-800 disabled:bg-gray-400 text-white rounded-xl px-6 py-3 font-black transition">
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>

          <aside className="space-y-6">
            <div className="bg-gray-950 text-white rounded-[32px] shadow-2xl p-6">
              <h3 className="text-2xl font-black">Información de contacto</h3>
              <p className="mt-4"><strong>Teléfono:</strong> +51 123 456 789</p>
              <p className="mt-2"><strong>Dirección:</strong> Av. Universitaria 120, Perú</p>
              <p className="mt-2"><strong>Horario:</strong> Lunes a viernes, 8:00 a.m. - 6:00 p.m.</p>
            </div>
            <div className="bg-white rounded-[32px] shadow-2xl p-6">
              <h3 className="text-2xl font-black text-gray-950">Ubicación</h3>
              <div className="mt-4 rounded-3xl overflow-hidden border border-gray-200">
                <iframe title="Mapa de ubicación UniGo" src="https://maps.google.com/maps?q=-13.1631,-74.2236&z=16&output=embed" width="100%" height="320" style={{ border: 0 }} loading="lazy" allowFullScreen></iframe>
              </div>
            </div>
          </aside>
        </div>
      </section>
  );
}

function ContactanosPage() {
  return <PageLayout><ContactanosContent /></PageLayout>;
}

ReactDOM.render(<ContactanosPage />, document.getElementById("root"));
