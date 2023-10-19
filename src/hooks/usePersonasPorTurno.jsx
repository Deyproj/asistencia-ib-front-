import { useState, useEffect } from 'react';
import {API_URL} from '../config/constant';

const usePersonasPorTurno = () => {
  const [cantidadPersonasTurno1, setCantidadPersonasTurno1] = useState([]);
  const [cantidadPersonasTurno2, setCantidadPersonasTurno2] = useState([]);
  const [cantidadPersonasIB2, setCantidadPersonasIB2] = useState([]);
  const [cantidadPersonas, setCantidadPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarCantidadPersonas = () => {
    fetch(`${API_URL}/personas/turno`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(res => {
          setCantidadPersonasTurno1(res.turno1 || 0);
          setCantidadPersonasTurno2(res.turno2 || 0);
          setCantidadPersonasIB2(res.ib2 || 0);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    cargarCantidadPersonas();
  }, []);

  
  return { cantidadPersonasTurno1, cantidadPersonasTurno2, cantidadPersonasIB2, loading };
};

export default usePersonasPorTurno;
