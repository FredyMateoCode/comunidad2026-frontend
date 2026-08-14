import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Avatar, Button } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import api from '../../../servicios/api.js';

export const DatosPersonalesTab = ({ formData = {}, onChange, setFormData }) => {
  const [previewFoto, setPreviewFoto] = useState('');
  const [listaUsufructos, setListaUsufructos] = useState([]);
  const [listaCaserios, setListaCaserios] = useState([]);

  // Cargar Usufructos
  useEffect(() => {
    api.get('/api/usufructos')
      .then(res => setListaUsufructos(res.data || []))
      .catch(err => console.error(err));
  }, []);

  // Cargar Caseríos
  useEffect(() => {
    api.get('/api/caserios')
      .then(res => setListaCaserios(res.data || []))
      .catch(err => console.error(err));
  }, []);

  // Vista previa de la foto
  useEffect(() => {
    if (formData?.dni_com) {
      setPreviewFoto(`/src/assets/imagenes/fotos/${formData.dni_com}.jpg`);
    }
  }, [formData?.dni_com]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewFoto(reader.result);
      reader.readAsDataURL(file);

      if (onChange) {
        onChange({ target: { name: 'foto_file', value: file } });
      }
    }
  };

  // Manejo de Caserío (Actualización única de id_cas e id_usu)
  // 1. Manejo de cambio de Caserío
const handleCaserioChange = (e) => {
  const nuevoIdCas = e.target.value;

  // Buscamos el objeto del caserío seleccionado en la lista que ya tenemos
  const caserioEncontrado = listaCaserios.find(c => String(c.id_cas) === String(nuevoIdCas));
  const nuevoNombreCas = caserioEncontrado ? caserioEncontrado.nombre_cas : '';

  if (typeof setFormData === 'function') {
    setFormData(prev => ({
      ...prev,
      id_cas: nuevoIdCas,
      nombre_caserio: nuevoNombreCas, // 👈 Se actualiza el nombre automáticamente
      id_usu: '',                     // Reseteamos el ID del usufructo
      nombre_usufructo: ''            // Reseteamos el Nombre del usufructo
    }));
  }
};

// 2. Manejo de cambio de Usufructo
const handleUsufructoChange = (e) => {
  const nuevoIdUsu = e.target.value;

  // Buscamos el objeto del usufructo seleccionado en la lista
  const usufructoEncontrado = listaUsufructos.find(u => String(u.id_usu) === String(nuevoIdUsu));
  const nuevoNombreUsu = usufructoEncontrado ? usufructoEncontrado.nombre_usu : '';

  if (typeof setFormData === 'function') {
    setFormData(prev => ({
      ...prev,
      id_usu: nuevoIdUsu,
      nombre_usufructo: nuevoNombreUsu // 👈 Se actualiza el nombre automáticamente
    }));
  } else if (onChange) {
    // Si usas el onChange estándar del padre
    onChange({ target: { name: 'id_usu', value: nuevoIdUsu } });
    onChange({ target: { name: 'nombre_usufructo', value: nuevoNombreUsu } });
  }
};

  // Filtrado flexible tolerante a String y Number
  const usufructosFiltrados = listaUsufructos.filter(
    (u) => String(u.id_cas) === String(formData?.id_cas)
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}>
      
      {/* Sección Superior: Foto + Datos básicos */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
          <Avatar 
            src={previewFoto} 
            alt={formData?.nombres_com || 'Foto'}
            sx={{ width: 80, height: 80, mb: 1, border: '2px solid #1976d2' }} 
          />
          <Button variant="outlined" component="label" size="small" startIcon={<PhotoCameraIcon />}>
            Foto
            <input hidden accept="image/*" type="file" onChange={handleFotoChange} />
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flex: 1, gap: 2, flexWrap: 'wrap' }}>

          {/* Campo con límite de caracteres */}
          <TextField
            sx={{ flex: '1 1 45%' }}
            label="Carné"
            name="num_carne_com"
            value={formData?.num_carne_com || ''}
            onChange={(e) => {
              // Si el valor supera los 4 dígitos, recortamos a los primeros 4
              if (e.target.value.length > 4) {
                e.target.value = e.target.value.slice(0, 4);
              }
              onChange(e); // Ejecutamos la función onChange original
            }}
            slotProps={{
              htmlInput: {
                min: 0,
                max: 9999
              }
            }}
            size="small"
          />

          {/* Campo con límite de caracteres */}
          <TextField
            sx={{ flex: '1 1 45%' }}
            label="DNI"
            name="dni_com"
            value={formData?.dni_com || ''}
            onChange={(e) => {
              // Si el valor supera los 4 dígitos, recortamos a los primeros 4
              if (e.target.value.length > 8) {
                e.target.value = e.target.value.slice(0, 8);
              }
              onChange(e); // Ejecutamos la función onChange original
            }}
            slotProps={{
              htmlInput: {
                min: 0,
                max: 99999999
              }
            }}
            size="small"
          />

          <TextField select sx={{ flex: '1 1 45%' }} label="Condición" name="condicion_com" value={formData?.condicion_com || 'ACTIVO'} onChange={onChange} size="small">
            <MenuItem value="PASIVO">PASIVO</MenuItem>
            <MenuItem value="ACTIVO">ACTIVO</MenuItem>
            <MenuItem value="INTEGRADO">INTEGRADO</MenuItem>
          </TextField>
          <TextField select sx={{ flex: '1 1 45%' }} label="Género" name="genero_com" value={formData?.genero_com || 'MASCULINO'} onChange={onChange} size="small">
            <MenuItem value="MASCULINO">MASCULINO</MenuItem>
            <MenuItem value="FEMENINO">FEMENINO</MenuItem>
          </TextField>
        </Box>
      </Box>

      {/* Nombres y Apellidos */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField sx={{ flex: '1 1 30%' }} label="Nombres" name="nombres_com" value={formData?.nombres_com || ''} onChange={onChange} size="small" />
        <TextField sx={{ flex: '1 1 30%' }} label="Apellido Paterno" name="ap_paterno_com" value={formData?.ap_paterno_com || ''} onChange={onChange} size="small" />
        <TextField sx={{ flex: '1 1 30%' }} label="Apellido Materno" name="ap_materno_com" value={formData?.ap_materno_com || ''} onChange={onChange} size="small" />
      </Box>

      {/* Campo con límite de caracteres */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          sx={{ flex: '1 1 30%' }}
          label="Celular"
          name="celular_com"
          value={formData?.celular_com || ''}
          onChange={(e) => {
            // Si el valor supera los 4 dígitos, recortamos a los primeros 4
            if (e.target.value.length > 9) {
              e.target.value = e.target.value.slice(0, 9);
            }
            onChange(e); // Ejecutamos la función onChange original
          }}
          slotProps={{
            htmlInput: {
              min: 0,
              max: 999999999
            }
          }}
          size="small"
        />

        <TextField select sx={{ flex: '1 1 30%' }} label="Estado Civil" name="est_civil_com" value={formData?.est_civil_com || 'SOLTERO'} onChange={onChange} size="small">
          <MenuItem value="SOLTERO">SOLTERO</MenuItem>
          <MenuItem value="CASADO">CASADO</MenuItem>
          <MenuItem value="CONVIVIENTE">CONVIVIENTE</MenuItem>
          <MenuItem value="VIUDO">VIUDO</MenuItem>
          <MenuItem value="DIVORCIADO">DIVORCIADO</MenuItem>
        </TextField>
        <TextField sx={{ flex: '1 1 30%' }} label="Grado Instrucción" name="g_instruccion_com" value={formData?.g_instruccion_com || ''} onChange={onChange} size="small" />
      </Box>

      {/* Fechas */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField sx={{ flex: '1 1 30%' }} type="date" label="Fecha Nacimiento" name="fecha_nac_com" value={formData?.fecha_nac_com ? formData.fecha_nac_com.split('T')[0] : ''} onChange={onChange} InputLabelProps={{ shrink: true }} size="small" />
        <TextField sx={{ flex: '1 1 30%' }} label="Lugar Nacimiento" name="lugar_nacimiento_com" value={formData?.lugar_nacimiento_com || ''} onChange={onChange} size="small" />
        
        <TextField
          sx={{ flex: '1 1 30%' }}
          type="number"
          label="Año de Ingreso"
          name="anio_ingreso_com"
          value={formData?.anio_ingreso_com || ''}
          onChange={(e) => {
            // Si el valor supera los 4 dígitos, recortamos a los primeros 4
            if (e.target.value.length > 4) {
              e.target.value = e.target.value.slice(0, 4);
            }
            onChange(e); // Ejecutamos la función onChange original
          }}
          slotProps={{
            htmlInput: {
              min: 1900,
              max: 2099
            }
          }}
          size="small"
        />

      </Box>

      {/* SELECTORES DEPENDIENTES */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        
        {/* Selector de Caserío */}
        <TextField
          select
          fullWidth
          sx={{ flex: '1 1 30%', minWidth: '150px' }}
          label="Caserío"
          name="id_cas"
          value={formData?.id_cas || ''}
          onChange={handleCaserioChange}
          size="small"
        >
          {listaCaserios.map((c) => (
            <MenuItem key={c.id_cas} value={c.id_cas}>
              {c.nombre_cas}
            </MenuItem>
          ))}
        </TextField>

        {/* Selector de Usufructo */}
        <TextField
          select
          fullWidth
          sx={{ flex: '1 1 30%', minWidth: '150px' }}
          label="Usufructo"
          name="id_usu"
          value={formData?.id_usu ?? ''}
          onChange={handleUsufructoChange} // 👈 Usamos la función que busca el nombre
          size="small"
          disabled={!formData?.id_cas}
        >
          {usufructosFiltrados.map((u) => (
            <MenuItem key={u.id_usu} value={u.id_usu}>
              {u.nombre_usu}
            </MenuItem>
          ))}
        </TextField>

        <TextField sx={{ flex: '1 1 30%' }} label="Domicilio Actual" name="domicilio_com" value={formData?.domicilio_com || ''} onChange={onChange} size="small" />
      </Box>

    </Box>
  );
};