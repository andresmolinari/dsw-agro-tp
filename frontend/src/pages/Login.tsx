import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';
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
    // Lógica de envío de formulario
  };

  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='100vh'
      >
        <Paper style={{ padding: '1.2em', borderRadius: '0.5em' }}>
          <Typography variant='h4' gutterBottom>
            Iniciar Sesión
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
            <TextField
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
      </Box>
    </Container>
  );
};

export default Login;
