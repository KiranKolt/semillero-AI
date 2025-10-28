export default function Hero() {
  return (
    <section id="inicio" className="py-32 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
          Bienvenido al Semillero
        </h2>
        <p className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto drop-shadow-lg">
          Explora proyectos innovadores en un ambiente 3D inmersivo
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#scene3d" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Explorar en 3D
          </a>
          <a 
            href="#proyectos" 
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Ver Proyectos
          </a>
        </div>
      </div>
    </section>
  )
}

