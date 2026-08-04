import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Grid, Typography, TextField, Button, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Paper, Divider, IconButton, CircularProgress
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, PictureAsPdf as PdfIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


import LogoComunidad from '../../assets/imagenes/Logo.png'; // Ajusta los '../' según la ubicación exacta de este componente


// Importamos el servicio para traer los datos base que usaremos para rellenar el inicio
import { obtenerMisDatos } from '../../servicios/mis_datos';

export default function FormularioFicha() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);

  // Estado del formulario completamente estructurado y corregido
  // Se inicializan 'genero' y 'estadoCivil' con valores por defecto para que nunca viajen vacíos al PDF
  const [form, setForm] = useState({
    apellidos: '', nombres: '', dni: '', edad: '', genero: 'MASCULINO',
    celular: '', fechaNacimiento: '', domicilio: '', lugarNacimiento: '',
    estadoCivil: 'SOLTERO', gradoInstruccion: '', anoIngreso: '', fechaReempadronamiento: '',
    caserio: '', majada: '', carne: '', condicion: '', 
    conyugeApellidos: '', conyugeNombres: '', conyugeDni: '', conyugeEdad: '',
    conyugeEstadoCivil: 'SOLTERO', conyugeFechaNacimiento: '', conyugeCelular: '',
    conyugeLugarNacimiento: '', conyugeGradoInstruccion: '',
    padreApellidos: '', padreNombres: '', padreVive: 'SI',
    madreApellidos: '', madreNombres: '', madreVive: 'SI',
    abueloPaterno: '', abueloPaternoVive: 'SI',
    abuelaPaterna: '', abuelaPaternaVive: 'SI',
    abueloMaterno: '', abueloMaternoVive: 'SI',
    abuelaMaterna: '', abuelaMaternaVive: 'SI',
    hijos: [{ nombres: '', edad: '', dni: '' }],
    cargos: [{ cargo: '', ano: '' }]
  });

  // Al cargar el componente, jalamos de la BD los datos del Comunero que ya existan
  useEffect(() => {
    async function precargarDatosComunero() {
      try {
        const respuesta = await obtenerMisDatos();
        const d = respuesta?.data || respuesta; 

        if (d) {
          setForm(prev => ({
            ...prev,
            apellidos: d.apellidos_com || '',
            nombres: d.nombres_com || '',
            dni: d.dni_com || '',
            caserio: d.caserio_com || '',
            majada: d.majada_com || '',
            carne: d.carne_com || '',
            condicion: d.condicion_com || '',
            // Si la base de datos trae estos valores, los sobreescribimos; de lo contrario mantiene el default
            genero: d.genero_com || prev.genero,
            estadoCivil: d.estado_civil_com || prev.estadoCivil
          }));
        }
      } catch (error) {
        console.error("Error al precargar datos en el formulario:", error);
      } finally {
        setCargando(false);
      }
    }
    precargarDatosComunero();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // --- ARREGLOS DINÁMICOS: HIJOS ---
  const handleHijoChange = (index, field, value) => {
    const nuevosHijos = [...form.hijos];
    nuevosHijos[index][field] = value;
    setForm(prev => ({ ...prev, hijos: nuevosHijos }));
  };

  const agregarHijo = () => setForm(prev => ({ ...prev, hijos: [...prev.hijos, { nombres: '', edad: '', dni: '' }] }));
  const eliminarHijo = (index) => setForm(prev => ({ ...prev, hijos: prev.hijos.filter((_, i) => i !== index) }));

  // --- ARREGLOS DINÁMICOS: CARGOS ---
  const handleCargoChange = (index, field, value) => {
    const nuevosCargos = [...form.cargos];
    nuevosCargos[index][field] = value;
    setForm(prev => ({ ...prev, cargos: nuevosCargos }));
  };

  const agregarCargo = () => setForm(prev => ({ ...prev, cargos: [...prev.cargos, { cargo: '', ano: '' }] }));
  const eliminarCargo = (index) => setForm(prev => ({ ...prev, cargos: prev.cargos.filter((_, i) => i !== index) }));

  // LÓGICA DE GENERACIÓN DE PDF EXCLUSIVA EN CLIENTE
  const manejarGeneracionPDF = (e) => {
    e.preventDefault();
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      // --- AGREGAR LOGO DE LA COMUNIDAD ---
      // Parámetros: addImage(ruta_importada, 'Formato', x, y, ancho, alto)
      const logoAncho = 20;
      const logoAlto = 20;
      doc.addImage(LogoComunidad, 'PNG', 15, 12, logoAncho, logoAlto);

      // --- TÍTULOS ALINEADOS A LA DERECHA DEL LOGO ---
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      // Ajustamos la coordenada X a 112 para centrar el texto en el espacio restante
      doc.text("PADRÓN GENERAL DE COMUNEROS 2026", 112, 18, { align: "center" });

      doc.setFontSize(12);
      doc.text("FICHA FAMILIAR DE REEMPADRONAMIENTO", 112, 25, { align: "center" });

      // Línea divisoria debajo del encabezado
      doc.line(15, 34, 195, 34);

      // Como el encabezado ahora es más alto por el logo, bajamos el inicio del contenido
      let y = 42;
      doc.setFontSize(10);
      doc.text("I. DATOS DEL COMUNERO", 15, y);
      doc.setFont("helvetica", "normal");
      
      // ALINEACIÓN COMPLETA EN 2 COLUMNAS PERFECTAS (X: 15 e Izquierda, X: 110 y Derecha)
      y += 7;
      doc.text(`1.1. Apellidos: ${form.apellidos}`, 15, y);
      doc.text(`1.2. Nombres: ${form.nombres}`, 110, y);
      
      y += 6;
      doc.text(`1.3. DNI N°: ${form.dni}`, 15, y);
      doc.text(`1.4. Edad: ${form.edad}`, 110, y);
      
      y += 6;
      doc.text(`1.5. Género: ${form.genero}`, 15, y);
      doc.text(`1.6. Caserío: ${form.caserio}`, 110, y);
      
      y += 6;
      doc.text(`1.7. Majada: ${form.majada}`, 15, y);
      doc.text(`1.8. Carné: ${form.carne}`, 110, y);
      
      y += 6;
      doc.text(`1.9. Condición: ${form.condicion}`, 15, y);
      doc.text(`1.10. Celular: ${form.celular}`, 110, y);
      
      y += 6;
      doc.text(`1.11. F. Nacimiento: ${form.fechaNacimiento}`, 15, y);
      doc.text(`1.12. Domicilio: ${form.domicilio}`, 110, y);
      
      y += 6;
      doc.text(`1.13. Lugar Nac.: ${form.lugarNacimiento}`, 15, y);
      doc.text(`1.14. Estado Civil: ${form.estadoCivil}`, 110, y); // Captura el valor del estado de React
      
      y += 6;
      doc.text(`1.15. Grado Instrucción: ${form.gradoInstruccion}`, 15, y);
      doc.text(`1.16. Año Ingreso: ${form.anoIngreso}`, 110, y);
      
      y += 6;
      doc.text(`1.17. F. Reemp.: ${form.fechaReempadronamiento}`, 15, y);

      // SECCIÓN II. CÓNYUGE A 2 COLUMNAS PERFECTAS
      y += 10;
      doc.setFont("helvetica", "bold"); 
      doc.text("II. DATOS PERSONALES DEL CÓNYUGE", 15, y); 
      doc.setFont("helvetica", "normal");
      
      y += 7;
      doc.text(`2.1. Apellidos: ${form.conyugeApellidos}`, 15, y);
      doc.text(`2.2. Nombres: ${form.conyugeNombres}`, 110, y);
      
      y += 6;
      doc.text(`2.3. DNI N°: ${form.conyugeDni}`, 15, y);
      doc.text(`2.4. Edad: ${form.conyugeEdad}`, 110, y);
      
      y += 6;
      doc.text(`2.5. Estado Civil: ${form.conyugeEstadoCivil}`, 15, y);
      doc.text(`2.6. F. Nacimiento: ${form.conyugeFechaNacimiento}`, 110, y);
      
      y += 6;
      doc.text(`2.7. Celular: ${form.conyugeCelular}`, 15, y);
      doc.text(`2.8. Lugar Nac.: ${form.conyugeLugarNacimiento}`, 110, y);
      
      y += 6;
      doc.text(`2.9. Grado Instrucción: ${form.conyugeGradoInstruccion}`, 15, y);

      // SECCIÓN III. PADRES
      y += 10;
      doc.setFont("helvetica", "bold"); doc.text("III. NOMBRES DE LOS PADRES DEL COMUNERO(A)", 15, y); doc.setFont("helvetica", "normal");
      y += 6;
      doc.text(`3.1. PADRE: ${form.padreApellidos}, ${form.padreNombres} | ¿Vive?: ${form.padreVive}`, 15, y);
      y += 6;
      doc.text(`3.2. MADRE: ${form.madreApellidos}, ${form.madreNombres} | ¿Vive?: ${form.madreVive}`, 15, y);

      // SECCIÓN IV. ABUELOS INDIVIDUALES
      y += 10;
      doc.setFont("helvetica", "bold"); doc.text("IV. NOMBRES DE LOS ABUELOS", 15, y); doc.setFont("helvetica", "normal");
      y += 6;
      doc.text(`4.1. Abuelo Paterno: ${form.abueloPaterno} | ¿Vive?: ${form.abueloPaternoVive}`, 15, y);
      y += 6;
      doc.text(`4.2. Abuela Paterno: ${form.abuelaPaterna} | ¿Vive?: ${form.abuelaPaternaVive}`, 15, y);
      y += 6;
      doc.text(`4.3. Abuelo Materno: ${form.abueloMaterno} | ¿Vive?: ${form.abueloMaternoVive}`, 15, y);
      y += 6;
      doc.text(`4.4. Abuela Materno: ${form.abuelaMaterna} | ¿Vive?: ${form.abuelaMaternaVive}`, 15, y);

      // TABLA DE HIJOS LLAMADA DE FORMA DIRECTA
      y += 10;
      doc.setFont("helvetica", "bold"); doc.text("V. HIJOS DEL COMUNERO", 15, y);
      const filasHijos = form.hijos.map(h => [h.nombres, h.edad, h.dni]);
      autoTable(doc, {
        startY: y + 2,
        head: [['Apellidos y Nombres', 'Edad', 'DNI N°']],
        body: filasHijos,
        theme: 'grid',
        headStyles: { fillColor: [2, 48, 111] }
      });

      // TABLA DE CARGOS LLAMADA DE FORMA DIRECTA
      y = doc.lastAutoTable.finalY + 8;
      doc.setFont("helvetica", "bold"); doc.text("VI. CARGOS", 15, y);
      const filasCargos = form.cargos.map(c => [c.cargo, c.ano]);
      autoTable(doc, {
        startY: y + 2,
        head: [['Cargo Ejercido', 'Año']],
        body: filasCargos,
        theme: 'grid',
        headStyles: { fillColor: [2, 48, 111] }
      });

      y = doc.lastAutoTable.finalY + 25;
      if (y > 270) { doc.addPage(); y = 30; }
      doc.line(60, y, 150, y);
      doc.setFont("helvetica", "bold");
      doc.text("Firma del Comunero(a)", 105, y + 5, { align: "center" });

      doc.save(`Ficha_Comunero_${form.dni || 'Reempadronamiento'}.pdf`);
      Swal.fire('¡Ficha Exportada!', 'Tu PDF se ha generado correctamente.', 'success');
      
      navigate('/dashboard/misdatos');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudo generar el archivo PDF.', 'error');
    }
  };

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard/misdatos')} sx={{ mb: 2 }}>
        Volver a Mis Datos
      </Button>
      
      <Paper component="form" onSubmit={manejarGeneracionPDF} sx={{ p: 4, borderRadius: 2 }} elevation={3}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#02306f' }}>
          COMPLETAR FICHA DE REEMPADRONAMIENTO GENERAL2026
        </Typography>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#02306f' }}>
          ANEXO 001
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* I. DATOS DEL COMUNERO */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#008ef7' }}>I. DATOS DEL COMUNERO</Typography>
        
        {/* Fila 1 */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.1. Apellidos" name="apellidos" value={form.apellidos} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.2. Nombres" name="nombres" value={form.nombres} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.3. DNI N°" name="dni" value={form.dni} onChange={handleChange} size="small" /></Grid>
        </Grid>

        {/* Fila 2 */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.4. CASERÍO" name="caserio" value={form.caserio} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.5. MAJADA" name="majada" value={form.majada} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.6. CARNÉ" name="carne" value={form.carne} onChange={handleChange} size="small" /></Grid>
        </Grid>

        {/* Fila 3 */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.7. CONDICIÓN" name="condicion" value={form.condicion} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.8. Edad" name="edad" value={form.edad} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}>
            <TextField select fullWidth label="1.9. Género" name="genero" value={form.genero} onChange={handleChange} size="small" SelectProps={{ native: true }}>
              <option value="MASCULINO">MASCULINO</option>
              <option value="FEMENINO">FEMENINO</option>
            </TextField>
          </Grid>
        </Grid>

        {/* Fila 4 */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.10. Número de Celular" name="celular" value={form.celular} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.11. Fecha de Nacimiento" name="fechaNacimiento" type="date" InputLabelProps={{ shrink: true }} value={form.fechaNacimiento} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.12. Domicilio Actual" name="domicilio" value={form.domicilio} onChange={handleChange} size="small" /></Grid>
        </Grid>

        {/* Fila 5 */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.13. Lugar de Nacimiento" name="lugarNacimiento" value={form.lugarNacimiento} onChange={handleChange} size="small" /></Grid>
          {/* CORRECCIÓN INTERFAZ: Cambiado a select nativo para asegurar la persistencia en el PDF */}
          <Grid item xs={12} sm={4}>
            <TextField select fullWidth label="1.14. Estado Civil" name="estadoCivil" value={form.estadoCivil} onChange={handleChange} size="small" SelectProps={{ native: true }}>
              <option value="SOLTERO">SOLTERO</option>
              <option value="CASADO">CASADO</option>
              <option value="VIUDO">VIUDO</option>
              <option value="DIVORCIADO">DIVORCIADO</option>
              <option value="CONVIVIENTE">CONVIVIENTE</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.15. Grado de Instrucción" name="gradoInstruccion" value={form.gradoInstruccion} onChange={handleChange} size="small" /></Grid>
        </Grid>

        {/* Fila 6 */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.16. Año de Empadronamiento (Ingreso)" name="anoIngreso" value={form.anoIngreso} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="1.17. F. Reempadronamiento" name="fechaReempadronamiento" type="date" InputLabelProps={{ shrink: true }} value={form.fechaReempadronamiento} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}></Grid>
        </Grid>

        {/* II. DATOS PERSONALES DEL CÓNYUGE */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#008ef7' }}>II. DATOS PERSONALES DEL CÓNYUGE:</Typography>
        
        {/* Fila 1 */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="2.1. Apellidos" name="conyugeApellidos" value={form.conyugeApellidos} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="2.2. Nombres" name="conyugeNombres" value={form.conyugeNombres} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="2.3. DNI N°" name="conyugeDni" value={form.conyugeDni} onChange={handleChange} size="small" /></Grid>
        </Grid>

        {/* Fila 2 */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="2.4. Edad" name="conyugeEdad" value={form.conyugeEdad} onChange={handleChange} size="small" /></Grid>
          {/* CORRECCIÓN INTERFAZ CÓNYUGE: Cambiado a select nativo para mantener coherencia */}
          <Grid item xs={12} sm={4}>
            <TextField select fullWidth label="2.5. Estado Civil" name="conyugeEstadoCivil" value={form.conyugeEstadoCivil} onChange={handleChange} size="small" SelectProps={{ native: true }}>
              <option value="SOLTERO">SOLTERO</option>
              <option value="CASADO">CASADO</option>
              <option value="VIUDO">VIUDO</option>
              <option value="DIVORCIADO">DIVORCIADO</option>
              <option value="CONVIVIENTE">CONVIVIENTE</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="2.6. Fecha de Nacimiento" name="conyugeFechaNacimiento" type="date" InputLabelProps={{ shrink: true }} value={form.conyugeFechaNacimiento} onChange={handleChange} size="small" /></Grid>
        </Grid>

        {/* Fila 3 */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="2.7. Número de Celular" name="conyugeCelular" value={form.conyugeCelular} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="2.8. Lugar de Nacimiento" name="conyugeLugarNacimiento" value={form.conyugeLugarNacimiento} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="2.9. Grado de Instrucción" name="conyugeGradoInstruccion" value={form.conyugeGradoInstruccion} onChange={handleChange} size="small" /></Grid>
        </Grid>

        {/* III. PADRES */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#008ef7' }}>III. NOMBRES DE LOS PADRES DEL COMUNERO:(A)</Typography>

        {/* FILA 1: PADRE */}
        <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
          <Grid item xs={12} sm={5}><TextField fullWidth label="3.1. Apellidos del Padre" name="padreApellidos" value={form.padreApellidos} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={5}><TextField fullWidth label="Nombres del Padre" name="padreNombres" value={form.padreNombres} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={2}>
            <FormControl component="fieldset"><FormLabel component="legend">¿Vive?</FormLabel>
              <RadioGroup row name="padreVive" value={form.padreVive} onChange={handleChange}>
                <FormControlLabel value="SI" control={<Radio size="small"/>} label="SI" /><FormControlLabel value="NO" control={<Radio size="small"/>} label="NO" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        {/* FILA 2: MADRE */}
        <Grid container spacing={2} sx={{ mb: 4 }} alignItems="center">
          <Grid item xs={12} sm={5}><TextField fullWidth label="3.2. Apellidos de la Madre" name="madreApellidos" value={form.madreApellidos} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={5}><TextField fullWidth label="Nombres de la Madre" name="madreNombres" value={form.madreNombres} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={2}>
            <FormControl component="fieldset"><FormLabel component="legend">¿Vive?</FormLabel>
              <RadioGroup row name="madreVive" value={form.madreVive} onChange={handleChange}>
                <FormControlLabel value="SI" control={<Radio size="small"/>} label="SI" /><FormControlLabel value="NO" control={<Radio size="small"/>} label="NO" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        {/* IV. ABUELOS */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#008ef7' }}>IV. APELLIDOS Y NOMBRES DE LOS ABUELOS:</Typography>
        <Grid container spacing={2} sx={{ mb: 4 }} alignItems="center">
          {/* Abuelo Paterno */}
          <Grid item xs={12} sm={9}><TextField fullWidth label="4.1. Abuelo Paterno" name="abueloPaterno" value={form.abueloPaterno} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={3}>
            <FormControl component="fieldset"><FormLabel component="legend">¿Vive?</FormLabel>
              <RadioGroup row name="abueloPaternoVive" value={form.abueloPaternoVive} onChange={handleChange}>
                <FormControlLabel value="SI" control={<Radio size="small"/>} label="SI" /><FormControlLabel value="NO" control={<Radio size="small"/>} label="NO" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Abuela Paterna */}
          <Grid item xs={12} sm={9}><TextField fullWidth label="4.2. Abuela Paterno" name="abuelaPaterna" value={form.abuelaPaterna} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={3}>
            <FormControl component="fieldset"><FormLabel component="legend">¿Vive?</FormLabel>
              <RadioGroup row name="abuelaPaternaVive" value={form.abuelaPaternaVive} onChange={handleChange}>
                <FormControlLabel value="SI" control={<Radio size="small"/>} label="SI" /><FormControlLabel value="NO" control={<Radio size="small"/>} label="NO" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Abuelo Materno */}
          <Grid item xs={12} sm={9}><TextField fullWidth label="4.3. Abuelo Materno" name="abueloMaterno" value={form.abueloMaterno} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={3}>
            <FormControl component="fieldset"><FormLabel component="legend">¿Vive?</FormLabel>
              <RadioGroup row name="abueloMaternoVive" value={form.abueloMaternoVive} onChange={handleChange}>
                <FormControlLabel value="SI" control={<Radio size="small"/>} label="SI" /><FormControlLabel value="NO" control={<Radio size="small"/>} label="NO" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Abuela Materna */}
          <Grid item xs={12} sm={9}><TextField fullWidth label="4.4. Abuela Materna" name="abuelaMaterna" value={form.abuelaMaterna} onChange={handleChange} size="small" /></Grid>
          <Grid item xs={12} sm={3}>
            <FormControl component="fieldset"><FormLabel component="legend">¿Vive?</FormLabel>
              <RadioGroup row name="abuelaMaternaVive" value={form.abuelaMaternaVive} onChange={handleChange}>
                <FormControlLabel value="SI" control={<Radio size="small"/>} label="SI" /><FormControlLabel value="NO" control={<Radio size="small"/>} label="NO" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        {/* V. HIJOS */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#008ef7' }}>V. HIJOS DEL COMUNERO:</Typography>
          <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={agregarHijo} sx={{ bgcolor: '#008ef7' }}>Agregar Hijo</Button>
        </Box>
        {form.hijos.map((hijo, index) => (
          <Grid container spacing={2} sx={{ mb: 2 }} key={`hijo-${index}`} alignItems="center">
            <Grid item xs={12} sm={6}><TextField fullWidth label="Apellidos y Nombres" value={hijo.nombres} onChange={(e) => handleHijoChange(index, 'nombres', e.target.value)} size="small" /></Grid>
            <Grid item xs={12} sm={2}><TextField fullWidth label="Edad" value={hijo.edad} onChange={(e) => handleHijoChange(index, 'edad', e.target.value)} size="small" /></Grid>
            <Grid item xs={12} sm={3}><TextField fullWidth label="DNI N°" value={hijo.dni} onChange={(e) => handleHijoChange(index, 'dni', e.target.value)} size="small" /></Grid>
            <Grid item xs={12} sm={1}>
              <IconButton color="error" onClick={() => eliminarHijo(index)} disabled={form.hijos.length === 1}><DeleteIcon /></IconButton>
            </Grid>
          </Grid>
        ))}

        <Divider sx={{ my: 3 }} />

        {/* VI. CARGOS */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#008ef7' }}>VI. CARGOS REALIZADOS:</Typography>
          <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={agregarCargo} sx={{ bgcolor: '#008ef7' }}>Agregar Cargo</Button>
        </Box>
        {form.cargos.map((cargo, index) => (
          <Grid container spacing={2} sx={{ mb: 2 }} key={`cargo-${index}`} alignItems="center">
            <Grid item xs={12} sm={8}><TextField fullWidth label="CARGO" value={cargo.cargo} onChange={(e) => handleCargoChange(index, 'cargo', e.target.value)} size="small" /></Grid>
            <Grid item xs={12} sm={3}><TextField fullWidth label="AÑO" value={cargo.ano} onChange={(e) => handleCargoChange(index, 'ano', e.target.value)} size="small" /></Grid>
            <Grid item xs={12} sm={1}>
              <IconButton color="error" onClick={() => eliminarCargo(index)} disabled={form.cargos.length === 1}><DeleteIcon /></IconButton>
            </Grid>
          </Grid>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/dashboard/misdatos')}>Cancelar</Button>
          <Button type="submit" variant="contained" startIcon={<PdfIcon />} sx={{ bgcolor: '#02306f', '&:hover': { bgcolor: '#008ef7' } }}>Generar e Imprimir PDF</Button>
        </Box>
      </Paper>
    </Box>
  );
}