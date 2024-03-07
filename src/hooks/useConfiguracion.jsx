import { useState, useEffect } from 'react';
import { API_URL } from '../config/constant';

const useConfiguracion = () => {
  const [configuracionAsistencia, setConfiguracionAsistencia] = useState(null);

  const cargarEstado = () => {
    fetch(`${API_URL}/configuracion`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(res => { 
        setConfiguracionAsistencia(res);
      })
      .catch(error => {
        console.error('Error al cargar el estado:', error);
      });
  };

  const cambiarEstado = () => {
    fetch(`${API_URL}/configuracion/cambiarEstado`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(res => {
        setConfiguracionAsistencia(res);
      })
      .catch(error => {
        console.error('Error al cambiar el estado:', error);
      });
  };

  useEffect(() => {
    cargarEstado();
  }, []);

  return { configuracionAsistencia, cambiarEstado };
};

export default useConfiguracion;
