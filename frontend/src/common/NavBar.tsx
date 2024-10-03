import React, { useContext } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { AppBar, Box, Container, Stack, Toolbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types/AppRoutes';
import { AuthContext } from '../context/AuthContext';

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);

  const isAuthenticated = authContext?.isAuthenticated || false; // Si es undefined, false por defecto

  const onClickLoginButton = () => {
    navigate(AppRoutes.LOGIN);
  };

  const onClickRegisterButton = () => {
    navigate(AppRoutes.REGISTER);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <Container>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Grid item>
                <Typography>Agro</Typography>
              </Grid>
              <Grid item>
                <Stack direction='row' spacing={2}>
                  {isAuthenticated && location.pathname === '/home' ? (
                    <>
                      <Button variant='contained'>Option 1</Button>
                      <Button variant='outlined'>Option 2</Button>
                    </>
                  ) : (
                    <>
                      <Button variant='contained' onClick={onClickLoginButton}>
                        Login
                      </Button>
                      <Button
                        variant='outlined'
                        onClick={onClickRegisterButton}
                      >
                        Register
                      </Button>
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
