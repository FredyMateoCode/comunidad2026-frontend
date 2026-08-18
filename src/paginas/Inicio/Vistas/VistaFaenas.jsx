import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

// Importación nombrada usando llaves
import { obtenerFaenas } from '../../../servicios/obtenerFaenas.js';
// import { crearFaena } from '../../../servicios/crearFaena.js';
// import { actualizarFaena } from '../../../servicios/actualizarFaena.js';
// import { eliminarFaena } from '../../../servicios/eliminarFaena.js';
import TablaFaenas from '../../../componentes/Tablas/TablaFaenas.jsx';

export default function VistaFaenas() {
  const [faenas, setFaenas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const data = await obtenerFaenas();
      setFaenas(data);
    } catch (error) {
      console.error('Error al obtener faenas:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  /* 
  const handleGuardarFaena = async (formData, isEditing) => {
    // ...
  };

  const handleEliminarFaena = async (faena) => {
    // ...
  };
  */

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <TablaFaenas 
            datos={faenas} 
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