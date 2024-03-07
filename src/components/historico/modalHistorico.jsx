import React, { useState } from 'react';
import { API_URL } from '../../config/constant'
import Modal from 'react-bootstrap/Modal';

const ModalHistorico = ({ onHide, show }) => {

    const [selectedDate1, setSelectedDate1] = useState(getToday());
    const [selectedDate2, setSelectedDate2] = useState(getToday());

    const handleDat1Change = (event) => {
        setSelectedDate1(event.target.value);
    };

    const handleDate2Change = (event) => {
        setSelectedDate2(event.target.value);
    };

    const handleDownloadAusencias = () => {
        fetch(`${API_URL}/file/donwloadAusencias/date?fecha=${selectedDate1}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            method: 'GET',
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Personas Ausentes ${selectedDate1}.xlsx`);
                document.body.appendChild(link);
                link.click();
                onHide();
            })
            .catch(error => console.error('Error downloading file:', error));
    };

    const handleDownloadActivos = () => {
        fetch(`${API_URL}/file/donwloadActivos/date?fecha=${selectedDate2}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            method: 'GET',
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Nomina vs Fisicos ${selectedDate2}.xlsx`);
                document.body.appendChild(link);
                link.click();
                onHide();
            })
            .catch(error => console.error('Error downloading file:', error));
    };

    // Obtener la fecha de hoy en el formato YYYY-MM-DD
    function getToday() {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${today.getFullYear()}-${month}-${day}`;
    }

    return (
        <Modal show={show} onHide={onHide} size="sm" aria-labelledby="contained-modal-title-vcenter" centered backdrop={true}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Historico
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Personas Ausentes</label>
                            <input
                                type="date"
                                value={selectedDate1}
                                onChange={handleDat1Change}
                                className="form-control"
                            />
                            <button onClick={handleDownloadAusencias} className="btn btn-success mt-2">Descargar</button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Programados vs Fisicos</label>
                            <input
                                type="date"
                                value={selectedDate2}
                                onChange={handleDate2Change}
                                className="form-control"
                            />
                            <button onClick={handleDownloadActivos} className="btn btn-success mt-2">Descargar</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalHistorico;