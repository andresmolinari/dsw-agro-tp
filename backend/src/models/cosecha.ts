import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db/connection';
import { OrdenTrabajo } from './ordenTrabajo';

export interface CosechaAttributes {
  id?: number;
  rendimiento: number;
  precio: number;
  OrdenTrabajoId: number;
}

export class Cosecha extends Model<CosechaAttributes> implements CosechaAttributes {
  public id?: number;
  public rendimiento!: number;
  public precio!: number;
  public OrdenTrabajoId!: number;

  // Relación con OrdenTrabajo
  public ordenTrabajo?: OrdenTrabajo;
}

Cosecha.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rendimiento: {
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
    modelName: 'Cosecha',
    tableName: 'Cosechas',
  }
);
