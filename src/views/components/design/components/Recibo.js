
import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import AppContext from '../../../../context/appContext';
import ReciboCaratula from './ReciboCaratula';


const Recibo = ({data}) => {
  const appContext = useContext(AppContext);
  const { descargarComprobante, descargando } = appContext;
  return (
    <>
      <Typography style={{color: 'navy'}} onClick={() => descargarComprobante("Recibo", <ReciboCaratula data={data}/>, data)}>
      <i style={{color: "navy"}} className={!descargando ? 'bx bx-file bx-sm' : 'bx bx-loader bx-spin'}>
      </i>
      {!descargando ? "Descargar recibo" : "Espere por favor..."}
      </Typography>
    </>
  );
}

export default Recibo;