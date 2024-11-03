// controllers/OrdenTrabajoController.ts
import { Request, Response } from 'express';
import { ordenTrabajoRepository } from '../repositories/ordenTrabajo.repository';
import { getUserFromToken } from '../services/user.services';
import loteRepository from '../repositories/lote.repository';


  const createOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    const { fecha,tipo, loteId, campoId,detalle } = req.body;
    // Obtenemos el usuario desde el token
    const token = req.headers.authorization || "";
    const user = getUserFromToken(token);

    if (user) {
      console.log(user.usuarioId);
    }
    try {

      if (!user) {
        res.status(401).json({ message: "Usuario no autorizado" });
        return;
      }
      const lote = await loteRepository.getLote(loteId, campoId);
      if (!lote) {
        res.status(404).json({ message: "Lote no encontrado" });
        return;
      }
      const costoTotal = detalle.precio * lote.loteHectareas;
     
      const orden = await ordenTrabajoRepository.createOrdenTrabajo(
        fecha,
        tipo,
        loteId,
        detalle,
        user.usuarioId,
        costoTotal
      );
    
       res.status(201).json({
        message: 'Orden de trabajo creada exitosamente',
        orden
      });
    } catch (error) {
      console.error(error);
     res.status(500).json({
        message: 'Error al crear la orden de trabajo',
        error: (error as Error).message
      });
    }
  }

  const getOrdenesTrabajo = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization || "";
    const user = getUserFromToken(token);
    if (!user) {
      res.status(401).json({ message: "Usuario no autorizado" });
      return;
    }
    try {
      const ordenes = await ordenTrabajoRepository.getOrdenesTrabajo(user.usuarioId);
      res.status(200).json(ordenes);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error al obtener las ordenes de trabajo',
        error: (error as Error).message
      });
    }
  };

export const controller = {
  // sanitizeClienteInput,
  createOrdenTrabajo,
  getOrdenesTrabajo
};



