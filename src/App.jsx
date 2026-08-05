// app.jsx (componentes para el funcionamiento de react)
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

//Importacion de la protección de rutas
import RutaPrivada from "./componentes/RutaPrivada";

// Componentes del Layout (padres)
const Publico = lazy(() => import("./paginas/Inicio/Publico"));
const Login = lazy(() => import("./paginas/Login/Login"));
const Dashboard = lazy(() => import("./paginas/Dashboard/Dashboard"));


//Sección de la página pública
const VistaConvocatorias = lazy(() => import("./paginas/Inicio/Vistas/VistaConvocatorias.jsx"));
const VistaEspera = lazy(() => import("./paginas/Inicio/Vistas/VistaEspera.jsx"));
const VistaEspera2 = lazy(() => import("./paginas/Inicio/Vistas/VistaEspera2.jsx"));

//Vistas de la sección Privada - despues del login
const VistaMisDatos = lazy(() => import("./paginas/Inicio/Vistas/VistaMisDatos.jsx"));

//Importación de Formularios
import FormularioFicha from './componentes/Formularios/FormularioFicha.jsx';

// Componentes de las vistas Dashboard (hijos)
const VistaInicio = lazy(() => import("./paginas/Inicio/Vistas/VistaInicio.jsx"));
const VistaComuneros = lazy(() => import("./paginas/Inicio/Vistas/VistaComuneros.jsx"));
/*const ReportesPrestamos = lazy(() => import("./paginas/Inicio/Vistas/VistaEspera.jsx"));
const ReportesVencidos = lazy(() => import("./paginas/Inicio/Vistas/VistaEspera2.jsx"));*/

// Importa el componente que quieres que sea siempre visible
import PlaygroundSpeedDial from "./componentes/Speeds/PlaygroundSpeedDial";

// Componente para la página 404 (opcional pero recomendado)
const NotFound = () => <h1>404: Página no encontrada</h1>;

export default function App() {
  return (
    <BrowserRouter>
      {/* Envuelve el componente en un Box con estilos de posicionamiento */}
      <Box
        sx={{
          position: "fixed", // Posiciona el elemento relativo a la ventana del navegador
          bottom: 16, // 16px desde la parte inferior
          right: 16, // 16px desde la parte derecha
          zIndex: 1000 // Asegura que esté por encima de otros elementos
        }}>
        <PlaygroundSpeedDial />
      </Box>
      <Suspense
        fallback={
          // Reemplaza el <div> por un componente Box de MUI con el CircularProgress
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh" // Ocupa toda la altura de la ventana
            }}>
            <CircularProgress />
          </Box>
        }>
        <Routes>
          {/* Rutas públicas, usan el layout de Publico.jsx */}
          <Route path="/" element={<Publico />}>
            <Route index element={<VistaInicio />} />
            <Route path="convocatorias" element={<VistaConvocatorias />} />            
            <Route path="contactos/espera" element={<VistaEspera />} />
            <Route path="contactos/espera2" element={<VistaEspera2 />} />
          </Route>

          {/* Rutas de DASHBOARD, usan el layout de Dashboard.jsx */}
          {/* Rutas envueltas en rutas Privadas para evitar acceso sin login */}
          {/* Rutas de DASHBOARD, usan el layout de Dashboard.jsx */}
          <Route element={<RutaPrivada />}>
            <Route path="/dashboard" element={<Dashboard />}>
              {/* 🔓 RUTAS ACCESIBLES POR AMBOS ROLES (Administrador: 1 y Comunero: 8) */}
              <Route index element={<VistaInicio />} />
              <Route path="misdatos" element={<VistaMisDatos />} />
              <Route path="completar-ficha" element={<FormularioFicha />} />

              {/* 🔒 RUTAS EXCLUSIVAS PARA EL ROL ADMINISTRADOR (Rol 1) */}
              <Route element={<RutaPrivada rolesPermitidos={[1]} />}>
                <Route path="comuneros" element={<VistaComuneros />} />
                <Route path="reportes/espera" element={<VistaEspera />} />
                <Route path="reportes/espera2" element={<VistaEspera2 />} />
              </Route>
            </Route>
          </Route>

          {/* Otras rutas de nivel superior */}
          <Route path="/login" element={<Login />} />
          {/* Ruta de 'catch-all' para páginas no encontradas. Debe ir al final. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
