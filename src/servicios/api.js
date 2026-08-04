//Recibe todas la peticiones de los componentes del Frontend y los canaliza al backend
import axios from 'axios';

// 1. Obtiene la URL correspondiente (Desarrollo o Producción) desde tus archivos .env
const API_URL = import.meta.env.VITE_API_URL;

// 2. Crea la instancia centralizada de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. Interceptor automático: Si existe un token en el navegador, lo adjunta a la petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;