import { Cliente } from "./Cliente";

export interface Campo {
campoId: number;
clienteId: number;
campoNombre: string;
campoUbicacion: string;
createdAt: string;
updatedAt: string;
cliente: Cliente;
}