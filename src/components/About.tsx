export default function About() {
  return (
    <section id="sobre-nosotros" className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold text-white">Sobre el Semillero</h2>
          <p className="text-gray-300">
            Impulsamos proyectos de realidad virtual y experiencias 3D aplicadas a la educación, ciencia y cultura. 
            Nuestro enfoque es práctico: prototipar, iterar y publicar.
          </p>
          <ul className="text-gray-300 list-disc ml-5 space-y-2">
            <li>Mentorías técnicas en WebXR, three.js y A‑Frame.</li>
            <li>Revisiones de UX para experiencias inmersivas.</li>
            <li>Exhibiciones y demos públicas.</li>
          </ul>
        </div>
        <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">12+</div>
              <div className="text-sm text-gray-400">Proyectos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">30+</div>
              <div className="text-sm text-gray-400">Estudiantes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">6</div>
              <div className="text-sm text-gray-400">Áreas</div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <a href="#proyectos" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Ver proyectos</a>
            <a href="#scene3d" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10">Explorar 3D</a>
          </div>
        </div>
      </div>
    </section>
  )
}


