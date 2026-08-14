import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

/**
 * Prepara el FormData y realiza la petición HTTP para actualizar un comunero.
 */
export const actualizarComuneroService = async (formData) => {
  // 1. Obtener datos de sesión
  const usuarioStorage = JSON.parse(localStorage.getItem('usuario') || '{}');
  const token = localStorage.getItem('auth-token') || usuarioStorage.token;
  const idUsuario = usuarioStorage.id_us || usuarioStorage.id_usu || 1;

  // 2. Limpieza de fecha
  const fechaLimpia = formData.fecha_nac_com 
    ? String(formData.fecha_nac_com).substring(0, 10) 
    : null;

  // 3. Preparar payload
  const payloadFinal = {
    ...formData,
    fecha_nac_com: fechaLimpia,
    id_us: idUsuario,
    accion: 'ACTUALIZAR_COMUNERO'
  };

  // 4. Construir FormData
  const dataToSend = new FormData();

  if (payloadFinal.foto_file) {
    dataToSend.append('foto', payloadFinal.foto_file);
  }

  dataToSend.append('datos_conyuge', JSON.stringify(payloadFinal.datos_conyuge || {}));
  dataToSend.append('lista_hijos', JSON.stringify(payloadFinal.lista_hijos || []));
  dataToSend.append('lista_cargos', JSON.stringify(payloadFinal.lista_cargos || []));
  dataToSend.append('lista_antepasados', JSON.stringify(payloadFinal.lista_antepasados || []));

  const camposEspeciales = [
    'foto_file', 
    'datos_conyuge', 
    'lista_hijos', 
    'lista_cargos', 
    'lista_antepasados',
    'id_cas',
    'nombre_usufructo',
    'nombre_caserio',
    'dni_conyuge'
  ];

  Object.keys(payloadFinal).forEach((key) => {
    if (!camposEspeciales.includes(key) && payloadFinal[key] !== undefined && payloadFinal[key] !== null) {
      dataToSend.append(key, payloadFinal[key]);
    }
  });

  // 5. Petición HTTP
  const respuesta = await axios.put(
    `${API_URL}/actualizarComunero/${payloadFinal.dni_com}`,
    dataToSend,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  );

  return respuesta.data;
};