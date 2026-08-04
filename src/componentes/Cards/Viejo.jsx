import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

import Swal from 'sweetalert2';

import literatura from '../../assets/imagenes/viejos.jpg'

export default function MultiActionAreaCard() {

  // Función concreta para mostrar la alerta
    const mostrarAlerta = () => {
        Swal.fire({
            icon: 'info', // Ícono de información
            title: 'Función en Desarrollo',
            text: 'Esta característica estará disponible próximamente.',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#2ea0fd', // Color del botón de SweetAlert (warning)
        });
    };
    
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={literatura}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Baile Viejo
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Fiesta patronal en honor al señor de Huayllay y las cruces de mayo.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
            variant="contained" 
            color="primary" 
            // VINCULACIÓN CONCRETA: Añadir el evento onClick
            onClick={mostrarAlerta} 
        >
            Ver
        </Button>
      </CardActions>
    </Card>
  );
}
