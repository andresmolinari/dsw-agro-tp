import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any; // o JwtPayload si querés tipar mejor
}

const validateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];

  if (headerToken && headerToken.startsWith("Bearer ")) {
    try {
      const bearerToken = headerToken.slice(7);
      const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY || "moli96");

      req.user = decoded; // Agregamos el usuario decodificado a la solicitud
      next();
    } catch (error) {
      res.status(401).json({ msg: "Token no válido" });
    }
  } else {
    res.status(401).json({ msg: "Acceso denegado" });
  }
};

export default validateToken;


export function isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const user = req.user;
  if (!user || user.rolId !== 2) { 
    return res.status(403).json({ message: "Acceso solo para administradores" });
  }
  next();
}