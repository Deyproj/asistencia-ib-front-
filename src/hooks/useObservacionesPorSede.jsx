import { useState, useEffect } from 'react';
import { API_URL } from '../config/constant';
import useToken from './useToken';

const useObservacionesPorTurno = () => {
  const { sedeId } = useToken();
  const [observaciones, setObservaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarObservacionesDia = () => {
    if (!sedeId) {
      console.error('Sede ID no disponible');
      return;
    }

    fetch(`${API_URL}/asistencia/observaciones?sedeId=${sedeId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(res => {
        setObservaciones(res);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(
    () => {
      if (sedeId) {
        cargarObservacionesDia();
      }
  }, [ sedeId ]);


  return { observaciones, loading };
};

export default useObservacionesPorTurno;
