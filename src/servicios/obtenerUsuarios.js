import api from './api';

export const obtenerUsuarios = async () => {
  try {
    const respuesta = await api.get('/api/usuarios');
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    throw error;
  }
};