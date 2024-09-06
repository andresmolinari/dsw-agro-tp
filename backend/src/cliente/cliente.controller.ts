import { Request, Response, NextFunction } from "express";
import clienteRepository from "./cliente.repository";


// sanitizacion middleware
// function sanitizeClienteInput(req: Request, res: Response, next: NextFunction) {
//   req.body.sanitizedCliente = {
//     clienteId: req.body.nroCliente,
//     nombre: req.body.nombre,
//     mail: req.body.mail,
//     telefono: req.body.telefono,
//     direccion: req.body.direccion,
//     localidad: req.body.localidad,
//     provincia: req.body.provincia,
//   };

//   //nos quedamos con los elementos que son not null para el patch
//   Object.keys(req.body.sanitizedCliente).forEach((key) => {
//     if (req.body.sanitizedCliente[key] === undefined) {
//       delete req.body.sanitizedCliente[key];
//     }
//   });
//   next();
// }

// obtener todos los clientes
const getClientes = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientes = await clienteRepository.getClientes();
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error); // Log para entender el error
    res.status(500).json({ message: "Error al obtener clientes" });
  }
};

// // obtener un cliente
const getCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    const cliente = await clienteRepository.getCliente(id);

    res.status(200).json(cliente);
  } catch (error) {
    console.error(error); // Log para entender el error
    res.status(500).json({ message: "Error al obtener un cliente" });
  }
};
// function findOne(req: Request, res: Response) {
//   const nroCliente = req.params.nroCliente;
//   const cliente = repository.findOne({ nroCliente });
//   if (!cliente) {
//     return res.status(404).send({ message: "cliente not found" });
//   }
//   res.json({ data: cliente });
// }

const createCliente = async (req: Request, res: Response): Promise<void> => {
  const {nombre, email, telefono, direccion, localidad, provincia} = req.body;
  
  const clienteNombre = await clienteRepository.getClienteByName(nombre);

  if(clienteNombre && clienteNombre.nombre === nombre) {
    res.status(400).json({ message: "Ya existe un cliente con ese nombre" });
    return;
  }
  
  if (!nombre) {
    res.status(400).json({ message: "El nombre es requerido" });
    return;
  }
  try {
    const newCliente = await clienteRepository.createCliente(nombre, email, telefono, direccion, localidad, provincia);
    res.status(201).json(newCliente);
  } catch (error) {
    console.error(error); // Log para entender el error
    res.status(500).json({ message: "Error al crear cliente" });
  }
};
// // crear cliente
// function add(req: Request, res: Response) {
//   const input = req.body.sanitizedCliente;

//   const clienteInput = new Cliente(
//     input.nroCliente,
//     input.nombre,
//     input.mail,
//     input.telefono,
//     input.direccion,
//     input.localidad,
//     input.provincia
//   );

//   const cliente = repository.add(clienteInput);
//   return res.status(201).send({ message: "cliente creado", data: cliente });
// }
const updateCliente = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion, localidad, provincia } = req.body;

  try {
    // Obtenemos el cliente actual por su ID
    const clienteActual = await clienteRepository.getCliente(parseInt(id));
    
    if (!clienteActual) {
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }

    // Si el nombre ha cambiado, validamos que no exista otro cliente con el mismo nombre
    if (nombre && nombre !== clienteActual.nombre) {
      const clienteNombre = await clienteRepository.getClienteByName(nombre);
      
      if (clienteNombre) {
        res.status(400).json({ message: "Ya existe un cliente con ese nombre" });
        return;
      }
    }

    // Realizamos la actualización solo con los campos que se enviaron
    const updatedCliente = await clienteRepository.updateCliente(parseInt(id), {
      nombre: nombre || clienteActual.nombre,  // Si no se envía un nuevo nombre, mantenemos el nombre actual
      email,
      telefono,
      direccion,
      localidad,
      provincia
    });

    // Retornar la respuesta exitosa
    res.status(200).json(updatedCliente);
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
};

// // modificar cliente completo
// function update(req: Request, res: Response) {
//   req.body.sanitizedCliente.nroCliente = req.params.nroCliente;
//   const cliente = repository.update(req.body.sanitizedCliente); //le pasamos el sanitizado

//   if (!cliente) {
//     return res.status(404).send({ message: "Cliente not found" });
//   }

//   return res
//     .status(200)
//     .send({ message: "cliente modificado correctamente", data: cliente });
// }


// borrar un cliente
const deleteCliente = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const clienteEliminado = await clienteRepository.deleteCliente(parseInt(id));

    if (clienteEliminado) {
      res.status(200).json({ message: "Cliente eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
};
// function remove(req: Request, res: Response) {
//   const nroCliente = req.params.nroCliente;
//   const cliente = repository.delete({ nroCliente });

//   if (!cliente) {
//     res.status(404).send({ message: "Cliente not found" });
//   } else {
//     res.status(200).send({ message: "cliente deleted successfully" });
//   }
// }

export const controller = {
  // sanitizeClienteInput,
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente
};
