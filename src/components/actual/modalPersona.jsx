import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modalPersona.css';

const ModalPersona = ({ onHide, show, persona, observacion }) => {
    return (
        <Modal /*className='modal-backdrop'*/ show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop={true}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {persona.nombre}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <b>Id:</b><br />
                        {persona.idEmpresa}<br />
                        <b>Proceso:</b><br />
                        {persona.proceso}<br />
                        <b>Labor:</b><br />
                        {persona.labor}<br />
                        <b>Ausencia:</b><br />
                        <b className='text-success'>{observacion}</b>
                    </div>
                    <div className="col-12 col-lg-6">
                        <b>Documneto de identidad</b><br />
                        {persona.cedula}<br />
                        <b>Celular:</b><br />
                        {persona.celular}
                        <a className='ml-2' href={`https://wa.me/${persona.celular}`} target="_blank">
                            <img className='iconoIMG' src="https://cdn-icons-png.flaticon.com/128/3621/3621438.png" alt="" />
                        </a>
                        <br />
                        <br />
                        <b>Actualizacion de datos:</b><br />
                        {persona.fechaActualizacion}<br />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-success' onClick={onHide}>Cerrar</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPersona;
