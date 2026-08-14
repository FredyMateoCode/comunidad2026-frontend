import React from 'react';
import { Grid } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MaleIcon from '@mui/icons-material/Male';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import GrassIcon from '@mui/icons-material/Grass';

import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import CardDato from '../CardDato';
import { calcularEdad } from '../utils';

export default function TabDatosPersonales({ ficha }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<CakeIcon />} titulo="Fecha de Nacimiento" valor={ficha.fecha_nac_com ? new Date(ficha.fecha_nac_com).toLocaleDateString('es-PE') : 'N/A'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<HourglassTopIcon />} titulo="Edad" valor={calcularEdad(ficha.fecha_nac_com)} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<FavoriteBorderIcon />} titulo="Estado Civil" valor={ficha.est_civil_com || 'No especificado'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<MaleIcon />} titulo="Género" valor={ficha.genero_com || 'No especificado'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<PhoneAndroidIcon />} titulo="Celular" valor={ficha.celular_com || 'No registrado'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<SchoolIcon />} titulo="Grado de Instrucción" valor={ficha.g_instruccion_com || 'N/A'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<AirlineSeatFlatIcon />} titulo="Lugar de Nacimiento" valor={ficha.lugar_nacimiento_com || 'No especificado'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<HomeIcon />} titulo="Domicilio Actual" valor={ficha.domicilio_com || 'No especificado'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<HowToRegIcon />} titulo="Año de Ingreso" valor={ficha.anio_ingreso_com || 'No especificado'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<LocationCityIcon />} titulo="Caserío" valor={ficha.nombre_caserio || 'N/A'} destacada />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDato icon={<GrassIcon />} titulo="Usufructo" valor={ficha.nombre_usufructo || 'N/A'} destacada />
      </Grid>
    </Grid>
  );
}