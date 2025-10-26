# 🚀 Probar la Aplicación Ahora - Guía Rápida

## Prueba Inmediata (Sin Visor VR)

### 1. Abrir Terminal en la Carpeta del Proyecto

```bash
cd "C:\Users\Usuario\OneDrive\Escritorio\Pagina Vr\semillero-vr"
```

### 2. Instalar Dependencias (Solo la Primera Vez)

**IMPORTANTE:** Necesitas tener Node.js instalado.

Si no lo tienes:
1. Ve a https://nodejs.org/
2. Descarga la versión LTS
3. Instálalo
4. Reinicia la terminal

```bash
npm install
```

Espera a que termine (1-2 minutos).

### 3. Iniciar el Servidor

```bash
npm run dev
```

Verás algo como:
```
➜  Local:   http://localhost:5173/
```

### 4. Abrir en el Navegador

1. Copia esta URL: **http://localhost:5173**
2. Pégalo en tu navegador (Chrome, Edge, Firefox)
3. Presiona Enter

### 5. Entrar en la Experiencia VR

1. Haz clic en el botón **"🥽 Entrar en VR"**
2. La escena VR se cargará
3. Verás: Caja azul, Esfera rosa, Torus, Bucky Ball, y 4 stands de proyectos

### 6. Interactuar con Objetos

- **Mueve el mouse** para rotar la cámara
- **Mira un objeto por 0.5 segundos** (cursor azul aparece)
- **Mira fijamente** el objeto para activarlo
- **Mueve el mouse** alrededor para explorar

---

## 🥽 Probar con Visor VR (Oculus Quest)

### Opción 1: Red Local (Más Rápido)

**Requiere: Quest y PC en la misma red WiFi**

1. Sigue los pasos 1-3 de arriba
2. Modifica `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // ← Añade esto
    port: 5173
  }
})
```

3. Reinicia el servidor:
```bash
# Detén el servidor (Ctrl+C)
npm run dev
```

4. Verás algo como:
```
➜  Network: http://192.168.1.100:5173
```

5. En tu Quest:
   - Abre Meta Browser
   - Ve a esa URL (ej: http://192.168.1.100:5173)
   - Haz clic en "Entrar en VR"
   - Presiona "Enter VR" cuando aparezca

### Opción 2: Deploy a Internet (Más Fácil)

**Recomendado para principiantes**

1. **Crea cuenta en Vercel:**
   - Ve a https://vercel.com
   - Regístrate con GitHub (gratis)
   
2. **Conecta tu proyecto:**

```bash
cd semillero-vr
git init
git add .
git commit -m "Initial commit"

# Sube a GitHub
# Luego en Vercel: New Project → Import from GitHub
```

3. **O despliega rápido:**

```bash
npm install -g vercel
vercel
```

4. **Obten tu URL HTTPS:**
   - Ejemplo: `https://semillero-vr.vercel.app`
   
5. **En tu Quest:**
   - Abre Meta Browser
   - Ve a tu URL
   - ¡Listo!

---

## ✅ Verificar que Funciona

### En el Navegador:
- ✅ Se muestra "Semillero VR"
- ✅ Botón "Entrar en VR" visible
- ✅ Al hacer clic, aparece la escena 3D
- ✅ Puedes rotar con el mouse
- ✅ Cursor azul aparece

### En Quest:
- ✅ Ve la pantalla de bienvenida
- ✅ Botón "Enter VR" aparece
- ✅ Al presionarlo, entras a VR
- ✅ Controladores se detectan
- ✅ Puedes apuntar con controlador

---

## 🔍 Ver Logs/Errores

Abre la Consola del Navegador:

**En Chrome/Edge:**
1. Presiona `F12`
2. Ve a la pestaña **Console**
3. Busca errores en rojo

**En Quest:**
1. Conecta Quest al PC por USB
2. Ve a: chrome://inspect
3. Inspecciona el dispositivo
4. Ve a Console

---

## 🆘 ¿No Funciona?

### Error: "npm no se reconoce"

**Solución:** Instala Node.js desde https://nodejs.org/

### Error: "Puerto 5173 en uso"

**Solución:**
```bash
# Envía Ctrl+C para detener el servidor
# O usa otro puerto:
npm run dev -- --port 3000
```

### Error: "No se puede instalar dependencias"

**Solución:**
```bash
npm cache clean --force
npm install
```

### La página no carga

**Solución:**
1. Verifica que el servidor esté corriendo (`npm run dev`)
2. Revisa que la URL sea correcta
3. Intenta en otro navegador

---

## 📞 Ayuda

Si tienes problemas:

1. Lee `GUIA_TESTING.md` para más detalles
2. Revisa la consola del navegador (F12)
3. Verifica que Node.js esté instalado
4. Asegúrate de estar en la carpeta correcta

---

## 🎉 ¡Listo!

Una vez que veas la escena VR cargada, ¡has completado el tutorial exitosamente!

**Próximos pasos:**
- Añade tus propios modelos 3D
- Conecta con Supabase/Firebase
- Personaliza los proyectos
- Despliega en producción

**Documentación:**
- `README.md` - Resumen del proyecto
- `GUIA_MODELOS_3D.md` - Añadir modelos 3D
- `GUIA_BACKEND.md` - Integrar backend
- `GUIA_TESTING.md` - Testing completo

