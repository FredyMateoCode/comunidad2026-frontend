import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';


import Espera from '../../../componentes/Cards/Espera.jsx'


export default function VistaNoticias() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Box
          sx={{
            display: 'flex',          // 1. Usa Flexbox
            justifyContent: 'center', // 2. Centra el contenido horizontalmente
            width: '100%',            // Asegura que ocupe el 100% del ancho disponible
          }}
        >
          <Espera />
        </Box>
      </Grid>
      <Typography variant="body1">
          <br /> 
      </Typography>
    </Box>

  );
}