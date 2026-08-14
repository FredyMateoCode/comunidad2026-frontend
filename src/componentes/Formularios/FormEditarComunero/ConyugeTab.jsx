import React from 'react';
import { Grid, TextField } from '@mui/material';

export const ConyugeTab = ({ formData = {}, setFormData }) => {
  const handleConyugeChange = (e) => {
    const { name, value } = e.target;
    if (typeof setFormData === 'function') {
      setFormData(prev => ({
        ...prev,
        datos_conyuge: { ...(prev?.datos_conyuge || {}), [name]: value }
      }));
    }
  };

  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      <Grid item xs={12} sm={4}>

        <TextField
          fullWidth
          type="text"
          label="DNI Cónyuge"
          name="dni"
          value={formData?.datos_conyuge?.dni || ''}
          onChange={(e) => {
            // 1. Elimina cualquier caracter que no sea número (\D)
            // 2. Limita la cadena a un máximo de 8 dígitos
            const valorLimpio = e.target.value.replace(/\D/g, '').slice(0, 8);
            
            // Asignamos el valor formateado al evento antes de enviarlo al handler
            e.target.value = valorLimpio;
            handleConyugeChange(e);
          }}
          slotProps={{
            htmlInput: {
              maxLength: 8,
              inputMode: 'numeric', // Abre el teclado numérico en celulares
            }
          }}
          size="small"
        />

      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField fullWidth label="Nombres" name="nombre" value={formData?.datos_conyuge?.nombre || ''} onChange={handleConyugeChange} size="small" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="Apellido Paterno" name="ap_paterno" value={formData?.datos_conyuge?.ap_paterno || ''} onChange={handleConyugeChange} size="small" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="Apellido Materno" name="ap_materno" value={formData?.datos_conyuge?.ap_materno || ''} onChange={handleConyugeChange} size="small" />
      </Grid>
      <Grid item xs={12} sm={4}>

        <TextField
          fullWidth
          type="text"
          label="Celular"
          name="celular"
          value={formData?.datos_conyuge?.celular || ''}
          onChange={(e) => {
            // 1. Elimina todo lo que no sea número
            // 2. Limita a un máximo de 9 dígitos
            const valorLimpio = e.target.value.replace(/\D/g, '').slice(0, 9);
            
            // Asigna el valor limpio antes de llamar a la función handler
            e.target.value = valorLimpio;
            handleConyugeChange(e);
          }}
          slotProps={{
            htmlInput: {
              maxLength: 9,
              inputMode: 'numeric', // Abre el teclado numérico en celulares
            }
          }}
          size="small"
        />
      </Grid>
    </Grid>
  );
};