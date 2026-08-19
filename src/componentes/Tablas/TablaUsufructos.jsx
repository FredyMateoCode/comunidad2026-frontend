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
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ModalCrearUsufructo from '../Modals/ModalCrearUsufructo.jsx';

export default function TablaUsufructos({
  datos = [],
  caserios = [],
  cargando,
  onGuardarUsufructo,
  onEliminarUsufructo
}) {
  const [busqueda, setBusqueda] = useState('');
  const [caserioFiltro, setCaserioFiltro] = useState('todos'); // Estado para el filtro de caserío
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [usufructoEditar, setUsufructoEditar] = useState(null);

  const handleAbrirCrear = () => {
    setUsufructoEditar(null);
    setModalAbierto(true);
  };

  const handleAbrirEditar = (usufructo) => {
    setUsufructoEditar(usufructo);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setUsufructoEditar(null);
  };

  const handleSubmitModal = (formData) => {
    if (onGuardarUsufructo) {
      onGuardarUsufructo(formData, Boolean(usufructoEditar));
    }
    handleCerrarModal();
  };

  // Manejador del cambio de radio button
  const handleFiltroCaserioChange = (e) => {
    setCaserioFiltro(e.target.value);
    setPage(0); // Reiniciar paginación
  };

  // Lógica de filtrado combinada (Texto Búsqueda + Caserío seleccionado)
  const usufructosFiltrados = datos.filter((u) => {
    const termino = busqueda.toLowerCase();
    const nombreCaserio = caserios.find((c) => c.id_cas === u.id_cas)?.nombre_cas || '';

    const coincideBusqueda =
      u.nombre_usu?.toLowerCase().includes(termino) ||
      nombreCaserio.toLowerCase().includes(termino) ||
      u.id_usu?.toString().includes(termino);

    const coincideCaserio =
      caserioFiltro === 'todos' || u.id_cas === Number(caserioFiltro);

    return coincideBusqueda && coincideCaserio;
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
    return <Typography sx={{ p: 2 }}>Cargando información de usufructos...</Typography>;
  }

  return (
    <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
      {/* Barra Superior: Búsqueda y Botón Nuevo */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Buscar por nombre o caserío..."
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
          Nuevo Usufructo
        </Button>
      </Box>

      {/* Sección de Filtros por Radio Button (7 caseríos + 1 Opción 'Todos') */}
      <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
        <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '0.875rem', mb: 0.5 }}>
          Filtrar por Caserío:
        </FormLabel>
        <RadioGroup
          row
          value={caserioFiltro}
          onChange={handleFiltroCaserioChange}
        >
          {/* Opción 1: Todos los caseríos */}
          <FormControlLabel
            value="todos"
            control={<Radio size="small" />}
            label="Todos"
          />

          {/* Opciones 2 a 8: Los 7 caseríos que vienen desde el backend/prop */}
          {caserios.map((c) => (
            <FormControlLabel
              key={c.id_cas}
              value={String(c.id_cas)}
              control={<Radio size="small" />}
              label={c.nombre_cas}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nombre Usufructo</strong></TableCell>
              <TableCell><strong>Caserío</strong></TableCell>
              <TableCell><strong>Fecha Registro</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usufructosFiltrados
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((u) => {
                const caserio = caserios.find((c) => c.id_cas === u.id_cas);
                return (
                  <TableRow key={u.id_usu} hover>
                    <TableCell>{u.id_usu}</TableCell>
                    <TableCell>{u.nombre_usu}</TableCell>
                    <TableCell>{caserio ? caserio.nombre_cas : u.id_cas}</TableCell>
                    <TableCell>
                      {u.reg_usu ? new Date(u.reg_usu).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton color="primary" size="small" onClick={() => handleAbrirEditar(u)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => onEliminarUsufructo && onEliminarUsufructo(u)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            {usufructosFiltrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
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
        count={usufructosFiltrados.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />

      <ModalCrearUsufructo
        open={modalAbierto}
        onClose={handleCerrarModal}
        onSubmit={handleSubmitModal}
        initialData={usufructoEditar}
        caserios={caserios}
      />
    </Paper>
  );
}