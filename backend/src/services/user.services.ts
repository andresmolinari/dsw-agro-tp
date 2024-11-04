import { Usuario } from '../models/usuario';
import jwt, { JwtPayload } from 'jsonwebtoken';
import usuarioRepository from '../repositories/usuario.repository';

export const getUserFromToken = (token: string): JwtPayload | null => {
  try {
    // Verificamos el token
    const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(
      bearerToken,
      process.env.SECRET_KEY!
    ) as JwtPayload;
    console.log('Token decodificado:', decoded);
    // Buscamos el usuario en la base de datos 
    //  const user = users.find(user => user.id === decoded.id);
    // Validamos si el usuario existe en la base de datos
    // const user: any = await usuarioRepository.getUsuario(decoded.);

    //if (!user) {
    //return res.status(400).json({
    //  msg: `No existe un usario con el nombre ${name} en la base de datos`,
    //  });
    // }
    // Si se encuentra el usuario, lo devolvemos.
    return decoded;
  } catch (error) {
    console.error('Token no válido:', error);
    return null;
  }
};
