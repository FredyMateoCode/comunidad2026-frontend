import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

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

export const editarUsufructo = async (datosUsufructo) => {
  const token = localStorage.getItem('auth-token');
  const tokenData = obtenerPayloadToken(token);
  
  const idUsAuditor = tokenData?.id_us || tokenData?.id || tokenData?.id_usuario;

  const payloadFinal = {
    id_usu: datosUsufructo.id_usu,
    nombre_usu: datosUsufructo.nombre_usu,
    id_cas: Number(datosUsufructo.id_cas),
    id_us: idUsAuditor
  };

  console.log('✏️ Payload a enviar a PUT /api/actualizarUsufructo:', payloadFinal);

  const respuesta = await axios.put(
    `${API_URL}/actualizarUsufructo/${datosUsufructo.id_usu}`, 
    payloadFinal,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  );

  return respuesta.data;
};