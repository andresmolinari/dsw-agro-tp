import { Snackbar, Alert } from '@mui/material';
import ReactDOM from 'react-dom/client';

class NotificationService {
  static showNotification(
    message: string,
    severity: 'error' | 'info' | 'warning'
  ) {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const root = ReactDOM.createRoot(div);
    const notification = (
      <Snackbar open autoHideDuration={6000}>
        <Alert severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );

    root.render(notification);

    setTimeout(() => {
      root.unmount();
      document.body.removeChild(div);
    }, 6000);
  }

  static error(message: string) {
    this.showNotification(message, 'error');
  }

  static info(message: string) {
    this.showNotification(message, 'info');
  }

  static warning(message: string) {
    this.showNotification(message, 'warning');
  }
}

export default NotificationService;
