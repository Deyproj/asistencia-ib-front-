import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'react-bootstrap';
import useAsistencia from '../../hooks/useAsistencia';
import ModalProceso from './modalProceso';
import { API_URL } from '../../config/constant';
//import useActual from '../../hooks/useActual';
//import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const TableProcesos = () => {


    //const [asistenciaProcesos, setAsistenciaProcesos] = useState([]);
    const [buscador, setBuscador] = useState('')
    const [tablaProcesos, setTablaProcesos] = useState([])
    const {asistenciaProcesos } = useAsistencia();

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

    const abrirModal = (proceso) => {
        setProcesoSeleccionado(proceso);
        setShowModal(true);
    };
    
    useEffect(() => {
        asistenciaProcesos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
        setTablaProcesos(asistenciaProcesos)
    }, [asistenciaProcesos]);

    return (
        <>
            <div className='card shadow-lg'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='mx-4 my-3 me-4'>
                            <h3>Estado Procesos </h3>
                        </div>
                    </div>
                    <div className='col-10'>
                        <div className="input-group my-3 mx-3">
                            <input type="text" className="form-control" value={buscador} onChange={buscarChange} placeholder='Buscar' />
                        </div>
                    </div>
                </div>
                <div>
                <table className='table table-responsive table-bordered' >
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th className='text-center' scope="col">Presentes</th>
                            <th className='text-center' scope="col">Ausentes</th>
                            <th className='text-center' scope="col">Sin Validar</th>
                            <th className='text-center' scope="col">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tablaProcesos.map((proceso, i) => (
                            (proceso.presentes+proceso.ausentes+proceso.pendientes == 0) ? (null) :(                            <tr key={i}>
                                <td className='text-nowrap text-left'>{proceso.nombre}</td>
                                <td className='text-center text-success'><b>{proceso.presentes}</b></td>
                                <td className='text-center text-danger'><b>{proceso.ausentes}</b></td>
                                <td className={(proceso.pendientes == 0) ? ("text-center text-secondary") : ("text-center text-danger")}><b>{proceso.pendientes}</b></td>
                                <td className='text-center'>
                                    <button onClick={() => abrirModal(proceso)} className="btn btn-outline-success"> <FontAwesomeIcon icon={faListCheck} /></button>
                                </td>
                            </tr>)
                        ))}
                        <ModalProceso show={showModal} onHide={() => setShowModal(false)} proceso={procesoSeleccionado} />
                    </tbody>
                </table>
                </div>
                {/*
                <div className='d-flex justify-content-center'>
                                    <Pagination>
        <PaginationItem disabled={currentPage === 1}>
            <PaginationLink onClick={() => paginate(currentPage - 1)}>
            Anterior
            </PaginationLink>
        </PaginationItem>
        {[...Array(Math.ceil(asistenciaProcesos.length / postsPerPage))].map((page, i) => (
            <PaginationItem active={i + 1 === currentPage} key={i}>
            <PaginationLink onClick={() => paginate(i + 1)}>
                {i + 1}
            </PaginationLink>
            </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage === Math.ceil(asistenciaProcesos.length / postsPerPage)}>
            <PaginationLink onClick={() => paginate(currentPage + 1)}>
            Siguiente
            </PaginationLink>
        </PaginationItem>
      </Pagination>
                </div>
                 */}
            </div>
        </>
    );
}

export default TableProcesos;