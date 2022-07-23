import React, { useState, useEffect, useContext, useMemo } from 'react';
import AppContext from '../../../context/appContext';
import Aside from '../design/layout/Aside';
import Footer from '../design/layout/Footer';
import { Button, Card, CardContent, FormControlLabel, FormHelperText, Grid, FormGroup, Switch, TextField, Typography, Box, Checkbox} from '@material-ui/core'; 
import { useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import GetUserId from './../../../helpers/GetUserId';
import onlyNumbers from '../../../helpers/OnlyNumbers';
import DataTable from 'react-data-table-component';
import { noSeEncontraronRegistros, paginacionOpciones } from '../design/components/DatatableHelpers';
import Spinner from '../design/components/Spinner';
import Buscador from '../design/components/Buscador';
import filtrosDatatable from './../../../views/components/design/components/FiltrosDatatable';

const CaratulaUser = () => {
    const appContext = useContext(AppContext);
    const { cargando, errores, unsetErrors, roles, rolesUser, traerRoles, traerRolesPorUsuario, crearUsuario, modificarUsuario } = appContext;
    const location = useLocation();
    const [textoFiltrado, setTextoFiltrado] = useState('');
    const [UserInfo, setUserInfo] = useState({
        UserIdLogueado: GetUserId(),
        UserId: null,
        Nombre: null,
        Apellido: null,
        Documento: null,
        Email: null,
        Telefono: null,
        NombreUsuario: null,
        Contraseña: null,
        RContraseña: null
    });
    const [EstaBloqueado, setEstaBloqueado] = useState(0);
    const [EsUsuarioDePrueba, setEsUsuarioDePrueba] = useState(0);
    const [ModalAsignarRoles, setModalAsignarRoles] = useState(false);
    const [RolesSeleccionados, setRolesSeleccionados] = useState([]);

    const handleChangeCheckUsuarioDePrueba = (e) => {
        e.target.checked ? setEsUsuarioDePrueba(1) : setEsUsuarioDePrueba(0);
    };
    
    const handleChangeCheckEstaBloqueado = (e) => {
        e.target.checked ? setEstaBloqueado(1) : setEstaBloqueado(0);
    }

    const handleChangeTabRoles = (e) => {
        setModalAsignarRoles(!ModalAsignarRoles);
    }
    
    const onInputChange = (e) => {
        setUserInfo({
            ...UserInfo,
            [e.target.name] : e.target.value
        });
    }
    const { UserId, Nombre, Apellido, Documento, Email, Telefono, NombreUsuario, Contraseña, RContraseña} = UserInfo;
    

    useEffect(()=> {
        unsetErrors();
        traerRoles();
        if(location.state){
            traerRolesPorUsuario(location.state.UserId);
            setUserInfo({
                UserId: location.state.UserId,
                Nombre: location.state.Nombre,
                Apellido: location.state.Apellido,
                Documento: location.state.Documento,
                Email: location.state.Email,
                Telefono: location.state.Telefono,
                NombreUsuario: location.state.NombreUsuario,
                Contraseña: "",
                RContraseña: ""
            });
            if(location.state.IntentosFallidos === 5) setEstaBloqueado(true);
            setEsUsuarioDePrueba(location.state.EsUsuarioDePrueba);
        }
    },[]);
   
    const onSubmitUsuario = (e) => {
        e.preventDefault();
        if(!location.state) {
            crearUsuario({
                Nombre,
                Apellido,
                Documento,
                Email,
                Telefono,
                NombreUsuario,
                Contraseña,
                RContraseña,
                EsUsuarioDePrueba,
                RolesSeleccionados
            });
        }
        else {
            modificarUsuario({
                UserId,
                Nombre,
                Apellido,
                Documento,
                Email,
                Telefono,
                NombreUsuario,
                Contraseña,
                RContraseña,
                EsUsuarioDePrueba,
                RolesSeleccionados
            });
        }
    };

    const columnasRoles= [
        {
            selector: row => row['RoleId'],
            name: 'ID',
            omit: true
        },
        {
            selector: row => row['RoleName'],
            name: 'Nombre',
            wrap: true
        },
        {
            selector: row => row['RoleDescription'],
            name: 'Descripcion',
            wrap: true
        }
    ];

    // let filtro = filtrosDatatable('ROLES', roles, textoFiltrado);
    let filtro = useMemo(()=> {
        return roles.filter(item =>
            (item.RoleName && item.RoleName.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.RoleDescription && item.RoleDescription.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    },[textoFiltrado])

    return ( 
    <>
    <div className="container">
    <Aside/>
    <main>
    <form onSubmit={onSubmitUsuario}>
    <Typography variant="h6">{location.state ? `Editar usuario: ${location.state.NombreCompleto}` : "Registrar usuario"}</Typography><br/>
    <Card>
        <CardContent>
            <Tabs>
                <TabList>
                    <Tab><i className="bx bx-user"></i> Usuario</Tab>
                    <Tab onClick={handleChangeTabRoles}><i className='bx bx-user'></i> Roles</Tab>
                </TabList>
                <TabPanel>
                <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <TextField
                            error={errores.length > 0 && errores.find(e => e.param === "Nombre") ? true : false}
                            helperText={errores.length > 0 && errores.find(e => e.param === "Nombre") ? errores.find(e => e.param === "Nombre").msg : ""}
                            autoFocus
                            variant="outlined"
                            value={Nombre}
                            name="Nombre"
                            onChange={onInputChange}
                            fullWidth
                            label="Nombre">
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <TextField
                            error={errores.length > 0 && errores.find(e => e.param === "Apellido") ? true : false}
                            helperText={errores.length > 0 && errores.find(e => e.param === "Apellido") ? errores.find(e => e.param === "Apellido").msg : ""}
                            variant="outlined"
                            value={Apellido}
                            name="Apellido"
                            onChange={onInputChange}
                            fullWidth
                            label="Apellido">
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TextField
                            error={errores.length > 0 && errores.find(e => e.param === "Documento") ? true : false}
                            helperText={errores.length > 0 && errores.find(e => e.param === "Documento") ? errores.find(e => e.param === "Documento").msg : ""}
                            variant="outlined"
                            value={Documento}
                            name="Documento"
                            onChange={onInputChange}
                            fullWidth
                            label="DNI"
                            onKeyPress={(e) => {onlyNumbers(e)}}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TextField
                            error={errores.length > 0 && errores.find(e => e.param === "Email") ? true : false}
                            helperText={errores.length > 0 && errores.find(e => e.param === "Email") ? errores.find(e => e.param === "Email").msg : ""}
                            variant="outlined"
                            value={Email}
                            name="Email"
                            onChange={onInputChange}
                            fullWidth
                            label="Email"
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TextField
                            variant="outlined"
                            value={Telefono}
                            name="Telefono"
                            onChange={onInputChange}
                            onKeyPress={(e) => {onlyNumbers(e)}}
                            fullWidth
                            label="N° Teléfono">
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TextField
                            error={errores.length > 0 && errores.find(e => e.param === "NombreUsuario") ? true : false}
                            helperText={errores.length > 0 && errores.find(e => e.param === "NombreUsuario") ? errores.find(e => e.param === "NombreUsuario").msg : ""}
                            disabled= {location.state ? true : false}
                            variant={location.state ? "filled": "outlined"}
                            value={NombreUsuario}
                            name="NombreUsuario"
                            onChange={onInputChange}
                            fullWidth
                            label="Nombre de usuario">
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TextField
                            error={errores.length > 0 && errores.find(e => e.param === "Contraseña") ? true : false}
                            helperText={errores.length > 0 && errores.find(e => e.param === "Contraseña") ? errores.find(e => e.param === "Contraseña").msg : ""}
                            variant="outlined"
                            value={Contraseña}
                            name="Contraseña"
                            onChange={onInputChange}
                            type="password"
                            fullWidth
                            label="Contraseña"
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TextField
                            error={errores.length > 0 && errores.find(e => e.param === "RContraseña") ? true : false}
                            helperText={errores.length > 0 && errores.find(e => e.param === "RContraseña") ? errores.find(e => e.param === "RContraseña").msg : ""}
                            variant="outlined"
                            value={RContraseña}
                            name="RContraseña"
                            onChange={onInputChange}
                            type="password"
                            fullWidth
                            label="Repita contraseña">
                            </TextField>
                        </Grid>
                        </Grid>
                        <br/>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormGroup style={{marginTop: '1rem'}}>
                            { location.state ?
                            <>
                            <FormControlLabel control={<Switch color="primary" onChange={handleChangeCheckEstaBloqueado} checked={EstaBloqueado} />} label="Bloqueado" />
                            </>
                            : ""}
                            <FormControlLabel control={<Switch color="primary" onChange={handleChangeCheckUsuarioDePrueba} checked={EsUsuarioDePrueba}/>} label="Es usuario de prueba" />   
                        </FormGroup>
                        </Grid>
                </CardContent>
                <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                    <Button type="submit" startIcon={<i className={location.state ? "bx bx-edit":"bx bx-check"}></i>}
                    variant="contained" color="primary">
                    {location.state ? "Modificar" : "Registrar"}
                </Button>
                </div>
            </Card>
                </TabPanel>
                <TabPanel>
                    <Card>
                    <DataTable
                        columns={columnasRoles}
                        data={filtro ? filtro : roles}
                        dense
                        highlightOnHover
                        noDataComponent={noSeEncontraronRegistros}
                        onSelectedRowsChange={row => setRolesSeleccionados(row.selectedRows)}
                        pagination
                        paginationComponentOptions={paginacionOpciones}
                        pointerOnHover
                        progressComponent={<Spinner/>}
                        progressPending={cargando}
                        selectableRows
                        selectableRowsComponent={Checkbox}
                        selectableRowSelected={row => rolesUser.find((rol) => rol.RoleId === row.RoleId)}
                        striped
                        subHeader
                        subHeaderComponent={<Buscador onFiltrar={e => setTextoFiltrado(e.target.value)} textoFiltrado={textoFiltrado} />}
                    />
                    </Card>
                    <FormHelperText style={{color: '#f44336'}}>{errores.length > 0 && errores.find(e => e.param === "RolesSeleccionados") ? errores.find(e => e.param === "RolesSeleccionados").msg : ""}</FormHelperText>
                </TabPanel>
            </Tabs>
        </CardContent>
    </Card>
    </form>
    </main>
    <br/>
    <Footer/>
    </div>
    </>
    );
}
 
export default CaratulaUser;