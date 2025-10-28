# 🚀 Guía de Despliegue en GitHub Pages

## ✅ Tu sitio está DESPLEGADO

Tu aplicación VR con movimiento continuo ya está publicada en:

**🌐 URL:** https://kirankolt.github.io/semillero-AI

---

## 🎉 ¿Qué se Desplegó?

✅ **Movimiento continuo** (WASD + Joysticks VR)  
✅ **Suelo expandido** de 50x50 metros  
✅ **Obstáculos** con colisiones  
✅ **Grid visual** para mejor percepción  
✅ **Controles VR** mejorados  
✅ **aframe-extras** instalado y configurado  

---

## 🎮 Cómo Usarlo

### **Desktop (PC/Mac):**
1. Abre: https://kirankolt.github.io/semillero-AI
2. Haz **click** en "🥽 Entrar en VR"
3. **Haz click en la página** para activar los controles
4. Usa **WASD** para moverte
5. Mueve el **ratón** para mirar

### **VR (Oculus Quest):**
1. Abre el **Meta Browser** en tu Quest
2. Ve a: https://kirankolt.github.io/semillero-AI
3. Presiona **"🥽 Entrar en VR"**
4. Usa el **joystick izquierdo** para moverte
5. Gira tu cabeza para mirar alrededor

---

## 🔄 Cómo Actualizar el Sitio (Futuros Cambios)

Cada vez que hagas cambios en el código y quieras subirlos:

```bash
# 1. Navega a la carpeta del proyecto
cd "C:\Users\Usuario\OneDrive\Escritorio\Trabajos Uni\Pagina Vr\semillero-vr"

# 2. Despliega (esto compila y sube automáticamente)
npm run deploy
```

**¡Eso es todo!** El comando hace:
1. Compila tu código TypeScript
2. Genera los archivos optimizados en `/dist`
3. Los sube a la rama `gh-pages` de GitHub
4. GitHub Pages actualiza tu sitio automáticamente

⏱️ **Tiempo de actualización:** 1-2 minutos después del deploy

---

## 📦 Comandos Disponibles

```bash
# Desarrollo local (localhost:5173)
npm run dev

# Compilar para producción (genera /dist)
npm run build

# Vista previa del build (localhost:4173)
npm run preview

# Desplegar a GitHub Pages
npm run deploy
```

---

## 🛠️ Configuración Actual

### package.json
```json
{
  "homepage": "https://kirankolt.github.io/semillero-AI",
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

### Repositorio GitHub
- **Usuario:** kirankolt
- **Repo:** semillero-AI
- **Rama de deploy:** gh-pages (automática)
- **Rama de código:** main/master

---

## 🔧 Verificar Estado del Deploy

### Opción 1: Desde GitHub Web
1. Ve a: https://github.com/kirankolt/semillero-AI
2. Click en **Settings** (Configuración)
3. En el menú izquierdo, click en **Pages**
4. Verás el estado: "Your site is live at..."

### Opción 2: Desde Terminal
```bash
git log --oneline --decorate gh-pages
```

---

## 📝 Notas Importantes

### ⚠️ HTTPS Obligatorio
GitHub Pages usa **HTTPS automáticamente**, lo cual es **perfecto para WebXR**.  
Los visores VR requieren HTTPS para acceder a los sensores de movimiento.

### 🌍 Accesible Desde Cualquier Lugar
Tu sitio es público y accesible desde:
- ✅ Cualquier PC/Mac/Linux
- ✅ Smartphones
- ✅ Oculus Quest / Meta Quest
- ✅ HTC Vive
- ✅ Cualquier visor VR con navegador

### 📊 Tamaño del Bundle
- **JavaScript:** ~1.43 MB (comprimido: ~398 KB)
- **CSS:** ~13 KB
- **Total:** Rápido de cargar incluso en redes móviles

---

## 🔄 Workflow Recomendado

```bash
# 1. Hacer cambios en el código
# (editar archivos en src/)

# 2. Probar localmente (opcional pero recomendado)
npm run dev
# Abre http://localhost:5173 y verifica que funciona

# 3. Desplegar cuando estés satisfecho
npm run deploy

# 4. Esperar 1-2 minutos

# 5. Probar en producción
# Abre https://kirankolt.github.io/semillero-AI
```

---

## 🐛 Solución de Problemas

### "El sitio no se actualiza"
- Espera 2-3 minutos (GitHub puede tardar)
- Limpia la caché del navegador (Ctrl + Shift + R)
- Verifica que el deploy terminó correctamente

### "Error al hacer deploy"
```bash
# Verifica que estás en la carpeta correcta
pwd
# Debe mostrar: .../Pagina Vr/semillero-vr

# Reinstala dependencias si es necesario
npm install

# Intenta de nuevo
npm run deploy
```

### "404 Not Found"
- Verifica que la URL sea correcta
- Espera unos minutos (primera vez puede tardar más)
- Verifica en GitHub Settings > Pages que esté activado

---

## 🎨 Próximos Pasos

Ahora que tu sitio está online, puedes:

1. **Compartir el link** con amigos/compañeros
2. **Probar en VR** con tu Oculus Quest
3. **Añadir más features**:
   - Más mundos/escenas
   - Objetos interactuables
   - Multiplayer
   - Sistema de avatares
4. **Hacer deploy** cada vez que añadas algo nuevo

---

## 📚 Recursos

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [gh-pages npm package](https://www.npmjs.com/package/gh-pages)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

---

¡Tu aplicación VR está live en internet! 🎉🥽

