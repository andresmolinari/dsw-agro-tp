import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Alert, Typography } from '@mui/material';
import ClienteCard from '../components/ClienteCard';

interface ClienteData {
  clienteId: number;
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono: string;
  clienteDireccion: string;
  clienteLocalidad: string;
  clienteProvincia: string;
}

const ClientePage: React.FC = () => {
  const { clienteId } = useParams<{ clienteId: string }>();
  const [cliente, setCliente] = useState<ClienteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No se encontró un token de autenticación.');
        }

        const response = await fetch(
          `http://localhost:3000/api/clientes/${clienteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error al obtener los datos del cliente');
        }

        const data = await response.json();
        setCliente(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Error desconocido al cargar los datos del cliente'
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (clienteId) {
      fetchCliente();
    }
  }, [clienteId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity='error'>{error}</Alert>;
  }

  if (!cliente) {
    return (
      <Typography color='error'>
        No se encontraron datos para este cliente.
      </Typography>
    );
  }

  return <ClienteCard cliente={cliente} />;
};

export default ClientePage;
