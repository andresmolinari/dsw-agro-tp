import { Router } from "express";
import { controller } from "../campo/campo.controller.js";

const campoRouter = Router();

campoRouter.get("/", controller.getCampos);
campoRouter.get("/:campoId", controller.getCampo);
campoRouter.post("/", controller.createCampo);
campoRouter.put('/:campoId',controller.updatecampo);
campoRouter.delete('/:campoId', controller.deletecampo);

export default campoRouter;
