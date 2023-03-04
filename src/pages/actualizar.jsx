import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import { Container, Row, Col } from "reactstrap";
import TarjetasPersonas from '../components/TarjetasPersonas';
import FormUpdate from '../components/actualizar/FormUpdate'
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import usePersonas from '../hooks/usePersonas';

const Actualizar = () => {
    const [update, setUpdate] = useState(0);
    const { personas, totalPersonas
    } = usePersonas(update);
    let ultimaFecha = "";

    personas.forEach(persona => {
        const fechaActualizacion = persona.fechaActualizacion;
        if (fechaActualizacion > ultimaFecha) {
            ultimaFecha = fechaActualizacion;
        }
    });

    return (
        <>
          {/*   <Header titulo="Actualizar Personal" /> */}
            <div className='principal'>
                <Container>
                    <Row className='pt-5' >
                        <Col md={8}>
                            <FormUpdate ultimaFecha={ultimaFecha} update={update} setUpdate={setUpdate} />
                        </Col>
                        <Col md={4}>
                            <TarjetasPersonas
                                totalPersonas={totalPersonas}
                                titulo="Personas Activas"
                                background="bg-primary"
                                icon={faUsers}
                            />
                          {/*   <TarjetasPersonas
                                totalPersonas={totalPersonas}
                                titulo="Personas Registradas"
                                background="bg-info border-none"
                                icon={faUsers}
                            /> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Actualizar;