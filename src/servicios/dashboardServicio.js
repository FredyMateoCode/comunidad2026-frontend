import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const obtenerDashboardServicio = async () => {
  try {
    // 1. Obtener token de sesión
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario') || '{}');
    const token = localStorage.getItem('auth-token') || usuarioStorage.token;

    // 2. Realizar petición enviando el header de autorización
    const respuesta = await axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener los datos del dashboard:", error);
    throw error;
  }
};