import SideBar from '../components/SideBar';
import { NavBar } from './NavBar';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC<{}> = () => {
  return (
    <div style={{ display: 'flex' }}>
      <NavBar />
      <SideBar />
      <main style={{ flexGrow: 1, padding: '16px' }}>
        <Outlet />
      </main>
    </div>
  );
};
