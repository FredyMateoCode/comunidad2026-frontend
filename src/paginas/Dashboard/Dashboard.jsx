import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Importaciones esenciales de Material-UI
import {
  Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Collapse, Avatar, Menu, MenuItem, Tooltip, Badge
} from '@mui/material';

// Íconos estrictamente utilizados en el dashboard
import {
  Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Dashboard as DashboardIcon,
  Group as GroupIcon, BarChart as BarChartIcon, ExpandLess, ExpandMore,
  Mail as MailIcon, Notifications as NotificationsIcon, ArrowDropDown as ArrowDropDownIcon,
  Assignment as AssignmentIcon, Layers as LayersIcon, Badge as BadgeIcon, StackedBarChart as StackedBarChartIcon,
  GroupAdd as GroupAddIcon
} from '@mui/icons-material';



// Importaciones de activos/componentes locales
import imagen001 from '../../assets/imagenes/Logo.png';
import Footer from '../../componentes/Footers/Footer';

export default function Dashboard() {
  // Estados para controlar la UI básica y el submenú
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Obtenemos el token guardado
  const token = localStorage.getItem('auth-token');
  let nombreUsuario = 'Administrador'; // Valor por defecto por seguridad
  let rolUsuario = 8; // Valor por defecto (Si algo falla, se queda en el rol más restringido)

  // 2. Si el token existe, lo decodificamos de forma nativa
  if (token) {
    try {
      // El JWT se divide en 3 partes por puntos. La segunda parte [1] es el payload.
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      // Decodificamos el string y lo convertimos en un objeto JSON
      const payloadDecodificado = JSON.parse(window.atob(base64));
      
      // Asignamos el campo 'usuario' que viene desde tu backend
      nombreUsuario = payloadDecodificado.usuario || 'Administrador';
      
      // SOLUCIÓN: Cambiado de id_rol a rol para coincidir exactamente con tu JWT
      rolUsuario = Number(payloadDecodificado.rol);
      
      // Si por alguna razón la conversión falla, asignamos el rol 8 por seguridad
      if (isNaN(rolUsuario)) {
        rolUsuario = 8;
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  // Constantes fijas de diseño
  const drawerWidth = 200;
  const collapsedWidth = 60;

  // Manejo de apertura/cierre de la UI
  const toggleDrawer = () => setOpen(!open);
  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);
  const openMenu = Boolean(anchorEl); 
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget); 
  const handleMenuClose = () => setAnchorEl(null);

  // FUNCIÓN PARA CERRAR SESIÓN:
  const manejarLogout = () => {
    handleMenuClose(); // Cierra el menú visual de MUI

    // Limpiamos los datos del navegador
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-rol');

    // Alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has salido del sistema correctamente.',
      timer: 1000,
      showConfirmButton: false
    });

    // Redireccionamos de inmediato al login
    navigate('/login', { replace: true });
  };

  // Propiedades dinámicas para los enlaces de navegación
  const getListItemProps = (path) => {
    const isSelected = location.pathname === `/dashboard${path}`; 
    const fullPath = `/dashboard${path}`; 
    
    const handleItemClick = (event) => {
      event.preventDefault(); 
      navigate(fullPath, { replace: true }); 
    };

    return {
      component: 'a', 
      href: fullPath,
      onClick: handleItemClick,
      sx: { 
        bgcolor: isSelected ? 'rgba(0, 90, 255, 0.72)' : 'inherit',
        '&:hover': {
          bgcolor: isSelected ? 'rgba(0, 90, 255, 0.72)' : 'rgba(35, 96, 228, 0.49)',
        },
        borderRadius: 2,
        marginX: 0.5,
      },
    };
  };

  // Roles autorizados que tienen permiso para ver TODO el menú administrativo
  const rolesAdministrativos = [1, 2, 4];

  return (
    <>
      <CssBaseline /> 
      <Box sx={{display: 'flex', width: '100%', maxWidth: '100vw', overflowX: 'hidden'}}>
        
        {/* 1. Barra de Navegación Superior (AppBar) */}
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(to right, #008ef7, #02306f)', width: '100%'}}>
          <Toolbar sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: { xs: 1, sm: '0 16px' }, width: '100%', maxWidth: '100%'
          }}>
            
            {/* Lado Izquierdo: Botón menú, Logo y Título */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                <img src={imagen001} alt="Logo" style={{ width: 32, height: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Padrón General 2026</Typography>
              </Box>
            </Box>
            
            {/* Lado Derecho: Notificaciones y Avatar de Usuario */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit">
                <Badge badgeContent={2} color="success">
                  <MailIcon color="inherit" />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={2} color="primary">
                  <NotificationsIcon color="inherit" />
                </Badge>
              </IconButton>
              
              <Tooltip title="Cuenta Activa">
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenuOpen}>
                  <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white', display: { xs: 'none', sm: 'block' } }}>
                    {nombreUsuario}
                  </Typography>
                  <ArrowDropDownIcon sx={{ color: 'white' }} />
                </Box>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleMenuClose}>Ver Perfil</MenuItem>
                <MenuItem onClick={handleMenuClose}>Mi Cuenta</MenuItem>
                <MenuItem onClick={manejarLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </Box>

          </Toolbar>
        </AppBar>

        {/* 2. Menú Lateral Desplegable (Drawer) */}
        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : collapsedWidth,
              boxSizing: 'border-box',
              transition: 'width 0.3s',
              overflowX: 'hidden'
            }
          }}
        >
          <Toolbar />
          <List sx={{ overflowX: 'hidden' }}>
            
            {/* Filtro por Rol: Opción 'Inicio' solo para 1, 2 y 4 */}
            {rolesAdministrativos.includes(rolUsuario) && (
              <ListItem {...getListItemProps('')}>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                {open && <ListItemText primary="Inicio" sx={{ color: 'black' }}  />}
              </ListItem>
            )}

            {/* Filtro por Rol: Opción 'Comuneros' solo para 1, 2 y 4 */}
            {rolesAdministrativos.includes(rolUsuario) && (
              <ListItem {...getListItemProps('/dashboardGraficos')}>
                <ListItemIcon><StackedBarChartIcon /></ListItemIcon>
                {open && <ListItemText primary="Dashboard" sx={{ color: 'black' }}  />}
              </ListItem>
            )}

            {/* Filtro por Rol: Opción 'Comuneros' solo para 1, 2 y 4 */}
            {rolesAdministrativos.includes(rolUsuario) && (
              <ListItem {...getListItemProps('/usuarios')}>
                <ListItemIcon><GroupAddIcon /></ListItemIcon>
                {open && <ListItemText primary="Usuarios" sx={{ color: 'black' }}  />}
              </ListItem>
            )}
            
            {/* Filtro por Rol: Opción 'Comuneros' solo para 1, 2 y 4 */}
            {rolesAdministrativos.includes(rolUsuario) && (
              <ListItem {...getListItemProps('/comuneros')}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                {open && <ListItemText primary="Comuneros" sx={{ color: 'black' }}  />}
              </ListItem>
            )}

            {/* Opción 'Mis Datos': ACCESO GENERAL. La ve el Rol 1, 2, 4 y por supuesto el Rol 8 */}            
            <ListItem {...getListItemProps('/misdatos')}>
              <ListItemIcon><BadgeIcon /></ListItemIcon>
              {open && <ListItemText primary="Mis Datos" sx={{ color: 'black' }}  />}
            </ListItem>     

            {/* Filtro por Rol: Bloque completo de 'Reportes' (Submenú e Hijos) solo para 1, 2 y 4 */}
            {rolesAdministrativos.includes(rolUsuario) && (
              <>
                <ListItem
                  onClick={toggleSubmenu}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: submenuOpen ? 'rgba(0, 0, 0, 0.04)' : 'inherit',
                    borderRadius: 2, marginX: 0.5,
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' }
                  }}
                >
                  <ListItemIcon><BarChartIcon /></ListItemIcon>
                  {open && <ListItemText primary="Reportes" sx={{ color: 'black' }} />}
                  {open && (submenuOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>

                <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: open ? 4 : 2 }}>
                    
                    <ListItem {...getListItemProps('/reportes/espera')}>
                      <ListItemIcon><AssignmentIcon /></ListItemIcon>
                      {open && <ListItemText primary="Reporte 1" sx={{ color: 'black' }} />}
                    </ListItem>

                    <ListItem {...getListItemProps('/reportes/espera2')}>
                      <ListItemIcon><LayersIcon /></ListItemIcon>
                      {open && <ListItemText primary="Reporte 2" sx={{ color: 'black' }} />}
                    </ListItem>

                  </List>
                </Collapse>
              </>
            )}

          </List>
        </Drawer>

        {/* 3. Área de Contenido Principal */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
          <Toolbar />
          <Box sx={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
            <Outlet />
          </Box>
          <Footer />
        </Box>

      </Box>
    </>
  );
}