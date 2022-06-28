import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const OtObservacionesTarea = ({tareasOt, setTareasOt, tarea, editMode}) => {
    //2
    const [reconexionCableCoaxil, setReconexionCableCoaxil] = useState(false);
    const [reconexionCableFibra, setReconexionCableFibra] = useState(false);
    const handleChangeReconexionCableCoaxil = () => {
        setReconexionCableCoaxil(!reconexionCableCoaxil);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!reconexionCableCoaxil) {
            setReconexionCableFibra(false)
            row.OtTareaObservaciones = 'Coaxil';
        }
        else {
            row.OtTareaObservaciones = ''
        };
        setTareasOt(tareasOt, row);
    }
    const handleChangeReconexionCableFibra = () => {
        setReconexionCableFibra(!reconexionCableFibra);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!reconexionCableFibra) {
            setReconexionCableCoaxil(false);
            row.OtTareaObservaciones = 'Fibra';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    } 
    //3
    const [desconexionCableCoaxil, setDesconexionCableCoaxil] = useState(false);
    const [desconexionCableFibra, setDesconexionCableFibra] = useState(false);
    const handleChangeDesconexionCableCoaxil = () => {
        setDesconexionCableCoaxil(!desconexionCableCoaxil);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!desconexionCableCoaxil) {
            setDesconexionCableFibra(false);
            row.OtTareaObservaciones = 'Coaxil';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    const handleChangeDesconexionCableFibra = () => {
        setDesconexionCableFibra(!desconexionCableFibra);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!desconexionCableFibra) {
            setDesconexionCableCoaxil(false);
            row.OtTareaObservaciones = 'Fibra';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    //5
    const [onuSimple, setOnuSimple] = useState(false);
    const [onuCombinada, setOnuCombinada] = useState(false);
    const handleChangeOnuSimple = () => {
        setOnuSimple(!onuSimple);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!onuSimple) {
            setOnuCombinada(false);
            row.OtTareaObservaciones = 'Onu simple';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    const handleChangeOnuCombinada = () => {
        setOnuCombinada(!onuCombinada);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!onuCombinada) {
            setOnuSimple(false);
            row.OtTareaObservaciones = 'Onu combinada';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    //7
    const [retiraOnuDesconexion, setRetiraOnuDesconexion] = useState(false);
    const handleChangeRetiraOnuDesconexion = () => {
        setRetiraOnuDesconexion(!retiraOnuDesconexion);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!retiraOnuDesconexion) {
            row.OtTareaObservaciones = 'Retira onu';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    //8
    const [coaxilSinSeñalCable, setCoaxilSinSeñalCable] = useState(false);
    const [fibraSinSeñalCable, setFibraSinSeñalCable] = useState(false);
    const handleChangeCoaxilSinSeñalCable = () => {
        setCoaxilSinSeñalCable(!coaxilSinSeñalCable);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!coaxilSinSeñalCable) {
            setFibraSinSeñalCable(false);
            row.OtTareaObservaciones = 'Coaxil';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    const handleChangeFibraSinSeñalCable = () => {
        setFibraSinSeñalCable(!fibraSinSeñalCable);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!fibraSinSeñalCable) {
            setCoaxilSinSeñalCable(false);
            row.OtTareaObservaciones = 'Fibra';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    //9
    const [coaxilVeMalCable, setCoaxilVeMalCable] = useState(false);
    const [fibraVeMalCable, setFibraVeMalCable] = useState(false);
    const handleChangeCoaxilVeMalCable = () => {
        setCoaxilVeMalCable(!coaxilVeMalCable);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!coaxilVeMalCable) {
            setFibraVeMalCable(false);
            row.OtTareaObservaciones = 'Coaxil';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    const handleChangeFibraVeMalCable = () => {
        setFibraVeMalCable(!fibraVeMalCable);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!fibraVeMalCable) {
            setCoaxilVeMalCable(false);
            row.OtTareaObservaciones = 'Fibra';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    //16
    const [retiraCableCorteCable, setRetiraCableCorteCable] = useState(false);
    const handleChangeRetiraCableCorteCable = () => {
        setRetiraCableCorteCable(!retiraCableCorteCable);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!retiraCableCorteCable) {
            row.OtTareaObservaciones = 'Retira cable';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    //17
    const [retiraOnuCorteInternet, setRetiraOnuCorteInternet] = useState(false);
    const handleChangeRetiraOnuCorteInternet = () => {
        setRetiraOnuCorteInternet(!retiraOnuCorteInternet);
        const row = tareasOt.find((t) => t.TareaId === tarea.TareaId);
        if(!retiraOnuCorteInternet) {
            row.OtTareaObservaciones = 'Retira onu';
        }
        else {
            row.OtTareaObservaciones = ''
        };
    }
    useEffect(() => {
        if(editMode) {
            if(tareasOt.find((t) => t.TareaId === 2 && t.OtTareaObservaciones === 'Coaxil')) setReconexionCableCoaxil(true);
            if(tareasOt.find((t) => t.TareaId === 2 && t.OtTareaObservaciones === 'Fibra')) setReconexionCableFibra(true);
            if(tareasOt.find((t) => t.TareaId === 3 && t.OtTareaObservaciones === 'Coaxil')) setDesconexionCableCoaxil(true);
            if(tareasOt.find((t) => t.TareaId === 3 && t.OtTareaObservaciones === 'Fibra')) setDesconexionCableFibra(true);
            if(tareasOt.find((t) => t.TareaId === 5 && t.OtTareaObservaciones === 'Onu simple')) setOnuSimple(true);
            if(tareasOt.find((t) => t.TareaId === 5 && t.OtTareaObservaciones === 'Onu combinada')) setOnuCombinada(true);
            if(tareasOt.find((t) => t.TareaId === 7 && t.OtTareaObservaciones === 'Retira onu')) setRetiraOnuDesconexion(true);
            if(tareasOt.find((t) => t.TareaId === 8 && t.OtTareaObservaciones === 'Coaxil')) setCoaxilSinSeñalCable(true);
            if(tareasOt.find((t) => t.TareaId === 8 && t.OtTareaObservaciones === 'Fibra')) setFibraSinSeñalCable(true);
            if(tareasOt.find((t) => t.TareaId === 9 && t.OtTareaObservaciones === 'Coaxil')) setCoaxilVeMalCable(true);
            if(tareasOt.find((t) => t.TareaId === 9 && t.OtTareaObservaciones === 'Fibra')) setFibraVeMalCable(true);
            if(tareasOt.find((t) => t.TareaId === 16 && t.OtTareaObservaciones === 'Retira cable')) setRetiraCableCorteCable(true);
            if(tareasOt.find((t) => t.TareaId === 17 && t.OtTareaObservaciones === 'Retira onu')) setRetiraOnuCorteInternet(true);
        }
    }, [])
    return (
        tareasOt.find((tarea) => tarea.TareaId === 2) && tarea.TareaId === 2 ?
        <FormControl>
            <FormGroup row>
                <FormControlLabel label="Cable coaxil" control={<Checkbox disabled={editMode} name="reconexionCableCoaxil" value={reconexionCableCoaxil} checked={reconexionCableCoaxil} onChange={handleChangeReconexionCableCoaxil}/>}></FormControlLabel>
                <FormControlLabel label="Fibra Óptica" control={<Checkbox disabled={editMode} name="reconexionCableFibra" value={reconexionCableFibra} checked={reconexionCableFibra} onChange={handleChangeReconexionCableFibra}/>}></FormControlLabel>
            </FormGroup>
        </FormControl>
        :
        tareasOt.find((tarea) => tarea.TareaId === 3) && tarea.TareaId === 3 ?
        <FormControl>
            <FormGroup row>
                <FormControlLabel label="Cable coaxil" control={<Checkbox disabled={editMode} name="desconexionCableCoaxil" value={desconexionCableCoaxil} checked={desconexionCableCoaxil} onChange={handleChangeDesconexionCableCoaxil}/>}></FormControlLabel>
                <FormControlLabel label="Fibra Óptica" control={<Checkbox disabled={editMode} name="desconexionCableFibra" value={desconexionCableFibra} checked={desconexionCableFibra} onChange={handleChangeDesconexionCableFibra}/>}></FormControlLabel>
            </FormGroup>
        </FormControl>
        :
        tareasOt.find((tarea) => tarea.TareaId === 5) && tarea.TareaId === 5 ?
        <FormControl>
            <FormGroup row>
                <FormControlLabel label="Onu Simple" control={<Checkbox disabled={editMode} name="onuSimple" value={onuSimple} checked={onuSimple} onChange={handleChangeOnuSimple}/>}></FormControlLabel>
                <FormControlLabel label="Onu Combinada" control={<Checkbox disabled={editMode} name="onuCombinada" value={onuCombinada} checked={onuCombinada} onChange={handleChangeOnuCombinada}/>}></FormControlLabel>
            </FormGroup>
        </FormControl>
        :   
        tareasOt.find((tarea) => tarea.TareaId === 7) && tarea.TareaId === 7 ?
        <FormControl>
            <FormGroup row>
                <FormControlLabel label="Retirar onu" control={<Checkbox disabled={editMode} name="retiraOnuDesconexion" value={retiraOnuDesconexion} checked={retiraOnuDesconexion} onChange={handleChangeRetiraOnuDesconexion}/>}></FormControlLabel>
            </FormGroup>
        </FormControl>
        :
        tareasOt.find((tarea) => tarea.TareaId === 8) && tarea.TareaId === 8 ?
        <FormControl>
            <FormGroup row>
                <FormControlLabel label="Cable coaxil" control={<Checkbox disabled={editMode} name="coaxilSinSeñalCable" value={coaxilSinSeñalCable} checked={coaxilSinSeñalCable} onChange={handleChangeCoaxilSinSeñalCable}/>}></FormControlLabel>
                <FormControlLabel label="Fibra Óptica" control={<Checkbox disabled={editMode} name="fibraSinSeñalCable" value={fibraSinSeñalCable} checked={fibraSinSeñalCable} onChange={handleChangeFibraSinSeñalCable}/>}></FormControlLabel>
            </FormGroup>
        </FormControl>
        :
        tareasOt.find((tarea) => tarea.TareaId === 9) && tarea.TareaId === 9 ?
        <FormControl>
            <FormGroup row>
                <FormControlLabel label="Cable coaxil" control={<Checkbox disabled={editMode} name="coaxilVeMalCable" value={coaxilVeMalCable} checked={coaxilVeMalCable} onChange={handleChangeCoaxilVeMalCable}/>}></FormControlLabel>
                <FormControlLabel label="Fibra Óptica" control={<Checkbox disabled={editMode} name="fibraVeMalCable" value={fibraVeMalCable} checked={fibraVeMalCable} onChange={handleChangeFibraVeMalCable}/>}></FormControlLabel>
            </FormGroup>
        </FormControl>
        :
        tareasOt.find((tarea) => tarea.TareaId === 16) && tarea.TareaId === 16 ?
        <FormControl>
            <FormGroup row>
                <FormControlLabel label="Retirar cable" control={<Checkbox disabled={editMode} name="retiraCableCorteCable" value={retiraCableCorteCable} checked={retiraCableCorteCable} onChange={handleChangeRetiraCableCorteCable}/>}></FormControlLabel>
            </FormGroup>
        </FormControl>
        :
        tareasOt.find((tarea) => tarea.TareaId === 17) && tarea.TareaId === 17 ?
        <FormControl>
            <FormGroup row>
                <FormControlLabel label="Retirar onu" control={<Checkbox disabled={editMode} name="retiraOnuCorteInternet" value={retiraOnuCorteInternet} checked={retiraOnuCorteInternet} onChange={handleChangeRetiraOnuCorteInternet}/>}></FormControlLabel>
            </FormGroup>
        </FormControl>
        : "");
}
 
export default OtObservacionesTarea;