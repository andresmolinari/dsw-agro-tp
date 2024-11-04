import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';

interface CampoModalProps {
  open: boolean;
  handleClose: () => void;
  onSave: (campoData: { campoNombre: string; campoUbicacion: string }) => void;
  clienteId: number;
}

const CampoModal: React.FC<CampoModalProps> = ({
  open,
  handleClose,
  onSave,
  clienteId,
}) => {
  const [campoNombre, setCampoNombre] = useState<string>('');
  const [campoUbicacion, setCampoUbicacion] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/campos/${clienteId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ campoNombre, campoUbicacion }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al crear el campo:', errorData);
        throw new Error(errorData.message || 'Error al crear el campo');
      }

      const nuevoCampo = await response.json();
      onSave(nuevoCampo);
      setMensaje('Campo agregado exitosamente');
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Error al crear el campo');
    } finally {
      setOpenSnackbar(true);
      setCampoNombre('');
      setCampoUbicacion('');
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant='h6' component='h2'>
            Agregar Campo
          </Typography>
          <TextField
            fullWidth
            margin='normal'
            label='Nombre'
            value={campoNombre}
            onChange={(e) => setCampoNombre(e.target.value)}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Ubicación'
            value={campoUbicacion}
            onChange={(e) => setCampoUbicacion(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Guardar
          </Button>
        </Box>

        {/* Snackbar para mostrar el mensaje */}
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
      </>
    </Modal>
  );
};

export default CampoModal;
