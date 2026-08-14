import api from './api.js';

export const obtenerComuneroPorDNI = async (dni) => {
  try {
    const respuesta = await api.get(`/api/editar/${dni}`);
    return respuesta.data;
  } catch (error) {
    console.error(`Error al obtener los datos del comunero con DNI ${dni}:`, error);
    throw new Error('Error al obtener los datos del comunero');
  }
};