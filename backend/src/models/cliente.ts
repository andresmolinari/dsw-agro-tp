import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

export interface ClienteAttributes {
  clienteId?: number;
  clienteNombre: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  clienteDireccion?: string;
  clienteLocalidad?: string;
  clienteProvincia?: string;
}

export class Cliente extends Model<ClienteAttributes> implements ClienteAttributes {
  public clienteId?: number;
  public clienteNombre!: string;
  public clienteEmail: string | undefined;
  public clienteTelefono: string | undefined;
  public clienteDireccion: string | undefined;
  public clienteLocalidad: string | undefined;
  public clienteProvincia: string | undefined;
}

Cliente.init({
  clienteId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clienteNombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clienteEmail: {
    type: DataTypes.STRING,
  },
  clienteTelefono: {
    type: DataTypes.STRING,
  },
  clienteDireccion: {
    type: DataTypes.STRING,
  },
  clienteLocalidad: {
    type: DataTypes.STRING,
  },
  clienteProvincia: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Cliente',
  tableName: 'Clientes', // Asegúrate de que el nombre de la tabla sea 'Clientes'
});