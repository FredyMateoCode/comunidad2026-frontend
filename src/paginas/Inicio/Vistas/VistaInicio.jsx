// VistaInicio.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import CarouselVertical from '../../../componentes/Carousels/CarouselVertical';
import CardSlider from '../../../componentes/CardSliders/CardSlider.jsx';
import Podcast from '../../../componentes/AudioPlayers/Podcast.jsx';

import Negreria from '../../../componentes/Cards/Negreria.jsx';
import Viejo from '../../../componentes/Cards/Viejo.jsx';
import Chunguinada from '../../../componentes/Cards/Chunguinada.jsx';
import Herranza from '../../../componentes/Cards/Herranza.jsx';


export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 12 }}>
          <CarouselVertical />
        </Grid>
        <Grid size={{ xs: 12, md:12 }}>
          <CardSlider />
        </Grid>
        <Box
          sx={{
            display: 'flex',          // 1. Usa Flexbox
            justifyContent: 'center', // 2. Centra el contenido horizontalmente
            width: '100%',            // Asegura que ocupe el 100% del ancho disponible
          }}
        >
          <Podcast /> 
        </Box>
        <Grid size={{ xs: 12, md:3 }}>
           <Negreria />
        </Grid>
        <Grid size={{ xs: 12, md:3 }}>
           <Viejo />
        </Grid>
        <Grid size={{ xs: 12, md:3 }}>
           <Chunguinada />
        </Grid>
        <Grid size={{ xs: 12, md:3 }}>
           <Herranza />
        </Grid>
      </Grid>
      <Typography variant="body1">
          <br /> 
      </Typography>
    </Box>
  );
}
