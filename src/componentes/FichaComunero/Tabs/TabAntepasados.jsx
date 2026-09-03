import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CardDato from '../CardDato';
import CardVacia from '../CardVacia';

// Importa el servicio correspondiente de tu carpeta servicios
import { obtenerFichaComunero } from '../../../servicios/fichaComunero.js';

export default function TabAntepasados({ dni, ficha, onUpdateTabSection }) {
  const [cargandoTab, setCargandoTab] = useState(false);

  useEffect(() => {
    const fetchAntepasadosFrescos = async () => {
      if (!dni) return;
      setCargandoTab(true);

      try {
        const res = await obtenerFichaComunero(dni);
        const listaFresca = res.lista_antepasados || res.antepasados || [];

        // Notifica únicamente esta sección para la impresión A4
        if (onUpdateTabSection) {
          onUpdateTabSection({ lista_antepasados: listaFresca });
        }
      } catch (error) {
        console.error("Error al obtener antepasados:", error);
      } finally {
        setCargandoTab(false);
      }
    };

    fetchAntepasadosFrescos();
  }, [dni]);

  const listaAntepasados = ficha.lista_antepasados || ficha.antepasados || [];

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
        Antepasados Registrados
      </Typography>
      
      <Grid container spacing={2}>
        {listaAntepasados.length > 0 ? (
          listaAntepasados.map((ant, i) => {
            const nombres = ant.nombres_ant || ant.nombres || ant.nombre || '';
            const apellidos = ant.apellidos_ant || ant.apellidos || '';
            const tipo = ant.tipo_ant || ant.tipo || ant.parentesco || 'N/A';
            
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