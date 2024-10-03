import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';
import { styled } from '@material-ui/core';
import NotificationService from '../utils/NotificationService';

interface LoginType {
  username: string;
  password: string;
}
const Login = () => {
  const [loginData, setLoginData] = useState<LoginType>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos del usuario:', loginData); // Muestra los datos del formulario en la consola
    localStorage.setItem('token', JSON.stringify(loginData)); // Almacena los datos en el Local Storage
    // Lógica de envío de formulario
    NotificationService.error('Inicio de sesión exitoso');
  };

  return (
    <Container maxWidth='sm'>
      <StyledBox>
        <Paper style={{ padding: '1.2em', borderRadius: '0.5em' }}>
          <Typography variant='h4' gutterBottom>
            Iniciar Sesión
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
              value={loginData.username}
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
              value={loginData.password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
              sx={{ marginTop: '1rem' }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Paper>
      </StyledBox>
    </Container>
  );
};

export default Login;

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
}));
