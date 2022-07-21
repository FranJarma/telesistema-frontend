import * as TYPES from '../types';
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    let pago = null;
    let ot = null;
    switch (action.type) {
        case TYPES.SET_ERRORES:
            return {
                ...state,
                errores: action.payload
            }
        
        case TYPES.UNSET_ERRORES:
            return {
                ...state,
                errores: []
            }

        case TYPES.LOGIN_EXITOSO:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                token: localStorage.getItem('token'),
                usuarioAutenticado: true
        }
        case TYPES.OBTENER_INFO_USUARIO:
            localStorage.setItem('u_info', JSON.stringify(action.payload.u_info));
            localStorage.setItem('u_roles', JSON.stringify(action.payload.u_roles));
            return {
                ...state,
                usuarioAutenticado: true,
                push: true
        }
        case TYPES.CERRAR_SESION:
            localStorage.removeItem('token');
            localStorage.removeItem('u_info');
            localStorage.removeItem('u_roles');
            return {
                ...state,
                usuarioAutenticado: false,
                token: null,
                push: false
        }
        case TYPES.CREAR_USUARIO:
            return {
                ...state,
                usuarios: [action.payload, ...state.usuarios],
        }
        case TYPES.ELIMINAR_USUARIO: {
            return {
                ...state,
                usuarios: state.usuarios.filter(usuario => usuario.UserId !== action.payload.UserId),
            };
        }
        case TYPES.LISTA_USUARIOS: {
            return {
                ...state,
                usuarios: action.payload
            }
        }
        case TYPES.LISTA_ROLES: {
            return {
                ...state,
                roles: action.payload
            }
        }
        case TYPES.ELIMINAR_ROL: {
            return {
                ...state,
                roles: state.roles.filter(rol => rol.RoleId !== action.payload.RoleId),
            };
        }
        case TYPES.LISTA_ROLES_USER: {
            return {
                ...state,
                rolesUser: action.payload
            }
        }
        case TYPES.LISTA_PERMISOS: {
            return {
                ...state,
                permisos: action.payload
            }
        }
        case TYPES.LISTA_PERMISOS_ROL: {
            return {
                ...state,
                permisosRol: action.payload
            }
        }
        case TYPES.CREAR_ABONADO:
            return {
                ...state,
                registrado: true,
                comprobante: action.payload
        }
        case TYPES.CAMBIO_DOMICILIO_ABONADO: {
            return {
                ...state,
                registrado: true,
                comprobante: action.payload[0],
                historialDomicilios: [{
                    createdAt: new Date().toISOString(),
                    CambioDomicilioObservaciones: 'Esperando finalización de OT. Una vez finalizada, este pasará a ser el nuevo domicilio del abonado',
                    Domicilio: {
                        DomicilioCalle: action.payload[1].DomicilioCalle,
                        DomicilioNumero: action.payload[1].DomicilioNumero,
                        Barrio: {
                            BarrioNombre: action.payload[1].Barrio.BarrioNombre,
                            Municipio: {
                                MunicipioNombre: action.payload[1].Municipio.MunicipioNombre,
                            }
                        }
                    },
                    OtUDomicilio: {
                        OtFechaFinalizacion: null
                    }
                }, ...state.historialDomicilios]
            };
        }
        case TYPES.CAMBIO_SERVICIO_ABONADO: {
            return {
                ...state,
                registrado: true,
                comprobante: action.payload[0],
                historialServicios: [{
                    createdAt: new Date().toISOString(),
                    CambioServicioObservaciones: 'Esperando finalización de OT. Una vez finalizada, este pasará a ser el nuevo servicio del abonado',
                    Servicio: {
                        ServicioNombre: action.payload[1].Servicio.ServicioNombre,
                    },
                    Onu: {
                        OnuMac: ""
                    },
                    OtUServicio: {
                        OtFechaFinalizacion: null
                    }
                }, ...state.historialServicios]
            };
        }
        case TYPES.RENOVAR_CONTRATO_ABONADO: {
            let abonado = state.abonados.find(abonado => abonado.UserId === action.payload.UserId);
            abonado.FechaVencimientoServicio = new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString();
            return {
                ...state,
                abonados: [...state.abonados]
            }
        }
        case TYPES.CAMBIAR_ESTADO_ABONADO: {
            return {
                ...state,
                abonados: state.abonados.filter(abonado => abonado.UserId !== action.payload.UserId)
            };
        }
        case TYPES.LISTA_ABONADOS:
        case TYPES.LISTA_ABONADOS_INSCRIPTOS:
        case TYPES.LISTA_ABONADOS_ACTIVOS:
        case TYPES.LISTA_ABONADOS_INACTIVOS:
            return {
                ...state,
                abonados: action.payload,
        }
        case TYPES.TRAER_ABONADO:
            return {
                ...state,
                abonado: action.payload
        }
        case TYPES.LISTA_DOMICILIOS_ABONADO: 
            return {
                ...state,
                historialDomicilios: action.payload
            }
        case TYPES.LISTA_SERVICIOS_ABONADO: 
            return {
                ...state,
                historialServicios: action.payload
        }
        case TYPES.LISTA_BARRIOS:
            return {
                ...state,
                barrios: action.payload,
        }
        case TYPES.CREAR_BARRIO:
            return {
                ...state,
                barrios: [action.payload, ...state.barrios],
        }
        case TYPES.EDITAR_BARRIO:
            return {
                ...state,
                barrios: state.barrios.map(barrio => barrio.BarrioId === action.payload.BarrioId ? action.payload : barrio),
        } 
        case TYPES.ELIMINAR_BARRIO:
            return {
                ...state,
                barrios: state.barrios.filter(barrio => barrio.BarrioId !== action.payload.BarrioId),
        } 
        case TYPES.LISTA_CONDICIONES_IVA:
            return {
                ...state,
                condicionesIva: action.payload,
        }
        case TYPES.LISTA_MUNICIPIOS:
            return {
                ...state,
                municipios: action.payload,
        }
        case TYPES.CREAR_MUNICIPIO:
            return {
                ...state,
                municipios: [action.payload, ...state.municipios],
        }
        case TYPES.EDITAR_MUNICIPIO:
            return {
                ...state,
                municipios: state.municipios.map(servicio => servicio.MunicipioId === action.payload.MunicipioId ? action.payload : servicio),
        } 
        case TYPES.ELIMINAR_MUNICIPIO:
            return {
                ...state,
                municipios: state.municipios.filter(servicio => servicio.MunicipioId !== action.payload.MunicipioId),
        } 
        case TYPES.LISTA_PROVINCIAS:
            return {
                ...state,
                provincias: action.payload,
        }
        case TYPES.LISTA_SERVICIOS:
            return {
                ...state,
                servicios: action.payload,
        }
        case TYPES.CREAR_SERVICIO:
            return {
                ...state,
                servicios: [action.payload, ...state.servicios],
        }
        case TYPES.EDITAR_SERVICIO:
            return {
                ...state,
                servicios: state.servicios.map(servicio => servicio.ServicioId === action.payload.ServicioId ? action.payload : servicio),
        } 
        case TYPES.ELIMINAR_SERVICIO:
            return {
                ...state,
                servicios: state.servicios.filter(servicio => servicio.ServicioId !== action.payload.ServicioId),
        } 
        case TYPES.TRAER_ONU:
            return {
                ...state,
                onu: action.payload
        }
        case TYPES.LISTA_ONUS:
            return {
                ...state,
                onus: action.payload
        }
        case TYPES.CREAR_ONU:
            return {
                ...state,
                onus: [action.payload, ...state.onus],
        }
        case TYPES.EDITAR_ONU:
            return {
                ...state,
                onus: state.onus.map(onu => onu.OnuId === action.payload.OnuId ? action.payload : onu),
        } 
        case TYPES.ELIMINAR_ONU:
            return {
                ...state,
                onus: state.onus.filter(onu => onu.OnuId !== action.payload.OnuId),
        } 
        case TYPES.LISTA_MODELOS_ONU:
            return {
                ...state,
                modelosONU: action.payload
        }
        case TYPES.CREAR_MODELO_ONU:
            return {
                ...state,
                modelosONU: [action.payload, ...state.modelosONU],
        }
        case TYPES.EDITAR_MODELO_ONU:
            return {
                ...state,
                modelosONU: state.modelosONU.map(modeloONU => modeloONU.ModeloOnuId === action.payload.ModeloOnuId ? action.payload : modeloONU),
        } 
        case TYPES.ELIMINAR_MODELO_ONU:
            return {
                ...state,
                modelosONU: state.modelosONU.filter(modeloONU => modeloONU.ModeloOnuId !== action.payload.ModeloOnuId),
        } 
        case TYPES.LISTA_MEDIOS_DE_PAGO:
            return {
                ...state,
                mediosPago: action.payload
        }
        case TYPES.CREAR_MEDIO_DE_PAGO:
            return {
                ...state,
                mediosPago: [action.payload, ...state.mediosPago],
        }
        case TYPES.EDITAR_MEDIO_DE_PAGO:
            return {
                ...state,
                mediosPago: state.mediosPago.map(medioPago => medioPago.MedioPagoId === action.payload.MedioPagoId ? action.payload : medioPago),
        } 
        case TYPES.ELIMINAR_MEDIO_DE_PAGO:
            return {
                ...state,
                mediosPago: state.mediosPago.filter(medioPago => medioPago.MedioPagoId !== action.payload.MedioPagoId),
        } 
        case TYPES.LISTA_PAGOS_ABONADO:
            return {
                ...state,
                pagos: action.payload
        }
        case TYPES.LISTA_FACTURAS_ABONADO:
            return {
                ...state, 
                facturas: action.payload
        }
        case TYPES.LISTA_RECIBOS_ABONADO:
            return {
                ...state, 
                recibos: action.payload
        }
        case TYPES.LISTA_PAGOS_PENDIENTES_ABONADO:
            return {
                ...state,
                pagosPendientes: action.payload
        }
        case TYPES.LISTA_PAGOS_PENDIENTES_ABONADO_TOP:
            return {
                ...state,
                pagosPendientesTop: action.payload
        }
        case TYPES.TRAER_PAGO:
            return {
                ...state,
                pago: action.payload
        }
        case TYPES.CREAR_PAGO: 
            pago = state.pagos.find(pago => pago.PagoId === action.payload[1].PagoInfo.PagoId);
            pago.PagoSaldo = pago.PagoSaldo - parseInt(action.payload[1].PagoInfo.DetallePagoMonto);
            pago.PagoObservaciones=  action.payload[1].PagoInfo.PagoObservaciones;
            return {
                ...state,
                registrado: true,
                comprobante: action.payload[0],
                pagos: [...state.pagos]
        }
        case TYPES.CREAR_PAGO_ADELANTADO:
            const pagoN     =  parseInt(action.payload[1].PagoAdelantadoInfo.CantidadMesesAPagar) - 1;
            const desde     = action.payload[1].MesesAPagar[0].PagoMes + "/"
                            + action.payload[1].MesesAPagar[0].PagoAño;
            const hasta     = action.payload[1].MesesAPagar[pagoN].PagoMes + "/"
                            + action.payload[1].MesesAPagar[pagoN].PagoAño;
            const ids       = []

            action.payload[1].MesesAPagar.forEach(e => ids.push(e.PagoId))

            state.pagos.forEach(e => {
                if(e && ids.includes(e.PagoId)) {
                    e.PagoSaldo = 0;
                    e.PagoObservaciones = `Pago adelantado desde ${desde} hasta ${hasta}`
                }
            });

            return {
                ...state,
                registrado: true,
                comprobante: action.payload[0],
                pagos: [...state.pagos]
    }
        case TYPES.AGREGAR_RECARGO:
            pago = state.pagos.find(pago => pago.PagoId === action.payload.PagoId);
            pago.PagoRecargo = pago.PagoRecargo + parseInt(action.payload.PagoRecargo);
            pago.PagoSaldo = pago.PagoSaldo + parseInt(action.payload.PagoRecargo);
            return {
                ...state,
                pagos: [...state.pagos]
        }
        case TYPES.ELIMINAR_RECARGO:
            pago = state.pagos.find(pago => pago.PagoId === action.payload.PagoId);
            pago.PagoSaldo = pago.PagoSaldo - pago.PagoRecargo;
            pago.PagoRecargo = 0;
            return {
                ...state,
                pagos: [...state.pagos]
        }
        case TYPES.DATOS_INSCRIPCION:
            return {
                ...state,
                inscripcion: {
                    PagoTotal: action.payload.PagoTotal,
                    PagoSaldo: action.payload.PagoSaldo
                },
                detallesInscripcion: action.payload.Detalles
        }
        case TYPES.LISTA_DETALLES_PAGO_ABONADO:
            return {
                ...state,
                detallesPago: action.payload
        }
        case TYPES.ELIMINAR_DETALLE_PAGO:
            pago = state.pagos.find(pago => pago.PagoId === action.payload.PagoId);
            pago.PagoSaldo = pago.PagoSaldo + action.payload.DetallePagoMonto;
            return {
                ...state,
                detallesPago: state.detallesPago.filter(detallePago => detallePago.DetallePagoId !== action.payload.DetallePagoId),
                pagos: [...state.pagos]

        }
        case TYPES.LISTA_TAREAS:
            return {
                ...state,
                tareas: action.payload,
        }
        case TYPES.CREAR_TAREA:
            return {
                ...state,
                tareas: [action.payload, ...state.tareas],
        }
        case TYPES.EDITAR_TAREA:
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea.TareaId === action.payload.TareaId ? action.payload : tarea),
        } 
        case TYPES.ELIMINAR_TAREA:
            return {
                ...state,
                tareas: state.tareas.filter(tarea => tarea.TareaId !== action.payload.TareaId),
        } 
        case TYPES.LISTA_OT: {
            return {
                ...state,
                ordenesDeTrabajo: action.payload
            }
        }
        case TYPES.LISTA_OT_AGRUPADA: {
            return {
                ...state,
                ordenesDeTrabajoAgrupadas: action.payload
            }
        }
        case TYPES.REGISTRAR_VISITA_OT:
            ot = state.ordenesDeTrabajo.find(ot => ot.OtId === action.payload.OtId);
            if(ot.OtPrimeraVisita === null) ot.OtPrimeraVisita = action.payload.FechaVisita.toISOString();
            else if(ot.OtPrimeraVisita !== null && ot.OtSegundaVisita === null) ot.OtSegundaVisita = action.payload.FechaVisita.toISOString();
            else if(ot.OtPrimeraVisita !== null && ot.OtSegundaVisita !== null && ot.OtTerceraVisita === null) ot.OtTerceraVisita = action.payload.FechaVisita.toISOString();

            return {
                ...state,
                ordenesDeTrabajo: [...state.ordenesDeTrabajo]
        } 
        case TYPES.FINALIZAR_OT: {
            return {
                ...state,
                ordenesDeTrabajo: state.ordenesDeTrabajo.filter(ordenDeTrabajo => ordenDeTrabajo.OtId !== action.payload.OtId)
            }
        }
        case TYPES.LISTA_OT_ASIGNADAS: {
            return {
                ...state,
                ordenesDeTrabajoAsignadas: action.payload
            }
        }
        case TYPES.LISTA_TECNICOS_OT: {
            return {
                ...state,
                tecnicosOrdenDeTrabajo: action.payload
            }
        }
        case TYPES.LISTA_TAREAS_OT: {
            return {
                ...state,
                tareasOrdenDeTrabajo: action.payload
            }
        }
        case TYPES.CREAR_MOVIMIENTO:
            return {
                ...state,
                movimientos: [action.payload, ...state.movimientos],
        }
        case TYPES.LISTA_MOVIMIENTOS: {
            return {
                ...state,
                movimientos: action.payload
            }
        }
        case TYPES.LISTA_CONCEPTOS: {
            return {
                ...state,
                conceptos: action.payload
            }
        }
        case TYPES.MOSTRAR_SPINNER:
            return {
                ...state,
                cargando: true
            }
        case TYPES.OCULTAR_SPINNER:
            return {
                ...state,
                cargando: false,
            }
        case TYPES.MOSTRAR_SPINNER_DESCARGA:
            return {
                ...state,
                descargando: true
            }
        case TYPES.OCULTAR_SPINNER_DESCARGA:
            return {
                ...state,
                descargando: false,
            }
        case TYPES.TRAER_CAJA:
            return {
                ...state,
                cajas: action.payload
        }
        case TYPES.CERRAR_CAJA:
            return {
                ...state,
                cajas: [{...action.payload, CajaCerradaFecha: new Date().toISOString()}] //isoString es el formato de MYSQL
        }
        case TYPES.REINICIALIZAR_CAJA:
            return {
                ...state,
                cajas: {}
        }
        case TYPES.TAREA_CAMBIO_DOMICILIO:
            return {
                ...state,
                tareaCambioDomicilio: action.payload
        }
        case TYPES.DESCARGAR_COMPROBANTE: 
            return {
                ...state,
                descargando: true,
                registrado: false
        }
        default:
            return state;
    }
};