// controllers/OrdenTrabajoController.ts
import { Request, Response } from "express";
import { ordenTrabajoRepository } from "../repositories/ordenTrabajo.repository";
import { getUserFromToken } from "../services/user.services";
import loteRepository from "../repositories/lote.repository";
import PDFDocument from "pdfkit";

const createOrdenTrabajo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { fecha, tipo, loteId, campoId, detalle } = req.body;
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
      message: "Orden de trabajo creada exitosamente",
      orden,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la orden de trabajo",
      error: (error as Error).message,
    });
  }
};

const getOrdenesTrabajo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.headers.authorization || "";
  const user = getUserFromToken(token);
  if (!user) {
    res.status(401).json({ message: "Usuario no autorizado" });
    return;
  }
  try {
    const ordenes = await ordenTrabajoRepository.getOrdenesTrabajo(
      user.usuarioId
    );
    res.status(200).json(ordenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las ordenes de trabajo",
      error: (error as Error).message,
    });
  }
};

const getOrdenTrabajoById = async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization || "";
  const user = getUserFromToken(token);

  if (!user) {
    res.status(401).json({ message: "Usuario no autorizado" });
    return;
  }

  const id = Number(req.params.nroOrdenTrabajo);
  if (isNaN(id)) {
    res.status(400).json({ message: "Id de orden inválido" });
    return;
  }

  try {
    const orden = await ordenTrabajoRepository.getOrdenTrabajoById(id, user.usuarioId);
    if (!orden) {
      res.status(404).json({ message: "Orden no encontrada" });
      return;
    }

    res.status(200).json(orden);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la orden", error: (error as Error).message });
  }
};

const descargarOrdenTrabajo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nroOrdenTrabajo } = req.params;
    const token = req.headers.authorization || '';
    const user = getUserFromToken(token);

    if (!user) {
      res.status(401).json({ message: 'Usuario no autorizado' });
      return;
    }

    // Buscar la orden
    const orden = await ordenTrabajoRepository.getOrdenTrabajoById(Number(nroOrdenTrabajo), user.usuarioId);

    console.log("Orden a generar PDF:", orden);

    if (!orden) {
      res.status(404).json({ message: 'Orden no encontrada' });
      return;
    }

    // Configurar headers
    res.setHeader('Content-Disposition', `attachment; filename=orden-${orden.nroOrdenTrabajo}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');

    // Crear PDF
    const doc = new PDFDocument();
    doc.pipe(res);

    // Encabezado
    doc.fontSize(18).text('Orden de Trabajo', { align: 'center' });
    doc.moveDown();

    // Datos generales
    doc.fontSize(12).text(`N° Orden: ${orden.nroOrdenTrabajo}`);
    doc.text(`Fecha: ${new Date(orden.fecha).toLocaleDateString()}`);
    doc.text(`Tipo: ${orden.tipo}`);
    doc.text(`Cliente: ${orden.lote?.campo?.cliente?.clienteNombre}`);
    doc.text(`Campo: ${orden.lote?.campo?.campoNombre}`);
    doc.text(`Lote: ${orden.lote?.loteNro}`);
    doc.moveDown();

    // Detalle según tipo
    if (orden.tipo === 'cosecha' && orden.Cosecha) {
      doc.text(`Rendimiento: ${orden.Cosecha.rendimiento}`);
      doc.text(`Precio: $${orden.Cosecha.precio}`);
    } else if (orden.tipo === 'siembra' && orden.Siembra) {
      doc.text(`Variedad: ${orden.Siembra.variedad}`);
      doc.text(`Kilos: ${orden.Siembra.kilos}`);
      doc.text(`Precio: $${orden.Siembra.precio}`);
    } else if (orden.tipo === 'fumigacion' && orden.Fumigacion) {
      doc.text(`Producto: ${orden.Fumigacion.producto}`);
      doc.text(`Dosis: ${orden.Fumigacion.dosis}`);
      doc.text(`Precio: $${orden.Fumigacion.precio}`);
    }

    doc.moveDown();
    doc.fontSize(14).text(`Costo Total: $${orden.costototal}`, { underline: true });

    // Finalizar PDF
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el PDF' });
  }
};

export const controller = {
  createOrdenTrabajo,
  getOrdenesTrabajo,
  getOrdenTrabajoById,
  descargarOrdenTrabajo,
};
