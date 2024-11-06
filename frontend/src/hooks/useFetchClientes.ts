import { useState, useEffect } from 'react';

interface Cliente {
  clienteId: string;
  clienteNombre: string;
}

const useFetchClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          'http://localhost:3000/api/clientes/misClientes',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error('Error al obtener clientes');

        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };
    fetchClientes();
  }, []);

  return { clientes };
};

export default useFetchClientes;
