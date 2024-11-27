import { useState, useEffect } from 'react';
import { API_URL } from '../config/constant';
import useActual from './useActual';
import useToken from './useToken';

const useAsistencia = () => {
    const { now } = useActual();
    const { sedeId } = useToken();

    // Definición de todos los estados necesarios
    const [ausentes, setAusentes] = useState(0);
    const [presentes, setPresentes] = useState(0);
    const [ausentesIBDia, setAusentesIBDia] = useState(0);
    const [presentesIBDia, setPresentesIBDia] = useState(0);
    const [ausentesIBNoche, setAusentesIBNoche] = useState(0);
    const [presentesIBNoche, setPresentesIBNoche] = useState(0);
    const [ausentesIBTarde, setAusentesIBTarde] = useState(0);
    const [presentesIBTarde, setPresentesIBTarde] = useState(0);
    const [ausentesIB2Noche, setAusentesIB2Noche] = useState(0);
    const [presentesIB2Noche, setPresentesIB2Noche] = useState(0);
    const [ausentesIB2Dia, setAusentesIB2Dia] = useState(0);
    const [presentesIB2Dia, setPresentesIB2Dia] = useState(0);
    const [ausentesIB2Tarde, setAusentesIB2Tarde] = useState(0);
    const [presentesIB2Tarde, setPresentesIB2Tarde] = useState(0);

    const [asistencias, setAsistencias] = useState([]);
    const [asistenciaProcesos, setAsistenciaProcesos] = useState([]);
    const [loading2, setLoading2] = useState(true);

    const cargarDatos = async () => {
        if (!sedeId) {
            console.error('Sede ID no disponible');
            return;
        }
        
        try {
            // Carga asistencias generales
            const responseAsistencias = await fetch(`${API_URL}/asistencia?fecha=${now}&sedeId=${sedeId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const dataAsistencias = await responseAsistencias.json();
            setAsistencias(dataAsistencias);
            
            // Carga asistencias por proceso
            const responseProcesos = await fetch(`${API_URL}/asistencia/procesos?fecha=${now}&sedeId=${sedeId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const dataProcesos = await responseProcesos.json();
            setAsistenciaProcesos(dataProcesos);

            // Actualizar estados una vez cargados los datos
            actualizarEstado(dataAsistencias);

            setLoading2(false);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    const actualizarEstado = (data) => {
        const estados = {
            ausentes: setAusentes,
            presentes: setPresentes,
            ausentesIBDia: setAusentesIBDia,
            presentesIBDia: setPresentesIBDia,
            ausentesIBNoche: setAusentesIBNoche,
            presentesIBNoche: setPresentesIBNoche,
            ausentesIBTarde: setAusentesIBTarde,
            presentesIBTarde: setPresentesIBTarde,
            ausentesIB2Noche: setAusentesIB2Noche,
            presentesIB2Noche: setPresentesIB2Noche,
            ausentesIB2Dia: setAusentesIB2Dia,
            presentesIB2Dia: setPresentesIB2Dia,
            ausentesIB2Tarde: setAusentesIB2Tarde,
            presentesIB2Tarde: setPresentesIB2Tarde,
        };

        Object.keys(data).forEach(key => {
            if (estados[key]) {
                estados[key](data[key]);
            }
        });
    };

    useEffect(() => {
        if (now && sedeId) {
            setLoading2(true);
            cargarDatos();
        }
    }, [now, sedeId]);

    return {
        ausentes,
        presentes,
        ausentesIBDia,
        presentesIBDia,
        ausentesIBNoche,
        presentesIBNoche,
        ausentesIBTarde,
        presentesIBTarde,
        ausentesIB2Noche,
        presentesIB2Noche,
        ausentesIB2Dia,
        presentesIB2Dia,
        ausentesIB2Tarde,
        presentesIB2Tarde,
        asistencias,
        asistenciaProcesos,
        loading2,
    };
};

export default useAsistencia;
