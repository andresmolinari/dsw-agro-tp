import React, { useContext } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types/AppRoutes';
import { useAuth } from '../context/AuthContext';

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const onClickLoginButton = () => {
    navigate(AppRoutes.LOGIN);
  };
  // hacer los buttons como la sidebar
  const onClickRegisterButton = () => {
    navigate(AppRoutes.REGISTER);
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
              <Stack direction='row' spacing={2}>
                {isAuthenticated ? (
                  <>
                    <Button variant='contained'>Option 1</Button>
                    <Button variant='outlined'>Option 2</Button>
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
  color: '#333', // Texto más oscuro
  borderColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#222',
  },
}));
export default NavBar;
