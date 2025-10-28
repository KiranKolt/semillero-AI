import { Project } from '../types/project';

// Service para manejar datos del backend
// Conectar a Supabase o Firebase cuando esté listo
/**
 * Fetch de proyectos desde el backend
 * Por ahora retorna datos mock, reemplazar con llamada real
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    // Descomentar para usar backend real:
    /*
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    if (!response.ok) throw new Error('Error fetching projects');
    return await response.json();
    */
    
    // Mock data por ahora
    const { mockProjects } = await import('../types/project');
    return mockProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    const { mockProjects } = await import('../types/project');
    return mockProjects;
  }
}

/**
 * Fetch de un proyecto específico
 */
export async function fetchProject(id: string): Promise<Project | null> {
  try {
    // Descomentar para backend real:
    /*
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`);
    if (!response.ok) return null;
    return await response.json();
    */
    
    const projects = await fetchProjects();
    return projects.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

/**
 * Ejemplo de integración con Supabase:
 */
/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchProjectsSupabase(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*');
  
  if (error) throw error;
  return data;
}
*/

/**
 * Ejemplo de integración con Firebase:
 */
/*
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // ... otros config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchProjectsFirebase(): Promise<Project[]> {
  const projectsCollection = collection(db, 'projects');
  const docs = await getDocs(projectsCollection);
  return docs.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
}
*/

