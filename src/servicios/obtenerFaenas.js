import api from './api';

export const obtenerFaenas = async () => {
  try {
    const respuesta = await api.get('/api/faenas');
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener la lista de faenas:', error);
    throw error;
  }
};