import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function FormularioEditarContacto() {

    const { id, idEmpresa } = useParams();

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

    const actualizarContacto = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.put(`/contactos/contacto/${idEmpresa}`, contacto,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se actualizó correctamente el contacto',
                text: res.data.msg,
                type: 'success',
                timer: 2500
            });
                
            // redireccionar
            navigate(`/clientes/contacto/${idEmpresa}`, {replace: true});
        } catch (error) {
            
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

    const consultarAPI = async () => {

        try {
            const res = await clienteAxios.get(`contactos/contacto/editar/${idEmpresa}/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarContacto(res.data);
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
            navigate('/clientes', {replace: true});
        }

    }

    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <FaUserEdit size={50} color={"#333333"}/>
                    <h1>Editando Usuario</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/clientes/contacto/${idEmpresa}`} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Cambie los campos que correspondan:  </h2>

                    <form onSubmit={actualizarContacto}>

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre del Contacto<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                placeholder='Nombre del contacto'
                                onChange={actualizarState}
                                value={contacto.nombre}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="cargo">Cargo del Contacto<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='cargo'
                                name='cargo'
                                placeholder='Cargo del contacto'
                                onChange={actualizarState}
                                value={contacto.cargo}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="correo">Correo del Contacto<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="email" 
                                id='correo'
                                name='correo'
                                placeholder='Correo del contacto'
                                onChange={actualizarState}
                                value={contacto.correo}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="telefono">Teléfono del Contacto:</label>
                            <input 
                                type="tel" 
                                id='telefono'
                                name='telefono'
                                placeholder='Teléfono del contacto'
                                onChange={actualizarState}
                                value={contacto.telefono || ''}
                            />
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Actualizar Contacto"
                                disabled={validarForm()}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormularioEditarContacto