import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

export interface ClienteAttributes {
  id?: number;
  nombre: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  localidad?: string;
  provincia?: string;
}

export class Cliente extends Model<ClienteAttributes> implements ClienteAttributes {
  public id?: number;
  public nombre!: string;
  public email: string | undefined;
  public telefono: string | undefined;
  public direccion: string | undefined;
  public localidad: string | undefined;
  public provincia: string | undefined;
}

Cliente.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  },
  localidad: {
    type: DataTypes.STRING,
  },
  provincia: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Cliente',
});