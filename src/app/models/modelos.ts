

// Interface for `usuarios` table
export interface Usuario {
    id: number;
    nombre: string;
    fecha_nacimiento: string; // Se utiliza string para manejar fechas
    telefono: string;
    email: string;
    password: string;
    rol: 'admin' | 'user'; // Rol restringido a 'admin' o 'user'
  }
  

  export interface RegistroCita {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    dia: string; // Se utiliza string para manejar fechas
  }
  export interface Historial {
    id: number;
    nombre: string;
    padecimientos: string;
    tiempo_padecimiento: string;
    notas?: string; // Campo opcional
    usuario_id: number; // Foreign key relacionada con el id del usuario
  }
  export interface Recordatorio {
    id: number;
    telefono: string;
    correo: string;
    frecuencia: 'diaria' | 'semanal' | 'mensual'; // Frecuencia restringida a 'diaria', 'semanal', o 'mensual'
    usuario_id: number; // Foreign key relacionada con el id del usuario
  }
      
