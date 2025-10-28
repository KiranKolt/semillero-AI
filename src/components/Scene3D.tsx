import 'aframe';
import { useEffect, useState } from 'react';
import ProjectStand from './ProjectStand';
import { fetchProjects } from '../services/api';
import { Project } from '../types/project';

/**
 * Escena 3D inmersiva - Versión funcional y simple
 */
export default function Scene3D() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <a-scene 
      embedded 
      style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}
      vr-mode-ui="enabled: true"
    >
      {/* Fondo espacial con estrellas */}
      <a-sky color="#0a0a1a"></a-sky>
      
      {/* Generar estrellas de fondo */}
      {Array.from({ length: 50 }, (_, i) => (
        <a-sphere
          key={i}
          position={`${(Math.random() - 0.5) * 40} ${(Math.random() - 0.5) * 30} -20`}
          radius={0.05 + Math.random() * 0.1}
          color="#ffffff"
          opacity="0.8"
        ></a-sphere>
      ))}

      {/* Cámara con controles VR */}
      <a-entity 
        camera 
        look-controls
        wasd-controls="enabled: true"
        position="0 1.8 0"
      >
        <a-entity
          cursor="fuse: true; fuseTimeout: 1000"
          position="0 0 -1"
          geometry="primitive: ring"
          material="color: #4CC3D9"
        ></a-entity>
      </a-entity>
      
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
      
      {/* Suelo distante casi invisible */}
      <a-plane 
        position="0 -5 -50" 
        width="100" 
        height="100" 
        color="#000011" 
        rotation="-90 0 0"
        opacity="0.3"
      ></a-plane>

      {/* Proyectos en el espacio 3D - Más lejos para no molestar */}
      {!loading && projects.map((project) => (
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

