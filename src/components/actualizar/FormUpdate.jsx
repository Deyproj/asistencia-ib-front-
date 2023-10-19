import React, { useState, useEffect } from 'react';
import TarjetasPersonas from '../TarjetasPersonas';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Form } from "react-bootstrap";
import { API_URL } from '../../config/constant';

const FormUpdate = ({ ultimaFecha, setUpdate, update }) => {

    const [file, setFile] = useState(null);
    const [enviado, setEnviado] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const sendFile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true); // Activar el estado de carga

        try {
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
        } catch (error) {
            console.error('Error al cargar los datos', error);
        } finally {
            setLoading(false); // Desactivar el estado de carga después de la carga
        }
    }

    return (
        <>
            <h3 className='mt-4'>Seleccione el Maestro Power Mas Actualizado</h3>
            <br />
            <Form onSubmit={sendFile}>
                <div className="form-group">
                    <input onChange={handleFileChange} type="file" name="file" accept=".xlsx" className="form-control" required="True" />
                </div>
                <br />
                <div className="py-2 text-right">
                    {loading ? (
                        <button className="btn btn-success" type="button" disabled>
                        Cargando...
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                      </button>
                    ) : (
                        <button type="submit" className="btn btn-success" value="Actualizar">
                            Actualizar
                        </button>
                    )}
                </div>
            </Form>
            {enviado && (
                <>
                    <br />
                    <div className="alert alert-success" role="alert">
                        <strong>Excelente!</strong> Datos cargados con éxito.
                    </div>
                </>
            )}
            <TarjetasPersonas
                totalPersonas={ultimaFecha}
                titulo="Ultima actualización"
                background="bg-white text-dark"
                icon={faCalendarDay}
            />
        </>
    );
}

export default FormUpdate;
