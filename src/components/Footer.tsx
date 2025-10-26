import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Semillero VR</h3>
            <p className="text-gray-400">
              Explorando el futuro de la educación y la ciencia a través de la realidad virtual.
            </p>
          </div>
          
          {/* Columna 2 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-400 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#scene3d" className="text-gray-400 hover:text-white transition-colors">Experiencia 3D</a></li>
              <li><a href="#proyectos" className="text-gray-400 hover:text-white transition-colors">Proyectos</a></li>
            </ul>
          </div>
          
          {/* Columna 3 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <p className="text-gray-400">info@semillero.edu</p>
            <p className="text-gray-400">+1 (234) 567-8900</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Semillero VR. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

