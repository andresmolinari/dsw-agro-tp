import { Request, Response, NextFunction } from 'express';
import { ClienteRepository } from './cliente.repository.js';

const repository = new ClienteRepository(); //seria el acceso a la base de datos

// sanitizacion middleware
function sanitizeClienteInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedCliente = {
    nroCliente: req.body.nroCliente,
    nombre: req.body.nombre,
    mail: req.body.mail,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    localidad: req.body.localidad,
    provincia: req.body.provincia,
  };

  //nos quedamos con los elementos que son not null para el patch
  Object.keys(req.body.sanitizedCliente).forEach((key) => {
    if (req.body.sanitizedCliente[key] === undefined) {
      delete req.body.sanitizedCliente[key];
    }
  });
  next();
}

// obtener todos los clientes
function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() });
}

export const controller = {
  sanitizeClienteInput,
  findAll,
};
