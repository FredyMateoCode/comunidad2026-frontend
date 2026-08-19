import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  Divider
} from '@mui/material';
import { CompareArrows as CompareArrowsIcon } from '@mui/icons-material';

export default function ModalHistorial({ open, onClose, registro }) {
  if (!registro) return null;

  // Parsea los JSON de manera segura (maneja strings o objetos parsed)
  const parsearJSON = (data) => {
    if (!data) return {};
    if (typeof data === 'object') return data;
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  };

  const datosAnteriores = parsearJSON(registro.datos_anteriores);
  const datosNuevos = parsearJSON(registro.datos_nuevos);

  // Extrae todas las propiedades únicas entre ambos objetos
  const todasLasLlaves = Array.from(
    new Set([...Object.keys(datosAnteriores), ...Object.keys(datosNuevos)])
  );

  // Formatea valores primarios o vacíos para lectura clara
  const formatearValor = (valor) => {
    if (valor === undefined || valor === null || valor === '') return <i>(Vacío)</i>;
    if (typeof valor === 'boolean') return valor ? 'true' : 'false';
    if (typeof valor === 'object') return JSON.stringify(valor);
    return String(valor);
  };

  // Asigna el color según la acción
  const obtenerColorChip = (tipo = '') => {
    const operacion = tipo.toUpperCase();
    if (operacion.includes('CREAR') || operacion.includes('INSERT')) return 'success';
    if (operacion.includes('ACTUALIZAR') || operacion.includes('UPDATE')) return 'info';
    if (operacion.includes('CAMBIO_ESTADO') || operacion.includes('ESTADO') || operacion.includes('ELIMINAR')) return 'error';
    return 'default';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CompareArrowsIcon color="primary" />
          <Typography variant="h6">Detalle de Historial #{registro.id_historial}</Typography>
        </Box>
        <Chip
          label={registro.tipo_operacion}
          color={obtenerColorChip(registro.tipo_operacion)}
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      </DialogTitle>

      <Divider />

      <DialogContent dividers>
        {/* Encabezado con datos del Usuario Responsable y Registro */}
        <Box sx={{ mb: 3, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Typography variant="body2">
            <b>DNI Afectado:</b> {registro.dni_com || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <b>Usuario Responsable:</b>{' '}
            {registro.nombres_us
              ? `${registro.nombres_us} (DNI: ${registro.dni_us || 'N/A'})`
              : `ID: ${registro.id_us || 'N/A'}`}
          </Typography>
          <Typography variant="body2">
            <b>Fecha:</b> {registro.fecha_registro ? new Date(registro.fecha_registro).toLocaleString() : 'N/A'}
          </Typography>
        </Box>

        {/* Tabla Comparativa */}
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Comparación de Datos
        </Typography>

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: (theme) => theme.palette.action.hover }}>
                <TableCell><b>Campo / Propiedad</b></TableCell>
                <TableCell><b>Valor Anterior</b></TableCell>
                <TableCell><b>Valor Nuevo</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todasLasLlaves.length > 0 ? (
                todasLasLlaves.map((llave) => {
                  const valAnterior = datosAnteriores[llave];
                  const valNuevo = datosNuevos[llave];
                  const seModifico = JSON.stringify(valAnterior) !== JSON.stringify(valNuevo);

                  return (
                    <TableRow
                      key={llave}
                      sx={{
                        backgroundColor: seModifico ? 'action.selected' : 'inherit'
                      }}
                    >
                      <TableCell sx={{ fontWeight: seModifico ? 'bold' : 'normal' }}>
                        {llave}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: seModifico ? 'error.main' : 'text.primary',
                          fontWeight: seModifico ? 'bold' : 'normal'
                        }}
                      >
                        {formatearValor(valAnterior)}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: seModifico ? 'success.main' : 'text.primary',
                          fontWeight: seModifico ? 'bold' : 'normal'
                        }}
                      >
                        {formatearValor(valNuevo)}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay campos para mostrar en este registro.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}