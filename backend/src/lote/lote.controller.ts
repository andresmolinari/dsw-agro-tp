import { Request, Response } from "express";
import loteRepository from "./lote.repository";


// obtener todos los lotes
const getLotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const campoId = parseInt(req.params.campoId, 10);
    const lotes = await loteRepository.getLotes(campoId);
    res.status(200).json(lotes);
  } catch (error) {
    console.error(error); // Log para entender el error
    res.status(500).json({ message: "Error al obtener lotes" });
  }
};

// // obtener un lote
const getLote = async (req: Request, res: Response): Promise<void> => {
  try {
    const loteId = parseInt(req.params.loteId, 10);
    const campoId = parseInt(req.params.loteId, 10);

    const lote = await loteRepository.getLote(loteId, campoId);

    res.status(200).json(lote);
  } catch (error) {
    console.error(error); // Log para entender el error
    res.status(500).json({ message: "Error al obtener un lote" });
  }
};

// crear un lote
const createLote = async (req: Request, res: Response): Promise<void> => {
  try {
    const campoId = parseInt(req.params.campoId, 10);
    const {  loteNro, loteHectareas } = req.body;

    if (!campoId || !loteNro) {
      res.status(400).json({ message: "El nombre es requerido" });
      return;
    }
  
    const existeNombre = await loteRepository.getLoteByName(loteNro, campoId);
  
    if (existeNombre && existeNombre.loteNro === loteNro) {
      res.status(400).json({ message: "Ya existe un lote con ese nombre" });
      return;
    }

    const newLote = await loteRepository.createLote(
      {campoId, loteNro, loteHectareas}
    );
    res.status(201).json(newLote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear lote" });
  }
};

// modificar lote
const updateLote = async (req: Request, res: Response): Promise<void> => {
  const campoId = parseInt(req.params.campoId, 10);
  const  loteId  = parseInt(req.params.loteId, 10);
  const {loteNro, loteHectareas } = req.body;

  try {
    // Obtenemos el lote actual por su ID
    const loteActual = await loteRepository.getLote(loteId, campoId);

    if (!loteActual) {
      res.status(404).json({ message: "lote no encontrado" });
      return;
    }

    // Realizamos la actualización solo con los lotes que se enviaron
    const updatedLote = await loteRepository.updateLote(loteId, {
      
      loteNro: loteNro,
      loteHectareas: loteHectareas
    });

    // Retornar la respuesta exitosa
    res.status(200).json(updatedLote);
  } catch (error) {
    console.error("Error al actualizar lote:", error);
    res.status(500).json({ message: "Error al actualizar lote" });
  }
};

// borrar un lote
const deleteLote = async (req: Request, res: Response): Promise<void> => {
  const { loteId } = req.params;

  try {
    const loteEliminado = await loteRepository.deleteLote(
      parseInt(loteId)
    );

    if (loteEliminado) {
      res.status(200).json({ message: "lote eliminado correctamente" });
    } else {
      res.status(404).json({ message: "lote no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar lote:", error);
    res.status(500).json({ message: "Error al eliminar lote" });
  }
};

export const controller = {
  getLotes,
  getLote,
  createLote,
  updateLote,
  deleteLote,
};
