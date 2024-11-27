import { useState } from 'react';
import { API_URL } from '../config/constant';

const useBuscarSede = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const buscarSede = async (nombre) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/sede/buscar?nombre=${encodeURIComponent(nombre)}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (!response.ok) {
                throw new Error('Error al buscar la sede');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error al buscar la sede:', err);
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, buscarSede };
};

export default useBuscarSede;