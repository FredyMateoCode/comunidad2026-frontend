import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box, Card, CardContent, CardMedia, IconButton, Typography
} from '@mui/material';
import {
  SkipPrevious as SkipPreviousIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  SkipNext as SkipNextIcon,
} from '@mui/icons-material';

// Importación de activos (Asegúrate de que estas rutas sean correctas)
import imagen001 from '../../assets/imagenes/somewhere.jpg';
import audio1 from '../../assets/audios/audio.wav'; 
import audio2 from '../../assets/audios/audio2.mp3'; 
import audio3 from '../../assets/audios/audio3.mp3'; 
import audio4 from '../../assets/audios/audio4.mp3';

import Somewhere from '../../assets/imagenes/somewhere.jpg'

// --- DATOS DE LA LISTA DE REPRODUCCIÓN (PLAYLIST) ---
const playlist = [
  { title: "In The End", artist: "Linkin Park", src: audio1, cover: imagen001 },
  { title: "What I've Done", artist: "Linkin Park", src: audio2, cover: imagen001 },
  { title: "Somewhere I Belong", artist: "Linkin Park", src: audio3, cover: Somewhere },
  { title: "New Divide", artist: "Linkin Park", src: audio4, cover: Somewhere },
];

export default function MediaControlCard() {
  const theme = useTheme();
  
  // Se inicia en la segunda canción de la lista (índice 1)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(1); 
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(null);
  const currentTrack = playlist[currentTrackIndex]; 

  // --- LÓGICA DE REPRODUCCIÓN ---
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.log("Error al iniciar la reproducción:", error));
    }
    setIsPlaying(!isPlaying);
  };
  
  // --- LÓGICA DE NAVEGACIÓN (ANTERIOR/SIGUIENTE) ---
  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true); // <-- CAMBIO CLAVE: Reproducción automática al siguiente
  };

  const handlePrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true); // <-- CAMBIO CLAVE: Reproducción automática al anterior
  };
  
  // --- EFECTO: Carga y Reproducción Automática al Cambiar de Pista ---
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // 1. Cargar la nueva fuente de audio
      audio.load();
      
      // 2. Intentar reproducir si el estado indica que debería estar sonando
      if (isPlaying) {
        audio.play().catch(error => console.log("Error de autoplay después de load:", error));
      }
      
      // Opcional: Escucha el evento 'ended' para avanzar automáticamente
      const handleEnded = () => {
        handleNext();
      };
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentTrackIndex, isPlaying]); // Se ejecuta al cambiar de índice o al cambiar el estado de reproducción

  return (
    <Card sx={{ display: 'flex' }}>
      {/* Elemento de Audio (Invisible) */}
      <audio ref={audioRef} src={currentTrack.src} /> 
      
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {currentTrack.title} 
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {currentTrack.artist} 
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
          {/* BOTÓN ANTERIOR */}
          <IconButton aria-label="previous" onClick={handlePrevious}>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          
          {/* BOTÓN PLAY/PAUSE */}
          <IconButton aria-label="play/pause" onClick={handlePlayPause}>
            {isPlaying ? (
              <PauseIcon sx={{ height: 38, width: 38 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
          
          {/* BOTÓN SIGUIENTE */}
          <IconButton aria-label="next" onClick={handleNext}>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={ currentTrack.cover }
        alt="Album cover"
      />
    </Card>
  );
}