import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../db/connection';

export interface UsuarioAttributes {
  usuarioId?: number;
  usuarioNombre: string;
  usuarioEmail: string;
  usuarioContraseña: string;
  rolId?: number;
}

export class Usuario
  extends Model<UsuarioAttributes>
  implements UsuarioAttributes
{
  public usuarioId?: number;
  public usuarioNombre!: string;
  public usuarioEmail!: string;
  public usuarioContraseña!: string;
  public rolId?: number;

  static initModel(sequelize: Sequelize) {
    Usuario.init(
      {
        usuarioId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        usuarioNombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        usuarioEmail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        usuarioContraseña: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        rolId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: { model: 'Roles', key: 'rolId' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      
      },
      {
        sequelize,
        modelName: 'usuario',
        tableName: 'Usuarios',
      }
    );
  }
}

Usuario.initModel(sequelize);
