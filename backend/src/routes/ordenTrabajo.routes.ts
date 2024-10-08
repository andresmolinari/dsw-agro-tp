import { Router } from "express";
import validateToken from "../services/validate-token";
import { controller } from '../controllers/ordenTrabajo.controller';


const ordenTrabajoRouter = Router();

ordenTrabajoRouter.get("/", validateToken, controller.getOrdenesTrabajo);
//ordenTrabajoRouter.get("/:campoId/:loteId", validateToken, controller.getOrdenTrabajo);
ordenTrabajoRouter.post("/", validateToken, controller.createOrdenTrabajo);
//ordenTrabajoRouter.put("/:campoId/:loteId", validateToken, controller.updateOrdenTrabajo);
//ordenTrabajoRouter.delete("/:campoId/:loteId", validateToken, controller.deleteOrdenTrabajo);

export default ordenTrabajoRouter;
