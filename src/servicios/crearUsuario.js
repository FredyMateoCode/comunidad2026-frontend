// Ruta: servicios/crearUsuario.js
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

export const crearUsuario = async (datosUsuario) => {
  // 1. Obtener el token del localStorage
  const token = localStorage.getItem('auth-token');

  // 2. Extraer los datos guardados DENTRO del token
  const tokenData = obtenerPayloadToken(token);
  
  // Revisa la clave exacta en el token (suele ser id_us, id, o id_usuario)
  const idUsAuditor = tokenData?.id_us || tokenData?.id || tokenData?.id_usuario;

  // 3. Limpiar id_us vacío del formulario y asignar el ID del auditor
  const { id_us: _, ...restoDatos } = datosUsuario;

  const payloadFinal = {
    ...restoDatos,
    id_us: idUsAuditor
  };

  console.log('JSON final enviado con id_us desde el token:', payloadFinal);

  // 4. Petición POST
  const respuesta = await axios.post(
    `${API_URL}/crearUsuario`,
    payloadFinal,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  );

  return respuesta.data;
};