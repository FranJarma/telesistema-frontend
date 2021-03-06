import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, Grid, List, ListItem, MenuItem, TextField, Typography } from '@material-ui/core';
import Datatable from '../design/components/Datatable';
import Aside from '../design/layout/Aside';
import Footer from '../design/layout/Footer';
import Modal from '../design/components/Modal';
import AppContext from '../../../context/appContext';
import { Link } from 'react-router-dom';
import CaratulaImpresionOt from './CaratulaImpresionOt';
import { DatePicker, DateTimePicker } from "@material-ui/pickers";
import { Alert, Autocomplete } from '@material-ui/lab';
import BotonesDatatable from '../design/components/BotonesDatatable';
import convertirAFecha from '../../../helpers/ConvertirAFecha';
import TooltipForTable from '../../../helpers/TooltipForTable';
import convertirAHora from '../../../helpers/ConvertirAHora';
import GetUserId from './../../../helpers/GetUserId';
import Ot from '../design/components/Ot';
import onlyNumbers from './../../../helpers/OnlyNumbers';

const ListaOtPendientes = () => {
    const appContext = useContext(AppContext);
    const { ordenesDeTrabajo, onus, traerOrdenesDeTrabajo, registrarVisitaOrdenDeTrabajo,
        finalizarOrdenDeTrabajo, traerOnus} = appContext;

    useEffect(()=>{
        traerOrdenesDeTrabajo(5);
        traerOnus(7);
    },[])

    const [ModalImprimirOt, setModalImprimirOt] = useState(false);
    const [ModalRegistrarVisitaOt, setModalRegistrarVisitaOt] = useState(false);
    const [ModalFinalizarOt, setModalFinalizarOt] = useState(false);
    const [ModalEliminarOt, setModalEliminarOt] = useState(false);

    const [OtInfo, setOtInfo] = useState({
        OtSeñalDeLuz: null,
        OtSeñalDeInternet: null,
        OtVelocidad: null,
        OtObservacionesResponsableEjecucion: null
    })

    const {OtSeñalDeLuz, OtSeñalDeInternet, OtVelocidad, OtObservacionesResponsableEjecucion} = OtInfo;

    const onInputChange = e => {
        setOtInfo({
            ...OtInfo,
            [e.target.name] : e.target.value
        })
    }

    const [OtSeVerificoSeñal, setOtSeVerificoSeñal] = useState(false);
    const handleChangeSeVerificoSeñal = () => {
        setOtSeVerificoSeñal(!OtSeVerificoSeñal);
    }
    const [OtFechaInicio, setOtFechaInicio] = useState(new Date());
    const [OtFechaFinalizacion, setOtFechaFinalizacion] = useState(new Date());

    const [FechaVisita, setFechaVisita] = useState(new Date());
    const [Onu, setOnu] = useState(null);
    
    const [FiltrosFecha, setFiltrosFecha] = useState({
        Desde: new Date(),
        Hasta: new Date()
    });
    const {Desde, Hasta} = FiltrosFecha;

    const handleChangeModalImprimirOt = (data = '') => {
        if(!ModalImprimirOt) {
            setOtInfo(data);
            setModalImprimirOt(true);
        }
        else {
            setOtInfo('');
            setModalImprimirOt(false);
        }
    }
    const handleChangeModalRegistrarVisitaOt = (data = '') => {
        if(!ModalRegistrarVisitaOt) {
            setOtInfo({...data, 
            OtPrimeraVisita: data.OtPrimeraVisita,
            OtSegundaVisita: data.OtSegundaVisita,
            OtTerceraVisita: data.OtTerceraVisita,
        });
            setModalRegistrarVisitaOt(true);
        }
        else {
            setOtInfo('');
            setModalRegistrarVisitaOt(false);
        }
    }
    const handleChangeModalFinalizarOt = (data = '') => {
        if(!ModalFinalizarOt) {
            setOtInfo(data);
            setModalFinalizarOt(true);
        }
        else {
            setOtInfo('');
            setModalFinalizarOt(false);
        }
    }
    const handleChangeModalEliminarOt = (data = '') => {
        if(!ModalEliminarOt) {
            setOtInfo(data);
            setModalEliminarOt(true);
        }
        else {
            setOtInfo('');
            setModalEliminarOt(false);
        }
    }

    const columnasOt = [
        {
            "name": "N°",
            "selector": row => row["OtId"],
            "wrap": true,
            "sortable": true,
            "width": "70px"
        },
        {
            "name": "Abonado",
            "wrap": true,
            "sortable": true,
            "selector": row => row["AbonadoOt"].NombreCompletoAbonado
        },
        {
            "name": "Domicilio",
            "wrap": true,
            "sortable": true,
            "selector": row => row["AbonadoOt"].DomicilioAbonado.DomicilioCompleto
        },
        {
            "name": "Servicio",
            "width": "200px",
            "wrap": true,
            "sortable": true,
            "selector": row => row["AbonadoOt"].ServicioAbonado.ServicioNombre
        },
        {
            "name": <TooltipForTable name="Fecha de Emisión"/>,
            "wrap": true,
            "sortable": true,
            "selector": row => convertirAFecha(row["createdAt"])
        },
        {
            "name": "Monto",
            "wrap": true,
            "sortable": true,
            "selector": row => row["OtMonto"] > 0 ? "$ "+ row["OtMonto"] : "$ "+ 0
        },
        {
            "name": <TooltipForTable name="Técnico responsable"/>,
            "wrap": true,
            "sortable": true,
            "selector": row => row["TecnicoResponsableOt"].NombreCompletoTecnicoResponsable
        },
        {
            "name": <TooltipForTable name="Observaciones"/>,
            "wrap": true,
            "sortable": true,
            "selector": row => row["OtObservacionesResponsableEmision"] ? row["OtObservacionesResponsableEmision"] : "-",
        },        
        {
            cell: (data) => 
            <>
            <BotonesDatatable botones={
                <>
                <MenuItem>
                    <Link to={`/caratula-ot/${data.OtId}`} state={data} style={{textDecoration: 'none', color: "navy"}}>
                    <Typography><i className='bx bx-pencil bx-xs' ></i>  Editar</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Typography onClick={()=>{handleChangeModalRegistrarVisitaOt(data)}} style={{color: "navy", cursor: 'pointer'}}><i className='bx bx-calendar bx-xs'> </i> Registrar visita</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography onClick={()=>{handleChangeModalFinalizarOt(data)}} style={{color: "navy", cursor: 'pointer'}}><i className='bx bx-calendar-check bx-xs' ></i> Finalizar OT</Typography>
                </MenuItem>
                <MenuItem>
                <Ot data={data}/>
                </MenuItem>
                </>
            }/>
            </>,
        }
    ]
    const ExpandedComponent = ({ data }) =>
    <>
    <Card>
        <CardContent>
            <Typography variant="h2">Tareas:</Typography>
            {data.TareasOt.map((t) => <MenuItem>{t.TareaNombre}</MenuItem>)}
        </CardContent>
    </Card>
    </>;
    return (
        <>
        <div className="container">
        <Aside/>
        <main>
        <Typography variant="h6">Listado de Órdenes de Trabajo sin finalizar</Typography>
        <br/>
        <Card>
            <CardContent>
            <CardHeader action={<Link style={{textDecoration: 'none'}} to="/caratula-ot"><Button variant="contained" startIcon={<i className="bx bx-plus"></i>} color="primary"> Nueva OT</Button></Link>}></CardHeader>
            {/* <Grid container spacing={3}>
                    <Grid item xs={3} md={3} lg={3}>
                        <DatePicker
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            placeholder="dd/mm/aaaa"
                            fullWidth
                            label="Desde"
                            value={Desde}
                            onChange={(newDate) => setFiltrosFecha({
                                ...FiltrosFecha,
                                Desde: newDate
                            })}
                        ></DatePicker>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <DatePicker
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            placeholder="dd/mm/aaaa"
                            fullWidth
                            label="Hasta"
                            value={Hasta}
                            onChange={(newDate) => setFiltrosFecha({
                                ...FiltrosFecha,
                                Hasta: newDate
                            })}
                        ></DatePicker>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <Button
                        style={{marginTop: '10px'}}
                        variant="contained"
                        color="secondary">Buscar</Button>
                    </Grid>
                </Grid> */}
                <Datatable
                    expandedComponent={ExpandedComponent}
                    loader={true}
                    datos={ordenesDeTrabajo}
                    columnas={columnasOt}
                    paginacion={true}
                    buscar={true}
                    listado={'OT_PENDIENTES'}
                />
            </CardContent>
        </Card>
            <Modal
            abrirModal={ModalImprimirOt}
            funcionCerrar={handleChangeModalImprimirOt}
            formulario={<CaratulaImpresionOt datos={OtInfo}/>}
            ></Modal>
            <Modal
            abrirModal={ModalRegistrarVisitaOt}
            funcionCerrar={handleChangeModalRegistrarVisitaOt}
            titulo ={<Typography variant="h2"><i className="bx bx-calendar"></i> Registrar Visita OT</Typography>}
            botones={<><Button variant='contained' color="primary" onClick={() =>
                registrarVisitaOrdenDeTrabajo({...OtInfo, FechaVisita}, handleChangeModalRegistrarVisitaOt)}>Registrar</Button><Button variant="text" color="inherit" onClick={handleChangeModalRegistrarVisitaOt}>Cancelar</Button></>}
            formulario={
            <>
            <Grid container spacing ={3}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
                <DatePicker
                inputVariant="outlined"
                value={OtInfo.OtFechaPrevistaVisita}
                disabled
                format="dd/MM/yyyy"
                fullWidth
                label="Fecha prevista de visita pactada"
                ></DatePicker>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <DateTimePicker
                    disableToolbar
                    ampm={false}
                    inputVariant="outlined"
                    value={FechaVisita}
                    onChange={(fecha)=>setFechaVisita(fecha)}
                    format="dd/MM/yyyy - HH:mm"
                    fullWidth
                    label="Fecha de Visita"
                    ></DateTimePicker>
                </Grid>
            </Grid>
            <Typography variant="h2">Visitas realizadas por el técnico:</Typography>
            <List>
                <ListItem>{OtInfo.OtPrimeraVisita ? convertirAFecha(OtInfo.OtPrimeraVisita) +"-"+ convertirAHora(OtInfo.OtPrimeraVisita) : "-"}</ListItem>
                <ListItem>{OtInfo.OtSegundaVisita ? convertirAFecha(OtInfo.OtSegundaVisita) +"-"+ convertirAHora(OtInfo.OtSegundaVisita) : "-"}</ListItem>
                <ListItem>{OtInfo.OtTerceraVisita ? convertirAFecha(OtInfo.OtTerceraVisita) +"-"+ convertirAHora(OtInfo.OtTerceraVisita) : "-"}</ListItem>
            </List>
            {OtInfo.OtTerceraVisita ? <Alert severity="info">La OT ya tiene 3 visitas realizadas por el técnico, se tiene que cobrar un monto adicional que se actualizará al monto de la OT</Alert> : ""}
            </>}
            ></Modal>
            <Modal
            abrirModal={ModalFinalizarOt}
            funcionCerrar={handleChangeModalFinalizarOt}
            titulo ={<Typography variant="h2"><i className="bx bx-calendar-check"></i> Finalizar OT</Typography>}
            botones={<><Button variant='contained' color="primary"
            onClick={() =>finalizarOrdenDeTrabajo({...OtInfo, OtSeVerificoSeñal, OtFechaInicio, OtFechaFinalizacion, updatedBy: GetUserId(), Onu},
            handleChangeModalFinalizarOt)}>Finalizar OT</Button><Button variant="text" color="inherit" onClick={handleChangeModalFinalizarOt}>Cancelar</Button></>}
            formulario={
                <>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                    {OtInfo.OtEsPrimeraBajada ?
                    <><Alert severity='info'>Al finalizar esta órden de trabajo el abonado: <b>{OtInfo.AbonadoOt.NombreCompletoAbonado}</b> pasará a estar <b>Activo</b></Alert><br/></>
                    : ""}
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                        <DateTimePicker
                        disableToolbar
                        ampm={false}
                        inputVariant="outlined"
                        value={OtFechaInicio}
                        onChange={(fecha)=>setOtFechaInicio(fecha)}
                        format="dd/MM/yyyy - HH:mm"
                        fullWidth
                        label="Fecha y hora de inicio"
                        ></DateTimePicker>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                        <DateTimePicker
                        disableToolbar
                        ampm={false}
                        inputVariant="outlined"
                        value={OtFechaFinalizacion}
                        onChange={(fecha)=>setOtFechaFinalizacion(fecha)}
                        format="dd/MM/yyyy - HH:mm"
                        fullWidth
                        label="Fecha y hora de finalización"
                        ></DateTimePicker>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                        <TextField
                        variant = "outlined"
                        value={OtSeñalDeLuz}
                        name="OtSeñalDeLuz"
                        onChange={onInputChange}
                        onKeyPress={(e) => {onlyNumbers(e)}}
                        fullWidth
                        label="Señal de luz (dBm)">
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                        <TextField
                        variant = "outlined"
                        value={OtSeñalDeInternet}
                        name="OtSeñalDeInternet"
                        onChange={onInputChange}
                        onKeyPress={(e) => {onlyNumbers(e)}}
                        fullWidth
                        label="Señal de internet (dBm)">
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                        <TextField
                        variant = "outlined"
                        value={OtVelocidad}
                        name="OtVelocidad"
                        onChange={onInputChange}
                        onKeyPress={(e) => {onlyNumbers(e)}}
                        fullWidth
                        label="Velocidad (mb)">
                        </TextField>
                    </Grid>
                    {(OtInfo.ServicioViejoId !== 1)||(OtInfo.ServicioNuevoId && OtInfo.ServicioNuevoId !== 1) ?
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Autocomplete
                            value={Onu}
                            onChange={(_event, newOnu) => {
                                if(newOnu) setOnu(newOnu);
                            }}
                            options={onus}
                            noOptionsText={"No hay ONUS disponibles"}
                            getOptionLabel={(option) => option.OnuMac}
                            renderInput={(params) => <>
                            <TextField {...params} variant ="outlined" fullWidth label="ONU"/>
                            </>}
                            />
                        </Grid>
                    : ""}
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <TextField
                        variant = "outlined"
                        multiline
                        minRows={3}
                        value={OtObservacionesResponsableEjecucion}
                        name="OtObservacionesResponsableEjecucion"
                        inputProps={{
                            maxLength: 1000
                        }}
                        onChange={onInputChange}
                        fullWidth
                        label="Observaciones">
                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox color="primary" onChange={handleChangeSeVerificoSeñal} value={OtSeVerificoSeñal} checked={OtSeVerificoSeñal}></Checkbox>} label="¿Se verificó señal?"></FormControlLabel>
                    </FormGroup>
                </Grid>
                <Typography variant="h2">Total: ${OtInfo.Monto}</Typography>
                </>}
            >
            </Modal>
            <Modal
            abrirModal={ModalEliminarOt}
            funcionCerrar={handleChangeModalEliminarOt}
            titulo={<Alert severity="info">¿Está seguro que quiere eliminar la orden de trabajo?</Alert>}
            botones={
                <>
                <Button variant="contained" color="secondary" onClick={()=>{}}>Eliminar</Button>
                <Button variant="text" color="inherit">Cancelar</Button>
                </>
            }
            />
        </main>
        <Footer/>
        </div>
        </>
    );
}
 
export default ListaOtPendientes;