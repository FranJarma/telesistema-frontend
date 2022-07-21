import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../../context/appContext';
import Aside from '../design/layout/Aside';
import Footer from '../design/layout/Footer';
import './../design/layout/styles/styles.css';
import { Button, Card, CardContent, Grid, MenuItem, TextField, Tooltip, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Datatable from '../design/components/Datatable';
import Modal from '../design/components/Modal';
import BotonesDatatable from '../design/components/BotonesDatatable';
import { Link } from 'react-router-dom';
import convertirAFecha from '../../../helpers/ConvertirAFecha';
import convertirAHora from '../../../helpers/ConvertirAHora';
import TooltipForTable from '../../../helpers/TooltipForTable';
import SpanAlquiler from '../../../helpers/SpanAlquiler';
import formatDocumento from '../../../helpers/FormatDocumento';
import GetUserId from '../../../helpers/GetUserId';
import SpanServicio from '../../../helpers/SpanServicio';
import { Autocomplete } from '@mui/material';

const ListaAbonadosInactivos = () => {
    const appContext = useContext(AppContext);
    const { onus, abonados, municipios, traerAbonados, traerMunicipiosPorProvincia, traerOnus, cambiarEstadoAbonado } = appContext;
    
    useEffect(() => {
        traerAbonados(3);
        traerOnus(7);
        //10 para que traiga los de jujuy
        traerMunicipiosPorProvincia(10);
    },[]);

    const [municipioSeleccionadoId, setMunicipioSeleccionadoId] = useState(0);
    const [modalDarDeAlta, setModalDarDeAlta] = useState(false);
    const [Onu, setOnu] = useState(null);

    const [AbonadoInfo, setAbonadoInfo] = useState({
        UserId: null,
        EstadoId: null,
        OnuId: null,
        CambioEstadoObservaciones: null,
        createdBy: null,
        updatedBy: null,
        deletedBy: null,
    });

    const { CambioEstadoObservaciones } = AbonadoInfo;

    const handleChangeModalDarDeAlta = (data) => {
        setModalDarDeAlta(!modalDarDeAlta)
        if(!modalDarDeAlta){
            setAbonadoInfo({
                ...AbonadoInfo,
                UserId: data.UserId,
                EstadoId: 2,
                CambioEstadoFecha: new Date().toJSON(),
                updatedBy: GetUserId()
            })
        }
        else {
            setAbonadoInfo({
                UserId: null
            })
        }
    }

    const onChangeInputEstadoObservaciones = (e) => {
        setAbonadoInfo({
            ...AbonadoInfo,
            [e.target.name] : e.target.value
        });
    }
    const handleChangeMunicipioSeleccionado = (e) => {
        setMunicipioSeleccionadoId(e.target.value);
        traerAbonados(3, e.target.value);
    }

    const columnaAbonadosInactivos = [
        {
            "name": "id",
            "omit": true,
            "selector": row =>row["UserId"]
        },
        {
            "name": "N°",
            "selector": row =>row["AbonadoNumero"],
            "width": '50px'
        },
        {
            "name": "Nombre Completo",
            "selector": row => row["NombreCompleto"],
            "wrap": true,
            "sortable": true
        },
        {
            "name": "DNI",
            "selector": row => formatDocumento(row["Documento"]),
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
            "name": <TooltipForTable name="Domicilio" />,
            "selector": row =>
            row["DomicilioAbonado"].EsAlquiler === 1 ?
            <SpanAlquiler domicilio={row["DomicilioAbonado"].DomicilioCompleto}/>
            : row["DomicilioAbonado"].DomicilioCompleto,
            "wrap": true,
            "sortable": true
        },
        {
            "name": "Usuario de baja",
            "selector": row => row["Deleted"].NombreCompletoBaja,
            "wrap": true,
            "sortable": true
        },
        {
            "name": "Fecha y hora de baja",
            "selector": row => row["deletedAt"] ? convertirAFecha(row["deletedAt"]) +'-'+ convertirAHora(row["deletedAt"]) : "",
            "wrap": true,
            "sortable": true
        },
        {
            cell: (data) =>
            <BotonesDatatable botones={
                <>
                <MenuItem>
                    <Link to={`/historial-de-pagos/view/${data.AbonadoNumero}`} state={data} style={{textDecoration: 'none', color: "navy"}}>
                    <Typography style={{color: 'navy'}}>
                    <i className='bx bx-money bx-xs'></i> Pagos</Typography>
                    </Link> 
                </MenuItem>
                <MenuItem>
                    <Typography onClick={()=>handleChangeModalDarDeAlta(data)} style={{textDecoration: 'none', color: "darkgreen", cursor: "pointer"}}><i className='bx bx-plug'></i> Reconectar</Typography>
                </MenuItem>
                </>
            }/>
        }
]
const ExpandedComponent = ({ data }) =>
<>
    <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-id-card"></i> DNI: {data.Documento}</Typography>
    <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-home"></i> Domicilio: {data.DomicilioCalle} {data.DomicilioNumero} | Barrio {data.BarrioNombre} | {data.MunicipioNombre}</Typography>
</>;
    return (
        <>
        <div className="container">
        <Aside/>
        <main>
        <Typography variant="h6">Abonados Inactivos <Tooltip arrow title="Los abonados inactivos son aquellos que fueron dados de baja por diversos motivos. Por ej: Mora, conexión Clandestina, etc">
            <i style={{color: 'blue'}} className="bx bxs-help-circle bx-tada-hover bx-sm"></i></Tooltip>
        </Typography>
        <br/>
        <Card>
            <CardContent>
                <br/>
                <Grid item xs={12} md={2} lg={2} xl={2}>
                    <TextField
                    onChange={handleChangeMunicipioSeleccionado}
                    value={municipioSeleccionadoId}
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
                abrirModal={modalDarDeAlta}
                funcionCerrar={handleChangeModalDarDeAlta}
                titulo={<Alert severity="info">Si usted reconecta el abonado, pasará al listado de <b>Abonados Inscriptos</b> y se creará una Orden de Trabajo, una vez finalizada dicha orden el abonado pasará al listado de <b>Abonados Activos</b>.</Alert>}
                botones={
                <>
                <Button onClick={()=>
                    {cambiarEstadoAbonado(AbonadoInfo)
                    setModalDarDeAlta(false)}}
                    variant="contained"
                    color="primary">
                    Aceptar</Button>
                <Button onClick={handleChangeModalDarDeAlta}>Cancelar</Button></>}
                formulario={
                <>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Autocomplete
                        value={Onu}
                        onChange={(_event, newOnu) => {
                            if(newOnu) {
                                setOnu(newOnu);
                                setAbonadoInfo({
                                    ...AbonadoInfo,
                                    OnuId: newOnu.OnuId
                                })
                            }
                        }}
                        options={onus}
                        noOptionsText={"No hay ONUS disponibles"}
                        getOptionLabel={(option) => option.OnuMac}
                        renderInput={(params) => <>
                        <TextField {...params} variant ="outlined" fullWidth label="ONU"/>
                        </>}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <TextField
                        label="Motivo de reconexión"
                        multiline
                        minRows={3}
                        variant="outlined"
                        name="CambioEstadoObservaciones"
                        value={CambioEstadoObservaciones}
                        fullWidth
                        onChange={onChangeInputEstadoObservaciones}
                        >
                        </TextField>
                    </Grid>
                </Grid>

                </>}
                >
                </Modal>
                <Datatable
                    loader={true}
                    columnas={columnaAbonadosInactivos}
                    datos={abonados}
                    paginacion={true}
                    buscar={true}
                    listado={"ABONADOS_INACTIVOS"}
                />
                </CardContent>
            </Card>
        </main>
        <Footer/>
        </div>
        </>
    );
}
 
export default ListaAbonadosInactivos;