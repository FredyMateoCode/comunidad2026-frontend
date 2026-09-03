import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Chip, CircularProgress } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CardVacia from '../CardVacia';
import { obtenerFichaComunero } from '../../../servicios/fichaComunero.js';

export default function TabAsambleas({ dni, ficha, onUpdateTabSection }) {
  const [cargandoTab, setCargandoTab] = useState(false);

  useEffect(() => {
    const fetchAsambleasFrescas = async () => {
      if (!dni) return;
      setCargandoTab(true);

      try {
        const res = await obtenerFichaComunero(dni);
        // Extrae la respuesta tolerando estructuras backend anidadas
        const data = res?.datos || res?.data || res || {};
        const listaFresca = data.lista_asambleas || data.asambleas || data.historial_asambleas || [];

        if (onUpdateTabSection) {
          onUpdateTabSection({ 
            lista_asambleas: listaFresca,
            asambleas: listaFresca 
          });
        }
      } catch (error) {
        console.error("Error al obtener asambleas:", error);
      } finally {
        setCargandoTab(false);
      }
    };

    fetchAsambleasFrescas();
  }, [dni]);

  const listaAsambleas = ficha?.lista_asambleas || ficha?.asambleas || ficha?.historial_asambleas || [];

  if (cargandoTab) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02306f' }}>
        Historial de Asistencias
      </Typography>

      <Grid container spacing={2}>
        {listaAsambleas.length > 0 ? (
          listaAsambleas.map((item, idx) => {
            const fechaVal = item.fecha || item.fecha_asamblea || 'Sin fecha';
            const nombreAsamblea = item.asamblea || item.nombre_asamblea || item.descripcion || 'Asamblea General';
            const asistioVal = Number(item.asistio !== undefined ? item.asistio : item.estado);

            return (
              <Grid item xs={12} sm={6} md={4} key={item.id_asamblea || idx}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2.5, 
                    borderColor: '#e0e0e0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    gap: 2 
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: '#eef6ff', p: 1.2, borderRadius: 2, display: 'flex', color: '#02306f' }}>
                      <EventAvailableIcon fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', display: 'block' }}>
                        {fechaVal}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#333', mt: 0.3 }}>
                        {nombreAsamblea}
                      </Typography>
                    </Box>
                  </Box>

                  <Chip 
                    label={asistioVal === 1 ? 'Asistió' : asistioVal === 2 ? 'Justificó' : 'Faltó'} 
                    color={asistioVal === 1 ? 'success' : asistioVal === 2 ? 'warning' : 'error'} 
                    size="small" 
                    sx={{ fontWeight: 'bold' }}
                  />
                </Paper>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <CardVacia texto="No hay registro de asambleas para este comunero." />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}