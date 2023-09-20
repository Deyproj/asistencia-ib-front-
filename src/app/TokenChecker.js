import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import jwtDecode from 'jwt-decode';

const TokenChecker = () => {
    const navigate = useNavigate(); // Usa useNavigate

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Tiempo actual en segundos

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                console.log('Token expirado, se ha borrado.');
                navigate('/login'); 
            }
        }
    }, [navigate]);

    return null;
};

export default TokenChecker;