import { useEffect, useState } from 'react'

export default function Header() {
  const [active, setActive] = useState<string>('inicio')

  useEffect(() => {
    const sections = ['inicio','scene3d','proyectos','sobre-nosotros']
    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target?.id) setActive(visible.target.id)
    }, { root: null, threshold: [0.2, 0.5, 0.8] })
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header className="bg-black/70 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-400">Semillero VR</h1>
          </div>
          
          {/* Navegación */}
          <div className="hidden md:flex space-x-8">
            <a href="#/inicio" className={`transition-colors ${active==='inicio' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
              Inicio
            </a>
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '/';
                setTimeout(() => document.getElementById('scene3d')?.scrollIntoView({ behavior: 'smooth' }), 60);
              }}
              className={`transition-colors ${active==='scene3d' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Experiencia 3D
            </a>
            <a href="#/proyectos" className={`transition-colors ${active==='proyectos' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
              Proyectos
            </a>
            <a
              href="#/inicio"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '/inicio';
                setTimeout(() => document.getElementById('sobre-nosotros')?.scrollIntoView({ behavior: 'smooth' }), 80);
              }}
              className={`transition-colors ${active==='sobre-nosotros' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Sobre Nosotros
            </a>
          </div>
          
          {/* Botón CTA */}
          <div>
            <a href="mailto:semillero@example.com?subject=Contacto%20Semillero%20VR" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

