import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import FormAsistenciaFaena from '../Formularios/FormAsistenciaFaena';

export default function ModalAsistenciaFaena({ open, onClose, idFaena }) {
  const handleSimularSubmit = (formData) => {
    console.log('=== DATOS ASISTENCIA FAENA (SIMULACIÓN) ===');
    console.log(JSON.stringify(formData, null, 2));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Registrar Asistencia a Faena</DialogTitle>
      <DialogContent>
        <FormAsistenciaFaena
          idFaena={idFaena}
          onSubmit={handleSimularSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}