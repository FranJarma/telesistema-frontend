
import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import AppContext from '../../../../context/appContext';
import ReciboCaratula from './ReciboCaratula';


const Recibo = ({data, format = false}) => { 
  const appContext = useContext(AppContext);
  const { descargarComprobante, descargando } = appContext;

  let formattedData = {
    ReciboId                : data.Movimiento.ReciboId,
    createdAt               : data.createdAt,
    ApellidoAbonado         : data.Movimiento.MovimientoAbonado.Apellido,
    NombreAbonado           : data.Movimiento.MovimientoAbonado.Nombre,
    AbonadoNumero           : data.Movimiento.MovimientoAbonado.AbonadoNumero,
    Cuit                    : data.Movimiento.MovimientoAbonado.Cuit,
    MunicipioNombre         : data.Movimiento.MovimientoAbonado.DomicilioAbonado.Barrio.Municipio.MunicipioNombre,
    BarrioNombre            : data.Movimiento.MovimientoAbonado.DomicilioAbonado.Barrio.BarrioNombre,
    DomicilioCalle          : data.Movimiento.MovimientoAbonado.DomicilioAbonado.DomicilioCalle,
    DomicilioNumero         : data.Movimiento.MovimientoAbonado.DomicilioAbonado.DomicilioNumero,
    ServicioNombre          : data.Movimiento.MovimientoAbonado.ServicioAbonado.ServicioNombre,
    MovimientoCantidad      : data.Movimiento.MovimientoCantidad,
    MovimientoConceptoNombre: data.Movimiento.MovimientoConcepto.MovimientoConceptoNombre
  }

  return (
    <>
      <Typography style={{color: 'navy'}} onClick={() => descargarComprobante("Recibo", <ReciboCaratula data={format ? formattedData : data}/>, format ? formattedData: data)}>
      <i style={{color: "navy"}} className={!descargando ? 'bx bx-file bx-sm' : 'bx bx-loader bx-spin'}>
      </i>
      {!descargando ? "Descargar recibo" : "Espere por favor..."}
      </Typography>
    </>
  );
}

export default Recibo;