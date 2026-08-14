import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import CardDato from '../CardDato';
import CardVacia from '../CardVacia';

export default function TabCargos({ ficha }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02306f' }}>Cargos Desempeñados</Typography>
      <Grid container spacing={2}>
        {ficha.lista_cargos && ficha.lista_cargos.length > 0 ? (
          ficha.lista_cargos.map((c, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <CardDato icon={<BadgeIcon />} titulo={`Año: ${c.anio}`} valor={c.cargo} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}><CardVacia texto="Sin cargos registrados." /></Grid>
        )}
      </Grid>
    </Box>
  );
}