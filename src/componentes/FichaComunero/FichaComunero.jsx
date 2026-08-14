import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

// Iconos de Pestañas
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BadgeIcon from '@mui/icons-material/Badge';
import ConstructionIcon from '@mui/icons-material/Construction';
import WarningIcon from '@mui/icons-material/Warning';
import HowToRegIcon from '@mui/icons-material/HowToReg';

// Subcomponentes
import FichaHeader from './FichaHeader';
import TabDatosPersonales from './Tabs/TabDatosPersonales';
import TabFamilia from './Tabs/TabFamilia';
import TabAsambleas from './Tabs/TabAsambleas';
import TabCargos from './Tabs/TabCargos';
import TabFaenas from './Tabs/TabFaenas';
import TabAntecedentes from './Tabs/TabAntecedentes';
import TabAntepasados from './Tabs/TabAntepasados';

export default function FichaComunero({ ficha, onEditar, onToggleEstado }) {
  const [tabIndex, setTabIndex] = useState(0);

  if (!ficha) return null;

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      {/* Cabecera con Foto y Acciones */}
      <FichaHeader 
        ficha={ficha} 
        onEditar={onEditar} 
        onToggleEstado={onToggleEstado} 
      />

      {/* Menú de Pestañas */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabIndex} 
          onChange={(e, val) => setTabIndex(val)} 
          variant="scrollable" 
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': { fontWeight: 'bold', textTransform: 'none', fontSize: '0.95rem' },
            '& .Mui-selected': { color: '#02306f' }
          }}
        >
          <Tab icon={<PersonIcon />} iconPosition="start" label="Datos Personales" />
          <Tab icon={<FamilyRestroomIcon />} iconPosition="start" label="Familia" />
          <Tab icon={<HowToRegIcon />} iconPosition="start" label="Antepasados" />
          <Tab icon={<BadgeIcon />} iconPosition="start" label="Cargos" />
          <Tab icon={<HowToVoteIcon />} iconPosition="start" label="Asambleas" />
          <Tab icon={<ConstructionIcon />} iconPosition="start" label="Faenas" />
          <Tab icon={<WarningIcon />} iconPosition="start" label="Antecedentes" />
        </Tabs>
      </Box>

      {/* Contenido de la Pestaña Activa */}
      {tabIndex === 0 && <TabDatosPersonales ficha={ficha} />}
      {tabIndex === 1 && <TabFamilia ficha={ficha} />}
      {tabIndex === 2 && <TabAntepasados ficha={ficha} />}
      {tabIndex === 3 && <TabCargos ficha={ficha} />}
      {tabIndex === 4 && <TabAsambleas ficha={ficha} />}
      {tabIndex === 5 && <TabFaenas ficha={ficha} />}
      {tabIndex === 6 && <TabAntecedentes ficha={ficha} />}
      
    </Box>
  );
}