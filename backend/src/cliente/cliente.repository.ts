import { Cliente, ClienteAttributes } from "../models/cliente";

//obtener todos los clientes
const getClientes = async (): Promise<Cliente[]> => {
  try {
    return await Cliente.findAll();
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

//obtener un cliente
const getCliente = async (id: number): Promise<Cliente | null> => {
  try {
    const cliente = await Cliente.findByPk(id);
    return cliente;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// obtener cliente por nombre
const getClienteByName = async (nombre: string): Promise<Cliente | null> => {
  try {
    const cliente = await Cliente.findOne({
      where: { nombre },
    });
    return cliente;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};
// public findOne(item: { nroCliente: string }): Cliente | undefined {
//   return clientes.find((cliente) => cliente.nroCliente === item.nroCliente);
// }

// //crear un cliente
// public add(item: Cliente): Cliente | undefined {
//   clientes.push(item);
//   return item;
// }
const createCliente = async (
  nombre: string,
  email: string,
  telefono: string,
  direccion: string,
  localidad: string,
  provincia: string
): Promise<Cliente> => {
  try {
    return await Cliente.create({
      nombre,
      email,
      telefono,
      direccion,
      localidad,
      provincia,
    });
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// modificar un cliente
// public update(item: Cliente): Cliente | undefined {
//   const clienteNrox = clientes.findIndex(
//     (cliente) => cliente.nroCliente === item.nroCliente
//   );

//   if (clienteNrox !== -1) {
//     clientes[clienteNrox] = { ...clientes[clienteNrox], ...item };
//   }
//   return clientes[clienteNrox];
// }
const updateCliente = async (id: number, clienteData: Partial<ClienteAttributes>) => {
  try {
    // Verificamos si el cliente existe
    const cliente = await Cliente.findByPk(id);
    
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    // Actualizamos el cliente con los datos recibidos
    await cliente.update(clienteData);
    return cliente;
  } catch (error) {
    console.error('Error actualizando cliente:', error);
    throw error;
  }
};

const deleteCliente = async (id: number): Promise<boolean> => {
  try {
    const cliente = await Cliente.findByPk(id);
    
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    await cliente.destroy();  // Eliminamos el cliente
    return true;
  } catch (error) {
    console.error('Error eliminando cliente:', error);
    throw error;
  }
};

// // eliminar un cliente
// public delete(item: { nroCliente: string }): Cliente | undefined {
//   const clienteNrox = clientes.findIndex(
//     (cliente) => cliente.nroCliente === item.nroCliente
//   );

//   if (clienteNrox !== -1) {
//     const deletedCliente = clientes[clienteNrox];
//     clientes.splice(clienteNrox, 1);
//     return deletedCliente;
//   }
// }

const clienteRepository = {
  getClientes,
  getCliente,
  getClienteByName,
  createCliente,
  updateCliente,
  deleteCliente
};

export default clienteRepository;
