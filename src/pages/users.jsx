import React from 'react';
import { useState } from 'react';
import AddUserForm from '../components/users/AddUserForm';
import EditUserForm from '../components/users/EditUserForm';
import UserTable from '../components/users/UserTable';
import { useEffect } from 'react';
import { API_URL } from '../config/constant';
import Loading from '../components/layout/Loading';
import useSede from '../hooks/useSede';


const Users = () => {
    const {buscarSede} = useSede();

    const [users, setUsers] = useState();
    const [editing, setEditing] = useState(false);
    const [currenUser, setCurrenUser] = useState({})
    const [loading, setLoading] = useState(true);

    const cargarUsuarios = () => {
        fetch(`${API_URL}/usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(res => { setUsers(res); setLoading(false) })
    }

    const addUser = async (user) => {
        user.roles = [user.roles];
    
        try {
            // Llamar a buscarSede y esperar el resultado
            const sedeEncontrada = await buscarSede(user.sede);
    
            // Verificar que la sede no sea null antes de asignarla
            if (sedeEncontrada) {
                user.sede = sedeEncontrada;
            } else {
                console.error('No se encontró la sede');
                return; // Salir si la sede no se encuentra
            }
    
            // Proceder con el registro del usuario
            await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(user),
            });
            console.log("Usuario registrado");
            cargarUsuarios();
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
        }
    };
    
    const updateUser = async (id, updateUser) => {
        updateUser.roles = [updateUser.roles];
        
        try {
            
            const sedeEncontrada = await buscarSede(updateUser.sede);
    
            if (sedeEncontrada) {
                updateUser.sede = sedeEncontrada;
            } else {
                console.error('No se encontró la sede');
                return; 
            }
    
            await fetch(`${API_URL}/usuarios?idUsuario=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updateUser),
            });
            console.log("Usuario actualizado");
            cargarUsuarios();
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };    
    
    const deleteUser = async (user) => {
        if (user) {
            await fetch(`${API_URL}/usuarios/eliminar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(user),
            })
                .then(console.log("Usuario Eliminado"))
                .then(() => cargarUsuarios());
        } else {
            console.log("El usuario no se puedo Eliminar");
        }
    }



    const editUser = (user) => {
        setEditing(true);
        setCurrenUser({
            idUsuario: user.idUsuario,
            nombre: user.nombre,
            email: user.email,
            roles: user.roles[0].nombre,
            sede: user.sede ? user.sede.nombre : null 
        });
    }

    useEffect(() => {
        cargarUsuarios()
    }, [])


    return (
        <>
            {loading ? <Loading /> : (
                <div className="container principal">
                <div className="row pt-5">
                    <div className='col-12 col-lg-5 mx-auto'>
                        <div className="flex-large">
                            {
                                editing ? (
                                    <div>
                                        <EditUserForm currenUser={currenUser} updateUser={updateUser} />
                                    </div>
                                ) : (
                                    <div>
                                        <AddUserForm addUser={addUser} />
                                    </div>
                                )
                            }
                            <br />
                        </div>
                    </div>

                    <div className='col-12 col-lg-7 mx-auto'>
                        <div className="flex-large text-center">
                            <h2>Usuarios Actuales</h2>
                            <UserTable users={users} deleteUser={deleteUser} editUser={editUser} />
                        </div>
                    </div>
                </div>
            </div>
            )}
            
        </>
    );
}

export default Users;