export default function Header() {
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
            <a href="#inicio" className="text-gray-300 hover:text-white transition-colors">
              Inicio
            </a>
            <a href="#scene3d" className="text-gray-300 hover:text-white transition-colors">
              Experiencia 3D
            </a>
            <a href="#proyectos" className="text-gray-300 hover:text-white transition-colors">
              Proyectos
            </a>
            <a href="#sobre-nosotros" className="text-gray-300 hover:text-white transition-colors">
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

