import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

export default function CardDato({ icon, titulo, valor, subValor, destacada = false }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2.5,
        borderColor: destacada ? '#b3d7ff' : '#e0e0e0',
        bgcolor: destacada ? '#f8fbff' : 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height: '100%',
        boxSizing: 'border-box'
      }}
    >
      <Box 
        sx={{ 
          bgcolor: destacada ? '#008ef7' : '#eef6ff', 
          p: 1.2, 
          borderRadius: 2, 
          display: 'flex', 
          color: destacada ? '#ffffff' : '#02306f' 
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color={destacada ? '#02306f' : 'text.secondary'} sx={{ fontWeight: 'bold', display: 'block' }}>
          {titulo}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: destacada ? '#008ef7' : '#333', mt: 0.3 }}>
          {valor}
        </Typography>
        {subValor && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.2 }}>
            {subValor}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}