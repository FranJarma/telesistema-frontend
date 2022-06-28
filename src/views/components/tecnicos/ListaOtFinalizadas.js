import React, { useContext, useEffect } from 'react';
import { Card, CardContent, MenuItem, Typography } from '@material-ui/core';
import Datatable from '../design/components/Datatable';
import Aside from '../design/layout/Aside';
import Footer from '../design/layout/Footer';
import AppContext from '../../../context/appContext';
import convertirAFecha from './../../../helpers/ConvertirAFecha';
import convertirAHora from './../../../helpers/ConvertirAHora';
import TooltipForTable from './../../../helpers/TooltipForTable';
import Ot from '../design/components/Ot';
import BotonesDatatable from '../design/components/BotonesDatatable';

const ListaOtFinalizadas = () => {
    const appContext = useContext(AppContext);
    const { ordenesDeTrabajo, traerOrdenesDeTrabajo,} = appContext;

    useEffect(()=>{
        traerOrdenesDeTrabajo(6);
    },[])

    const columnasOt = [
        {
            "name": "N°",
            "selector": row => row["OtId"],
            "width": "70px"
        },
        {
            "name": "Abonado",
            "wrap": true,
            "sortable": true,
            "selector": row => row["ApellidoAbonado"] + ", " + row["NombreAbonado"]
        },
        {
            "name": "Domicilio",
            "wrap": true,
            "sortable": true,
            "selector": row => row["DomicilioCalle"] + " " + row["DomicilioNumero"] + ", B° " + row["BarrioNombre"] + " " + row["MunicipioNombre"],
        },
        {
            "name": <TooltipForTable name ="Fecha y hora de inicio"/> ,
            "wrap": true,
            "sortable": true,
            "selector": row => row["OtFechaInicio"] ? convertirAFecha(row["OtFechaInicio"]) + "-" + convertirAHora(row["OtFechaInicio"]) : ""
        },
        {
            "name": <TooltipForTable name ="Fecha y hora de finalización"/>,
            "wrap": true,
            "sortable": true,
            "selector": row => row["OtFechaFinalizacion"] ? convertirAFecha(row["OtFechaFinalizacion"]) + "-" + convertirAHora(row["OtFechaFinalizacion"]) : ""
        },
        {
            "name": <TooltipForTable name="Técnico a cargo"/>,
            "wrap": true,
            "sortable": true,
            "selector": row => row["ApellidoResponsableEjecucion"] + ", " + row["NombreResponsableEjecucion"]
        },
        {
            cell: (data) => 
            <>
            <BotonesDatatable botones={
                <>
                <MenuItem>
                    <Ot data={data}/>
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
        <Typography variant="h6">Listado de Órdenes de Trabajo finalizadas</Typography>
        <br/>
        <Card>
            <CardContent>
                <Datatable
                    loader={true}
                    datos={ordenesDeTrabajo}
                    columnas={columnasOt}
                    paginacion={true}
                    buscar={true}
                />
            </CardContent>
        </Card>
        </main>
        <Footer/>
        </div>
        </>
    );
}
 
export default ListaOtFinalizadas;