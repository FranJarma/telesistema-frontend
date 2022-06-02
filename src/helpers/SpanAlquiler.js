
const spanAlquiler = ({domicilio}) => {
    return(
        <>
            <span style={{backgroundColor: 'teal', color:"#e2e2e2", borderRadius: 10, padding: 2}}><i class='bx bxs-key'></i>Alquiler<br/></span>
            <span>{domicilio}</span>
        </>
    )
}

export default spanAlquiler;
