import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import './CarouselVertical.css';

import imagen1 from '../../assets/imagenes/banner1.jpg';
import imagen2 from '../../assets/imagenes/banner2.jpg';
import imagen3 from '../../assets/imagenes/banner3.jpg';

const slides = [
  {
    image: imagen1,
    title: 'Bienvenidos',
    description: 'Al Portal Web de la Comunidad Campesina de Huayllay".',
  },
  {
    image: imagen2,
    title: 'Turismo',
    description: 'Vive una experiencia Única en el Sanuario Bosque de Rocas de Huayllay.',
  },
  {
    image: imagen3,
    title: 'Cultura',
    description: 'Conoce, Vive y Comparte Nuestras Costumbres y Tradiciones',
  },
];

export default function AutoContentSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const handleNext = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const handlePrev = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  const slide = slides[activeSlide];

  return (
    <Box
      className="auto-content-slider-container"
      sx={{
        backgroundImage: `url(${slide.image})`,
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      {/* El padding horizontal se aplica aquí */}
      <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'rgba(0,0,0,0.5)', borderRadius: 2, maxWidth: '600px', mx: { xs: 2, sm: 'auto' } }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          {slide.title}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
          {slide.description}
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Más información
        </Button>
      </Box>

      <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }} color="black">
        <ArrowBackIos />
      </IconButton>
      <IconButton onClick={handleNext} sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }} color="black">
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}