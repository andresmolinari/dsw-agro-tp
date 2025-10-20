import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usuarioRepository from "../repositories/usuario.repository";
import { Usuario } from "../models/usuario";
import { get } from "http";

// sanitizacion middleware
// function sanitizeusuarioInput(req: Request, res: Response, next: NextFunction) {
//   req.body.sanitizedusuario = {
//     usuarioId: req.body.nrousuario,
//     nombre: req.body.nombre,
//     mail: req.body.mail,
//     telefono: req.body.telefono,
//     direccion: req.body.direccion,
//     localidad: req.body.localidad,
//     provincia: req.body.provincia,
//   };

//   //nos quedamos con los elementos que son not null para el patch
//   Object.keys(req.body.sanitizedusuario).forEach((key) => {
//     if (req.body.sanitizedusuario[key] === undefined) {
//       delete req.body.sanitizedusuario[key];
//     }
//   });
//   next();
// }

// obtener todos los usuarios
const getUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await usuarioRepository.getUsuarios();

    // Excluir el campo usuarioContraseña de la respuesta
    const usuariosSinPassword = usuarios.map((u: any) => {
      const { usuarioContraseña, ...rest } = u.toJSON(); // Sequelize instance
      return rest;
    });

    res.status(200).json(usuariosSinPassword);
  } catch (error) {
    console.error(error); // Log para entender el error
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

//  obtener un usuario
const getUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = parseInt(req.params.usuarioId, 10);

    const usuario = await usuarioRepository.getUsuario(usuarioId);

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error); // Log para entender el error
    res.status(500).json({ message: "Error al obtener un usuario" });
  }
};

// Registrar usuario
const createUsuario = async (req: Request, res: Response): Promise<void> => {
  const { usuarioNombre, usuarioEmail, usuarioContraseña } = req.body;

  const rolId = 1; // Asignar rol de usuario por defecto

  if (!usuarioNombre || !usuarioEmail || !usuarioContraseña) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }

  const existeNombre = await usuarioRepository.getUsuarioByName(usuarioNombre);
  const existeEmail = await usuarioRepository.getUsuarioByEmail(usuarioEmail);

  if (existeNombre && existeNombre.usuarioNombre === usuarioNombre) {
    res.status(400).json({ message: "Ya existe un usuario con ese nombre" });
    return;
  }

  if (existeEmail && existeEmail.usuarioEmail === usuarioEmail) {
    res.status(400).json({ message: "Ya existe un usuario con ese email" });
    return;
  }

  const hashedPassword = await bcrypt.hash(usuarioContraseña, 10);

  try {
    const newUsuario = await usuarioRepository.createUsuario(
      usuarioNombre,
      usuarioEmail,
      hashedPassword,
      rolId
    );
    res.status(201).json(newUsuario);
  } catch (error) {
    console.error(error); // Log para entender el error
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

// Login
export const loginUser = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const secret = process.env.SECRET_KEY;

  // 1. Validación de Seguridad Crítica
  if (!secret) {
    console.error("FATAL ERROR: SECRET_KEY no está definida.");
    // No le damos detalles al cliente, solo al log del servidor.
    return res.status(500).json({
      msg: "Error interno del servidor.",
    });
  }

  try {
    // 2. Validamos si el usuario existe en la base de datos
    const user: any = await usuarioRepository.getUsuarioByName(name);

    // 3. Mensaje de error genérico y seguro
    // Comparamos el hash incluso si el usuario no existe para evitar "timing attacks"
    // (aunque bcrypt.compare es lento de por sí).
    // Si el usuario no existe, creamos un hash falso para comparar.
    const hashFalso = "$2b$10$fakedummypasswordforsecu.aB.CDEfGHijklm";
    const userPassword = user ? user.usuarioContraseña : hashFalso;

    const passwordValid = await bcrypt.compare(password, userPassword);

    if (!user || !passwordValid) {
      return res.status(400).json({
        msg: `Usuario o contraseña incorrectos`, // Mensaje unificado
      });
    }

    // 4. Generamos token
    const token = jwt.sign(
      {
        usuarioId: user.usuarioId,
        usuarioNombre: name,
        rolId: user.rolId,
      },
      secret, // Usar la variable segura
      {
        expiresIn: 1800, // 30 minutos
      }
    );
    
    console.log(user.usuarioId);
    res.json(token);

  } catch (error) {
    // 5. Captura de errores generales (DB, bcrypt, etc.)
    console.error("Error en loginUser:", error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

// modificar usuario
const updateUsuario = async (req: Request, res: Response): Promise<void> => {
  const { usuarioId } = req.params;
  // Obtenemos solo los campos que PUEDEN ser actualizados
  const { usuarioEmail, usuarioContraseña } = req.body;

  try {
    // 1. Obtenemos el usuario actual por su ID
    const usuarioActual = await usuarioRepository.getUsuario(
      parseInt(usuarioId)
    );

    if (!usuarioActual) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // 2. Creamos un objeto para los datos a actualizar
    const updateData: Partial<Usuario> = {};

    // 3. Validar y actualizar Email (si se proporcionó y es diferente)
    if (usuarioEmail && usuarioEmail !== usuarioActual.usuarioEmail) {
      const existeEmail = await usuarioRepository.getUsuarioByEmail(
        usuarioEmail
      );

      if (existeEmail) {
        res.status(400).json({ message: "Ya existe un usuario con ese email" });
        return;
      }
      updateData.usuarioEmail = usuarioEmail; // Añadimos al objeto de actualización
    }

    // 4. Validar y actualizar Contraseña (solo si se proporcionó)
    if (usuarioContraseña) {
      // Solo hasheamos si se provee una nueva contraseña
      const hashedPassword = await bcrypt.hash(usuarioContraseña, 10);
      updateData.usuarioContraseña = hashedPassword; // Añadimos al objeto
    }

    // 5. Verificar si hay algo que actualizar
    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ message: "No se proporcionaron datos para actualizar" });
      return;
    }

    // 6. Realizamos la actualización solo con los campos que cambiaron
    const updatedUsuario = await usuarioRepository.updateUsuario(
      parseInt(usuarioId),
      updateData // Pasamos el objeto solo con los campos nuevos
    );

    // Retornar la respuesta exitosa
    res.status(200).json(updatedUsuario);

  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// borrar un usuario
const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
  const { usuarioId } = req.params;

  try {
    const usuarioEliminado = await usuarioRepository.deleteUsuario(
      parseInt(usuarioId)
    );

    if (usuarioEliminado) {
      res.status(200).json({ message: "usuario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

export const controller = {
  getUsuarios,
  getUsuario,
  createUsuario,
  loginUser,
  updateUsuario,
  deleteUsuario,
};
