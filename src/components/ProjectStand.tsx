import React from 'react';
import { Project } from '../types/project';

interface ProjectStandProps {
  project: Project;
}

/**
 * Componente que renderiza un "stand" de proyecto en la escena VR
 * Muestra información del proyecto y permite interacción
 */
export default function ProjectStand({ project }: ProjectStandProps) {
  return (
    <a-entity position={`${project.position.x} ${project.position.y} ${project.position.z}`}>
      {/* Card estilo web moderna - Más grande y organizada */}
      <a-entity class="web-card">
        {/* Fondo principal de la card - Más grande */}
        <a-plane
          position="0 0.8 0"
          width="5"
          height="5"
          color="#1A1A1A"
          rotation="0 0 0"
          opacity="0.9"
          class="interactive clickable"
        ></a-plane>

        {/* Borde superior decorativo azul */}
        <a-plane
          position="0 3.15 0.01"
          width="5"
          height="0.2"
          color="#3498DB"
          rotation="0 0 0"
        ></a-plane>

        {/* Título del proyecto - Más grande y arriba */}
        <a-text
          value={project.title}
          position="0 2.8 0.01"
          align="center"
          width="20"
          color="#3498DB"
          font="kelsonsans"
        ></a-text>

        {/* Autor - Más pequeño y debajo del título */}
        <a-text
          value={`Por: ${project.author}`}
          position="0 2.3 0.01"
          align="center"
          width="20"
          color="#95A5A6"
          font="kelsonsans"
        ></a-text>

        {/* Separador visual */}
        <a-plane
          position="0 2.05 0.01"
          width="4.5"
          height="0.05"
          color="#34495E"
        ></a-plane>

        {/* Resumen - Mejor posicionado y más pequeño */}
        <a-text
          value={project.summary.substring(0, 100) + '...'}
          position="0 1.5 0.01"
          align="center"
          width="20"
          color="#ECF0F1"
          font="kelsonsans"
          wrap-count="25"
        ></a-text>

        {/* Tags - Estilo badges, mejor distribuidos */}
        {project.tags && project.tags.length > 0 && (
          <a-entity position="0 0.6 0.01">
            {project.tags.slice(0, 4).map((tag, index) => (
              <a-box
                key={tag}
                position={`${-1.5 + (index % 2) * 3} ${0.1 - Math.floor(index / 2) * 0.2} 0.01`}
                width="0.8"
                height="0.15"
                depth="0.02"
                color="#2ECC71"
                class="interactive"
              >
                <a-text
                  value={tag}
                  position="0 0 0.02"
                  align="center"
                  color="#FFFFFF"
                  font="kelsonsans"
                ></a-text>
              </a-box>
            ))}
          </a-entity>
        )}

        {/* Botón estilo web moderno - Más abajo */}
        <a-box
          position="0 -0.5 0.01"
          width="2"
          height="0.5"
          depth="0.08"
          color="#3498DB"
          class="interactive clickable"
          animation__hover="property: color; to: #2980B9; dur: 200; startEvents: mouseenter; stopEvents: mouseleave"
          animation__click="property: scale; from: 1 1 1; to: 0.95 0.95 0.95; dur: 100; startEvents: click"
        >
          <a-text
            value="Ver Detalles"
            position="0 0 0.05"
            align="center"
            width="15"
            color="#FFFFFF"
            font="kelsonsans"
          ></a-text>
        </a-box>
      </a-entity>

      {/* Modelo 3D del proyecto (si existe) */}
      {project.modelUrl && (
        <a-entity
          gltf-model={project.modelUrl}
          position="0 1 0"
          scale="1 1 1"
          animation__hover="property: rotation; to: 0 360 0; dur: 5000; startEvents: mouseenter"
        ></a-entity>
      )}

      {/* Alternativa: Video si no hay modelo 3D */}
      {!project.modelUrl && project.videoUrl && (
        <a-video
          src={project.videoUrl}
          width="1.5"
          height="1"
          position="0 1 0"
        ></a-video>
      )}

      {/* Alternativa: Imagen de placeholder */}
      {!project.modelUrl && !project.videoUrl && project.imageUrl && (
        <a-image
          src={project.imageUrl}
          width="1.5"
          height="1"
          position="0 1 0"
        ></a-image>
      )}

      {/* Primitiva de placeholder si no hay asset */}
      {!project.modelUrl && !project.videoUrl && !project.imageUrl && (
        <a-box
          position="0 1 0"
          width="1"
          height="1"
          depth="1"
          color="#9B59B6"
          animation__hover="property: rotation; to: 0 360 0; dur: 2000; startEvents: mouseenter"
        ></a-box>
      )}

      {/* Animaciones de entrada suave */}
      <a-animation
        attribute="position"
        from={`${project.position.x} ${project.position.y + 1.5} ${project.position.z}`}
        to={`${project.position.x} ${project.position.y} ${project.position.z}`}
        dur="1200"
      ></a-animation>

      {/* Sonido al hacer clic (opcional) */}
      <a-sound
        src=""
        autoplay="false"
        volume="5"
        on="click"
      ></a-sound>
    </a-entity>
  );
}

