import React from 'react';
import { Table } from 'react-bootstrap';
import { API_URL } from '../../config/constant';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../layout/Loading';
import useObservacionesPorTurno from '../../hooks/useObservacionesPorSede';

const TableObservaciones = ({sede, titulo}) => {

   const { observaciones, loading } = useObservacionesPorTurno();

    return (
        <>
            {(loading) ? <Loading /> :
                (
                    <div className='pt-4'>
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
                                            {observaciones && observaciones.map((observacion, i) => (
                                                <tr key={i}>
                                                    {observacion.observacion != "Observacion" && observacion.turno == sede  ?
                                                        <>
                                                            <td>{observacion.observacion}</td>
                                                            <td className='text-center text-danger'><b>{observacion.cantidad}</b></td>
                                                        </>
                                                        : null}
                                                </tr>
                                            ))}
                                            {observaciones.length == 0 && <tr><td className='text-center'>No hay ausencias</td></tr>}
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
