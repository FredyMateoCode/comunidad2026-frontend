import React, { useState } from 'react';
import { Box, TextField, FormControlLabel, Switch, Button, Grid } from '@mui/material';

export default function FormAsistenciaAsamblea({ idAsamblea, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id_asamblea: idAsamblea || '',
    dni_com: '',
    asistio: 1, // tinyint (1 = asistió, 0 = falta)
    observacion: 'NA'
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="DNI del Comunero"
            name="dni_com"
            value={formData.dni_com}
            onChange={handleChange}
            inputProps={{ maxLength: 8 }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.asistio === 1}
                onChange={handleChange}
                name="asistio"
                color="primary"
              />
            }
            label={formData.asistio === 1 ? 'Asistió' : 'Inasistente'}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Observación"
            name="observacion"
            value={formData.observacion}
            onChange={handleChange}
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        {onCancel && (
          <Button onClick={onCancel} variant="outlined" color="inherit">
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
          Registrar Asistencia
        </Button>
      </Box>
    </Box>
  );
}