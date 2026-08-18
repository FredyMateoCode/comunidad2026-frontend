import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Comentamos los servicios reales por el momento
// import { obtenerAsistencias } from '../../../servicios/obtenerAsistencias.js';
// import { registrarAsistencia } from '../../../servicios/registrarAsistencia.js';

import TablaAsistenciaAsamblea from '../../../componentes/Tablas/TablaAsistenciaAsambleas.jsx';
import ModalAsistencia from '../../../componentes/Modals/ModalAsistenciaAsambleas.jsx';

// Datos estáticos de prueba para maquetación
const MOCK_ASAMBLEAS = [
  { id_asamblea: 1, nombre_asamblea: 'Asamblea General Ordinaria - Enero' },
  { id_asamblea: 2, nombre_asamblea: 'Asamblea Extraordinaria - Febrero' }
];

const MOCK_ASISTENCIAS = [
  {
    id_asis_asamblea: 101,
    id_asamblea: 1,
    dni_com: '45879612',
    asistio: 1,
    observacion: 'Llegó puntual',
    reg_asistencia: '2026-02-10T08:30:00'
  },
  {
    id_asis_asamblea: 102,
    id_asamblea: 1,
    dni_com: '78412356',
    asistio: 0,
    observacion: 'Tardanza justificada',
    reg_asistencia: '2026-02-10T09:15:00'
  },
  {
    id_asis_asamblea: 103,
    id_asamblea: 1,
    dni_com: '12345678',
    asistio: 1,
    observacion: 'NA',
    reg_asistencia: '2026-02-10T08:45:00'
  }
];

export default function VistaAsistenciaAsamblea() {
  const [asambleaSeleccionada, setAsambleaSeleccionada] = useState(1);
  const [asistencias, setAsistencias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Simulación de carga de datos sin servicios
  const cargarDatosSimulados = () => {
    setCargando(true);
    setTimeout(() => {
      const filtrados = MOCK_ASISTENCIAS.filter(
        (item) => item.id_asamblea === Number(asambleaSeleccionada)
      );
      setAsistencias(filtrados);
      setCargando(false);
    }, 300);
  };

  useEffect(() => {
    cargarDatosSimulados();
  }, [asambleaSeleccionada]);

  // Cambiar estado en la tabla en memoria
  const handleToggleAsistencia = (idAsistencia) => {
    setAsistencias((prev) =>
      prev.map((item) =>
        item.id_asis_asamblea === idAsistencia
          ? { ...item, asistio: item.asistio === 1 ? 0 : 1 }
          : item
      )
    );
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      {/* Filtro superior y Acción */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-asamblea-label">Seleccionar Asamblea</InputLabel>
              <Select
                labelId="select-asamblea-label"
                value={asambleaSeleccionada}
                label="Seleccionar Asamblea"
                onChange={(e) => setAsambleaSeleccionada(e.target.value)}
              >
                {MOCK_ASAMBLEAS.map((asamblea) => (
                  <MenuItem key={asamblea.id_asamblea} value={asamblea.id_asamblea}>
                    {asamblea.nombre_asamblea}
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

      {/* Tabla de Resultados */}
      <Grid container spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <TablaAsistenciaAsamblea
            datos={asistencias}
            cargando={cargando}
            onToggleAsistencia={handleToggleAsistencia}
          />
        </Box>
      </Grid>

      {/* Modal con Formulario */}
      <ModalAsistencia
        open={openModal}
        onClose={() => setOpenModal(false)}
        idAsamblea={asambleaSeleccionada}
      />
    </Box>
  );
}