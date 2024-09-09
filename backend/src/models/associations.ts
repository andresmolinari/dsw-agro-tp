// associations.ts
import { Cliente } from "./cliente";
import { Campo } from "./campo";
import sequelize from "../db/connection";
import { Sequelize } from "sequelize";
import { Usuario } from "./usuario";
import { Lote } from "./lote";

export function defineAssociations() {

  // Inicializar modelos

  Usuario.initModel(sequelize);
  Cliente.initModel(sequelize);
  Campo.initModel(sequelize);
  Lote.initModel(sequelize);

  // Definir asociaciones

  Usuario.hasMany(Cliente, {
    foreignKey: "usuarioId",
    as: "clientes",
  });

  Cliente.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    as: "usuario",
  });
  Cliente.hasMany(Campo, {
    foreignKey: "clienteId",
    as: "campos",
  });

  Campo.belongsTo(Cliente, {
    foreignKey: "clienteId",
    as: "cliente",
  });

  Campo.hasMany(Lote, {
    foreignKey: "campoId",
    as: "lotes",
  });

  Lote.belongsTo(Campo, {
    foreignKey: "campoId",
    as: "campo",
  });
}
