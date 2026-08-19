import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import TablaHistorial from '../../../componentes/Tablas/TablaHistorial.jsx';
import ModalHistorial from '../../../componentes/Modals/ModalHistorial.jsx';

export default function VistaHistorial() {
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Abrir el modal pasando los datos del registro seleccionado
  const handleVerDetalle = (registro) => {
    setRegistroSeleccionado(registro);
    setModalAbierto(true);
  };

  // Cerrar el modal y limpiar la selección
  const handleCerrarModal = () => {
    setModalAbierto(false);
    setRegistroSeleccionado(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Historial de Cambios
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Registro de auditoría de operaciones realizadas en la plataforma.
        </Typography>
      </Box>

      {/* Tabla Principal */}
      <TablaHistorial onVerDetalle={handleVerDetalle} />

      {/* Modal para Comparar Detalle */}
      <ModalHistorial
        open={modalAbierto}
        onClose={handleCerrarModal}
        registro={registroSeleccionado}
      />
    </Container>
  );
}