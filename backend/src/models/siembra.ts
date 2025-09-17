import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { OrdenTrabajo } from './ordenTrabajo';

export interface SiembraAttributes {
  id?: number;
  variedad: string;
  kilos: number;
  precio: number;
  OrdenTrabajoId: number;
}

export class Siembra extends Model<SiembraAttributes> implements SiembraAttributes {
  public id?: number;
  public variedad!: string;
  public kilos!: number;
  public precio!: number;
  public OrdenTrabajoId!: number;

  // Relación con OrdenTrabajo
  public ordenTrabajo?: OrdenTrabajo;
}

Siembra.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    variedad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kilos: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    OrdenTrabajoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'OrdenesTrabajo',
        key: 'nroOrdenTrabajo',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Siembra',
    tableName: 'Siembras',
  }
);
