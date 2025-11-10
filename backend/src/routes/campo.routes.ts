import { Router } from "express";
import { controller } from "../controllers/campo.controller";
import validateToken from "../services/validate-token";

const campoRouter = Router();

campoRouter.get("/:clienteId", validateToken, controller.getCampos);
campoRouter.get("/campo/:campoId", validateToken, controller.getCampo);
campoRouter.post("/:clienteId", validateToken, controller.createCampo);
campoRouter.put("/:campoId", validateToken, controller.updatecampo);
campoRouter.delete("/:campoId", validateToken, controller.deletecampo);

export default campoRouter;
