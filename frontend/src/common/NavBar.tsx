import { Button, Grid, Typography } from '@material-ui/core';
import { AppBar, Box, Container, Stack, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../types/AppRoutes';
export const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const onCLickLoginButton = () => {
    navigate(AppRoutes.LOGIN);
  };
  const onCLickRegisterButton = () => {
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
                  <Button variant='contained' onClick={onCLickLoginButton}>
                    Login
                  </Button>
                  <Button variant='outlined' onClick={onCLickRegisterButton}>
                    Register
                  </Button>
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
