import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import ClienteCard from '../components/ClienteCard';
import ClienteService from '../services/ClienteService';
import NotificationService from '../utils/NotificationService';

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

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        setLoading(true);

        if (!clienteId) throw new Error('ID del cliente no especificado');

        const response = await ClienteService.getClienteById(clienteId);
        setCliente(response.data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido al cargar los datos del cliente';
        NotificationService.error(errorMessage);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [clienteId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!cliente) {
    return <Typography color='error'>No se encontraron datos para este cliente.</Typography>;
  }

  return <ClienteCard cliente={cliente} />;
};

export default ClientePage;
