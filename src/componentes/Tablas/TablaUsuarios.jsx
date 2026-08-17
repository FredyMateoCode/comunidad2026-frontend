import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function TablaUsuarios({ datos = [], cargando, onNuevo, onEditar, onCambiarEstado }) {
  const [busqueda, setBusqueda] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filtrado global en tiempo real por DNI, Nombres, Apellidos o Usuario
  const usuariosFiltrados = datos.filter((u) => {
    const termino = busqueda.toLowerCase();
    return (
      u.dni_us?.toLowerCase().includes(termino) ||
      u.nombres_us?.toLowerCase().includes(termino) ||
      u.apellidos_us?.toLowerCase().includes(termino) ||
      u.usuario_us?.toLowerCase().includes(termino)
    );
  });

  // Manejadores de paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setPage(0); // Reiniciar a la primera página al buscar
  };

  if (cargando) {
    return <Typography sx={{ p: 2 }}>Cargando información de usuarios...</Typography>;
  }

  return (
    <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
      {/* Cabecera: Buscador y Botón Nuevo */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Buscar por DNI, nombre o usuario..."
          value={busqueda}
          onChange={handleBusquedaChange}
          sx={{ width: { xs: '100%', sm: '350px' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onNuevo}
        >
          Nuevo Usuario
        </Button>
      </Box>

      {/* Tabla de Usuarios */}
      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>DNI</strong></TableCell>
              <TableCell><strong>Nombres y Apellidos</strong></TableCell>
              <TableCell><strong>Usuario</strong></TableCell>
              <TableCell><strong>Celular</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell align="center"><strong>Estado</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuariosFiltrados
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((u) => (
                <TableRow key={u.id_us} hover>
                  <TableCell>{u.dni_us}</TableCell>
                  <TableCell>{`${u.nombres_us} ${u.apellidos_us}`}</TableCell>
                  <TableCell>{u.usuario_us}</TableCell>
                  <TableCell>{u.celular_us || '-'}</TableCell>
                  <TableCell>{u.nombre_rol}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={u.estado_us === 1 ? 'Activo' : 'Inactivo'}
                      color={u.estado_us === 1 ? 'success' : 'default'}
                      size="small"
                      variant={u.estado_us === 1 ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton color="primary" size="small" onClick={() => onEditar(u)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={u.estado_us === 1 ? 'Desactivar' : 'Activar'}>
                      <IconButton
                        color={u.estado_us === 1 ? 'error' : 'success'}
                        size="small"
                        onClick={() => onCambiarEstado(u)}
                      >
                        {u.estado_us === 1 ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            {usuariosFiltrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Control de Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={usuariosFiltrados.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </Paper>
  );
}