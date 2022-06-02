import { QRCodeCanvas } from "qrcode.react";

const GenerateBase64Afip = (respuesta) => {
    const dataObject = {"ver":respuesta.data.FacturaVersion,"fecha":respuesta.data.FacturaFechaEmision,"cuit":respuesta.data.FacturaCuitEmisor,"ptoVta":respuesta.data.FacturaPuntoVenta,"tipoCmp":respuesta.data.FacturaTipoComprobante,"nroCmp":respuesta.data.FacturaNumeroComprobante,"importe":respuesta.data.FacturaImporte,"moneda":respuesta.data.FacturaMoneda,"ctz":respuesta.data.FacturaCotizacion,"tipoDocRec":respuesta.data.FacturaTipoDocReceptor,"nroDocRec":respuesta.data.FacturaNroDocReceptor,"tipoCodAut":respuesta.data.FacturaTipoCodigoAutorizacion,"codAut":respuesta.data.FacturaCodigoAutorizacion}
    const jsonDataObject = JSON.stringify(dataObject);
    const encodedBase64 = Buffer.from(jsonDataObject).toString('base64');
    const afipUrl = `https://www.afip.gob.ar/fe/qr/?p=${encodedBase64}`;
    
    return <QRCodeCanvas style={{display: 'none'}} value ={afipUrl}/>
}
 
export default GenerateBase64Afip;


