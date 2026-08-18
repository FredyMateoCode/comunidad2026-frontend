import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Swal from 'sweetalert2';

import { obtenerUsuarios } from '../../../servicios/obtenerUsuarios.js';
import { crearUsuario } from '../../../servicios/crearUsuario.js';
import { actualizarUsuario } from '../../../servicios/actualizarUsuario.js';
import TablaUsuarios from '../../../componentes/Tablas/TablaUsuarios.jsx';

export default function VistaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleGuardarUsuario = async (formData, isEditing) => {
    try {
      if (isEditing) {
        await actualizarUsuario(formData);
      } else {
        await crearUsuario(formData);
      }

      await cargarDatos();

      Swal.fire({
        icon: 'success',
        title: isEditing ? '¡Actualizado!' : '¡Creado!',
        text: isEditing 
          ? 'El usuario se actualizó correctamente.' 
          : 'El usuario se registró exitosamente.',
        timer: 2000,
        showConfirmButton: false
      });

    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.mensaje || 'No se pudo guardar la información del usuario.',
        confirmButtonColor: '#d33'
      });
    }
  };

  // 🔴 Nueva función para cambiar el estado (Activar / Desactivar)
  const handleCambiarEstado = async (usuario) => {
    const nuevoEstado = usuario.estado_us === 1 ? 0 : 1;
    const accionTexto = nuevoEstado === 1 ? 'activar' : 'desactivar';

    const result = await Swal.fire({
      title: `¿Deseas ${accionTexto} a este usuario?`,
      text: `El usuario "${usuario.nombres_us} ${usuario.apellidos_us}" pasará a estar ${nuevoEstado === 1 ? 'Activo' : 'Inactivo'}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: nuevoEstado === 1 ? '#2e7d32' : '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: `Sí, ${accionTexto}`,
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        // Se envía solo el ID del usuario objetivo y el nuevo estado
        await actualizarUsuario({
          id_us: usuario.id_us,
          estado_us: nuevoEstado
        });

        await cargarDatos();

        Swal.fire({
          icon: 'success',
          title: '¡Estado cambiado!',
          text: `El usuario ha sido ${nuevoEstado === 1 ? 'activado' : 'desactivado'} correctamente.`,
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error al cambiar estado:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.response?.data?.mensaje || 'No se pudo cambiar el estado del usuario.',
          confirmButtonColor: '#d33'
        });
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Box
          sx={{
            display: 'flex',
            justify: 'center',
            width: '100%',
          }}
        >
          <TablaUsuarios 
            datos={usuarios} 
            cargando={cargando} 
            onGuardarUsuario={handleGuardarUsuario}
            onCambiarEstado={handleCambiarEstado} // 👈 Se conecta la prop
          />
        </Box>
      </Grid>
      <Typography variant="body1">
        <br />
      </Typography>
    </Box>
  );
}