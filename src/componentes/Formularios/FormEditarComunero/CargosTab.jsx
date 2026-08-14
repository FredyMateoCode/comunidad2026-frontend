import React, { useState } from 'react';
import { Box, Paper, Grid, TextField, Typography, IconButton, Tooltip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

export const CargosTab = ({ cargos, setCargos, actualizarPadre, pedirConfirmacion }) => {
  const [editandoIndex, setEditandoIndex] = useState(null);

  const handleCargoChange = (index, campo, valor) => {
    const copia = [...cargos];
    copia[index] = { ...copia[index], [campo]: valor };
    setCargos(copia);
    actualizarPadre('lista_cargos', copia);
  };

  const agregarCargo = () => {
    const nuevaLista = [...cargos, { anio: new Date().getFullYear(), cargo: '' }];
    setCargos(nuevaLista);
    actualizarPadre('lista_cargos', nuevaLista);
    setEditandoIndex(nuevaLista.length - 1);
  };

  return (
    <Box>
      {cargos.map((cargoItem, index) => {
        const estaEditando = editandoIndex === index;
        const tituloCargo = cargoItem.cargo || '';

        return (
          <Paper key={index} variant="outlined" sx={{ p: 2, mb: 1.5, backgroundColor: estaEditando ? '#fff' : '#f8f9fa' }}>
            {estaEditando ? (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  
                  <TextField
                    fullWidth
                    type="text"
                    label="Año"
                    value={cargoItem.anio || ''}
                    onChange={(e) => {
                      // 1. Elimina todo lo que no sea número
                      // 2. Limita a un máximo de 4 caracteres
                      const valorLimpio = e.target.value.replace(/\D/g, '').slice(0, 4);
                      handleCargoChange(index, 'anio', valorLimpio);
                    }}
                    slotProps={{
                      htmlInput: {
                        maxLength: 4,
                        inputMode: 'numeric', // Muestra el teclado numérico en celulares
                      }
                    }}
                    size="small"
                  />
                    
                </Grid>
                <Grid item xs={10} sm={8}>
                  <TextField fullWidth label="Nombre del Cargo" value={cargoItem.cargo || ''} onChange={(e) => handleCargoChange(index, 'cargo', e.target.value)} size="small" />
                </Grid>
                <Grid item xs={2} sm={1} display="flex" justifyContent="flex-end">
                  <Tooltip title="Guardar">
                    <IconButton color="success" onClick={() => setEditandoIndex(null)}><CheckIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => pedirConfirmacion('cargo', index, tituloCargo)}><DeleteIcon /></IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ) : (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{tituloCargo || 'Cargo no especificado'}</Typography>
                  <Typography variant="body2" color="text.secondary">Año: <strong>{cargoItem.anio || 'S/A'}</strong></Typography>
                </Box>
                <Box>
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => setEditandoIndex(index)}><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => pedirConfirmacion('cargo', index, tituloCargo)}><DeleteIcon /></IconButton>
                  </Tooltip>
                </Box>
              </Box>
            )}
          </Paper>
        );
      })}
      <Button variant="contained" color="primary" type="button" startIcon={<AddIcon />} onClick={agregarCargo} sx={{ mt: 1 }}>
        Agregar Nuevo Cargo
      </Button>
    </Box>
  );
};