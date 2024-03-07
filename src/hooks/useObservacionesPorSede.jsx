import { useState, useEffect } from 'react';
import {API_URL} from '../config/constant';

const useObservacionesPorTurno = () => {
  const [observaciones, setObservaciones] = useState([]);
  const [loading, setLoading] = useState(true);

    const cargarObservacionesDia = () => {
      fetch(`${API_URL}/asistencia/observaciones`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
          .then(res => res.json())
          .then(res => {
              setObservaciones(res); setLoading(false);
          })
  }

  useEffect(() => {
      cargarObservacionesDia();
  }, []);

  
  return { observaciones, loading };
};

export default useObservacionesPorTurno;
