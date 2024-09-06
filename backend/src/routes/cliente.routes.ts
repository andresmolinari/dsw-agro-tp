import { Router } from "express";
import { controller } from "../cliente/cliente.controller.js";

const clienteRouter = Router();

clienteRouter.get("/", controller.getClientes);
clienteRouter.get("/:id", controller.getCliente);
clienteRouter.post("/", controller.createCliente);
clienteRouter.put('/:id',controller.updateCliente);
clienteRouter.delete('/:id', controller.deleteCliente);

export default clienteRouter;
