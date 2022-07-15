import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, CardContent, Grid, LinearProgress, MenuItem, TextField, Typography } from '@material-ui/core';
import Aside from '../design/layout/Aside';
import Footer from '../design/layout/Footer';
import AppContext from '../../../context/appContext';
import { Alert, Autocomplete } from '@material-ui/lab';
import { useLocation } from 'react-router';
import { DatePicker } from '@material-ui/pickers';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as VARIABLES from './../../../types/variables';
import Datatable from '../design/components/Datatable';
import TooltipForTable from '../../../helpers/TooltipForTable';
import convertirAFecha from '../../../helpers/ConvertirAFecha';
import GetFullName from './../../../helpers/GetFullName';
import GetUserId from './../../../helpers/GetUserId';
import OtObservacionesTarea from './OtObservacionesTarea';
import onlyNumbers from '../../../helpers/OnlyNumbers';

const CaratulaOt = () => {
    const appContext = useContext(AppContext);
    const { tareas, abonado, abonados, municipios, barrios, usuarios, traerBarriosPorMunicipio, traerMunicipios,
    traerTareas, traerAbonados, traerAbonado, traerUsuariosPorRol,
    crearOrdenDeTrabajo, modificarOrdenDeTrabajo, ordenesDeTrabajoAsignadas, traerOrdenesDeTrabajoAsignadas } = appContext;

    const location = useLocation();

    const [cargando, setCargando] = useState(false);
    const [tareasOt, setTareasOt] = useState([]);
    const [abonadoOt, setAbonadoOt] = useState(null);
    const [barrio, setBarrio] = useState(null);
    const [MunicipioId, setMunicipioId] = useState(0);
    const [OtInfo, setOtInfo] = useState({
        OtId: null,
        OtMonto: null,
        DomicilioCalle: "",
        DomicilioNumero: "",
        DomicilioPiso: null,
        OtObservacionesResponsableEmision: null,
        createdBy: null,
        updatedBy: null
    });
    const [OtResponsableEjecucion, setOtResponsableEjecucion] = useState(null);
    const [OtAuxiliarDeLinea, setOtAuxiliarDeLinea] = useState(null);

    const [EditMode, setEditMode] = useState(false);

    const [OtFechaPrevistaVisita, setOtFechaPrevistaVisita] = useState(new Date());

    useEffect(()=>{
        traerTareas();
        traerMunicipios();
        traerAbonados(2); //TRAE ABONADOS ACTIVOS
        traerUsuariosPorRol(VARIABLES.ID_ROL_TECNICO);
    },[])

    useEffect(()=>{
        if(location.state){
            setEditMode(true);
            setOtInfo(location.state);
            setMunicipioId(location.state.MunicipioId);
            setBarrio(location.state);
            setTareasOt(location.state.TareasOt);
            setOtResponsableEjecucion({
                Nombre: location.state.TecnicoResponsableOt.Nombre,
                Apellido: location.state.TecnicoResponsableOt.Apellido,
                UserId: location.state.TecnicoResponsableOt.UserId,
            });
            if(location.state.TecnicoAuxiliarOt){
                setOtAuxiliarDeLinea({
                    Nombre: location.state.TecnicoAuxiliarOt.Nombre,
                    Apellido: location.state.TecnicoAuxiliarOt.Apellido,
                    UserId: location.state.TecnicoAuxiliarOt.UserId,
                });
            }

        }
    },[])

    const {OtId, OtMonto, DomicilioCalle, DomicilioNumero, DomicilioPiso, OtObservacionesResponsableEmision} = OtInfo;

    const onInputChange = (e) => {
        setOtInfo({
            ...OtInfo,
            [e.target.name] : e.target.value
        });
    }

    const handleChangeMunicipioSeleccionado = (e) => {
        setMunicipioId(e.target.value);
        setBarrio(null);
        traerBarriosPorMunicipio(e.target.value);
    }

    const onSubmitOT = (e) => {
        e.preventDefault();
        if(!location.state) {
            setOtInfo({
                ...OtInfo,
                OtMonto: tareasOt.map(item => item.TareaPrecioOt).reduce((prev, curr) => prev + curr, 0)
            })
            crearOrdenDeTrabajo({
                OtMonto, DomicilioCalle, DomicilioNumero, DomicilioPiso,
                OtResponsableEjecucion, OtAuxiliarDeLinea,
                OtObservacionesResponsableEmision,
                OtFechaPrevistaVisita,
                createdBy: GetUserId(),
                abonado,
                tareasOt,
                barrio
            });
        }
        else {
            modificarOrdenDeTrabajo({
                OtId, OtMonto, DomicilioCalle, DomicilioNumero, DomicilioPiso,
                OtObservacionesResponsableEmision, OtResponsableEjecucion, OtAuxiliarDeLinea,
                OtFechaPrevistaVisita,
                updatedBy: GetUserId(),
                tareasOt
            });
        }
    }
    const columnasTareas = [
        {
            "name": "id",
            "selector": row => row["TareaId"],
            "omit": true
        },
        {
            "name": "Tipo de tarea",
            "selector": row => row["TareaNombre"],
        },
        {
            "name": "Precio de OT",
            "selector": row => "$ " + row["TareaPrecioOt"],
            "omit": true
        },
        {
            "name": "Observación (Seleccione uno)",
            "selector": row =>
            <OtObservacionesTarea tareasOt={tareasOt} setTareasOt={setTareasOt} tarea={row} editMode ={EditMode}/>
        },
    ]
    const columnasOt = [
        {
            "name": "id",
            "selector": row => row["OtId"],
            "omit": true
        },
        {
            "name": <TooltipForTable name="Fecha prevista de visita" />,
            "wrap": true,
            "sortable": true,
            "selector": row => convertirAFecha(row["OtFechaPrevistaVisita"]),
        }  ,  
        {
            "name": "Domicilio",
            "wrap": true,
            "sortable": true,
            "selector": row => row["AbonadoOt"].DomicilioAbonado.DomicilioCompleto
            +` B° ${row["AbonadoOt"].DomicilioAbonado.Barrio.BarrioNombre} ${row["AbonadoOt"].DomicilioAbonado.Barrio.Municipio.MunicipioNombre}`,        }    
    ]

    return ( 
        <>
        <div className="container">
        <Aside/>
        <main>
        <form onSubmit={onSubmitOT}>
        {location.state ? <Typography variant="h6">Editar Orden de Trabajo N°: {location.state.OtId}</Typography>
        :<Typography variant="h6">Crear Orden de Trabajo</Typography>}
        <br/>
        <Card>
            <CardContent>
                <Tabs>
                    <TabList>
                        <Tab><i className="bx bx-task"></i> Datos de la OT</Tab>
                        <Tab><i className='bx bx-wrench'></i> Técnicos</Tab>
                        <Tab><i className='bx bx-list-ol'></i> Tareas</Tab>
                    </TabList>
                <TabPanel>
                    <Card>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={3} lg={3} xl={3}>
                                    <TextField
                                    variant="outlined"
                                    value={GetFullName()}
                                    fullWidth
                                    label="Responsable de emisión de OT">
                                    </TextField>
                                </Grid>
                                <Grid item xs={6} md={3} lg={3} xl={3}>
                                    <TextField
                                        value={new Date().toLocaleDateString()}
                                        variant="outlined"
                                        fullWidth
                                        label="Fecha de emisión de OT"
                                    ></TextField>
                                </Grid>
                                <Grid item xs={6} md={2} lg={2} xl={2}>
                                    <TextField
                                        value={new Date().toLocaleTimeString()}
                                        variant="outlined"
                                        fullWidth
                                        label="Hora de emisión de OT"
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4} xl={4}>
                                    <DatePicker
                                    inputVariant="outlined"
                                    value={OtFechaPrevistaVisita}
                                    onChange={(fecha)=>setOtFechaPrevistaVisita(fecha)}
                                    format="dd/MM/yyyy"
                                    fullWidth
                                    label="Fecha prevista de visita"
                                    >
                                    </DatePicker>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} xl={12}>
                                    <TextField
                                    variant = "outlined"
                                    multiline
                                    minRows={3}
                                    value={OtObservacionesResponsableEmision}
                                    name="OtObservacionesResponsableEmision"
                                    inputProps={{
                                        maxLength: 1000
                                    }}
                                    onChange={onInputChange}
                                    fullWidth
                                    label="Observaciones registro de OT">
                                    </TextField>
                                </Grid>
                            <Grid item xs={12} md={6} lg={6} xl={6}>
                                {location.state ?
                                <TextField
                                variant="outlined"
                                fullWidth
                                value={location.state.AbonadoOt.NombreCompletoAbonado}
                                label="Apellido y nombre del abonado">
                                </TextField>
                                :
                                <Autocomplete
                                    value={abonadoOt}
                                    disableClearable
                                    onChange={(_event, newAbonado) => {
                                        if(newAbonado){
                                            setCargando(true);
                                            setTimeout(()=>{
                                                traerAbonado(newAbonado.UserId);
                                                setAbonadoOt(newAbonado);
                                                setCargando(false);
                                            }, 2000)
                                        }
                                    }}
                                    options={abonados}
                                    noOptionsText="No se encontraron abonados"
                                    getOptionLabel={(option) => option.NombreCompleto}
                                    renderInput={(params) => <TextField {...params} variant = "outlined" fullWidth label="Abonado"/>}
                                    />
                                }
                            </Grid>
                            {cargando ? <Grid item xs={12} md={3} lg={3} xl={3}>Buscando domicilio...<LinearProgress /></Grid> :
                            <>
                            <Grid item xs={12} md={6} lg={6} xl={6}>
                                <TextField
                                    value={abonadoOt ? `${abonadoOt.DomicilioAbonado.DomicilioCompleto} B° ${abonadoOt.DomicilioAbonado.Barrio.BarrioNombre}, ${abonadoOt.DomicilioAbonado.Barrio.Municipio.MunicipioNombre}` : location.state ? location.state.AbonadoOt.DomicilioAbonado.DomicilioCompleto + " B° " + location.state.AbonadoOt.DomicilioAbonado.Barrio.BarrioNombre +', '+ location.state.AbonadoOt.DomicilioAbonado.Barrio.Municipio.MunicipioNombre   : ""}
                                    variant="outlined"
                                    fullWidth
                                    label="Domicilio completo"
                                >
                                </TextField>
                            </Grid>
                            </>
                            }
                            </Grid>
                        </CardContent>
                    </Card>
                    </TabPanel>
                    <TabPanel>
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Seleccione un técnico</Typography>
                                            <br/>
                                            <Autocomplete
                                            value={OtResponsableEjecucion}
                                            onChange={(_event, newTecnico) => {
                                                if(newTecnico) {
                                                    traerOrdenesDeTrabajoAsignadas(newTecnico.UserId, 5);
                                                    setOtResponsableEjecucion(newTecnico);
                                                    setOtAuxiliarDeLinea(null);
                                                }
                                            }}
                                            options={usuarios}
                                            noOptionsText="No se encontraron técnicos"
                                            getOptionLabel={(option) => option.Nombre +", "+ option.Apellido}
                                            renderInput={(params) => <TextField {...params} value={OtResponsableEjecucion} variant ="outlined" fullWidth/>}
                                            />
                                        <br/>
                                        <Typography variant="h6">Seleccione un auxiliar de línea si es necesario</Typography>
                                            <br/>
                                            <Autocomplete
                                            value={OtAuxiliarDeLinea}
                                            onChange={(_event, newTecnico) => {
                                                if(newTecnico) setOtAuxiliarDeLinea(newTecnico);
                                            }}
                                            options={OtResponsableEjecucion ? usuarios.filter(u => u.UserId !== OtResponsableEjecucion.UserId) : []}
                                            noOptionsText="No se encontraron técnicos"
                                            getOptionLabel={(option) => option.Nombre +", "+ option.Apellido}
                                            renderInput={(params) => <TextField {...params} variant ="outlined" fullWidth/>}
                                            />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                            { OtResponsableEjecucion !== null ?
                                <>
                                <Card>
                                    <CardContent>
                                            <Typography variant="h6">Órdenes de trabajo pendientes y asignadas a: {OtResponsableEjecucion.Nombre}, {OtResponsableEjecucion.Apellido}</Typography>
                                            <br/>
                                            <Datatable
                                                loader
                                                datos={ordenesDeTrabajoAsignadas}
                                                columnas={columnasOt}>
                                            </Datatable>
                                    </CardContent>
                                </Card>
                                </>
                            : ""}
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                <Card>
                                    <CardContent>
                                        <Alert>Tenga en cuenta que las tareas para Cambio de Domicilio y de Servicio no aparecerán acá.</Alert>
                                        <Typography variant="h6">Seleccione una o más tareas</Typography>
                                        <br/>
                                        <Autocomplete
                                        onChange={(_event, newTarea) => {
                                            if(newTarea){
                                                setTareasOt(newTarea);
                                                setEditMode(false);
                                            }
                                        }}
                                        disableCloseOnSelect
                                        multiple={true}
                                        options={tareas.filter(t => t.TareaPrecioOt !== 0)}
                                        noOptionsText="No se encontraron tareas"
                                        getOptionLabel={(option) => option.TareaNombre +' - $'+ option.TareaPrecioOt}
                                        renderInput={(params) => <TextField {...params} value={OtResponsableEjecucion} variant ="outlined" fullWidth/>}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                            { tareasOt.length > 0 ?
                                <Card>
                                    <CardContent>
                                        <Grid item xs={12} md={12} lg={12} xl={12}>
                                            <Typography variant="h6">Tareas de la OT</Typography>
                                                <br/>
                                                <Datatable
                                                    columnas={columnasTareas}
                                                    datos={tareasOt}>
                                                </Datatable>
                                                <Typography variant="h2">Total: ${tareasOt.map(item => item.TareaPrecioOt).reduce((prev, curr) => prev + curr, 0)}</Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            : ""}
                            </Grid>
                            {tareasOt.length > 0 && tareasOt.find((tareasOt => tareasOt.TareaId === 14 || tareasOt.TareaId === 15 )) ?
                            <>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={3} lg={3} xl={3}>
                                    <TextField
                                    variant = "outlined"
                                    onChange={handleChangeMunicipioSeleccionado}
                                    value={MunicipioId}
                                    label="Municipio nuevo domicilio"
                                    fullWidth
                                    select
                                    >
                                    <MenuItem value="">-</MenuItem>
                                    {municipios.length > 0 ? municipios.map((municipio)=>(
                                        <MenuItem key={municipio.MunicipioId} value={municipio.MunicipioId}>{municipio.MunicipioNombre}</MenuItem>
                                    )): <MenuItem disabled>No se encontraron municipios</MenuItem>}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={3} lg={3} xl={3}>
                                    <Autocomplete
                                    disableClearable
                                    value={barrio}
                                    onChange={(_event, nuevoBarrio) => {
                                        if(nuevoBarrio) setBarrio(nuevoBarrio);
                                    }}
                                    options={barrios}
                                    noOptionsText="No se encontraron barrios"
                                    getOptionLabel={(option) => option.BarrioNombre}
                                    renderInput={(params) => <TextField {...params} variant = "outlined" fullWidth label="Barrio nuevo domicilio"/>}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3} lg={3} xl={3}>
                                    <TextField
                                    variant = "outlined"
                                    value={DomicilioCalle}
                                    name="DomicilioCalle"
                                    onChange={onInputChange}
                                    fullWidth
                                    label="Calle nuevo domicilio">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={2} lg={2} xl={2}>
                                    <TextField
                                    variant = "outlined"
                                    value={DomicilioNumero}
                                    name="DomicilioNumero"
                                    onChange={onInputChange}
                                    onKeyPress={(e) => {onlyNumbers(e)}}
                                    fullWidth
                                    label="Número nuevo domicilio">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={1} lg={1} xl={1}>
                                    <TextField
                                    variant = "outlined"
                                    value={DomicilioPiso}
                                    name="DomicilioPiso"
                                    onChange={onInputChange}
                                    onKeyPress={(e) => {onlyNumbers(e)}}
                                    fullWidth
                                    label="Piso nuevo domicilio">
                                    </TextField>
                                </Grid>
                            </Grid>
                            </>
                            : ""}
                        </Grid>
                    </TabPanel>
                    <br/>
                    <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                        <Button type="submit" startIcon={<i className={location.state ? "bx bx-edit":"bx bx-check"}></i>}
                        variant="contained" color="primary">
                        {location.state ? "Modificar" : "Registrar"}
                    </Button>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
        </form>
        </main>
        <Footer/>
        </div>
        </>
        );
}
 
export default CaratulaOt;