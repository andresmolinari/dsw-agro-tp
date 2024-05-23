import { Request, Response, NextFunction } from 'express';
import { ClienteRepository } from './cliente.repository.js';
import { Cliente } from './cliente.entity.js';

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

// obtener un cliente
function findOne(req: Request, res: Response) {
  const nroCliente = req.params.nroCliente;
  const cliente = repository.findOne({ nroCliente });
  if (!cliente) {
    return res.status(404).send({ message: 'cliente not found' });
  }
  res.json({ data: cliente });
}

// crear cliente
function add(req: Request, res: Response) {
  const input = req.body.sanitizedCliente;

  const clienteInput = new Cliente(
    input.nroCliente,
    input.nombre,
    input.mail,
    input.telefono,
    input.direccion,
    input.localidad,
    input.provincia
  );

  const cliente = repository.add(clienteInput);
  return res.status(201).send({ message: 'cliente creado', data: cliente });
}

// modificar cliente completo
function update(req: Request, res: Response) {
  req.body.sanitizedCliente.nroCliente = req.params.nroCliente;
  const cliente = repository.update(req.body.sanitizedCliente); //le pasamos el sanitizado

  if (!cliente) {
    return res.status(404).send({ message: 'Cliente not found' });
  }

  return res
    .status(200)
    .send({ message: 'cliente modificado correctamente', data: cliente });
}

// borrar un cliente
function remove(req: Request, res: Response) {
  const nroCliente = req.params.nroCliente;
  const cliente = repository.delete({ nroCliente });

  if (!cliente) {
    res.status(404).send({ message: 'Cliente not found' });
  } else {
    res.status(200).send({ message: 'cliente deleted successfully' });
  }
}

export const controller = {
  sanitizeClienteInput,
  findAll,
  findOne,
  add,
  update,
  remove,
};
