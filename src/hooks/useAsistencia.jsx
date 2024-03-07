import { useState, useEffect, useMemo } from 'react';
import { API_URL } from '../config/constant';
import useActual from './useActual';

const useAsistencia = () => {
    const { now } = useActual();
    const [ausentes, setAusentes] = useState(0);
    const [presentes, setPresentes] = useState(0);
    const [ausentesIBNoche, setAusentesIBNoche] = useState(0);
    const [presentesIBNoche, setPresentesIBNoche] = useState(0);
    const [ausentesIBDia, setAusentesIBDia] = useState(0);
    const [presentesIBDia, setPresentesIBDia] = useState(0);
    const [ausentesIBTarde, setAusentesIBTarde] = useState(0);
    const [presentesIBTarde, setPresentesIBTarde] = useState(0);
    const [presentesIB2Noche, setPresentesIB2Noche] = useState(0);
    const [ausentesIB2Noche, setAusentesIB2Noche] = useState(0);
    const [presentesIB2Dia, setPresentesIB2Dia] = useState(0);
    const [ausentesIB2Dia, setAusentesIB2Dia] = useState(0);
    const [presentesIB2Tarde, setPresentesIB2Tarde] = useState(0);
    const [ausentesIB2Tarde, setAusentesIB2Tarde] = useState(0);
    const [asistencias, setAsistencias] = useState([]);
    const [asistenciaProcesos, setAsistenciaProcesos] = useState([]);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    const cargarAsistencias = () => {
        fetch(`${API_URL}/asistencia?fecha=${now}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
            .then(res => res.json())
            .then(res => {
                setAsistencias(res);
                setLoading3(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const cargarAsistenciasProcesos = () => {
        fetch(`${API_URL}/asistencia/procesos?fecha=${now}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
            .then(res => res.json())
            .then(res => {
                setAsistenciaProcesos(res);
                setLoading2(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const actualizarEstado = (data) => {
        for (const key in data) {
            switch (key) {
                case 'ausentes':
                    setAusentes(data[key]);
                    break;
                case 'presentes':
                    setPresentes(data[key]);
                    break;
                case 'ausentesIBDia':
                    setAusentesIBDia(data[key]);
                    break;
                case 'presentesIBDia':
                    setPresentesIBDia(data[key]);
                    break;
                case 'ausentesIBNoche':
                    setAusentesIBNoche(data[key]);
                    break;
                case 'presentesIBNoche':
                    setPresentesIBNoche(data[key]);
                    break;
                case 'ausentesIBTarde':
                    setAusentesIBTarde(data[key]);
                    break;
                case 'presentesIBTarde':
                    setPresentesIBTarde(data[key]);
                    break;
                case 'ausentesIB2Noche':
                    setAusentesIB2Noche(data[key]);
                    break;
                case 'presentesIB2Noche':
                    setPresentesIB2Noche(data[key]);
                    break;
                case 'ausentesIB2Dia':
                    setAusentesIB2Dia(data[key]);
                    break;
                case 'presentesIB2Dia':
                    setPresentesIB2Dia(data[key]);
                    break;
                case 'ausentesIB2Tarde':
                    setAusentesIB2Tarde(data[key]);
                    break;
                case 'presentesIB2Tarde':
                    setPresentesIB2Tarde(data[key]);
                    break;
                default:
                    break;
            }
        }
        
    };

    useEffect(() => {
        if (now) {
            cargarAsistencias();
        }
    }, [now]);

    useEffect(() => {
        if (loading3 === false) {
            cargarAsistenciasProcesos();
            actualizarEstado(asistencias);
        }
    }, [asistencias]);


    return {
        ausentesIBNoche,
        presentesIBNoche,
        ausentesIBDia,
        presentesIBDia,
        ausentesIBTarde,
        presentesIBTarde,
        ausentesIB2Noche,
        presentesIB2Noche,
        ausentesIB2Dia,
        presentesIB2Dia,
        ausentesIB2Tarde,
        presentesIB2Tarde,
        ausentes,
        presentes,
        asistencias,
        asistenciaProcesos,
        loading2,
        loading3
    };
};

export default useAsistencia;
