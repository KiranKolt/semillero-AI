export default function SceneOverlay() {
  return (
    <div className="fixed left-4 bottom-4 z-40 flex flex-col gap-2">
      <div className="bg-black/60 border border-white/10 text-white rounded-xl px-4 py-3 max-w-sm">
        <div className="font-semibold mb-1">Controles</div>
        <ul className="text-sm text-gray-200 space-y-1 list-disc ml-4">
          <li>Arrastra para mirar</li>
          <li>WASD/Flechas para moverte</li>
          <li>Apunta y haz clic en portales</li>
        </ul>
      </div>
      <div className="flex gap-2">
        <a href="#/inicio" className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20">Ir a Inicio</a>
        <a href="#/proyectos" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Ver proyectos</a>
      </div>
    </div>
  )
}


