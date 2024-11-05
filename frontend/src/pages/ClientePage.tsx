import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';

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

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant='h6' color='primary' gutterBottom>
          Información del Cliente
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='textSecondary'>
            Nombre:
          </Typography>
          <Typography variant='body1'>{cliente.clienteNombre}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='textSecondary'>
            Email:
          </Typography>
          <Typography variant='body1'>{cliente.clienteEmail}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='textSecondary'>
            Teléfono:
          </Typography>
          <Typography variant='body1'>{cliente.clienteTelefono}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='textSecondary'>
            Dirección:
          </Typography>
          <Typography variant='body1'>{cliente.clienteDireccion}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='textSecondary'>
            Localidad:
          </Typography>
          <Typography variant='body1'>{cliente.clienteLocalidad}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='textSecondary'>
            Provincia:
          </Typography>
          <Typography variant='body1'>{cliente.clienteProvincia}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClientePage;
