import React from 'react';
import { Paper, Grid, Typography, Avatar, Chip, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function FichaHeader({ ficha, onEditar, onToggleEstado }) {
  // Vite elegirá automáticamente el valor según el entorno (Supabase en Netlify, assets en Local)
  const baseUrl = import.meta.env.VITE_STORAGE_URL;
  const rutaFoto = `${baseUrl}/${ficha.dni_com}.jpg?t=${Date.now()}`;
  
  // 1 = Activo, 0 = Desactivado
  const esActivo = Number(ficha.estado_com) === 1;

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3, bgcolor: '#02306f', color: 'white' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar 
            src={rutaFoto}
            alt={`${ficha.nombres_com} ${ficha.ap_paterno_com}`}
            sx={{ width: 72, height: 72, bgcolor: '#008ef7', fontSize: '2rem', fontWeight: 'bold', border: '2px solid white' }}
          >
            {ficha.nombres_com ? ficha.nombres_com.charAt(0) : 'C'}
          </Avatar>
        </Grid>

        <Grid item xs>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {`${ficha.nombres_com} ${ficha.ap_paterno_com} ${ficha.ap_materno_com}`}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            DNI: <strong>{ficha.dni_com}</strong> | Carné: <strong>{ficha.num_carne_com || 'N/A'}</strong>
          </Typography>
        </Grid>

        <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Condición del Comunero */}
          <Chip 
            label={ficha.condicion_com || 'ACTIVO'} 
            color={
              ficha.condicion_com === 'PASIVO' ? 'primary' :
              ficha.condicion_com === 'ACTIVO' ? 'success' :
              ficha.condicion_com === 'INTEGRADO' ? 'warning' : 'default'
            }
            sx={{ fontWeight: 'bold', color: 'white', px: 1 }}
          />

          {/* Badge secundario para registros inactivos */}
          {!esActivo && (
            <Chip 
              label="DESACTIVADO" 
              color="error"
              size="small"
              sx={{ fontWeight: 'bold', color: 'white' }}
            />
          )}

          {/* Botón de Edición */}
          <Tooltip title="Editar Comunero">
            <Button
              variant="contained"
              color="warning"
              startIcon={<EditIcon />}
              onClick={() => onEditar && onEditar(ficha.dni_com)}
              sx={{ fontWeight: 'bold', textTransform: 'none' }}
            >
              Editar
            </Button>
          </Tooltip>

          {/* Botón de Encendido / Apagado */}
          <Tooltip title={esActivo ? 'Desactivar Comunero 2026' : 'Activar Comunero 2026'}>
            <IconButton 
              color={esActivo ? 'error' : 'success'}
              onClick={() => onToggleEstado && onToggleEstado(ficha.dni_com, ficha.estado_com)}
              sx={{ 
                bgcolor: esActivo ? 'rgba(211, 47, 47, 0.2)' : 'rgba(46, 125, 50, 0.3)', 
                '&:hover': { bgcolor: esActivo ? 'rgba(211, 47, 47, 0.4)' : 'rgba(46, 125, 50, 0.5)' } 
              }}
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
}