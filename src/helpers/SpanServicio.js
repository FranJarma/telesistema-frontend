
const spanServicio = ({servicioId, servicioNombre, onuMac}) => {

    if(servicioId === 1) {
        return <span  style={{color: 'navy'}}><i className='bx bx-tv bx-xs'></i> {servicioNombre}</span>
    }
    else if((servicioId === 2 || servicioId === 3) && onuMac) {
        return <span style={{color: '#4D7F9E'}}><i className='bx bx-wifi bx-xs'></i> {servicioNombre} - <b>MAC: </b> {onuMac}</span>
    }
    else if((servicioId === 2 || servicioId === 3) && onuMac === ""){
        return <span style={{color: '#4D7F9E'}}><i className='bx bx-wifi bx-xs'></i> {servicioNombre}</span>
    }
}

export default spanServicio;
