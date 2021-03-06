import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#e2e2e2'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        textAlign: 'center',
        minHeight: 30,
        fontSize: 10,
        lineHeight: 1.5
    },
    codigo: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    producto: {
        width: '40%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    cantidad: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    unidadMedida: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    precioUnitario: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    porcentajeBonificacion: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    importeBonificacion: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    subtotal: {
        width: '20%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const FacturaTableRow = ({data}) => {
    const rows =
    <View style={styles.row} key={data.MovimientoConceptoId}>
        <Text style={styles.codigo}>{data.MovimientoConceptoId}</Text>
        <Text style={styles.producto}>{data.MovimientoConceptoNombre}</Text>
        <Text style={styles.cantidad}>1</Text>
        <Text style={styles.precioUnitario}>{data.MovimientoCantidad}</Text>
        <Text style={styles.subtotal}>{data.MovimientoCantidad}</Text>
    </View>
    return (<Fragment>{rows}</Fragment> )
};
  
export default FacturaTableRow