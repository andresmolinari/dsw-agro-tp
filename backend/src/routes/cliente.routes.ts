import { Router } from "express";
import { controller } from "../cliente/cliente.controller.js";

const clienteRouter = Router();

clienteRouter.get("/", controller.getClientes);
clienteRouter.get("/:clienteId", controller.getCliente);
clienteRouter.post("/", controller.createCliente);
clienteRouter.put('/:clienteId',controller.updateCliente);
clienteRouter.delete('/:clienteId', controller.deleteCliente);

export default clienteRouter;
