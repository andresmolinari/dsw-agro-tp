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

  // Validamos si el usuario existe en la base de datos

  const user: any = await usuarioRepository.getUsuarioByName(name);

  if (!user) {
    return res.status(400).json({
      msg: `No existe un usario con el nombre ${name} en la base de datos`,
    });
  }

  // Validamos password
  console.log({ plain: password, hashed: user.usuarioContraseña });
  const passwordValid = await bcrypt.compare(password, user.usuarioContraseña);

  if (!passwordValid) {
    return res.status(400).json({
      msg: `Password incorrecta`,
    });
  }

  // Generamos token
  const token = jwt.sign(
    {
      usuarioId: user.usuarioId,
      usuarioNombre: name,
      rolId: user.rolId,
    },
    process.env.SECRET_KEY || "moli123",
    {
      expiresIn: 1800,
    }
  );
  console.log(user.usuarioId);
  res.json(token);
};

// modificar usuario
const updateUsuario = async (req: Request, res: Response): Promise<void> => {
  const { usuarioId } = req.params;
  const { usuarioEmail, usuarioContraseña } = req.body;

  const hashedPassword = await bcrypt.hash(usuarioContraseña, 10);
  try {
    // Obtenemos el usuario actual por su ID
    const usuarioActual = await usuarioRepository.getUsuario(
      parseInt(usuarioId)
    );

    if (!usuarioActual) {
      res.status(404).json({ message: "usuario no encontrado" });
      return;
    }

    // Si el nombre ha cambiado, validamos que no exista otro usuario con el mismo nombre
    if (usuarioActual && usuarioEmail !== usuarioActual.usuarioEmail) {
      const existeEmail = await usuarioRepository.getUsuarioByEmail(
        usuarioEmail
      );

      if (existeEmail) {
        res.status(400).json({ message: "Ya existe un usuario con ese email" });
        return;
      }
    }

    // Realizamos la actualización solo con los campos que se enviaron
    const updatedUsuario = await usuarioRepository.updateUsuario(
      parseInt(usuarioId),
      {
        usuarioEmail: usuarioEmail || usuarioActual.usuarioEmail, // Si no se envía un nuevo nombre, mantenemos el nombre actual
        usuarioContraseña: hashedPassword || usuarioActual.usuarioContraseña,
      }
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
