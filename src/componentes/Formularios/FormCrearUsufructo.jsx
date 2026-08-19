import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

export default function FormCrearUsufructo({ onSave, initialData, onClose, caserios = [] }) {
  const [formData, setFormData] = useState({
    nombre_usu: '',
    id_cas: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_usu: initialData.id_usu,
        nombre_usu: initialData.nombre_usu || '',
        id_cas: initialData.id_cas ? String(initialData.id_cas) : ''
      });
    } else {
      setFormData({ nombre_usu: '', id_cas: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...formData,
        id_cas: Number(formData.id_cas)
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre del Usufructo"
            name="nombre_usu"
            value={formData.nombre_usu}
            onChange={handleChange}
            inputProps={{ maxLength: 30 }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">Seleccionar Caserío</FormLabel>
            <RadioGroup
              name="id_cas"
              value={formData.id_cas}
              onChange={handleChange}
              row
            >
              {caserios.map((caserio) => (
                <FormControlLabel
                  key={caserio.id_cas}
                  value={String(caserio.id_cas)}
                  control={<Radio />}
                  label={caserio.nombre_cas}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          {onClose && (
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          )}
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Guardar Cambios' : 'Crear Usufructo'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}