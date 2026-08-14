import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Alert, Backdrop } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';

import FichaComunero from './FichaComunero';
import { ModalEditarComunero } from '../Modals/ModalEditarComunero2026.jsx';
import { obtenerFichaComunero } from '../../servicios/fichaComunero.js';
import { obtenerComuneroPorDNI } from '../../servicios/editarComunero.js'; 
import { cambiarEstadoComunero } from '../../servicios/cambiarEstadoComunero.js'; // Ajusta esta ruta a tu servicio de API

export default function FichaComuneroContainer({ dni, onVolver }) {
  const [fichaData, setFichaData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // ESTADOS PARA EL MODAL DE EDICIÓN
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [datosEditar, setDatosEditar] = useState(null);
  const [cargandoEditar, setCargandoEditar] = useState(false);

  // 1. FUNCIÓN REUSABLE PARA RECUPERAR Y REFRESCAR LA FICHA
  const cargarFicha = () => {
    setCargando(true);
    obtenerFichaComunero(dni)
      .then(setFichaData)
      .catch(() => setError("No se pudo cargar la ficha del comunero."))
      .finally(() => setCargando(false));
  };

  // Carga inicial al montar el componente o cambiar de DNI
  useEffect(() => {
    cargarFicha();
  }, [dni]);

  // Abrir modal y obtener datos limpios
  const handleAbrirEditar = async () => {
    setCargandoEditar(true);
    try {
      const respuestaBackend = await obtenerComuneroPorDNI(dni);
      setDatosEditar(respuestaBackend);
      setModalEditarOpen(true);
    } catch (err) {
      console.error("Error al obtener datos para edición:", err);
      alert("No se pudieron obtener los datos para editar.");
    } finally {
      setCargandoEditar(false);
    }
  };

  // 2. FUNCIÓN PARA CAMBIAR EL ESTADO (DESACTIVAR / ACTIVAR)
  const handleToggleEstado = async (dni_com, estadoActual) => {
    const esActivo = Number(estadoActual) === 1;
    const nuevoEstado = esActivo ? 0 : 1;
    const accionTexto = esActivo ? 'desactivar' : 'activar';

    // Modal de confirmación
    const confirmacion = await Swal.fire({
      title: `¿Deseas ${accionTexto} a este comunero?`,
      text: esActivo 
        ? 'El comunero pasará a estar inactivo y no aparecerá en el listado principal.' 
        : 'El comunero volverá a estar activo en el sistema.',
      icon: esActivo ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonColor: esActivo ? '#d32f2f' : '#2e7d32',
      cancelButtonColor: '#6c757d',
      confirmButtonText: `Sí, ${accionTexto}`,
      cancelButtonText: 'Cancelar'
    });

    if (!confirmacion.isConfirmed) return;

    try {
      // Capturamos id_us desde el almacenamiento o sesión
      const id_us = localStorage.getItem('id_us') || 1;

      // Petición HTTP al Backend
      await cambiarEstadoComunero({
        dni_com,
        estado_com: nuevoEstado,
        id_us
      });

      Swal.fire({
        icon: 'success',
        title: 'Estado actualizado',
        text: `El comunero fue ${esActivo ? 'desactivado' : 'activado'} correctamente.`,
        timer: 1800,
        showConfirmButton: false
      });

      // Refrescamos los datos completos
      cargarFicha();

    } catch (err) {
      console.error('Error al cambiar el estado:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'No se pudo actualizar el estado del comunero.'
      });
    }
  };

  // REFRESCADO INMEDIATO TRAS GUARDAR EN EL MODAL
  const handleGuardarCambios = () => {
    cargarFicha();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={onVolver}
        sx={{ color: '#02306f', borderColor: '#02306f', fontWeight: 'bold', mb: 2 }}
      >
        Volver al Padrón
      </Button>

      {/* Carga inicial del componente */}
      {cargando && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={50} />
        </Box>
      )}

      {/* Loader flotante al presionar Editar */}
      <Backdrop
        open={cargandoEditar}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      {!cargando && fichaData && (
        <FichaComunero 
          ficha={fichaData} 
          onEditar={handleAbrirEditar} 
          onToggleEstado={handleToggleEstado}
        />
      )}

      <ModalEditarComunero
        open={modalEditarOpen}
        onClose={() => setModalEditarOpen(false)}
        datosIniciales={datosEditar}
        onGuardar={handleGuardarCambios}
      />
    </Box>
  );
}