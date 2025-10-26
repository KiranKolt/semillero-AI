# Semillero VR

Página web inmersiva con realidad virtual usando A-Frame, React, TypeScript y Tailwind CSS.

## Stack Tecnológico

- **Framework**: Vite + React + TypeScript
- **Motor 3D/VR**: A-Frame
- **Estilos**: Tailwind CSS
- **HTTPS obligatorio**: Para WebXR (Vercel/Netlify)

## Estructura del Proyecto

```
semillero-vr/
├── public/
│   └── assets/
│       ├── modelos/  # Modelos 3D (.glb/.gltf)
│       └── images/   # Imágenes
├── src/
│   ├── components/
│   │   ├── VRScene.tsx    # Escena A-Frame
│   │   ├── InfoPanel.tsx  # Panel de información
│   │   └── Navbar.tsx     # Barra de navegación
│   ├── pages/
│   │   └── index.tsx      # Página de inicio
│   ├── styles/
│   │   └── globals.css    # Estilos globales
│   ├── App.tsx
│   └── main.tsx
```

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## Estado del Proyecto

### ✅ Completado
- **Paso 1**: Configuración del proyecto (Vite + React + TypeScript + Tailwind)
- **Paso 2**: Escena VR básica con A-Frame
- **Paso 3**: Interactividad (cursor gaze, clics, controladores)
- **Paso 4**: Modelos 3D y assets (estructura lista)
- **Paso 5**: Datos dinámicos (stands de proyectos)

### 📝 Próximos Pasos
1. Conectar con backend real (Supabase/Firebase)
2. Desplegar en Vercel o Netlify (HTTPS requerido para WebXR)
3. Añadir más interacciones y navegación VR

## Características Implementadas

- ✅ Escena VR interactiva con A-Frame
- ✅ Cursor de mirada (gaze) con fusión
- ✅ Soporte para controladores Oculus Touch
- ✅ Modelos 3D con primitivas (Torus, Bucky Ball)
- ✅ Animaciones y efectos visuales
- ✅ Iluminación ambiente y direccional
- ✅ **Stands dinámicos de proyectos** con datos desde BD
- ✅ Sistema de carga de proyectos con estados de loading
- ✅ Componentes modulares para proyectos (ProjectStand)

## Añadir Modelos 3D

Ver `GUIA_MODELOS_3D.md` para instrucciones detalladas.

## Conectar Backend (Opcional)

El proyecto incluye **datos mock** por defecto. Para conectar con un backend real:
1. Ver `GUIA_BACKEND.md` para instrucciones detalladas
2. Configurar Supabase o Firebase
3. Actualizar variables de entorno en `.env`
4. Los proyectos se cargarán automáticamente desde la base de datos

## Uso

### Desarrollo Local

```bash
# Instalar dependencias (primera vez)
npm install

# Iniciar servidor
npm run dev

# Abre http://localhost:5173 en tu navegador
# Haz clic en "🥽 Entrar en VR"
```

### Testing en Visor VR (Oculus Quest)

**Opción 1 - Red Local:**
```bash
# El servidor ya está configurado para red local
npm run dev

# Busca la IP de red en la consola (ej: http://192.168.1.100:5173)
# Abre esa URL en el Meta Browser de tu Quest
```

**Opción 2 - Deploy en Internet:**
```bash
# Crear build de producción
npm run build

# Deploy con Vercel (recomendado)
npm install -g vercel
vercel

# O despliega manualmente a Vercel/Netlify
```

### Producción
```bash
npm run build
npm run preview
```

> 📄 Para instrucciones detalladas, ver: **PROBAR_AHORA.md**

## Nota

Este proyecto está configurado para funcionar en dispositivos Oculus/Meta Quest a través de WebXR. Se requiere HTTPS en producción.

## Documentación Adicional

- 🚀 **[PROBAR_AHORA.md](./PROBAR_AHORA.md)** - Guía rápida para probar la app
- 📄 [Guía de Modelos 3D](./GUIA_MODELOS_3D.md) - Añadir modelos 3D
- 📄 [Guía de Backend](./GUIA_BACKEND.md) - Integrar Supabase/Firebase
- 🧪 [Guía de Testing](./GUIA_TESTING.md) - Testing completo con Visor VR

## Recursos

- [Documentación A-Frame](https://aframe.io/docs/)
- [WebXR Documentation](https://www.w3.org/TR/webxr/)
- [Supabase Docs](https://supabase.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)

