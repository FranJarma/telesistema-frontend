
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { QRCodeCanvas } from 'qrcode.react';
import AppContext from '../../../../context/appContext';
import FacturaCaratula from './FacturaCaratula';
import ReciboCaratula from './ReciboCaratula';
import { useNavigate } from 'react-router-dom';

const ComprobanteButton = ({data, tipo, funcionModal = null}) => {
  const appContext = useContext(AppContext);
  const { descargando, descargarComprobante } = appContext;
  const dataObject = 0 ??{"ver":data.FacturaVersion,"fecha":data.FacturaFechaEmision,"cuit":data.FacturaCuitEmisor,"ptoVta":data.FacturaPuntoVenta,"tipoCmp":data.FacturaTipoComprobante,"nroCmp":data.FacturaNumeroComprobante,"importe":data.FacturaImporte,"moneda":data.FacturaMoneda,"ctz":data.FacturaCotizacion,"tipoDocRec":data.FacturaTipoDocReceptor,"nroDocRec":data.FacturaNroDocReceptor,"tipoCodAut":data.FacturaTipoCodigoAutorizacion,"codAut":data.FacturaCodigoAutorizacion}
  const jsonDataObject = JSON.stringify(dataObject);
  const encodedBase64 = Buffer.from(jsonDataObject).toString('base64');
  const afipUrl = `https://www.afip.gob.ar/fe/qr/?p=${encodedBase64}`;
  const navigate = useNavigate();
  return (
    <>
      <QRCodeCanvas style={{display: 'none'}} value ={afipUrl}/>
      {!descargando ?
      <Button variant="contained" color="secondary" startIcon={<i className='bx bx-file'></i>}
      onClick={() =>
        {
          tipo==="Factura" && funcionModal
          ?
          descargarComprobante("Factura", <FacturaCaratula qr={<QRCodeCanvas/>} data={data}/>, data)
          .then(()=> funcionModal(false))
          : tipo==="Factura" && !funcionModal ?
          descargarComprobante("Factura", <FacturaCaratula qr={<QRCodeCanvas/>} data={data}/>, data)
          .then(()=> navigate(-1))
          : tipo==="Recibo" && funcionModal ?
          descargarComprobante("Recibo", <ReciboCaratula data={data}/>, data)
          .then(()=> funcionModal(false))
          :
          descargarComprobante("Recibo", <ReciboCaratula data={data}/>, data)
          .then(()=> navigate(-1))
        }}
      >
      {tipo === "Factura" ? "Descargar factura" : "Descargar recibo"}
      </Button>
      : <Button style={{color: "#fff"}} startIcon={<i className="bx bx-loader bx-spin"></i>} disabled variant="contained">Descargando...</Button>}
    </>
  );
}

export default ComprobanteButton;