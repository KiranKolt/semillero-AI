import 'aframe';
import { useEffect, useRef, useState } from 'react';
// Escena sin tarjetas de texto: solo elementos 3D interactivos

/**
 * Escena 3D inmersiva - Versión funcional y simple
 */
type Experience = 'intro' | 'nebula' | 'tunnel' | 'plaza'

export default function Scene3D() {
  const [muted, setMuted] = useState(false);
  const audioSrc = `${import.meta.env.BASE_URL}audio/ambient.mp3`;
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const [experience, setExperience] = useState<Experience>('intro');

  // (Se removió la carga de proyectos para evitar textos en VR)

  // Habilita el audio tras la primera interacción del usuario
  useEffect(() => {
    const tryPlay = () => {
      try {
        const el = htmlAudioRef.current;
        if (el) {
          el.volume = muted ? 0 : 0.5;
          el.play().catch(() => {/* ignore */});
        }
      } catch {}
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('keydown', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
    };
    window.addEventListener('pointerdown', tryPlay, { once: true });
    window.addEventListener('keydown', tryPlay, { once: true });
    window.addEventListener('touchstart', tryPlay, { once: true });
    return () => {
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('keydown', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
    };
  }, []);

  // Atajo: tecla "m" para silenciar/activar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        setMuted((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Aplica el volumen cuando cambia muted
  useEffect(() => {
    const el = htmlAudioRef.current;
    const vol = muted ? 0 : 0.5;
    if (el) {
      el.muted = muted;
      el.volume = vol;
    }
  }, [muted]);

  // Teleport con fundido
  const teleportTo = (position: string, next: Experience) => {
    const fade = document.getElementById('fade');
    const rig = document.getElementById('rig');
    if (!rig) return;
    try {
      fade?.setAttribute('material', 'opacity', 1);
      setTimeout(() => {
        rig.setAttribute('position', position);
        setExperience(next);
        setTimeout(() => fade?.setAttribute('material', 'opacity', 0), 250);
      }, 250);
    } catch {}
  };
  // Sin tarjetas ni textos en VR

  return (
    <a-scene 
      embedded 
      style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}
      vr-mode-ui="enabled: true"
    >
      {/* Audio HTML como fondo (más fiable para autoplay tras interacción) */}
      <audio ref={htmlAudioRef} id="ambient-audio" src={audioSrc} loop style={{ display: 'none' }}></audio>
      {/* Fondo espacial con estrellas */}
      <a-sky color="#0a0a1a"></a-sky>
      
      
      {/* Generar estrellas de fondo con parpadeo sutil */}
      {Array.from({ length: 120 }, (_, i) => {
        const x = (Math.random() - 0.5) * 40
        const y = (Math.random() - 0.5) * 30
        const r = 0.03 + Math.random() * 0.12
        const dur = 1200 + Math.random() * 2000
        const delay = Math.random() * 2000
        return (
          <a-sphere
            key={i}
            position={`${x} ${y} -20`}
            radius={r}
            color="#ffffff"
            opacity="0.8"
            animation={`property: material.opacity; to: 0.2; dir: alternate; loop: true; dur: ${Math.floor(
              dur
            )}; delay: ${Math.floor(delay)}`}
          ></a-sphere>
        )
      })}

      {/* Cámara con rig para permitir teleport suave */}
      <a-entity id="rig" position="0 0 0">
        <a-entity 
          camera 
          look-controls
          wasd-controls="enabled: true"
          position="0 1.8 0"
        >
          {/* Cursor por mouse sin retícula visual para evitar el círculo azul */}
          <a-entity cursor="rayOrigin: mouse"></a-entity>
          {/* Overlay de fundido */}
          <a-plane id="fade" position="0 0 -0.3" width="2" height="2" material="color: black; transparent: true; opacity: 0"></a-plane>
        </a-entity>
      </a-entity>
      {/* Portales de experiencias en la intro */}
      {experience === 'intro' && (
      <a-entity position="0 1.6 -3">
        <a-entity 
          geometry="primitive: icosahedron; radius: 0.35" 
          material="color: #60a5fa; metalness: 0.6; roughness: 0.2; emissive: #3b82f6; emissiveIntensity: 0.25" 
          animation="property: rotation; to: 360 360 0; loop: true; dur: 14000"
        ></a-entity>
        <a-entity 
          animation="property: rotation; to: 0 360 0; loop: true; dur: 9000"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <a-sphere 
              key={i}
              position={`${Math.cos((i/8)*Math.PI*2)*0.8} ${Math.sin((i/8)*Math.PI*2)*0.8} 0`} 
              radius="0.06" 
              color="#a78bfa" 
              material="emissive: #a78bfa; emissiveIntensity: 0.6"
            ></a-sphere>
          ))}
        </a-entity>
        <a-light type="point" color="#60a5fa" intensity="0.4" distance="5"></a-light>
        <a-light type="point" position="0 0.5 0.6" color="#a78bfa" intensity="0.3" distance="4"></a-light>
      </a-entity>
      )}

      {/* Portales clicables */}
      {experience === 'intro' && (
        <a-entity position="0 1.3 -2.2">
          <a-entity position="-0.9 0 0" class="clickable" onClick={() => teleportTo('-6 0 -12', 'nebula')}>
            <a-torus radius="0.35" radius-tubular="0.06" color="#60a5fa" opacity="0.6" animation="property: rotation; to: 0 360 0; loop: true; dur: 4000"></a-torus>
            <a-sphere radius="0.1" color="#60a5fa" material="emissive: #60a5fa"></a-sphere>
          </a-entity>
          <a-entity position="0 0 0" class="clickable" onClick={() => teleportTo('0 0 -14', 'tunnel')}>
            <a-torus radius="0.35" radius-tubular="0.06" color="#a78bfa" opacity="0.6" animation="property: rotation; to: 360 0 0; loop: true; dur: 4000"></a-torus>
            <a-sphere radius="0.1" color="#a78bfa" material="emissive: #a78bfa"></a-sphere>
          </a-entity>
          <a-entity position="0.9 0 0" class="clickable" onClick={() => teleportTo('6 0 -12', 'plaza')}>
            <a-torus radius="0.35" radius-tubular="0.06" color="#34d399" opacity="0.6" animation="property: rotation; to: 0 0 360; loop: true; dur: 4000"></a-torus>
            <a-sphere radius="0.1" color="#34d399" material="emissive: #34d399"></a-sphere>
          </a-entity>
        </a-entity>
      )}
      
      {/* Controles de VR para Oculus Quest */}
      <a-entity 
        hand-controls="hand: left" 
        tracked-controls="controller: 0"
      ></a-entity>
      <a-entity 
        hand-controls="hand: right" 
        tracked-controls="controller: 1"
      ></a-entity>

      {/* Elementos decorativos inmersivos con animaciones suaves */}
      <a-entity>
        {/* Esfera azul grande rotando lentamente */}
        <a-sphere 
          position="-12 8 -30" 
          radius="2" 
          color="#3498DB" 
          opacity="0.2"
          animation="property: rotation; to: 0 360 0; dur: 30000; loop: true"
          animation__float="property: position; to: -12 10 -30; dur: 5000; loop: true; dir: alternate"
        ></a-sphere>

        {/* Torus verde */}
        <a-torus 
          position="12 6 -28" 
          radius="1.5" 
          radius-tubular="0.3" 
          color="#2ECC71" 
          opacity="0.2"
          animation="property: rotation; to: 90 90 90; dur: 20000; loop: true"
        ></a-torus>

        {/* Cubo rojo */}
        <a-box 
          position="0 12 -35" 
          width="1.5" 
          height="1.5" 
          depth="1.5" 
          color="#E74C3C" 
          opacity="0.15"
          animation="property: rotation; to: 360 360 360; dur: 25000; loop: true"
        ></a-box>

        {/* Torus más pequeño abajo */}
        <a-torus 
          position="-8 4 -32" 
          radius="1" 
          radius-tubular="0.2" 
          color="#9B59B6" 
          opacity="0.15"
          animation="property: rotation; to: -90 -90 -90; dur: 18000; loop: true"
        ></a-torus>

        {/* Esfera pequeña */}
        <a-sphere 
          position="10 7 -35" 
          radius="0.8" 
          color="#F39C12" 
          opacity="0.15"
          animation="property: rotation; to: 45 -45 45; dur: 22000; loop: true"
        ></a-sphere>
      </a-entity>
      
      {/* "Shooting star" que cruza el cielo */}
      <a-entity>
        <a-sphere 
          radius="0.06" 
          color="#ffffff" 
          position="-15 9 -22"
          material="emissive: #ffffff; emissiveIntensity: 0.8"
          animation__move="property: position; to: 15 5 -22; dur: 6000; loop: true; easing: linear"
          animation__fade="property: material.opacity; from: 0.3; to: 1; dur: 300; dir: alternate; loop: true"
        ></a-sphere>
      </a-entity>
      
      {/* Suelos/escenas por experiencia */}
      {experience === 'nebula' && (
        <a-entity>
          {Array.from({ length: 40 }, (_, i) => (
            <a-sphere key={i} position={`${(Math.random()-0.5)*6} ${1+Math.random()*3} ${-12 + (Math.random()-0.5)*4}`} radius={`${0.1 + Math.random()*0.4}`} color="#7dd3fc" material="emissive: #7dd3fc; emissiveIntensity: 0.5; metalness: 0.1; roughness: 0.6" opacity="0.8"></a-sphere>
          ))}
          <a-light type="point" position="0 2 -12" color="#93c5fd" intensity="0.8"></a-light>
        </a-entity>
      )}

      {experience === 'tunnel' && (
        <a-entity>
          {Array.from({ length: 12 }, (_, i) => (
            <a-torus key={i} position={`0 1.6 ${-10 - i*1.2}`} radius="1.5" radius-tubular="0.08" color="#a78bfa" opacity={`${0.25 + (i/20)}`} animation="property: rotation; to: 0 360 0; loop: true; dur: ${3000 + i*200}"></a-torus>
          ))}
        </a-entity>
      )}

      {experience === 'plaza' && (
        <a-entity>
          <a-plane position="6 -1 -12" width="8" height="8" color="#0b1220" rotation="-90 0 0" opacity="0.6"></a-plane>
          {Array.from({ length: 9 }, (_, i) => (
            <a-sphere key={i} position={`${6 + (i%3 -1)*1.6} ${0.5 + Math.random()*1.2} ${-12 + (Math.floor(i/3)-1)*1.6}`} radius="0.35" color="#34d399" animation__b="property: position; dir: alternate; loop: true; dur: ${1200 + i*150}; to: ${6 + (i%3 -1)*1.6} ${1.6 + Math.random()*0.5} ${-12 + (Math.floor(i/3)-1)*1.6}"></a-sphere>
          ))}
        </a-entity>
      )}

      {/* (Se removieron las tarjetas de proyectos para una escena limpia) */}

      {/* Iluminación ambiente dramática */}
      <a-light type="ambient" color="#4466ff" intensity="0.2"></a-light>
      <a-light type="point" position="0 10 -30" color="#ffffff" intensity="0.5"></a-light>
      <a-light type="point" position="-15 8 -25" color="#3498DB" intensity="0.3"></a-light>
      <a-light type="point" position="15 8 -25" color="#2ECC71" intensity="0.3"></a-light>
    </a-scene>
  );
}

