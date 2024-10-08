// controllers/OrdenTrabajoController.ts
import { Request, Response } from 'express';
import { ordenTrabajoRepository } from '../repositories/ordenTrabajo.repository';
import { getUserFromToken } from '../services/user.services';


  const createOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
    const { tipo, loteId, detalle } = req.body;
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
      // Llama al repository para crear la orden
      const orden = await ordenTrabajoRepository.createOrdenTrabajo(
        tipo,
        loteId,
        user.usuarioId,
        detalle
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



