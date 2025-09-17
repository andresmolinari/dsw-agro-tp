import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../db/connection';
import { Cliente } from './cliente'; 

export interface CampoAttributes {
  campoId?: number;
  clienteId: number;
  campoNombre: string;
  campoUbicacion?: string;
}

export class Campo extends Model<CampoAttributes> implements CampoAttributes {
  public campoId?: number;
  public clienteId!: number;
  public campoNombre!: string;
  public campoUbicacion: string | undefined;

   public cliente?: Cliente;

  static initModel(sequelize: Sequelize) {
    Campo.init(
      {
        campoId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        clienteId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Clientes', 
            key: 'clienteId',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        campoNombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        campoUbicacion: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'Campo',
        tableName: 'Campos',
      }
    );
  }
}

Campo.initModel(sequelize);

// Campo.belongsTo(Cliente, {
//   foreignKey: 'clienteId',
//   targetKey: 'clienteId',
// });
