# Cómo Instalar Node.js en Windows

## ⚠️ Necesitas Instalar Node.js Primero

El error que estás viendo significa que **Node.js no está instalado** en tu PC.

## 🚀 Solución: Instalar Node.js

### Opción 1: Descarga desde la Web Oficial (Recomendado)

**Paso 1:** Ve a https://nodejs.org/

**Paso 2:** Descarga la versión **LTS** (Recommended for Most Users)
- Versión recomendada: 20.x o superior
- Tamaño: ~30 MB

**Paso 3:** Ejecuta el instalador
- Haz doble clic en el archivo descargado (ej: `node-v20.x.x-x64.msi`)
- Click "Next" en todas las ventanas
- ✅ **Importante:** Marca la casilla "Automatically install the necessary tools"
- Click "Install"

**Paso 4:** Reinicia PowerShell/Terminal
- Cierra todas las ventanas de PowerShell
- Abre una nueva terminal
- Vuelve a ejecutar los comandos

**Paso 5:** Verifica la instalación

```powershell
node --version
npm --version
```

Deberías ver algo como:
```
v20.11.0
10.2.4
```

---

### Opción 2: Usar Chocolatey (Usuarios Avanzados)

Si tienes Chocolatey instalado:

```powershell
choco install nodejs
```

---

## ✅ ¿Qué Hacer Después de Instalar?

Una vez instalado Node.js:

```bash
# 1. Navega a la carpeta del proyecto
cd "C:\Users\Usuario\OneDrive\Escritorio\Pagina Vr\semillero-vr"

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor
npm run dev

# 4. Abre tu navegador en: http://localhost:5173
```

---

## 🔍 Solución de Problemas

### Si sigues viendo "npm no se reconoce"

**Solución 1:** Reinicia tu computadora
- Node.js requiere reiniciar para actualizar las variables de entorno

**Solución 2:** Verifica que esté en el PATH

1. Abre PowerShell como Administrador
2. Ejecuta:
```powershell
$env:Path -split ';' | Select-String -Pattern "node"
```

Si no ves nada con "node", entonces no está en el PATH.

**Solución 3:** Instala manualmente desde la terminal

```powershell
winget install OpenJS.NodeJS.LTS
```

---

## 📦 Alternativa: Usar la Aplicación Sin npm

Si no puedes instalar Node.js, puedes usar servicios online:

### Opción 1: CodeSandbox (Navegador)
1. Ve a https://codesandbox.io
2. Crea un proyecto "React + TypeScript"
3. Copia los archivos del proyecto
4. Funciona en el navegador sin instalar nada

### Opción 2: GitHub Codespaces
1. Sube tu proyecto a GitHub
2. Abre GitHub Codespaces
3. Edita online
4. Deploy en Vercel desde ahí

### Opción 3: WSL (Windows Subsystem for Linux)
Si tienes WSL instalado:
```bash
wsl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install
npm run dev
```

---

## 🎯 Guía Rápida Visual

### Paso a Paso:

1. **Ve a nodejs.org**
   ```
   https://nodejs.org/
   ```

2. **Descarga la versión LTS** (botón verde grande)

3. **Ejecuta el instalador**
   - Click "Next" varias veces
   - Click "Install"
   - Espera 1-2 minutos

4. **Reinicia tu terminal**

5. **Verifica la instalación:**
   ```bash
   node --version
   npm --version
   ```

6. **Vuelve al proyecto:**
   ```bash
   cd "C:\Users\Usuario\OneDrive\Escritorio\Pagina Vr\semillero-vr"
   npm install
   npm run dev
   ```

---

## ❓ ¿Necesitas Más Ayuda?

Si sigues teniendo problemas:

1. Verifica que descargaste Node.js desde el sitio oficial
2. Asegúrate de cerrar TODAS las ventanas de PowerShell y abrir una nueva
3. Prueba reiniciar tu computadora
4. Verifica que Windows está actualizado

---

## 📚 Recursos

- [Node.js Website](https://nodejs.org/)
- [Node.js Download](https://nodejs.org/en/download/)
- [NPM Documentation](https://docs.npmjs.com/)

