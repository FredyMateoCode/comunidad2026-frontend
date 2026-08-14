import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const crearComuneroService = async (formDataPayload) => {
  // 1. Obtener token con las claves reales de tu app
  const usuarioStorage = JSON.parse(localStorage.getItem('usuario') || '{}');
  const token = localStorage.getItem('auth-token') || usuarioStorage.token;

  // 2. Petición HTTP
  const respuesta = await axios.post(
    `${API_URL}/crearComunero`,
    formDataPayload,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  );

  return respuesta.data;
};