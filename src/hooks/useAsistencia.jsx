import { useState, useEffect, lazy } from 'react';
import { API_URL } from '../config/constant';
import useActual from './useActual';

const useAsistencia = (update) => {

    const { now, } = useActual();
    const [ausentes, setAusentes] = useState([]);
    const [ausentesTurno1, setAusentesTurno1] = useState([]);
    const [ausentesTurno2, setAusentesTurno2] = useState([]);
    const [ausentesIB2, setAusentesIB2] = useState([]);
    const [presentes, setPresentes] = useState([]);
    const [presentesTurno1, setPresentesTurno1] = useState([]);
    const [presentesTurno2, setPresentesTurno2] = useState([]);
    const [presentesIB2, setPresentesIB2] = useState([]);
    const [asistencias, setAsistencias] = useState([]);
    const [asistenciaProcesos, setAsistenciaProcesos] = useState([]);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    let totalasistencias = asistencias.length;

    const cargarAsistencias = () => {
        fetch(`${API_URL}/asistencia?fecha=${now}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        }
        )
            .then(res => res.json())
            .then(res => { setAsistencias(res); setLoading3(false)  })
        estado()
    }


    const cargarAsistenciasProcesos = () => {
        fetch(`${API_URL}/asistencia/procesos?fecha=${now}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
            .then(res => res.json())
            .then(res => { setAsistenciaProcesos(res); setLoading2(false) })
    }

    const estado = () => {
        const ausentesArray = [];
        const presentesArray = [];
        const ausentesTurno1Array = [];
        const presentesTurno1Array = [];
        const ausentesTurno2Array = [];
        const presentesTurno2Array = [];
        const ausentesIB2Array = [];
        const presentesIB2Array = [];

        asistencias.map((asistencia) => {
            const turno = asistencia.persona.turno;
            if (turno !== null && turno !== undefined) {
                switch (asistencia.estado) {
                    case "0":
                        ausentesArray.push(asistencia);
                        if (turno === "1") {
                            ausentesTurno1Array.push(asistencia);
                        } else if (turno === "2") {
                            ausentesTurno2Array.push(asistencia);
                        } else if (turno.includes("IB2")) {
                            ausentesIB2Array.push(asistencia);
                        }
                        break;
                    case "1":
                        presentesArray.push(asistencia);
                        if (turno === "1") {
                            presentesTurno1Array.push(asistencia);
                        } else if (turno === "2") {
                            presentesTurno2Array.push(asistencia);
                        } else if (turno.includes("IB2")) {
                            presentesIB2Array.push(asistencia);
                        }
                        break;
                }
            }
        });

        setAusentes(ausentesArray);
        setPresentes(presentesArray);
        setAusentesTurno1(ausentesTurno1Array);
        setPresentesTurno1(presentesTurno1Array);
        setAusentesTurno2(ausentesTurno2Array);
        setPresentesTurno2(presentesTurno2Array);
        setAusentesIB2(ausentesIB2Array);
        setPresentesIB2(presentesIB2Array);
    };

    useEffect(() => {
        now && cargarAsistencias()
    }, [now, update]);


    useEffect(() => {
        now && cargarAsistenciasProcesos()
        now && estado()
    }, [asistencias]);

    return { ausentesTurno1, presentesTurno1, ausentesTurno2, presentesTurno2, ausentesIB2, presentesIB2, ausentes, presentes, asistencias, totalasistencias, asistenciaProcesos, loading2, loading3 }
};

export default useAsistencia;