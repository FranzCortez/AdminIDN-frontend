import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { IoPersonAddSharp, IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

import { CRMContext } from '../context/CRMContext';

function FormNuevoUsuario() {

    const [ usuario, guardarUsuario ] = useState({
        nombre: '',
        rut: '',
        email: '',
        telefono: '',
        tipo: '',
        clienteEmpresaId: null,
        color: ''
    });
    const [ empresas, guardarEmpresas ] = useState([]);

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

        if( !(!nombre.length || !rut.length || !email.length || !tipo.length) ){
            return false;
        }

        return true;
    }

    const agregarUsuario = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.post('/cuentas/usuario', usuario,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se agrego correctamente al usuario',
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

    useEffect(()=> {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1) { 
            navigate('/login', {replace: true});
        }
    }, [empresas]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <IoPersonAddSharp size={50} color={"#333333"}/>
                    <h1>Crear Nuevo Usuario</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/usuarios'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <form onSubmit={agregarUsuario}>

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                placeholder='Nombre del nuevo usuario'
                                onChange={actualizarState}
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
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="email">Correo<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="email" 
                                id='email'
                                name='email'
                                placeholder='Email del nuevo usuario'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="telefono">Teléfono:</label>
                            <input 
                                type="tel" 
                                id='telefono'
                                name='telefono'
                                placeholder='Teléfono del nuevo usuario'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="color">Color<span className='campo__obligatorio'>*</span>:</label>
                            <input type="color" name="color" id="color" onChange={actualizarState} />
                        </div>
                        <div className='campo'>
                            <label htmlFor="tipo">Tipo<span className='campo__obligatorio'>*</span>:</label>
                            <select name="tipo" id='tipo' defaultValue={'DEFAULT'} onChange={actualizarState}>
                                <option value='DEFAULT' disabled>-- Seleccione un rol --</option>
                                <option value="1">Administrador</option>
                                <option value="2">Trabajador EIRL</option>
                                <option value="3">Trabajador SPA</option>
                            </select>
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Crear Nuevo Usuario"
                                disabled={validarForm()}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormNuevoUsuario;