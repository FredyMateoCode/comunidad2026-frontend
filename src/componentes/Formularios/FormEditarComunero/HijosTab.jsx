import React, { useState } from 'react';
import { Box, Paper, Grid, TextField, Typography, IconButton, Tooltip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

export const HijosTab = ({ hijos, setHijos, actualizarPadre, pedirConfirmacion }) => {
  const [editandoIndex, setEditandoIndex] = useState(null);

  const handleHijoChange = (index, campo, valor) => {
    const copia = [...hijos];
    copia[index] = { ...copia[index], [campo]: valor };
    setHijos(copia);
    actualizarPadre('lista_hijos', copia);
  };

  const agregarHijo = () => {
    const nuevaLista = [...hijos, { dni: '', nombre: '', apellidos: '', fecha_nac: '' }];
    setHijos(nuevaLista);
    actualizarPadre('lista_hijos', nuevaLista);
    setEditandoIndex(nuevaLista.length - 1);
  };

  return (
    <Box>
      {hijos.map((hijo, index) => {
        const estaEditando = editandoIndex === index;
        const nombreCompleto = `${hijo.nombre || ''} ${hijo.apellidos || ''}`.trim();

        return (
          <Paper key={index} variant="outlined" sx={{ p: 2, mb: 1.5, backgroundColor: estaEditando ? '#fff' : '#f8f9fa' }}>
            {estaEditando ? (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>

                    <TextField
                      fullWidth
                      type="text"
                      label="DNI Hijo"
                      value={hijo.dni || ''}
                      onChange={(e) => {
                        // 1. Filtra solo números y limita a 8 dígitos
                        const valorLimpio = e.target.value.replace(/\D/g, '').slice(0, 8);
                        handleHijoChange(index, 'dni', valorLimpio);
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
                <Grid item xs={12} sm={3}>
                  <TextField fullWidth label="Nombres" value={hijo.nombre || ''} onChange={(e) => handleHijoChange(index, 'nombre', e.target.value)} size="small" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField fullWidth label="Apellidos" value={hijo.apellidos || ''} onChange={(e) => handleHijoChange(index, 'apellidos', e.target.value)} size="small" />
                </Grid>
                <Grid item xs={10} sm={2}>
                  <TextField fullWidth type="date" label="Fecha Nac." value={hijo.fecha_nac ? hijo.fecha_nac.split('T')[0] : ''} onChange={(e) => handleHijoChange(index, 'fecha_nac', e.target.value)} InputLabelProps={{ shrink: true }} size="small" />
                </Grid>
                <Grid item xs={2} sm={1} display="flex" justifyContent="flex-end">
                  <Tooltip title="Guardar">
                    <IconButton color="success" onClick={() => setEditandoIndex(null)}><CheckIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => pedirConfirmacion('hijo', index, nombreCompleto)}><DeleteIcon /></IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ) : (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{nombreCompleto || 'Sin Nombre'}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    DNI: <strong>{hijo.dni || 'S/N'}</strong> | F. Nacimiento: <strong>{hijo.fecha_nac ? hijo.fecha_nac.split('T')[0] : 'S/F'}</strong>
                  </Typography>
                </Box>
                <Box>
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => setEditandoIndex(index)}><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => pedirConfirmacion('hijo', index, nombreCompleto)}><DeleteIcon /></IconButton>
                  </Tooltip>
                </Box>
              </Box>
            )}
          </Paper>
        );
      })}
      <Button variant="contained" color="primary" type="button" startIcon={<AddIcon />} onClick={agregarHijo} sx={{ mt: 1 }}>
        Agregar Nuevo Hijo
      </Button>
    </Box>
  );
};