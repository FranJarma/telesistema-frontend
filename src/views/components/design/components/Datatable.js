import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import Buscador from './Buscador';
import Checkbox from '@material-ui/core/Checkbox';
import filtrosDatatable from './FiltrosDatatable';

const Datatable = ({loader, columnas, datos, expandedComponent, paginacion, paginacionPorDefecto, buscar, seleccionable, preSeleccionado, callbackFilasSelecionadas, listado}) => {
    //state y effect para spinner
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setCargando(false);
        }, 2500);
        return () => clearTimeout(timeout);
    },[])

    //state para buscador
    const [textoFiltrado, setTextoFiltrado] = useState('');

    let filtro = filtrosDatatable(listado, datos, textoFiltrado);

    const paginacionOpciones = {
        rowsPerPageText: 'Registros por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Mostrar todos'
    }

    return (
        <DataTable
            columns={columnas}
            data={filtro !== "" ? filtro : datos}
            dense
            expandableRows = {expandedComponent ? true : false}
            expandableRowsComponent={expandedComponent ? expandedComponent : ''}
            highlightOnHover
            noDataComponent="No se encontraron registros"
            onSelectedRowsChange={callbackFilasSelecionadas}
            pagination = {paginacion ? true : false}
            paginationComponentOptions={paginacion ? paginacionOpciones : ""}
            paginationPerPage={paginacionPorDefecto ? paginacionPorDefecto : 10}
            pointerOnHover
            progressComponent={<Spinner/>}
            progressPending={loader ? cargando : false}
            selectableRows={seleccionable ? true : false}
            selectableRowSelected={preSeleccionado ? preSeleccionado : ""}
            selectableRowsComponent={Checkbox}
            striped
            subHeader = {buscar ? true : false}
            subHeaderComponent={
                buscar ? 
                <Buscador onFiltrar={e => setTextoFiltrado(e.target.value)} textoFiltrado={textoFiltrado}/>
                : ""
            }
        >
        </DataTable>
    );
}
 
export default Datatable;
