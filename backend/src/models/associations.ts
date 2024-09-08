// associations.ts
import { Cliente } from "./cliente";
import { Campo } from "./campo";
import sequelize from "../db/connection";
import { Sequelize } from "sequelize";
import { Usuario } from "./usuario";

export function defineAssociations() {
  // Definir asociaciones

  Usuario.initModel(sequelize);
  Cliente.initModel(sequelize);
  Campo.initModel(sequelize);

  Usuario.hasMany(Cliente, {
    foreignKey: "usuarioId",
    as: "clientes",
  });

  // Un cliente pertenece a un usuario
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
}
