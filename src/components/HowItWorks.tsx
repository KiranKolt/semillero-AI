export default function HowItWorks() {
  const steps = [
    {
      title: '1) Idea y guion',
      desc: 'Definimos el objetivo, la historia breve y el tipo de interacción. Bocetamos escenas y activos necesarios.',
      color: 'from-blue-500/15 to-cyan-500/10'
    },
    {
      title: '2) Modelado en Blender',
      desc: 'Creamos assets low‑poly optimizados (PBR), lightmaps cuando aplica y exportamos a glTF/GLB para la web.',
      color: 'from-amber-500/15 to-orange-500/10'
    },
    {
      title: '3) Integración Web (A‑Frame/three.js)',
      desc: 'Montamos la escena 3D interactiva: navegación, portales, UI, sonido y performance móvil.',
      color: 'from-emerald-500/15 to-teal-500/10'
    },
    {
      title: '4) Prototipos Unity (opcional)',
      desc: 'Para experiencias complejas publicamos builds WebGL/PC y las enlazamos como demos desde el sitio.',
      color: 'from-violet-500/15 to-fuchsia-500/10'
    },
    {
      title: '5) Colaboración',
      desc: 'Trabajamos en equipos: arte 3D, programación, UX y narrativa. Git y tableros con tareas claras.',
      color: 'from-sky-500/15 to-indigo-500/10'
    },
    {
      title: '6) Publicación y difusión',
      desc: 'Subimos la demo al sitio, escribimos una mini ficha del proyecto y la compartimos en eventos/redes.',
      color: 'from-pink-500/15 to-rose-500/10'
    }
  ]

  const examples = [
    { name: 'Museo Espacial', badge: 'Web', note: 'Tour con modelos GLB y portales temáticos.' },
    { name: 'Laboratorio Químico', badge: 'Web + Unity', note: 'Interacciones de seguridad y mezclas.' },
    { name: 'Arquitectura Sostenible', badge: 'Web', note: 'Visualización con lightmaps y UI de datos.' }
  ]

  return (
    <section className="py-16 px-4" aria-labelledby="como-funciona-title" id="como-funciona">
      <div className="max-w-7xl mx-auto">
        <h2 id="como-funciona-title" className="text-4xl font-extrabold text-white mb-2">¿Cómo funciona el Semillero VR?</h2>
        <p className="text-gray-300 mb-8">Del concepto a una demo pública en la web, paso a paso y en equipo.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(s => (
            <div key={s.title} className={`rounded-2xl p-6 border border-white/10 bg-gradient-to-br ${s.color} backdrop-blur-md`}>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-gray-300 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {examples.map(e => (
            <div key={e.name} className="bg-black/40 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-1">
                <div className="font-semibold text-white">{e.name}</div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-gray-200">{e.badge}</span>
              </div>
              <p className="text-gray-300 text-sm">{e.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#/proyectos" className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Ver ejemplos</a>
          <a href="mailto:semillero@example.com?subject=Propuesta%20de%20colaboraci%C3%B3n" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10">Proponer colaboración</a>
          <a href="#scene3d" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10">Probar demo 3D</a>
        </div>
      </div>
    </section>
  )
}


