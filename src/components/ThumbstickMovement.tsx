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
          this.keys = {};
          
          // Keyboard controls (WASD)
          window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
          });
          window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
          });
        },

        tick: function () {
          const el = this.el;
          const data = this.data;
          const debugText = document.querySelector('#debugText');
          
          // Buscar gamepads
          const gamepads = navigator.getGamepads();
          let gamepad = null;
          let gamepadDetected = false;
          
          for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
              gamepad = gamepads[i];
              gamepadDetected = true;
              if (debugText && gamepad) {
                (debugText as any).setAttribute('value', `Gamepad: ${gamepad.id.substring(0, 30)}`);
              }
              break;
            }
          }

          if (!gamepadDetected && debugText) {
            (debugText as any).setAttribute('value', 'No gamepad - Use WASD');
          }

          // Obtener posición actual
          const position = el.getAttribute('position');
          const rotation = el.getAttribute('rotation');

          let moveX = 0;
          let moveZ = 0;
          let rotate = 0;

          // Leer gamepad si está disponible
          if (gamepad && gamepad.axes && gamepad.axes.length >= 4) {
            // Thumbstick izquierdo (axes 2 y 3) - Movimiento
            const axisX = gamepad.axes[2] || 0; // Izquierda/Derecha
            const axisY = gamepad.axes[3] || 0; // Adelante/Atrás

            // Thumbstick derecho (axes 0 y 1) - Rotación  
            const rotAxisX = gamepad.axes[0] || 0;

            // Aplicar deadzone
            const deadzone = 0.15;
            moveX = Math.abs(axisX) > deadzone ? axisX : 0;
            moveZ = Math.abs(axisY) > deadzone ? axisY : 0;
            rotate = Math.abs(rotAxisX) > deadzone ? rotAxisX : 0;
            
            if (debugText && (moveX !== 0 || moveZ !== 0 || rotate !== 0)) {
              (debugText as any).setAttribute('value', `Moving! X:${moveX.toFixed(2)} Z:${moveZ.toFixed(2)}`);
            }
          } else {
            // Fallback a WASD
            if (this.keys['w']) moveZ = -1;
            if (this.keys['s']) moveZ = 1;
            if (this.keys['a']) moveX = -1;
            if (this.keys['d']) moveX = 1;
            if (this.keys['q']) rotate = 1;
            if (this.keys['e']) rotate = -1;
          }

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

