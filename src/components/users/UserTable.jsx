import React from 'react';
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

    return (
        <div >
            <table className='table table-responsive '>
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
                            props.users.map((user) => (
                                <tr  key={user.idUsuario}>
                                    <td className='text-nowrap'>{user.nombre}</td>
                                    <td >{user.email}</td>
                                    <td >{user.roles[0].nombre}</td>
                                    <td className='text-center text-nowrap'>
                                        <button className='btn btn-outline-info mx-1' onClick={() => { props.editUser(user) }}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button className='btn btn-outline-danger' onClick={() => { handleDeleteUser(user) }}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
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
        </div>
    );
}

export default UserTable;