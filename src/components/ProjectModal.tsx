import { Project } from '../types/project'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <div className="relative z-10 w-[90%] max-w-2xl bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <button onClick={onClose} className="text-gray-300 hover:text-white">✕</button>
        </div>

        <p className="text-gray-300 mb-4">{project.summary}</p>
        <div className="text-sm text-gray-400 mb-4">Autor: <span className="text-blue-400">{project.author}</span></div>

        {project.modelUrl && (
          <div className="text-sm text-gray-400 mb-4">Modelo 3D: <span className="text-gray-300">{project.modelUrl}</span></div>
        )}
        {project.videoUrl && (
          <video src={project.videoUrl} controls className="w-full rounded-lg border border-white/10 mb-4" />
        )}
        {!project.videoUrl && project.imageUrl && (
          <img src={project.imageUrl} className="w-full rounded-lg border border-white/10 mb-4" />
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map(tag => (
              <span key={tag} className="bg-blue-500/15 text-blue-300 px-3 py-1 rounded-full text-xs">#{tag}</span>
            ))}
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <a href="#scene3d" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Ver en 3D</a>
          <button onClick={onClose} className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg border border-white/10">Cerrar</button>
        </div>
      </div>
    </div>
  )
}


