import { Lote, LoteAttributes } from "../models/lote";

//obtener todos los lotes
const getLotes = async (campoId: number): Promise<Lote[]> => {
  try {
    return await Lote.findAll({
      where: { campoId },
    });
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

//obtener un lote
const getLote = async (
  loteId: number,
  campoId: number
): Promise<Lote | null> => {
  try {
    const lote = await Lote.findOne({
      where: { loteId: loteId, campoId: campoId },
    });
    return lote;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// obtener lote por nombre
const getLoteByName = async (
  loteNro: number,
  campoId: number
): Promise<Lote | null> => {
  try {
    const lote = await Lote.findOne({
      where: { loteNro, campoId: campoId },
    });
    return lote;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// Crear un lote

const createLote = async (loteData: LoteAttributes): Promise<Lote> => {
  try {
    return await Lote.create(loteData);
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// Modificar lote
const updateLote = async (
  loteId: number,
  loteData: Partial<LoteAttributes>
) => {
  try {
    // Verificamos si el lote existe
    const lote = await Lote.findByPk(loteId);

    if (!lote) {
      throw new Error("lote no encontrado");
    }

    // Actualizamos el lote con los datos recibidos
    await lote.update(loteData);
    return lote;
  } catch (error) {
    console.error("Error actualizando lote:", error);
    throw error;
  }
};

// Eliminar lote
const deleteLote = async (loteId: number): Promise<boolean> => {
  try {
    const lote = await Lote.findByPk(loteId);

    if (!lote) {
      throw new Error("lote no encontrado");
    }

    await lote.destroy(); // Eliminamos el campo
    return true;
  } catch (error) {
    console.error("Error eliminando lote:", error);
    throw error;
  }
};

const loteRepository = {
  getLotes,
  getLote,
  getLoteByName,
  createLote,
  updateLote,
  deleteLote,
};

export default loteRepository;
