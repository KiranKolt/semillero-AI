# Guía para Añadir Modelos 3D

## Formato Recomendado: glTF / .glb

El formato **glTF** (GL Transmission Format) es ligero y eficiente para web:
- ✅ Soporte nativo en A-Frame
- ✅ Texturas y animaciones incluidas
- ✅ Carga rápida
- ✅ Optimizado para web

## Optimización de Modelos

### 1. Reducir Polígonos
- Usa Blender para simplificar geometría
- Modifica `Tools > Mesh > Decimate`
- Objetivo: mantener calidad visual con menos polígonos

### 2. Texturas Comprimidas
Formato **Basis/KTX2**:
```bash
# Usando gltf-pipeline
npx gltf-pipeline -i modelo.fbx -o modelo-optimizado.glb --textureCompression
```

### 3. Level of Detail (LOD)
- Crear versiones simplificadas del modelo
- Cargar según la distancia del usuario

### 4. Bake de Iluminación
- Pre-calcula la iluminación estática
- Reduce cálculos en tiempo real
- Exporta desde Blender con `Bake Lighting`

## Herramientas de Conversión

### 1. Blender + glTF Exporter
```bash
# En Blender: File > Export > glTF 2.0
# Selecciona:
# - Format: glTF Binary (.glb)
# - Mesh: Apply Modifiers
# - Compression: Draco (opcional)
```

### 2. gltf-pipeline
```bash
npm install -g gltf-pipeline
gltf-pipeline -i modelo.gltf -o modelo-optimizado.glb
```

### 3. meshoptimizer
```bash
npx meshoptimizer -c modelo.gltf modelo-optimizado.gltf
```

## Carga en A-Frame

### Paso 1: Añadir a la sección `<a-assets>`

Edita `src/components/VRScene.tsx`:

```tsx
<a-assets>
  <a-asset-item id="mi-modelo" src="/assets/modelos/mi-modelo.glb"></a-asset-item>
</a-assets>
```

### Paso 2: Instanciar el modelo en la escena

```tsx
<a-entity 
  gltf-model="#mi-modelo"
  position="0 1 -5"
  scale="1 1 1"
  rotation="0 0 0"
></a-entity>
```

### Paso 3: Añadir interacciones

```tsx
<a-entity 
  gltf-model="#mi-modelo"
  position="0 1 -5"
  class="interactive"
  animation__mouseenter="property: scale; to: 1.2 1.2 1.2; dur: 300"
  animation__mouseleave="property: scale; to: 1 1 1; dur: 300"
>
  <a-animation
    attribute="rotation"
    begin="click"
    to="0 360 0"
    dur="2000"
  ></a-animation>
</a-entity>
```

## Estructura de Carpetas

```
public/
└── assets/
    └── modelos/
        ├── modelo-1.glb        (modelo optimizado)
        ├── modelo-2.glb
        └── modelo-con-texturas.glb
```

## Ejemplo Completo

```tsx
// 1. Cargar el asset
<a-assets>
  <a-asset-item id="robot-modelo" src="/assets/modelos/robot.glb"></a-asset-item>
  <a-asset-item id="edificio-modelo" src="/assets/modelos/edificio.glb"></a-asset-item>
</a-assets>

// 2. Usar en la escena
<a-entity 
  gltf-model="#robot-modelo"
  position="-3 0 -5"
  scale="2 2 2"
  rotation="0 45 0"
  class="interactive"
  clickable
></a-entity>

<a-entity 
  gltf-model="#edificio-modelo"
  position="3 0 -5"
  scale="1 1 1"
></a-entity>
```

## Mejores Prácticas

1. **Tamaño de archivos**: Mantén modelos bajo 5MB
2. **Naming**: Usa nombres descriptivos (`robot.glb`, `mesa-despacho.glb`)
3. **Escala**: Ajusta la escala en la escena, no en el modelo
4. **LOD**: Implementa Level of Detail para modelos grandes
5. **UV Maps**: Asegúrate de tener UV maps correctos para texturas

## Verificación

```bash
# Verificar que el modelo carga correctamente
npm run dev
# Abre http://localhost:5173
# Revisa la consola del navegador para errores
```

## Recursos

- [glTF Spec](https://www.khronos.org/gltf/)
- [A-Frame Models](https://aframe.io/docs/1.6.0/primitives/a-gltf-model.html)
- [Blender](https://www.blender.org/)
- [Sketchfab](https://sketchfab.com/) - Biblioteca de modelos 3D

