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
import ModalCrearFaena from '../Modals/ModalCrearFaena';

export default function TablaFaenas({ datos = [], cargando, onGuardarFaena, onEliminarFaena }) {
  const [busqueda, setBusqueda] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [faenaEditar, setFaenaEditar] = useState(null);

  const handleAbrirCrear = () => {
    setFaenaEditar(null);
    setModalAbierto(true);
  };

  const handleAbrirEditar = (faena) => {
    setFaenaEditar(faena);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setFaenaEditar(null);
  };

  const handleSubmitModal = (formData, isEditing) => {
    if (onGuardarFaena) {
      onGuardarFaena(formData, isEditing);
    }
    handleCerrarModal();
  };

  const faenasFiltradas = datos.filter((f) => {
    const termino = busqueda.toLowerCase();
    return (
      f.nombre_faena?.toLowerCase().includes(termino) ||
      f.lugar_faena?.toLowerCase().includes(termino) ||
      f.fecha_faena?.toString().includes(termino)
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
    return <Typography sx={{ p: 2 }}>Cargando información de faenas...</Typography>;
  }

  return (
    <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Buscar por nombre, lugar o fecha..."
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
          Nueva Faena
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Lugar</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell align="right"><strong>Multa (S/)</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faenasFiltradas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((f) => (
                <TableRow key={f.id_faena} hover>
                  <TableCell>{f.id_faena}</TableCell>
                  <TableCell>{f.nombre_faena}</TableCell>
                  <TableCell>{f.lugar_faena}</TableCell>
                  <TableCell>{f.fecha_faena}</TableCell>
                  <TableCell align="right">
                    {f.multa_faena ? `S/ ${Number(f.multa_faena).toFixed(2)}` : 'S/ 0.00'}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton color="primary" size="small" onClick={() => handleAbrirEditar(f)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onEliminarFaena && onEliminarFaena(f)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            {faenasFiltradas.length === 0 && (
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
        count={faenasFiltradas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />

      <ModalCrearFaena
        isOpen={modalAbierto}
        onClose={handleCerrarModal}
        onSubmit={handleSubmitModal}
        initialData={faenaEditar}
      />
    </Paper>
  );
}