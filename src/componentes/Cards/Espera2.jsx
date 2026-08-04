import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

import Swal from 'sweetalert2';


import espera from '../../assets/imagenes/leon_pata.png'

export default function MultiActionAreaCard() {

  // Función concreta para mostrar la alerta
    const mostrarAlerta = () => {
        Swal.fire({
            icon: 'info', // Ícono de información
            title: 'Función en Desarrollo',
            text: 'Esta característica estará disponible próximamente.',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#ff9800', // Color del botón de SweetAlert (warning)
        });
    };
    
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={espera}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Soy el Card 2 de Espera
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Soy el Card que indica que esta sección esta en proceso de construcción.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
            variant="contained" 
            color="warning" 
            // VINCULACIÓN CONCRETA: Añadir el evento onClick
            onClick={mostrarAlerta} 
        >
            Ver
        </Button>
      </CardActions>
    </Card>
  );
}
