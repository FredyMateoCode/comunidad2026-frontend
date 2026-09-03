import React from 'react';
import { Box, Typography, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Avatar } from '@mui/material';

const imagenesFotos = import.meta.glob('../../assets/imagenes/fotos/*.{jpg,png,jpeg}', { eager: true, import: 'default' });

export default function FichaImprimibleA4({ ficha }) {
  if (!ficha) return null;

  // Extraer datos personales y listas
  const d = ficha.datos_personales || ficha.comunero || ficha;
  const conyuge = ficha.datos_conyuge || ficha.conyuge;
  const hijos = ficha.lista_hijos || ficha.hijos || [];
  const antepasados = ficha.lista_antepasados || ficha.antepasados || [];
  const cargos = ficha.lista_cargos || ficha.cargos || [];
  
  // Mapeo flexible para Asambleas, Faenas y Antecedentes
  const asambleas = ficha.lista_asambleas || ficha.asambleas || ficha.historial_asambleas || [];
  const faenas = ficha.lista_faenas || ficha.faenas || ficha.historial_faenas || [];
  const antecedentes = ficha.lista_antecedentes || ficha.antecedentes || [];

  const dniComunero = d.dni_com || d.dni;

  const fotoVite = imagenesFotos[`../../assets/imagenes/fotos/${dniComunero}.jpg`]
                || imagenesFotos[`../../assets/imagenes/fotos/${dniComunero}.png`]
                || imagenesFotos[`../../assets/imagenes/fotos/${dniComunero}.jpeg`]
                || null;

  const srcFoto = d.foto || d.foto_url || d.url_foto || d.foto_ruta || d.imagen || fotoVite;

  const calcularEdadImp = (fecha) => {
    if (!fecha) return 'N/A';
    const nac = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return isNaN(edad) ? 'N/A' : `${edad} años`;
  };

  // Mapeo unificado de variables del cónyuge
  const dniCon = conyuge?.dni_con || conyuge?.dni || conyuge?.dni_conyuge || 'N/A';
  const nombresConStr = conyuge?.nombres_con || conyuge?.nombres || conyuge?.nombre || '';
  const paternoConStr = conyuge?.ap_paterno_con || conyuge?.ap_paterno || conyuge?.apellidos || '';
  const maternoConStr = conyuge?.ap_materno_con || conyuge?.ap_materno || '';
  const nombreCon = `${nombresConStr} ${paternoConStr} ${maternoConStr}`.trim() || 'N/A';
  const celularCon = conyuge?.celular_con || conyuge?.celular || conyuge?.telefono || 'N/A';
  const fechaNacCon = conyuge?.fecha_nac_con || conyuge?.fecha_nac || conyuge?.f_nacimiento || 'N/A';
  const lugarNacCon = conyuge?.lugar_nac_con || conyuge?.lugar_nac || conyuge?.lugar_nacimiento || 'N/A';
  const estCivilCon = conyuge?.est_civil_con || conyuge?.est_civil || conyuge?.estado_civil || 'N/A';
  const gradoCon = conyuge?.grado_con || conyuge?.grado || conyuge?.grado_instruccion || 'N/A';

  return (
    <div id="seccion-a4-impresion">
      <Box 
        sx={{ 
          bgcolor: '#fff', 
          color: '#000', 
          p: 3, 
          fontSize: '1.15rem', 
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
          '& .MuiTableCell-root': {
            fontSize: '1.05rem', 
            py: 0.6
          },
          '& .MuiTypography-caption': {
            fontSize: '1rem' 
          }
        }}
      >
        
        {/* CABECERA */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#02306f', fontSize: '1.25rem' }}>
              PADRÓN GENERAL DE COMUNEROS 2026
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              FICHA TÉCNICA DEL COMUNERO
            </Typography>
            <Typography variant="caption" sx={{ color: '#555', fontSize: '0.85rem' }}>
              Estado: <strong>{Number(d.estado_com || d.estado) === 1 ? 'ACTIVO' : 'INACTIVO'}</strong>
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', width: '95px', height: '110px', position: 'relative' }}>
            {srcFoto && (
              <img 
                src={srcFoto}
                alt="Foto Comunero"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                style={{ 
                  width: '95px', 
                  height: '110px', 
                  objectFit: 'cover', 
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  display: 'block'
                }}
              />
            )}
            <Avatar 
              variant="rounded" 
              sx={{ 
                width: 95, 
                height: 110, 
                bgcolor: '#02306f', 
                fontSize: '2.2rem',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1
              }}
            >
              {(d.nombre || d.nombres_com || 'C').charAt(0)}
            </Avatar>
          </Box>
        </Box>

        <Divider sx={{ mb: 1.5, borderColor: '#000' }} />

        {/* 1. DATOS PERSONALES */}
        <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase', bgcolor: '#eee', p: 0.5, display: 'block', mb: 1, fontSize: '0.85rem' }}>
          1. DATOS PERSONALES
        </Typography>

        <Table size="small" sx={{ mb: 1.5, border: '1px solid #ccc' }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9', width: '20%' }}>Nombres y Apellidos:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem', width: '45%' }}>{`${d.nombre || d.nombres_com || ''} ${d.ap_paterno || d.ap_paterno_com || ''} ${d.ap_materno || d.ap_materno_com || ''}`.trim() || 'N/A'}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9', width: '15%' }}>DNI:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem', width: '20%' }}>{d.dni || d.dni_com || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>N° Carné:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.num_carne || d.num_carne_com || d.carne || 'N/A'}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Fecha Nac.:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.fecha_nac || d.fecha_nac_com || d.f_nacimiento || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Edad:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{calcularEdadImp(d.fecha_nac || d.fecha_nac_com || d.f_nacimiento)}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Género:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.genero || d.sexo || d.genero_com || 'No especificado'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Estado Civil:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.est_civil || d.est_civil_com || d.estado_civil || 'No especificado'}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Celular:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.celular || d.celular_com || d.telefono || 'No registrado'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Grado Instrucción:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.g_instruccion_com || 'N/A'}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Lugar Nac.:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.lugar_nacimiento_com || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Domicilio Actual:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.domicilio || d.domicilio_com || d.direccion || 'No especificado'}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Caserío:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.nom_caserio || d.caserio || d.nombre_caserio || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Año Ingreso:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.anio_ingreso || d.ingreso || d.anio_ingreso_com || d.fecha_ingreso || 'No especificado'}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Usufructo:</TableCell>
              <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{d.nom_usufructo || d.usufructo || d.nombre_usufructo || 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* 2. CARGA FAMILIAR DETALLADA */}
        <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase', bgcolor: '#eee', p: 0.5, display: 'block', mb: 1, fontSize: '0.85rem' }}>
          2. CARGA FAMILIAR
        </Typography>

        {/* Subsección Cónyuge / Pareja */}
        {conyuge ? (
          <Table size="small" sx={{ mb: 1.5, border: '1px solid #ccc' }}>
            <TableBody>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell colSpan={4} sx={{ fontWeight: 'bold', py: 0.3, fontSize: '0.85rem', color: '#02306f' }}>
                  CÓNYUGE / PAREJA
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9', width: '20%' }}>Nombres y Apellidos:</TableCell>
                <TableCell sx={{ py: 0.4, fontSize: '0.85rem', width: '45%' }}>{nombreCon}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9', width: '15%' }}>DNI:</TableCell>
                <TableCell sx={{ py: 0.4, fontSize: '0.85rem', width: '20%' }}>{dniCon}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Fecha Nac.:</TableCell>
                <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{fechaNacCon} {fechaNacCon !== 'N/A' && `(${calcularEdadImp(fechaNacCon)})`}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Celular:</TableCell>
                <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{celularCon}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Estado Civil:</TableCell>
                <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{estCivilCon}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Grado Instrucción:</TableCell>
                <TableCell sx={{ py: 0.4, fontSize: '0.85rem' }}>{gradoCon}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem', bgcolor: '#f9f9f9' }}>Lugar Nac.:</TableCell>
                <TableCell colSpan={3} sx={{ py: 0.4, fontSize: '0.85rem' }}>{lugarNacCon}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Table size="small" sx={{ mb: 1.5, border: '1px solid #ccc' }}>
            <TableBody>
              <TableRow>
                <TableCell align="center" sx={{ py: 0.4, fontStyle: 'italic', fontSize: '0.85rem' }}>
                  No registra cónyuge o pareja
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}

        {/* Subsección Hijos */}
        <Table size="small" sx={{ mb: 1.5, border: '1px solid #ccc' }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem' }}>Hijos Registrados</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem' }}>DNI</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem' }}>Fecha Nac. / Edad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hijos.length > 0 ? (
              hijos.map((hijo, idx) => {
                const fechaHijo = hijo.fecha_nac || hijo.fecha_nac_hijo || 'N/A';
                return (
                  <TableRow key={idx}>
                    <TableCell sx={{ py: 0.3, fontSize: '0.85rem' }}>{`${hijo.nombre || hijo.nombres || ''} ${hijo.apellidos || hijo.ap_paterno || ''}`.trim() || 'N/A'}</TableCell>
                    <TableCell sx={{ py: 0.3, fontSize: '0.85rem' }}>{hijo.dni || hijo.dni_hijo || 'N/A'}</TableCell>
                    <TableCell sx={{ py: 0.3, fontSize: '0.85rem' }}>{fechaHijo} {fechaHijo !== 'N/A' && `(${calcularEdadImp(fechaHijo)})`}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 0.4, fontStyle: 'italic', fontSize: '0.85rem' }}>
                  Sin hijos registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 3. ANTEPASADOS Y LINEA FAMILIAR */}
        <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase', bgcolor: '#eee', p: 0.5, display: 'block', mb: 1, fontSize: '0.85rem' }}>
          3. ANTEPASADOS Y LÍNEA FAMILIAR
        </Typography>
        <Table size="small" sx={{ mb: 1.5, border: '1px solid #ccc' }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem' }}>Parentesco</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem' }}>Nombres y Apellidos</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem' }}>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {antepasados.length > 0 ? antepasados.map((item, idx) => {
              const parentesco = item.tipo_ant || item.tipo || item.parentesco || 'N/A';
              const nombres = item.nombres_ant || item.nombres || item.nombre || '';
              const apellidos = item.apellidos_ant || item.apellidos || '';
              const nombreCompleto = `${nombres} ${apellidos}`.trim() || item.nombre_completo || 'Sin nombre';
              const estaVivo = Number(item.vive_ant !== undefined ? item.vive_ant : item.vive) === 1;

              return (
                <TableRow key={idx}>
                  <TableCell sx={{ py: 0.3, fontSize: '0.85rem' }}>{parentesco}</TableCell>
                  <TableCell sx={{ py: 0.3, fontSize: '0.85rem' }}>{nombreCompleto}</TableCell>
                  <TableCell sx={{ py: 0.3, fontSize: '0.85rem' }}>{estaVivo ? 'Vive' : 'Fallecido'}</TableCell>
                </TableRow>
              );
            }) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 0.4, fontStyle: 'italic', fontSize: '0.85rem' }}>
                  Sin antepasados registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 4. CARGOS Y RESPONSABILIDADES */}
        <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase', bgcolor: '#eee', p: 0.5, display: 'block', mb: 1, fontSize: '0.85rem' }}>
          4. CARGOS Y RESPONSABILIDADES
        </Typography>
        <Table size="small" sx={{ mb: 1.5, border: '1px solid #ccc' }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem' }}>Cargo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem' }}>Periodo / Año</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cargos.length > 0 ? cargos.map((cargo, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ py: 0.3, fontSize: '0.85rem' }}>{cargo.nombre_cargo || cargo.cargo}</TableCell>
                <TableCell sx={{ py: 0.3, fontSize: '0.85rem' }}>{cargo.periodo || cargo.anio || 'N/A'}</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={2} align="center" sx={{ py: 0.4, fontStyle: 'italic', fontSize: '0.85rem' }}>Sin cargos registrados</TableCell></TableRow>
            )}
          </TableBody>
        </Table>

        {/* 5. ASAMBLEAS Y 6. FAENAS */}
        <Grid container spacing={1} sx={{ mb: 1.5 }}>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase', bgcolor: '#eee', p: 0.5, display: 'block', mb: 1, fontSize: '0.85rem' }}>
              5. ASAMBLEAS
            </Typography>
            <Table size="small" sx={{ border: '1px solid #ccc' }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', py: 0.3, fontSize: '0.8rem' }}>Asamblea</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', py: 0.3, fontSize: '0.8rem' }}>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asambleas.length > 0 ? asambleas.map((item, idx) => {
                  const asistioVal = Number(item.asistio !== undefined ? item.asistio : item.estado);
                  const estadoTexto = asistioVal === 1 ? 'Asistió' : asistioVal === 2 ? 'Justificó' : 'Faltó';
                  return (
                    <TableRow key={idx}>
                      <TableCell sx={{ py: 0.3, fontSize: '0.8rem' }}>{item.asamblea || item.nombre_asamblea || 'Asamblea'}</TableCell>
                      <TableCell sx={{ py: 0.3, fontSize: '0.8rem' }}>{estadoTexto}</TableCell>
                    </TableRow>
                  );
                }) : (
                  <TableRow><TableCell colSpan={2} align="center" sx={{ py: 0.4, fontStyle: 'italic', fontSize: '0.8rem' }}>Sin registros</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase', bgcolor: '#eee', p: 0.5, display: 'block', mb: 1, fontSize: '0.85rem' }}>
              6. FAENAS
            </Typography>
            <Table size="small" sx={{ border: '1px solid #ccc' }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', py: 0.3, fontSize: '0.8rem' }}>Faena</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', py: 0.3, fontSize: '0.8rem' }}>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {faenas.length > 0 ? faenas.map((item, idx) => {
                  const esRealizado = Number(item.estado !== undefined ? item.estado : item.cumplio) === 1;
                  return (
                    <TableRow key={idx}>
                      <TableCell sx={{ py: 0.3, fontSize: '0.8rem' }}>{item.faena || item.nombre_faena || 'Faena'}</TableCell>
                      <TableCell sx={{ py: 0.3, fontSize: '0.8rem' }}>{esRealizado ? 'Realizado' : 'No realizado'}</TableCell>
                    </TableRow>
                  );
                }) : (
                  <TableRow><TableCell colSpan={2} align="center" sx={{ py: 0.4, fontStyle: 'italic', fontSize: '0.8rem' }}>Sin registros</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        {/* 7. ANTECEDENTES Y SANCIONES */}
        <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase', bgcolor: '#eee', p: 0.5, display: 'block', mb: 1, fontSize: '0.85rem' }}>
          7. ANTECEDENTES Y SANCIONES
        </Typography>
        <Table size="small" sx={{ border: '1px solid #ccc' }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold', py: 0.4, fontSize: '0.85rem' }}>Descripción / Sanción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {antecedentes.length > 0 ? antecedentes.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ py: 0.3, fontSize: '0.85rem' }}>{item.fecha || item.fecha_registro || 'N/A'}</TableCell>
                <TableCell sx={{ py: 0.3, fontSize: '0.85rem' }}>{item.descripcion || item.detalle || item.sancion || 'N/A'}</TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={2} align="center" sx={{ py: 0.4, fontStyle: 'italic', fontSize: '0.85rem' }}>Sin antecedentes registrados</TableCell></TableRow>
            )}
          </TableBody>
        </Table>

      </Box>
    </div>
  );
}