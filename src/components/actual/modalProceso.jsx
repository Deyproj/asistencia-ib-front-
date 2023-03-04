import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modalPersona.css';
import {API_URL} from '../../config/constant';



const ModalProceso = ({ onHide, show, proceso }) => {

    const [laborActual, setLaborActual] = useState([]);
    const procesoActual = laborActual.find(procesoIterado => procesoIterado.proceso === proceso.nombre)?.labor;

    const cargarNecesidad = async () => {
        fetch(`${API_URL}/personas/total`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => { setLaborActual(res) });
    }


    useEffect(() => {
        cargarNecesidad();
    }, []);





    return (
        <>
            <Modal show={show} onHide={onHide} size="fluid" aria-labelledby="contained-modal-title-vcenter" centered backdrop={true}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {proceso.nombre}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6">
                            <h4>Presentes</h4>
                            {proceso.labor && Object.keys(proceso.labor).map((tipoLabor, i) => (
                                <div key={i}>
                                    {tipoLabor}: <br />
                                    <b>{proceso.labor[tipoLabor]}</b>
                                </div>
                            ))}
                            </div>
                            <div className="col-6">
                                <h4>Maestro</h4>
                            {procesoActual && Object.keys(procesoActual).map((tipoLabor) => (
                                            <div key={tipoLabor}>
                                                {tipoLabor}: <br />
                                                <b>{procesoActual[tipoLabor]}</b>
                                            </div>
                                        ))
                                
                            }



                            {/*                           {laborActual[proceso.nombre] && Object.keys(laborActual[proceso.nombre]).map((tipoLabor2, i) => (
                                        <div key={i}>
                                            {tipoLabor2}: <br />
                                            <b>{proceso.labor[tipoLabor2]}</b>
                                        </div>
                                    ))} */}






                        </div>

                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalProceso;