import convertirAFecha from "../../../../helpers/ConvertirAFecha";

const filtrosDatatable = (listado, datos, textoFiltrado) => {
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

    if(listado === 'DETALLES_PAGO') {
        filtro = datos.filter(item =>
            (item.DetallePagoMonto && item.DetallePagoMonto.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.createdAt && item.createdAt.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.MedioPago.MedioPagoNombre && item.MedioPago.MedioPagoNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Registro.NombreCompleto && item.Registro.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Movimiento.MovimientoConcepto.MovimientoConceptoNombre && item.Movimiento.MovimientoConcepto.MovimientoConceptoNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'MOVIMIENTOS') {
        filtro = datos.filter(item =>
            (item.MovimientoRegistro.NombreCompleto && item.MovimientoRegistro.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.MovimientoAbonado.NombreCompleto && item.MovimientoAbonado.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.createdAt && item.createdAt.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.MovimientoMedioPago.MovimientoMedioPagoNombre && item.MedioPago.MedioPagoNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.MovimientoConcepto.MovimientoConceptoNombre && item.MovimientoConcepto.MovimientoConceptoNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'USUARIOS') {
        filtro = datos.filter(item =>
            (item.NombreUsuario && item.NombreUsuario.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.NombreCompleto && item.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.EstadoUser.EstadoNombre && item.EstadoUser.EstadoNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Email && item.Email.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Documento && item.Documento.toString().includes(textoFiltrado.toString()))
        ||  (item.Telefono && item.Telefono.toString().includes(textoFiltrado.toLowerCase()))
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
            (item.PermissionName && item.PermissionName.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.PermissionDescription && item.PermissionDescription.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'MEDIOS_PAGO') {
        filtro = datos.filter(item =>
            (item.MedioPagoNombre && item.MedioPagoNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.MedioPagoDescripcion && item.MedioPagoDescripcion.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.MedioPagoCantidadCuotas && item.MedioPagoCantidadCuotas.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.MedioPagoInteres && item.MedioPagoInteres.toString().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'SERVICIOS') {
        filtro = datos.filter(item =>
            (item.ServicioNombre && item.ServicioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.ServicioDescripcion && item.ServicioDescripcion.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.ServicioInscripcion && item.ServicioInscripcion.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.ServicioPrecioUnitario && item.ServicioPrecioUnitario.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.ServicioMultiplicadorPrimerMes && item.ServicioMultiplicadorPrimerMes.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.ServicioBonificacionPagoSeisMeses && item.ServicioBonificacionPagoSeisMeses.toString().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'MUNICIPIOS') {
        filtro = datos.filter(item =>
            (item.MunicipioNombre && item.MunicipioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.MunicipioCodigoPostal && item.MunicipioCodigoPostal.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.MunicipioSigla && item.MunicipioSigla.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'BARRIOS') {
        filtro = datos.filter(item =>
            (item.BarrioNombre && item.BarrioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Municipio.MunicipioNombre && item.Municipio.MunicipioNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'ONUS') {
        filtro = datos.filter(item =>
            (item.OnuMac && item.OnuMac.toString().includes(textoFiltrado.toLowerCase()))
        ||  (item.OnuSerie && item.OnuSerie.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.ModeloOnu.ModeloOnuNombre && item.ModeloOnu.ModeloOnuNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.Abonado.NombreCompleto && item.Abonado.NombreCompleto.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'MODELOS_ONU') {
        filtro = datos.filter(item =>
            (item.ModeloOnuNombre && item.ModeloOnuNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.ModeloOnuDescripcion && item.ModeloOnuDescripcion.toLowerCase().includes(textoFiltrado.toLowerCase()))
        );
    }

    if(listado === 'TAREAS') {
        filtro = datos.filter(item =>
            (item.TareaNombre && item.TareaNombre.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.TareaDescripcion && item.TareaDescripcion.toLowerCase().includes(textoFiltrado.toLowerCase()))
        ||  (item.TareaPrecioUnitario && item.TareaPrecioUnitario.toString().includes(textoFiltrado.toLowerCase()))
        );
    }

    return filtro;
}

export default filtrosDatatable;