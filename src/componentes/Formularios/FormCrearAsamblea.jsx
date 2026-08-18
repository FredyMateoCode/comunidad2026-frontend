// Ruta: componentes/Formularios/FormCrearAsamblea.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  InputAdornment
} from '@mui/material';

const TIPOS_ASAMBLEA = ['Ordinaria', 'Extraordinaria', 'Informativa'];

export default function FormCrearAsamblea({ initialData, onSubmit, onCancel }) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    nombre_asamblea: '',
    tipo_asamblea: 'Ordinaria',
    fecha_asamblea: '',
    multa_inasistencia: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_asamblea: initialData.id_asamblea,
        nombre_asamblea: initialData.nombre_asamblea || '',
        tipo_asamblea: initialData.tipo_asamblea || 'Ordinaria',
        fecha_asamblea: initialData.fecha_asamblea ? initialData.fecha_asamblea.split('T')[0] : '',
        multa_inasistencia: initialData.multa_inasistencia ?? 0
      });
    } else {
      setFormData({
        nombre_asamblea: '',
        tipo_asamblea: 'Ordinaria',
        fecha_asamblea: '',
        multa_inasistencia: 0
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'multa_inasistencia' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(`=== DATOS ASAMBLEA PARA BACKEND (${isEditing ? 'EDICIÓN' : 'CREACIÓN'}) ===`);
    console.log(JSON.stringify(formData, null, 2));

    onSubmit(formData, isEditing);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Nombre de la Asamblea"
            name="nombre_asamblea"
            value={formData.nombre_asamblea}
            onChange={handleChange}
            inputProps={{ maxLength: 100 }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small" required>
            <InputLabel id="tipo-asamblea-label">Tipo de Asamblea</InputLabel>
            <Select
              labelId="tipo-asamblea-label"
              name="tipo_asamblea"
              value={formData.tipo_asamblea}
              label="Tipo de Asamblea"
              onChange={handleChange}
            >
              {TIPOS_ASAMBLEA.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="Fecha"
            name="fecha_asamblea"
            value={formData.fecha_asamblea}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            type="number"
            label="Multa por Inasistencia"
            name="multa_inasistencia"
            value={formData.multa_inasistencia}
            onChange={handleChange}
            inputProps={{ step: '0.01', min: '0' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">S/</InputAdornment>,
            }}
            required
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button onClick={onCancel} variant="outlined" color="inherit">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? 'Guardar Cambios' : 'Crear Asamblea'}
        </Button>
      </Box>
    </Box>
  );
}