import { useNavigate } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { AppRoutes } from './types/AppRoutes';
import NotificationService from './utils/NotificationService';

const App: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
    // Your effect logic here
    const token = localStorage.getItem('token');
    if (token !== null && token !== undefined && token !== '') {
      login();

      navigate(AppRoutes.HOME);
    } else {
      navigate(AppRoutes.LOGIN);
      NotificationService.error('Token no valido');
    }
  }, []);
  return <AppRouter />;
};

export default App;
// VERIFICAR VENCIMIENTO DEL TOKEN (SI VENCE EL TOKEN,BORRAR EL TOKEN DEL LOCALSTORAGE Y QUE ME DESLOGEE)
