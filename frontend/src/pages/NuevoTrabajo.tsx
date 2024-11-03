import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from '@mui/material';

const MisTrabajos: React.FC = () => {
  const [fecha, setFecha] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [cliente, setCliente] = useState<string>('');
  const [campo, setCampo] = useState<string>('');
  const [lote, setLote] = useState<string>('');
  const [hectareas, setHectareas] = useState<number | ''>('');

  return (
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
        Mis Trabajos
      </Typography>
      <form noValidate autoComplete='off'>
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
            onChange={(e) => setTipo(e.target.value)}
          >
            <MenuItem value='Cosecha'>Cosecha</MenuItem>
            <MenuItem value='Fumigacion'>Fumigación</MenuItem>
            <MenuItem value='Siembra'>Siembra</MenuItem>
          </TextField>
          <TextField
            label='Cliente'
            fullWidth
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
          <Stack direction='row' spacing={1}>
            <TextField
              label='Campo'
              fullWidth
              value={campo}
              onChange={(e) => setCampo(e.target.value)}
            />
            <Button variant='outlined'>Agregar</Button>
          </Stack>
          <Stack direction='row' spacing={1}>
            <TextField
              label='Lote'
              fullWidth
              value={lote}
              onChange={(e) => setLote(e.target.value)}
            />
            <Button variant='outlined'>Agregar</Button>
          </Stack>
          <TextField
            label='Hectáreas'
            type='number'
            fullWidth
            value={hectareas}
            onChange={(e) => setHectareas(Number(e.target.value))}
          />
          <Button variant='contained' color='primary' fullWidth>
            Guardar Trabajo
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default MisTrabajos;
