
import React from 'react';
import { Page, Document, StyleSheet, Image, Text, View, Font } from '@react-pdf/renderer';
import logo from './../../../../assets/images/logo-ts-transparente.png';
import logo2 from './../../../../assets/images/olinet.png';
import dobleArrow from './../../../../assets/images/doble-arrow.png';
import tripleArrow from './../../../../assets/images/triple-arrow.png';

import OpenSans from '../../../../assets/fonts/OpenSans.ttf'
import OpenSansBold from '../../../../assets/fonts/OpenSansBold.ttf'
import OpenSansItalic from '../../../../assets/fonts/OpenSansItalic.ttf'

import convertirAFecha from './../../../../helpers/ConvertirAFecha';
import convertirAHora from './../../../../helpers/ConvertirAHora';

Font.register({
    family: 'OpenSans',
    src: OpenSans
});

Font.register({
    family: 'OpenSansBold',
    src: OpenSansBold
});

Font.register({
    family: 'OpenSansItalic',
    src: OpenSansItalic
});

  const styles = StyleSheet.create({
    page: {
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 14,
        fontFamily: "OpenSans",
    },
    title: { display: "inline" },
    inline: { display: "inline" },
    h1: {
        textTransform: "uppercase",
        marginTop: 20,
        fontFamily: "OpenSansBold",
    },
    h2: {
        textTransform: "uppercase",
        fontFamily: "OpenSansBold",
        textAlign: 'center',
        padding: 3
    },
    h3: {
        textTransform: "uppercase",
        fontFamily: "OpenSansBold",
        fontSize: 8,
        padding: 3
    },
    h4: {
        fontFamily: "OpenSans",
        fontSize: 8,
    },
    img: { width: "60px", height: "60px" },
    flexTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        border: "1px solid #000",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        border: "1px solid #000",
    },
    flexRowNoBorder: {
        display: "flex",
        flexDirection: "row",
    },
    flexRowBorderTopBottom: {
        display: "flex",
        flexDirection: "row",
        textAlign: 'center',
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000'
    },
    flexColumn: {
        flex: '1 1 0'
    },
    flexColumnBorderLeft: {
        flex: '1 1 0',
        borderLeft: "1px solid #000",
    },
    flexColumnGrey: {
        flex: '1 1 0',
        backgroundColor: 'grey'
    },
    flexColumnCenterBorderRight: {
        flex: '1 1 0',
        borderRight: "1px solid #000",
        textAlign: 'center'
    },
    flexColumnHalf: {
        flex: '1.5 1 0',
    },
    flexColumnHalfCenter: {
        flex: '1.5 1 0',
        textAlign: 'center'
    },
    p: {
        fontSize: 8,
        fontFamily: 'OpenSansItalic',
        textAlign: 'center',
        padding: 3
    },
    observaciones: {
        fontSize: 8,
        display: 'inline-block'
    },
    label :{
        textTransform: 'uppercase',
        fontSize: 8,
    },
    checkBox: {
        width: 20,
        height: 15,
        border: '2px dotted #000',
        borderRadius: 5,
        marginLeft: 5,
    },
    verificoSeñal: {
        backgroundColor: "white",
        paddingLeft: 5,
        paddingRight: 15,
        left: 10,
        position: 'absolute',
        zIndex: 1,
        bottom: 3,
        paddingTop: 0
    },
    arrow: {
        width: '60px',
        height: '35px'
    },
    x: {
        fontSize: 8,
        fontFamily: 'OpenSansItalic',
        position: 'relative',
        right: 13
    }
}
);
  

const OtCaratula = ({tareas, data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
        <View style={styles.title}>
            <View style={styles.flexTitle}>
                <Image style={styles.img} src={logo}/>
                <Text style={styles.h1}>Orden de Trabajo N°: {data.OtId}</Text>
                <Image style={styles.img} src={logo2}/>
            </View>

            <View style={styles.flexRow}>
                <Text style={styles.h3}>Responsable de emisión de ot: <Text style={styles.h4}>{data.RegistroOt.NombreCompletoUsuarioRegistro}</Text></Text>            
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Responsable de ejecución: <Text style={styles.h4}>{data.TecnicoResponsableOt.NombreCompletoTecnicoResponsable}</Text></Text>            
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h3}>Hora: <Text style={styles.h4}>{convertirAHora(data.createdAt)}</Text></Text>            
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Fecha de emisión ot: <Text style={styles.h4}>{convertirAFecha(data.createdAt)}</Text></Text>            
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h3}>Teléfono: <Text style={styles.h4}>3884136357</Text></Text>            
                </View>
            </View>

            <View style={styles.flexRow}>
                <Text style={styles.h3}>Abonado: <Text style={styles.h4}>{data.AbonadoOt.NombreCompletoAbonado}</Text></Text>            
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Barrio: <Text style={styles.h4}>{data.AbonadoOt.DomicilioAbonado.Barrio.BarrioNombre}</Text></Text>            
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h3}>Localidad: <Text style={styles.h4}>{data.AbonadoOt.DomicilioAbonado.Barrio.Municipio.MunicipioNombre}</Text></Text>            
                </View>
            </View>

            <View style={styles.flexRow}>
                <Text style={styles.h3}>Domicilio: <Text style={styles.h4}>{data.AbonadoOt.DomicilioAbonado.DomicilioCompleto}</Text></Text>            
            </View>

            <View style={styles.flexRow}>
                <Text style={styles.h3}>Día y horario de visita: <Text style={styles.h4}>{convertirAFecha(data.OtFechaPrevistaVisita)}-{convertirAHora(data.OtFechaPrevistaVisita)}</Text></Text>            
            </View>

            <View style={styles.flexRow}>
                <Text style={styles.h3}>Comentario: <Text style={styles.h4}>{data.OtObservacionesResponsableEmision}</Text></Text>            
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumnCenterBorderRight}>
                    <Text style={styles.h2}>Tarea a realizar</Text>            
                </View>
                <View style={styles.flexColumnHalfCenter}>
                    <Text style={styles.p}>Observaciones por parte del responsable de emisión de la orden de trabajo</Text>            
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Bajada de cable</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 1) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}></Text>
                </View>
                <View style={styles.flexColumn}></View>
                <View style={styles.flexColumn}></View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Reconexión cable</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 2) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Observación:</Text>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Cable coaxil</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 2 && t.ottarea.OtTareaObservaciones === "Coaxil") ? "x" : ""}</Text>
                    </View>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Fibra óptica</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 2 && t.ottarea.OtTareaObservaciones === "Fibra") ? "x" : ""}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Desconexión cable</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 3) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Observación:</Text>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Cable coaxil</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 3 && t.ottarea.OtTareaObservaciones === "Coaxil") ? "x" : ""}</Text>
                    </View>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Fibra óptica</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 3 && t.ottarea.OtTareaObservaciones === "Fibra") ? "x" : ""}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Cambio de línea coaxil a fibra</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 4) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}></Text>
                </View>
                <View style={styles.flexColumn}></View>
                <View style={styles.flexColumn}></View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Bajada internet</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 5) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Onu simple</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 5 && t.ottarea.OtTareaObservaciones === "Onu simple") ? "x" : ""}</Text>
                    </View>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Onu combinada</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 5 && t.ottarea.OtTareaObservaciones === "Onu combinada") ? "x" : ""}</Text>
                    </View>
                </View>
                <View style={styles.flexColumn}>
                    <Text style={styles.observaciones}>Velocidad contratada:</Text>
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Reconexión internet</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 6) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}></Text>
                </View>
                <View style={styles.flexColumn}></View>
                <View style={styles.flexColumn}></View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Desconexión internet</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 7) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Retirar onu:</Text>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Si</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 7 && t.ottarea.OtTareaObservaciones === "Retira onu") ? "x" : ""}</Text>
                    </View>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>No</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 7 && !t.ottarea.OtTareaObservaciones) ? "x" : ""}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Arreglo de señal por cable</Text>
                    <Image style={styles.arrow} src={dobleArrow}/>
                    <View style={{position: 'absolute', left: 50, top: 38}}>
                        <Text style={{fontSize: 7}}>Sin señal</Text>
                        <Text style={{fontSize: 7, paddingTop: 5}}>Ve mal</Text>
                    </View>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <View style={{position: 'absolute', left: 50, top: 38}}>
                        <Text style={{fontSize: 7}}>{tareas.some((t)=> t.TareaId === 8) ? "x" : ""}</Text>
                        <Text style={{fontSize: 7, paddingTop: 5}}>{tareas.some((t)=> t.TareaId === 9) ? "x" : ""}</Text>
                    </View>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Observación:</Text>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Cable Coaxil</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> (t.TareaId === 7 && t.ottarea.OtTareaObservaciones === "Coaxil") || (t.TareaId === 8 && t.ottarea.OtTareaObservaciones === "Coaxil")) ? "x" : ""}</Text>

                    </View>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Fibra óptica</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> (t.TareaId === 7 && t.ottarea.OtTareaObservaciones === "Fibra") || (t.TareaId === 8 && t.ottarea.OtTareaObservaciones === "Fibra")) ? "x" : ""}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Arreglo internet</Text>
                    <Image style={styles.arrow} src={tripleArrow}/>
                    <View style={{position: 'absolute', left: 50, top: 22}}>
                        <Text style={{fontSize: 7}}>Sin señal</Text>
                        <Text style={{fontSize: 7}}>Funciona lento</Text>
                        <Text style={{fontSize: 7}}>Se corta</Text>
                    </View>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                <Text style={styles.h3}></Text>
                    <View style={{position: 'absolute', left: 50, top: 22}}>
                        <Text style={{fontSize: 7}}>{tareas.some((t)=> t.TareaId === 11) ? "x" : ""}</Text>
                        <Text style={{fontSize: 7}}>{tareas.some((t)=> t.TareaId === 12) ? "x" : ""}</Text>
                        <Text style={{fontSize: 7}}>{tareas.some((t)=> t.TareaId === 13) ? "x" : ""}</Text>
                    </View>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Observación:</Text>
                </View>
                <View style={styles.flexColumn}>
                </View>
                <View style={styles.flexColumn}>
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Cambio de domicilio cable</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 14) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Domicilio de retiro:</Text>
                </View>
                <View style={styles.flexColumn}>
                    <Text style={styles.observaciones}></Text>
                </View>
                <View style={styles.flexColumn}>
                    <Text style={styles.observaciones}>Nuevo domicilio:</Text>
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Cambio de domicilio internet</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 15) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Domicilio de retiro:</Text>
                </View>
                <View style={styles.flexColumn}>
                    <Text style={styles.observaciones}></Text>
                </View>
                <View style={styles.flexColumn}>
                    <Text style={styles.observaciones}>Nuevo domicilio:</Text>
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Corte de cable</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 16) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Retirar cable:</Text>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Si</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 16 && t.ottarea.OtTareaObservaciones === "Retira cable") ? "x" : ""}</Text>
                    </View>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>No</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 16 && !t.ottarea.OtTareaObservaciones) ? "x" : ""}</Text>

                    </View>
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Corte de internet</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 17) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Retirar onu:</Text>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>Si</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 17 && t.ottarea.OtTareaObservaciones === "Retira onu") ? "x" : ""}</Text>
                    </View>
                </View>
                <View style={styles.flexColumn}>
                    <View style={styles.flexRowNoBorder}>
                        <Text style={styles.label}>No</Text>
                        <View style={styles.checkBox}></View>
                        <Text style={styles.x}>{tareas.some((t)=> t.TareaId === 17 && !t.ottarea.OtTareaObservaciones) ? "x" : ""}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Corrección de línea</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 18) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Observación:</Text>
                </View>
                <View style={styles.flexColumn}></View>
                <View style={styles.flexColumn}></View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Configuración de onu</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.p}>{tareas.some((t)=> t.TareaId === 20) ? "x" : ""}</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.observaciones}>Observación:</Text>
                </View>
                <View style={styles.flexColumn}></View>
                <View style={styles.flexColumn}></View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumnGrey}>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h3}>1° visita</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h3}>2° visita</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h3}>3° visita</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}></View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Fecha de realización:</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h4}>
                        {data.OtPrimeraVisita && !data.OtSegundaVisita && !data.OtTerceraVisita?
                            convertirAFecha(data.OtFechaFinalizacion)
                        : ""}
                    </Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h4}>
                        {data.OtPrimeraVisita && data.OtSegundaVisita && !data.OtTerceraVisita?
                            convertirAFecha(data.OtFechaFinalizacion)
                        : ""}
                    </Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h4}>
                        {data.OtPrimeraVisita && data.OtSegundaVisita && data.OtTerceraVisita ?
                            convertirAFecha(data.OtFechaFinalizacion)
                        : ""}
                    </Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <View style={styles.verificoSeñal}>
                        <Text style={styles.p}>
                            ¿Se verificó señal?
                        </Text>
                        <View style={styles.flexRowNoBorder}>
                            {data.OtSeVerificoSeñal === 1 ?
                            <>
                                <Text style={styles.label}>Si</Text>
                                <View style={styles.checkBox}></View>
                                <Text style={styles.x}>x</Text>
                                <Text style={styles.label}>No</Text>
                                <View style={styles.checkBox}></View>
                            </>
                            :
                            <>
                                <Text style={styles.label}>Si</Text>
                                <View style={styles.checkBox}></View>
                                <Text style={styles.label}>No</Text>
                                <View style={styles.checkBox}></View>
                                <Text style={styles.x}>x</Text>
                            </>
                            }
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Hora de inicio:</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h4}>
                        {data.OtPrimeraVisita && !data.OtSegundaVisita && !data.OtTerceraVisita?
                            convertirAHora(data.OtFechaInicio)
                        : ""}
                    </Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h4}>
                        {data.OtPrimeraVisita && data.OtSegundaVisita && !data.OtTerceraVisita?
                            convertirAHora(data.OtFechaInicio)
                        : ""}
                    </Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h4}>
                        {data.OtPrimeraVisita && data.OtSegundaVisita && data.OtTerceraVisita ?
                            convertirAHora(data.OtFechaInicio)
                        : ""}
                    </Text>
                </View>
                <View style={styles.flexColumnBorderLeft}></View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Hora de finalización:</Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h4}>
                        {data.OtPrimeraVisita && !data.OtSegundaVisita && !data.OtTerceraVisita ?
                            convertirAHora(data.OtFechaFinalizacion)
                        : ""}
                    </Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h4}>
                        {data.OtPrimeraVisita && data.OtSegundaVisita && !data.OtTerceraVisita ?
                            convertirAHora(data.OtFechaFinalizacion)
                        : ""}
                    </Text>
                </View>
                <View style={styles.flexColumnBorderLeft}>
                    <Text style={styles.h4}>
                        {data.OtPrimeraVisita && data.OtSegundaVisita && data.OtTerceraVisita ?
                            convertirAHora(data.OtFechaFinalizacion)
                        : ""}
                    </Text>
                </View>
                <View style={styles.flexColumnBorderLeft}></View>
            </View>

            <View style={styles.flexRow}>
                <Text style={styles.h3}>Responsable de ejecución: <Text style={styles.h4}>{data.TecnicoResponsableOt.NombreCompletoTecnicoResponsable}</Text></Text>            
            </View>

            <View style={styles.flexRow}>
                <Text style={styles.h3}>Auxiliar de línea: <Text style={styles.h4}>{data.TecnicoAuxiliarOt ? data.TecnicoAuxiliarOt.NombreCompletoAuxiliarDeLinea: '-'}</Text></Text>            
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Señal de luz (dbm): <Text style={styles.h4}>{data.OtSeñalDeLuz ? data.OtSeñalDeLuz : "-"}</Text></Text>            
                </View>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Señal de internet (dbm): <Text style={styles.h4}>{data.OtSeñalDeInternet ? data.OtSeñalDeInternet : "-"}</Text></Text>            
                </View>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Velocidad (mb): <Text style={styles.h4}>{data.OtVelocidad ? data.OtVelocidad : "-"}</Text></Text>            
                </View>
            </View>

            <View style={styles.flexRow}>
                <View style={styles.flexColumn}>
                    <Text style={styles.h3}>Observaciones: <Text style={styles.h4}></Text></Text>     
                </View>      
            </View>
        </View>

    </Page>
  </Document>
);

export default OtCaratula;