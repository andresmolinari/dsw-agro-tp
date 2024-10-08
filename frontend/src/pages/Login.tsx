import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  styled,
} from '@mui/material';

import NotificationService from '../utils/NotificationService';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../types/AppRoutes';

interface LoginType {
  name: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginType>({
    name: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  // CUANDO ESTE LOGIN DEVUELVA UN 200 QUE GUARDE EL TOKE Y SINO QUE NOTIFIQUE EL ERROR
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // serService.login(loginData.username, loginData.password).then
    // (response) => {
    // console.log('Respuesta del servidor:', response);
    // PORQUE ME HACE PONER UN ????
    const token = await UserService.login(loginData.name, loginData.password);

    localStorage.setItem('token', token.data || ''); // Almacena los datos en el Local Storage
    // Lógica de envío de formulario
    NotificationService.info('Inicio de sesión exitoso');
    navigate(AppRoutes.HOME);
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
              name='name'
              value={loginData.name}
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
