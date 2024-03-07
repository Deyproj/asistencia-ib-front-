import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import ModalProceso from './modalProceso';
import useActual from '../../hooks/useActual';
import { API_URL } from '../../config/constant';
import './tableProcesos.css'
import Loading from '../layout/Loading';
import ModalSinAsistencia from './modalSinAsistencia';

//import useActual from '../../hooks/useActual';
//import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const TableProcesos = ({asistenciaProcesos, loading2}) => {

    const { now, } = useActual();

    //const [asistenciaProcesos, setAsistenciaProcesos] = useState([]);
    const [buscador, setBuscador] = useState('')
    const [tablaProcesos, setTablaProcesos] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [procesoSeleccionado, setProcesoSeleccionado] = useState({});


    const buscarChange = e => {
        //Cada que hay un cambio en el input del buscador, se ejecutara esta función
        setBuscador(e.target.value);

        //Llamamos la funcion filtrar y le pasamos el valor del input
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        //Recibimos el valor a buscar

        //Filtramos el valor a buscar en la tabla
        var resultado = asistenciaProcesos.filter((proceso) => {
            //Buscamos por el nit y el nombre, pasamos a string despues a minuscula y despues comprobar si coincide con el termino de busqueda
            if (proceso.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return proceso;
            }
        });

        // Seteamos el resultado a los datos
        setTablaProcesos(resultado);
    }

    const abrirModal = () => {
        setShowModal(true);
    };

    const abrirModal2 = (proceso) => {
        setProcesoSeleccionado(proceso);
        setShowModal(true);
    };


    function downloadExcelFile() {
        fetch(`${API_URL}/file/donwloadActivos/date?fecha=${now}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            method: 'GET',
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Nomina vs Fisicos ${now}.xlsx`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => console.error('Error downloading file:', error));
    };


    useEffect(() => {
        asistenciaProcesos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
        setTablaProcesos(asistenciaProcesos)
    }, [asistenciaProcesos]);

    return (
        <>
            {(loading2) ? <Loading /> : (<div className='card shadow-lg'>
                    <div className='row mt-2'>
                        <div className='col-12 col-lg-4 my-2'>
                            <h3 className='ps-4'>Estado Procesos</h3>
                        </div>
                        <div className='col-12 col-lg-6 my-2'>
                            <button className='btn btn-outline-success ms-4' onClick={downloadExcelFile}>Estado Procesos</button>
                            <button className='btn btn-outline-success' onClick={abrirModal}>Personas Sin Validar</button>
                        </div>
                    </div>
                        <div className='col-10'>
                            <div className="input-group my-3 mx-3">
                                <input type="text" className="form-control" value={buscador} onChange={buscarChange} placeholder='Buscar' />
                            </div>
                        </div>
                    <div className="table-responsive">
                    <table className='table table2 table-sm  table-bordered' >
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th className='text-center' scope="col">Presentes</th>
                                <th className='text-center' scope="col">Ausentes</th>
                                <th className='text-center' scope="col">Sin Validar</th>
                                {/* <th className='text-center' scope="col">Detalles</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {tablaProcesos.map((proceso, i) => (
                                (proceso.presentes + proceso.ausentes + proceso.pendientes == 0) ? (null) : (<tr key={i}>
                                    <td className='text-nowrap text-left'>{proceso.nombre}</td>
                                    <td className='text-center text-success'><b>{proceso.presentes}</b></td>
                                    <td className='text-center text-danger'><b>{proceso.ausentes}</b></td>
                                    <td className={(proceso.pendientes == 0) ? ("text-center text-secondary") : ("text-center text-danger")}><b>{proceso.pendientes}</b></td>
                                    {/* <td className='text-center'>
                                        <button onClick={() => abrirModal(proceso)} className="btn btn-outline-success"> <FontAwesomeIcon icon={faListCheck} /></button>
                                    </td> */}
                                </tr>)
                            ))}
                            {/*  <ModalProceso show={showModal} onHide={() => setShowModal(false)} proceso={procesoSeleccionado} /> */}
                        </tbody>
                    </table>
                    </div>
                    <div className='proceso-list'>
                        {tablaProcesos.map((proceso, i) => (
                            proceso.presentes + proceso.ausentes + proceso.pendientes === 0 ? (
                                null
                            ) : (
                                <div key={i} className='proceso-item'>
                                    <div className='proceso-info1'>
                                        <strong>Nombre:</strong> {proceso.nombre}
                                    </div>
                                    <div className='proceso-info2 py-1'>
                                        <div>
                                            <strong>Presentes:</strong> {proceso.presentes}
                                        </div>
                                        <div>
                                            <strong>Ausentes:</strong> {proceso.ausentes}
                                        </div>
                                        <div className={proceso.pendientes <= 0 ? 'proceso-info3 text-secondary' : 'proceso-info3 text-danger'}>
                                            <strong>Sin Validar:</strong> {proceso.pendientes}
                                        </div>
                                    </div>
                                    {/* <div className='proceso-actions'>
                                            <a href="#">
                                                <button
                                                    className='btn btn-outline-success mx-1'
                                                    onClick={() => {
                                                        abrirModal2(proceso);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faListCheck} />
                                                </button>
                                            </a>
                                        </div> */}
                                </div>
                            )
                        ))}
                    </div>
                    <ModalSinAsistencia show={showModal} onHide={() => setShowModal(false)} />
                    </div>
                )}
        </>
    );
}

export default TableProcesos;