import { useState, useEffect } from 'react';
import { Cliente } from '../types/Cliente';
import ClienteService from '../services/ClienteService';

const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await ClienteService.getAllClientes();
      console.log(clientes);
      setClientes(response.data);
    };
    fetchClientes();
  }, []);

  return { clientes };
};

export default useClientes;
