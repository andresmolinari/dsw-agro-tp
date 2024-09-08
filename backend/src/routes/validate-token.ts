import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];

  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    //tiene token
    try {
      const bearerToken = headerToken.slice(7);

      jwt.verify(bearerToken, process.env.SECRET_KEY || "moli96");

      next();
    } catch (error) {
      res.status(401).json({
        msg: "Token no válido",
      });
    }
  
  } else {
    res.status(401).json({
      msg: "Acceso denegado",
    });
  }
};

export default validateToken;
