import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Chip, CircularProgress } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import CardVacia from '../CardVacia';
import { obtenerFichaComunero } from '../../../servicios/fichaComunero.js';

export default function TabFaenas({ dni, ficha, onUpdateTabSection }) {
  const [cargandoTab, setCargandoTab] = useState(false);

  useEffect(() => {
    const fetchFaenasFrescas = async () => {
      if (!dni) return;
      setCargandoTab(true);

      try {
        const res = await obtenerFichaComunero(dni);
        const listaFresca = res.lista_faenas || res.faenas || res.historial_faenas || [];

        if (onUpdateTabSection) {
          onUpdateTabSection({ lista_faenas: listaFresca });
        }
      } catch (error) {
        console.error("Error al obtener faenas:", error);
      } finally {
        setCargandoTab(false);
      }
    };

    fetchFaenasFrescas();
  }, [dni]);

  const listaFaenas = ficha.lista_faenas || ficha.faenas || ficha.historial_faenas || [];

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
        Cumplimiento de Faenas Comunales
      </Typography>

      <Grid container spacing={2}>
        {listaFaenas.length > 0 ? (
          listaFaenas.map((f, i) => {
            const nombreFaena = f.faena || f.nombre_faena || f.descripcion || 'Faena Comunal';
            const fechaVal = f.fecha || f.fecha_faena || '';
            const esRealizado = Number(f.estado !== undefined ? f.estado : f.cumplio) === 1;

            return (
              <Grid item xs={12} sm={6} md={4} key={f.id_faena || i}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2.5, 
                    borderColor: '#e0e0e0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justify: 'space-between', 
                    gap: 2 
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: '#eef6ff', p: 1.2, borderRadius: 2, display: 'flex', color: '#02306f' }}>
                      <ConstructionIcon fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                        {nombreFaena}
                      </Typography>
                      {fechaVal && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {fechaVal}
                        </Typography>
                      )}
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
          <Grid item xs={12}>
            <CardVacia texto="Sin faenas registradas." />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}