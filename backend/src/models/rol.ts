import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../db/connection";

export interface RolAttributes {
  rolId?: number;
  rolNombre: string;
}

export class Rol extends Model<RolAttributes> implements RolAttributes {
  public rolId?: number;
  public rolNombre!: string;

  static initModel(sequelize: Sequelize) {
    Rol.init(
      {
        rolId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        rolNombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Rol",
        tableName: "Roles",
      }
    );
  }
}
Rol.initModel(sequelize);
