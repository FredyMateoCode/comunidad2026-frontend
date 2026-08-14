import api from './api.js';

export const cambiarEstadoComunero = async ({ dni_com, estado_com, id_us }) => {
  // Cambiar api.patch por api.put
  const respuesta = await api.put(`/api/comuneros2026/${dni_com}/estado`, {
    estado_com,
    id_us
  });
  return respuesta.data;
};