import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Importaciones locales de componentes
import TablaAsistenciaFaena from '../../../componentes/Tablas/TablaAsistenciaFaena.jsx';
import ModalAsistenciaFaena from '../../../componentes/Modals/ModalAsistenciaFaena.jsx';

// Datos de prueba
const MOCK_FAENAS = [
  { id_faena: 1, nombre_faena: 'Limpieza de Canales' },
  { id_faena: 2, nombre_faena: 'Mantenimiento del Local Comunal' }
];

const MOCK_ASISTENCIAS = [
  {
    id_asis_faena: 101,
    id_faena: 1,
    dni_com: '45879612',
    asistio: 1,
    observacion: 'Trajo herramientas',
    reg_asistencia: '2026-03-01T07:00:00'
  },
  {
    id_asis_faena: 102,
    id_faena: 1,
    dni_com: '78412356',
    asistio: 0,
    observacion: 'Falta no justificada',
    reg_asistencia: '2026-03-01T07:30:00'
  }
];

export default function VistaAsistenciaFaena() {
  const [faenaSeleccionada, setFaenaSeleccionada] = useState(1);
  const [asistencias, setAsistencias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setCargando(true);
    setTimeout(() => {
      const filtrados = MOCK_ASISTENCIAS.filter(
        (item) => item.id_faena === Number(faenaSeleccionada)
      );
      setAsistencias(filtrados);
      setCargando(false);
    }, 300);
  }, [faenaSeleccionada]);

  const handleToggleAsistencia = (idAsistencia) => {
    setAsistencias((prev) =>
      prev.map((item) =>
        item.id_asis_faena === idAsistencia
          ? { ...item, asistio: item.asistio === 1 ? 0 : 1 }
          : item
      )
    );
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-faena-label">Seleccionar Faena</InputLabel>
              <Select
                labelId="select-faena-label"
                value={faenaSeleccionada}
                label="Seleccionar Faena"
                onChange={(e) => setFaenaSeleccionada(e.target.value)}
              >
                {MOCK_FAENAS.map((faena) => (
                  <MenuItem key={faena.id_faena} value={faena.id_faena}>
                    {faena.nombre_faena}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenModal(true)}
            >
              Registrar Asistente
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <TablaAsistenciaFaena
            datos={asistencias}
            cargando={cargando}
            onToggleAsistencia={handleToggleAsistencia}
          />
        </Box>
      </Grid>

      <ModalAsistenciaFaena
        open={openModal}
        onClose={() => setOpenModal(false)}
        idFaena={faenaSeleccionada}
      />
    </Box>
  );
}