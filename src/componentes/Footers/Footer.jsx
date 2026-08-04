import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        background: 'linear-gradient(to top, #2f83fa, #002c6a)', //Color degradado
        color: 'white', // Color de texto blanco para contraste
        py: 1, // Reducido de 4 a 2 para menor altura
        mt: 'auto' // Esto empuja el footer hacia abajo
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        {/* Usamos un Grid principal para distribuir el contenido */}
        <Grid container spacing={3} justifyContent="center" textAlign={{ xs: 'center', sm: 'left' }}>
          
          {/* Columna de Título y Lema */}
          <Grid>
            <Typography variant="subtitle1" color="inherit" fontWeight="bold" gutterBottom>
              CRE-v0.1
            </Typography>
            <Typography variant="body2" color="inherit">
             Fiscalía - CCH - Huayllay
            </Typography>
          </Grid>
          
          {/* Columna de Enlaces Útiles */}
          <Grid>
            <Typography variant="subtitle1" fontWeight="bold" color="inherit" gutterBottom>
              Enlaces Útiles
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
              <Link href="#" color="inherit" underline="hover">Acerca de</Link>
              <Link href="#" color="inherit" underline="hover">Contacto</Link>
              <Link href="#" color="inherit" underline="hover">Privacidad</Link>
            </Box>
          </Grid>

          {/* Columna de Recursos */}
          <Grid>
            <Typography variant="subtitle1" fontWeight="bold" color="inherit" gutterBottom>
              Recursos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
              <Link href="#" color="inherit" underline="hover">Blog</Link>
              <Link href="#" color="inherit" underline="hover">Soporte</Link>
              <Link href="#" color="inherit" underline="hover">FAQs</Link>
            </Box>
          </Grid>
        </Grid>
        
        {/* Sección de Copyright */}
        <Box sx={{ 
          mt: 5, 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center', 
          alignItems: 'center', 
          textAlign: 'center',
          gap: { xs: 1, sm: 2 }
        }}>
          <CopyrightIcon sx={{ fontSize: '1rem', color: 'inherit' }} />
          <Typography variant="body2" color="inherit">
            {`Copyright © ${new Date().getFullYear()} Desarrollado por `}<strong>Fredy Mateo</strong>{` - Todos los derechos reservados.`}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}