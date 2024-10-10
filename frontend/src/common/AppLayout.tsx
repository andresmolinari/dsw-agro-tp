import { Box } from '@mui/material';
import SideBar from '../components/SideBar';
import { NavBar } from './NavBar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AppLayout: React.FC<{}> = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {isAuthenticated && <SideBar />}
        {/* Contenedor principal que incluye el Sidebar y el contenido, debajo de la NavBar */}
        <div
          style={{
            display: 'flex',
            marginTop: '64px',

            height: 'calc(100vh - 64px)',
            width: '100%',
          }}
        >
          <Outlet />
        </div>
      </Box>
    </div>
  );
};
