// NuevoCampo.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import NotificationService from '../../utils/NotificationService';
import CampoService from '../../services/CampoService';

interface NuevoCampoProps {
  clienteId: string;
  open: boolean;
  onClose: () => void;
  onCampoCreado: () => void;
}

interface FormValues {
  nombre: string;
  ubicacion: string;
}

const NuevoCampo: React.FC<NuevoCampoProps> = ({ open, onClose, onCampoCreado , clienteId}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    nombre: '',
    ubicacion: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Llamada a la API mediante CampoService
      
      const response = await CampoService.createCampo(clienteId, {
        campoNombre: formValues.nombre,
        campoUbicacion: formValues.ubicacion,
      });

      if (response.status !== 201) {
        setError('Error al crear campo');
        NotificationService.error('Error al crear el campo');
        return;
      }

      setSuccess('Campo creado con éxito');
      NotificationService.info('Campo creado con éxito');
      setFormValues({
        nombre: '',
        ubicacion: '',
      });
      onCampoCreado();
      onClose();
    } catch (error: any) {
      if (error.response?.data?.message) {
        const msg = error.response.data.message;
        setError(msg);
        NotificationService.error(msg);
        return;
      }

      setError('Error al conectar con el servidor');
      NotificationService.error('Error al conectar con el servidor');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Crear Nuevo Campo</DialogTitle>
      <DialogContent>
        {error && <Alert severity='error'>{error}</Alert>}
        {success && <Alert severity='success'>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label='Nombre'
              name='nombre'
              fullWidth
              required
              value={formValues.nombre}
              onChange={handleChange}
              error={Boolean(error && formValues.nombre === '')}
              helperText={formValues.nombre === '' && error ? error : ''}
            />
            <TextField label='Ubicacion' name='ubicacion' fullWidth required value={formValues.ubicacion} onChange={handleChange} />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Guardar Campo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NuevoCampo;
