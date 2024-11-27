import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_URL } from '../../config/constant';
import './Login.css'

const FormLogin = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [error, setError] = useState(false);

    const onSubmit = async (form, e) => {

        await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('token', res.token);
                window.location.assign(`https://www.isabelita.online`);
            })
            .catch(error => {
                console.error(error);
                setError(true)
            }
            )
    }

    setTimeout(() => {
        setError(false);
    }, 10000);

    return (
        <div className='login principal'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card-group mb-0">
                            <div className="card p-4">
                                <div className="card-body">
                                    <h1>Control de Inicio</h1>
                                    <p className="text-muted">Autentifícate por favor</p>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <label className="form-label">Email</label>
                                        <input className="form-control" type="text" name="email" {...register("email", {
                                            required: "Campo Obligatorio",
                                        })} />
                                        <div className='text-danger'>
                                            {errors?.email?.message}
                                        </div>
                                        <label className="form-label">Password</label>
                                        <input className="form-control" type="password" name="password" {...register("password", {
                                            required: "Campo Obligatorio",
                                        })}
                                        />
                                        <div className='text-danger'>
                                            {errors?.password?.message}
                                        </div>
                                        <br />
                                        <button className='btn btn-success'>Ingresar</button>
                                        <br /><br />
                                        {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    <strong>¡Error de Autentificación!</strong> - Valida tus datos.
                                                </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                            <div className="card text-white bg-success py-5 d-none d-lg-block /* d-md-down-none */" >
                                <div className="card-body text-center">
                                    <div>
                                        <h2>WebIB</h2>
                                        <img className='imgLogin' src="/images/flowers2.png" alt="flower" />
                                        <p>Sistema para el registro y control de asistencia.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormLogin;