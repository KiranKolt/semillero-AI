export default function News() {
  const items = [
    { title: 'Demo pública del túnel 3D', date: 'Nov 2025', desc: 'Abrimos una preview del recorrido espacial en el navegador.' },
    { title: 'Convocatoria 2026', date: 'Dic 2025', desc: 'Buscamos estudiantes para nuevas líneas de educación y ciencia.' },
    { title: 'Workshop WebXR', date: 'Ene 2026', desc: 'Taller práctico gratuito: A‑Frame + componentes.' },
  ]
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Novedades</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((n, i) => (
            <div key={i} className="bg-gray-800/60 border border-white/10 rounded-xl p-5">
              <div className="text-sm text-blue-300 mb-1">{n.date}</div>
              <div className="font-semibold mb-2">{n.title}</div>
              <p className="text-gray-300 text-sm">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


