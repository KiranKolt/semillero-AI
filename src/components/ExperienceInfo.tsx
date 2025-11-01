export default function ExperienceInfo() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-3">Controles</h3>
          <ul className="text-gray-300 space-y-2 list-disc ml-5">
            <li>Mouse/Touch: arrastra para mirar alrededor.</li>
            <li>WASD o flechas: moverte por la escena.</li>
            <li>Click sobre portales: entrar a micro‑experiencias.</li>
          </ul>
        </div>
        <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-3">Compatibilidad</h3>
          <p className="text-gray-300">Funciona en navegadores modernos (Chrome, Edge, Firefox). En móviles recientes también es interactivo.</p>
          <div className="mt-4 flex gap-3">
            <a href="#scene3d" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Probar ahora</a>
            <a href="#/proyectos" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10">Ver proyectos</a>
          </div>
        </div>
      </div>
    </section>
  )
}


