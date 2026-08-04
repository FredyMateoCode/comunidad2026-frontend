/*RUTA QUE NO DEJA PASAR NADA*/
// src/componentes/RutaPrivada.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function RutaPrivada({ rolesPermitidos }) {
  const token = localStorage.getItem('auth-token');
  const userRol = localStorage.getItem('user-rol'); // Lee el rol ("1" o "8")

  // 1. Si no hay token, significa que no está logueado -> va al Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si se definieron roles permitidos y el rol del usuario NO está incluido
  if (rolesPermitidos && !rolesPermitidos.includes(Number(userRol))) {
    // Redirige a la raíz del dashboard (donde sí tiene acceso a VistaInicio)
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Si pasa los controles, renderiza la sub-ruta solicitada
  return <Outlet />;
}






/*RUTA QUE DEJA PASAR TODO*/
/*
import { Outlet } from 'react-router-dom';

const RutaPrivada = () => {
    // Retorna directamente el Outlet sin validar el localStorage
    return <Outlet />;
};

export default RutaPrivada;*/

