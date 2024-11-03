import { Campo } from "../models/campo";
import { Cliente, ClienteAttributes } from "../models/cliente";

//obtener todos los clientes
const getClientes = async (usuarioId: number): Promise<Cliente[]> => {
  try {
    return await Cliente.findAll({
      where: {usuarioId}, 
      include: [
        {
          model: Campo,
          attributes: [
            "campoId",
            "campoNombre",
            "campoUbicacion",
          ],
          as: "campos",
        },
      ],
    });
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// obtener un cliente
const getCliente = async (clienteId: number, usuarioId: number): Promise<Cliente | null> => {
  try {
    const cliente = await Cliente.findOne({
      where: {
        clienteId: clienteId,
        usuarioId: usuarioId,
      },
    });
    return cliente;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

const getClienteCampos = async (clienteId: number, usuarioId: number): Promise<Cliente | null> => {
  try {
    const cliente = await Cliente.findOne({
      where: {
        clienteId: clienteId,
        usuarioId: usuarioId,
      },
      include: [
        {
          model: Campo,
          attributes: [
            "campoId",
            "campoNombre",
            "campoUbicacion",
          ],
          as: "campos",
        },
      ],
    });
    return cliente;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// obtener cliente por nombre
const getClienteByName = async (clienteNombre: string, usuarioId: number): Promise<Cliente | null> => {
  try {
    const cliente = await Cliente.findOne({
      where: {
        clienteNombre,
        usuarioId: usuarioId,
      },
    });
    return cliente;
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// Crear un cliente

const createCliente = async (
  usuarioId: number,
  clienteNombre: string,
  clienteEmail: string,
  clienteTelefono: string,
  clienteDireccion: string,
  clienteLocalidad: string,
  clienteProvincia: string
): Promise<Cliente> => {
  try {
    return await Cliente.create({
      usuarioId,
      clienteNombre,
      clienteEmail,
      clienteTelefono,
      clienteDireccion,
      clienteLocalidad,
      clienteProvincia,
    });
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw error;
  }
};

// Modificar cliente
const updateCliente = async (
  clienteId: number,
  clienteData: Partial<ClienteAttributes>
) => {
  try {
    // Verificamos si el cliente existe
    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }

    // Actualizamos el cliente con los datos recibidos
    await cliente.update(clienteData);
    return cliente;
  } catch (error) {
    console.error("Error actualizando cliente:", error);
    throw error;
  }
};

// Eliminar cliente
const deleteCliente = async (clienteId: number): Promise<boolean> => {
  try {
    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }

    await cliente.destroy(); // Eliminamos el cliente
    return true;
  } catch (error) {
    console.error("Error eliminando cliente:", error);
    throw error;
  }
};

const clienteRepository = {
  getClientes,
  getCliente,
  getClienteCampos,
  getClienteByName,
  createCliente,
  updateCliente,
  deleteCliente,
};

export default clienteRepository;
