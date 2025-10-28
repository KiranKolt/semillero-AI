import 'aframe';
import 'aframe-extras';
import { useEffect, useState } from 'react';
import ProjectStand from './ProjectStand';
// import WebNavbar from './WebNavbar';
import { fetchProjects } from '../services/api';
import { Project } from '../types/project';
import WebNavbar from './WebNavbar';



export default function VRScene() {
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
    <a-scene>
      {/* Assets section - Aquí cargas tus modelos 3D (.glb o .gltf) */}
      <a-assets>
        {/* 
          Para cargar modelos 3D externos, descomenta esto y coloca tu archivo .glb en public/assets/modelos/
          Ejemplo:
          <a-asset-item id="mi-modelo" src="/assets/modelos/mi-modelo.glb"></a-asset-item>
        */}
      </a-assets>

      {/* Fondo con gradiente visible en VR */}
      <a-sky 
        color="#1a1a2e"
        material="shader: gradient; topColor: #1a1a2e; bottomColor: #0f3460"
      ></a-sky>
      
      {/* Estrellas de fondo para ambiente espacial */}
      <a-entity position="0 0 0">
        {/* Estrellas aleatorias */}
        <a-sphere position="10 15 -20" radius="0.1" color="#FFFFFF" opacity="0.8"></a-sphere>
        <a-sphere position="-15 20 -25" radius="0.08" color="#FFFFFF" opacity="0.7"></a-sphere>
        <a-sphere position="20 18 -30" radius="0.12" color="#FFFFFF" opacity="0.9"></a-sphere>
        <a-sphere position="-8 22 -15" radius="0.1" color="#FFFFFF" opacity="0.6"></a-sphere>
        <a-sphere position="5 25 -40" radius="0.09" color="#FFFF99" opacity="0.8"></a-sphere>
        <a-sphere position="-20 16 -35" radius="0.11" color="#FFFFFF" opacity="0.7"></a-sphere>
        <a-sphere position="15 12 -18" radius="0.1" color="#FFFF99" opacity="0.8"></a-sphere>
        <a-sphere position="-12 19 -28" radius="0.08" color="#FFFFFF" opacity="0.9"></a-sphere>
      </a-entity>

      {/* Web Navbar flotante */}
      <WebNavbar />
      
      {/* Cámara con controles de movimiento continuo */}
      <a-entity 
        id="rig" 
        movement-controls="fly: false; speed: 0.15"
        position="0 0 0"
      >
        <a-entity 
          id="camera"
          camera 
          look-controls="pointerLockEnabled: true"
          wasd-controls="acceleration: 20"
          position="0 1.6 0"
        >
          <a-entity
            cursor="fuse: true; fuseTimeout: 500"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.02"
            material="shader: flat; opacity: 0.8; color: #4CC3D9"
            animation__click="property: scale; startEvents: click; from: 0.8 0.8 0.8; to: 1.2 1.2 1.2; dur: 150"
            animation__clickreset="property: scale; startEvents: animationcomplete__click; to: 1 1 1; dur: 100"
          >
          </a-entity>
        </a-entity>
      </a-entity>

      {/* Sección Hero - Elementos decorativos estilo página web */}
      <a-entity position="0 1.8 -6">
        {/* Iconos 3D flotantes como elementos decorativos */}
        <a-sphere
          position="-2 0 0"
          radius="0.3"
          color="#3498DB"
          opacity="0.6"
          animation="property: rotation; to: 0 360 0; dur: 5000; loop: true"
        ></a-sphere>

        <a-box
          position="2 0 0"
          width="0.5"
          height="0.5"
          depth="0.5"
          color="#2ECC71"
          opacity="0.6"
          animation="property: rotation; to: 45 45 45; dur: 4000; loop: true"
        ></a-box>

        {/* Texto de bienvenida */}
        <a-text
          value="Bienvenido al Semillero"
          position="0 0.8 0"
          align="center"
          width="15"
          color="#3498DB"
          font="kelsonsans"
        ></a-text>

        <a-text
          value="Explora nuestros proyectos inmersivos"
          position="0 0.4 0"
          align="center"
          width="15"
          color="#FFFFFF"
          font="kelsonsans"
        ></a-text>
      </a-entity>

      {/* Ejemplo de cómo cargar un modelo .glb externo (descomentar cuando tengas el archivo) */}
      {/* 
        <a-entity 
          gltf-model="#mi-modelo"
          position="0 1 -5"
          scale="1 1 1"
        ></a-entity>
      */}

      {/* Plano de suelo grande con mejor visibilidad */}
      <a-plane 
        rotation="-90 0 0" 
        width="100" 
        height="100" 
        color="#2c3e50"
        metalness="0.3"
        roughness="0.7"
        static-body
      ></a-plane>
      
      {/* Grid visual mejorado para mejor percepción en VR */}
      <a-plane
        position="0 0.02 0"
        rotation="-90 0 0"
        width="100"
        height="100"
        material="src: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM0E1RkNEIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZ3JpZCkiIC8+Cjwvc3ZnPg==); repeat: 100 100; opacity: 0.5; transparent: true"
      ></a-plane>

      {/* Obstáculos de prueba para demostrar movimiento */}
      <a-box
        position="3 0.5 -3"
        width="1"
        height="1"
        depth="1"
        color="#E74C3C"
        static-body
      ></a-box>
      
      <a-cylinder
        position="-3 0.75 -3"
        radius="0.5"
        height="1.5"
        color="#3498DB"
        static-body
      ></a-cylinder>
      
      <a-box
        position="0 0.5 -8"
        width="2"
        height="1"
        depth="1"
        color="#2ECC71"
        static-body
      ></a-box>

      {/* Proyectos dinámicos generados desde la BD */}
      {!loading && projects.map((project) => (
        <ProjectStand key={project.id} project={project} />
      ))}

      {/* Indicador de carga (opcional) */}
      {loading && (
        <a-text
          value="Cargando proyectos..."
          position="0 3 -5"
          align="center"
          color="#FFFFFF"
          font="kelsonsans"
        ></a-text>
      )}

      {/* Hand controls para VR (controladores) */}
      <a-entity 
        hand-controls="hand: left" 
        tracked-controls="controller: 0"
      ></a-entity>
      <a-entity 
        hand-controls="hand: right" 
        tracked-controls="controller: 1"
      ></a-entity>

      {/* Iluminación mejorada para VR */}
      <a-light type="ambient" color="#ddd" intensity="0.8"></a-light>
      <a-light type="directional" position="2 4 1" intensity="0.6" color="#ffffff"></a-light>
      <a-light type="point" position="0 5 0" intensity="0.4" color="#6495ED"></a-light>
      <a-light type="hemisphere" color="#87CEEB" groundColor="#2F4F4F" intensity="0.5"></a-light>
    </a-scene>
  );
}

