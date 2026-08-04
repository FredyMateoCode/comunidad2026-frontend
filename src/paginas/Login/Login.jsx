//Importamos la API
import api from '../../servicios/api';

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

import './Login.css';
import '../../estilos/sweetalert.css'; 
import imagen001 from '../../assets/imagenes/Logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');



  // FUNCION PARA EVITAR QUE LA SESSIÓN QUEDE INICIADA AL DAR ATRAZ: Si el usuario ya está 
  // logueado e intenta volver al Login (con el botón atrás),
  // limpiamos sus datos por seguridad para que tenga que loguearse de nuevo.
  React.useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      // Destruimos la sesión inmediatamente al detectar que regresó al Login
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-rol');
      
      // Forzamos la recarga de la página para limpiar la caché del navegador
      window.location.reload();
    }
  }, []);




  // Manejo del formulario de manera puramente visual y local
  const handleSubmit = async (event) => {
  event.preventDefault();

    // Validación visual para campos vacíos
    if (!usuario || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, ingrese su usuario y contraseña.',
        confirmButtonText: 'Aceptar'
      });
      return; 
    }

    try {
      // Petición real al backend usando tu api.js
      // Reemplaza '/auth/login' por la ruta exacta de tu backend si es distinta
      const respuesta = await api.post('/api/auth/login', { 
        usuario: usuario, 
        password: password 
      });
      
      // Guardamos los datos reales entregados por tu servidor
      localStorage.setItem('auth-token', respuesta.data.token);
      localStorage.setItem('user-rol', respuesta.data.rol || 'Usuario');

      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso.',
        timer: 1000,
        showConfirmButton: false
      }); 

      navigate('/dashboard');

    } catch (error) {
      // Si el servidor responde con error (ej: 401 contraseñas incorrectas)
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: error.response?.data?.message || 'Error de conexión con el servidor.',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <Box className="login-container">
      <Card className="login-card">
        <CardContent>
          
          {/* Encabezado del Formulario */}
          <Box className="login-header">
            <Box
              component="img"
              src={imagen001}
              alt="Logo de la Institución"
              sx={{
                width: 80, 
                height: 80,
                marginBottom: 1, 
              }}
            />
            <Typography variant="h5" component="h1" gutterBottom>
              Iniciar Sesión
            </Typography>
          </Box>

          {/* Formulario de Entrada */}
          <Box component="form" className="login-form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Usuario"
              variant="outlined"
              margin="normal"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <TextField
              fullWidth
              label="Contraseña"
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {/* Botón de Envío */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Ingresar
            </Button>
            
            {/* Botón Cancelar / Regresar al Inicio Público */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}