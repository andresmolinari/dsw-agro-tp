import { Cliente } from "./cliente.entity.js";
const clientes = [
    new Cliente('1', 'Juan Doe', 'juandoe@gmail.com', '3382445566', 'catamarca 349', 'rufino', 'sante fe'),
];
export class ClienteRepository {
    //obtener todos los clientes
    findAll() {
        return clientes;
    }
}
//# sourceMappingURL=cliente.repository.js.map