
import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { QRCodeCanvas } from 'qrcode.react';
import AppContext from './../../../../context/appContext';
import FacturaCaratula from './FacturaCaratula';

const Factura = ({data}) => {
  const appContext = useContext(AppContext);
  const { descargarComprobante, descargando } = appContext;
  const dataObject = 0 ??{"ver":data.FacturaVersion,"fecha":data.FacturaFechaEmision,"cuit":data.FacturaCuitEmisor,"ptoVta":data.FacturaPuntoVenta,"tipoCmp":data.FacturaTipoComprobante,"nroCmp":data.FacturaNumeroComprobante,"importe":data.FacturaImporte,"moneda":data.FacturaMoneda,"ctz":data.FacturaCotizacion,"tipoDocRec":data.FacturaTipoDocReceptor,"nroDocRec":data.FacturaNroDocReceptor,"tipoCodAut":data.FacturaTipoCodigoAutorizacion,"codAut":data.FacturaCodigoAutorizacion}
  const jsonDataObject = JSON.stringify(dataObject);
  const encodedBase64 = Buffer.from(jsonDataObject).toString('base64');
  const afipUrl = `https://www.afip.gob.ar/fe/qr/?p=${encodedBase64}`;
  return (
    <>
      <QRCodeCanvas style={{display: 'none'}} value ={afipUrl}/>
        <Typography style={{color: 'navy'}} onClick={() => {
            descargarComprobante("Factura", <FacturaCaratula qr={<QRCodeCanvas/>} data={data}/>, data);
        }}>
        <i style={{color: "navy"}} className={!descargando ? 'bx bxs-file-pdf bx-sm' : 'bx bx-loader bx-spin'}></i>
        {!descargando ? "Descargar factura" : "Espere por favor..."}
        </Typography>
    </>
  );
}

export default Factura;