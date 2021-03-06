import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../../context/appContext';
import Aside from '../design/layout/Aside';
import Footer from '../design/layout/Footer';
import Modal from '../design/components/Modal';
import { Button, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, MenuItem, TextField, Typography } from '@material-ui/core'; 
import { useLocation } from 'react-router-dom';
import Datatable from '../design/components/Datatable';
import { Alert, Autocomplete } from '@material-ui/lab';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import convertirAFecha from '../../../helpers/ConvertirAFecha';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TooltipForTable from '../../../helpers/TooltipForTable';
import * as VARIABLES from './../../../types/variables';
import BotonesDatatable from '../design/components/BotonesDatatable';
import GetFullName from './../../../helpers/GetFullName';
import GetUserId from './../../../helpers/GetUserId';
import ComprobanteButton from '../design/components/ComprobanteButton';
import onlyNumbers from '../../../helpers/OnlyNumbers';
import DesdeHasta from './../../../helpers/DesdeHasta';

const CambioDomicilio = () => {
    const appContext = useContext(AppContext);
    const { barrios, historialDomicilios, mediosPago, municipios, provincias, usuarios,
    ordenesDeTrabajoAsignadas, traerBarriosPorMunicipio, traerDomiciliosAbonado, traerMunicipiosPorProvincia,
    traerOrdenesDeTrabajoAsignadas, traerProvincias, cambioDomicilioAbonado, traerTareaCambioDomicilio, traerUsuariosPorRol,
    traerMediosPago, tareaCambioDomicilio, registrado, comprobante, errores, unsetErrors } = appContext;

    const location = useLocation();
    //Observables
    useEffect(() => {
        unsetErrors();
        traerDomiciliosAbonado(location.state.UserId);
        traerTareaCambioDomicilio(location.state.ServicioId);
        traerProvincias();
        traerUsuariosPorRol(VARIABLES.ID_ROL_TECNICO);
        traerMediosPago();
        traerMunicipiosPorProvincia(ProvinciaId);
    }, [])
    //States
    const [DomicilioInfo, setDomicilioInfo] = useState({
        UserId: location.state.UserId,
        ServicioId: location.state.ServicioId,
        DomicilioCalle: null,
        DomicilioNumero: null,
        DomicilioPiso: null,
        CambioDomicilioObservaciones: null,
        createdBy: GetUserId()
    })

    const onInputChange = (e) => {
        setDomicilioInfo({
            ...DomicilioInfo,
            [e.target.name] : e.target.value
        });
    }
    const { UserId, ServicioId, DomicilioCalle, DomicilioNumero, DomicilioPiso, createdBy, CambioDomicilioObservaciones} = DomicilioInfo;
    //seteamos en 10 para que traiga jujuy directamente
    const [ProvinciaId, setProvinciaId] = useState(10);
    //para m??s adelante cuando vayan a otras provincias
    /*
    const handleChangeProvinciaSeleccionada = (e) => {
        setProvinciaId(e.target.value);
        setMunicipio(0);
        setBarrioId(0);
        traerMunicipiosPorProvincia(e.target.value);
    }*/
    const [Barrio, setBarrio] = useState(null);
    const [Municipio, setMunicipio] = useState(null);
    const [ModalNuevoDomicilio, setModalNuevoDomicilio] = useState(false);
    const [MedioPago, setMedioPago] = useState(null);
    const [PagoInfo, setPagoInfo] = useState({
        Total: null,
        Saldo: null
    });
    const [RequiereFactura, setRequiereFactura] = useState(false);
    const [EsAlquiler, setEsAlquiler] = useState(false);

    const handleChangeMunicipioSeleccionado = (e) => {
        setMunicipio(e.target.value);
        setBarrio(null);
        traerBarriosPorMunicipio(e.target.value.MunicipioId);
    }

    const handleChangeModalNuevoDomicilio = () => {
        setModalNuevoDomicilio(!ModalNuevoDomicilio);
        setDomicilioInfo({
            ...DomicilioInfo,
            UserId: location.state.UserId
        });
    }
    const handleChangeMedioPagoSeleccionado = (e) => {
        setMedioPago(e.target.value);
        setPagoInfo({
            ...PagoInfo,
            Total: !EsAlquiler ?
            tareaCambioDomicilio.TareaPrecioUnitario + (tareaCambioDomicilio.TareaPrecioUnitario * e.target.value.MedioPagoInteres / 100)
            :
            location.state.ServicioAbonado.ServicioPrecioUnitario + tareaCambioDomicilio.TareaPrecioUnitario +
            (tareaCambioDomicilio.TareaPrecioUnitario * e.target.value.MedioPagoInteres / 100)
        })
    }
    const handleChangeRequiereFactura = () => {
        setRequiereFactura(!RequiereFactura)
    }
    const handleChangeEsAlquiler = () => {
        setEsAlquiler(!EsAlquiler);
        setMedioPago(null);
        setPagoInfo(null);
    }
    const [OtFechaPrevistaVisita, setOtFechaPrevistaVisita] = useState(null);
    const [Tecnico, setTecnico] = useState(null);
    const [OtObservacionesResponsableEmision, setOtObservacionesResponsableEmision] = useState(null);

    const onInputChangeObservacionesOt = (e) => {
        setOtObservacionesResponsableEmision(e.target.value);
    }

    const onSubmitAbonado = (e) => {
        e.preventDefault();
        if(location.state) {
            cambioDomicilioAbonado({
                UserId,
                ServicioId,
                //ProvinciaId
                Barrio,
                Municipio,
                DomicilioCalle,
                DomicilioNumero,
                DomicilioPiso,
                CambioDomicilioObservaciones,
                createdBy,
                OtFechaPrevistaVisita,
                Tecnico,
                OtObservacionesResponsableEmision,
                MedioPago,
                PagoInfo,
                RequiereFactura,
                EsAlquiler
            }, setModalNuevoDomicilio)
    }
}
    const columnasDomicilios = [
        {
            "name": "id",
            "selector": row =>row.UserDomicilioId,
            "omit": true,
        },
        {
            "name": <TooltipForTable name="Domicilio" />,
            "selector": row =>
            <DesdeHasta
            desde={row["AbonadoUserDomicilio"] ? row["AbonadoUserDomicilio"].DomicilioAbonado.DomicilioCompleto: ""}
            hasta={row["NuevoDomicilioAbonado"].DomicilioCompleto}
            ></DesdeHasta>,
            "wrap": true,
            "sortable": true
        },
        {
            "name": "Fecha de solicitud",
            "selector": row =>  convertirAFecha(row.createdAt),
            "hide": "sm",
            "wrap": true
        },
        {
            "name": "Fecha de realizaci??n",
            "selector": row => row["OtUDomicilio"].OtFechaFinalizacion ? convertirAFecha(row["OtUDomicilio"].OtFechaFinalizacion)
            : "OT No Finalizada",
            "hide": "sm",
            "wrap": true
        },
        {
            "name": "Observaciones",
            "selector": row =>  row.CambioDomicilioObservaciones,
            "hide": "sm",
            "wrap": true
        },
        {
            cell: (data) => 
            !data.OtFechaFinalizacion ?
            <>
            <BotonesDatatable botones={
                <>
                <MenuItem>
                <Typography style={{color: "navy", cursor: 'pointer'}}><i className='bx bx-pencil bx-xs' ></i> Editar</Typography>
                </MenuItem>
                <MenuItem>
                <Typography style={{color: "navy", cursor: 'pointer'}}><i className='bx bx-home bx-xs' ></i> Confirmar cambio de domicilio</Typography>
                </MenuItem>
                </>
            }/>
            </>:"",
        }
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
        }  
    ]
    const ExpandedComponent = ({ data }) =>
    <>
        {/* <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-home"></i> Direcci??n: {data.DomicilioCalle} {data.DomicilioNumero}</Typography>
        <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-home"></i> Barrio: {data.BarrioNombre}</Typography>
        <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-building-house"></i> Municipio: {data.MunicipioNombre}</Typography>
        <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-calendar"></i> Fecha de Solicitud: {convertirAFecha(data.createdAt)}</Typography>
        { data.FechaInicioOt ?
        <><Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-calendar"></i> Fecha de Realizaci??n (Inicio): {convertirAFecha(data.FechaInicioOt)} - {convertirAHora(data.FechaInicioOt)}</Typography>
        <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-calendar"></i> Fecha de Realizaci??n (Fin): {convertirAFecha(data.OtFechaFinalizacion)} - {convertirAHora(data.OtFechaFinalizacion)}</Typography></>
        : ""}
        <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-clipboard"></i> Observaciones: {data.CambioDomicilioObservaciones}</Typography> */}
    </>;
    return ( 
    <>
    <div className="container">
    <Aside/>
    <main>
    <Typography variant="h6">Historial de cambios de domicilio del abonado: {location.state.Apellido}, {location.state.Nombre}</Typography>
    <br/>
    <Card>
        <CardHeader
            action={<Button onClick={setModalNuevoDomicilio} startIcon={<i className="bx bx-plus"></i>} variant="contained" color="primary">Nuevo Domicilio</Button>}>
        </CardHeader>
        <CardContent>
            <Datatable
                loader={true}
                expandedComponent={ExpandedComponent}
                datos={historialDomicilios}
                columnas={columnasDomicilios}
                paginacion={true}
                buscar={true}
                listado={'HISTORIAL_DOMICILIOS'}
            />
            <FormHelperText>Los domicilios est??n ordenados por fecha m??s reciente</FormHelperText>
            <br/>
        </CardContent>
        <Modal
        abrirModal={ModalNuevoDomicilio}
        funcionCerrar={handleChangeModalNuevoDomicilio}
        botones={
        <>
        {!registrado ? 
            <Button onClick={onSubmitAbonado}
            variant="contained" color="primary">
            Confirmar cambio de domicilio
            </Button>
        : <ComprobanteButton funcionModal={handleChangeModalNuevoDomicilio} tipo={RequiereFactura ? "Factura" : "Recibo"} data={RequiereFactura ? comprobante.factura : comprobante.recibo}/>}
        <Button onClick={handleChangeModalNuevoDomicilio}>Cancelar</Button></>}
        formulario={
            <>
            <Tabs>
            <TabList>
                <Tab><i className="bx bx-home"></i> Datos del nuevo domicilio</Tab>
                <Tab><i className="bx bx-task"></i> Datos de la OT</Tab>
                <Tab><i className="bx bx-money"></i> Datos del pago</Tab>
            </TabList>
            <br/>
            <TabPanel>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                        <TextField
                        variant="filled"
                        disabled
                        //onChange={handleChangeProvinciaSeleccionada}
                        value={ProvinciaId}
                        label="Provincia"
                        fullWidth
                        select
                        >
                        {provincias.map((provincia)=>(
                            <MenuItem key={provincia.ProvinciaId} value={provincia.ProvinciaId}>{provincia.ProvinciaNombre}</MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                        <TextField
                        error={errores.length > 0 && errores.find(e => e.param === "Municipio") ? true : false}
                        helperText={errores.length > 0 && errores.find(e => e.param === "Municipio") ? errores.find(e => e.param === "Municipio").msg : ""}
                        variant = "outlined"
                        onChange={handleChangeMunicipioSeleccionado}
                        value={Municipio}
                        label="Municipio"
                        fullWidth
                        select
                        >
                        {municipios.length > 0 ? municipios.map((municipio)=>(
                            <MenuItem key={municipio.MunicipioId} value={municipio}>{municipio.MunicipioNombre}</MenuItem>
                        )): <MenuItem disabled>No se encontraron municipios</MenuItem>}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                        <Autocomplete
                        value={Barrio}
                        onChange={(_event, nuevoBarrio) => {
                            if(nuevoBarrio) setBarrio(nuevoBarrio);
                        }}
                        options={barrios}
                        noOptionsText="No se encontraron barrios"
                        getOptionLabel={(option) => option.BarrioNombre}
                        renderInput={(params) => <TextField
                            error={errores.length > 0 && errores.find(e => e.param === "Barrio") ? true : false}
                            helperText={errores.length > 0 && errores.find(e => e.param === "Barrio") ? errores.find(e => e.param === "Barrio").msg : ""}
                            {...params} variant = "outlined" fullWidth label="Barrios"/>}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                        <TextField
                        error={errores.length > 0 && errores.find(e => e.param === "DomicilioCalle") ? true : false}
                        helperText={errores.length > 0 && errores.find(e => e.param === "DomicilioCalle") ? errores.find(e => e.param === "DomicilioCalle").msg : ""}
                        variant = "outlined"
                        value={DomicilioCalle}
                        name="DomicilioCalle"
                        onChange={onInputChange}
                        fullWidth
                        label="Calle">
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} xl={3}>
                        <TextField
                        error={errores.length > 0 && errores.find(e => e.param === "DomicilioNumero") ? true : false}
                        helperText={errores.length > 0 && errores.find(e => e.param === "DomicilioNumero") ? errores.find(e => e.param === "DomicilioNumero").msg : ""}
                        onKeyPress={(e) => {onlyNumbers(e)}}
                        variant = "outlined"
                        value={DomicilioNumero}
                        name="DomicilioNumero"
                        onChange={onInputChange}
                        fullWidth
                        label="N??mero">
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} xl={3}>
                        <TextField
                        onKeyPress={(e) => {onlyNumbers(e)}}
                        variant = "outlined"
                        value={DomicilioPiso}
                        name="DomicilioPiso"
                        onChange={onInputChange}
                        fullWidth
                        label="Piso">
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <FormControl>
                            <FormControlLabel label="Es alquiler" control={<Checkbox checked={EsAlquiler} onChange={handleChangeEsAlquiler} value={EsAlquiler}></Checkbox>}></FormControlLabel>
                        </FormControl>
                        {EsAlquiler ? <Alert severity='info'>El domicilio del abonado es alquiler, por lo cual tendr?? que abonar un dep??sito con el valor de una cuota del servicio que tiene actualmente</Alert> : ""}
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                        <DatePicker
                        error={errores.length > 0 && errores.find(e => e.param === "OtFechaPrevistaVisita") ? true : false}
                        helperText={errores.length > 0 && errores.find(e => e.param === "OtFechaPrevistaVisita") ? errores.find(e => e.param === "OtFechaPrevistaVisita").msg : ""}
                        inputVariant="outlined"
                        value={OtFechaPrevistaVisita}
                        onChange={(OtFechaPrevistaVisita)=> {
                            setOtFechaPrevistaVisita(OtFechaPrevistaVisita)
                        }}
                        format="dd/MM/yyyy"
                        placeholder='dd/mm/aaaa'
                        fullWidth
                        label="Fecha prevista de visita"
                        >
                        </DatePicker>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                    <Autocomplete
                        value={Tecnico}
                        onChange={(_event, newTecnico) => {
                            if(newTecnico) {
                                traerOrdenesDeTrabajoAsignadas(newTecnico.UserId, 5);
                                setTecnico(newTecnico);
                            }
                        }}
                        options={usuarios}
                        noOptionsText="No se encontraron t??cnicos"
                        getOptionLabel={(option) => option.Nombre +", "+ option.Apellido}
                        renderInput={(params) => <TextField
                            error={errores.length > 0 && errores.find(e => e.param === "Tecnico") ? true : false}
                            helperText={errores.length > 0 && errores.find(e => e.param === "Tecnico") ? errores.find(e => e.param === "Tecnico").msg : ""}
                            {...params} variant ="outlined" fullWidth label="T??cnico encargado de ejecuci??n"/>}
                    />
                    </Grid>
                    { Tecnico !== null?
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Typography variant="h6">??rdenes de trabajo pendientes y asignadas a: {Tecnico.Nombre}, {Tecnico.Apellido}</Typography>
                        <br/>
                        <Card>
                            <CardContent>
                            <Datatable
                                loader
                                datos={ordenesDeTrabajoAsignadas}
                                columnas={columnasOt}>
                            </Datatable>
                            </CardContent>
                        </Card>
                    </Grid>
                    : ""}
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                        <TextField
                        disabled
                        variant="filled"
                        value={GetFullName()}
                        fullWidth
                        label="Responsable de emisi??n de OT">
                        </TextField>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4} xl={4}>
                        <DatePicker
                            disabled
                            value={new Date()}
                            format="dd/MM/yyyy"
                            inputVariant="filled"
                            fullWidth
                            label="Fecha de emisi??n de OT"
                        ></DatePicker>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4} xl={4}>
                        <TimePicker
                            value={new Date()}
                            disabled
                            inputVariant="filled"
                            fullWidth
                            label="Hora de emisi??n de OT"
                        ></TimePicker>
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
                        onChange={onInputChangeObservacionesOt}
                        fullWidth
                        label="Observaciones registro de OT">
                        </TextField>
                    </Grid>
                </Grid>
                </TabPanel>
                <TabPanel>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                            <TextField
                                error={errores.length > 0 && errores.find(e => e.param === "MedioPago") ? true : false}
                                helperText={errores.length > 0 && errores.find(e => e.param === "MedioPago") ? errores.find(e => e.param === "MedioPago").msg : ""}
                                variant = "outlined"
                                value={MedioPago}
                                onChange={handleChangeMedioPagoSeleccionado}
                                label="Medio de Pago"
                                fullWidth
                                select
                                >
                                {mediosPago
                                .filter((mp)=>(mp.MedioPagoId !== VARIABLES.ID_MEDIO_PAGO_FACILIDAD))
                                .map((mp)=>(
                                    <MenuItem key={mp.MedioPagoId} value={mp}>{mp.MedioPagoNombre}</MenuItem>
                                ))
                                }
                            </TextField>
                            {!EsAlquiler && tareaCambioDomicilio && MedioPago !== null ? 
                            <>
                            <Typography><b>Precio de Cambio de domicilio:</b> ${tareaCambioDomicilio.TareaPrecioUnitario} </Typography>
                            <Typography><b>Inter??s del {MedioPago.MedioPagoInteres}%:</b> ${(tareaCambioDomicilio.TareaPrecioUnitario * MedioPago.MedioPagoInteres)/100}</Typography>
                            <Typography variant="h2"><b>Precio Final:</b> ${PagoInfo.Total}</Typography>
                            </>
                            : EsAlquiler && tareaCambioDomicilio && MedioPago !== null ?
                            <>
                            <Typography><b>Precio de Cambio de domicilio:</b> ${tareaCambioDomicilio.TareaPrecioUnitario} </Typography>
                            <Typography><b>Inter??s del {MedioPago.MedioPagoInteres}%:</b> ${(tareaCambioDomicilio.TareaPrecioUnitario * MedioPago.MedioPagoInteres)/100}</Typography>
                            <Typography><b>Dep??sito por Alquiler:</b> ${location.state.ServicioAbonado.ServicioPrecioUnitario}</Typography>
                            <Typography variant="h2"><b>Precio Final:</b> ${PagoInfo.Total}</Typography>
                            </>
                            : ""}
                        </Grid>
                        <Grid item xs={12} md={12} sm={12} lg={12}>
                            <FormControl>
                                <FormControlLabel label="Requiere factura" control={<Checkbox checked={RequiereFactura} onChange={handleChangeRequiereFactura} value={RequiereFactura}></Checkbox>}></FormControlLabel>
                            </FormControl>
                            {RequiereFactura ? <Alert severity='info'>La factura se generar?? en la secci??n "Facturas" del historial de pagos del abonado</Alert> : ""}
                        </Grid>
                    </Grid>
                </TabPanel>
                </Tabs>
            </>
        }></Modal>
        </Card>
    </main>
    <Footer/>
    </div>
    </>
    );
}
 
export default CambioDomicilio;