import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import { useState } from 'react';

interface Props {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [loginData, setLoginData] = useState<Props>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aca se puede manejar el envío del formulario
    console.log('Datos de inicio de sesión:', loginData);
  };

  return (
    <Container maxWidth='sm'>
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
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
                style={{ marginTop: '1rem' }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
