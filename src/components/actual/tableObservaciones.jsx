import React from 'react';
import { Table } from 'react-bootstrap';
import Loading from '../layout/Loading';
import useObservacionesPorTurno from '../../hooks/useObservacionesPorSede';

const TableObservaciones = ({ sede, titulo }) => {

    const { observaciones, loading } = useObservacionesPorTurno();

    return (
        <>
            {(loading) ? <Loading /> :
                (
                    <div className='pt-4' id={titulo}>
                        <div className='card shadow-lg'>
                            <div className='row'>
                                <div className='my-2'>
                                    <h3 className='px-4'>Causas Ausencias {titulo}</h3>
                                </div>
                                <div className=''>
                                    <Table >
                                        <thead>
                                            <tr>
                                                <th scope="col">Descripcion</th>
                                                <th className='text-center' scope="col">Cantidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {observaciones?.map((observacion, i) => (
                                                    <React.Fragment key={i}>
                                                        {observacion.turno === sede ? (
                                                            <>
                                                                <tr>
                                                                    <td><b>{observacion.proceso}</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                {observacion.ausencias.map((ausencia, j) => (
                                                                    <tr key={j}>
                                                                        {ausencia.observacion !== "Observacion" ? (
                                                                            <>
                                                                                <td>{ausencia.observacion}</td>
                                                                                <td className='text-center text-danger'><b>{ausencia.cantidad}</b></td>
                                                                            </>
                                                                        ) : null}
                                                                    </tr>
                                                                ))}
                                                            </>
                                                        ) : null}
                                                    </React.Fragment>
                                                ))}
                                            {observaciones.length === 0 && <tr><td className='text-center'>No hay ausencias</td></tr>}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>)}
        </>
    );
}

export default TableObservaciones
