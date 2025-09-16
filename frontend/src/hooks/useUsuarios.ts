import { useState, useEffect } from "react";
import { Usuario } from "../types/Usuario";
import UsuarioService from "../services/UserService";

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuarios
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await UsuarioService.fetchAllUsuarios();
      setUsuarios(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const deleteUsuario = async (usuarioId: number) => {
    try {
      await UsuarioService.deleteUsuario(usuarioId);
      // Refrescar lista después de eliminar
      fetchUsuarios();
    } catch (err) {
      setError("Error al eliminar el usuario");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return { usuarios, loading, error, fetchUsuarios, deleteUsuario };
};

export default useUsuarios;
