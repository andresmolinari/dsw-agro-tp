import { AxiosResponse } from 'axios';
import HttpClient from './axiosInstance';

interface OrdenTrabajoData {
  fecha: string;
  tipo: string;
  loteId: string;
  campoId: string;
  detalle: any;
}

class OrdenTrabajoService {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  createOrdenTrabajo(data: OrdenTrabajoData): Promise<AxiosResponse<any>> {
    return HttpClient.post(`${this.path}`, data);
  }
}

export default new OrdenTrabajoService('/ordenTrabajo');
