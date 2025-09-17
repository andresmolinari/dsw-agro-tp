import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { OrdenTrabajo } from './ordenTrabajo';

export interface FumigacionAttributes {
  id?: number;
  producto: string;
  dosis: number;
  precio: number;
  OrdenTrabajoId: number;
}

export class Fumigacion extends Model<FumigacionAttributes> implements FumigacionAttributes {
  public id?: number;
  public producto!: string;
  public dosis!: number;
  public precio!: number;
  public OrdenTrabajoId!: number;

  // Relación con OrdenTrabajo
  public ordenTrabajo?: OrdenTrabajo;
}

Fumigacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    producto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosis: {
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
    modelName: 'Fumigacion',
    tableName: 'Fumigaciones',
  }
);

// Asociación con OrdenTrabajo
OrdenTrabajo.hasOne(Fumigacion, { foreignKey: 'OrdenTrabajoId' });
Fumigacion.belongsTo(OrdenTrabajo, { foreignKey: 'OrdenTrabajoId' });
