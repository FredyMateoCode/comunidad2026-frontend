// <-- Componente para mostrar los datos de un comunero en base a su dni dede comuneros2025
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Importamos para la navegación
import { Card, CardContent, Typography, Avatar, Box, CircularProgress, Alert, Divider, Grid, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import TerrainIcon from '@mui/icons-material/Terrain';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment'; // <-- Ícono para el botón de la ficha

import { obtenerMisDatos } from '../../servicios/mis_datos.js';

export default function MisDatosCard() {
  const navigate = useNavigate(); // <-- Instanciamos el navegador de rutas
  const [comunero, setComunero] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        setCargando(true);
        const datos = await obtenerMisDatos();
        setComunero(datos);
      } catch (err) {
        console.error("Error al pintar la Card de mis datos:", err);
        setError(err.response?.data?.mensaje || 'No se pudo conectar con el servidor para obtener tus datos.');
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, []);

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error" variant="filled">{error}</Alert>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 500, borderRadius: 3, boxShadow: 4, mx: 'auto', mt: 3, overflow: 'hidden' }}>
      {/* Encabezado Principal */}
      <Box sx={{ bgcolor: '#008ef7', p: 3, color: 'white', textAlign: 'center' }}>
        <Avatar 
          sx={{ width: 70, height: 70, bgcolor: 'white', color: '#008ef7', mx: 'auto', mb: 1.5, fontSize: '2rem', fontWeight: 'bold' }}
        >
          {comunero?.nombres_com?.charAt(0)}
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          {comunero?.nombres_com} {comunero?.apellidos_com}
        </Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.85, mt: 0.5 }}>
          DATOS DEL COMUNERO REGISTRADOS EL 2022
        </Typography>
      </Box>

      {/* Cuerpo de la Tarjeta */}
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2.5}>
          
          {/* DNI */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <BadgeIcon sx={{ color: '#555' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">DNI</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{comunero?.dni_com}</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Carné */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CreditCardIcon sx={{ color: '#555' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">N° Carné</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{comunero?.carne_com}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}><Divider /></Grid>

          {/* Caserío */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <HomeIcon sx={{ color: '#555' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Caserío</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{comunero?.caserio_com}</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Majada */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <TerrainIcon sx={{ color: '#555' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Majada</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{comunero?.majada_com}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}><Divider /></Grid>

          {/* Condición */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f4f6f9', p: 1.5, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircleIcon sx={{ color: comunero?.condicion_com === 'ACTIVO' ? '#2e7d32' : '#d32f2f' }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Condición del Comunero</Typography>
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  px: 2, 
                  py: 0.5, 
                  bgcolor: comunero?.condicion_com === 'ACTIVO' ? '#e8f5e9' : '#ffebee', 
                  color: comunero?.condicion_com === 'ACTIVO' ? '#2e7d32' : '#d32f2f', 
                  borderRadius: 1, 
                  fontWeight: 'bold' 
                }}
              >
                {comunero?.condicion_com}
              </Typography>
            </Box>
          </Grid>

          {/* BOTÓN AGREGADO: Abre la ficha sin modificar tus datos actuales */}
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AssignmentIcon />}
              onClick={() => navigate('/dashboard/completar-ficha')}
              sx={{
                bgcolor: '#02306f',
                color: 'white',
                fontWeight: 'bold',
                py: 1.2,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: '#008ef7',
                  boxShadow: 3
                }
              }}
            >
              Generar Anexo 001 (PDF)
            </Button>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}