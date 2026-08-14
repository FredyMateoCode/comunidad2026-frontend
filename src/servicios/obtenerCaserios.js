import api from './api.js';

/**
 * Obtiene la todos los caseríos de la tabla caserios de la bd
 * Ruta final: http://10.94.99.180:4000/api/caserios
 * 
 */
export const obtenerCaserios = async () => {
  try {
    const respuesta = await api.get(`/api/caserios`);
    return respuesta.data;
  } catch (error) {
    console.error(`Error al obtener los caserios:`, error);
    throw error;
  }
};