import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const EditUserForm = (props) => {

    const { register, formState: { errors }, handleSubmit, setValue } = useForm({
        defaultValues: props.currenUser
    });


    useEffect (() => {
        setValue('nombre', props.currenUser.nombre)
        setValue('email', props.currenUser.email)
        setValue('roles', props.currenUser.roles)
        setValue('password', props.currenUser.password)
    }, )
    

    const onSubmit = (data, e) => {
        data.idUsuario = props.currenUser.idUsuario
        props.updateUser(props.currenUser.idUsuario, data)
        e.target.reset();
    }

    return (
        <>
            <div>
                <div className="container">
                    <h1>Editar Usuario</h1>
                </div>
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-label">Nombre</label>
                        <input className="form-control" type="text" name="nombre" {...register("nombre", {
                            required: "Campo Obligatorio",
                        })} />
                        <div className='text-danger'>
                            {errors?.nombre?.message}
                        </div>
                        <label className="form-label">Correo</label>
                        <input className="form-control" type="text" name="email" {...register("email", {
                            required: "Campo Obligatorio",
                        })} />
                        <div className='text-danger'>
                            {errors?.email?.message}
                        </div>
                        <label className="form-label">Rol</label>
                        <select className="form-control" type="text" name="roles" placeholder='Selecciona el rol del Usuario'{...register("roles", {
                            required: "Campo Obligatorio",
                        })}
                        >
                            <option text="USER">USER</option>
                            <option text="DATA">DATA</option>
                            <option text="SUPERDATA">SUPERDATA</option>
                            <option text="ADMIN">ADMIN</option>
                        </select>
                        <div className='text-danger'>
                            {errors?.roles?.message}
                        </div>
                        <label className="form-label">Password</label>
                        <input className="form-control" type="text" name="password" {...register("password", {
                            required: "Campo Obligatorio",
                        })}
                        />
                        <div className='text-danger'>
                            {errors?.password?.message}
                        </div>
                        <br/>
                        <button className='btn btn-success'>Editar usuario</button>
                    </form>
                </div>
            </div >
        </>
    );
}

export default EditUserForm;