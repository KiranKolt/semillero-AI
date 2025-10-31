import 'aframe';
import { useEffect, useRef, useState } from 'react';
import ProjectStand from './ProjectStand';
import { fetchProjects } from '../services/api';
import { Project } from '../types/project';

/**
 * Escena 3D inmersiva - Versión funcional y simple
 */
export default function Scene3D() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);
  const audioSrc = `${import.meta.env.BASE_URL}audio/ambient.mp3`;
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const [showProjects, setShowProjects] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Al entrar a VR ocultamos proyectos; al salir los mostramos de nuevo
  useEffect(() => {
    const scene = document.querySelector('a-scene');
    const onEnter = () => setShowProjects(false);
    const onExit = () => setShowProjects(true);
    scene?.addEventListener('enter-vr', onEnter);
    scene?.addEventListener('exit-vr', onExit);
    return () => {
      scene?.removeEventListener('enter-vr', onEnter);
      scene?.removeEventListener('exit-vr', onExit);
    };
  }, []);

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

      {/* Cámara con controles VR */}
      <a-entity 
        camera 
        look-controls
        wasd-controls="enabled: true"
        position="0 1.8 0"
      >
        {/* Cursor por mouse sin retícula visual para evitar el círculo azul */}
        <a-entity cursor="rayOrigin: mouse"></a-entity>
      </a-entity>
      
      {/* Orbe para iniciar experiencia (sin texto) cuando los proyectos están ocultos */}
      {!showProjects && (
        <a-entity position="0 1.6 -2.8">
          <a-sphere 
            radius="0.18" 
            color="#60a5fa" 
            material="emissive: #60a5fa; emissiveIntensity: 0.6"
            animation="property: scale; from: 1 1 1; to: 1.2 1.2 1.2; dir: alternate; loop: true; dur: 900"
            class="clickable"
            onClick={() => setShowProjects(true)}
          ></a-sphere>
          <a-entity
            position="0 0 -0.02"
            geometry="primitive: ring; radiusInner: 0.22; radiusOuter: 0.26"
            material="color: #93c5fd; opacity: 0.6"
            animation="property: rotation; to: 0 0 360; loop: true; dur: 2500"
          ></a-entity>
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
      
      {/* Suelo distante casi invisible */}
      <a-plane 
        position="0 -5 -50" 
        width="100" 
        height="100" 
        color="#000011" 
        rotation="-90 0 0"
        opacity="0.3"
      ></a-plane>

      {/* Proyectos en el espacio 3D - visibles cuando showProjects es true */}
      {showProjects && !loading && projects.map((project) => (
        <ProjectStand key={project.id} project={project} />
      ))}

      {/* Iluminación ambiente dramática */}
      <a-light type="ambient" color="#4466ff" intensity="0.2"></a-light>
      <a-light type="point" position="0 10 -30" color="#ffffff" intensity="0.5"></a-light>
      <a-light type="point" position="-15 8 -25" color="#3498DB" intensity="0.3"></a-light>
      <a-light type="point" position="15 8 -25" color="#2ECC71" intensity="0.3"></a-light>
    </a-scene>
  );
}

