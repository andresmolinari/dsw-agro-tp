import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../db/connection";
import { Lote } from "./lote";
import { Cosecha } from "./cosecha";
import { Siembra } from "./siembra";
import { Fumigacion } from "./fumigacion";

export class OrdenTrabajo extends Model {
  public nroOrdenTrabajo!: number;
  public fecha!: Date;
  public costototal!: number;
  public loteId!: number;
  public usuarioId!: number;
  public tipo!: "cosecha" | "siembra" | "fumigacion";

  // Asociaciones (opcionales en TS, para que no dé error)
  public lote?: Lote;
  public Cosecha?: Cosecha;
  public Siembra?: Siembra;
  public Fumigacion?: Fumigacion;
}

OrdenTrabajo.init(
  {
    nroOrdenTrabajo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    costototal: {
      type: DataTypes.FLOAT,
    },
    loteId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Lotes",
        key: "loteId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    tipo: {
      type: DataTypes.ENUM("cosecha", "siembra", "fumigacion"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrdenTrabajo",
    tableName: "OrdenesTrabajo",
  }
);
