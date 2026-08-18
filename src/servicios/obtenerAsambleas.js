import api from './api';

export const obtenerAsambleas = async () => {
  try {
    const respuesta = await api.get('/api/asambleas');
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener la lista de asambleas:', error);
    throw error;
  }
};