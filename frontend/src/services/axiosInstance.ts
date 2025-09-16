import axios from 'axios';

const HttpClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor para agregar el token en el encabezado Authorization
HttpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default HttpClient;
