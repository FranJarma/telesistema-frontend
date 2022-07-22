import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from './appContext';
import AppReducer from './appReducer';
import clienteAxios from '../config/axios';
import Toast from './../views/components/design/components/Toast';
import Swal from './../views/components/design/components/Swal';
import * as TYPES from '../types';
import tokenAuthHeaders from '../config/token';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import * as VARIABLES from './../types/variables';

const AppState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        usuarioAutenticado: false,
        push: false,
        mostrarSpinner: false,
        usuarios: [],
        roles: [],
        rolesUser: [],
        permisos: [],
        permisosRol: [],
        abonados: [],
        abonado: {},
        domicilios: [],
        barrios: [],
        condicionesIva: [],
        municipios: [],
        provincias: [],
        servicios: [],
        onu: {},
        onus: [],
        modelosONU: [],
        historialDomicilios: [],
        historialServicios: [],
        mediosPago: [],
        pagos: [],
        pagosPendientes: [],
        pagosPendientesTop: [],
        inscripcion: {},
        detallesInscripcion: [],
        detallesPago: [],
        tareas: [],
        tareaCambioDomicilio: [],
        ordenesDeTrabajo: [],
        ordenesDeTrabajoAgrupadas: [],
        ordenesDeTrabajoAsignadas: [],
        movimientos: [],
        conceptos: [],
        cargando: false,
        descargando: false,
        registrado: false,
        mensaje: '',
        cajas: {},
        facturas: [],
        recibos: [],
        errores: [],
        comprobante: {}
    }
    let navigate = useNavigate();
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //ERRORES

    const setErrors = (errors) => {
        dispatch({
            type: TYPES.SET_ERRORES,
            payload: errors
        });
    }

    const unsetErrors = () => {
        dispatch({
            type: TYPES.UNSET_ERRORES
        });
    }

    const handleErrors = (error) => {
        handleErrors(error);
        if(!error.response){
            Toast('Hubo un error. Comúniquese con el administrador.', 'error');
        }

        if(error.response.status === 401) cerrarSesion();

        if(error.response.data.msg){
            Toast(error.response.data.msg, 'warning');
        }

        if(error.response.data.errors){
            setErrors(error.response.data.errors);
        }
    }
    
    //AUTH

    const obtenerUsuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuthHeaders(token);
        }
        try {
            const resultado = await clienteAxios.get('/api/auth/login');
            dispatch({
                type: TYPES.OBTENER_INFO_USUARIO,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
            dispatch({
                type: TYPES.CERRAR_SESION
            });
            Toast(error.response.data.msg, 'warning');
            navigate("/");
        }
    };

    const iniciarSesion = async(usuario) => {
        try {
            const resultado = await clienteAxios.post('/api/auth/login', usuario);
            dispatch({
                type: TYPES.LOGIN_EXITOSO,
                payload: resultado.data
            });
            obtenerUsuarioAutenticado();
        } catch (error) {
            handleErrors(error);
        }
    };

    const cerrarSesion = () => {
        try {
            dispatch({
                type: TYPES.CERRAR_SESION
            });
            navigate("/");
        } catch (error) {
            handleErrors();
        }
    };

    //USUARIOS

    const crearUsuario = async (usuario) => {
        try {
            const resultado = await clienteAxios.post('/api/usuarios/create', usuario);
            dispatch({
                type: TYPES.CREAR_USUARIO,
                payload: usuario
            });
            Swal('Operación completa', resultado.data.msg);
            navigate(-1);
        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarUsuario = async (usuario, desdePerfilUser) => {
        try {
            const resultado = await clienteAxios.put(`/api/usuarios/update/${usuario.UserId}`, usuario);
            dispatch({
                type: TYPES.MODIFICAR_USUARIO,
                payload: usuario
            });
            Swal('Operación completa', resultado.data.msg);
            if (!desdePerfilUser) navigate('/users');
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarUsuario = async (usuario) => {
        try {
            const resultado = await clienteAxios.put(`/api/usuarios/delete/${usuario.UserId}`, usuario);
            dispatch({
                type: TYPES.ELIMINAR_USUARIO,
                payload: usuario
            });
            Swal('Operación completa', resultado.data.msg);
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerUsuarios = async (estadoId = 0) => {
        try {
            const resultado =  await clienteAxios.get(`/api/usuarios/estado=${estadoId}`);
            dispatch({
                type: TYPES.LISTA_USUARIOS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerUsuariosPorRol = async (rolId) => {
        try {
            const resultado =  await clienteAxios.get(`/api/usuarios/rol=${rolId}`);
            dispatch({
                type: TYPES.LISTA_USUARIOS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    //ROLES

    const crearRol = async (rol) => {
        try {
            const resultado = await clienteAxios.post('/api/roles/create', rol);
            dispatch({
                type: TYPES.CREAR_ROL,
                payload: rol
            });
            Swal('Operación completa', resultado.data.msg);
            navigate(-1);
        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarRol = async (rol) => {
        try {
            const resultado = await clienteAxios.put(`/api/roles/update/${rol.RoleId}`, rol);
            dispatch({
                type: TYPES.MODIFICAR_ROL,
                payload: rol
            });
            Swal('Operación completa', resultado.data.msg);
            navigate(-1);
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarRol = async (rol) => {
        try {
            const resultado = await clienteAxios.put(`/api/roles/delete/${rol.RoleId}`, rol);
            dispatch({
                type: TYPES.ELIMINAR_ROL,
                payload: rol
            });
            Swal('Operación completa', resultado.data.msg);
            navigate(-1);
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerRoles = async () => {
        try {
            const resultado =  await clienteAxios.get(`/api/roles`);
            dispatch({
                type: TYPES.LISTA_ROLES,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerRolesPorUsuario = async (UserId) => {
        try {
            const resultado =  await clienteAxios.get(`/api/roles/${UserId}`);
            dispatch({
                type: TYPES.LISTA_ROLES_USER,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    //PERMISOS

    const traerPermisos = async () => {
        try {
            const resultado =  await clienteAxios.get(`/api/permisos`);
            dispatch({
                type: TYPES.LISTA_PERMISOS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerPermisosPorRol = async (RoleId) => {
        try {
            const resultado =  await clienteAxios.get(`/api/permisos/${RoleId}`);
            dispatch({
                type: TYPES.LISTA_PERMISOS_ROL,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    //ABONADOS

    const crearAbonado = async (abonado) => {
        try {
            const resultado = await clienteAxios.post('/api/usuarios/abonados/create', abonado);
            dispatch({
                type: TYPES.CREAR_ABONADO,
                payload: resultado.data
            });
            Toast(VARIABLES.ABONADO_CREADO_CORRECTAMENTE, 'success');

        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarAbonado = async (abonado) => {
        try {
            const resultado = await clienteAxios.put(`/api/usuarios/abonados/update/${abonado.UserId}`, abonado);
            dispatch({
                type: TYPES.MODIFICAR_ABONADO,
                payload: abonado
            });
            Swal('Operación completa', resultado.data.msg);
            navigate(-1);
        } catch (error) {
            handleErrors(error);
        }
    };
    
    const cambiarEstadoAbonado = async(abonado) => {
        try {
            const resultado = await clienteAxios.put(`/api/usuarios/abonados/cambiar-estado/${abonado.UserId}`, abonado);
            dispatch({
                type: TYPES.CAMBIAR_ESTADO_ABONADO,
                payload: abonado
            });
            Swal('Operación completa', resultado.data.msg);
        } catch (error) {
            handleErrors(error);
        }
    };

    const renovarContratoAbonado = async(abonado) => {
        try {
            const resultado = await clienteAxios.put(`/api/usuarios/abonados/renovar-contrato/${abonado.UserId}`, abonado);
            dispatch({
                type: TYPES.RENOVAR_CONTRATO_ABONADO,
                payload: abonado
            });
            Swal('Operación completa', resultado.data.msg);
        } catch (error) {
            handleErrors(error);
        }
    };

    const cambioDomicilioAbonado = async(domicilio) => {
        try {
            const resultado = await clienteAxios.put(`/api/usuarios/abonados/cambio-domicilio/${domicilio.UserId}`, domicilio);
            dispatch({
                type: TYPES.CAMBIO_DOMICILIO_ABONADO,
                payload: [resultado.data, domicilio]
            });
            Toast(resultado.data.msg, 'success');
        } catch (error) {
            handleErrors(error);
        }
    };

    const cambioServicioAbonado = async(servicio) => {
        try {
            const resultado = await clienteAxios.put(`/api/usuarios/abonados/cambio-servicio/${servicio.UserId}`, servicio);
            dispatch({
                type: TYPES.CAMBIO_SERVICIO_ABONADO,
                payload: [resultado.data, servicio]
            });
            Toast(resultado.data.msg, 'success');

        } catch (error) {
            handleErrors(error);
        }
    };

    const cambioTitularidadAbonado = async(abonado) => {
        try {
            const resultado = await clienteAxios.put(`/api/usuarios/abonados/cambio-titularidad/${abonado.UserId}`, abonado);
            dispatch({
                type: TYPES.CAMBIO_TITULARIDAD_ABONADO,
                payload: abonado
            });
            Swal('Operación completa', resultado.data.msg);
            navigate(-1);
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerAbonados = async (estadoId = 0, municipioId = 0) => {
        try {
            const resultado =  await clienteAxios.get('/api/usuarios/abonados', {
                params: {
                    estadoId: estadoId,
                    municipioId: municipioId
                }
            });
            dispatch({
                type: TYPES.LISTA_ABONADOS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerAbonadosAtrasados = async (municipioId = 0) => {
        try {
            const resultado =  await clienteAxios.get(`/api/usuarios/abonados/atrasados/municipio=${municipioId}}`);
            dispatch({
                type: TYPES.LISTA_ABONADOS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerAbonado = async (UserId) => {
        try {
            const resultado =  await clienteAxios.get(`/api/usuarios/abonados/UserId=${UserId}`);
            dispatch({
                type: TYPES.TRAER_ABONADO,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    //HISTORIAL DE DOMICILIOS

    const traerDomiciliosAbonado = async (id) => {
        try {
            const resultado = await clienteAxios.get(`/api/usuarios/abonados/domicilios/${id}`);
            dispatch({
                type: TYPES.LISTA_DOMICILIOS_ABONADO,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };
    //HISTORIAL DE SERVICIOS

    const traerServiciosAbonado = async (id) => {
        try {
            const resultado = await clienteAxios.get(`/api/usuarios/abonados/servicios/${id}`);
            dispatch({
                type: TYPES.LISTA_SERVICIOS_ABONADO,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    //PAGOS

    const crearPago = async(pago) => {
        try {
            const resultado = await clienteAxios.post('/api/pagos/create', pago);
            dispatch({
                type: TYPES.CREAR_PAGO,
                payload: [resultado.data, pago]
            });
            Toast(resultado.data.msg, 'success');
        } catch (error) {
            handleErrors(error);
        }
    };

    const crearPagoAdelantado = async(pagoAdelantadoInfo) => {
        try {
            const resultado = await clienteAxios.post('/api/pagos/createPagoAdelantado', pagoAdelantadoInfo);
            dispatch({
                type: TYPES.CREAR_PAGO_ADELANTADO,
                payload: [resultado.data, pagoAdelantadoInfo]
            });
            Toast(resultado.data.msg, 'success');
        } catch (error) {
            handleErrors(error);
        }
    };

    const agregarRecargo = async(pago, setModalRecargo) => {
        try {
            const resultado = await clienteAxios.put('/api/pagos/recargo', pago);
            dispatch({
                type: TYPES.AGREGAR_RECARGO,
                payload: pago
            });
            Toast(resultado.data.msg, 'success');
            setModalRecargo(false);
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarRecargo = async(pago) => {
        try {
            const resultado = await clienteAxios.put('/api/pagos/recargo/delete', pago);
            dispatch({
                type: TYPES.ELIMINAR_RECARGO,
                payload: pago
            });
            Toast(resultado.data.msg, 'success');
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerDatosInscripcion = async(UserId) => {
        try {
            const resultado = await clienteAxios.get(`/api/pagos/UserId=${UserId}&Inscripcion=${true}`);
            dispatch({
                type: TYPES.DATOS_INSCRIPCION,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerPagosPorAbonado = async (UserId, Periodo = null, Concepto) => {
        try {
            const resultado = await clienteAxios.get('/api/pagos', {
                params: {
                    UserId: UserId,
                    Periodo: Periodo,
                    Concepto: Concepto
                }
            });
            dispatch({
                type: TYPES.LISTA_PAGOS_ABONADO,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerPagosMensualesPendientes = async (UserId, Concepto, top = 0) => {
        try {
            const resultado = await clienteAxios.get(`/api/pagos/UserId=${UserId}&Concepto=${Concepto}&top=${top}`);
            if(top > 0) {
                dispatch({
                    type: TYPES.LISTA_PAGOS_PENDIENTES_ABONADO,
                    payload: resultado.data
                })
            }
            else {
                dispatch({
                    type: TYPES.LISTA_PAGOS_PENDIENTES_ABONADO_TOP,
                    payload: resultado.data
                })
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    //DETALLES PAGO

    const traerDetallesPago = async (PagoId) => {
        try {
            const resultado = await clienteAxios.get(`/api/detallesPago/${PagoId}`);
            dispatch({
                type: TYPES.LISTA_DETALLES_PAGO_ABONADO,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarDetallePago = async(detallePago, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/detallesPago/delete', detallePago);
            dispatch({
                type: TYPES.ELIMINAR_DETALLE_PAGO,
                payload: detallePago
            });
            Swal('Operación completa', resultado.data.msg);
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    //COMPROBANTES

    const traerFacturasPorAbonado = async (UserId, Periodo = null) => {
        try {
            const resultado = await clienteAxios.get(`/api/facturas/UserId=${UserId}&Periodo=${Periodo}`);
            dispatch({
                type: TYPES.LISTA_FACTURAS_ABONADO,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerRecibosPorAbonado = async (UserId, Periodo= null) => {
        try {
            const resultado = await clienteAxios.get('/api/movimientos/abonado', {
                params: {
                    UserId: UserId,
                    Periodo: Periodo
                }
            });
            dispatch({
                type: TYPES.LISTA_RECIBOS_ABONADO,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const descargarComprobante = async(tipo, caratula, data) => {
        try {
            mostrarSpinnerDescarga();
            const blob = await pdf(caratula).toBlob();
            if(tipo === "Factura") saveAs(blob, `Factura-N°CAE:${data.FacturaCodigoAutorizacion}-Abonado:${data.AbonadoNumero}`)
            if(tipo === "Recibo") saveAs(blob, `Recibo-N°:${data.ReciboId}-Abonado:${data.AbonadoNumero}`);
            if(tipo === "Ot") saveAs(blob, `OT-N°:${data.OtId}-Abonado:${data.AbonadoOt.AbonadoNumero}`);
            dispatch({
                type: TYPES.DESCARGAR_COMPROBANTE
            })
        } catch (error) {
            handleErrors(true);
        }
    };

    //BARRIOS

    const crearBarrio = async(barrio, cerrarModal) => {
        try {
            const resultado = await clienteAxios.post('/api/barrios/create', barrio);
            dispatch({
                type: TYPES.CREAR_BARRIO,
                payload: barrio
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarBarrio = async(barrio, cerrarModal, setMunicipioId) => {
        try {
            const resultado = await clienteAxios.put('/api/barrios/update', barrio);
            dispatch({
                type: TYPES.MODIFICAR_BARRIO,
                payload: barrio
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
            traerBarriosPorMunicipio(barrio.Municipio.MunicipioId);
            setMunicipioId(barrio.Municipio.MunicipioId);
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarBarrio = async(barrio, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/barrios/delete', barrio);
            dispatch({
                type: TYPES.ELIMINAR_BARRIO,
                payload: barrio
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerBarriosPorMunicipio = async (municipioId) => {
        try {
            let resultado = null;
            municipioId === 0 ? resultado = await clienteAxios.get('/api/barrios') : resultado = await clienteAxios.get(`/api/barrios/municipio=${municipioId}`);
            dispatch({
                type: TYPES.LISTA_BARRIOS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    //CONDICIONES IVA
    const traerCondicionesIva = async () => {
        try {
            const resultado = await clienteAxios.get(`/api/condicionesIva`);
            dispatch({
                type: TYPES.LISTA_CONDICIONES_IVA,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    //MUNICIPIOS

    const crearMunicipio = async(municipio, cerrarModal) => {
        try {
            const resultado = await clienteAxios.post('/api/municipios/create', municipio);
            dispatch({
                type: TYPES.CREAR_MUNICIPIO,
                payload: municipio
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarMunicipio = async(municipio, cerrarModal, setProvinciaId) => {
        try {
            const resultado = await clienteAxios.put('/api/municipios/update', municipio);
            dispatch({
                type: TYPES.MODIFICAR_MUNICIPIO,
                payload: municipio
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
            traerMunicipiosPorProvincia(municipio.Provincia.ProvinciaId);
            setProvinciaId(municipio.Provincia.ProvinciaId);
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarMunicipio = async(municipio, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/municipios/delete', municipio);
            dispatch({
                type: TYPES.ELIMINAR_MUNICIPIO,
                payload: municipio
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerMunicipiosPorProvincia = async (provinciaId) => {
        try {
            let resultado = null;
            provinciaId === 0 ? resultado = await clienteAxios.get('/api/municipios') : resultado = await clienteAxios.get(`/api/municipios/provincia=${provinciaId}`);
            dispatch({
                type: TYPES.LISTA_MUNICIPIOS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerMunicipios = async () => {
        try {
            const resultado = await clienteAxios.get(`/api/municipios`);
            dispatch({
                type: TYPES.LISTA_MUNICIPIOS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    //PROVINCIAS

    const traerProvincias = async () => {
        try {
            const resultado = await clienteAxios.get('/api/provincias');
            dispatch({
                type: TYPES.LISTA_PROVINCIAS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    //SERVICIOS

    const traerServicios = async () => {
        try {
            const resultado = await clienteAxios.get(`/api/servicios`);
            dispatch({
                type: TYPES.LISTA_SERVICIOS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    const crearServicio = async(servicio, cerrarModal) => {
        try {
            const resultado = await clienteAxios.post('/api/servicios/create', servicio);
            dispatch({
                type: TYPES.CREAR_SERVICIO,
                payload: servicio
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarServicio = async(servicio, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/servicios/update', servicio);
            dispatch({
                type: TYPES.MODIFICAR_SERVICIO,
                payload: servicio
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarServicio = async(servicio, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/servicios/delete', servicio);
            dispatch({
                type: TYPES.ELIMINAR_SERVICIO,
                payload: servicio
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    //ONUS

    const traerOnus = async (estadoId = 0) => {
        try {
            const resultado = await clienteAxios.get(`/api/onus/estado=${estadoId}`);
            dispatch({
                type: TYPES.LISTA_ONUS,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerONUPorId = async (id) => {
        try {
            const resultado = await clienteAxios.get(`/api/onus/${id}`);
            dispatch({
                type: TYPES.TRAER_ONU,
                payload: resultado.data
            });
        } catch (error) {
            handleErrors(error);
        }
    };

    const crearONU = async(onu, cerrarModal) => {
        try {
            const resultado = await clienteAxios.post('/api/onus/create', onu);
            dispatch({
                type: TYPES.CREAR_ONU,
                payload: onu
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarONU = async(onu, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/onus/update', onu);
            dispatch({
                type: TYPES.MODIFICAR_ONU,
                payload: onu
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarONU = async(onu, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/onus/delete', onu);
            dispatch({
                type: TYPES.ELIMINAR_ONU,
                payload: onu
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    //MODELOS ONU

    const traerModelosONU = async () => {
        try {
            const resultado = await clienteAxios.get('/api/modelosONU');
            dispatch({
                type: TYPES.LISTA_MODELOS_ONU,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const crearModeloONU = async(modeloONU, cerrarModal) => {
        try {
            const resultado = await clienteAxios.post('/api/modelosONU/create', modeloONU);
            dispatch({
                type: TYPES.CREAR_MODELO_ONU,
                payload: modeloONU
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarModeloONU = async(modeloOnu, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/modelosONU/update', modeloOnu);
            dispatch({
                type: TYPES.MODIFICAR_MODELO_ONU,
                payload: modeloOnu
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarModeloONU = async(modeloOnu, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/modelosONU/delete', modeloOnu);
            dispatch({
                type: TYPES.ELIMINAR_MODELO_ONU,
                payload: modeloOnu
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    //MEDIOS PAGO

    const traerMediosPago = async () => {
        try {
            const resultado = await clienteAxios.get('/api/mediosPago');
            dispatch({
                type: TYPES.LISTA_MEDIOS_DE_PAGO,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const crearMedioPago = async(medioPago, cerrarModal) => {
        try {
            const resultado = await clienteAxios.post('/api/mediosPago/create', medioPago);
            dispatch({
                type: TYPES.CREAR_MEDIO_DE_PAGO,
                payload: medioPago
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarMedioPago = async(medioPago, cerrarModal) => {
        try {
            const resultado = await clienteAxios.post('/api/mediosPago/update', medioPago);
            dispatch({
                type: TYPES.MODIFICAR_MEDIO_DE_PAGO,
                payload: medioPago
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarMedioPago = async(medioPago, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/mediosPago/delete', medioPago);
            dispatch({
                type: TYPES.ELIMINAR_MEDIO_DE_PAGO,
                payload: medioPago
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    //TAREAS

    const traerTareas = async () => {
        try {
            const resultado = await clienteAxios.get('/api/tareas');
            dispatch({
                type: TYPES.LISTA_TAREAS,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerTareaCambioDomicilio = async (servicioId) => {
        try {
            const resultado = await clienteAxios.get(`/api/tareas/servicioId=${servicioId}`);
            dispatch({
                type: TYPES.TAREA_CAMBIO_DOMICILIO,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const crearTarea = async(tarea, cerrarModal) => {
        try {
            const resultado = await clienteAxios.post('/api/tareas/create', tarea);
            dispatch({
                type: TYPES.CREAR_TAREA,
                payload: tarea
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarTarea = async(tarea, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/tareas/update', tarea);
            dispatch({
                type: TYPES.MODIFICAR_TAREA,
                payload: tarea
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarTarea = async(tarea, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/tareas/delete', tarea);
            dispatch({
                type: TYPES.ELIMINAR_TAREA,
                payload: tarea
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    //OT

    const traerOrdenesDeTrabajo = async (estadoId) => {
        try {
            const resultado = await clienteAxios.get(`/api/ot/estado=${estadoId}&group=${false}`);
            dispatch({
                type: TYPES.LISTA_OT,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerOrdenesDeTrabajoAgrupadas = async (estadoId) => {
        try {
            const resultado = await clienteAxios.get(`/api/ot/estado=${estadoId}&group=${true}`);
            dispatch({
                type: TYPES.LISTA_OT_AGRUPADA,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerOrdenesDeTrabajoAsignadas = async (tecnicoId, estadoId) => {
        try {
            const resultado = await clienteAxios.get(`/api/ot/tecnico=${tecnicoId}&estado=${estadoId}`);
            dispatch({
                type: TYPES.LISTA_OT_ASIGNADAS,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const crearOrdenDeTrabajo = async (ot) => {
        try {
            const resultado = await clienteAxios.post('/api/ot/create', ot);
            Toast(resultado.data.msg, 'success');
            navigate(-1);
        } catch (error) {
            handleErrors(error);
        }
    };

    const modificarOrdenDeTrabajo = async (ot) => {
        try {
            const resultado = await clienteAxios.put('/api/ot/update', ot);
            Toast(resultado.data.msg, 'success');
            navigate(-1);
        } catch (error) {
            handleErrors(error);
        }
    };

    const eliminarOrdenDeTrabajo = async (ot, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/ot/delete', ot);
            dispatch({
                type: TYPES.ELIMINAR_OT,
                payload: ot
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const registrarVisitaOrdenDeTrabajo = async (ot, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/ot/registrar-visita', ot);
            dispatch({
                type: TYPES.REGISTRAR_VISITA_OT,
                payload: ot
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const finalizarOrdenDeTrabajo = async (ot, cerrarModal) => {
        try {
            const resultado = await clienteAxios.put('/api/ot/finalizar-ot', ot);
            dispatch({
                type: TYPES.FINALIZAR_OT,
                payload: ot
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    // MOVIMIENTOS

    const crearMovimiento = async(movimiento, cerrarModal) => {
        try {
            const resultado = await clienteAxios.post('/api/movimientos/create', movimiento);
            dispatch({
                type: TYPES.CREAR_MOVIMIENTO,
                payload: movimiento
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    const traerMovimientosPorFecha = async (Fecha, Municipio = null, Turno = null) => {
        try {
            const resultado = await clienteAxios.get('/api/movimientos', {
                params: {
                    Fecha: new Date(Fecha).toISOString().split('T')[0],
                    Municipio: Municipio,
                    Turno: Turno
                }
            })
            dispatch({
                type: TYPES.LISTA_MOVIMIENTOS,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    // CONCEPTOS DE MOVIMIENTO

    const traerConceptos = async (tipo) => {
        try {
            const resultado = await clienteAxios.get(`/api/conceptos/${tipo}`);
            dispatch({
                type: TYPES.LISTA_CONCEPTOS,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    // CAJA

    const traerCaja = async (municipio, fecha, turno) => {
        try {
            if(state.cajas) {
                dispatch({
                    type: TYPES.REINICIALIZAR_CAJA
                })
            }
            const resultado = await clienteAxios.get('/api/caja', {
                params: {
                    municipio: municipio,
                    dia: fecha.getDate(),
                    mes: fecha.getMonth() + 1,
                    año: fecha.getFullYear(),
                    turno: turno
                }
            });
            dispatch({
                type: TYPES.TRAER_CAJA,
                payload: resultado.data
            })
        } catch (error) {
            handleErrors(error);
        }
    };

    const cerrarCaja = async (caja, cerrarModal) => {
        try {
            const resultado = await clienteAxios.post('/api/caja/create', caja);
            dispatch({
                type: TYPES.CERRAR_CAJA,
                payload: caja
            });
            Toast(resultado.data.msg, 'success');
            cerrarModal(true);
        } catch (error) {
            handleErrors(error);
        }
    };

    // SPINNER
    const mostrarSpinner = () => {
        dispatch({
            type: TYPES.MOSTRAR_SPINNER
        });
        setTimeout(()=>{
            dispatch({
                type: TYPES.OCULTAR_SPINNER,
            });
        },3000)
    };

    const mostrarSpinnerDescarga = () => {
        dispatch({
            type: TYPES.MOSTRAR_SPINNER_DESCARGA
        });
        setTimeout(()=>{
            dispatch({
                type: TYPES.OCULTAR_SPINNER_DESCARGA,
            });
        },3000)
    };

    return(
        <AppContext.Provider
        value={{
            token: state.token,
            usuario: state.usuario,
            usuarioAutenticado: state.usuarioAutenticado,
            push: state.push,
            usuarios: state.usuarios,
            roles: state.roles,
            rolesUser: state.rolesUser,
            permisos: state.permisos,
            permisosRol: state.permisosRol,
            abonados: state.abonados,
            abonado: state.abonado,
            domicilios: state.domicilios,
            barrios: state.barrios,
            condicionesIva: state.condicionesIva,
            municipios: state.municipios,
            provincias: state.provincias,
            servicios: state.servicios,
            onu: state.onu,
            onus: state.onus,
            modelosONU: state.modelosONU,
            historialDomicilios: state.historialDomicilios,
            historialServicios: state.historialServicios,
            mediosPago: state.mediosPago,
            pagos: state.pagos,
            pagosPendientes: state.pagosPendientes,
            pagosPendientesTop: state.pagosPendientesTop,
            inscripcion: state.inscripcion,
            detallesInscripcion: state.detallesInscripcion,
            detallesPago: state.detallesPago,
            tareas: state.tareas, tareaCambioDomicilio: state.tareaCambioDomicilio,
            ordenesDeTrabajo: state.ordenesDeTrabajo,
            ordenesDeTrabajoAgrupadas: state.ordenesDeTrabajoAgrupadas,
            ordenesDeTrabajoAsignadas: state.ordenesDeTrabajoAsignadas,
            tecnicosOrdenDeTrabajo: state.tecnicosOrdenDeTrabajo,
            tareasOrdenDeTrabajo: state.tareasOrdenDeTrabajo,
            movimientos: state.movimientos,
            conceptos: state.conceptos,
            cargando: state.cargando,
            descargando: state.descargando,
            mensaje: state.mensaje,
            cajas: state.cajas,
            facturas: state.facturas,
            recibos: state.recibos,
            registrado: state.registrado,
            comprobante: state.comprobante,
            errores: state.errores,
            setErrors, unsetErrors, iniciarSesion, cerrarSesion, obtenerUsuarioAutenticado, traerUsuarios, traerUsuariosPorRol, crearUsuario, modificarUsuario, eliminarUsuario,
            traerRoles, traerRolesPorUsuario, crearRol, modificarRol, eliminarRol,
            traerPermisos, traerPermisosPorRol,
            traerAbonados, traerAbonadosAtrasados, traerAbonado, traerDomiciliosAbonado, traerServiciosAbonado, crearAbonado, modificarAbonado, cambioTitularidadAbonado,
            cambioDomicilioAbonado, cambiarEstadoAbonado, renovarContratoAbonado, cambioServicioAbonado,
            traerBarriosPorMunicipio, crearBarrio, modificarBarrio, eliminarBarrio, 
            traerCondicionesIva,
            traerMunicipios, traerMunicipiosPorProvincia, crearMunicipio, modificarMunicipio, eliminarMunicipio,
            traerProvincias,
            traerServicios, crearServicio, modificarServicio, eliminarServicio,
            traerOnus, traerONUPorId, crearONU, modificarONU, eliminarONU,
            traerModelosONU, crearModeloONU, modificarModeloONU, eliminarModeloONU,
            traerMediosPago, crearMedioPago, modificarMedioPago, eliminarMedioPago,
            traerPagosPorAbonado, crearPago, crearPagoAdelantado, agregarRecargo, eliminarRecargo, traerDatosInscripcion, traerPagosMensualesPendientes,
            traerDetallesPago, eliminarDetallePago,
            traerTareas, traerTareaCambioDomicilio, crearTarea, modificarTarea, eliminarTarea,
            traerOrdenesDeTrabajo, traerOrdenesDeTrabajoAgrupadas, traerOrdenesDeTrabajoAsignadas, crearOrdenDeTrabajo, modificarOrdenDeTrabajo,
            finalizarOrdenDeTrabajo, registrarVisitaOrdenDeTrabajo, eliminarOrdenDeTrabajo,
            traerMovimientosPorFecha, crearMovimiento,
            traerConceptos,
            mostrarSpinner, mostrarSpinnerDescarga,
            traerCaja, cerrarCaja,
            descargarComprobante, traerFacturasPorAbonado, traerRecibosPorAbonado
        }}>{props.children}
        </AppContext.Provider>
    )
};
export default AppState;