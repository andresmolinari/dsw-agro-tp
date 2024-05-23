import { Repository } from '../shared/repository.js';
import { Cliente } from './cliente.entity.js';

const clientes = [
  new Cliente(
    '1',
    'Juan Doe',
    'juandoe@gmail.com',
    '3382445566',
    'catamarca 349',
    'rufino',
    'sante fe'
  ),
];

export class ClienteRepository implements Repository<Cliente> {
  //obtener todos los clientes
  public findAll(): Cliente[] | undefined {
    return clientes;
  }

  //obtener un cliente
  public findOne(item: { nroCliente: string }): Cliente | undefined {
    return clientes.find((cliente) => cliente.nroCliente === item.nroCliente);
  }

  //crear un cliente
  public add(item: Cliente): Cliente | undefined {
    clientes.push(item);
    return item;
  }

  // modificar un cliente
  public update(item: Cliente): Cliente | undefined {
    const clienteNrox = clientes.findIndex(
      (cliente) => cliente.nroCliente === item.nroCliente
    );

    if (clienteNrox !== -1) {
      clientes[clienteNrox] = { ...clientes[clienteNrox], ...item };
    }
    return clientes[clienteNrox];
  }

  // eliminar un cliente
  public delete(item: { nroCliente: string }): Cliente | undefined {
    const clienteNrox = clientes.findIndex(
      (cliente) => cliente.nroCliente === item.nroCliente
    );

    if (clienteNrox !== -1) {
      const deletedCliente = clientes[clienteNrox];
      clientes.splice(clienteNrox, 1);
      return deletedCliente;
    }
  }
}
