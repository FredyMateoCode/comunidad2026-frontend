import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, CircularProgress, Alert, Button, Paper, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, TablePagination, TextField, InputAdornment, Stack
} from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

// Servicio que consume desde el backend
import api from '../../servicios/api.js';

// Modal de Creación
import { ModalCrearComunero } from '../Modals/ModalCrearComunero.jsx';

export default function Comuneros2026({ onVerFicha }) {
  // Estados Iniciales
  const [comuneros, setComuneros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el modal de inserción
  const [openCrear, setOpenCrear] = useState(false);

  // Estado para el filtro de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Estados para la paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Función para obtener comuneros desde la API
  const obtenerComuneros = async () => {
    try {
      setCargando(true);
      const respuesta = await api.get('/api/comuneros2026');
      setComuneros(respuesta.data);
    } catch (err) {
      console.error("Error al obtener el padrón de comuneros:", err);
      setError(err.response?.data?.mensaje || 'No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerComuneros();
  }, []);

  // Manejador que se ejecuta tras registrar exitosamente a un comunero
  const handleGuardarExitoso = () => {
    obtenerComuneros(); // Recarga la lista para mostrar al nuevo comunero inmediatamente
  };

  // Manejadores de eventos de la paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Lógica de filtrado en tiempo real (por DNI o Apellidos)
  const comunerosFiltrados = comuneros.filter((comunero) => {
    const termino = busqueda.toLowerCase().trim();
    const dni = comunero.dni_com ? comunero.dni_com.toLowerCase() : '';
    const apPaterno = comunero.ap_paterno_com ? comunero.ap_paterno_com.toLowerCase() : '';
    const apMaterno = comunero.ap_materno_com ? comunero.ap_materno_com.toLowerCase() : '';
    const nombres = comunero.nombres_com ? comunero.nombres_com.toLowerCase() : '';

    return (
      dni.includes(termino) ||
      apPaterno.includes(termino) ||
      apMaterno.includes(termino) ||
      nombres.includes(termino)
    );
  });

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5, width: '100%' }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, width: '100%' }}>
        <Alert severity="error" variant="filled">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 2, boxSizing: 'border-box' }}>
      
      {/* Encabezado con Titulo, Buscador, Botón Agregar y Contador */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' }, 
        gap: 2, 
        mb: 2, 
        width: '100%' 
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#02306f' }}>
          Comuneros Registrados 2026
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5, 
          flexGrow: { sm: 0, md: 1 }, 
          justifyContent: 'flex-end',
          flexWrap: 'wrap' 
        }}>
          {/* Campo de búsqueda */}
          <TextField
            placeholder="Buscar por DNI o Apellido..."
            variant="outlined"
            size="small"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPage(0);
            }}
            sx={{ 
              width: { xs: '100%', sm: '260px' },
              bgcolor: 'white',
              borderRadius: 1
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#008ef7' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* ➕ Botón Nuevo Comunero */}
          <Button
            variant="contained"
            color="success"
            startIcon={<PersonAddIcon />}
            onClick={() => setOpenCrear(true)}
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: 1.5,
              height: '40px',
              bgcolor: '#2e7d32',
              '&:hover': {
                bgcolor: '#1b5e20'
              }
            }}
          >
            Nuevo
          </Button>

          {/* Contador que muestra los filtrados / totales */}
          <Chip 
            label={`Total: ${comunerosFiltrados.length}`} 
            sx={{ bgcolor: '#008ef7', color: 'white', fontWeight: 'bold', height: '40px', px: 1 }} 
          />
        </Box>
      </Box>

      {/* Tabla adaptada al 100% de ancho */}
      <Paper sx={{ width: '100%', borderRadius: 3, boxShadow: 3, overflow: 'hidden' }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table sx={{ minWidth: 650, width: '100%' }} aria-label="tabla de comuneros">
            
            {/* Cabecera */}
            <TableHead sx={{ bgcolor: '#008ef7' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '60px' }}>N°</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DNI</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Apellido Paterno</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Apellido Materno</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombres</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>

            {/* Cuerpo utilizando comunerosFiltrados y paginación */}
            <TableBody>
              {comunerosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No se encontraron comuneros que coincidan con la búsqueda.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                comunerosFiltrados
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((comunero, index) => (
                    <TableRow 
                      key={comunero.dni_com || index}
                      sx={{ 
                        '&:nth-of-type(odd)': { bgcolor: '#f9fbfd' },
                        '&:hover': { bgcolor: '#eef6ff' },
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <TableCell sx={{ fontWeight: 'medium', color: '#555' }}>
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BadgeIcon sx={{ color: '#008ef7', fontSize: '1.2rem' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold', letterSpacing: 0.5 }}>
                            {comunero.dni_com}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}>
                        {comunero.ap_paterno_com}
                      </TableCell>

                      <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}>
                        {comunero.ap_materno_com}
                      </TableCell>

                      <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}>
                        {comunero.nombres_com}
                      </TableCell>

                      <TableCell align="center">
                        <Stack 
                          direction="row" 
                          spacing={1} 
                          justifyContent="center" 
                          alignItems="center"
                        >
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<AssignmentIcon />}
                            onClick={() => onVerFicha && onVerFicha(comunero.dni_com)}
                            sx={{
                              bgcolor: '#02306f',
                              color: 'white',
                              fontWeight: 'bold',
                              borderRadius: 2,
                              textTransform: 'none',
                              boxShadow: 1,
                              '&:hover': {
                                bgcolor: '#008ef7',
                                boxShadow: 2
                              }
                            }}
                          >
                            Ficha
                          </Button>

                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<BadgeIcon />}
                            onClick={() => onVerFicha && onVerFicha(comunero.dni_com)}
                            sx={{
                              bgcolor: '#199600',
                              color: 'white',
                              fontWeight: 'bold',
                              borderRadius: 2,
                              textTransform: 'none',
                              boxShadow: 1,
                              '&:hover': {
                                bgcolor: '#0a3e00',
                                boxShadow: 2
                              }
                            }}
                          >
                            Constancia
                          </Button>

                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<LocalPrintshopIcon />}
                            onClick={() => onVerFicha && onVerFicha(comunero.dni_com)}
                            sx={{
                              bgcolor: '#ff6a00',
                              color: 'white',
                              fontWeight: 'bold',
                              borderRadius: 2,
                              textTransform: 'none',
                              boxShadow: 1,
                              '&:hover': {
                                bgcolor: '#a04300',
                                boxShadow: 2
                              }
                            }}
                          >
                            Imprimir
                          </Button>

                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginador */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={comunerosFiltrados.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`}
        />
      </Paper>

      {/* Modal para Crear Comunero */}
      <ModalCrearComunero 
        open={openCrear}
        onClose={() => setOpenCrear(false)}
        onGuardar={handleGuardarExitoso}
      />

    </Box>
  );
}