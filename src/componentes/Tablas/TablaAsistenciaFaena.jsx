import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Switch,
  CircularProgress,
  Box,
  Typography
} from '@mui/material';

export default function TablaAsistenciaFaena({ datos = [], cargando = false, onToggleAsistencia }) {
  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (datos.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center', width: '100%' }}>
        <Typography variant="body1" color="text.secondary">
          No hay registros de asistencia para esta faena.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table size="small" aria-label="tabla asistencias faena">
        <TableHead sx={{ backgroundColor: (theme) => theme.palette.action.hover }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>DNI Comunero</strong></TableCell>
            <TableCell align="center"><strong>Estado</strong></TableCell>
            <TableCell align="center"><strong>Marcar Asistencia</strong></TableCell>
            <TableCell><strong>Observación</strong></TableCell>
            <TableCell><strong>Fecha Registro</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((row) => (
            <TableRow key={row.id_asis_faena || row.id} hover>
              <TableCell>{row.id_asis_faena || row.id}</TableCell>
              <TableCell>{row.dni_com}</TableCell>
              <TableCell align="center">
                <Chip
                  label={row.asistio === 1 ? 'Asistió' : 'Inasistente'}
                  color={row.asistio === 1 ? 'success' : 'error'}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="center">
                <Switch
                  checked={row.asistio === 1}
                  onChange={() => onToggleAsistencia && onToggleAsistencia(row.id_asis_faena || row.id)}
                  color="primary"
                  size="small"
                />
              </TableCell>
              <TableCell>{row.observacion || 'NA'}</TableCell>
              <TableCell>
                {row.reg_asistencia ? new Date(row.reg_asistencia).toLocaleString() : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}