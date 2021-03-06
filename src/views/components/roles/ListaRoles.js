import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../../context/appContext';
import Aside from '../design/layout/Aside';
import Footer from '../design/layout/Footer';
import './../design/layout/styles/styles.css';
import { Button, Card, CardContent, CardHeader, MenuItem, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Datatable from '../design/components/Datatable';
import Modal from '../design/components/Modal';
import { Link } from 'react-router-dom';
import BotonesDatatable from '../design/components/BotonesDatatable';
import GetUserId from '../../../helpers/GetUserId';

const Roles = () => {
    const appContext = useContext(AppContext);
    const { roles, traerRoles, eliminarRol } = appContext;

    useEffect(() => {
        traerRoles(2);
    },[]);

    const [modalDarDeBaja, setModalDarDeBaja] = useState(false);

    const [RoleInfo, setRoleInfo] = useState({
        RoleId: null,
        RoleName: null,
        RoleDescription: null
    });

    const handleChangeModalDarDeBaja = (data) => {
        setModalDarDeBaja(!modalDarDeBaja)
        if(!modalDarDeBaja){
            setRoleInfo({
                EstadoId: 3,
                CambioEstadoFecha: new Date().toJSON(),
                RoleId: data.RoleId,
                deletedBy: GetUserId()
            })
        }
        else {
            setRoleInfo({
                RoleId: null
            })
        }
    }

    const columnasRoles = [
    {
        "name": "id",
        "selector": row =>row["RoleId"],
        "omit": true,
    },
    {
        "name": "Nombre",
        "selector": row =>row["RoleName"],
        "wrap": true,
        "sortable": true
    },
    {
        "name": "Descripción",
        "selector": row =>row["RoleDescription"],
        "wrap": true,
        "sortable": true
    },
    {
        cell: (data) =>
        <>
        <BotonesDatatable botones={
            <>
            <MenuItem>
                <Link to={`/caratula-role/RoleId=${data.RoleId}`} state={data}
                style={{textDecoration: 'none', color: "navy"}}>
                <Typography><i className='bx bx-pencil bx-xs' ></i> Editar</Typography>
                </Link>
            </MenuItem>
            <MenuItem>
                <Typography onClick={()=>handleChangeModalDarDeBaja(data)} style={{textDecoration: 'none', color: "red", cursor: "pointer"}}><i className='bx bx-trash bx-xs'></i> Eliminar</Typography>
            </MenuItem>
            </>
        }/>
        </>,
    }
]
    return (
        <>
        <div className="container">
        <Aside/>
        <main>
        <Typography variant="h6">Listado de roles del sistema</Typography>
        <br/>
        <Card>
            <CardHeader
            action={<Link style={{textDecoration: 'none'}} to="/caratula-role"><Button variant="contained" startIcon={<i className="bx bx-plus"></i>} color="primary"> Nuevo rol</Button></Link>}>
            </CardHeader>
            <CardContent>
                <Modal
                abrirModal={modalDarDeBaja}
                funcionCerrar={handleChangeModalDarDeBaja}
                titulo={<Alert severity="info" icon={<i className="bx bx-user-x bx-sm"></i>}>¿Está seguro que quiere dar de baja el rol?</Alert>}
                botones={
                <>
                <Button onClick={()=>
                    {eliminarRol(RoleInfo)
                    setModalDarDeBaja(false)}}
                    style={{backgroundColor: "#EF5350", color:"white"}}
                    variant="contained"
                    >
                Dar de baja</Button>
                <Button onClick={handleChangeModalDarDeBaja}>Cancelar</Button></>}
                >
                </Modal>
                <Datatable
                    loader={true}
                    columnas={columnasRoles}
                    datos={roles}
                    paginacion={true}
                    buscar={true}
                    listado={'ROLES'}>
                </Datatable>
            </CardContent>
        </Card>
        </main>
        <Footer/>
        </div>
        </>
    );
}
 
export default Roles;