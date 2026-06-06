function TareaForm({ onGuardar }) {
  const [titulo, setTitulo] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const [archivo, setArchivo] = React.useState(null);
  const [error, setError] = React.useState("");

  function enviar(evento) {
    evento.preventDefault();
    if (!validarTexto(titulo, 3)) {
      setError("El curso o tarea debe tener al menos 3 caracteres.");
      return;
    }
    if (!fecha) {
      setError("Selecciona una fecha de entrega.");
      return;
    }

    onGuardar({
      id: Date.now(),
      titulo: titulo.trim(),
      fecha,
      estado: "pendiente",
      favorito: false,
      nombreArchivo: archivo ? archivo.name : "Sin archivo",
      archivo: archivo ? URL.createObjectURL(archivo) : null
    });

    setTitulo("");
    setFecha("");
    setArchivo(null);
    setError("");
    evento.target.reset();
  }

  return (
    <form onSubmit={enviar} className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200" noValidate>
      <h3 className="text-xl font-black text-gray-950">Agregar tarea</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="tituloTarea" className="block text-sm font-bold text-gray-800">Curso o tarea</label>
          <input id="tituloTarea" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="focus-ring mt-2 w-full border border-gray-300 rounded-xl px-4 py-3" placeholder="Ej. Cálculo I" />
        </div>
        <div>
          <label htmlFor="fechaTarea" className="block text-sm font-bold text-gray-800">Fecha</label>
          <input id="fechaTarea" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="focus-ring mt-2 w-full border border-gray-300 rounded-xl px-4 py-3" />
        </div>
        <div>
          <label htmlFor="archivoTarea" className="block text-sm font-bold text-gray-800">Archivo</label>
          <input id="archivoTarea" type="file" onChange={(e) => setArchivo(e.target.files[0])} className="focus-ring mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5" />
        </div>
      </div>
      {error && <p className="mt-4 text-sm font-bold text-red-700" role="alert">{error}</p>}
      <button type="submit" className="focus-ring mt-5 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl font-black transition">Guardar tarea</button>
    </form>
  );
}

function TareaCard({ tarea, onEstado, onFavorito, onEliminar }) {
  return (
    <article className="card-hover bg-white border border-gray-200 rounded-3xl p-5 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-purple-700">{tarea.estado === "completada" ? "Completada" : "Pendiente"}</p>
          <h3 className={`mt-1 text-xl font-black ${tarea.estado === "completada" ? "line-through text-gray-500" : "text-gray-950"}`}>{tarea.favorito ? "★ " : "☆ "}{tarea.titulo}</h3>
          <p className="mt-2 text-gray-600">Entrega: {tarea.fecha}</p>
          <p className="mt-1 text-sm text-gray-500">Archivo: {tarea.archivo ? <a className="text-purple-700 font-bold underline" href={tarea.archivo} target="_blank" rel="noreferrer">{tarea.nombreArchivo}</a> : tarea.nombreArchivo}</p>
        </div>
        <button aria-label="Marcar tarea como favorita" onClick={() => onFavorito(tarea.id)} className="focus-ring text-2xl rounded-xl px-3 py-2 hover:bg-purple-50">{tarea.favorito ? "★" : "☆"}</button>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={() => onEstado(tarea.id, "completada")} className="focus-ring bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-bold transition">Completada</button>
        <button onClick={() => onEstado(tarea.id, "pendiente")} className="focus-ring bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl font-bold transition">Pendiente</button>
        <button onClick={() => onEliminar(tarea.id)} className="focus-ring bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-xl font-bold transition">Eliminar</button>
      </div>
    </article>
  );
}

function TareasContent() {
  const { tareas, setTareas } = useApp();

  const pendientes = tareas.filter((tarea) => tarea.estado === "pendiente").length;
  const completadas = tareas.filter((tarea) => tarea.estado === "completada").length;

  function guardarTarea(tarea) {
    setTareas([tarea, ...tareas]);
  }

  function cambiarEstado(id, estado) {
    setTareas(tareas.map((tarea) => tarea.id === id ? { ...tarea, estado } : tarea));
  }

  function toggleFavorito(id) {
    setTareas(tareas.map((tarea) => tarea.id === id ? { ...tarea, favorito: !tarea.favorito } : tarea));
  }

  function eliminarTarea(id) {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 fade-in">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="font-black text-purple-700">Gestión académica</p>
            <h2 className="text-4xl font-black text-gray-950">Tareas universitarias</h2>
            <p className="mt-2 text-gray-700">Tus tareas se guardan.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white rounded-2xl px-5 py-4 shadow"><p className="text-2xl font-black text-amber-700">{pendientes}</p><p className="text-sm font-bold">Pendientes</p></div>
            <div className="bg-white rounded-2xl px-5 py-4 shadow"><p className="text-2xl font-black text-green-700">{completadas}</p><p className="text-sm font-bold">Completadas</p></div>
          </div>
        </div>
        <div className="mt-8"><TareaForm onGuardar={guardarTarea} /></div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {tareas.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 shadow text-center lg:col-span-2">
              <h3 className="text-xl font-black">Aún no hay tareas</h3>
              <p className="mt-2 text-gray-600">Agrega tu primera tarea usando el formulario superior.</p>
            </div>
          ) : tareas.map((tarea) => (
            <TareaCard key={tarea.id} tarea={tarea} onEstado={cambiarEstado} onFavorito={toggleFavorito} onEliminar={eliminarTarea} />
          ))}
        </div>
      </section>
  );
}

function TareasPage() {
  return <PageLayout><TareasContent /></PageLayout>;
}

ReactDOM.render(<TareasPage />, document.getElementById("root"));
