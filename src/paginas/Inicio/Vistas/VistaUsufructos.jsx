import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Swal from 'sweetalert2';

import { obtenerUsufructos } from '../../../servicios/obtenerUsufructos.js';
import { obtenerCaserios } from '../../../servicios/obtenerCaserios.js';
import { crearUsufructo } from '../../../servicios/crearUsufructo.js';
import TablaUsufructos from '../../../componentes/Tablas/TablaUsufructos.jsx';
import { editarUsufructo } from '../../../servicios/actualizarUsufructo.js';

export default function VistaUsufructos() {
  const [usufructos, setUsufructos] = useState([]);
  const [caserios, setCaserios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const [resUsufructos, resCaserios] = await Promise.all([
        obtenerUsufructos(),
        obtenerCaserios()
      ]);

      const dataUsufructos = Array.isArray(resUsufructos) ? resUsufructos : (resUsufructos?.data || []);
      const dataCaserios = Array.isArray(resCaserios) ? resCaserios : (resCaserios?.data || []);

      setUsufructos(dataUsufructos);
      setCaserios(dataCaserios);
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Función adaptada con SweetAlert2 para creación y actualización
  const handleGuardarUsufructo = async (formData, esEdicion) => {
    const titulo = esEdicion ? '¿Guardar cambios?' : '¿Crear nuevo usufructo?';
    const texto = esEdicion
      ? 'Se actualizarán los datos del usufructo seleccionado.'
      : 'Se registrará un nuevo usufructo en el sistema.';
    const mensajeExito = esEdicion
      ? 'Usufructo actualizado correctamente'
      : 'Usufructo creado exitosamente';

    const confirmacion = await Swal.fire({
      title: titulo,
      text: texto,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1976d2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        if (!esEdicion) {
          await crearUsufructo(formData);
        } else {
          await editarUsufructo(formData);
        }

        await Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: mensajeExito,
          timer: 1800,
          showConfirmButton: false
        });

        await cargarDatos();
      } catch (error) {
        console.error('❌ Error al guardar usufructo:', error.response?.data || error.message);
        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.mensaje || 'No se pudo procesar la solicitud.'
        });
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <TablaUsufructos 
            datos={usufructos} 
            caserios={caserios}
            cargando={cargando}
            onGuardarUsufructo={handleGuardarUsufructo}
          />
        </Box>
      </Grid>
      <Typography variant="body1">
        <br />
      </Typography>
    </Box>
  );
}