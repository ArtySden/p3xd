function LugarCard({ lugar }) {
  return (
    <article className="card-hover bg-white border border-gray-200 rounded-3xl p-6 shadow-lg">
      <div className="flex justify-between gap-4">
        <h3 className="text-xl font-black text-gray-950">{lugar.nombre}</h3>
        <span className="text-sm font-black text-green-800 bg-green-100 rounded-full px-3 py-1 h-fit">Gratis</span>
      </div>
      <p className="mt-3 text-gray-700">{lugar.descripcion}</p>
      <p className="mt-4 font-bold text-purple-700">Horario: {lugar.horario}</p>
      <ul className="mt-4 space-y-2 text-gray-700">
        {lugar.servicios.map((servicio) => <li key={servicio}>• {servicio}</li>)}
      </ul>
    </article>
  );
}

function LugaresContent() {
  const { data, cargando, error } = useApp();
  if (cargando) return <Loading />;
  if (error) return <ErrorBox mensaje={error} onRetry={() => location.reload()} />;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 fade-in">
        <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-8">
          <p className="font-black text-purple-700">Espacios útiles</p>
          <h2 className="text-4xl font-black text-gray-950">Lugares</h2>
          <p className="mt-2 text-gray-700">Sitios recomendados para estudiar, recibir apoyo y trabajar en equipo.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.lugares.map((lugar) => <LugarCard key={lugar.id} lugar={lugar} />)}
        </div>
      </section>
  );
}

function LugaresPage() {
  return <PageLayout><LugaresContent /></PageLayout>;
}

ReactDOM.render(<LugaresPage />, document.getElementById("root"));
