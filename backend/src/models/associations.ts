// associations.ts
import { Cliente } from "./cliente";
import { Campo } from "./campo";
import sequelize from "../db/connection";
import { Sequelize } from "sequelize";
import { Usuario } from "./usuario";
import { Lote } from "./lote";
import { OrdenTrabajo } from "./ordenTrabajo";
import { Cosecha } from "./cosecha";
import { Fumigacion } from "./fumigacion";
import { Siembra } from "./siembra";

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

  // Relación entre OrdenTrabajo y Cosecha
  OrdenTrabajo.hasOne(Cosecha, { foreignKey: "OrdenTrabajoId" });
  Cosecha.belongsTo(OrdenTrabajo, { foreignKey: "OrdenTrabajoId" });

  // Relación entre OrdenTrabajo y Siembra
  OrdenTrabajo.hasOne(Siembra, { foreignKey: "OrdenTrabajoId" });
  Siembra.belongsTo(OrdenTrabajo, { foreignKey: "OrdenTrabajoId" });

  // Relación entre OrdenTrabajo y Fumigacion
  OrdenTrabajo.hasOne(Fumigacion, { foreignKey: "OrdenTrabajoId" });
  Fumigacion.belongsTo(OrdenTrabajo, { foreignKey: "OrdenTrabajoId" });

  Usuario.hasMany(OrdenTrabajo, {
    foreignKey: "usuarioId",
    as: "ordenestrabajo",
  });
  OrdenTrabajo.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    as: "usuario",
  });

  Lote.hasMany(OrdenTrabajo, {  foreignKey: "loteId", as: "ordenesTrabajo" });
  OrdenTrabajo.belongsTo(Lote, { foreignKey: "loteId", as: "lote" });
}
