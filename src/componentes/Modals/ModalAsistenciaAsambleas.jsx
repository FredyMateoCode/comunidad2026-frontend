import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import FormAsistenciaAsamblea from '../Formularios/FormAsistenciaAsamblea.jsx';

export default function ModalAsistencia({ open, onClose, idAsamblea }) {
  const handleSimularSubmit = (formData) => {
    console.log('=== DATOS DE ASISTENCIA REGISTRADOS (SIMULACIÓN) ===');
    console.log(JSON.stringify(formData, null, 2));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Registrar Asistencia</DialogTitle>
      <DialogContent>
        <FormAsistenciaAsamblea
          idAsamblea={idAsamblea}
          onSubmit={handleSimularSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}