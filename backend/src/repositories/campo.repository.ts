import { Campo, CampoAttributes } from "../models/campo";
import { Lote } from "../models/lote";

//obtener todos los campos
const getCampos = async (clienteId: number): Promise<Campo[]> => {
  try {
    return await Campo.findAll({
      where: { clienteId },
      include: [
        {
          model: Lote,
          attributes: [
            "loteId",
            "loteNro",
            "loteHectareas",
          ],
          as: "lotes",
        },
      ],
    });
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

//obtener un campo
const getCampo = async (
   campoId: number
 
): Promise<Campo | null> => {
  try {
    const campo = await Campo.findOne({
      where: { campoId: campoId  },
      include: [
        {
          model: Lote,
          attributes: [
            "loteId",
            "loteNro",
            "loteHectareas",
          ],
          as: "lotes",
        },
      ],
    });
    return campo;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// obtener campo por nombre
const getCampoByName = async (
  campoNombre: string,
  clienteId: number
): Promise<Campo | null> => {
  if (!clienteId) {
    throw new Error("clienteId es requerido");
  }

  try {
    const campo = await Campo.findOne({
      where: { campoNombre, clienteId },
    });

    return campo;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};


// Crear un campo

const createCampo = async (campoData: CampoAttributes): Promise<Campo> => {
  try {
    return await Campo.create(campoData);
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// Modificar campo
const updateCampo = async (
  campoId: number,
  campoData: Partial<CampoAttributes>
) => {
  try {
    // Verificamos si el campo existe
    const campo = await Campo.findByPk(campoId);

    if (!campo) {
      throw new Error("Campo no encontrado");
    }

    // Actualizamos el campo con los datos recibidos
    await campo.update(campoData);
    return campo;
  } catch (error) {
    console.error("Error actualizando campo:", error);
    throw error;
  }
};

// Eliminar campo
const deleteCampo = async (campoId: number): Promise<boolean> => {
  try {
    const campo = await Campo.findByPk(campoId);

    if (!campo) {
      throw new Error("Campo no encontrado");
    }

    await campo.destroy(); // Eliminamos el cliente
    return true;
  } catch (error) {
    console.error("Error eliminando campo:", error);
    throw error;
  }
};

const campoRepository = {
  getCampos,
  getCampo,
  getCampoByName,
  createCampo,
  updateCampo,
  deleteCampo,
};

export default campoRepository;
