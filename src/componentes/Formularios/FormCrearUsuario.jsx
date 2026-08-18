// Ruta: componentes/Formularios/FormCrearUsuario.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText
} from '@mui/material';

const ROLES = [
  { id: 1, nombre: 'administrador' },
  { id: 2, nombre: 'fiscal' },
  { id: 3, nombre: 'sec_fiscal' },
  { id: 4, nombre: 'presidente' },
  { id: 5, nombre: 'sec_presidente' },
  { id: 6, nombre: 'presidente_cas' },
  { id: 7, nombre: 'registrador' },
  { id: 8, nombre: 'comunero' },
  { id: 9, nombre: 'invitado' }
];

export default function FormCrearUsuario({ initialData, onSubmit, onCancel }) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    nombres_us: '',
    apellidos_us: '',
    dni_us: '',
    celular_us: '',
    usuario_us: '',
    password_us: '',
    confirmPassword: '',
    id_rol: 1,
    estado_us: 1
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        password_us: '',
        confirmPassword: '',
        id_rol: initialData.id_rol ? Number(initialData.id_rol) : 1
      });
    } else {
      setFormData({
        nombres_us: '',
        apellidos_us: '',
        dni_us: '',
        celular_us: '',
        usuario_us: '',
        password_us: '',
        confirmPassword: '',
        id_rol: 1,
        estado_us: 1
      });
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'id_rol' || name === 'estado_us' ? Number(value) : value
    }));

    // Limpiar errores a medida que el usuario escribe
    if (errors[name] || errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, [name]: '', confirmPassword: '' }));
    }
  };

  // Función para validar la complejidad de la contraseña
  // Función para validar la complejidad de la contraseña
    const validatePassword = (password) => {
        if (password.length < 8) return false;
        if (!/[a-z]/.test(password)) return false; // Minúscula
        if (!/[A-Z]/.test(password)) return false; // Mayúscula
        if (!/\d/.test(password)) return false;    // Número
        if (!/[^a-zA-Z0-9]/.test(password)) return false; // Carácter especial (cualquier no alfanumérico)
        
        return true;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};

      // Validaciones de contraseña
      if (!isEditing || formData.password_us.trim() !== '') {
        if (!validatePassword(formData.password_us)) {
          newErrors.password_us = 'Debe tener mín. 8 caracteres, mayúscula, minúscula, número y carácter especial';
        }

        if (formData.password_us !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Prepara la carga útil (payload) limpiando datos innecesarios
      const dataToSend = { ...formData };
      delete dataToSend.confirmPassword;

      // Si se está editando y la contraseña no cambió, la eliminamos para no sobrescribir con string vacío
      if (isEditing && !dataToSend.password_us) {
        delete dataToSend.password_us;
      }

      // Impresión en consola limpia
      console.log(`=== DATOS PARA BACKEND (${isEditing ? 'EDICIÓN' : 'CREACIÓN'}) ===`);
      console.log(JSON.stringify(dataToSend, null, 2));

      onSubmit(dataToSend, isEditing);
    };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Nombres"
            name="nombres_us"
            value={formData.nombres_us}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Apellidos"
            name="apellidos_us"
            value={formData.apellidos_us}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="DNI"
            name="dni_us"
            value={formData.dni_us}
            onChange={handleChange}
            inputProps={{ maxLength: 8 }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Celular"
            name="celular_us"
            value={formData.celular_us}
            onChange={handleChange}
            inputProps={{ maxLength: 9 }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            size="small"
            label="Usuario"
            name="usuario_us"
            value={formData.usuario_us}
            onChange={handleChange}
            inputProps={{ maxLength: 20 }}
            required
          />
        </Grid>

        {/* Campo Contraseña */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            type="password"
            label="Contraseña"
            name="password_us"
            value={formData.password_us}
            onChange={handleChange}
            required={!isEditing}
            error={Boolean(errors.password_us)}
            helperText={
              errors.password_us || 
              (isEditing ? 'Dejar en blanco para mantener la actual' : '')
            }
          />
        </Grid>

        {/* Campo Confirmar Contraseña */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            type="password"
            label="Confirmar Contraseña"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required={!isEditing || Boolean(formData.password_us)}
            disabled={isEditing && !formData.password_us}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
        </Grid>

        {isEditing && (
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="estado-select-label">Estado</InputLabel>
              <Select
                labelId="estado-select-label"
                name="estado_us"
                value={formData.estado_us}
                label="Estado"
                onChange={handleChange}
              >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={0}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
              Rol del Usuario
            </FormLabel>
            <RadioGroup
              row
              name="id_rol"
              value={formData.id_rol}
              onChange={handleChange}
            >
              {ROLES.map((rol) => (
                <FormControlLabel
                  key={rol.id}
                  value={rol.id}
                  control={<Radio size="small" />}
                  label={rol.nombre}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button onClick={onCancel} variant="outlined" color="inherit">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
        </Button>
      </Box>
    </Box>
  );
}