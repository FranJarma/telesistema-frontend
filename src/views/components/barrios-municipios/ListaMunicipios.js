import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import Datatable from '../design/components/Datatable';
import Modal from '../design/components/Modal';
import AppContext from '../../../context/appContext';
import { Alert, Autocomplete } from '@material-ui/lab';
import BotonesDatatable from '../design/components/BotonesDatatable';
import GetUserId from './../../../helpers/GetUserId';
import { red } from '@material-ui/core/colors';

const ListaMunicipios = () => {
    const appContext = useContext(AppContext);
    const { municipios, provincias, traerProvincias, traerMunicipiosPorProvincia, crearMunicipio, modificarMunicipio, eliminarMunicipio } = appContext;
    
    useEffect(()=>{
        traerProvincias();
        traerMunicipiosPorProvincia(10);
    },[]);

    const [MunicipioInfo, setMunicipioInfo] = useState({
        MunicipioId: '',
        MunicipioNombre: '',
        MunicipioSigla: '',
        MunicipioCodigoPostal: '',
        Provincia: {},
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedBy: null,
        deletedAt: null
    })

    const [ProvinciaId, setProvinciaId] = useState(10);

    const [ModalMunicipio, setModalMunicipio] = useState(false);
    const [ModalEliminarMunicipio, setModalEliminarMunicipio] = useState(false);
    const [EditMode, setEditMode] = useState(false);

    const { MunicipioNombre, MunicipioSigla, MunicipioCodigoPostal, Provincia } = MunicipioInfo;

    const onInputChange= (e) =>{
        setMunicipioInfo({
            ...MunicipioInfo,
            [e.target.name] : e.target.value
        });
    }
    
    const handleChangeProvinciaSeleccionada = (e) => {
        setProvinciaId(e.target.value);
        traerMunicipiosPorProvincia(e.target.value);
    }

    const handleChangeModalMunicipio = (data = '') => {
        setModalMunicipio(!ModalMunicipio);
        setModalEliminarMunicipio(false);
        if(data !== '') {
            setEditMode(true);
            setMunicipioInfo({...data, updatedBy: GetUserId(), updatedAt: new Date() });
        }
        else {
            setEditMode(false);
            setMunicipioInfo({...MunicipioInfo, createdBy: GetUserId()});
        }
    }

    const handleChangeModalEliminarMunicipio = (data = '') => {
        setModalEliminarMunicipio(!ModalEliminarMunicipio);
        setModalMunicipio(false);
        setMunicipioInfo({...data, deletedBy: GetUserId(), deletedAt: new Date() });
    }

    const columnasMunicipios = [
        {
            "name": "id",
            "selector": row => row["MunicipioId"],
            "omit": true
        },
        {
            "name": "Nombre",
            "selector": row => row["MunicipioNombre"],
            "wrap": true,
            "sortable": true
        },
        {
            "name": "Sigla",
            "selector": row => row["MunicipioSigla"],
            "wrap": true,
            "sortable": true
        },
        {
            "name": "Código Postal",
            "selector": row => row["MunicipioCodigoPostal"],
            "wrap": true,
            "sortable": true
        },
        {
            cell: (data) => 
            <>
            <BotonesDatatable botones={
                <>
                <MenuItem>
                    <Typography onClick={()=>{handleChangeModalMunicipio(data)}} style={{color: "navy", cursor: 'pointer'}}><i className='bx bx-pencil bx-xs' ></i> Editar</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography onClick={()=>{handleChangeModalEliminarMunicipio(data)}} style={{color: "red", cursor: 'pointer'}}><i className="bx bx-trash bx-xs"></i> Eliminar</Typography>
                </MenuItem>
                </>
            }/>
            </>
        }
    ]
    return (
        <>
        <Card>
            <CardContent>
                <CardHeader
                    action={<Button variant="contained" startIcon={<i className="bx bx-plus"></i>} color="primary" onClick={()=>{handleChangeModalMunicipio()}} > Nuevo municipio</Button>}>
                </CardHeader>
                <br/>
                <Grid item xs={12} md={2} lg={2} xl={2}>
                    <TextField
                    onChange={handleChangeProvinciaSeleccionada}
                    value={ProvinciaId}
                    label="Provincia"
                    fullWidth
                    select
                    variant="outlined"
                    >
                    <MenuItem value={0}>Todas</MenuItem>
                    {provincias.length > 0 ? provincias.map((provincia)=>(
                        <MenuItem key={provincia.ProvinciaId} value={provincia.ProvinciaId}>{provincia.ProvinciaNombre}</MenuItem>
                    )): <MenuItem disabled>No se encontraron provincias</MenuItem>}
                    </TextField>
                </Grid>
                <Datatable
                    loader={true}
                    datos={municipios}
                    columnas={columnasMunicipios}
                    paginacion={true}
                    buscar={true}
                />
            </CardContent>
        </Card>
        <Modal
        abrirModal={ModalMunicipio}
        funcionCerrar={handleChangeModalMunicipio}
        titulo={<Typography variant="h2"><i className="bx bx-map-alt"></i>{EditMode ? " Editar Municipio" : " Nuevo Municipio"}</Typography>}
        formulario={
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sm={12} xl={12}>
                    <TextField
                    color="primary"
                    autoFocus
                    variant="outlined"
                    label="Nombre del Municipio"
                    fullWidth
                    onChange={onInputChange}
                    value={MunicipioNombre}
                    name="MunicipioNombre"
                    ></TextField>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                    color="primary"
                    variant="outlined"
                    label="Sigla del Municipio"
                    fullWidth
                    onChange={onInputChange}
                    value={MunicipioSigla}
                    name="MunicipioSigla"
                    ></TextField>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                    color="primary"
                    variant="outlined"
                    label="Código postal"
                    fullWidth
                    onChange={onInputChange}
                    value={MunicipioCodigoPostal}
                    name="MunicipioCodigoPostal"
                    ></TextField>
                </Grid>
                <Grid item xs={12} md={12} sm={12} xl={12}>
                    <Autocomplete
                        value={Provincia}
                        onChange={(_event, nuevaProvincia) => {
                            if(nuevaProvincia) setMunicipioInfo({...MunicipioInfo, Provincia: nuevaProvincia});
                        }}
                        options={provincias}
                        noOptionsText="No se encontraron provincias"
                        getOptionLabel={(option) => option.ProvinciaNombre}
                        renderInput={(params) => <TextField {...params} variant = "outlined" fullWidth label="Provincia"/>}
                    />
                </Grid>
            </Grid>
        }
        botones={
            <>
            <Button variant="contained" color="primary" onClick={()=>{EditMode ?
            modificarMunicipio(MunicipioInfo, handleChangeModalMunicipio, setProvinciaId)
            :
            crearMunicipio(MunicipioInfo, handleChangeModalMunicipio, setProvinciaId)}}
            >{EditMode ? "Editar" : "Confirmar"}</Button>
            <Button variant="text" color="inherit" onClick={handleChangeModalMunicipio} >Cancelar</Button>
            </>
        }
        />
        <Modal
        abrirModal={ModalEliminarMunicipio}
        funcionCerrar={handleChangeModalEliminarMunicipio}
        titulo={<Alert severity="error">¿Está seguro que quiere eliminar el municipio?</Alert>}
        botones={
            <>
            <Button variant="contained" style={{backgroundColor: red[500]}} onClick={()=>{eliminarMunicipio(MunicipioInfo, handleChangeModalEliminarMunicipio)}}>Eliminar</Button>
            <Button variant="text" color="inherit" onClick={handleChangeModalEliminarMunicipio}>Cancelar</Button>
            </>
        }
        />
        </>
    );
}
 
export default ListaMunicipios;