import { Router } from "express";
import { controller } from "../controllers/cliente.controller.js";
import validateToken from "../services/validate-token.js";

const clienteRouter = Router();

clienteRouter.get("/", validateToken, controller.getClientes);
clienteRouter.get("/:clienteId", validateToken, controller.getCliente);
clienteRouter.post("/", validateToken, controller.createCliente);
clienteRouter.put("/:clienteId",validateToken,controller.updateCliente);
clienteRouter.delete("/:clienteId", validateToken, controller.deleteCliente);

export default clienteRouter;
