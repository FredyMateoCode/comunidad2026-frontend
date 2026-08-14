import React from 'react';
import { Paper, Typography } from '@mui/material';

export default function CardVacia({ texto }) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2.5, bgcolor: '#fafafa', textAlign: 'center', borderStyle: 'dashed' }}>
      <Typography variant="body2" color="text.secondary">
        {texto}
      </Typography>
    </Paper>
  );
}