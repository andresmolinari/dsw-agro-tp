import { Router } from 'express';
import { controller } from './cliente.controller.js';

export const clienteRouter = Router();

clienteRouter.get('/', controller.findAll);
clienteRouter.get('/:nroCliente', controller.findOne);
clienteRouter.post('/', controller.sanitizeClienteInput, controller.add);
clienteRouter.put(
  '/:nroCliente',
  controller.sanitizeClienteInput,
  controller.update
);
clienteRouter.patch(
  '/:nroCliente',
  controller.sanitizeClienteInput,
  controller.update
);
clienteRouter.delete('/:nroCliente', controller.remove);
