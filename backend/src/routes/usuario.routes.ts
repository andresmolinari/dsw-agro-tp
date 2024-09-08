import { Router } from "express";
import { controller } from "../usuario/usuario.controller.js";
import validateToken from "./validate-token.js";

const usuarioRouter = Router();

// usuarioRouter.get("/", controller.getUsuarios);
usuarioRouter.get("/:usuarioId", controller.getUsuario);
usuarioRouter.post("/", controller.createUsuario);
usuarioRouter.post("/login", controller.loginUser);
usuarioRouter.put("/:usuarioId", validateToken, controller.updateUsuario);
usuarioRouter.delete("/:usuarioId", validateToken, controller.deleteUsuario);

export default usuarioRouter;
