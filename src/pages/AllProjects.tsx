import { useMemo, useState } from 'react'
import { mockProjects, Project } from '../types/project'
import ProjectModal from '../components/ProjectModal'

export default function AllProjects() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)

  const availableTags = useMemo(() => {
    const s = new Set<string>()
    mockProjects.forEach(p => p.tags?.forEach(t => s.add(t)))
    return Array.from(s).sort()
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return mockProjects.filter(p => {
      const okQ = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)
      const okT = !tag || p.tags?.includes(tag)
      return okQ && okT
    })
  }, [query, tag])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <a href="#/" className="text-blue-400 hover:text-white">← Volver al inicio</a>
        <h1 className="text-2xl font-bold">Todos los Proyectos</h1>
        <div />
      </div>

      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-6 grid md:grid-cols-3 gap-4 items-center">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por título, resumen o autor..."
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-blue-500"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setTag(null)} className={`px-3 py-1 rounded-full text-sm ${!tag ? 'bg-blue-600' : 'bg-white/10 border border-white/10'}`}>Todas</button>
            {availableTags.map(t => (
              <button key={t} onClick={() => setTag(t)} className={`px-3 py-1 rounded-full text-sm ${tag===t ? 'bg-blue-600' : 'bg-white/10 border border-white/10'}`}>#{t}</button>
            ))}
          </div>
          <div className="text-right text-gray-400 text-sm">{filtered.length} resultados</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(project => (
            <div key={project.id} className="bg-gray-800 rounded-xl border border-white/10 p-5 hover:shadow-xl hover:shadow-blue-500/10 transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <span className="text-xs text-gray-400">#{project.id}</span>
              </div>
              <p className="text-gray-300 mb-3 line-clamp-3">{project.summary}</p>
              {project.imageUrl && (
                <img src={project.imageUrl} className="w-full h-40 object-cover rounded-lg border border-white/10 mb-3" />
              )}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">Por <span className="text-blue-400">{project.author}</span></div>
                <div className="flex gap-2">
                  <button onClick={() => setSelected(project)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg">Detalles</button>
                  <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '/'; setTimeout(() => document.getElementById('scene3d')?.scrollIntoView({ behavior: 'smooth' }), 60); }} className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg">3D</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  )
}


