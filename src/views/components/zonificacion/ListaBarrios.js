import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import Datatable from '../design/components/Datatable';
import Modal from '../design/components/Modal';
import AppContext from '../../../context/appContext';
import { Alert, Autocomplete } from '@material-ui/lab';
import BotonesDatatable from '../design/components/BotonesDatatable';
import GetUserId from '../../../helpers/GetUserId';

const ListaBarrios = () => {
    const appContext = useContext(AppContext);
    const { errores, barrios, municipios, traerBarriosPorMunicipio, traerMunicipiosPorProvincia, crearBarrio, modificarBarrio, eliminarBarrio } = appContext;
    useEffect(()=>{
        traerMunicipiosPorProvincia(10);
        traerBarriosPorMunicipio(0);
    },[]);

    const [MunicipioId, setMunicipioId] = useState(0);
    const [ModalBarrio, setModalBarrio] = useState(false);
    const [ModalEliminarBarrio, setModalEliminarBarrio] = useState(false);
    const [EditMode, setEditMode] = useState(false);

    const [BarrioInfo, setBarrioInfo] = useState({
        BarrioId: '',
        BarrioNombre: '',
        Municipio: {},
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedBy: null,
        deletedAt: null
    })
    const { BarrioNombre, Municipio } = BarrioInfo;

    const onInputChange= (e) =>{
        setBarrioInfo({
            ...BarrioInfo,
            [e.target.name] : e.target.value
        });
    }

    const handleChangeModalBarrio = (data = '') => {
        setModalBarrio(!ModalBarrio);
        setModalEliminarBarrio(false);
        if(data !== '') {
            setEditMode(true);
            setBarrioInfo({...data, updatedBy: GetUserId(), updatedAt: new Date() });
        }
        else {
            setEditMode(false);
            setBarrioInfo({...data, createdBy: GetUserId()});
        }
    }

    const handleChangeModalEliminarBarrio = (data = '') => {
        setModalEliminarBarrio(!ModalEliminarBarrio);
        setModalBarrio(false);
        setBarrioInfo({...data, deletedBy: GetUserId(), deletedAt: new Date() });
    }

    const handleChangeMunicipioSeleccionado = (e) => {
        setMunicipioId(e.target.value);
        traerBarriosPorMunicipio(e.target.value);
    }

    const columnasBarrios = [
        {
            "name": "id",
            "selector": row => row["BarrioId"],
            "omit": true
        },
        {
            "name": "Nombre",
            "selector": row => row["BarrioNombre"],
            "wrap": true,
            "sortable": true
        },
        {
            "name": "Municipio",
            "selector": row => row["Municipio"].MunicipioNombre,
            "wrap": true,
            "sortable": true
        },
        {
            cell: (data) => 
            <BotonesDatatable botones={
                <>
                <MenuItem>
                    <Typography onClick={()=>{handleChangeModalBarrio(data)}} style={{color: "navy", cursor: 'pointer'}}><i className='bx bx-pencil bx-xs' ></i> Editar</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography onClick={()=>{handleChangeModalEliminarBarrio(data)}} style={{color: "red", cursor: 'pointer'}}><i className="bx bx-trash bx-xs"></i> Eliminar</Typography>
                </MenuItem>
                </>
            }/>
        }
    ]
    return (
        <>
        <Card>
            <CardContent>
                <CardHeader
                    action={<Button variant="contained" startIcon={<i className="bx bx-plus"></i>} color="primary" onClick={()=>{handleChangeModalBarrio()}} > Nuevo barrio</Button>}>
                </CardHeader>
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
                <Datatable
                    loader={true}
                    datos={barrios}
                    columnas={columnasBarrios}
                    paginacion={true}
                    buscar={true}
                    listado={'BARRIOS'}
                />
            </CardContent>
        </Card>
        <Modal
        abrirModal={ModalBarrio}
        funcionCerrar={handleChangeModalBarrio}
        titulo={<Typography variant="h2"><i className="bx bx-map"></i>{EditMode ? " Editar Barrio" : " Nuevo Barrio"}</Typography>}
        formulario={
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={12} xl={12}>
                    <TextField
                    error={errores.length > 0 && errores.find(e => e.param === "BarrioNombre") ? true : false}
                    helperText={errores.length > 0 && errores.find(e => e.param === "BarrioNombre") ? errores.find(e => e.param === "BarrioNombre").msg : ""}
                    color="primary"
                    autoFocus
                    variant="outlined"
                    label="Nombre del Barrio"
                    fullWidth
                    onChange={onInputChange}
                    value={BarrioNombre}
                    name="BarrioNombre"
                    ></TextField>
                </Grid>
                <Grid item xs={12} md={12} sm={12} xl={12}>
                <Autocomplete
                    value={Municipio}
                    onChange={(_event, nuevoMunicipio) => {
                        if(nuevoMunicipio) setBarrioInfo({...BarrioInfo, Municipio: nuevoMunicipio});
                    }}
                    options={municipios}
                    noOptionsText="No se encontraron municipios"
                    getOptionLabel={(option) => option.MunicipioNombre}
                    renderInput={(params) => <TextField error={errores.length > 0 && errores.find(e => e.param === "Municipio.MunicipioId") ? true : false}
                                                        helperText={errores.length > 0 && errores.find(e => e.param === "Municipio.MunicipioId") ? errores.find(e => e.param === "Municipio.MunicipioId").msg : ""}
                                                        {...params} variant = "outlined" fullWidth label="Municipio"/>}
                    />
                </Grid>
            </Grid>
        }
        botones={
            <>
            <Button variant="contained" color="primary" onClick={()=>{EditMode ? modificarBarrio(BarrioInfo, handleChangeModalBarrio, setMunicipioId)
            : crearBarrio(BarrioInfo, handleChangeModalBarrio, setMunicipioId)}}>{EditMode ? "Editar" : "Confirmar"}</Button>
            <Button variant="text" color="inherit" onClick={handleChangeModalBarrio} >Cancelar</Button>
            </>
        }
        />
        <Modal
        abrirModal={ModalEliminarBarrio}
        funcionCerrar={handleChangeModalEliminarBarrio}
        titulo={<Alert severity="info">¿Está seguro que quiere eliminar el barrio?</Alert>}
        botones={
            <>
            <Button variant="contained" style={{backgroundColor: "#EF5350", color:"white"}}
             onClick={()=>{eliminarBarrio(BarrioInfo, handleChangeModalEliminarBarrio)}}>Eliminar</Button>
            <Button variant="text" color="inherit" onClick={handleChangeModalEliminarBarrio}>Cancelar</Button>
            </>
        }
        />
        </>
    );
}
 
export default ListaBarrios;