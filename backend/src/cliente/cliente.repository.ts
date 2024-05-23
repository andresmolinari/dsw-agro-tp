import { Repository } from "../shared/repository.js";
import { Cliente } from "./cliente.entity.js";

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
]

export class ClienteRepository implements Repository<Cliente> {

  //obtener todos los clientes
  public findAll(): Cliente[] | undefined {
    return clientes
  }
}