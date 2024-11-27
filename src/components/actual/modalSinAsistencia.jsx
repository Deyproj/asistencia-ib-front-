import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import ModalPersona from './modalPersona';
import usePersonas from '../../hooks/usePersonas';
import useActual from '../../hooks/useActual';
import { API_URL } from '../../config/constant';
import Loading from '../layout/Loading';
import { Modal } from 'react-bootstrap';

const ModalSinAsistencia = ({ onHide, show }) => {

    const { now, } = useActual();

    const {personasSinAsistencia, loading } = usePersonas();
    const [tablaPersonas, setTablaPersonas] = useState([])
    const [buscador, setBuscador] = useState('')

    const filtrar = (terminoBusqueda) => {
        //Recibimos el valor a buscar
        //Filtramos el valor a buscar en la tabla
        var resultado = personasSinAsistencia.filter((persona) => {

            if (persona.proceso.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                persona.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                persona.turno.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())

            ) {
                return persona;
            }
        });

        // Seteamos el resultado a los datos
        setTablaPersonas(resultado);
    }

    const buscarChange = e => {
        //Cada que hay un cambio en el input del buscador, se ejecutara esta función
        setBuscador(e.target.value);
        //Llamamos la funcion filtrar y le pasamos el valor del input
        filtrar(e.target.value);
    }


    useEffect(() => {
        personasSinAsistencia.sort((a, b) => {
            if (a.proceso !== b.proceso) {
                return a.proceso > b.proceso ? 1 : -1;
            }
            return a.nombre > b.nombre ? 1 : -1;
        });
    }, [personasSinAsistencia]);

    useEffect(() => {
        setTablaPersonas(personasSinAsistencia);
    }, [personasSinAsistencia]);
    

    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop={true}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Personas Sin Asistencia
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group my-2">
                    <input type="text" className="form-control" value={buscador} onChange={buscarChange} placeholder='Buscar Proceso'/>
                </div>
                {(loading) ? <Loading /> :
                    (
                        <table className="table  ">
                            <thead>
                                <tr>
                                    <th >Turno</th>
                                    <th className='text-center'>Nombre</th>
                                    <th className='text-center'>Proceso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tablaPersonas.map((persona) => {
                                    return (
                                        <tr key={persona.idEmpresa}>
                                            <td>{persona.turno}</td>
                                            <td>{persona.nombre}</td>
                                            <td className='text-center'>{persona.proceso}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-success' onClick={onHide}>Cerrar</button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalSinAsistencia;