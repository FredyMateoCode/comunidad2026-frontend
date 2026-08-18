import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';

export default function FormCrearFaena({ onSave, initialData, onClose }) {
  const [formData, setFormData] = useState({
    nombre_faena: '',
    lugar_faena: '',
    fecha_faena: '',
    multa_faena: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre_faena: initialData.nombre_faena || '',
        lugar_faena: initialData.lugar_faena || '',
        fecha_faena: initialData.fecha_faena ? initialData.fecha_faena.split('T')[0] : '',
        multa_faena: initialData.multa_faena || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre de la Faena"
            name="nombre_faena"
            value={formData.nombre_faena}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Lugar"
            name="lugar_faena"
            value={formData.lugar_faena}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Fecha"
            name="fecha_faena"
            value={formData.fecha_faena}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            inputProps={{ step: "0.01" }}
            label="Multa"
            name="multa_faena"
            value={formData.multa_faena}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          {onClose && (
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          )}
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Guardar Cambios' : 'Crear Faena'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}