import React, { useState } from 'react';
import TarjetasPersonas from '../components/TarjetasPersonas';
import FormUpdate from '../components/actualizar/FormUpdate';
import usePersonas from '../hooks/usePersonas';
import Loading from '../components/layout/Loading';
import useConfiguracion from '../hooks/useConfiguracion';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Actualizar = () => {
    const { cambiarEstado, configuracionAsistencia } = useConfiguracion();
    const [update, setUpdate] = useState(0);
    const { personas, totalPersonas, loading } = usePersonas(update);
    let ultimaFecha = '';

    personas.forEach((persona) => {
        const fechaActualizacion = persona.fechaActualizacion;
        if (fechaActualizacion > ultimaFecha) {
            ultimaFecha = fechaActualizacion;
        }
    });

    const handleAsistenciaToggle = () => {
        cambiarEstado();
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="principal">
                    <div className="container">
                        <div className="row pt-5">
                            <div className="col-md-8">
                                <FormUpdate ultimaFecha={ultimaFecha} update={update} setUpdate={setUpdate} />
                            </div>
                            <div className="col-md-4">
                                <TarjetasPersonas totalPersonas={totalPersonas} titulo="Personas Activas" background="bg-success" icon={faUsers} />
                                <div className="text-center mb-5 d-flex justify-content-center">
                                    <div className='d-flex justify-content-around col-md-9'>
                                        <h5>Asistencia</h5>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="asistenciaSwitch" style={{ backgroundColor: configuracionAsistencia?.estado ? 'green' : 'transparent' }} checked={configuracionAsistencia?.estado} onChange={handleAsistenciaToggle} />
                                            <label className="form-check-label" htmlFor="asistenciaSwitch">
                                                {configuracionAsistencia?.estado ? 'Habilitada' : 'Bloqueada'}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Actualizar;