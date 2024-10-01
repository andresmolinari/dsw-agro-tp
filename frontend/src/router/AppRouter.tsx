import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../common/AppLayout';
import HomePage from '../pages/Home'; // Corrige el nombre del componente
import LoginPage from '../pages/Login'; // Corrige el nombre del componente

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='home' element={<HomePage />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};
