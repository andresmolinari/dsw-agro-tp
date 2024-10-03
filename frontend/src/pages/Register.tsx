import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import NotificationService from '../utils/NotificationService';

interface Props {}

const Register = (props: Props) => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      NotificationService.error('Las contraseñas no coinciden');
      return;
    }

    NotificationService.info('Registro exitoso');
  };

  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <Paper elevation={3} sx={{ padding: '2rem', width: '100%' }}>
          <Typography variant='h5' component='h1' gutterBottom>
            Registro
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              margin='normal'
              label='Nombre de Usuario'
              variant='outlined'
              required
              name='username'
              value={registerData.username}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Correo Electrónico'
              type='email'
              variant='outlined'
              required
              name='email'
              value={registerData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Contraseña'
              type='password'
              variant='outlined'
              required
              name='password'
              value={registerData.password}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Confirmar Contraseña'
              type='password'
              variant='outlined'
              required
              name='confirmPassword'
              value={registerData.confirmPassword}
              onChange={handleChange}
            />
            <Button
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
              sx={{ marginTop: '1rem' }}
            >
              Registrarse
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
