import React, { useState, useEffect } from 'react';
import TarjetasPersonas from '../TarjetasPersonas';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from "react-bootstrap";
import { API_URL } from '../../config/constant';

const FormUpdate = ({ ultimaFecha, setUpdate, update }) => {

    const [file, setFile] = useState(null);
    const [enviado, setEnviado] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const sendFile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        await fetch(`${API_URL}/personas/upload`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: formData
        });

        setFile(null);
        setEnviado(true);
        setUpdate(update + 1);
        e.target.reset();

        setTimeout(() => {
            setEnviado(false);
        }, 3000);
    }

    return (
        <>
            <h3 className='mt-4'>Seleccione el Maestro Power Mas Actualizado</h3>
            <br />
            <Form onSubmit={sendFile}>
                <div className="form-gorup">
                    <input onChange={handleFileChange} type="file" name="file" accept=".xlsx" className="form-control" required="True" />
                </div>
                <br />
                <div className="py-2 text-right">
                    <Button type="submit" className="btn btn-primary " value="Actualizar">Actualizar</Button>
                </div>
            </Form>
            {enviado && (
                <>
                <br />
                    <div className="alert alert-primary" role="alert">
                        <strong>Excelente!</strong> Datos cargados con exito .
                    </div>
                </>
            )}
            <TarjetasPersonas
                totalPersonas={ultimaFecha}
                titulo="Ultima actualizacion"
                background="bg-white text-dark"
                icon={faCalendarDay}
            />

        </>
    );
}

export default FormUpdate;
