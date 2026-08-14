import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Comuneros2026 from '../../../componentes/Cards/Comuneros2026.jsx';
import FichaComuneroContainer from '../../../componentes/FichaComunero/FichaComuneroContainer.jsx';

export default function VistaComuneros() {
  const [dniSeleccionado, setDniSeleccionado] = useState(null);

  return (
    <Box sx={{ width: '100%', p: { xs: 1, md: 3 } }}>
      {!dniSeleccionado ? (
        <>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#02306f', mb: 3 }}>
            PADRÓN GENERAL DE COMUNEROS 2026
          </Typography>
          <Comuneros2026 onVerFicha={setDniSeleccionado} />
        </>
      ) : (
        <FichaComuneroContainer 
          dni={dniSeleccionado} 
          onVolver={() => setDniSeleccionado(null)} 
        />
      )}
    </Box>
  );
}