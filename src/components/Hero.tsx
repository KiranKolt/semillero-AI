import { useEffect, useMemo, useState } from 'react'

export default function Hero() {
  const phrases = useMemo(
    () => [
      'Explora proyectos inmersivos en 3D',
      'Interactúa con stands y escenarios VR',
      'Aprende creando experiencias virtuales',
      'Colabora y publica tus ideas en VR',
    ],
    []
  )

  const [typedText, setTypedText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex % phrases.length]
    const speed = isDeleting ? 40 : 85

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        const next = current.slice(0, typedText.length + 1)
        setTypedText(next)
        if (next === current) {
          setIsDeleting(true)
        }
      } else {
        // Borrando
        const next = current.slice(0, typedText.length - 1)
        setTypedText(next)
        if (next.length === 0) {
          setIsDeleting(false)
          setPhraseIndex((i) => (i + 1) % phrases.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [typedText, isDeleting, phraseIndex, phrases])

  return (
    <section id="inicio" className="py-28 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(59,130,246,0.35)]">
            Bienvenido al Semillero
          </h2>

          <p className="text-xl md:text-2xl text-white/90 min-h-[2.5rem] mb-10 max-w-3xl mx-auto">
            {typedText}
            <span className="animate-pulse">▌</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#proyectos"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.02]"
            >
              Ver proyectos
            </a>
            <a
              href="#scene3d"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/15 backdrop-blur-md transition-transform hover:scale-[1.02]"
            >
              Explorar en 3D
            </a>
            <button
              onClick={() => {
                const scene = document.querySelector('a-scene') as any
                if (scene && typeof scene.enterVR === 'function') {
                  scene.enterVR()
                } else {
                  document.getElementById('scene3d')?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-transform hover:scale-[1.02]"
            >
              Entrar en VR
            </button>
            <button
              onClick={() => {
                const order = ['inicio','proyectos','scene3d','sobre-nosotros']
                let idx = 0
                const step = () => {
                  const id = order[idx]
                  const el = document.getElementById(id)
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  idx++
                  if (idx < order.length) setTimeout(step, 1100)
                }
                step()
              }}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/15 backdrop-blur-md transition-transform hover:scale-[1.02]"
            >
              Iniciar tour
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

