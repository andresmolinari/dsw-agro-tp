import { useState, useEffect } from 'react';

interface Lote {
  loteId: string;
  loteNro: string;
  loteHectareas: number;
}

const useFetchLotes = (campoId: string) => {
  const [lotes, setLotes] = useState<Lote[]>([]);

  useEffect(() => {
    const fetchLotes = async () => {
      if (!campoId) return;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3000/api/lotes/${campoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error('Error al obtener lotes');

        const data = await response.json();
        setLotes(data);
      } catch (error) {
        console.error('Error al obtener lotes:', error);
      }
    };
    fetchLotes();
  }, [campoId]);

  return { lotes };
};

export default useFetchLotes;
