import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Cliente } from "./cliente";

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
}

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
        model: "Clientes", // Debe coincidir con el nombre de la tabla en la base de datos
        key: "clienteId",
      },
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
    modelName: "Campo",
    tableName: 'Campos', // Asegúrate de que el nombre de la tabla sea 'Campos'
  }
);

Campo.belongsTo(Cliente, {
  foreignKey: 'clienteId',
  targetKey: 'clienteId',
});
