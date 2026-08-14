import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChildCareIcon from '@mui/icons-material/ChildCare';

import CardDato from '../CardDato';
import CardVacia from '../CardVacia';
import { calcularEdad } from '../utils';

export default function TabFamilia({ ficha }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02306f' }}>Cónyuge / Pareja</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {ficha.datos_conyuge ? (
            <CardDato 
              icon={<FavoriteIcon />} 
              titulo="Datos del Cónyuge" 
              valor={`${ficha.datos_conyuge.nombre} ${ficha.datos_conyuge.ap_paterno} ${ficha.datos_conyuge.ap_materno}`}
              subValor={`DNI: ${ficha.datos_conyuge.dni}`}
            />
          ) : (
            <CardVacia texto="No registra cónyuge o pareja." />
          )}
        </Grid>
      </Grid>

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02306f', mt: 1 }}>
        Hijos Registrados ({ficha.lista_hijos?.length || 0})
      </Typography>
      <Grid container spacing={2}>
        {ficha.lista_hijos && ficha.lista_hijos.length > 0 ? (
          ficha.lista_hijos.map((hijo, idx) => (
            <Grid item xs={12} sm={6} md={4} key={hijo.id || idx}>
              <CardDato 
                icon={<ChildCareIcon />} 
                titulo={`Hijo(a) - DNI: ${hijo.dni || 'N/A'}`} 
                valor={`${hijo.nombre} ${hijo.apellidos}`}
                subValor={`F. Nacimiento: ${hijo.fecha_nac || 'N/A'} (${calcularEdad(hijo.fecha_nac)})`}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <CardVacia texto="No registra hijos en el padrón." />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}