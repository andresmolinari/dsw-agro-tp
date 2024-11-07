import { AxiosResponse } from 'axios';
import { Cliente } from '../types/Cliente';
import HttpClient from './axiosInstance';
import { Campo } from '../types/Campo';

class ClienteService {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  getAllClientes(): Promise<AxiosResponse<Cliente[]>> {
    return HttpClient.get<Cliente[]>(`${this.path}/misClientes`);
  }

  getAllCamposByClienteId(clienteId: string): Promise<AxiosResponse<Campo[]>> {
    return HttpClient.get<Campo[]>(`${this.path}/${clienteId}/campos`);
  }
}

export default new ClienteService('/clientes');
// `http://localhost:3000/api/clientes/${clienteId}/campos`,

// `http://localhost:3000/api/campos/cliente/{id}`, GEt by cliente
// `http://localhost:3000/api/campos/`, get all
