import { Router } from "express";
import { controller } from "../controllers/usuario.controller";
import validateToken from "../services/validate-token";
import { isAdmin } from "../services/validate-token";

const usuarioRouter = Router();

// usuarioRouter.get("/", controller.getUsuarios);
usuarioRouter.get("/:usuarioId", controller.getUsuario);
usuarioRouter.post("/", controller.createUsuario);
usuarioRouter.post("/login", controller.loginUser);
//usuarioRouter.put("/:usuarioId", validateToken, controller.updateUsuario);
//usuarioRouter.delete("/:usuarioId", validateToken, controller.deleteUsuario);

//  Rutas que requieren token y rol admin
usuarioRouter.get("/", validateToken, isAdmin, controller.getUsuarios); // Listar todos los usuarios
usuarioRouter.put("/:usuarioId", validateToken, isAdmin, controller.updateUsuario); // Modificar usuario
usuarioRouter.delete("/:usuarioId", validateToken, isAdmin, controller.deleteUsuario); // Eliminar usuario


export default usuarioRouter;
