import { Router } from "express";
import { controller } from "./cliente.controller.js";
export const clienteRouter = Router();
clienteRouter.get('/', controller.findAll);
//# sourceMappingURL=cliente.routes.js.map