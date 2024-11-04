import { Campo } from "./Campo";

export interface Lote {
  loteId: number;
  campoId: number;
  loteNro: number;
  loteHectareas: number;
  campo: Campo
}