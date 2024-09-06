// associations.ts
import { Cliente } from './cliente';
import { Campo } from './campo';

export function defineAssociations() {
  Cliente.hasMany(Campo, {
    foreignKey: 'clienteId',
    as: 'campos',
  });

  Campo.belongsTo(Cliente, {
    foreignKey: 'clienteId',
    as: 'cliente',
  });
}