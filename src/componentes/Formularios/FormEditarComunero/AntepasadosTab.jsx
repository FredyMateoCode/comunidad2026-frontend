import React, { useState } from 'react';
import { Box, Paper, Grid, TextField, MenuItem, FormControlLabel, Switch, Typography, IconButton, Tooltip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

export const AntepasadosTab = ({ antepasados, setAntepasados, actualizarPadre, pedirConfirmacion }) => {
  const [editandoIndex, setEditandoIndex] = useState(null);

  const handleAntepasadoChange = (index, campo, valor) => {
    const copia = [...antepasados];
    copia[index] = { ...copia[index], [campo]: valor };
    setAntepasados(copia);
    actualizarPadre('lista_antepasados', copia);
  };

  const agregarAntepasado = () => {
    const nuevaLista = [...antepasados, { tipo: 'PAPÁ', vive: 1, nombre: '', apellidos: '' }];
    setAntepasados(nuevaLista);
    actualizarPadre('lista_antepasados', nuevaLista);
    setEditandoIndex(nuevaLista.length - 1);
  };

  return (
    <Box>
      {antepasados.map((antepasado, index) => {
        const estaEditando = editandoIndex === index;
        const nombreAntepasado = `${antepasado.tipo || 'RELACIÓN'}: ${antepasado.nombre || ''} ${antepasado.apellidos || ''}`.trim();

        return (
          <Paper key={index} variant="outlined" sx={{ p: 2, mb: 1.5, backgroundColor: estaEditando ? '#fff' : '#f8f9fa' }}>
            {estaEditando ? (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <TextField select fullWidth label="Relación / Tipo" value={antepasado.tipo || 'PAPÁ'} onChange={(e) => handleAntepasadoChange(index, 'tipo', e.target.value)} size="small">
                    <MenuItem value="PAPÁ">PAPÁ</MenuItem>
                    <MenuItem value="MAMÁ">MAMÁ</MenuItem>
                    <MenuItem value="ABUELO PATERNO">ABUELO PATERNO</MenuItem>
                    <MenuItem value="ABUELA PATERNA">ABUELA PATERNA</MenuItem>
                    <MenuItem value="ABUELO MATERNO">ABUELO MATERNO</MenuItem>
                    <MenuItem value="ABUELA MATERNA">ABUELA MATERNA</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField fullWidth label="Nombres" value={antepasado.nombre || ''} onChange={(e) => handleAntepasadoChange(index, 'nombre', e.target.value)} size="small" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField fullWidth label="Apellidos" value={antepasado.apellidos || ''} onChange={(e) => handleAntepasadoChange(index, 'apellidos', e.target.value)} size="small" />
                </Grid>
                <Grid item xs={10} sm={2} display="flex" justifyContent="center">
                  <FormControlLabel
                    control={<Switch checked={Number(antepasado.vive) === 1} onChange={(e) => handleAntepasadoChange(index, 'vive', e.target.checked ? 1 : 0)} color="success" />}
                    label={Number(antepasado.vive) === 1 ? 'VIVO' : 'FALLECIDO'}
                  />
                </Grid>
                <Grid item xs={2} sm={1} display="flex" justifyContent="flex-end">
                  <Tooltip title="Guardar">
                    <IconButton color="success" onClick={() => setEditandoIndex(null)}><CheckIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => pedirConfirmacion('antepasado', index, nombreAntepasado)}><DeleteIcon /></IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ) : (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {antepasado.tipo || 'RELACIÓN'} — {antepasado.nombre || antepasado.apellidos ? `${antepasado.nombre} ${antepasado.apellidos}` : 'Sin Nombre'}
                  </Typography>
                  <Typography variant="body2" color={Number(antepasado.vive) === 1 ? 'success.main' : 'error.main'} sx={{ fontWeight: 'medium' }}>
                    Estado: {Number(antepasado.vive) === 1 ? 'VIVO' : 'FALLECIDO'}
                  </Typography>
                </Box>
                <Box>
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => setEditandoIndex(index)}><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => pedirConfirmacion('antepasado', index, nombreAntepasado)}><DeleteIcon /></IconButton>
                  </Tooltip>
                </Box>
              </Box>
            )}
          </Paper>
        );
      })}
      <Button variant="contained" color="primary" type="button" startIcon={<AddIcon />} onClick={agregarAntepasado} sx={{ mt: 1 }}>
        Agregar Nuevo Antepasado
      </Button>
    </Box>
  );
};