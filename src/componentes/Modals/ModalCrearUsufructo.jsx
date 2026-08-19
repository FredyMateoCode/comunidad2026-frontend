import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormCrearUsufructo from '../Formularios/FormCrearUsufructo'; // O tu nombre de formulario

export default function ModalCrearUsufructo({ open, onClose, onSubmit, initialData, caserios }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {initialData ? 'Editar Usufructo' : 'Crear Usufructo'}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <FormCrearUsufructo
          initialData={initialData} // 👈 Importante: Pasa initialData aquí
          onSave={onSubmit}
          onClose={onClose}
          caserios={caserios}
        />
      </DialogContent>
    </Dialog>
  );
}