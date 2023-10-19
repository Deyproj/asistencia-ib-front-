import { useState, useEffect } from 'react';
import {API_URL} from '../config/constant';

const usePersonas = (update) => {
  const [personas, setPersonas] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Función para actualizar la búsqueda de procesos
  const onProceso = (event) => {
    setSearch(event.target.value);
  };

  const cargarPersonas = () => {
    fetch(`${API_URL}/personas`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(res => { setPersonas(res);  setLoading(false) });
  }
  
  
  let totalPersonas = personas.length;

  
  const dataArr = [];
  personas.forEach(persona => {
    dataArr.push(persona.proceso);
  });
  const result = new Set(dataArr);
  let procesos = [...result];
  procesos.sort();

  
  
  // Arreglo para almacenar los resultados de búsqueda
  let results = [];
  if (search !== "") {
    results = personas.filter(personas => personas.proceso === search);
  }
  useEffect(() => {
    cargarPersonas();
  }, [update]);

  
  return { personas, totalPersonas, procesos, onProceso, results, search, setPersonas, loading };
};

export default usePersonas;
