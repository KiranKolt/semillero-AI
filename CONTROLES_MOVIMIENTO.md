# 🎮 Guía de Controles de Movimiento

## Movimiento Continuo Implementado ✅

Tu aplicación VR ahora tiene **movimiento continuo** tanto para desktop como para visores VR.

---

## 🖥️ **Controles Desktop (PC/Mac/Linux)**

### Movimiento con Teclado (WASD)
- **W** - Avanzar hacia adelante
- **A** - Moverse a la izquierda
- **S** - Retroceder
- **D** - Moverse a la derecha

### Mirar Alrededor
- **Click izquierdo** + arrastrar el ratón - Girar la cámara
- **O** presionar ESC para salir del pointer-lock y usar el ratón normalmente

### Velocidad
- Velocidad configurada: **0.15 m/s** (puedes ajustarla en `movement-controls`)
- Aceleración configurada: **20** (movimiento responsivo)

---

## 🥽 **Controles VR (Oculus Quest, HTC Vive, etc.)**

### Movimiento con Joysticks/Thumbsticks
- **Joystick izquierdo** - Movimiento hacia adelante/atrás/izquierda/derecha
- **Joystick derecho** - Rotación snap (girar en incrementos)

### Mirar Alrededor
- Simplemente **gira tu cabeza** - El tracking se hace automáticamente

### Características VR
- ✅ Movimiento suave continuo (no teleportación)
- ✅ Sin vuelo (fly: false) - siempre pisas el suelo
- ✅ Gravedad simulada
- ✅ Controladores manuales para interacciones

---

## 🏗️ **Características Implementadas**

### 1. **Suelo Expandido**
- Área de 50x50 metros para explorar libremente
- Grid visual para mejor percepción del movimiento
- Colisiones habilitadas (`static-body`)

### 2. **Obstáculos de Prueba**
- 🔴 Cubo rojo (3, 0.5, -3)
- 🔵 Cilindro azul (-3, 0.75, -3)
- 🟢 Caja verde (0, 0.5, -8)

Estos objetos tienen colisiones - ¡no podrás atravesarlos!

### 3. **Sistema de Cámara Mejorado**
- **Rig** (padre) - Contiene la lógica de movimiento
- **Camera** (hijo) - Maneja la rotación y visión
- Cursor de mirada integrado para interacciones

---

## ⚙️ **Configuración Técnica**

### Parámetros Ajustables

En `VRScene.tsx`, línea ~61:

```typescript
movement-controls="fly: false; speed: 0.15"
```

**Opciones:**
- `fly` - `true`/`false` - Permitir vuelo libre
- `speed` - Número (ej: `0.1` lento, `0.3` rápido)
- `controls` - Qué controles habilitar: `gamepad, keyboard, touch`

En `VRScene.tsx`, línea ~68:

```typescript
wasd-controls="acceleration: 20"
```

**Opciones:**
- `acceleration` - Qué tan rápido acelera (1-100)
- `enabled` - `true`/`false` - Activar/desactivar WASD

---

## 🚀 **Cómo Probar**

### Desktop:
```bash
npm run dev
# Abre http://localhost:5173
# Haz click en la página y usa WASD para moverte
```

### VR (Oculus Quest):
```bash
npm run dev
# Abre la IP local en Meta Browser (ej: http://192.168.1.100:5173)
# Entra al modo VR
# Usa el joystick izquierdo para moverte
```

---

## 🎨 **Próximas Mejoras Posibles**

### Locomoción:
- [ ] Teleportación como alternativa (menos mareante)
- [ ] Snap rotation (rotación en incrementos de 45°)
- [ ] Ajuste de velocidad en tiempo real
- [ ] Modo sprint (correr más rápido)

### Interacciones:
- [ ] Agarrar objetos con los controles
- [ ] Física completa (empujar, lanzar)
- [ ] Puertas que se abren
- [ ] Escaleras y rampas

### Mundos:
- [ ] Múltiples escenas/habitaciones
- [ ] Portales entre mundos
- [ ] Sistema de waypoints
- [ ] Minimapa

---

## 📝 **Notas Técnicas**

### Estructura de Cámara:
```
a-entity#rig (movement-controls)
  └─ a-entity#camera (camera, look-controls, wasd-controls)
       └─ cursor (interacciones)
```

Esta jerarquía es importante:
- El **rig** se mueve por el mundo
- La **cámara** rota dentro del rig
- El **cursor** está fijo respecto a la cámara

### Dependencias:
- `aframe`: ^1.7.1
- `aframe-extras`: Recién instalada ✅
  - Proporciona `movement-controls`
  - Incluye gamepad mapping para VR

---

## 🐛 **Solución de Problemas**

### "No puedo moverme en VR"
✅ Verifica que tu visor tenga controladores con joysticks
✅ Algunos visores requieren permisos de gamepad

### "Me muevo demasiado lento/rápido"
Ajusta el parámetro `speed` en `movement-controls`

### "Atravieso los objetos"
Asegúrate de que tengan el atributo `static-body`

### "No puedo mirar en desktop"
Haz click en la escena para activar pointer-lock

---

¡Disfruta explorando tu mundo VR! 🎉

