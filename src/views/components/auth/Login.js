import React, { useState, useContext, useEffect } from 'react'
import { Button, Card, CardContent, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import logo from './../../../assets/images/logo-ts-transparente.png';
import olinet from './../../../assets/images/olinet.png';
import useStyles from './../Styles';
import AppContext from '../../../context/appContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const appContext = useContext(AppContext);
    const { errores, usuarioAutenticado, iniciarSesion } = appContext;
    console.log(errores);
    const [AuthInfo, setAuthInfo] = useState({
      NombreUsuario: '',
      Contraseña: ''
    });
    const { NombreUsuario, Contraseña } = AuthInfo;
    const onChange = e => {
      setAuthInfo({
        ...AuthInfo,
        [e.target.name] : e.target.value
      });
    }
    const onSubmit = e => {
      e.preventDefault();
      iniciarSesion(AuthInfo);
    };
    useEffect(()=>{
      if(usuarioAutenticado){
        setTimeout(()=> {
          navigate('/home');
        }, 1500);
      }
    },[usuarioAutenticado, navigate]);
    return (
    <>
    <form onSubmit={onSubmit}>
    <div className="fondo">
        <Card className={styles.cartaLogin}>
          <div style={{display: 'flex'}}>
            <img className={styles.logoLogin} src={logo} alt="logo-tls"/>
            <img className={styles.logoLogin} src={olinet} alt="logo-olinet"/>
          </div>
            <CardContent>
            <Typography variant="h2">Ingrese sus datos para continuar</Typography>
                <Grid container spacing = {3}>
                    <Grid item xs={12} lg={12} sm={12} md={12}>
                    <TextField
                    error={errores.length > 0 && errores.find(e => e.param === "NombreUsuario") ? true : false}
                    helperText={errores.length > 0 && errores.find(e => e.param === "NombreUsuario") ? errores.find(e => e.param === "NombreUsuario").msg : ""}
                    color='secondary'
                    autoFocus
                    fullWidth
                    label="Usuario"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="bx bx-user"></i>
                          </InputAdornment>
                        ),
                    }}
                    type="text"
                    variant="outlined"
                    value={NombreUsuario}
                    name="NombreUsuario"
                    onChange={onChange}>
                    </TextField>
                    </Grid>
                    <Grid item xs={12} lg={12} sm={12} md={12}>
                    <TextField
                    error={errores.length > 0 && errores.find(e => e.param === "Contraseña") ? true : false}
                    helperText={errores.length > 0 && errores.find(e => e.param === "Contraseña") ? errores.find(e => e.param === "Contraseña").msg : ""}
                    color='secondary'
                    fullWidth
                    label="Contraseña"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="bx bx-lock"></i>
                          </InputAdornment>
                        ),
                    }}
                    type="password"
                    variant="outlined"
                    value={Contraseña}
                    name="Contraseña"
                    onChange={onChange}>
                    </TextField>
                    </Grid>
                </Grid>
                {!usuarioAutenticado ?
                  <Button color='secondary' type="submit" fullWidth className={styles.botonIniciarSesion} variant="contained">Iniciar sesión</Button>
                : <Button startIcon={<i className="bx bx-loader bx-spin"></i>} disabled fullWidth className={styles.botonIniciarSesion} variant="contained">Espere por favor...</Button>}
            </CardContent>
        </Card>
    </div>
    </form>
    </>
    );
}
 
export default Login;