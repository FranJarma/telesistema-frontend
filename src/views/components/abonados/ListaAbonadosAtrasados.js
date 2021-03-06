import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../../context/appContext';
import Aside from '../design/layout/Aside';
import Footer from '../design/layout/Footer';
import './../design/layout/styles/styles.css';
import { Card, CardContent, Tooltip, Typography } from '@material-ui/core';
import Datatable from '../design/components/Datatable';
import TooltipForTable from '../../../helpers/TooltipForTable';
import formatDocumento from '../../../helpers/FormatDocumento';
import SpanAlquiler from '../../../helpers/SpanAlquiler';

const ListaAbonadosAtrasados = () => {
    const appContext = useContext(AppContext);
    const { abonados, traerAbonadosAtrasados, traerMunicipiosPorProvincia} = appContext;

    useEffect(() => {
        traerAbonadosAtrasados();
        //10 para que traiga los de jujuy
        traerMunicipiosPorProvincia(10);
    },[]);

    const [MunicipioId, setMunicipioId] = useState(0);

    const handleChangeMunicipioSeleccionado = (e) => {
        setMunicipioId(e.target.value);
        traerAbonadosAtrasados(1, e.target.value);
    }

    const columnasAbonadosAtrasados = [
    {
        "name": "id",
        "selector": row =>row["UserId"],
        "omit": true,
    },
    {
        "name": "N°",
        "selector": row =>row["AbonadoNumero"],
        "width": '50px'
    },
    {
        "name": <TooltipForTable name="Nombre Completo" />,
        "selector": row => <TooltipForTable name={row["NombreCompleto"]} />,
        "wrap": true,
        "sortable": true,
    },
    {
        "name": <TooltipForTable name="Documento" />,
        "selector": row => <TooltipForTable name={formatDocumento(row["Documento"])} />,
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
        "name": <TooltipForTable name="Meses que debe"/>,
        "selector": row => <TooltipForTable name={row["PagosAbonado"][0].MesesDebe}/>,
        "sortable": true,
        "hide": "sm",
    },
    {
        "name": <TooltipForTable name="Debe en total"/>,
        "selector": row => <TooltipForTable name={'$ '+ row["PagosAbonado"][0].Saldo}/>,
        "sortable": true,
        "hide": "sm",
    }
]

const ExpandedComponent = ({ data }) =>
<>
    <Typography style={{fontWeight: 'bold'}} variant="h6"><i className="bx bx-calendar"></i> Meses que debe: {data.MesesDebe}</Typography>
</>;

    return (
        <>
        <div className="container">
        <Aside/>
        <main>
        <Typography variant="h6">Abonados Atrasados <Tooltip arrow title="En este listado se muestran los abonados que deben algun mes">
            <i style={{color: 'blue'}} className="bx bxs-help-circle bx-tada-hover bx-sm"></i></Tooltip>
        </Typography>
        <br/>
        <Card>
            <CardContent>
                <Datatable
                    loader={true}
                    columnas={columnasAbonadosAtrasados}
                    expandedComponent={ExpandedComponent}
                    datos={abonados}
                    paginacion={true}
                    buscar={true}
                    listado={"ABONADOS_ATRASADOS"}
                />
            </CardContent>
        </Card>
        </main>
        <Footer/>
        </div>
        </>
    );
}
 
export default ListaAbonadosAtrasados;