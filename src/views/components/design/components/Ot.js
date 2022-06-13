
import React, { useContext, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import AppContext from '../../../../context/appContext';
import OtCaratula from './OtCaratula';


const Ot = ({data}) => {
  const appContext = useContext(AppContext);
  const { descargarComprobante, descargando, traerTareasOt, tareasOrdenDeTrabajo } = appContext;

  useEffect(() => {
    traerTareasOt(data.OtId);
  }, [])

  return (
    <>
      <Typography style={{color: 'navy'}} onClick={() => descargarComprobante("Ot", <OtCaratula tareas={tareasOrdenDeTrabajo} data={data}/>, data)}>
      <i style={{color: "navy"}} className={!descargando ? 'bx bx-file bx-xs' : 'bx bx-loader bx-spin'}>
      </i>
      {!descargando ? " Descargar orden de trabajo" : "Espere por favor..."}
      </Typography>
    </>
  );
}

export default Ot;