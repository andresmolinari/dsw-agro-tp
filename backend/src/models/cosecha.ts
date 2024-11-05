import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // importa tu instancia de Sequelize

export class Cosecha extends Model {}

Cosecha.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rendimiento: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  OrdenTrabajoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'OrdenesTrabajo',
      key: 'nroOrdenTrabajo'
    }
  }
}, {
  sequelize,
  modelName: 'Cosecha',
  tableName: 'Cosechas'
});