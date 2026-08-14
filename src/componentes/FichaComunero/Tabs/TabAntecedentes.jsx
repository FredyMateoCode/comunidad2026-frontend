import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CardDato from '../CardDato';
import CardVacia from '../CardVacia';

export default function TabAntecedentes({ ficha }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02306f' }}>Antecedentes Registrados</Typography>
      <Grid container spacing={2}>
        {ficha.antecedentes_comunero && ficha.antecedentes_comunero.length > 0 ? (
          ficha.antecedentes_comunero.map((ant, i) => (
            <Grid item xs={12} key={i}>
              <CardDato icon={<ReportProblemIcon />} titulo={`Fecha: ${ant.fecha || 'N/A'}`} valor={ant.motivo} subValor={ant.observacion} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}><CardVacia texto="Sin antecedentes ni sanciones registradas." /></Grid>
        )}
      </Grid>
    </Box>
  );
}