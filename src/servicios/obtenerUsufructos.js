import api from './api.js';

/**
 * Obtiene la todos los caseríos de la tabla caserios de la bd
 * Ruta final: http://10.94.99.180:4000/api/usufructos
 * 
 */
export const obtenerUsufructos = async () => {
  try {
    const respuesta = await api.get(`/api/usufructos`);
    return respuesta.data;
  } catch (error) {
    console.error(`Error al obtener los usufructos:`, error);
    throw error;
  }
};