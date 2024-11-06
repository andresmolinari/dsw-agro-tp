import { useState, useEffect } from 'react';

interface Campo {
  campoId: string;
  campoNombre: string;
}

const useFetchCampos = (clienteId: string) => {
  const [campos, setCampos] = useState<Campo[]>([]);

  useEffect(() => {
    const fetchCampos = async () => {
      if (!clienteId) return;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3000/api/campos/${clienteId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error('Error al obtener campos');

        const data = await response.json();
        setCampos(data);
      } catch (error) {
        console.error('Error al obtener campos:', error);
      }
    };
    fetchCampos();
  }, [clienteId]);

  return { campos };
};

export default useFetchCampos;
