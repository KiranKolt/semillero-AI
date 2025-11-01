import './App.css'
import Header from './components/Header'
import Scene3D from './components/Scene3D'
import SceneOverlay from './components/SceneOverlay'
import VRButton from './components/VRButton'

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Fondo 3D que ocupa toda la página */}
      <div id="scene3d" className="fixed inset-0 z-0" style={{ height: '100vh', width: '100vw' }}>
        <Scene3D />
      </div>

      {/* Contenido sobre el fondo 3D: solo navegación */}
      <div className="relative z-10 min-h-screen">
        <Header />
      </div>
      
      {/* Overlay de ayuda + botón VR */}
      <SceneOverlay />
      <VRButton />
    </div>
  )
}

export default App

