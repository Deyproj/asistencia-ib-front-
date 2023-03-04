import { useState, useEffect } from 'react';
import { API_URL } from '../config/constant';
import  useActual  from './useActual';

const useAsistencia = (update) => {
    
    const { now, } = useActual();
    const [ausentes, setAusentes] = useState([]);
    const [presentes, setPresentes] = useState([]);
    const [asistencias, setAsistencias] = useState([]);
    const [asistenciaProcesos, setAsistenciaProcesos] = useState([]);
    let totalasistencias = asistencias.length;

    const cargarAsistencias = () => {
        fetch(`${API_URL}/asistencia?fecha=${now}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        }
        )
            .then(res => res.json())
            .then(res => { setAsistencias(res) })
            estado()
    }


        const cargarAsistenciasProcesos = () => {
            fetch(`${API_URL}/asistencia/procesos?fecha=${now}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            })
                .then(res => res.json())
                .then(res => { setAsistenciaProcesos(res) })
        }

    const estado = () => {
        const ausentesArray = [];
        const presentesArray = [];
       
          asistencias.map((asistencia) => {
            switch (asistencia.estado) {
                case "0":
                    ausentesArray.push(asistencia);
                    break;
                case "1":
                    presentesArray.push(asistencia);
                    break;
            }
        });

        setAusentes(ausentesArray);
        setPresentes(presentesArray);
    };

    useEffect(() => {
        now && cargarAsistencias()
    }, [now, update]);
    
    
    useEffect(() => {
        now && cargarAsistenciasProcesos()
        now && estado()
    }, [asistencias ]);

    return { ausentes, presentes, asistencias, totalasistencias, asistenciaProcesos }
};

export default useAsistencia;