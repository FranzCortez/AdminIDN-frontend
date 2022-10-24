import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

import { CRMContext } from '../context/CRMContext';

function FormEditarUsuario() {

    const { id } = useParams();

    const [ usuario, guardarUsuario ] = useState({
        nombre: '',
        rut: '',
        email: '',
        telefono: '',
        tipo: ''
    });

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {
        
        const { nombre, rut, email, tipo } = usuario;
        
        if( !(nombre.length > 0 && rut.length > 0 && email.length > 0 && tipo.length > 0) ){
            return false;
        }

        return true;
    }

    const editarUsuario = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.put(`/cuentas/usuario/${id}`,usuario, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se actualizo correctamente al usuario',
                text: res.data.msg,
                type: 'success',
                timer: 1500
            });
                
            // redireccionar
            navigate('/usuarios', {replace: true});
        } catch (error) {
            
            if(error.request.status === 501 ) {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.msg,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.msg,
                    timer: 1500
                })
            }
        }
    }

    const consultarAPI = async () => {

        try {
            const res = await clienteAxios.get(`cuentas/usuario/editar/${id}`, {
                usuario,
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarUsuario(res.data);
        } catch (error) {
            if(error.request.status === 404 ) {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.msg,
                    timer: 1500
                })
            }
            // redireccionar
            navigate('/usuarios', {replace: true});
        }

    }

    useEffect(() => {
        if(auth.token !== '' && auth.tipo === 1) {
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }  
    }, []);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <FaUserEdit size={50} color={"#333333"}/>
                    <h1>Editando Usuario</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/usuarios'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Cambie los campos que correspondan:  </h2>

                    <form onSubmit={editarUsuario}>

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                placeholder='Nombre del usuario'
                                onChange={actualizarState}
                                value={usuario.nombre}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="rut">Rut<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='rut'
                                name='rut'
                                placeholder='Rut sin punto ni guion'
                                onChange={actualizarState}
                                value={usuario.rut}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="email">Correo<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="email" 
                                id='email'
                                name='email'
                                placeholder='Email del usuario'
                                onChange={actualizarState}
                                value={usuario.email}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="telefono">Teléfono:</label>
                            <input 
                                type="tel" 
                                id='telefono'
                                name='telefono'
                                placeholder='Teléfono del usuario'
                                onChange={actualizarState}
                                value={usuario.telefono}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="tipo">Tipo<span className='campo__obligatorio'>*</span>:</label>
                            <select name="tipo" id='tipo' value={`${usuario.tipo}`} onChange={actualizarState}>
                                <option value='DEFAULT' disabled>-- Seleccione un rol --</option>
                                <option value="1">Administrador</option>
                                <option value="2">Trabajador</option>
                                <option value="3">Cliente Empresa</option>
                            </select>
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Actualizar Usuario"
                                disabled={validarForm()}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormEditarUsuario;