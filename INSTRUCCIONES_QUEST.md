# Instrucciones para Oculus Quest

## ✅ Compatibilidad VR Configurada

La página está configurada para funcionar tanto en navegador como en Oculus Quest.

### 🎮 Cómo Usar en Oculus Quest

#### Opción 1: Desarrollo Local (PC + Quest en la misma red WiFi)

1. **Asegúrate de que el servidor esté corriendo:**
   ```bash
   npm run dev
   ```

2. **Obtén tu IP local:**
   - En PowerShell: `ipconfig`
   - Busca "IPv4 Address" (ej: 192.168.1.100)

3. **Abre Meta Browser en tu Quest:**
   - Abre la app "Browser" en tu Quest
   - Navega a: `http://TU_IP:5173` (ej: http://192.168.1.100:5173)

4. **Entrar en VR:**
   - Verás la página con el fondo 3D
   - Busca el botón **"🥽 Entrar en VR"** (esquina inferior derecha)
   - Haz clic en el botón
   - Aparecerá el botón "Enter VR" de Meta Browser
   - Presiona ese botón para entrar en VR completo

#### Opción 2: Producción (Deploy en Internet)

1. **Despliega a Vercel:**
   ```bash
   npm run build
   vercel
   ```

2. **Obtén tu URL HTTPS** (ej: https://semillero-vr.vercel.app)

3. **En tu Quest:**
   - Abre Meta Browser
   - Ve a tu URL
   - Haz clic en "Entrar en VR"

---

## 🎯 Características VR Habilitadas

### ✅ Controles VR
- **hand-controls**: Detecta tus manos y controladores
- **tracked-controls**: Mapeo de Oculus Touch controllers
- **wasd-controls**: Movimiento con teclado (si usas PC en VR)

### ✅ Interactividad
- **Cursor gaze**: Mira objetos para interactuar
- **Fuse timeout**: 1 segundo de mirada para activar
- **Animaciones**: Todos los elementos responden

### ✅ Elementos 3D
- 50 estrellas en el fondo
- Objetos decorativos flotantes
- Proyectos en el espacio 3D
- Iluminación ambiental

---

## 🔧 Configuración Técnica

### WebXR Habilitado
```jsx
vr-mode-ui="enabled: true"
```

### Controles de Cámara
- Look-controls habilitados
- WASD controls para navegación por teclado
- Posición inicial: (0, 1.8, 0) - Altura ojos humanos

### Hand Tracking
- Manejadores para mano izquierda y derecha
- Compatible con Oculus Touch

---

## 🧪 Pruebas Recomendadas

1. **En navegador desktop:**
   - Click en "Entrar en VR"
   - Debe activar modo pantalla completa
   - Mouse para mover cámara

2. **En Quest (Meta Browser):**
   - Abrir URL
   - Click en "Entrar en VR"
   - Debe mostrar botón "Enter VR" nativo de Meta
   - Al activarlo, entra en VR inmersivo completo

3. **Controles VR:**
   - [ ] Se detectan controladores
   - [ ] Puedes apuntar con controlador
   - [ ] Cursor gaze funciona
   - [ ] No hay lag o stuttering

---

## 📱 Notas Importantes

### Para que funcione en Quest:
- ✅ La URL debe ser **HTTPS** (Vercel lo proporciona)
- ✅ Debe usar **Meta Browser** (no Firefox Reality)
- ✅ Debes estar **dentro del visor** para entrar en VR

### Problemas Comunes:

**"No aparece botón Enter VR"**
- Usa Meta Browser, no otro navegador
- Verifica que estés en HTTPS

**"Se ve borroso"**
- La resolución se ajusta automáticamente en Quest
- Asegúrate de tener buena conexión WiFi

**"Los controladores no funcionan"**
- Verifica que estén cargados
- Revisa la consola del navegador en tu PC

---

## 🎉 Resultado Esperado

En tu Oculus Quest deberías ver:
- Página web completa con fondo 3D inmersivo
- Botón "Entrar en VR" visible
- Al entrar: experiencia VR completa con todos los elementos 3D
- Controles funcionando
- Interactividad total

¡Disfruta de tu experiencia inmersiva!
