import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { obtenerDashboardServicio } from '../../../servicios/dashboardServicio.js';
import DashboardGraficos from '../../../componentes/Dashboard/DashboardGraficos.jsx';

export default function DashboardVista() {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuesta = await obtenerDashboardServicio();
        setData(respuesta);
      } catch {
        setError('No se pudieron cargar los datos del dashboard.');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
        Dashboard General
      </Typography>
      {data && <DashboardGraficos data={data} />}
    </Box>
  );
}