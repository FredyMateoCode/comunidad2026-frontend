import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CardDato from '../CardDato';
import CardVacia from '../CardVacia';

export default function TabAntepasados({ ficha }) {
  // Evaluamos si antepasados viene como 'antepasados' o 'lista_antepasados'
  const listaAntepasados = ficha.antepasados || ficha.lista_antepasados || [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02306f' }}>
        Antepasados Registrados
      </Typography>
      
      <Grid container spacing={2}>
        {listaAntepasados.length > 0 ? (
          listaAntepasados.map((ant, i) => {
            // Mapeo seguro para capturar nombres, apellidos, parentesco y estado
            const nombres = ant.nombres_ant || ant.nombres || ant.nombre || '';
            const apellidos = ant.apellidos_ant || ant.apellidos || '';
            const tipo = ant.tipo_ant || ant.tipo || ant.parentesco || 'N/A';
            
            // Evalúa si es 1 (numeric o string) para considerar si vive
            const viveVal = ant.vive_ant !== undefined ? ant.vive_ant : ant.vive;
            const estaVivo = Number(viveVal) === 1;

            return (
              <Grid item xs={12} sm={6} md={4} key={ant.id_ant || i}>
                <CardDato 
                  icon={<FamilyRestroomIcon />} 
                  titulo={`${nombres} ${apellidos}`.trim() || 'Sin Nombre'} 
                  valor={`Parentesco: ${tipo}`} 
                  subValor={`Estado: ${estaVivo ? 'Vive' : 'Fallecido'}`} 
                />
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <CardVacia texto="Sin antepasados registrados." />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}