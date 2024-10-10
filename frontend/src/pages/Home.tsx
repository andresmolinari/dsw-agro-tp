import { Button, Container } from '@mui/material';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

interface Props {}

const Home = (props: Props) => {
  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      {/* <SideBar /> SideBar en la izquierda */}
      <Container style={{ flexGrow: 1, padding: '16px' }} maxWidth='xl'>
        <Button variant='contained' color='primary'>
          Home Page
        </Button>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </Container>
    </div>
  );
};

export default Home;
