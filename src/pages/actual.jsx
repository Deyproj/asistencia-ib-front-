import React from 'react';
import { faPersonCircleMinus, faPersonChalkboard, faPeopleGroup, faPersonCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/actual/card';
import usePersonas from '../hooks/usePersonas';
import useAsistencias from '../hooks/useAsistencia';
import TableProcesos from '../components/actual/tableProcesos';
import TablePersonas from '../components/actual/tablePersonas';
import TableObservaciones from '../components/actual/tableObservaciones';
import Loading from '../components/layout/Loading';
import usePersonasPorTurno from '../hooks/usePersonasPorTurno';

const Actual = () => {

    const { cantidadPersonasTurno1, cantidadPersonasTurno2, cantidadPersonasIB2, loading } = usePersonasPorTurno();
    const { totalPersonas } = usePersonas();
    const { ausentesTurno1, presentesTurno1, ausentesTurno2, presentesTurno2, ausentesIB2, presentesIB2, ausentes, presentes, totalasistencias, loading2, loading3 } = useAsistencias()

    return (
        <>
            {(loading && loading2 && loading3) ? <Loading /> : (
                <div className='container principal'>
                    <div className='row pt-4 '>
                        <section className='d-flex flex-wrap col-12 col-lg-6 mx-0 mb-3'>
                            <div className='col-12 col-lg-6  my-1 '>
                                <Card numero={presentesTurno1.length} titulo="Presentes IB" background="card bg-success" icon={faPersonCircleCheck} />
                            </div>
                            <div className='col-12 col-lg-6 my-1'>
                                <Card numero={ausentesTurno1.length} titulo="Ausentes IB" background="card bg-danger" icon={faPersonCircleMinus} />
                            </div>
                            <div className='col-12 col-lg-6 my-1'>
                                <Card numero={cantidadPersonasTurno1 - (ausentesTurno1.length + presentesTurno1.length)} titulo="Sin Validar IB" background="card bg-secondary" icon={faPersonChalkboard} />
                            </div>
                            <div className='col-12 col-lg-6 my-1'>
                                <Card numero={cantidadPersonasTurno1} titulo="Total IB" background="card bg-primary" icon={faPeopleGroup} />
                            </div>
                        </section>

                        <section className='d-flex flex-wrap col-12 col-lg-6 mx-0'>
                            <div className='col-12 col-lg-6  my-1 '>
                                <Card numero={totalPersonas && presentesIB2.length} titulo="Presentes IB2" background="card bg-success" icon={faPersonCircleCheck} />
                            </div>
                            <div className='col-12 col-lg-6 my-1 '>
                                <Card numero={totalPersonas && ausentesIB2.length} titulo="Ausentes IB2" background="card bg-danger" icon={faPersonCircleMinus} />
                            </div>
                            <div className='col-12 col-lg-6   my-1 '>
                                <Card numero={cantidadPersonasIB2 - (ausentesIB2.length + presentesIB2.length)} titulo="Sin Validar IB2" background="card bg-secondary" icon={faPersonChalkboard} />
                            </div>
                            <div className='col-12 col-lg-6  my-1 '>
                                <Card numero={cantidadPersonasIB2} titulo="Total IB2" background="card bg-primary" icon={faPeopleGroup} />
                            </div>
                        </section>
                    </div>

                    <div className='row '>
                        <div className='col-12 col-lg-7 order-3 order-lg-1'>
                            <br />
                            <div>
                                <TableProcesos />
                            </div>
                        </div>
                        <div className='col-12  col-lg-5 order-1 order-lg-2'>
                            <TableObservaciones sede={1} titulo={'IB'}/>
                            <TableObservaciones sede={'IB2 '} titulo={'IB2'}/>
                            <TablePersonas />
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default Actual;

