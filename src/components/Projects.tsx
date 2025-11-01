import { useState } from 'react'
import { mockProjects, Project } from '../types/project'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  return (
    <section id="proyectos" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Nuestros Proyectos
        </h2>
        <p className="text-gray-300 text-center mb-12">
          Descubre los proyectos destacados desarrollados por nuestros estudiantes.
        </p>
        
        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <span className="text-sm text-gray-400">{project.id}</span>
              </div>
              
              <p className="text-gray-300 mb-4">{project.summary}</p>
              
              <div className="flex items-center mb-4">
                <span className="text-sm text-gray-400">Por: </span>
                <span className="text-sm text-blue-400 ml-1">{project.author}</span>
              </div>
              
              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <button onClick={() => setSelected(project)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  )
}

