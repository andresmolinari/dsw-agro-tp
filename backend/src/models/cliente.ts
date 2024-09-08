import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../db/connection";
import { Usuario } from "./usuario";
import { Campo } from "./campo";

export interface ClienteAttributes {
  clienteId?: number;
  usuarioId: number;
  clienteNombre: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  clienteDireccion?: string;
  clienteLocalidad?: string;
  clienteProvincia?: string;
}

export class Cliente
  extends Model<ClienteAttributes>
  implements ClienteAttributes
{
  public clienteId?: number;
  public usuarioId!: number;
  public clienteNombre!: string;
  public clienteEmail: string | undefined;
  public clienteTelefono: string | undefined;
  public clienteDireccion: string | undefined;
  public clienteLocalidad: string | undefined;
  public clienteProvincia: string | undefined;

  static initModel(sequelize: Sequelize) {
    Cliente.init(
      {
        clienteId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        usuarioId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Usuarios",
            key: "usuarioId",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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
      },
      {
        sequelize,
        modelName: "Cliente",
        tableName: "Clientes",
      }
    );
  }
}

Cliente.initModel(sequelize);

// Cliente.belongsTo(Usuario, {
//   foreignKey: "usuarioId",
//   targetKey: "usuarioId",
// });

// Cliente.hasMany(Campo, {
//   foreignKey: "clienteId",
//   sourceKey: "clienteId",
// });


