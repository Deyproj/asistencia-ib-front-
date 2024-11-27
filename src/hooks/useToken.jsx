import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const useToken = () => {
    const [tokenData, setTokenData] = useState({ sedeId: null, correo: '', nombre: '' });

    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        if (tokenString) {
            try {
                const decodedToken = jwt_decode(tokenString);
                setTokenData({
                    sedeId: decodedToken.sedeId,
                    correo: decodedToken.correo,
                    nombre: decodedToken.nombre
                });
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return tokenData;
};

export default useToken;