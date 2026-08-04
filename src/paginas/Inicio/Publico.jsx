import React, { useState, Suspense } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

// Importaciones esenciales de Material-UI
import {
  Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Collapse, Tooltip, Button, Badge 
} from '@mui/material';

// Íconos estrictamente utilizados en esta vista pública
import {
  Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Dashboard as DashboardIcon,
  Newspaper as NewspaperIcon, Mail as MailIcon, Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon, ExpandLess, ExpandMore,
  ContactPhone as ContactPhoneIcon, AssignmentInd as AssignmentIndIcon, 
  Business as BusinessIcon
} from '@mui/icons-material';

// Importaciones de activos locales
import imagen001 from '../../assets/imagenes/cch_2026.png';
import Footer from '../../componentes/Footers/Footer';

export default function Publico() {
  // Estados para controlar la barra lateral y submenú público
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Constantes de diseño para el menú lateral
  const drawerWidth = 250;
  const collapsedWidth = 60;

  const toggleDrawer = () => setOpen(!open);
  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);

  // Propiedades dinámicas para los enlaces de navegación pública
  const getListItemProps = (path) => {
    const isSelected = location.pathname === `/${path}`;
    const fullPath = `/${path}`;
    
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

  return (
    <Box sx={{ display: 'flex', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      <CssBaseline />
      
      {/* 1. Barra Superior Pública (AppBar) */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,  
        background: 'linear-gradient(to right, #008ef7, #02306f)', width: '100%' }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',  
          padding: { xs: 1, sm: '0 16px' }, width: '100%', maxWidth: '100%' }}>
          
          {/* Lado Izquierdo: Botón Menú, Logo e Identificación Regional */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
              <img src={imagen001} alt="Logo" style={{ width: 32, height: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>CCH - Fiscalía - 2026</Typography>
            </Box>
          </Box>

          {/* Lado Derecho: Alertas Generales y Botón de Acceso al Sistema */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Badge badgeContent={10} color="primary">
              <MailIcon color="inherit" />
            </Badge>
            <IconButton color="inherit"><NotificationsIcon /></IconButton>
            
            <Tooltip title="Acceder al Padrón">
              <Button sx={{ textTransform: 'none' }} variant="contained" color="primary"
                endIcon={<AccountCircleIcon />} onClick={() => navigate('/login')}>
                Acceso
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 2. Barra Lateral de Navegación Informativa (Drawer) */}
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
          
          {/* Opción: Inicio */}
          <ListItem {...getListItemProps('')}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            {open && <ListItemText primary="Inicio" sx={{ color: 'black' }} />}
          </ListItem>
          
          {/* Opción: Convocatorias Comunales */}
          <ListItem {...getListItemProps('convocatorias')}>
            <ListItemIcon><NewspaperIcon /></ListItemIcon>
            {open && <ListItemText primary="Convocatorias" sx={{ color: 'black' }} />}
          </ListItem>

          {/* Opción Padre con Submenú: Contactos e Institución */}
          <ListItem
            onClick={toggleSubmenu}
            sx={{
              cursor: 'pointer',
              bgcolor: submenuOpen ? 'rgba(0, 0, 0, 0.04)' : 'inherit',
              borderRadius: 2, marginX: 0.5,
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' }
            }}
          >
            <ListItemIcon><ContactPhoneIcon /></ListItemIcon>
            {open && <ListItemText primary="Contactos" sx={{ color: 'black' }} />}
            {open && (submenuOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>

          {/* Hijos del Submenú Informativo */}
          <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: open ? 4 : 2 }}>
              
              <ListItem {...getListItemProps('contactos/espera')}>
                <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                {open && <ListItemText primary="Junta Directiva" sx={{ color: 'black' }}  />}
              </ListItem>

              <ListItem {...getListItemProps('contactos/espera2')}>
                <ListItemIcon><BusinessIcon /></ListItemIcon>
                {open && <ListItemText primary="Oficinas Locales" sx={{ color: 'black' }}  />}
              </ListItem>

            </List>
          </Collapse>

        </List>
      </Drawer>

      {/* 3. Área Principal: Renderiza el Carousel, Sliders, Cards y Reproductores mediante las rutas */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        <Toolbar />
        
        {/* Suspense se encarga de esperar la carga de los componentes dinámicos como sliders */}
        <Suspense fallback={<div>Cargando contenido...</div>}>
          <Outlet /> 
        </Suspense>
        
        <Toolbar />
        <Footer />
      </Box>
    </Box>
  );
}