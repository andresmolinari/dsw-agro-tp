import { Router } from "express";
import validateToken from "./validate-token";
import { controller } from "../controllers/lote.controller";


const loteRouter = Router();

loteRouter.get("/:campoId", validateToken, controller.getLotes);
loteRouter.get("/:campoId/:loteId", validateToken, controller.getLote);
loteRouter.post("/:campoId", validateToken, controller.createLote);
loteRouter.put("/:campoId/:loteId", validateToken, controller.updateLote);
loteRouter.delete("/:campoId/:loteId", validateToken, controller.deleteLote);

export default loteRouter;
