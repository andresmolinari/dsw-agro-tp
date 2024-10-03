import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../common/AppLayout';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import Register from '../pages/Register';
import { AppRoutes } from '../types/AppRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route path={AppRoutes.HOME} element={<HomePage />} />
      </Route>
      <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
      <Route path={AppRoutes.REGISTER} element={<Register />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};
