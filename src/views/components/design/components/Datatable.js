import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import Buscador from './Buscador';
import convertirAFecha from './../../../../helpers/ConvertirAFecha';
import Checkbox from '@material-ui/core/Checkbox';

const Datatable = ({loader, columnas, datos, expandedComponent, paginacion, paginacionPorDefecto, buscar, seleccionable, fnSeleccionable, listado}) => {
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

    let filtro = [];

    if(listado === 'ABONADOS_INSCRIPTOS') {
        filtro = datos.filter(item =>
            (item.AbonadoNumero && item.AbonadoNumero.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.NombreCompleto && item.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.DomicilioAbonado.DomicilioCompleto && item.DomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Documento && item.Documento.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.ServicioAbonado.ServicioNombre && item.ServicioAbonado.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.FechaBajada && convertirAFecha(item.FechaBajada).includes(textoFiltrado.toLowerCase()))
        ||  (item.FechaContrato && convertirAFecha(item.FechaContrato).includes(textoFiltrado.toLowerCase()))
        ||  (item.FechaVencimientoServicio && convertirAFecha(item.FechaVencimientoServicio).includes(textoFiltrado.toLowerCase()))
        );
    }
    
    if(listado === 'ABONADOS_ACTIVOS') {
        filtro = datos.filter(item =>
            (item.AbonadoNumero && item.AbonadoNumero.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.NombreCompleto && item.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.DomicilioAbonado.DomicilioCompleto && item.DomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Documento && item.Documento.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.ServicioAbonado.ServicioNombre && item.ServicioAbonado.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.FechaVencimientoServicio && convertirAFecha(item.FechaVencimientoServicio).includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'ABONADOS_INACTIVOS') {
        filtro = datos.filter(item =>
            (item.AbonadoNumero && item.AbonadoNumero.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.NombreCompleto && item.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.DomicilioAbonado.DomicilioCompleto && item.DomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Documento && item.Documento.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.ServicioAbonado.ServicioNombre && item.ServicioAbonado.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Deleted.NombreCompletoBaja && item.Deleted.NombreCompletoBaja.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.deletedAt && convertirAFecha(item.deletedAt).includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'ABONADOS_ATRASADOS') {
        filtro = datos.filter(item =>
            (item.AbonadoNumero && item.AbonadoNumero.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.NombreCompleto && item.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.DomicilioAbonado.DomicilioCompleto && item.DomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Documento && item.Documento.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.PagosAbonado[0].MesesDebe && item.PagosAbonado[0].MesesDebe.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.PagosAbonado[0].Saldo && item.PagosAbonado[0].Saldo.toString().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'OT_PENDIENTES') {
        filtro = datos.filter(item =>
            (item.AbonadoOt.NombreCompletoAbonado && item.AbonadoOt.NombreCompletoAbonado.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.AbonadoOt.DomicilioAbonado.DomicilioCompleto && item.AbonadoOt.DomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.AbonadoOt.ServicioAbonado.ServicioNombre && item.AbonadoOt.ServicioAbonado.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.OtFechaPrevistaVisita && convertirAFecha(item.OtFechaPrevistaVisita).includes(textoFiltrado.toLowerCase()))
        ||  (item.OtMonto && item.OtMonto.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.OtObservacionesResponsableEjecucion && item.OtObservacionesResponsableEjecucion.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.RegistroOt.NombreCompletoUsuarioRegistro && item.RegistroOt.NombreCompletoUsuarioRegistro.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.TecnicoResponsableOt.NombreCompletoTecnicoResponsable && item.TecnicoResponsableOt.NombreCompletoTecnicoResponsable.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.createdAt && convertirAFecha(item.createdAt).includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'OT_FINALIZADAS') {
        filtro = datos.filter(item =>
            (item.AbonadoOt.NombreCompletoAbonado && item.AbonadoOt.NombreCompletoAbonado.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.AbonadoOt.DomicilioAbonado.DomicilioCompleto && item.AbonadoOt.DomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.AbonadoOt.ServicioAbonado.ServicioNombre && item.AbonadoOt.ServicioAbonado.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.OtFechaPrevistaVisita && convertirAFecha(item.OtFechaPrevistaVisita).includes(textoFiltrado.toLowerCase()))
        ||  (item.OtMonto && item.OtMonto.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.OtObservacionesResponsableEjecucion && item.OtObservacionesResponsableEjecucion.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.RegistroOt.NombreCompletoUsuarioRegistro && item.RegistroOt.NombreCompletoUsuarioRegistro.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.TecnicoResponsableOt.NombreCompletoTecnicoResponsable && item.TecnicoResponsableOt.NombreCompletoTecnicoResponsable.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.OtFechaInicio && convertirAFecha(item.OtFechaInicio).includes(textoFiltrado.toLowerCase()))
        ||  (item.OtFechaFinalizacion && convertirAFecha(item.OtFechaFinalizacion).includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'MIS_OT') {
        filtro = datos.filter(item =>
            (item.AbonadoOt.NombreCompletoAbonado && item.AbonadoOt.NombreCompletoAbonado.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.AbonadoOt.DomicilioAbonado.DomicilioCompleto && item.AbonadoOt.DomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.AbonadoOt.ServicioAbonado.ServicioNombre && item.AbonadoOt.ServicioAbonado.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.OtFechaPrevistaVisita && convertirAFecha(item.OtFechaPrevistaVisita).includes(textoFiltrado.toLowerCase()))
        ||  (item.OtMonto && item.OtMonto.toString().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'HISTORIAL_DOMICILIOS') {
        filtro = datos.filter(item =>
            (item.AbonadoUserDomicilio.DomicilioAbonado.DomicilioCompleto && item.AbonadoUserDomicilio.DomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.CambioDomicilioObservaciones && item.CambioDomicilioObservaciones.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.NuevoDomicilioAbonado.DomicilioCompleto && item.NuevoDomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.OtUDomicilio.OtFechaInicio && convertirAFecha(item.OtUDomicilio.OtFechaInicio).includes(textoFiltrado.toLowerCase()))
        ||  (item.OtUDomicilio.OtFechaFinalizacion && convertirAFecha(item.OtUDomicilio.OtFechaFinalizacion).includes(textoFiltrado.toLowerCase()))
        ||  (item.OtUDomicilio.OtFechaPrevistaVisita && convertirAFecha(item.OtUDomicilio.OtFechaPrevistaVisita).includes(textoFiltrado.toLowerCase()))
        ||  (item.createdAt && convertirAFecha(item.createdAt).includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'HISTORIAL_SERVICIOS') {
        filtro = datos.filter(item =>
            (item.AbonadoUserServicio.ServicioAbonado.ServicioNombre && item.AbonadoUserServicio.ServicioAbonado.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.CambioServicioObservaciones && item.CambioServicioObservaciones.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.NuevoServicioAbonado.ServicioNombre && item.NuevoServicioAbonado.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.OtUServicio.OtFechaInicio && convertirAFecha(item.OtUServicio.OtFechaInicio).includes(textoFiltrado.toLowerCase()))
        ||  (item.OtUServicio.OtFechaFinalizacion && convertirAFecha(item.OtUServicio.OtFechaFinalizacion).includes(textoFiltrado.toLowerCase()))
        ||  (item.OtUServicio.OtFechaPrevistaVisita && convertirAFecha(item.OtUServicio.OtFechaPrevistaVisita).includes(textoFiltrado.toLowerCase()))
        ||  (item.createdAt && convertirAFecha(item.createdAt).includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'PAGOS') {
        filtro = datos.filter(item =>
            (item.PagoAño && item.PagoAño.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.PagoMes && item.PagoMes.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.PagoTotal && item.PagoTotal.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.PagoSaldo && item.PagoSaldo.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.PagoRecargo && item.PagoRecargo.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.PagoConcepto.MovimientoConceptoNombre && item.PagoConcepto.MovimientoConceptoNombre.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.PagoObservaciones && item.PagoObservaciones.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'DETALLES_PAGOS') {
        filtro = datos.filter(item =>
            (item.DetallePagoMonto && item.DetallePagoMonto.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.createdAt && item.createdAt.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.MedioPago.MedioPagoNombre && item.MedioPago.MedioPagoNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Registro.NombreCompleto && item.Registro.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Movimiento.MovimientoConcepto.MovimientoConceptoNombre && item.Movimiento.MovimientoConcepto.MovimientoConceptoNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'ROLES') {
        filtro = datos.filter(item =>
            (item.RoleName && item.RoleName.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.RoleDescription && item.RoleDescription.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'PERMISOS') {
        filtro = datos.filter(item =>
            (item.PermissionName && item.PermissionName.toLowerCase()().includes(textoFiltrado.toLowerCase()))
        ||  (item.PermissionDescription && item.PermissionDescription.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    console.log(datos);

    // const itemsFiltrados = datos.filter(item =>
    // (item.createdAt && convertirAFecha(item.createdAt).includes(textoFiltrado.toLowerCase()))
    // || (item.createdBy && item.createdBy.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.Nombre && item.Nombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.NombreCompleto && item.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.Apellido && item.Apellido.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.NombreUsuario && item.NombreUsuario.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.Email && item.Email.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.Documento && item.Documento.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.Barrio && item.Barrio.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.BarrioNombre && item.BarrioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.DomicilioAbonado.Barrio.BarrioNombre && item.DomicilioAbonado.Barrio.BarrioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.DomicilioAbonado.Barrio.Municipio.MunicipioNombre && item.DomicilioAbonado.Barrio.Municipio.MunicipioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.MunicipioNombre && item.MunicipioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.DomicilioAbonado.DomicilioCompleto && item.DomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.DomicilioCalle && item.DomicilioCalle.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.DomicilioNumero && item.DomicilioNumero.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.ServicioAbonado.ServicioNombre && item.ServicioAbonado.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.ServicioNombre && item.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.ServicioDescripcion && item.ServicioDescripcion.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.MedioPagoNombre && item.MedioPagoNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.MedioPagoDescripcion && item.MedioPagoDescripcion.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.MedioPagoInteres && item.MedioPagoInteres.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.OnuMac && item.OnuMac.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.OnuSerie && item.OnuSerie.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.ModeloOnuNombre && item.ModeloOnuNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.PagoSaldo && item.PagoSaldo.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.PagoAño && item.PagoAño.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.PagoMes && item.PagoMes.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.PagoRecargo && item.PagoRecargo.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.PagoTotal && item.PagoTotal.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.DetallePagoMonto && item.DetallePagoMonto.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.RoleName && item.RoleName.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.RoleDescription && item.RoleDescription.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.TareaNombre && item.TareaNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.OtId && item.OtId.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.OtFechaPrevistaVisita && convertirAFecha(item.OtFechaPrevistaVisita).includes(textoFiltrado.toLowerCase()))
    // || (item.MovimientoCantidad && item.MovimientoCantidad.toString().includes(textoFiltrado.toLowerCase()))
    // || (item.FechaVencimientoServicio && convertirAFecha(item.FechaVencimientoServicio).includes(textoFiltrado.toLowerCase()))
    // || (item.NombreResponsableEjecucion && item.NombreResponsableEjecucion.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.ApellidoResponsableEjecucion && item.ApellidoResponsableEjecucion.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.NombreAbonado && item.NombreAbonado.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.ApellidoAbonado && item.ApellidoAbonado.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.NombreCarga && item.NombreCarga.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.ApellidoCarga && item.ApellidoCarga.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.Tipo && item.Tipo.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.Concepto && item.Concepto.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.NuevoDomicilioAbonado.DomicilioCompleto && item.NuevoDomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.NuevoDomicilioAbonado.DomicilioCompleto.Barrio.BarrioNombre && item.NuevoDomicilioAbonado.DomicilioCompleto.Barrio.BarrioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.AbonadoUserDomicilio.DomicilioAbonado.DomicilioCompleto && item.AbonadoUserDomicilio.DomicilioAbonado.DomicilioCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // || (item.AbonadoUserDomicilio.DomicilioAbonado.Barrio.BarrioNombre && item.AbonadoUserDomicilio.DomicilioAbonado.Barrio.BarrioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
    // );

    const paginacionOpciones = {
        rowsPerPageText: 'Registros por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Mostrar todos'
    }

    return (
        <DataTable
            columns={columnas}
            expandableRows = {expandedComponent ? true : false}
            expandableRowsComponent={expandedComponent ? expandedComponent : ''}
            data={filtro !== "" ? filtro : datos}
            highlightOnHover
            noDataComponent="No se encontraron registros"
            pagination = {paginacion ? true : false}
            paginationComponentOptions={paginacion ? paginacionOpciones : ""}
            pointerOnHover
            progressComponent={<Spinner/>}
            progressPending={loader ? cargando : false}
            selectableRows={seleccionable ? true : false}
            onSelectedRowsChange={row => fnSeleccionable(row.selectedRows)}
            subHeader = {buscar ? true : false}
            paginationPerPage={paginacionPorDefecto ? paginacionPorDefecto : 10}
            selectableRowsComponent={Checkbox}
            subHeaderComponent={
                buscar ? 
                <Buscador onFiltrar={e => setTextoFiltrado(e.target.value)} textoFiltrado={textoFiltrado}/>
                : ""
            }
            striped
            dense
        >
        </DataTable>
    );
}
 
export default Datatable;
