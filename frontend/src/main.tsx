import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeConfig } from './components/theme.config';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeConfig>
        <App />
      </ThemeConfig>
    </AuthProvider>
  </BrowserRouter>
);
