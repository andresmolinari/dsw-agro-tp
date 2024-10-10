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
import { useAuth } from '../context/AuthContext';

interface LoginType {
  name: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginType>({
    name: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await UserService.login(
        loginData.name,
        loginData.password
      );
      const data: string = response.data;
      console.log(data);
      if (response.status === 200) {
        if (data !== null && data !== undefined && data !== '') {
          login();
          localStorage.setItem('token', data);
          NotificationService.info('Inicio de sesión exitoso');
          navigate(AppRoutes.HOME);
        } else {
          NotificationService.error('Token no valido');
        }
      } else {
        NotificationService.error('Error en el inicio de sesión');
      }
    } catch (error) {
      NotificationService.error('Error en el inicio de sesión');
    }
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
