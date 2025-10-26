// Tipos para proyectos del semillero

export interface Project {
  id: string;
  title: string;
  summary: string;
  author: string;
  modelUrl?: string; // URL al modelo 3D (.glb)
  videoUrl?: string; // URL al video de demostración
  imageUrl?: string; // Miniatura
  tags?: string[];
  position: {
    x: number;
    y: number;
    z: number;
  };
}

// Mock data para desarrollo (reemplazar con fetch real a Supabase/Firebase)
export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Simulador de Microgravedad",
    summary: "Simulación de experimentos en gravedad reducida usando física inversa",
    author: "María González",
    modelUrl: "/assets/modelos/simulador.glb",
    imageUrl: "/assets/images/thumb1.jpg",
    tags: ["Física", "Educación"],
    position: { x: -15, y: 0, z: -40 }
  },
  {
    id: "2",
    title: "Museo Interactivo Espacial",
    summary: "Tour virtual por el sistema solar con modelos 3D precisos",
    author: "Carlos Ramírez",
    videoUrl: "https://example.com/demo.mp4",
    imageUrl: "/assets/images/thumb2.jpg",
    tags: ["Astronomía", "Museo"],
    position: { x: -5, y: 0, z: -40 }
  },
  {
    id: "3",
    title: "Laboratorio Químico VR",
    summary: "Experimentos químicos seguros en un entorno virtual inmersivo",
    author: "Ana Martínez",
    modelUrl: "/assets/modelos/lab-quimico.glb",
    tags: ["Química", "Educación"],
    position: { x: 5, y: 0, z: -40 }
  },
  {
    id: "4",
    title: "Arquitectura Sostenible",
    summary: "Visualización 3D de edificios ecológicos con paneles solares",
    author: "Luis Fernández",
    modelUrl: "/assets/modelos/edificio-eco.glb",
    tags: ["Arquitectura", "Sostenibilidad"],
    position: { x: 15, y: 0, z: -40 }
  }
];

