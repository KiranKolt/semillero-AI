# Guía de Testing - Semillero VR

Esta guía te explica cómo probar tu página VR tanto en desarrollo como en un visor real de Oculus/Meta Quest.

## 🖥️ Opción 1: Prueba en Desarrollo Local (Sin Visor)

### Paso 1: Instalar Node.js (si no lo tienes)

**Descarga e instala Node.js:**
- Visita: https://nodejs.org/
- Descarga la versión LTS (recomendada)
- Ejecuta el instalador
- Verifica instalación: Abre PowerShell/CMD y escribe:
  ```bash
  node --version
  npm --version
  ```

### Paso 2: Instalar Dependencias del Proyecto

```bash
# Navega a la carpeta del proyecto
cd semillero-vr

# Instala todas las dependencias
npm install
```

### Paso 3: Iniciar Servidor de Desarrollo

```bash
npm run dev
```

Verás algo como:
```
VITE v5.3.4  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Paso 4: Abrir en el Navegador

1. Abre tu navegador (Chrome, Edge, Firefox)
2. Ve a: **http://localhost:5173**
3. Verás la pantalla de bienvenida
4. Haz clic en **"🥽 Entrar en VR"**
5. La escena VR se cargará en tu navegador

### Controles en el Navegador

- **Rotar cámara**: Arrastra con el mouse
- **Interactuar**: Mira un objeto por 0.5 segundos
- **Acercar**: Rueda del mouse (scroll)
- **Salir de VR**: Presiona `Esc` o haz clic fuera

---

## 🥽 Opción 2: Prueba con Visor Oculus/Meta Quest

### Opción A: USB Cable (Más Fiable)

**Paso 1: Activar Modo Desarrollador**

1. Descarga la app "Meta Quest" en tu celular
2. Inicia sesión con tu cuenta Oculus
3. Ve a: Settings → Developer Mode
4. Activa "Developer Mode"

**Paso 2: Conectar al PC**

```bash
# Conecta tu Quest al PC con cable USB-C
# Windows instalará los drivers automáticamente
```

**Paso 3: Habilitar Servidor de Red en Vite**

Actualiza el comando `npm run dev` para exponer en tu red local:

```bash
npm run dev -- --host
```

O modifica `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite conexiones externas
    port: 5173
  }
})
```

**Paso 4: Obtener IP Local**

En PowerShell:
```powershell
ipconfig
# Busca "IPv4 Address" (ej: 192.168.1.100)
```

**Paso 5: Abrir en Quest**

1. Pon tu Quest
2. Abre **Meta Browser**
3. Navega a: `http://TU_IP:5173` (ej: `http://192.168.1.100:5173`)
4. Verás la página
5. Haz clic en "Entrar en VR"
6. Presiona el botón **"Enter VR"** cuando aparezca

### Opción B: Despliegue en Producción (Recomendado)

### Paso 1: Crear Build de Producción

```bash
npm run build
```

Esto crea la carpeta `dist/` con los archivos optimizados.

### Paso 2: Desplegar en Vercel (Gratis)

**Instalación y Deploy:**

```bash
# Instala Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy desde la carpeta del proyecto
cd semillero-vr
vercel

# Sigue las instrucciones
# ¿Quieres desplegar? (Y/N): Y
# ¿Cuál es tu proyecto? [Create new]: Enter
# ¿En qué carpeta? (./): dist
```

**O usa el dashboard web:**
1. Ve a https://vercel.com
2. Crea una cuenta (gratis con GitHub)
3. Click "New Project"
4. Importa tu proyecto desde GitHub
5. Configuración automática

### Paso 3: Obtener URL HTTPS

Vercel te dará una URL como:
```
https://semillero-vr-xyz123.vercel.app
```

Esta URL ya tiene **HTTPS** (requerido para WebXR).

### Paso 4: Probar en Quest

1. Enciende tu Oculus Quest
2. Abre **Meta Browser** (navegador integrado)
3. Escribe la URL de Vercel (ej: `https://semillero-vr.vercel.app`)
4. Presiona Enter
5. Haz clic en **"🥽 Entrar en VR"**
6. El navegador detectará WebXR y mostrará: **"Enter VR"**
7. Presiona el botón
8. ¡Disfruta de la experiencia!

---

## 📱 Opción 3: Prueba en Móvil (Cardboard/Daydream)

A-Frame también funciona en móviles con soporte para VR básico:

```bash
# Despliega en producción (Vercel/Netlify)
# Abre la URL en tu móvil
# Si el navegador soporta WebXR, verás el botón
# Inserta el móvil en un Cardboard/Daydream
```

---

## ✅ Checklist de Testing

### Interacciones Básicas

- [ ] Cursor de mirada aparece al mirar objetos
- [ ] Fusión de 0.5s activa eventos
- [ ] Objetos cambian al hover (escala/rotación)
- [ ] Animaciones al hacer clic
- [ ] Sonidos (si los agregaste)

### Controladores VR (Quest)

- [ ] Se detectan controladores
- [ ] Manos virtuales aparecen
- [ ] Teletransporte funciona (si implementaste)
- [ ] Apuntar con controlador funciona

### Proyectos Dinámicos

- [ ] Proyectos se cargan desde la BD
- [ ] Stands aparecen en sus posiciones
- [ ] Información se muestra correctamente
- [ ] Modelos 3D cargan (si los hay)
- [ ] Vídeos/inágenes se muestran

### Rendimiento

- [ ] FPS estable (60 FPS mínimo)
- [ ] Sin lag o stuttering
- [ ] Carga rápida (<5 segundos)
- [ ] No se congela la pantalla

---

## 🐛 Solución de Problemas Comunes

### "La página no detecta WebXR"

**Solución:**
- Verifica que estés usando HTTPS (no HTTP)
- Usa Meta Browser (no Firefox Reality)
- Actualiza el navegador del Quest

### "Se ve borroso"

**Solución:**
```javascript
// En src/components/VRScene.tsx, añade:
<a-scene 
  renderer="antialiasing: true; colorManagement: true; sortObjects: true"
  embedded
  vr-mode-ui="enabled: true"
>
```

### "No detecta controladores"

**Solución:**
Asegúrate de que los controladores estén conectados:
```jsx
<a-entity 
  hand-controls="hand: left" 
  tracked-controls="controller: 0"
></a-entity>
<a-entity 
  hand-controls="hand: right" 
  tracked-controls="controller: 1"
></a-entity>
```

### "Los proyectos no cargan"

**Solución:**
1. Revisa la consola del navegador (F12)
2. Verifica que la API esté funcionando
3. Confirma que las rutas en `src/services/api.ts` sean correctas

---

## 🎯 Próximos Pasos

Una vez que todo funcione:

1. ✅ Optimiza modelos 3D con gltf-pipeline
2. ✅ Añade más interacciones y animaciones
3. ✅ Implementa navegación VR
4. ✅ Añade sonidos espaciales
5. ✅ Conecta con backend real (Supabase/Firebase)

---

## 📚 Recursos

- [A-Frame Testing Guide](https://aframe.io/docs/1.6.0/guides/testing.html)
- [WebXR Browser Support](https://caniuse.com/webxr)
- [Vercel Deploy Docs](https://vercel.com/docs)
- [Oculus Browser](https://www.oculus.com/experiences/quest/3851583302364980/)

