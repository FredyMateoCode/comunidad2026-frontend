import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Card, CardContent, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChildCareIcon from '@mui/icons-material/ChildCare';

import CardDato from '../CardDato';
import CardVacia from '../CardVacia';
import { calcularEdad } from '../Utils';

import { obtenerFichaComunero } from '../../../servicios/fichaComunero.js';

export default function TabFamilia({ dni, ficha, onUpdateTabSection }) {
  const [cargandoTab, setCargandoTab] = useState(false);

  useEffect(() => {
    const fetchFamiliaFresca = async () => {
      if (!dni) return;
      setCargandoTab(true);

      try {
        const res = await obtenerFichaComunero(dni);

        if (onUpdateTabSection) {
          onUpdateTabSection({
            datos_conyuge: res.datos_conyuge || null,
            lista_hijos: res.lista_hijos || []
          });
        }
      } catch (error) {
        console.error("Error al obtener la carga familiar:", error);
      } finally {
        setCargandoTab(false);
      }
    };

    fetchFamiliaFresca();
  }, [dni]);

  const conyuge = ficha?.datos_conyuge || ficha?.conyuge;
  const hijos = ficha?.lista_hijos || ficha?.hijos || [];

  if (cargandoTab) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Mapeo unificado completo de variables del cónyuge
  const dniCon = conyuge?.dni_con || conyuge?.dni || conyuge?.dni_conyuge || 'N/A';
  
  const nombresStr = conyuge?.nombres_con || conyuge?.nombres || conyuge?.nombre || '';
  const paternoStr = conyuge?.ap_paterno_con || conyuge?.ap_paterno || conyuge?.apellidos || '';
  const maternoStr = conyuge?.ap_materno_con || conyuge?.ap_materno || '';
  
  const nombreCon = `${nombresStr} ${paternoStr} ${maternoStr}`.trim() || 'Sin Nombre';

  const celularCon = conyuge?.celular_con || conyuge?.celular || conyuge?.telefono || 'N/A';
  const fechaNacCon = conyuge?.fecha_nac_con || conyuge?.fecha_nac || conyuge?.f_nacimiento || 'N/A';
  const lugarNacCon = conyuge?.lugar_nac_con || conyuge?.lugar_nac || conyuge?.lugar_nacimiento || 'N/A';
  const estCivilCon = conyuge?.est_civil_con || conyuge?.est_civil || conyuge?.estado_civil || 'N/A';
  const gradoCon = conyuge?.grado_con || conyuge?.grado || conyuge?.grado_instruccion || 'N/A';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02306f' }}>
        Cónyuge / Pareja
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {conyuge ? (
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                {/* Cabecera Principal */}
                <Box display="flex" alignItems="center" gap={2} mb={1.5}>
                  <Box
                    sx={{
                      bgcolor: '#e8f0fe',
                      color: '#1976d2',
                      p: 1.5,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FavoriteIcon fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold">
                      DATOS DEL CÓNYUGE
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary.dark" sx={{ lineHeight: 1.2 }}>
                      {nombreCon}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="medium">
                      DNI: {dniCon}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* Detalle Ampliado */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary" display="block">Celular</Typography>
                    <Typography variant="body2" fontWeight="medium">{celularCon}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary" display="block">Fecha Nacimiento</Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {fechaNacCon} {fechaNacCon !== 'N/A' && `(${calcularEdad(fechaNacCon)})`}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary" display="block">Estado Civil</Typography>
                    <Typography variant="body2" fontWeight="medium">{estCivilCon}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary" display="block">Lugar Nacimiento</Typography>
                    <Typography variant="body2" fontWeight="medium">{lugarNacCon}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary" display="block">Grado Instrucción</Typography>
                    <Typography variant="body2" fontWeight="medium">{gradoCon}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : (
            <CardVacia texto="No registra cónyuge o pareja." />
          )}
        </Grid>
      </Grid>

      {/* Sección Hijos */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#02306f', mt: 1 }}>
        Hijos Registrados ({hijos.length})
      </Typography>
      <Grid container spacing={2}>
        {hijos.length > 0 ? (
          hijos.map((hijo, idx) => (
            <Grid item xs={12} sm={6} md={4} key={hijo.id || idx}>
              <CardDato 
                icon={<ChildCareIcon />} 
                titulo={`Hijo(a) - DNI: ${hijo.dni || hijo.dni_hijo || 'N/A'}`} 
                valor={`${hijo.nombre || hijo.nombres || ''} ${hijo.apellidos || hijo.ap_paterno || ''}`}
                subValor={`F. Nacimiento: ${hijo.fecha_nac || hijo.fecha_nac_hijo || 'N/A'} (${calcularEdad(hijo.fecha_nac || hijo.fecha_nac_hijo)})`}
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