import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import './UserTable.css'
import { useState } from 'react';

const UserTable = (props) => {
    const [show, setShow] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleClose = () => {
        setShow(false);
        setUserToDelete(null);
    };

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setShow(true);
    };

    const handleConfirmDelete = () => {
        props.deleteUser(userToDelete);
        handleClose();
    };

    const [buscador, setBuscador] = useState('')
    const [tablaPersonas, setTablaPersonas] = useState([])

    const buscarChange = e => {
        //Cada que hay un cambio en el input del buscador, se ejecutara esta función
        setBuscador(e.target.value);
        //Llamamos la funcion filtrar y le pasamos el valor del input
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        //Recibimos el valor a buscar
        //Filtramos el valor a buscar en la tabla
        var resultado = props.users.filter((user) => {

            if (user.roles[0].nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                user.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 

            ) {
                return user;
            }
        });

        // Seteamos el resultado a los datos
        setTablaPersonas(resultado);
    }

    useEffect(() => {
        setTablaPersonas(props.users)
    },[props.users])



    return (
        <div className='table-container'>
            <div className="input-group pb-2">
                <input type="text" className="form-control" value={buscador} onChange={buscarChange} placeholder='Buscar' />
            </div>
            <table className='table table-sm tableUser'>
                <thead>
                    <tr>
                        <th >Nombre</th>
                        <th >Correo</th>
                        <th >Rol</th>
                        <th className='text-center ' >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.users ?
                        tablaPersonas.map((user) => (
                                <tr key={user.idUsuario}>
                                    <td className='text-nowrap'>{user.nombre}</td>
                                    <td >{user.email}</td>
                                    <td >{user.roles[0].nombre}</td>
                                    <td className='text-center text-nowrap'>
                                        <a href="#">
                                            <button className='btn btn-outline-success mx-1' onClick={() => { props.editUser(user) }}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button className='btn btn-outline-danger' onClick={() => { handleDeleteUser(user) }}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </a>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3}>No users</td>
                                </tr>
                            )
                    }
                </tbody>
            </table>

            <div className='user-list'>
                {props.users ? (
                    tablaPersonas.map((user) => (
                        <div key={user.idUsuario} className='user-item'>
                            <div className='user-info'>
                                <strong>Nombre:</strong> {user.nombre}
                            </div>
                            <div className='user-info'>
                                <strong>Correo:</strong> {user.email}
                            </div>
                            <div className='user-info'>
                                <strong>Rol:</strong> {user.roles[0].nombre}
                            </div>
                            <div className='user-actions'>
                                <a href="#">
                                    <button
                                        className='btn btn-outline-success mx-1'
                                        onClick={() => {
                                            props.editUser(user);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </a>
                                <button
                                    className='btn btn-outline-danger'
                                    onClick={() => {
                                        handleDeleteUser(user);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='no-users'>No users</div>
                )}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro que deseas eliminar a {userToDelete && userToDelete.nombre}?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant='danger' onClick={handleConfirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
            <br />
        </div>
    );
}

export default UserTable;