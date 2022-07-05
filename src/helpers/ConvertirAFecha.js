function convertirAFecha (timestamp) {
    const fecha = new Date(timestamp);
    return fecha.toLocaleDateString();
}

export default convertirAFecha;