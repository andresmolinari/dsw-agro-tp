// repositories/OrdenTrabajoRepository.ts
import { OrdenTrabajo } from "../models/ordenTrabajo";
import { Cosecha } from "../models/cosecha";
import { Siembra } from "../models/siembra";
import { Fumigacion } from "../models/fumigacion";
import { Transaction } from "sequelize";
import sequelize from "../db/connection"; // tu instancia de Sequelize

const createOrdenTrabajo = async (
  tipo: string,
  loteId: number,
  usuarioId: number,
  detalle: any
): Promise<OrdenTrabajo> => {
  return await sequelize.transaction(async (t: Transaction) => {
    // Crear la orden de trabajo
    const orden = await OrdenTrabajo.create(
      {
        tipo: tipo,
        loteId: loteId,
        fecha: new Date(), // Asignar la fecha de hoy
        usuarioId: usuarioId,
        costoTotal: detalle.precio,
      },
      { transaction: t }
    );

    // Ahora que tenemos el nroOrdenTrabajo generado, creamos el detalle
    if (tipo === "cosecha") {
      await Cosecha.create(
        {
          rendimiento: detalle.rendimiento,
          precio: detalle.precio,
          OrdenTrabajoId: orden.nroOrdenTrabajo, // Aquí se utiliza correctamente
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
