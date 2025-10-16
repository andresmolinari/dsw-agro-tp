import { Box } from '@mui/material';
import SideBar from '../components/SideBar';
import NavBar from './NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div>
      <NavBar onMenuClick={toggleDrawer} />
      {isAuthenticated && location.pathname !== '/' && (
        <SideBar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      )}
      <Box sx={{ marginTop: '64px', height: 'calc(100vh - 64px)', overflow: 'auto' }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default AppLayout;
