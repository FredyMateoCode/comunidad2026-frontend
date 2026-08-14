import React from 'react';
import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CardVacia from '../CardVacia';

export default function TabAsambleas({ ficha }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02306f' }}>Historial de Asistencias</Typography>
      <Grid container spacing={2}>
        {ficha.historial_asambleas && ficha.historial_asambleas.length > 0 ? (
          ficha.historial_asambleas.map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2.5, borderColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: '#eef6ff', p: 1.2, borderRadius: 2, display: 'flex', color: '#02306f' }}>
                    <EventAvailableIcon fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', display: 'block' }}>{item.fecha || 'Sin fecha'}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#333', mt: 0.3 }}>{item.asamblea}</Typography>
                  </Box>
                </Box>
                <Chip 
                  label={item.asistio === 1 ? 'Asistió' : item.asistio === 2 ? 'Justificó' : 'Faltó'} 
                  color={item.asistio === 1 ? 'success' : item.asistio === 2 ? 'warning' : 'error'} 
                  size="small" 
                  sx={{ fontWeight: 'bold' }}
                />
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}><CardVacia texto="No hay registro de asambleas para este comunero." /></Grid>
        )}
      </Grid>
    </Box>
  );
}