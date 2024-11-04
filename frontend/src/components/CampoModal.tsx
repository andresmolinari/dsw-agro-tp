import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface CampoModalProps {
  open: boolean;
  handleClose: () => void;
  onSave: (campoData: { campoNombre: string; campoUbicacion: string }) => void;
  clienteId: number;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

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
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

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
        setSeverity('error');
        throw new Error(errorData.message || 'Error al crear el campo');
      }

      const nuevoCampo = await response.json();
      onSave(nuevoCampo);
      setMensaje('Campo agregado exitosamente');
      setSeverity('success');
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Error al crear el campo');
      setSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setCampoNombre('');
      setCampoUbicacion('');
      handleClose();
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
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

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={severity}>
            {mensaje}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default CampoModal;
