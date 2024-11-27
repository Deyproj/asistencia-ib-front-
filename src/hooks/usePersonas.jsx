import { useState, useEffect } from 'react';
import { API_URL } from '../config/constant';
import useToken from './useToken';

const usePersonas = (update) => {
    const { sedeId } = useToken();
    const [personas, setPersonas] = useState([]);
    const [personasSinAsistencia, setPersonasSinAsistencia] = useState([]);
    const [search, setSearch] = useState("");
    const [search2, setSearch2] = useState("");
    const [loadingPeople, setLoadingPeople] = useState(true);

    const cargarDatos = () => {
        if (!sedeId) {
            console.error('Sede ID no disponible: ' + sedeId);
            return;
        }
    
        fetch(`${API_URL}/personas?sedeId=${sedeId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
            .then(res => res.json())
            .then(res => {
                setPersonas(res);
                setLoadingPeople(false);
            })
            .catch(error => {
                console.error(error);
            });
        
            fetch(`${API_URL}/personas/sinAsistenciaHoy?sedeId=${sedeId}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            })
                .then(res => res.json())
                .then(res => {
                    setPersonasSinAsistencia(res);
                    setLoadingPeople(false);
                })
                .catch(error => {
                    console.error(error);
                });
    };

    const onProceso = (event) => {
        setSearch(event.target.value);
    };

    const onTurno = (event) => {
        setSearch2(event.target.value);
    };

    useEffect(() => {
        if (sedeId) { 
            cargarDatos();
        }
    }, [update, sedeId]); 

    const filtrarPersonas = () => {
        return personas.filter(persona => {
            if (search !== "" && persona.proceso !== search) {
                return false;
            }
            if (search2 !== "" && persona.turno !== search2) {
                return false;
            }
            return true;
        });
    };

    const obtenerProcesosUnicos = () => {
        const dataArr = personas.filter(persona => persona.turno === search2).map(persona => persona.proceso);
        const result = new Set(dataArr);
        return [...result].sort();
    };

    const obtenerTurnosUnicos = () => {
        return [...new Set(personas.map(persona => persona.turno))].sort();
    };

    const totalPersonas = personas.length;

    return {
        personas,
        personasSinAsistencia,
        totalPersonas,
        procesos: obtenerProcesosUnicos(),
        turnos: obtenerTurnosUnicos(),
        onProceso,
        onTurno,
        results: filtrarPersonas(),
        search,
        search2,
        setPersonas,
        loadingPeople
    };
};

export default usePersonas;
