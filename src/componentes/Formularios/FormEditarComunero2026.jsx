import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

import { DatosPersonalesTab } from './FormEditarComunero/DatosPersonalesTab';
import { ConyugeTab } from './FormEditarComunero/ConyugeTab';
import { HijosTab } from './FormEditarComunero/HijosTab';
import { CargosTab } from './FormEditarComunero/CargosTab';
import { AntepasadosTab } from './FormEditarComunero/AntepasadosTab';
import { DialogConfirmarEliminar } from './FormEditarComunero/DialogConfirmarEliminar';

export const FormEditarComunero2026 = ({ formData = {}, onChange, setFormData }) => {
  const [tabActual, setTabActual] = useState(0);

  const [hijos, setHijos] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [antepasados, setAntepasados] = useState([]);

  const [confirmDialog, setConfirmDialog] = useState({ open: false, tipo: '', index: null, nombreItem: '' });

  useEffect(() => {
    if (formData) {
      setHijos(formData.lista_hijos || []);
      setCargos(formData.lista_cargos || []);
      setAntepasados(formData.lista_antepasados || []);
    }
  }, [formData?.dni_com]);

  const actualizarPadre = (key, nuevaLista) => {
    if (typeof setFormData === 'function') {
      setFormData(prev => ({ ...prev, [key]: nuevaLista }));
    }
  };

  const solicitarEliminacion = (tipo, index, nombreItem) => {
    setConfirmDialog({ open: true, tipo, index, nombreItem: nombreItem || 'este registro' });
  };

  const cerrarConfirmacion = () => setConfirmDialog({ open: false, tipo: '', index: null, nombreItem: '' });

  const ejecutarEliminacion = () => {
    const { tipo, index } = confirmDialog;
    if (tipo === 'hijo') {
      const nueva = hijos.filter((_, i) => i !== index);
      setHijos(nueva);
      actualizarPadre('lista_hijos', nueva);
    } else if (tipo === 'cargo') {
      const nueva = cargos.filter((_, i) => i !== index);
      setCargos(nueva);
      actualizarPadre('lista_cargos', nueva);
    } else if (tipo === 'antepasado') {
      const nueva = antepasados.filter((_, i) => i !== index);
      setAntepasados(nueva);
      actualizarPadre('lista_antepasados', nueva);
    }
    cerrarConfirmacion();
  };

  return (
    <Box sx={{ width: '100%', minHeight: 400 }}>
      <Tabs value={tabActual} onChange={(e, val) => setTabActual(val)} variant="fullWidth" sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Datos Personales" />
        <Tab label="Cónyuge" />
        <Tab label={`Hijos (${hijos.length})`} />
        <Tab label={`Cargos (${cargos.length})`} />
        <Tab label={`Antepasados (${antepasados.length})`} />
      </Tabs>

      {tabActual === 0 && <DatosPersonalesTab formData={formData} onChange={onChange} setFormData={setFormData} />}
      {tabActual === 1 && <ConyugeTab formData={formData} setFormData={setFormData} />}
      {tabActual === 2 && <HijosTab hijos={hijos} setHijos={setHijos} actualizarPadre={actualizarPadre} pedirConfirmacion={solicitarEliminacion} />}
      {tabActual === 3 && <CargosTab cargos={cargos} setCargos={setCargos} actualizarPadre={actualizarPadre} pedirConfirmacion={solicitarEliminacion} />}
      {tabActual === 4 && <AntepasadosTab antepasados={antepasados} setAntepasados={setAntepasados} actualizarPadre={actualizarPadre} pedirConfirmacion={solicitarEliminacion} />}

      <DialogConfirmarEliminar
        open={confirmDialog.open}
        onClose={cerrarConfirmacion}
        onConfirm={ejecutarEliminacion}
        nombreItem={confirmDialog.nombreItem}
      />
    </Box>
  );
};