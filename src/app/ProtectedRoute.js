import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const RolAutorizados = (rol, path) => {

    
    // Asignamos las rutas a que puede acceder segun el rol
    const allowedRoutes = {
        ADMIN: [
            '/home', '/asistencia', '/actual', '/users', '/actualizar', '/data'
        ],

        DATA: [
            '/home', '/asistencia', '/actual', '/actualizar', '/data'
        ],

        USER: [
            '/home', '/asistencia'
        ],

    };

    // Validamos si la ruta que nos solicita esta aturizada
    if (allowedRoutes[rol] && allowedRoutes[rol].includes(path)) {
        return true;
    }
    return false;
}

const ProtectedRoute = ({ children, path }) => {
    
    // Obtenemos el rol que esta guardado en el local
    const token = localStorage.getItem('token') && jwt_decode(localStorage.getItem('token'));
    const rol =  token && token.rol[0].nombre;

    return (

        // Validamos si segun el rol esta autorizado
        token && RolAutorizados(rol, path) ? (
            children
        ) : (
            <Navigate to={{ pathname: '/' }} />
        )

    );
};

export { ProtectedRoute };

