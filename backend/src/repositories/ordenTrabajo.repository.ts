// repositories/OrdenTrabajoRepository.ts
import { OrdenTrabajo } from "../models/ordenTrabajo";
import { Cosecha } from "../models/cosecha";
import { Siembra } from "../models/siembra";
import { Fumigacion } from "../models/fumigacion";
import { DateOnlyDataType, Transaction } from "sequelize";
import sequelize from "../db/connection"; 

const createOrdenTrabajo = async (
  fecha: DateOnlyDataType,
  tipo: string,
  loteId: number,
  detalle: any,
  usuarioId: number,
  costoTotal: number
): Promise<OrdenTrabajo> => {
  return await sequelize.transaction(async (t: Transaction) => {
    // Crear la orden de trabajo
    
    const orden = await OrdenTrabajo.create(
      {
        fecha: fecha,
        tipo: tipo,
        loteId: loteId,
        usuarioId: usuarioId,
        costototal: costoTotal,
      },
      { transaction: t }
    );

    // creamos el detalle
    if (tipo === "cosecha") {
      await Cosecha.create(
        {
          rendimiento: detalle.rendimiento,
          precio: detalle.precio,
          OrdenTrabajoId: orden.nroOrdenTrabajo,
        },
        { transaction: t }
      );
    } else if (tipo === "siembra") {
      await Siembra.create(
        {
          variedad: detalle.variedad,
          kilos: detalle.kilos,
          precio: detalle.precio,
          OrdenTrabajoId: orden.nroOrdenTrabajo,
        },
        { transaction: t }
      );
    } else if (tipo === "fumigacion") {
      await Fumigacion.create(
        {
          producto: detalle.producto,
          dosis: detalle.dosis,
          precio: detalle.precio,
          OrdenTrabajoId: orden.nroOrdenTrabajo,
        },
        { transaction: t }
      );
    }

    return orden;
  });
};

const getOrdenesTrabajo = async (
  usuarioId: number
): Promise<OrdenTrabajo[]> => {
  try {
    return await OrdenTrabajo.findAll({
      where: { usuarioId: usuarioId },
      include: [Cosecha, Siembra, Fumigacion],
    });
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

export const ordenTrabajoRepository = {
  createOrdenTrabajo,
  getOrdenesTrabajo,
};
