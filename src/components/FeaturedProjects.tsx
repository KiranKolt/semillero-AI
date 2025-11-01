import { mockProjects } from '../types/project'

export default function FeaturedProjects() {
  const featured = mockProjects.slice(0, 3)
  return (
    <section id="proyectos" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-4xl font-bold text-white">Proyectos Destacados</h2>
          <a
            href="#/proyectos"
            className="text-sm px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/15"
          >
            Ver todos →
          </a>
        </div>
        <p className="text-gray-300 mb-10">Una selección rápida de lo que estamos construyendo.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <div key={p.id} className="bg-gray-800 rounded-xl p-6 border border-white/10 hover:bg-gray-800/80 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">{p.title}</h3>
                <span className="text-xs text-gray-400">#{p.id}</span>
              </div>
              <p className="text-gray-300 mb-4 line-clamp-3">{p.summary}</p>
              <div className="text-sm text-gray-400 mb-4">Por <span className="text-blue-400">{p.author}</span></div>
              <div className="flex gap-2">
                <a href="#/proyectos" className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">Detalles</a>
                <a href="#scene3d" className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-white">3D</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


