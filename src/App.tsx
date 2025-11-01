import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Scene3D from './components/Scene3D'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'
import VRButton from './components/VRButton'

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Fondo 3D que ocupa toda la página */}
      <div id="scene3d" className="fixed inset-0 z-0" style={{ height: '100vh', width: '100vw' }}>
        <Scene3D />
      </div>

      {/* Contenido sobre el fondo 3D */}
      <div className="relative z-10 min-h-screen">
        {/* Navegación Superior */}
        <Header />
        
        {/* Sección Hero con Información */}
        <Hero />
        
        {/* Sección de Proyectos */}
        <Projects />
        {/* Sobre Nosotros */}
        <About />
        
        {/* Footer */}
        <Footer />
      </div>
      
      {/* Botón flotante para entrar en VR */}
      <VRButton />
    </div>
  )
}

export default App

