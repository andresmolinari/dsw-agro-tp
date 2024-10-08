import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // importa tu instancia de Sequelize


export class Fumigacion extends Model {}

Fumigacion.init({
  producto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dosis: {
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
  modelName: 'Fumigacion',
  tableName: 'Fumigaciones'
});
