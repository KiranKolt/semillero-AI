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
  const [nebulaCompressed, setNebulaCompressed] = useState(false);

  // Componente simple para que un elemento siempre mire a la cámara
  useEffect(() => {
    const AFRAME_ANY: any = (window as any).AFRAME;
    if (AFRAME_ANY && !AFRAME_ANY?.components?.['face-camera']) {
      AFRAME_ANY?.registerComponent?.('face-camera', {
        tick: function () {
          try {
            const THREE_ANY: any = (window as any).THREE;
            const cam = this.el.sceneEl.camera;
            if (!cam || !THREE_ANY) return;
            const target = new THREE_ANY.Vector3();
            cam.getWorldPosition(target);
            this.el.object3D.lookAt(target);
          } catch {}
        }
      });
    }
    if (AFRAME_ANY && !AFRAME_ANY?.components?.['pixelated-texture']) {
      AFRAME_ANY.registerComponent('pixelated-texture', {
        init: function () {
          const mat: any = this.el.getObject3D('mesh')?.material;
          const THREE_ANY: any = (window as any).THREE;
          if (mat && mat.map && THREE_ANY) {
            mat.map.minFilter = THREE_ANY.NearestFilter;
            mat.map.magFilter = THREE_ANY.NearestFilter;
            mat.map.needsUpdate = true;
          }
        }
      });
    }
  }, []);

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
      fade?.setAttribute('material', 'opacity: 1');
      setTimeout(() => {
        rig.setAttribute('position', position);
        setExperience(next);
        setTimeout(() => fade?.setAttribute('material', 'opacity: 0'), 250);
      }, 250);
    } catch {}
  };
  
  // Atajos de teclado para entrar a portales rápidamente
  useEffect(() => {
    const onNum = (e: KeyboardEvent) => {
      if (experience !== 'intro') return;
      if (e.key === '1') teleportTo('-6 0 -12', 'nebula');
      if (e.key === '2') teleportTo('0 0 -14', 'tunnel');
      if (e.key === '3') teleportTo('6 0 -12', 'plaza');
    };
    window.addEventListener('keydown', onNum);
    return () => window.removeEventListener('keydown', onNum);
  }, [experience]);

  // Ride automático en Tunnel
  useEffect(() => {
    if (experience !== 'tunnel') return;
    const rig: any = document.getElementById('rig');
    if (!rig) return;
    try {
      rig.setAttribute('animation__ride', 'property: position; to: 0 0 -18; dur: 6000; easing: linear; loop: false');
    } catch {}
  }, [experience]);

  // Listeners de click para portales (React no propaga onClick en custom elements)
  useEffect(() => {
    const nebula = document.getElementById('portal-nebula');
    const tunnel = document.getElementById('portal-tunnel');
    const plaza = document.getElementById('portal-plaza');
    const home = document.getElementById('portal-home');
    const goNebula = () => teleportTo('-6 0 -12', 'nebula');
    const goTunnel = () => teleportTo('0 0 -14', 'tunnel');
    const goPlaza = () => teleportTo('6 0 -12', 'plaza');
    const goHome = () => teleportTo('0 0 0', 'intro');
    nebula?.addEventListener('click', goNebula);
    tunnel?.addEventListener('click', goTunnel);
    plaza?.addEventListener('click', goPlaza);
    home?.addEventListener('click', goHome);
    // extras por experiencia
    const nebulaToggle = document.getElementById('nebula-toggle');
    const toggleNebula = () => setNebulaCompressed((v) => !v);
    nebulaToggle?.addEventListener('click', toggleNebula);
    // plaza balls
    const plazaBalls = Array.from(document.querySelectorAll('.plaza-ball')) as HTMLElement[];
    const onBall = (el: HTMLElement) => () => {
      try {
        el.setAttribute('animation__jump', 'property: position; dir: alternate; loop: 2; dur: 400; to: ' + el.getAttribute('position')?.replace(/ ([^ ]+) /, (m)=>m) + '');
        el.setAttribute('material', 'color: #ffffff');
      } catch {}
    };
    plazaBalls.forEach((el) => el.addEventListener('click', onBall(el)));
    return () => {
      nebula?.removeEventListener('click', goNebula);
      tunnel?.removeEventListener('click', goTunnel);
      plaza?.removeEventListener('click', goPlaza);
      home?.removeEventListener('click', goHome);
      nebulaToggle?.removeEventListener('click', toggleNebula);
      plazaBalls.forEach((el) => el.removeEventListener('click', onBall(el)));
    };
  }, [experience]);

  const getHomePortalPosition = (exp: Experience): string => {
    if (exp === 'nebula') return '-5.2 1.2 -11.2';
    if (exp === 'tunnel') return '1.2 1.2 -13';
    if (exp === 'plaza') return '7.2 1.2 -11.2';
    return '0 1.2 -2.5';
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
          {/* Cursor por mouse limitado a objetos .clickable */}
          <a-entity cursor="rayOrigin: mouse" raycaster="objects: .clickable"></a-entity>
          {/* Overlay de fundido */}
          <a-plane id="fade" position="0 0 -0.3" width="2" height="2" material="color: black; transparent: true; opacity: 0"></a-plane>
          {/* (El portal de volver al hub se renderiza en el espacio, no frente a la cámara) */}
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

      {/* Portales procedurales con arcos giratorios (estilo pixel/arcade) + glow + partículas */}
      {experience === 'intro' && (
        <a-entity position="0 1.3 -2.2">
          {/* Portal Nebula */}
          <a-entity position="-1.4 0 0">
            <a-entity id="portal-nebula" class="clickable" geometry="primitive: circle; radius: 0.62" material="color: #fff; opacity: 0; transparent: true"></a-entity>
            <a-entity face-camera>
              {/* núcleo */}
              <a-entity geometry="primitive: circle; radius: 0.28" material="color: #0ea5e9; opacity: 0.2; transparent: true; side: double; depthTest: false"></a-entity>
              {/* anillo base brillante */}
              <a-entity geometry="primitive: ring; radiusInner: 0.28; radiusOuter: 0.42" material="shader: flat; color: #38bdf8; emissive: #38bdf8; emissiveIntensity: 0.9; transparent: true; opacity: 0.85; side: double; blending: additive; depthTest: false"></a-entity>
              {/* arcos giratorios */}
              {Array.from({ length: 5 }, (_, j) => (
                <a-entity key={`na${j}`} geometry={`primitive: ring; radiusInner: ${0.3 + j*0.06}; radiusOuter: ${0.34 + j*0.06}; thetaStart: ${j%2===0?20:200}; thetaLength: 90`} material="shader: flat; color: #60a5fa; emissive: #60a5fa; emissiveIntensity: 0.8; transparent: true; opacity: 0.95; side: double; blending: additive; depthTest: false" animation={`property: rotation; to: 0 0 ${j%2===0?360:-360}; loop: true; dur: ${3000 + j*500}`}></a-entity>
              ))}
              {/* halo */}
              <a-entity geometry="primitive: circle; radius: 0.6" material="color: #60a5fa; opacity: 0.18; transparent: true; side: double; depthTest: false" animation="property: scale; from: 1 1 1; to: 1.12 1.12 1.12; dir: alternate; loop: true; dur: 1000"></a-entity>
              {/* partículas */}
              {Array.from({ length: 14 }, (_, i) => (
                <a-sphere key={`np${i}`} radius="0.02" color="#60a5fa" material="emissive: #60a5fa; emissiveIntensity: 0.9" position="0 0 0" animation__p={`property: position; to: ${Math.cos((i/14)*Math.PI*2)*0.85} ${Math.sin((i/14)*Math.PI*2)*0.85} ${0.1}; dur: ${800 + i*35}; dir: alternate; loop: true; delay: ${i*50}`}></a-sphere>
              ))}
            </a-entity>
            <a-light type="point" color="#60a5fa" intensity="0.6" distance="3"></a-light>
          </a-entity>
          {/* Portal Tunnel */}
          <a-entity position="0 0 0">
            <a-entity id="portal-tunnel" class="clickable" geometry="primitive: circle; radius: 0.62" material="color: #fff; opacity: 0; transparent: true"></a-entity>
            <a-entity face-camera>
              <a-entity geometry="primitive: circle; radius: 0.28" material="color: #8b5cf6; opacity: 0.12; transparent: true"></a-entity>
              <a-entity geometry="primitive: ring; radiusInner: 0.28; radiusOuter: 0.42" material="shader: flat; color: #a78bfa; emissive: #a78bfa; emissiveIntensity: 0.9; transparent: true; opacity: 0.85; side: double; blending: additive; depthTest: false"></a-entity>
              {Array.from({ length: 5 }, (_, j) => (
                <a-entity key={`ta${j}`} geometry={`primitive: ring; radiusInner: ${0.3 + j*0.06}; radiusOuter: ${0.34 + j*0.06}; thetaStart: ${j%2===0?0:180}; thetaLength: 90`} material="shader: flat; color: #a78bfa; emissive: #a78bfa; emissiveIntensity: 0.8; transparent: true; opacity: 0.95; side: double; blending: additive; depthTest: false" animation={`property: rotation; to: 0 0 ${j%2===0?360:-360}; loop: true; dur: ${3000 + j*500}`}></a-entity>
              ))}
              <a-entity geometry="primitive: circle; radius: 0.6" material="color: #a78bfa; opacity: 0.18; transparent: true; side: double; depthTest: false" animation="property: scale; from: 1 1 1; to: 1.12 1.12 1.12; dir: alternate; loop: true; dur: 1000"></a-entity>
              {Array.from({ length: 14 }, (_, i) => (
                <a-sphere key={`tp${i}`} radius="0.02" color="#a78bfa" material="emissive: #a78bfa; emissiveIntensity: 0.9" position="0 0 0" animation__p={`property: position; to: ${Math.cos((i/14)*Math.PI*2)*0.85} ${Math.sin((i/14)*Math.PI*2)*0.85} ${0.1}; dur: ${800 + i*35}; dir: alternate; loop: true; delay: ${i*50}`}></a-sphere>
              ))}
            </a-entity>
            <a-light type="point" color="#a78bfa" intensity="0.6" distance="3"></a-light>
          </a-entity>
          {/* Portal Plaza */}
          <a-entity position="1.4 0 0">
            <a-entity id="portal-plaza" class="clickable" geometry="primitive: circle; radius: 0.62" material="color: #fff; opacity: 0; transparent: true"></a-entity>
            <a-entity face-camera>
              <a-entity geometry="primitive: circle; radius: 0.28" material="color: #10b981; opacity: 0.12; transparent: true"></a-entity>
              <a-entity geometry="primitive: ring; radiusInner: 0.28; radiusOuter: 0.42" material="shader: flat; color: #34d399; emissive: #34d399; emissiveIntensity: 0.9; transparent: true; opacity: 0.85; side: double; blending: additive; depthTest: false"></a-entity>
              {Array.from({ length: 5 }, (_, j) => (
                <a-entity key={`pa${j}`} geometry={`primitive: ring; radiusInner: ${0.3 + j*0.06}; radiusOuter: ${0.34 + j*0.06}; thetaStart: ${j%2===0?40:220}; thetaLength: 90`} material="shader: flat; color: #34d399; emissive: #34d399; emissiveIntensity: 0.8; transparent: true; opacity: 0.95; side: double; blending: additive; depthTest: false" animation={`property: rotation; to: 0 0 ${j%2===0?360:-360}; loop: true; dur: ${3000 + j*500}`}></a-entity>
              ))}
              <a-entity geometry="primitive: circle; radius: 0.6" material="color: #34d399; opacity: 0.18; transparent: true; side: double; depthTest: false" animation="property: scale; from: 1 1 1; to: 1.12 1.12 1.12; dir: alternate; loop: true; dur: 1000"></a-entity>
              {Array.from({ length: 14 }, (_, i) => (
                <a-sphere key={`pp${i}`} radius="0.02" color="#34d399" material="emissive: #34d399; emissiveIntensity: 0.9" position="0 0 0" animation__p={`property: position; to: ${Math.cos((i/14)*Math.PI*2)*0.85} ${Math.sin((i/14)*Math.PI*2)*0.85} ${0.1}; dur: ${800 + i*35}; dir: alternate; loop: true; delay: ${i*50}`}></a-sphere>
              ))}
            </a-entity>
            <a-light type="point" color="#34d399" intensity="0.6" distance="3"></a-light>
          </a-entity>
        </a-entity>
      )}
      
      {/* Portal libre para volver al hub, ubicado en la sala actual */}
      {experience !== 'intro' && (
        <a-entity position={getHomePortalPosition(experience)}>
          <a-entity face-camera>
            <a-entity geometry="primitive: circle; radius: 0.18" material="color: #22d3ee; opacity: 0.25; transparent: true; side: double; depthTest: false"></a-entity>
            <a-entity geometry="primitive: ring; radiusInner: 0.18; radiusOuter: 0.26" material="shader: flat; color: #22d3ee; emissive: #22d3ee; emissiveIntensity: 0.9; transparent: true; opacity: 0.85; side: double; blending: additive; depthTest: false"></a-entity>
            <a-entity id="portal-home" class="clickable" geometry="primitive: circle; radius: 0.26" material="color: #fff; opacity: 0; transparent: true"></a-entity>
          </a-entity>
        </a-entity>
      )}

      {/* Controles con rayos para apuntar y hacer click en .clickable */}
      <a-entity laser-controls="hand: left" raycaster="objects: .clickable"></a-entity>
      <a-entity laser-controls="hand: right" raycaster="objects: .clickable"></a-entity>

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
          {/* Toggle de compresión/expansión */}
          <a-entity id="nebula-toggle" class="clickable" geometry="primitive: circle; radius: 0.3" material="color: #0ea5e9; opacity: 0; transparent: true" position="-6 1.6 -12"></a-entity>
          {Array.from({ length: 60 }, (_, i) => {
            const angle = (i / 60) * Math.PI * 2;
            const baseR = nebulaCompressed ? 0.8 : 3.2;
            const x = -6 + Math.cos(angle) * (baseR * (0.5 + Math.random()*0.5));
            const y = 1 + Math.random()*2.5;
            const z = -12 + Math.sin(angle) * (baseR * (0.5 + Math.random()*0.5));
            const r = 0.06 + Math.random()*0.25;
            return (
              <a-sphere key={`nb${i}`} position={`${x} ${y} ${z}`} radius={`${r}`} color="#7dd3fc" material="emissive: #7dd3fc; emissiveIntensity: 0.6; metalness: 0.1; roughness: 0.6" opacity="0.85"></a-sphere>
            );
          })}
          <a-light type="point" position="-6 2 -12" color="#93c5fd" intensity="0.9"></a-light>
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
            <a-sphere key={`pz${i}`} class="plaza-ball clickable" position={`${6 + (i%3 -1)*1.6} ${0.5 + Math.random()*1.2} ${-12 + (Math.floor(i/3)-1)*1.6}`} radius="0.35" color="#34d399" animation__b={`property: position; dir: alternate; loop: true; dur: ${1200 + i*150}; to: ${6 + (i%3 -1)*1.6} ${1.6 + Math.random()*0.5} ${-12 + (Math.floor(i/3)-1)*1.6}`}></a-sphere>
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

