import React from 'react';

/**
 * Navbar/Header 3D para la experiencia web inmersiva
 * Flota en el aire como un menú de navegación web
 */
export default function WebNavbar() {
  return (
    <a-entity position="0 3.5 -8">
      {/* Barra de navegación flotante */}
      <a-plane
        position="0 0 0"
        width="10"
        height="1"
        color="#1A1A1A"
        opacity="0.95"
        class="interactive"
      ></a-plane>

      {/* Logo/Texto del sitio */}
      <a-text
        value="Semillero VR"
        position="-4 0 0.01"
        align="left"
        width="10"
        color="#3498DB"
        font="kelsonsans"
      ></a-text>

      {/* Elementos de navegación */}
      <a-entity position="-2.5 0 0.01">
        <a-text
          value="Proyectos"
          position="0 0 0"
          align="center"
          color="#FFFFFF"
          font="kelsonsans"
          class="interactive clickable"
          animation__hover="property: color; to: #3498DB; dur: 200"
        ></a-text>
      </a-entity>

      <a-entity position="-1 0 0.01">
        <a-text
          value="Galería"
          position="0 0 0"
          align="center"
          color="#FFFFFF"
          font="kelsonsans"
          class="interactive clickable"
          animation__hover="property: color; to: #3498DB; dur: 200"
        ></a-text>
      </a-entity>

      <a-entity position="0.5 0 0.01">
        <a-text
          value="Sobre Nosotros"
          position="0 0 0"
          align="center"
          color="#FFFFFF"
          font="kelsonsans"
          class="interactive clickable"
          animation__hover="property: color; to: #3498DB; dur: 200"
        ></a-text>
      </a-entity>

      <a-entity position="3.5 0 0.01">
        <a-box
          width="0.8"
          height="0.25"
          depth="0.05"
          color="#27AE60"
          class="interactive clickable"
          animation__hover="property: scale; to: 1.1 1.1 1; dur: 200"
        >
          <a-text
            value="Contacto"
            position="0 0 0.01"
            align="center"
            color="#FFFFFF"
            font="kelsonsans"
          ></a-text>
        </a-box>
      </a-entity>
    </a-entity>
  );
}

