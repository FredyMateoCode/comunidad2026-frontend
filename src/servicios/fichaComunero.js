import api from './api.js';

/**
 * Obtiene la ficha completa de un comunero por su DNI.
 * Ruta final: http://10.94.99.180:4000/api/ficha/:dni
 * 
 * @param {string} dni - Número de DNI del comunero
 * @returns {Promise<Object>} Datos completos del comunero
 */
export const obtenerFichaComunero = async (dni) => {
  try {
    const respuesta = await api.get(`/api/ficha/${dni}`);
    return respuesta.data;
  } catch (error) {
    console.error(`Error al obtener la ficha del comunero con DNI ${dni}:`, error);
    throw error;
  }
};