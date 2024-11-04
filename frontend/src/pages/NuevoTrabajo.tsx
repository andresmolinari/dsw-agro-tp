import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Cliente } from '../types/Cliente';
import { Campo } from '../types/Campo';
import { Lote } from '../types/Lote';
import CampoModal from '../components/CampoModal';

interface DetalleTrabajo {
  rendimiento?: number;
  precio?: number;
  variedad?: string;
  kilos?: number;
  producto?: string;
  dosis?: number;
}

const MisTrabajos: React.FC = () => {
  const navigate = useNavigate(); // Para redirigir
  const [fecha, setFecha] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [cliente, setCliente] = useState<string>('');
  const [campo, setCampo] = useState<string>('');
  const [lote, setLote] = useState<string>('');
  const [hectareas, setHectareas] = useState<number | ''>('');
  const [clientes, setClientes] = useState<{ id: number; nombre: string }[]>(
    []
  );
  const [campos, setCampos] = useState<{ id: number; nombre: string }[]>([]);
  const [lotes, setLotes] = useState<
    { id: number; nombre: string; hectareas: number }[]
  >([]);
  const [detalle, setDetalle] = useState<DetalleTrabajo>({});
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openCampoModal, setOpenCampoModal] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>('');
  const [importe, setImporte] = useState<number>(0);

  const handleOpenCampoModal = () => setOpenCampoModal(true);
  const handleCloseCampoModal = () => setOpenCampoModal(false);
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          'http://localhost:3000/api/clientes/misClientes',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error('Error al obtener clientes');
        const data: Cliente[] = await response.json();
        setClientes(
          data.map((cliente) => ({
            id: cliente.clienteId,
            nombre: cliente.clienteNombre,
          }))
        );
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleClienteChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const clienteId = event.target.value;
    setCliente(clienteId);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/clientes/${clienteId}/campos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error('Error al obtener campos del cliente');

      const data = await response.json();
      setCampos(
        data.campos.map((campo: Campo) => ({
          id: campo.campoId,
          nombre: campo.campoNombre,
        }))
      );
      setCampo('');
      setLotes([]);
    } catch (error) {
      console.error('Error al obtener los campos del cliente:', error);
    }
  };

  const handleCampoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const campoId = event.target.value;
    setCampo(campoId);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/campos/campo/${campoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error('Error al obtener lotes del campo');

      const data = await response.json();
      setLotes(
        data.lotes.map((lote: Lote) => ({
          id: lote.loteId,
          nombre: lote.loteNro,
          hectareas: lote.loteHectareas,
        }))
      );
    } catch (error) {
      console.error('Error al obtener los lotes del campo:', error);
    }
  };

  const handleLoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const loteId = event.target.value;
    setLote(loteId);

    const loteSeleccionado = lotes.find((lote) => lote.id === parseInt(loteId));
    if (loteSeleccionado) {
      setHectareas(loteSeleccionado.hectareas);
    } else {
      setHectareas('');
    }
  };

  useEffect(() => {
    // Calcula el importe cuando cambian el precio o las hectáreas
    const precio = detalle.precio || 0;
    const hectareasNumber = typeof hectareas === 'number' ? hectareas : 0;
    setImporte(precio * hectareasNumber);
  }, [detalle.precio, hectareas]);

  const handleTipoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTipo = event.target.value;
    setTipo(selectedTipo);
    setDetalle({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/ordenTrabajo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fecha,
          tipo,
          loteId: lote,
          campoId: campo,
          detalle,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de respuesta:', errorData);
        throw new Error('Error al crear la orden de trabajo');
      }

      const data = await response.json();
      console.log('Orden de trabajo creada:', data);
      setMensaje('Orden de trabajo creada exitosamente');
      setOpenSnackbar(true); // Abrir el snackbar
      setTimeout(() => {
        navigate('/home'); // Redirigir a home después de 2 segundos
      }, 2000); // Tiempo en milisegundos para el redireccionamiento
    } catch (error) {
      console.error('Error al crear la orden de trabajo:', error);
      setMensaje('Error al crear la orden de trabajo');
      setOpenSnackbar(true); // Abrir el snackbar
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 600,
          margin: 'auto',
          p: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant='h4' gutterBottom>
          Nuevo Trabajo
        </Typography>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label='Fecha'
              type='date'
              fullWidth
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              select
              label='Tipo'
              fullWidth
              value={tipo}
              onChange={handleTipoChange}
            >
              <MenuItem value='Cosecha'>Cosecha</MenuItem>
              <MenuItem value='Fumigacion'>Fumigación</MenuItem>
              <MenuItem value='Siembra'>Siembra</MenuItem>
            </TextField>

            {tipo === 'Cosecha' && (
              <>
                <TextField
                  label='Rendimiento'
                  type='number'
                  fullWidth
                  value={detalle.rendimiento || ''}
                  onChange={(e) =>
                    setDetalle({
                      ...detalle,
                      rendimiento: Number(e.target.value),
                    })
                  }
                />
                <TextField
                  label='Precio'
                  type='number'
                  fullWidth
                  value={detalle.precio || ''}
                  onChange={(e) =>
                    setDetalle({ ...detalle, precio: Number(e.target.value) })
                  }
                />
              </>
            )}

            {tipo === 'Siembra' && (
              <>
                <TextField
                  label='Variedad'
                  fullWidth
                  value={detalle.variedad || ''}
                  onChange={(e) =>
                    setDetalle({ ...detalle, variedad: e.target.value })
                  }
                />
                <TextField
                  label='Kilos'
                  type='number'
                  fullWidth
                  value={detalle.kilos || ''}
                  onChange={(e) =>
                    setDetalle({ ...detalle, kilos: Number(e.target.value) })
                  }
                />
                <TextField
                  label='Precio'
                  type='number'
                  fullWidth
                  value={detalle.precio || ''}
                  onChange={(e) =>
                    setDetalle({ ...detalle, precio: Number(e.target.value) })
                  }
                />
              </>
            )}

            {tipo === 'Fumigacion' && (
              <>
                <TextField
                  label='Producto'
                  fullWidth
                  value={detalle.producto || ''}
                  onChange={(e) =>
                    setDetalle({ ...detalle, producto: e.target.value })
                  }
                />
                <TextField
                  label='Dosis'
                  type='number'
                  fullWidth
                  value={detalle.dosis || ''}
                  onChange={(e) =>
                    setDetalle({ ...detalle, dosis: Number(e.target.value) })
                  }
                />
                <TextField
                  label='Precio'
                  type='number'
                  fullWidth
                  value={detalle.precio || ''}
                  onChange={(e) =>
                    setDetalle({ ...detalle, precio: Number(e.target.value) })
                  }
                />
              </>
            )}

            <TextField
              select
              label='Cliente'
              fullWidth
              value={cliente}
              onChange={handleClienteChange}
            >
              {clientes.map((cliente) => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'flex', columnGap: '8px' }}>
              <TextField
                select
                label='Campo'
                fullWidth
                value={campo}
                onChange={handleCampoChange}
                disabled={!cliente}
              >
                {campos.map((campo) => (
                  <MenuItem key={campo.id} value={campo.id}>
                    {campo.nombre}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleOpenCampoModal}
              >
                {' '}
                +{' '}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', columnGap: '8px' }}>
              <TextField
                select
                label='Lote'
                fullWidth
                value={lote}
                onChange={handleLoteChange}
                disabled={!campo}
              >
                {lotes.map((lote) => (
                  <MenuItem key={lote.id} value={lote.id}>
                    {lote.nombre}
                  </MenuItem>
                ))}
              </TextField>
              <Button> + </Button>
            </Box>

            <TextField
              label='Hectareas'
              type='number'
              fullWidth
              value={hectareas}
              disabled
            />

            <TextField
              label='Importe'
              type='number'
              fullWidth
              value={importe}
              disabled
            />

            <Button variant='contained' color='primary' type='submit'>
              Guardar Trabajo
            </Button>
          </Stack>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={mensaje.includes('Error') ? 'error' : 'success'}
            sx={{ width: '100%' }}
          >
            {mensaje}
          </Alert>
        </Snackbar>
      </Box>
      <CampoModal
        handleClose={handleCloseCampoModal}
        open={openCampoModal}
        onSave={handleCloseCampoModal}
        clienteId={parseInt(cliente)}
      />
    </>
  );
};

export default MisTrabajos;
