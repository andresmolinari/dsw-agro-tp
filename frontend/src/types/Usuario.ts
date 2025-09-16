export interface Usuario {
  usuarioId: number;
  usuarioNombre: string;
  usuarioEmail: string;
  usuarioContraseña: string;
  usuarioRol: string;
  rol ?: {
    rolId: number;
    rolNombre: string;
  };
}
