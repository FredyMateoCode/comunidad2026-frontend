import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PeopleIcon from '@mui/icons-material/People';
import { BarChart, PieChart } from '@mui/x-charts';

export default function DashboardGraficos({ data }) {
  // 1. Control de seguridad: evita errores si la propiedad data llega undefined
  if (!data) return null;

  // 2. Desestructuración segura con valores predeterminados
  const { 
    kpis = {}, 
    comunerosPorCondicion = [], 
    usuariosPorRol = [] 
  } = data;

  // Preparar datos para el gráfico de barras (Condición)
  const xLabelsCondicion = comunerosPorCondicion.map((item) => item.condicion);
  const dataCondicion = comunerosPorCondicion.map((item) => item.cantidad);

  // Preparar datos para el gráfico circular (Roles)
  const pieDataRoles = usuariosPorRol.map((item, index) => ({
    id: index,
    value: item.cantidad,
    label: item.rol,
  }));

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      {/* SECCIÓN 1: Tarjetas KPI */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        
        {/* Total Comuneros */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Total Comuneros
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {kpis.totalComuneros ?? 0}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#1976d2', width: 50, height: 50 }}>
                <GroupIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>

        {/* Comuneros Activos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Comuneros Activos
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {kpis.comunerosActivos ?? 0}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#2e7d32', width: 50, height: 50 }}>
                <CheckCircleIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>

        {/* Comuneros Inactivos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Comuneros Inactivos
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {kpis.comunerosInactivos ?? 0}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#d32f2f', width: 50, height: 50 }}>
                <CancelIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Usuarios */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Total Usuarios
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {kpis.totalUsuarios ?? 0}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#ed6c02', width: 50, height: 50 }}>
                <PeopleIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* SECCIÓN 2: Gráficos Estadísticos */}
      <Grid container spacing={3}>
        
        {/* Gráfico de Barras: Condición de Comuneros */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
              Comuneros por Condición
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: xLabelsCondicion }]}
              series={[{ data: dataCondicion, label: 'Cantidad', color: '#1976d2' }]}
              height={300}
            />
          </Card>
        </Grid>

        {/* Gráfico Circular: Usuarios por Rol */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
              Distribución de Usuarios por Rol
            </Typography>
            <PieChart
              series={[
                {
                  data: pieDataRoles,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 4,
                },
              ]}
              height={300}
            />
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}