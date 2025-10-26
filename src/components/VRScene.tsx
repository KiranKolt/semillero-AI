import 'aframe';
import React, { useEffect, useState } from 'react';
import ProjectStand from './ProjectStand';
import WebNavbar from './WebNavbar';
import { fetchProjects } from '../services/api';
import { Project } from '../types/project';

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

      {/* Fondo estilo página web moderna */}
      <a-sky color="#0A0E27"></a-sky>
      
      {/* Grid pattern de fondo para efecto web */}
      <a-plane
        position="0 -0.5 -10"
        width="40"
        height="40"
        color="#131826"
        rotation="-90 0 0"
      ></a-plane>

      {/* Web Navbar flotante */}
      <WebNavbar />
      
      {/* Cámara con cursor gaze y look-controls */}
      <a-entity 
        camera 
        look-controls 
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

      {/* Plano de suelo */}
      <a-plane 
        rotation="-90 0 0" 
        width="10" 
        height="10" 
        color="#393E46"
      ></a-plane>

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

      {/* Luz ambiental */}
      <a-light type="ambient" color="#bbb"></a-light>
      <a-light type="directional" position="1 1 1" color="#ffffff"></a-light>
    </a-scene>
  );
}

