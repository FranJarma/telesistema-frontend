import HttpStatus from '../views/components/HttpStatus';

export const AuthRoute = ({children, roles}) => {
    const hasToken = localStorage.getItem('token');
    const userRoles = JSON.parse(localStorage.getItem('u_roles'));
    const hasRoles = userRoles && roles.includes(userRoles[0].RoleName) ? true : false;
    if(hasToken && !hasRoles) {
        return <HttpStatus numero={401} titulo={'No Autorizado'} mensaje={'No tiene permisos suficientes para acceder a este recurso.'}/>
    }
    return children;
}