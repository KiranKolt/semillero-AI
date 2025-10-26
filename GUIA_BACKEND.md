# Guía de Integración con Backend

## Opciones de Backend

### 1. Supabase (Recomendado para empezar rápido)

Supabase ofrece:
- ✅ Base de datos PostgreSQL
- ✅ Autenticación integrada
- ✅ Storage para modelos 3D
- ✅ API REST automática
- ✅ Real-time subscriptions
- ✅ Gratis hasta cierto límite

#### Configuración

**Paso 1: Crear cuenta en Supabase**
```bash
# Visita https://supabase.com
# Crea un nuevo proyecto
```

**Paso 2: Instalar dependencias**
```bash
npm install @supabase/supabase-js
```

**Paso 3: Variables de entorno**

Crea `.env` en la raíz del proyecto:
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

**Paso 4: Crear tabla en Supabase**

Ejecuta este SQL en el editor SQL de Supabase:
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  author TEXT NOT NULL,
  model_url TEXT,
  video_url TEXT,
  image_url TEXT,
  tags TEXT[],
  position_x FLOAT NOT NULL,
  position_y FLOAT NOT NULL,
  position_z FLOAT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar datos de ejemplo
INSERT INTO projects (title, summary, author, position_x, position_y, position_z, tags)
VALUES 
  ('Simulador de Microgravedad', 'Simulación de experimentos en gravedad reducida', 'María González', -3, 1, -5, ARRAY['Física', 'Educación']),
  ('Museo Interactivo Espacial', 'Tour virtual por el sistema solar', 'Carlos Ramírez', 0, 1, -5, ARRAY['Astronomía', 'Museo']),
  ('Laboratorio Químico VR', 'Experimentos químicos seguros', 'Ana Martínez', 3, 1, -5, ARRAY['Química', 'Educación']);
```

**Paso 5: Actualizar api.ts**

```typescript
import { createClient } from '@supabase/supabase-js';
import { Project } from '../types/project';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Using mock data.');
}

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function fetchProjects(): Promise<Project[]> {
  if (!supabase) {
    // Fallback a mock data
    const { mockProjects } = await import('../types/project');
    return mockProjects;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transformar datos de Supabase a formato Project
    return data.map(row => ({
      id: row.id,
      title: row.title,
      summary: row.summary,
      author: row.author,
      modelUrl: row.model_url,
      videoUrl: row.video_url,
      imageUrl: row.image_url,
      tags: row.tags || [],
      position: {
        x: row.position_x,
        y: row.position_y,
        z: row.position_z,
      },
    }));
  } catch (error) {
    console.error('Error fetching from Supabase:', error);
    // Fallback a mock data
    const { mockProjects } = await import('../types/project');
    return mockProjects;
  }
}
```

---

### 2. Firebase (Alternative)

Firebase ofrece:
- ✅ Firestore (NoSQL)
- ✅ Storage para archivos
- ✅ Authentication
- ✅ Real-time updates
- ✅ Hosting

#### Configuración

**Paso 1: Crear proyecto en Firebase**
```bash
# Visita https://console.firebase.google.com
# Crea un nuevo proyecto
# Habilita Firestore y Storage
```

**Paso 2: Instalar dependencias**
```bash
npm install firebase
```

**Paso 3: Variables de entorno**

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

**Paso 4: Estructura de datos en Firestore**

```typescript
projects/
  ├── {projectId}/
  │   ├── title: string
  │   ├── summary: string
  │   ├── author: string
  │   ├── modelUrl?: string
  │   ├── videoUrl?: string
  │   ├── imageUrl?: string
  │   ├── tags?: string[]
  │   └── position: {
  │       x: number,
  │       y: number,
  │       z: number
  │     }
```

**Paso 5: Actualizar api.ts**

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Project } from '../types/project';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchProjects(): Promise<Project[]> {
  try {
    const projectsCollection = collection(db, 'projects');
    const docs = await getDocs(projectsCollection);
    
    return docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Project));
  } catch (error) {
    console.error('Error fetching from Firestore:', error);
    const { mockProjects } = await import('../types/project');
    return mockProjects;
  }
}
```

---

## Testing

### Probar con datos mock
```bash
npm run dev
# Los proyectos se cargan automáticamente desde mockProjects
```

### Probar con backend real
1. Configura las variables de entorno
2. Asegúrate de tener datos en la base de datos
3. `npm run dev`
4. Revisa la consola para confirmar que se conectó

---

## Mejores Prácticas

1. **Error Handling**: Siempre incluye fallback a datos mock
2. **Loading States**: Muestra indicadores de carga
3. **Caching**: Considera cachear datos para mejor performance
4. **Optimistic Updates**: Actualiza UI antes de confirmar en BD
5. **Realtime**: Usa subscriptions para updates automáticos

---

## Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [A-Frame Components](https://aframe.io/docs/)

