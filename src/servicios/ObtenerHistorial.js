import api from './api';

export const obtenerHistorial = async () => {
  try {
    const respuesta = await api.get('/api/mostrarHistorial');
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener el historial de cambios:', error);
    throw error;
  }
};