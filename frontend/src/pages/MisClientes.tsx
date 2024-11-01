import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Alert,
  Box,
  Button,
} from '@mui/material';
import { Add } from '@mui/icons-material';

// Interfaz para tipar los datos de los clientes según la respuesta del backend
interface Cliente {
  clienteId: number;
  usuarioId: number;
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono: string;
  clienteDireccion: string;
  clienteLocalidad: string;
  clienteProvincia: string;
  createdAt: string;
  updatedAt: string;
}

const MisClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch a la API para obtener los datos de los clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/clientes/misClientes',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Error al obtener los clientes');
        }
        const data: Cliente[] = await response.json();
        setClientes(data);
      } catch (error) {
        setError('Error al cargar los clientes');
        console.error('Error al cargar los clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity='error'>{error}</Alert>;
  }

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' component='div' gutterBottom>
          Lista de Clientes
        </Typography>
        <Button variant='contained' color='primary'>
          Cliente <Add />
        </Button>
        {/* componente que devuelve un button y un modal */}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Localidad</TableCell>
            <TableCell>Provincia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.clienteId}>
              <TableCell>{cliente.clienteNombre}</TableCell>
              <TableCell>{cliente.clienteEmail}</TableCell>
              <TableCell>{cliente.clienteTelefono}</TableCell>
              <TableCell>{cliente.clienteDireccion}</TableCell>
              <TableCell>{cliente.clienteLocalidad}</TableCell>
              <TableCell>{cliente.clienteProvincia}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MisClientes;
