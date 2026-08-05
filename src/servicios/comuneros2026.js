//Servicio para realizar la petición de la lista de todos los comuneros2026

import api from './api';

// Petición al endpoint optimizado
export const obtenerComuneros2026 = async () => {
  const respuesta = await api.get('/api/comuneros2026');
  return respuesta.data;
};