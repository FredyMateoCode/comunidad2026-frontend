import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

// Importas el servicio y el componente UI correspondiente
import { obtenerUsuarios } from '../../../servicios/obtenerUsuarios.js';
import TablaUsuarios from '../../../componentes/Tablas/TablaUsuarios.jsx'; // Ajusta la ruta a tu carpeta de componentes

export default function VistaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* La vista solo renderiza el componente especializado pasándole los datos */}
          <TablaUsuarios datos={usuarios} cargando={cargando} />
        </Box>
      </Grid>
      <Typography variant="body1">
        <br />
      </Typography>
    </Box>
  );
}