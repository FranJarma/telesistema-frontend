import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../../context/appContext';
import Aside from '../design/layout/Aside';
import Footer from '../design/layout/Footer';
import './../design/layout/styles/styles.css';
import { Button, Card, CardContent, CardHeader, FormHelperText, Grid, MenuItem, TextField, Tooltip, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Datatable from '../design/components/Datatable';
import Modal from '../design/components/Modal';
import { Link } from 'react-router-dom';
import useStyles from '../Styles';
import BotonesDatatable from '../design/components/BotonesDatatable';
import TooltipForTable from '../../../helpers/TooltipForTable';
import convertirAFecha from '../../../helpers/ConvertirAFecha';
import SpanServicio from '../../../helpers/SpanServicio';
import SpanAlquiler from '../../../helpers/SpanAlquiler';
import formatDocumento from '../../../helpers/FormatDocumento';
import GetUserId from './../../../helpers/GetUserId';
import Factura from '../design/components/Factura';
import Recibo from '../design/components/Recibo';

const ListaAbonadosInscriptos = () => {
    const appContext = useContext(AppContext);
    const { abonados, municipios, inscripcion, detallesInscripcion, traerAbonados, traerMunicipiosPorProvincia, cambiarEstadoAbonado, traerDatosInscripcion } = appContext;

    useEffect(() => {
        traerAbonados(1);
        //10 para que traiga los de jujuy
        traerMunicipiosPorProvincia(10);
    },[]);

    const [MunicipioId, setMunicipioId] = useState(0);
    const [modalDatosInscripcion, setModalDatosInscripcion] = useState(false);
    const [modalDarDeBaja, setModalDarDeBaja] = useState(false);
    const [modalConfirmarInstalacion, setModalConfirmarInstalacion] = useState(false);

    const [AbonadoInfo, setAbonadoInfo] = useState({
        UserId: null,
        EstadoId: null,
        CambioEstadoObservaciones: null,
        createdBy: null,
        updatedBy: null,
        deletedBy: null,
    });

    const { CambioEstadoObservaciones } = AbonadoInfo;

    const handleChangeModalDarDeBaja = (data) => {
        setModalDarDeBaja(!modalDarDeBaja)
        if(!modalDarDeBaja){
            setAbonadoInfo({
                ...AbonadoInfo,
                EstadoId: 3,
                UserId: data.UserId,
                deletedBy: GetUserId()
            })
        }
        else {
            setAbonadoInfo({
                UserId: null
            })
        }
    }

    const handleChangeModalConfirmarInstalacion = (data) => {
        setModalConfirmarInstalacion(!modalConfirmarInstalacion)
        if(!modalConfirmarInstalacion){
            setAbonadoInfo({
                EstadoId: 2,
                CambioEstadoFecha: new Date().toJSON(),
                UserId: data.UserId,
                updatedBy: GetUserId()
            })
        }
        else {
            setAbonadoInfo({
                UserId: null
            })
        }
    }

    const handleChangeModalDatosInscripcion = (data) => {
        setModalDatosInscripcion(!modalDatosInscripcion);
        if(!modalDatosInscripcion){
            traerDatosInscripcion(data.UserId);
        }
        // else {
        //     setAbonadoInfo({
        //         UserId: null
        //     })
        // }
    }

    const onChangeInputEstadoObservaciones = (e) => {
        setAbonadoInfo({
            ...AbonadoInfo,
            [e.target.name] : e.target.value
        });
    }
    const handleChangeMunicipioSeleccionado = (e) => {
        setMunicipioId(e.target.value);
        traerAbonados(1, e.target.value);
    }

    const styles = useStyles();

    const columnasAbonadosInscriptos = [
    {
        "name": "id",
        "selector": row =>row["UserId"],
        "omit": true,
    },
    {
        "name": "N??",
        "selector": row =>row["AbonadoNumero"],
        "width": '50px'
    },
    {
        "name": <TooltipForTable name="Nombre Completo" />,
        "selector": row => row["NombreCompleto"],
        "wrap": true,
        "sortable": true,
    },
    {
        "name": <TooltipForTable name="Domicilio" />,
        "selector": row =>
        row["DomicilioAbonado"].EsAlquiler === 1 ?
        <SpanAlquiler domicilio={row["DomicilioAbonado"].DomicilioCompleto}/>
        : row["DomicilioAbonado"].DomicilioCompleto,
        "wrap": true,
        "sortable": true
    },
    {
        "name": "DNI",
        "selector": row =>formatDocumento(row["Documento"]),
        "sortable": true,
        "hide": "sm"
    },
    {
        "name": <TooltipForTable name="Servicio" />,
        "selector": row => <SpanServicio servicioId={row["ServicioAbonado"].ServicioId} servicioNombre={row["ServicioAbonado"].ServicioNombre} onuMac={row["OnuAbonado"] ? row["OnuAbonado"].OnuMac : ""}></SpanServicio>,
        "hide": "sm",
        "width": "300px"
    },
    {
        "name": <TooltipForTable name="Posible Fecha de Bajada" />,
        "selector": row => convertirAFecha(row["FechaBajada"]),
        "sortable": true
    },
    {
        "name": <TooltipForTable name="Fecha de Contrato" />,
        "selector": row => convertirAFecha(row["FechaContrato"]),
        "sortable": true
    },
    {
        cell: (data) =>
        <BotonesDatatable botones={
            <>
            <MenuItem>
                <Link to={`/caratula-abonado/${data.AbonadoNumero}`} state={data} style={{textDecoration: 'none', color: "navy"}}>
                <Typography style={{color: 'navy'}}>
                <i className='bx bx-pencil bx-xs'></i> Editar</Typography>
                </Link>
            </MenuItem>
            <MenuItem>
                <Typography onClick={()=>handleChangeModalDatosInscripcion(data)} style={{textDecoration: 'none', color: 'navy', cursor: "pointer"}}><i className='bx bx-money bx-xs'></i> Inscripci??n</Typography>
            </MenuItem>
            <MenuItem>
                <Typography onClick={()=>handleChangeModalDarDeBaja(data)} style={{textDecoration: 'none', color: 'red', cursor: "pointer"}}><i className='bx bx-user-x bx-xs'></i> Dar de baja</Typography>
            </MenuItem>
            </>
        }/>
    }
]
const columnasInscripcion = [
    {
        "name": "N??",
        "selector": row =>row["DetallePagoId"],
        "omit": true
    },
    {
        "name": "Dinero recibido",
        "selector": row =>"$" + row["DetallePagoMonto"],
        "sortable": true,
        "wrap": true
    },
    {
        "name": "Fecha de registro ",
        "selector": row => convertirAFecha(row["createdAt"]),
        "wrap": true,
        "sortable": true,
    },
    {
        "name": "Registrado por ",
        "selector": row =>row["Registro"].NombreCompleto,
        "wrap": true,
        "sortable": true,
    },
    {
        "name": "Forma de pago",
        "selector": row => row["MedioPago"].MedioPagoNombre,
        "wrap": true,
        "sortable": true,
    },
    {
        cell: (data) =>
        <>
        {
        data.Movimiento.FacturaId !== null ? <><Factura data={data} format={true}/></>
        : <Recibo data={data} format={true}/>
        }
        </>,
    }
]
    const ExpandedComponent = ({ data }) =>
    <>
        <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-home"></i> Domicilio: {data.DomicilioCalle} {data.DomicilioNumero} | Barrio {data.BarrioNombre} | {data.MunicipioNombre}</Typography>
        <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-id-card"></i> DNI: {data.Documento}</Typography>
        <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-plug"></i> Servicio: {data.ServicioNombre}</Typography>
    </>;
    return (
        <>
        <div className="container">
        <Aside/>
        <main>
        <Typography variant="h6">Abonados Inscriptos <Tooltip arrow title="Los abonados inscriptos son aquellos que fueron dados de alta pero no se les realiz?? la instalaci??n correspondiente">
            <i style={{color: 'blue'}} className="bx bxs-help-circle bx-tada-hover bx-sm"></i></Tooltip>
        </Typography>
        <br/>
        <Card>
            <CardHeader
            action={<Link style={{textDecoration: 'none'}} to="/caratula-abonado"><Button startIcon={<i className="bx bx-plus"></i>} variant="contained" color="primary"> Inscribir abonado</Button></Link>}>
            </CardHeader>
            <CardContent>
                <br/>
                <Grid item xs={12} md={2} lg={2} xl={2}>
                    <TextField
                    onChange={handleChangeMunicipioSeleccionado}
                    value={MunicipioId}
                    label="Municipio"
                    fullWidth
                    select
                    variant="outlined"
                    >
                    <MenuItem value={0}>Todos</MenuItem>
                    {municipios.length > 0 ? municipios.map((municipio)=>(
                        <MenuItem key={municipio.MunicipioId} value={municipio.MunicipioId}>{municipio.MunicipioNombre}</MenuItem>
                    )): <MenuItem disabled>No se encontraron municipios</MenuItem>}
                    </TextField>
                </Grid>
                <Modal
                abrirModal={modalDarDeBaja}
                funcionCerrar={handleChangeModalDarDeBaja}
                titulo={<Alert severity="info">Si usted da de baja al abonado, pasar?? al listado de <b>Abonados Inactivos</b></Alert>}
                botones={
                <>
                <Button onClick={()=>
                    {cambiarEstadoAbonado(AbonadoInfo)
                    setModalDarDeBaja(false)}}
                    style={{backgroundColor: "#EF5350", color:"white"}}
                    variant="contained"
                    >
                Dar de baja</Button>
                <Button onClick={handleChangeModalDarDeBaja}>Cancelar</Button></>}
                formulario={
                <>
                <TextField
                    label="Motivo de baja"
                    multiline
                    minRows={3}
                    autoFocus
                    variant="outlined"
                    name="CambioEstadoObservaciones"
                    value={CambioEstadoObservaciones}
                    fullWidth
                    onChange={onChangeInputEstadoObservaciones}
                >
                </TextField>
                </>}
                >
                </Modal>
                <Modal
                abrirModal={modalConfirmarInstalacion}
                funcionCerrar={handleChangeModalConfirmarInstalacion}
                titulo={<Alert severity="info" icon={<i className="bx bx-user-check bx-sm"></i>}>Si confirma la instalaci??n, el abonado pasar?? al listado de <b>Abonados Activos</b></Alert>}
                botones={
                <>
                <Button onClick={()=>
                    {cambiarEstadoAbonado(AbonadoInfo)
                    setModalDarDeBaja(false)}}
                    variant="contained"
                    color="primary">
                    Aceptar</Button>
                <Button onClick={handleChangeModalConfirmarInstalacion}>Cancelar</Button></>}
                formulario={
                <>
                <TextField
                className={styles.inputModal}
                autoFocus
                variant="outlined"
                name="CambioEstadoObservaciones"
                value={CambioEstadoObservaciones}
                fullWidth
                onChange={onChangeInputEstadoObservaciones}
                >
                </TextField>
                <FormHelperText>Observaciones</FormHelperText>
                </>}
                >
                </Modal>
                <Modal
                abrirModal={modalDatosInscripcion}
                funcionCerrar={handleChangeModalDatosInscripcion}
                titulo={<Alert severity="success" icon={<i className="bx bx-money bx-sm"></i>}>Datos de la inscripci??n</Alert>}
                formulario={
                <>
                { detallesInscripcion.length > 0 ?
                <>
                <Datatable
                datos={detallesInscripcion}
                columnas={columnasInscripcion}
                listado={'DETALLES_PAGO'}></Datatable>
                <Typography variant="h2"><b>Precio total de inscripci??n:</b> ${inscripcion.PagoTotal}</Typography>
                <Typography variant="h2"><b>Saldo restante:</b> ${inscripcion.PagoSaldo}{inscripcion.PagoSaldo > 0 ? <Button style={{float: 'right'}} variant="contained" color="secondary">Pagar saldo restante</Button>:""}</Typography>
                </>
                : "" }
                </>}
                >
                </Modal>
                <Datatable
                    loader={true}
                    columnas={columnasAbonadosInscriptos}
                    datos={abonados}
                    paginacion={true}
                    buscar={true}
                    listado={"ABONADOS_INSCRIPTOS"}
                />
                </CardContent>
        </Card>
        </main>
        <Footer/>
        </div>
        </>
    );
}
 
export default ListaAbonadosInscriptos;