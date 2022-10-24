import React, { useState, Fragment, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdContactPhone } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function FormularioCrearContacto() {

    const { idEmpresa } = useParams();

    const [ contacto, guardarContacto ] = useState({
        nombre: '',
        cargo: '',
        correo: '',
        telefono: ''
    });

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarContacto({
            ...contacto,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {
        
        const { nombre, cargo, correo } = contacto;
        
        if( (nombre.length > 0 && cargo.length > 0 && correo.length > 0 ) ){
            return false;
        }

        return true;
    }

    const nuevoContacto = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.post(`/contactos/contacto/${idEmpresa}`, contacto,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se agrego correctamente el contacto',
                text: res.data.msg,
                type: 'success',
                timer: 2500
            });
                
            // redireccionar
            navigate(`/clientes/contacto/${idEmpresa}`, {replace: true});
        } catch (error) {
            
            console.log(error)

            if(error.request.status === 501 ) {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.msg,
                    timer: 2500
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
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        }
    }, []);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <FiPlusCircle size={25} color={"#333333"}/>
                    <MdContactPhone size={50} color={"#333333"}/>
                    <h1>Crear Nuevo Contacto</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/clientes/contacto/${idEmpresa}`} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <form onSubmit={nuevoContacto}>

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre del Contacto<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                placeholder='Nombre del nuevo contacto'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="cargo">Cargo del Contacto<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='cargo'
                                name='cargo'
                                placeholder='Cargo del nuevo contacto'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="correo">Correo del Contacto<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="email" 
                                id='correo'
                                name='correo'
                                placeholder='Correo del nuevo contacto'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="telefono">Teléfono del Contacto:</label>
                            <input 
                                type="tel" 
                                id='telefono'
                                name='telefono'
                                placeholder='Teléfono del nuevo contacto'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Crear Nuevo Contacto"
                                disabled={validarForm()}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormularioCrearContacto;