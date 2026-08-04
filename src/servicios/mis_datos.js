import api from './api'; // Importas Tu api.js que se encuentra al mismo nivel de carpeta

/**
 * Trae los datos del perfil del usuario logueado
 * Endpoint: http://localhost:4000/api/perfil
 */
export const obtenerMisDatos = async () => {
  try {
    const respuesta = await api.get('/api/perfil');
    return respuesta.data; // Retorna los datos que enviará el backend
  } catch (error) {
    console.error("Error en servicio mis_datos:", error);
    throw error; // Lanza el error para que la Card lo maneje
  }
};