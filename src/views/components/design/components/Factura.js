
import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { QRCodeCanvas } from 'qrcode.react';
import AppContext from './../../../../context/appContext';
import FacturaCaratula from './FacturaCaratula';

const Factura = ({data, format = false}) => {
  const appContext = useContext(AppContext);
  const { descargarComprobante, descargando } = appContext;
  let formattedData = {
    ReciboId                                  : data.Movimiento.FacturaId,
    createdAt                                 : data.createdAt,
    ApellidoAbonado                           : data.Movimiento.MovimientoAbonado.Apellido,
    NombreAbonado                             : data.Movimiento.MovimientoAbonado.Nombre,
    AbonadoNumero                             : data.Movimiento.MovimientoAbonado.AbonadoNumero,
    Cuit                                      : data.Movimiento.MovimientoAbonado.Cuit,
    MunicipioNombre                           : data.Movimiento.MovimientoAbonado.DomicilioAbonado.Barrio.Municipio.MunicipioNombre,
    BarrioNombre                              : data.Movimiento.MovimientoAbonado.DomicilioAbonado.Barrio.BarrioNombre,
    DomicilioCalle                            : data.Movimiento.MovimientoAbonado.DomicilioAbonado.DomicilioCalle,
    DomicilioNumero                           : data.Movimiento.MovimientoAbonado.DomicilioAbonado.DomicilioNumero,
    ServicioNombre                            : data.Movimiento.MovimientoAbonado.ServicioAbonado.ServicioNombre,
    MovimientoCantidad                        : data.Movimiento.MovimientoCantidad,
    MovimientoConceptoNombre                  : data.Movimiento.MovimientoConcepto.MovimientoConceptoNombre,
    FacturaVersion                            : data.Movimiento.Factura.FacturaVersion,
    FacturaFechaEmision                       : data.Movimiento.Factura.FacturaFechaEmision,
    FacturaCuitEmisor                         : data.Movimiento.Factura.FacturaCuitEmisor,
    FacturaPuntoVenta                         : data.Movimiento.Factura.FacturaPuntoVenta,
    FacturaTipoComprobante                    : data.Movimiento.Factura.FacturaTipoComprobante,
    FacturaNumeroComprobante                  : data.Movimiento.Factura.FacturaNumeroComprobante,
    FacturaImporte                            : data.Movimiento.Factura.FacturaImporte,
    FacturaMoneda                             : data.Movimiento.Factura.FacturaMoneda,
    FacturaCotizacion                         : data.Movimiento.Factura.FacturaCotizacion,
    FacturaTipoDocReceptor                    : data.Movimiento.Factura.FacturaTipoDocReceptor,
    FacturaNroDocReceptor                     : data.Movimiento.Factura.FacturaNroDocReceptor,
    FacturaTipoCodigoAutorizacion             : data.Movimiento.Factura.FacturaTipoCodigoAutorizacion,
    FacturaCodigoAutorizacion                 : data.Movimiento.Factura.FacturaCodigoAutorizacion,
    FacturaFechaVencimientoCodigoAutorizacion : data.Movimiento.Factura.FacturaFechaVencimientoCodigoAutorizacion
  }
  const dataObject = 0 ??{
    "ver"           : format ? formattedData.FacturaVersion                 : data.FacturaVersion,
    "fecha"         : format ? formattedData.FacturaFechaEmision            : data.FacturaFechaEmision,
    "cuit"          : format ? formattedData.FacturaCuitEmisor              : data.FacturaCuitEmisor,
    "ptoVta"        : format ? formattedData.FacturaPuntoVenta              : data.FacturaPuntoVenta,
    "tipoCmp"       : format ? formattedData.FacturaTipoComprobante         : data.FacturaTipoComprobante,
    "nroCmp"        : format ? formattedData.FacturaNumeroComprobante       : data.FacturaNumeroComprobante,
    "importe"       : format ? formattedData.FacturaImporte                 : data.FacturaImporte,
    "moneda"        : format ? formattedData.FacturaMoneda                  : data.FacturaMoneda,
    "ctz"           : format ? formattedData.FacturaCotizacion              : data.FacturaCotizacion,
    "tipoDocRec"    : format ? formattedData.FacturaTipoDocReceptor         : data.FacturaTipoDocReceptor,
    "nroDocRec"     : format ? formattedData.FacturaNroDocReceptor          : data.FacturaNroDocReceptor,
    "tipoCodAut"    : format ? formattedData.FacturaTipoCodigoAutorizacion  : data.FacturaTipoCodigoAutorizacion,
    "codAut"        : format ? formattedData.FacturaCodigoAutorizacion      : data.FacturaCodigoAutorizacion
  }
  const jsonDataObject = JSON.stringify(dataObject);
  console.log(jsonDataObject);
  const encodedBase64 = Buffer.from(jsonDataObject).toString('base64');
  const afipUrl = `https://www.afip.gob.ar/fe/qr/?p=${encodedBase64}`;
  return (
    <>
      <QRCodeCanvas style={{display: 'none'}} value ={afipUrl}/>
        <Typography style={{color: 'navy'}} onClick={() => {
            descargarComprobante("Factura", <FacturaCaratula qr={<QRCodeCanvas/>} data={format ? formattedData : data}/>, format ? formattedData :data);
        }}>
        <i style={{color: "navy"}} className={!descargando ? 'bx bxs-file-pdf bx-sm' : 'bx bx-loader bx-spin'}></i>
        {!descargando ? "Descargar factura" : "Espere por favor..."}
        </Typography>
    </>
  );
}

export default Factura;