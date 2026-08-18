// Ruta: servicios/actualizarUsuario.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

// Función auxiliar para extraer el payload del JWT
const obtenerPayloadToken = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error al decodificar el token:', e);
    return null;
  }
};

export const actualizarUsuario = async (datosUsuario) => {
  // 1. Obtener el token del localStorage
  const token = localStorage.getItem('auth-token');

  // 2. Extraer los datos guardados DENTRO del token
  const tokenData = obtenerPayloadToken(token);

  // Extrae el ID del usuario que está ejecutando la acción (actualizador)
  const idUsActualizador = tokenData?.id_us || tokenData?.id || tokenData?.id_usuario;

  // 3. Separar el ID del registro objetivo y armar el payload final
  const { id_us, ...restoDatos } = datosUsuario;

  const payloadFinal = {
    ...restoDatos,
    id_us_actualizador: idUsActualizador // ID de quien realiza la actualización
  };

  console.log(`JSON enviado para actualizar usuario ID (${id_us}):`, payloadFinal);

  // 4. Petición PUT hacia el endpoint
  const respuesta = await axios.put(
    `${API_URL}/actualizarUsuario/${id_us}`,
    payloadFinal,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  );

  return respuesta.data;
};