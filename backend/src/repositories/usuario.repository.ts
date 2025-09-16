import { Usuario, UsuarioAttributes } from "../models/usuario";

//obtener todos los usuarios
const getUsuarios = async (): Promise<Usuario[]> => {
  try {
    return await Usuario.findAll({ 
    });
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// obtener un usuario
const getUsuario = async (usuarioId: number): Promise<Usuario | null> => {
  try {
    const usuario = await Usuario.findByPk(usuarioId);
    return usuario;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// obtener usuario por nombre
const getUsuarioByName = async (
  usuarioNombre: string
): Promise<Usuario | null> => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        usuarioNombre,
      },
    });
    return usuario;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// obtener usuario por email
const getUsuarioByEmail = async (
  usuarioEmail: string
): Promise<Usuario | null> => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        usuarioEmail,
      },
    });
    return usuario;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// registrar usuario

const createUsuario = async (
  usuarioNombre: string,
  usuarioEmail: string,
  hashedPassword: string,
  rolId: number
): Promise<Usuario> => {
  try {
    return await Usuario.create({
      usuarioNombre: usuarioNombre,
      usuarioEmail: usuarioEmail,
      usuarioContraseña: hashedPassword,
      rolId: rolId,
    });
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// Modificar usuario
const updateUsuario = async (
  usuarioId: number,
  usuarioData: Partial<UsuarioAttributes>
) => {
  try {
    // Verificamos si el usuario existe
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      throw new Error("usuario no encontrado");
    }

    // Actualizamos el usuario con los datos recibidos
    await usuario.update(usuarioData);
    return usuario;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};

// Eliminar usuario
const deleteUsuario = async (usuarioId: number): Promise<boolean> => {
  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      throw new Error("usuario no encontrado");
    }

    await usuario.destroy(); // Eliminamos el usuario
    return true;
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw error;
  }
};

const usuarioRepository = {
  getUsuarios,
  getUsuario,
  getUsuarioByName,
  getUsuarioByEmail,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};

export default usuarioRepository;
