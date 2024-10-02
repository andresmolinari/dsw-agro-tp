import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../common/AppLayout';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route path='home' element={<HomePage />} />
      </Route>
      <Route path='login' element={<LoginPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};
