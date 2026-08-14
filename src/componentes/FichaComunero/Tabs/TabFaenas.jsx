import React from 'react';
import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import CardVacia from '../CardVacia';

export default function TabFaenas({ ficha }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02306f' }}>Cumplimiento de Faenas</Typography>
      <Grid container spacing={2}>
        {ficha.historial_faenas && ficha.historial_faenas.length > 0 ? (
          ficha.historial_faenas.map((f, i) => {
            const esRealizado = Number(f.estado) === 1;
            return (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2.5, borderColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: '#eef6ff', p: 1.2, borderRadius: 2, display: 'flex', color: '#02306f' }}>
                      <ConstructionIcon fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>{f.faena}</Typography>
                      {f.fecha && <Typography variant="caption" color="text.secondary">{f.fecha}</Typography>}
                    </Box>
                  </Box>
                  <Chip 
                    label={esRealizado ? 'Realizado' : 'No realizado'} 
                    color={esRealizado ? 'success' : 'error'} 
                    size="small" 
                    sx={{ fontWeight: 'bold' }}
                  />
                </Paper>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}><CardVacia texto="Sin faenas registradas." /></Grid>
        )}
      </Grid>
    </Box>
  );
}