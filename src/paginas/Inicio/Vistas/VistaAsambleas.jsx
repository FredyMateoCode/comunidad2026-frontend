import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

// Importación nombrada usando llaves
import { obtenerAsambleas } from '../../../servicios/obtenerAsambleas.js';
import TablaAsambleas from '../../../componentes/Tablas/TablaAsambleas.jsx';

export default function VistaAsambleas() {
  const [asambleas, setAsambleas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const data = await obtenerAsambleas();
      setAsambleas(data);
    } catch (error) {
      console.error('Error al obtener asambleas:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <TablaAsambleas 
            datos={asambleas} 
            cargando={cargando} 
          />
        </Box>
      </Grid>
      <Typography variant="body1">
        <br />
      </Typography>
    </Box>
  );
}