import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { obtenerHistorial } from '../../servicios/obtenerHistorial';

export default function TablaHistorial({ onVerDetalle }) {
  const [historial, setHistorial] = useState([]);
  const [filtroOperacion, setFiltroOperacion] = useState('TODOS');

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const datos = await obtenerHistorial();
        setHistorial(datos);
      } catch (error) {
        console.error('Error al cargar la lista del historial:', error);
      }
    };
    cargarHistorial();
  }, []);

  // Función para determinar el color del Chip según la operación
  const obtenerColorChip = (tipoOperacion = '') => {
    const operacion = tipoOperacion.toUpperCase();
    if (operacion.includes('CREAR') || operacion.includes('INSERT')) {
      return 'success'; // Verde
    }
    if (operacion.includes('ACTUALIZAR') || operacion.includes('UPDATE')) {
      return 'info'; // Azul
    }
    if (
      operacion.includes('CAMBIO_ESTADO') ||
      operacion.includes('ESTADO') ||
      operacion.includes('ELIMINAR') ||
      operacion.includes('DELETE')
    ) {
      return 'error'; // Rojo
    }
    return 'default';
  };

  // Filtrado por Radio Buttons
  const historialFiltrado = historial.filter((item) => {
    if (filtroOperacion === 'TODOS') return true;
    const operacion = item.tipo_operacion ? item.tipo_operacion.toUpperCase() : '';
    if (filtroOperacion === 'CREAR') return operacion.includes('CREAR') || operacion.includes('INSERT');
    if (filtroOperacion === 'ACTUALIZAR') return operacion.includes('ACTUALIZAR') || operacion.includes('UPDATE');
    if (filtroOperacion === 'CAMBIO_ESTADO') return operacion.includes('ESTADO') || operacion.includes('ELIMINAR');
    return true;
  });

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Radio Buttons para filtrado */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
            Filtrar por tipo de operación
          </FormLabel>
          <RadioGroup
            row
            value={filtroOperacion}
            onChange={(e) => setFiltroOperacion(e.target.value)}
          >
            <FormControlLabel value="TODOS" control={<Radio />} label="Todos" />
            <FormControlLabel value="CREAR" control={<Radio color="success" />} label="Crear" />
            <FormControlLabel value="ACTUALIZAR" control={<Radio color="info" />} label="Actualizar" />
            <FormControlLabel value="CAMBIO_ESTADO" control={<Radio color="error" />} label="Cambio de Estado" />
          </RadioGroup>
        </FormControl>
      </Paper>

      {/* Tabla de Historial */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla historial de cambios">
          <TableHead>
            <TableRow sx={{ backgroundColor: (theme) => theme.palette.action.hover }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Fecha y Hora</b></TableCell>
              <TableCell><b>Operación</b></TableCell>
              <TableCell><b>DNI Afectado</b></TableCell>
              <TableCell><b>Usuario Responsable</b></TableCell>
              <TableCell align="center"><b>Acción</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historialFiltrado.length > 0 ? (
              historialFiltrado.map((row) => (
                <TableRow key={row.id_historial} hover>
                  <TableCell>{row.id_historial}</TableCell>
                  <TableCell>
                    {row.fecha_registro ? new Date(row.fecha_registro).toLocaleString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.tipo_operacion}
                      color={obtenerColorChip(row.tipo_operacion)}
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </TableCell>
                  <TableCell>{row.dni_com || 'N/A'}</TableCell>
                  <TableCell>
                    {/* Muestra Nombre o DNI si la API los devuelve con el JOIN, de lo contrario muestra el ID */}
                    {row.nombre_us 
                      ? `${row.nombre_us} (${row.dni_us || row.id_us})` 
                      : row.dni_us 
                        ? `DNI: ${row.dni_us}` 
                        : `ID: ${row.id_us || 'N/A'}`}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => onVerDetalle(row)}
                    >
                      Detalle
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" sx={{ py: 2, color: 'text.secondary' }}>
                    No se encontraron registros
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}