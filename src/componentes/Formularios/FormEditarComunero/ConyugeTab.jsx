import React from 'react';
import { Box, TextField, MenuItem, Grid } from '@mui/material';

export const ConyugeTab = ({ formData, setFormData }) => {
  const conyuge = formData?.datos_conyuge || {};

  const handleConyugeChange = (e) => {
    const { name, value } = e.target;
    let val = value;

    // Validaciones estrictas según los tipos de tu base de datos (varchar)
    if (name === 'dni_con') {
      val = value.replace(/\D/g, '');
      if (val.length > 8) return; // varchar(8)
    }

    if (name === 'celular_con') {
      val = value.replace(/\D/g, '');
      if (val.length > 9) return; // varchar(9)
    }

    // Actualiza directamente la propiedad exacta de la BD
    setFormData((prev) => ({
      ...prev,
      datos_conyuge: {
        ...(prev.datos_conyuge || {}),
        [name]: val
      }
    }));
  };

  return (
    <Box sx={{ pt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="DNI Cónyuge"
            name="dni_con"
            value={conyuge.dni_con || ''}
            onChange={handleConyugeChange}
            size="small"
            slotProps={{ htmlInput: { maxLength: 8 } }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Nombres"
            name="nombres_con"
            value={conyuge.nombres_con || ''}
            onChange={handleConyugeChange}
            size="small"
            slotProps={{ htmlInput: { maxLength: 30 } }} // varchar(30)
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Apellido Paterno"
            name="ap_paterno_con"
            value={conyuge.ap_paterno_con || ''}
            onChange={handleConyugeChange}
            size="small"
            slotProps={{ htmlInput: { maxLength: 30 } }} // varchar(30)
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Apellido Materno"
            name="ap_materno_con"
            value={conyuge.ap_materno_con || ''}
            onChange={handleConyugeChange}
            size="small"
            slotProps={{ htmlInput: { maxLength: 30 } }} // varchar(30)
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Celular"
            name="celular_con"
            value={conyuge.celular_con || ''}
            onChange={handleConyugeChange}
            size="small"
            slotProps={{ htmlInput: { maxLength: 9 } }} // varchar(9)
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="date"
            label="Fecha Nacimiento"
            name="fecha_nac_con"
            value={conyuge.fecha_nac_con ? conyuge.fecha_nac_con.split('T')[0] : ''}
            onChange={handleConyugeChange}
            slotProps={{ inputLabel: { shrink: true } }}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Lugar Nacimiento"
            name="lugar_nac_con"
            value={conyuge.lugar_nac_con || ''}
            onChange={handleConyugeChange}
            size="small"
            slotProps={{ htmlInput: { maxLength: 30 } }} // varchar(30)
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label="Estado Civil"
            name="est_civil_con"
            value={conyuge.est_civil_con || ''}
            onChange={handleConyugeChange}
            size="small"
          >
            <MenuItem value="CASADO(A)">CASADO(A)</MenuItem>
            <MenuItem value="CONVIVIENTE">CONVIVIENTE</MenuItem>
            <MenuItem value="SOLTERO(A)">SOLTERO(A)</MenuItem>
            <MenuItem value="VIUDO(A)">VIUDO(A)</MenuItem>
            <MenuItem value="DIVORCIADO(A)">DIVORCIADO(A)</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Grado Instrucción"
            name="grado_con"
            value={conyuge.grado_con || ''}
            onChange={handleConyugeChange}
            size="small"
            slotProps={{ htmlInput: { maxLength: 25 } }} // varchar(25)
          />
        </Grid>
      </Grid>
    </Box>
  );
};