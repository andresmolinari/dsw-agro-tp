import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // importa tu instancia de Sequelize


export class Siembra extends Model {}

Siembra.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  variedad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kilos: {
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
  modelName: 'Siembra',
  tableName: 'Siembras'
});