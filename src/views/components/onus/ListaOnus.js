import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField,  Typography } from '@material-ui/core';
import Datatable from '../design/components/Datatable';
import Modal from '../design/components/Modal';
import AppContext from '../../../context/appContext';
import { Alert } from '@material-ui/lab';
import BotonesDatatable from '../design/components/BotonesDatatable';
import InputMask from 'react-input-mask';
import GetUserId from './../../../helpers/GetUserId';
import onlyNumbers from '../../../helpers/OnlyNumbers';

const ListaOnus = ({location}) => {
    const appContext = useContext(AppContext);
    const { errores, onus, traerOnus, modelosONU, traerModelosONU, servicios, traerServicios, crearONU, modificarONU, eliminarONU } = appContext;
    useEffect(()=>{
        //para abrir el modal directamente cuando se quiere dar de alta una ONU desde otra vista 
        location.state ? setModalOnu(true) : setModalOnu(false);
        traerOnus();
        traerModelosONU();
        traerServicios();
    },[])
    const [ModalOnu, setModalOnu] = useState(false);
    const [ModalEliminarOnu, setModalEliminarOnu] = useState(false);
    const [EditMode, setEditMode] = useState(false);
    const [OnuInfo, setOnuInfo] = useState({
        OnuId: '',
        OnuSerie: '',
        OnuMac: '',
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedBy: null,
        deletedAt: null
    })
    const [ServicioId, setServicioId] = useState(2);
    const [ModeloOnuId, setModeloOnuId] = useState(0);
    const { OnuSerie, OnuMac } = OnuInfo;

    const onInputChange= (e) =>{
        setOnuInfo({
            ...OnuInfo,
            [e.target.name] : e.target.value
        });
    }
    const handleChangeModeloOnuIdSeleccionado = (e) => {
        setModeloOnuId(e.target.value);
    }
    const handleChangeServicioIdSeleccionado = (e) => {
        setServicioId(e.target.value);
    }
    const handleChangeModalOnu = (data = '') => {
        setModalOnu(!ModalOnu);
        setModalEliminarOnu(false);
        if(data !== '') {
            setEditMode(true);
            setOnuInfo({...data, updatedBy: GetUserId(), updatedAt: new Date() });
            setModeloOnuId(data.ModeloOnuId);
        }
        else {
            setEditMode(false);
            setOnuInfo({...data, createdBy: GetUserId()});
        }
    }

    const handleChangeModalEliminarOnu = (data = '') => {
        setModalEliminarOnu(!ModalEliminarOnu);
        setModalOnu(false);
        setOnuInfo({...data, deletedBy: GetUserId(), deletedAt: new Date() });
    }

    const columnasONUS = [
        {
            "name": "id",
            "selector": row => row["OnuId"],
            "omit": true
        },
        {
            "name": "Serie",
            "selector": row => row["OnuSerie"],
            "wrap": true,
            "sortable": true
        },
        {
            "name": "MAC",
            "selector": row => row["OnuMac"],
            "wrap": true,
            "sortable": true
        },
        {
            "name": "Modelo",
            "selector": row => row["ModeloOnu"].ModeloOnuNombre,
            "wrap": true,
            "sortable": true
        },
        {
            "name": "Abonado",
            "selector": row => row["Abonado"] ? row["Abonado"].Apellido + ', ' + row["Abonado"].Nombre : '-',
            "wrap": true,
            "sortable": true
        },
        {
            cell: (data) => 
            <>
            <BotonesDatatable botones={
                <>
                <MenuItem>
                    <Typography onClick={()=>{handleChangeModalOnu(data)}} style={{color: "navy", cursor: 'pointer'}}><i className='bx bx-pencil bx-xs' ></i> Editar</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography onClick={()=>{handleChangeModalEliminarOnu(data)}} style={{color: "red", cursor: 'pointer'}}><i className="bx bx-trash bx-xs"></i> Eliminar</Typography>
                </MenuItem>
                </>
            }/>
            </>,
        }
    ]
    return (
        <>
        <Card>
            <CardContent>
                <CardHeader
                    action={<Button variant="contained" startIcon={<i className="bx bx-plus"></i>} color="primary" onClick={()=>{handleChangeModalOnu()}} > Nueva onu</Button>}>
                </CardHeader>
                <Datatable
                    loader={true}
                    datos={onus}
                    columnas={columnasONUS}
                    paginacion={true}
                    buscar={true}
                    listado={'ONUS'}
                />
            </CardContent>
        </Card>
        <Modal
        abrirModal={ModalOnu}
        funcionCerrar={handleChangeModalOnu}
        titulo={<Typography variant="h2"><i className="bx bx-broadcast"></i>{EditMode ? " Editar ONU" : "Nueva ONU"}</Typography>}
        formulario={
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={12} xl={12}>
                    <TextField
                    error={errores.length > 0 && errores.find(e => e.param === "OnuSerie") ? true : false}
                    helperText={errores.length > 0 && errores.find(e => e.param === "OnuSerie") ? errores.find(e => e.param === "OnuSerie").msg : ""}
                    color="primary"
                    autoFocus
                    variant="outlined"
                    label="Serie"
                    fullWidth
                    onChange={onInputChange}
                    value={OnuSerie}
                    name="OnuSerie"
                    ></TextField>
                </Grid>
                <Grid item xs={12} md={12} sm={12} xl={12}>
                    <InputMask
                    mask="**:**:**:**"
                    onChange={onInputChange}
                    value={OnuMac}>
                        {()=> 
                            <TextField
                            error={errores.length > 0 && errores.find(e => e.param === "OnuMac") ? true : false}
                            helperText={errores.length > 0 && errores.find(e => e.param === "OnuMac") ? errores.find(e => e.param === "OnuMac").msg : ""}        
                            color="primary"
                            variant="outlined"
                            label="MAC"
                            fullWidth
                            name="OnuMac"
                            ></TextField>}
                    </InputMask>
                </Grid>
                <Grid item xs={12} md={12} sm={12} xl={12}>
                    <TextField
                    error={errores.length > 0 && errores.find(e => e.param === "Servicio.ServicioId") ? true : false}
                    helperText={errores.length > 0 && errores.find(e => e.param === "Servicio.ServicioId") ? errores.find(e => e.param === "Servicio.ServicioId").msg : ""}
                    color="primary"
                    onKeyPress={(e) => {onlyNumbers(e)}}
                    variant="outlined"
                    label="Servicio"
                    fullWidth
                    onChange={handleChangeServicioIdSeleccionado}
                    value={ServicioId}
                    select
                    >
                    {servicios.length > 0 ? servicios
                    .filter((servicio)=> servicio.ServicioId !== 1)
                    .map((servicio)=>(
                        <MenuItem key={servicio.ServicioId} value={servicio.ServicioId}>{servicio.ServicioNombre}</MenuItem>
                    )): <MenuItem disabled>No se encontraron modelos de ONU</MenuItem>}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={12} sm={12} xl={12}>
                    <TextField
                    error={errores.length > 0 && errores.find(e => e.param === "ModeloOnu.ModeloOnuId") ? true : false}
                    helperText={errores.length > 0 && errores.find(e => e.param === "ModeloOnu.ModeloOnuId") ? errores.find(e => e.param === "ModeloOnu.ModeloOnuId").msg : ""}
                    color="primary"
                    onKeyPress={(e) => {onlyNumbers(e)}}
                    variant="outlined"
                    label="Modelo ONU"
                    fullWidth
                    onChange={handleChangeModeloOnuIdSeleccionado}
                    value={ModeloOnuId}
                    select
                    >
                    {modelosONU.length > 0 ? modelosONU.map((modeloOnu)=>(
                        <MenuItem key={modeloOnu.ModeloOnuId} value={modeloOnu.ModeloOnuId}>{modeloOnu.ModeloOnuNombre}</MenuItem>
                    )): <MenuItem disabled>No se encontraron modelos de ONU</MenuItem>}
                    </TextField>
                </Grid>
            </Grid>
        }
        botones={
            <>
            <Button variant="contained" color="primary" onClick={()=>{EditMode ? modificarONU({...OnuInfo, ServicioId, ModeloOnuId}, handleChangeModalOnu)
            : crearONU({...OnuInfo, ServicioId, ModeloOnuId}, handleChangeModalOnu)}}>{EditMode ? "Editar" : "Confirmar"}</Button>
            <Button variant="text" color="inherit" >Cancelar</Button>
            </>
        }
        />
        <Modal
        abrirModal={ModalEliminarOnu}
        funcionCerrar={handleChangeModalEliminarOnu}
        titulo={<Alert severity="info">??Est?? seguro que quiere eliminar la ONU?</Alert>}
        botones={
            <>
            <Button variant="contained" style={{backgroundColor: "#EF5350", color:"white"}}
            onClick={()=>{eliminarONU(OnuInfo, handleChangeModalEliminarOnu)}}>Eliminar</Button>
            <Button variant="text" color="inherit" onClick={handleChangeModalEliminarOnu}>Cancelar</Button>
            </>
        }
        />
        </>
    );
}
 
export default ListaOnus;