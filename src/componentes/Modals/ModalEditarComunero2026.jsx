import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import { FormEditarComunero2026 } from '../Formularios/FormEditarComunero2026.jsx';
import { actualizarComuneroService } from '../../servicios/actualizarComunero.js'; // Ajusta la ruta a tu archivo en servicios

export const ModalEditarComunero = ({ open, onClose, datosIniciales, onGuardar }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && datosIniciales) {
      setFormData(datosIniciales);
    }
  }, [open, datosIniciales?.dni_com]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Petición delegada al servicio
      const dataRespuesta = await actualizarComuneroService(formData);

      // Cerramos modal y notificamos al padre
      onClose();
      if (onGuardar) onGuardar(dataRespuesta);

      // Alerta de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: dataRespuesta?.message || 'Los datos del comunero se guardaron correctamente.',
        confirmButtonColor: '#2e7d32',
        confirmButtonText: 'Aceptar',
        timer: 5500
      });

    } catch (error) {
      console.error("Error al actualizar comunero:", error.response?.data || error.message);
      
      const mensajeError = error.response?.data?.message 
        || error.response?.data?.mensaje 
        || 'No se pudo guardar la información.';

      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar',
        text: mensajeError,
        confirmButtonColor: '#d32f2f',
        confirmButtonText: 'Entendido',
        customClass: {
          container: 'swal-top-priority'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Datos del Comunero</DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <FormEditarComunero2026 
            formData={formData} 
            onChange={handleChange} 
            setFormData={setFormData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit" disabled={loading}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};