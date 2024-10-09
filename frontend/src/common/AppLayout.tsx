import { NavBar } from './NavBar';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC<{}> = () => {
  return (
    <div>
      <NavBar />

      {/* Contenedor principal que incluye el Sidebar y el contenido, debajo de la NavBar */}
      <div style={{ display: 'flex', marginTop: '64px' }}>
        <Outlet />
      </div>
    </div>
  );
};
