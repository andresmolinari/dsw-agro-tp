import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material'; // Importa el ícono de usuario
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../types/AppRoutes';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth(); // Asume que tienes una función `logout` en el contexto
  const [username, setUsername] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        interface DecodedToken {
          usuarioNombre: string;
        }
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        setUsername(decodedToken?.usuarioNombre || null);
      }
    }
  }, [isAuthenticated]);

  const onClickLoginButton = () => {
    navigate(AppRoutes.LOGIN);
  };

  const onClickRegisterButton = () => {
    navigate(AppRoutes.REGISTER);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate(AppRoutes.PROFILE);
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    handleMenuClose();
    navigate(AppRoutes.HOME);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <Container>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              width='100%'
            >
              <Typography>Agro</Typography>
              <Stack direction='row' spacing={2} alignItems='center'>
                {isAuthenticated ? (
                  <>
                    <Stack direction='row' spacing={1} alignItems='center' onClick={handleMenuOpen} style={{ cursor: 'pointer' }}>
                      <AccountCircle /> {/* Ícono de usuario */}
                      <Typography variant='body1'>{username}</Typography>
                    </Stack>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleProfile}>Ver perfil</MenuItem>
                      <LogoutMenuItem onClick={handleLogout}>
                        Cerrar sesión
                      </LogoutMenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button variant='contained' onClick={onClickLoginButton}>
                      Login
                    </Button>
                    <RegisterButton onClick={onClickRegisterButton}>
                      Register
                    </RegisterButton>
                  </>
                )}
              </Stack>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const RegisterButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,0.1)',
  color: '#333',
  borderColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#222',
  },
}));

// Estilo personalizado para el menú "Cerrar sesión"
const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main, // Color rojo
}));

export default NavBar;
