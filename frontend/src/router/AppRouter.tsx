import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}></Route>
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};
