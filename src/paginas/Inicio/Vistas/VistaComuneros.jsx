import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';


import Espera from '../../../componentes/Cards/Espera.jsx'


export default function VistaCOmuneros() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Box
          sx={{
            display: 'flex',          // 1. Usa Flexbox
            justifyContent: 'center', // 2. Centra el contenido horizontalmente
            width: '100%',            // Asegura que ocupe el 100% del ancho disponible
          }}
        >
          <Typography variant="h4">Soy la Vista Datos de Comunero</Typography>
        </Box>
        <Grid size={{ xs: 12, md:3 }}>
           <Espera />
        </Grid>
      </Grid>
      <Typography variant="body1">
          <br /> 
      </Typography>
    </Box>

  );
}