import { useEffect } from 'react';

// Componente personalizado para movimiento con thumbstick en Quest
export default function ThumbstickMovement() {
  useEffect(() => {
    // Registrar componente A-Frame personalizado
    if (typeof window !== 'undefined' && (window as any).AFRAME) {
      (window as any).AFRAME.registerComponent('thumbstick-movement', {
        schema: {
          speed: { type: 'number', default: 0.15 },
          rotationSpeed: { type: 'number', default: 1.5 }
        },

        init: function () {
          this.velocity = new (window as any).THREE.Vector3();
          this.rotation = 0;
        },

        tick: function () {
          const el = this.el;
          const data = this.data;
          
          // Buscar gamepads
          const gamepads = navigator.getGamepads();
          let gamepad = null;
          
          for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i] && gamepads[i]?.id.includes('Oculus')) {
              gamepad = gamepads[i];
              break;
            }
          }

          if (!gamepad || !gamepad.axes) return;

          // Obtener posición actual
          const position = el.getAttribute('position');
          const rotation = el.getAttribute('rotation');

          // Thumbstick izquierdo (axes 2 y 3) - Movimiento
          const axisX = gamepad.axes[2] || 0; // Izquierda/Derecha
          const axisY = gamepad.axes[3] || 0; // Adelante/Atrás

          // Thumbstick derecho (axes 0 y 1) - Rotación
          const rotAxisX = gamepad.axes[0] || 0;

          // Aplicar deadzone
          const deadzone = 0.2;
          const moveX = Math.abs(axisX) > deadzone ? axisX : 0;
          const moveZ = Math.abs(axisY) > deadzone ? axisY : 0;
          const rotate = Math.abs(rotAxisX) > deadzone ? rotAxisX : 0;

          if (moveX !== 0 || moveZ !== 0 || rotate !== 0) {
            const speed = data.speed;
            const rotSpeed = data.rotationSpeed;

            // Calcular nueva posición basada en la rotación actual
            const radians = rotation.y * (Math.PI / 180);
            const cos = Math.cos(radians);
            const sin = Math.sin(radians);

            // Movimiento relativo a la dirección de la cámara
            const newX = position.x + (-moveZ * sin - moveX * cos) * speed;
            const newZ = position.z + (-moveZ * cos + moveX * sin) * speed;

            // Rotación
            const newRotY = rotation.y - rotate * rotSpeed;

            // Aplicar nueva posición y rotación
            el.setAttribute('position', {
              x: newX,
              y: position.y,
              z: newZ
            });

            el.setAttribute('rotation', {
              x: rotation.x,
              y: newRotY,
              z: rotation.z
            });
          }
        }
      });
    }
  }, []);

  return null;
}

