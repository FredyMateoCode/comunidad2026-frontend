import React from 'react';
import { Box, Card, CardContent, Typography, Rating, Button, CardActions, CardMedia } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

import Swal from 'sweetalert2';

import './CardSlider.css';

// Importa tus imágenes aquí
import imagen1 from '../../assets/imagenes/huarimarcan.png';
import imagen2 from '../../assets/imagenes/la_cruzada.png';
import imagen3 from '../../assets/imagenes/san_carlos.png';
import imagen4 from '../../assets/imagenes/leon_pata.png';
import imagen5 from '../../assets/imagenes/canchacucho.png';
import imagen6 from '../../assets/imagenes/andacancha.png';
import imagen7 from '../../assets/imagenes/condorcayan.png';

const cardsData = [
  { id: 1, title: 'Huarimarcan', description: 'La Odisea narra el viaje de regreso de Odiseo a Ítaca tras la Guerra de Troya, enfrentando múltiples peligros como monstruos y dioses', rating: 4.5, image: imagen1 },
  { id: 2, title: 'La Cruzada', description: 'cuenta la historia de un chimpancé que, tras escapar del zoológico con ayuda de una joven, vive entre los humanos.', rating: 3.8, image: imagen2 },
  { id: 3, title: 'San Carlos', description: 'Al Descubrir que un monstruo ha petrificado a varios estudiantes, y deben investigar el misterio de la Cámara de los Secretos.', rating: 5.0, image: imagen3 },
  { id: 4, title: 'León Pata', description: 'Los hermanos Pevensie viajan a Narnia para ayudar al príncipe Caspian a reclamar su trono de la tiranía de su tío Miraz.', rating: 4.2, image: imagen4 },
  { id: 5, title: 'Canchacucho', description: 'Edipo Rey es la historia de un rey que intenta escapar de una profecía, pero termina matando a su padre y casándose con su madre sin saberlo..', rating: 3.5, image: imagen5 },
  { id: 6, title: 'Andacancha', description: 'Edipo Rey es la historia de un rey que intenta escapar de una profecía, pero termina matando a su padre y casándose con su madre sin saberlo..', rating: 3.5, image: imagen6 },
  { id: 7, title: 'Concdorcayan', description: 'Edipo Rey es la historia de un rey que intenta escapar de una profecía, pero termina matando a su padre y casándose con su madre sin saberlo..', rating: 3.5, image: imagen7 },
];

export default function CardSlider() {

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
    <Box className="slider-container">
      <Box className="slider-track">
        {/* Duplicamos los elementos para el efecto de bucle infinito */}
        {[...cardsData, ...cardsData].map((card, index) => (
          <Box key={index} className="slider-card-wrapper">
            <Card className="slider-card">
              <CardMedia component="img" height="140" image={card.image} alt={card.title} />
              <CardContent>
                <Typography variant="h6" component="div">{card.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{card.description}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={card.rating} precision={0.5} readOnly />
                  <Typography sx={{ ml: 0.5 }} variant="body2" color="text.secondary">({card.rating})</Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" endIcon={<VisibilityIcon />} color = 'primary' onClick={mostrarAlerta}>Ver más</Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}