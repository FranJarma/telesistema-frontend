function convertirAHora (timestamp) {
    const fecha = new Date(timestamp);
    return fecha.toLocaleTimeString();
}

export default convertirAHora;