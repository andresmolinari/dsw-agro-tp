import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../common/AppLayout';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import Register from '../pages/Register';
import { AppRoutes } from '../types/AppRoutes';
import MisClientes from '../pages/MisClientes';
import MisTrabajos from '../pages/MisTrabajos';
import NuevoTrabajo from '../pages/NuevoTrabajo';
import ClientePage from '../pages/ClientePage';
import UserProfile from '../pages/UserProfile';
import { GuestHome } from '../pages/GuestHome';
import MisUsuarios from '../pages/Usuarios';
import { useAuth } from '../context/AuthContext';

export const AppRouter = () => {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path='/app' element={<AppLayout />}>
        <Route path={AppRoutes.HOME} element={<HomePage />} />
        <Route path={AppRoutes.MIS_CLIENTES} element={<MisClientes />} />
        <Route path={`${AppRoutes.MIS_CLIENTES}/:clienteId`} element={<ClientePage />} />
        <Route path={AppRoutes.MIS_TRABAJOS} element={<MisTrabajos />} />
        <Route path={AppRoutes.NUEVO_TRABAJO} element={<NuevoTrabajo />} />
        <Route path={AppRoutes.PROFILE} element={<UserProfile />} />
        {/* SOLO ADMIN */}
        {role === 2 && (
          <Route path={AppRoutes.MIS_USUARIOS} element={<MisUsuarios />} />
        )}
      </Route>
      <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
      <Route path={AppRoutes.REGISTER} element={<Register />} />
      <Route path='/' element={<AppLayout />}>
        <Route path={AppRoutes.GUEST_HOME} element={<GuestHome />} />
      </Route>
      <Route path='*' element={<Navigate to='/app' />} />
    </Routes>
  );
};
