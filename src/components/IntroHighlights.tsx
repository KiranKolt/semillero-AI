export default function IntroHighlights() {
  const items = [
    { title: 'Aprende XR creando', desc: 'Talleres y mentorías para construir experiencias 3D reales.', color: 'from-blue-500/20 to-cyan-500/10' },
    { title: 'Publica y exhibe', desc: 'Mostramos tus prototipos en la web y en eventos del semillero.', color: 'from-purple-500/20 to-pink-500/10' },
    { title: 'Colabora en equipo', desc: 'Diseño, arte, programación y narrativa trabajando juntos.', color: 'from-emerald-500/20 to-teal-500/10' },
  ]
  return (
    <section className="py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((i) => (
            <div key={i.title} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${i.color} p-6 backdrop-blur-md`}>
              <h3 className="text-xl font-bold text-white mb-2">{i.title}</h3>
              <p className="text-gray-300">{i.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#/proyectos" className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Ver todos los proyectos</a>
          <a href="mailto:semillero@example.com?subject=Quiero%20sumarme%20al%20Semillero%20VR" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10">Quiero sumarme</a>
        </div>
      </div>
    </section>
  )
}


