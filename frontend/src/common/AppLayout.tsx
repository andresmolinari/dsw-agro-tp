import { NavBar } from './NavBar';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC<{}> = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
