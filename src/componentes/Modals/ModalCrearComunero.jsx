import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import { FormEditarComunero2026 } from '../Formularios/FormEditarComunero2026.jsx';
import { crearComuneroService } from '../../servicios/insertarComunero.js';
import { obtenerCaserios } from '../../servicios/obtenerCaserios.js'; 

const estadoInicial = {
  // Datos Generales / Datos de Identificación
  dni_com: '',
  nombres_com: '',
  ap_paterno_com: '',
  ap_materno_com: '',
  est_civil_com: 'SOLTERO', // 🟢 Única propiedad para el Estado Civil
  genero_com: 'MASCULINO',
  condicion_com: 'INTEGRADO',
  g_instruccion_com: '',
  fecha_nac_com: '',
  estado_com: '1',
  
  // Ubicación / Caseríos / Usufructo
  id_cas: '',
  nombre_caserio: '',
  id_usu: '',
  nombre_usufructo: '',

  // Archivo
  foto_file: null,

  // Tabs / Arrays de Pestañas
  datos_conyuge: {},
  lista_hijos: [],
  lista_cargos: [],
  lista_antepasados: [],

  // Listas auxiliares para los desplegables
  caserios: [],
  listaCaserios: [],
  caserio: []
};

export const ModalCrearComunero = ({ open, onClose, onGuardar }) => {
  const [formData, setFormData] = useState(estadoInicial);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData(estadoInicial);

      const cargarCaseriosAlAbrir = async () => {
        try {
          const respuesta = await obtenerCaserios();

          let arrayCaserios = [];
          if (Array.isArray(respuesta)) {
            arrayCaserios = respuesta;
          } else if (respuesta && Array.isArray(respuesta.caserios)) {
            arrayCaserios = respuesta.caserios;
          } else if (respuesta && Array.isArray(respuesta.data)) {
            arrayCaserios = respuesta.data;
          }

          setFormData((prev) => ({
            ...prev,
            caserios: arrayCaserios,
            listaCaserios: arrayCaserios,
            caserio: arrayCaserios
          }));

        } catch (error) {
          console.error("Error al obtener los caseríos en el modal de creación:", error);
        }
      };

      cargarCaseriosAlAbrir();
    }
  }, [open]);

  // Manejador estándar de React
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => {
        const copia = { ...prev, [name]: value };
        delete copia.estado_civil_com; // 🟢 Garantizamos que nunca exista la clave duplicada
        return copia;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dniLimpio = (formData.dni_com || '').trim();

    if (!dniLimpio || dniLimpio.length !== 8) {
      return Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'El DNI del comunero debe tener 8 dígitos.',
        didOpen: () => {
          const container = document.querySelector('.swal2-container');
          if (container) container.style.zIndex = '99999';
        }
      });
    }

    setLoading(true);

    try {
      const dataPayload = new FormData();
      
      const payloadOriginal = {
        ...formData,
        dni_com: dniLimpio
      };

      // 1. Excluimos los arrays auxiliares y el objeto file para enviarlos de forma limpia
      const clavesAExcluir = ['caserios', 'listaCaserios', 'caserio', 'foto_file', 'estado_civil_com'];

      // 2. Procesa y adjunta cada clave
      Object.keys(payloadOriginal).forEach((key) => {
        if (clavesAExcluir.includes(key)) return;

        const valor = payloadOriginal[key];

        // Serializamos objetos y arrays
        if (typeof valor === 'object' && valor !== null) {
          dataPayload.append(key, JSON.stringify(valor));
        } else {
          dataPayload.append(key, valor ?? '');
        }
      });

      // 3. Adjunta la foto si existe
      if (formData.foto_file instanceof File) {
        dataPayload.append('foto', formData.foto_file);
      }

      // 🔍 Log de depuración
      console.log('=== DATOS ENVIADOS AL BACKEND ===');
      for (let [clave, valor] of dataPayload.entries()) {
        console.log(`${clave}:`, valor);
      }
      console.log('=================================');

      const dataRespuesta = await crearComuneroService(dataPayload);

      onClose();
      if (onGuardar) onGuardar(dataRespuesta);

      Swal.fire({
        icon: 'success',
        title: '¡Registrado!',
        text: dataRespuesta?.message || 'Comunero registrado correctamente.',
        confirmButtonColor: '#2e7d32',
        confirmButtonText: 'Aceptar',
        timer: 5500,
        didOpen: () => {
          const container = document.querySelector('.swal2-container');
          if (container) container.style.zIndex = '99999';
        }
      });

    } catch (error) {
      console.error("Error al crear comunero:", error.response?.data || error.message);
      
      const mensajeError = error.response?.data?.message 
        || error.response?.data?.mensaje 
        || 'No se pudo registrar la información.';

      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: mensajeError,
        confirmButtonColor: '#d32f2f',
        confirmButtonText: 'Entendido',
        didOpen: () => {
          const container = document.querySelector('.swal2-container');
          if (container) container.style.zIndex = '99999';
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', color: '#02306f' }}>
        Registrar Nuevo Comunero
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <FormEditarComunero2026 
            formData={formData} 
            onChange={handleChange} 
            setFormData={setFormData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit" disabled={loading}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? 'Registrando...' : 'Registrar Comunero'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};