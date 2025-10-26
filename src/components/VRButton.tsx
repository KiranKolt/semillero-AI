import React, { useEffect } from 'react'

export default function VRButton() {
  useEffect(() => {
    // Verificar si hay soporte de WebXR
    const checkWebXR = async () => {
      if ('xr' in navigator) {
        const supported = await (navigator as any).xr.isSessionSupported('immersive-vr');
        console.log('WebXR soportado:', supported);
      }
    };
    checkWebXR();
  }, []);

  const handleEnterVR = () => {
    // Buscar el elemento de la escena A-Frame
    const scene = document.querySelector('a-scene') as any;
    if (scene) {
      // Entrar en modo VR
      scene.enterVR();
    }
  }

  return (
    <button
      onClick={handleEnterVR}
      className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-xl z-50 flex items-center gap-2 transition-transform hover:scale-110"
    >
      <span className="text-2xl">🥽</span>
      <span>Entrar en VR</span>
    </button>
  )
}

