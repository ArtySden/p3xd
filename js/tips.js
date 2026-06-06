function TipCard({ tip }) {
  return (
    <article className="card-hover bg-white border border-gray-200 rounded-3xl p-6 shadow-lg">
      <h3 className="text-xl font-black text-gray-950">{tip.titulo}</h3>
      <p className="mt-2 font-bold text-purple-700">{tip.subtitulo}</p>
      <ul className="mt-4 space-y-2 text-gray-700">
        {tip.puntos.map((punto) => <li key={punto}>• {punto}</li>)}
      </ul>
    </article>
  );
}

function TipsContent() {
  const { data, cargando, error } = useApp();
  const [categoria, setCategoria] = React.useState("productividad");

  if (cargando) return <Loading />;
  if (error) return <ErrorBox mensaje={error} onRetry={() => location.reload()} />;

  const categorias = Object.keys(data.tips);
  const tips = data.tips[categoria];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 fade-in">
        <div className="bg-white rounded-[32px] shadow-2xl p-6 md:p-8">
          <p className="font-black text-purple-700">Consejos estudiantiles</p>
          <h2 className="text-4xl font-black text-gray-950">Tips</h2>
          <p className="mt-2 text-gray-700">Cambia de categoría para ver consejos de productividad, memorización y bienestar.</p>
          <div className="mt-6 flex flex-wrap gap-3" role="tablist" aria-label="Categorías de tips">
            {categorias.map((item) => (
              <button key={item} type="button" role="tab" aria-selected={categoria === item} onClick={() => setCategoria(item)} className={`focus-ring rounded-full px-5 py-3 font-black capitalize transition ${categoria === item ? "bg-purple-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => <TipCard key={tip.titulo} tip={tip} />)}
        </div>
      </section>
  );
}

function TipsPage() {
  return <PageLayout><TipsContent /></PageLayout>;
}

ReactDOM.render(<TipsPage />, document.getElementById("root"));
