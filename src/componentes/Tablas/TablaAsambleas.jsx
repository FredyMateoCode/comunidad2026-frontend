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
  IconButton,
  Tooltip,
  Typography,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Cambiar la ruta si tu modal tiene otro nombre
import ModalCrearAsamblea from '../Modals/ModalCrearAsamblea';

export default function TablaAsambleas({ datos = [], cargando, onGuardarAsamblea, onEliminarAsamblea }) {
  const [busqueda, setBusqueda] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [asambleaEditar, setAsambleaEditar] = useState(null);

  const handleAbrirCrear = () => {
    setAsambleaEditar(null);
    setModalAbierto(true);
  };

  const handleAbrirEditar = (asamblea) => {
    setAsambleaEditar(asamblea);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setAsambleaEditar(null);
  };

  const handleSubmitModal = (formData, isEditing) => {
    if (onGuardarAsamblea) {
      onGuardarAsamblea(formData, isEditing);
    }
    handleCerrarModal();
  };

  const asambleasFiltradas = datos.filter((a) => {
    const termino = busqueda.toLowerCase();
    return (
      a.nombre_asamblea?.toLowerCase().includes(termino) ||
      a.tipo_asamblea?.toLowerCase().includes(termino) ||
      a.fecha_asamblea?.toString().includes(termino)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setPage(0);
  };

  if (cargando) {
    return <Typography sx={{ p: 2 }}>Cargando información de asambleas...</Typography>;
  }

  return (
    <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Buscar por nombre, tipo o fecha..."
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
          onClick={handleAbrirCrear}
        >
          Nueva Asamblea
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell align="right"><strong>Multa Inasistencia (S/)</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {asambleasFiltradas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((a) => (
                <TableRow key={a.id_asamblea} hover>
                  <TableCell>{a.id_asamblea}</TableCell>
                  <TableCell>{a.nombre_asamblea}</TableCell>
                  <TableCell>{a.tipo_asamblea}</TableCell>
                  <TableCell>{a.fecha_asamblea}</TableCell>
                  <TableCell align="right">
                    {a.multa_inasistencia ? `S/ ${Number(a.multa_inasistencia).toFixed(2)}` : 'S/ 0.00'}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton color="primary" size="small" onClick={() => handleAbrirEditar(a)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onEliminarAsamblea && onEliminarAsamblea(a)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            {asambleasFiltradas.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={asambleasFiltradas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />

      <ModalCrearAsamblea
        isOpen={modalAbierto}
        onClose={handleCerrarModal}
        onSubmit={handleSubmitModal}
        initialData={asambleaEditar}
      />
    </Paper>
  );
}