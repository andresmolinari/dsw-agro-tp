import { Button, Grid, Typography } from '@material-ui/core';
import { AppBar, Box, Container, Toolbar } from '@mui/material';
export const NavBar: React.FC = () => {
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
                <Button variant='outlined'>Login</Button>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
