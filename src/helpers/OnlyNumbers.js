const onlyNumbers = e => {
    if (!/^[,0-9]+$/.test(e.key)) {
        e.preventDefault();
    }
}

export default onlyNumbers;