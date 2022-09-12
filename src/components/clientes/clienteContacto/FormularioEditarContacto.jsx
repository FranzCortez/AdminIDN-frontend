import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';

function FormularioEditarContacto() {

    const { id, idEmpresa } = useParams();

    const [ contacto, guardarContacto ] = useState({
        nombre: '',
        cargo: '',
        correo: '',
        telefono: ''
    });

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
            const res = await clienteAxios.put(`/contactos/contacto/${idEmpresa}`, contacto);

            Swal.fire({
                title: 'Se actualizo correctamente el contacto',
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
                    timer: 2500
                })
            }
        }
    }

    const consultarAPI = async () => {

        try {
            const res = await clienteAxios.get(`contactos/contacto/editar/${idEmpresa}/${id}`);

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
            navigate('/usuarios', {replace: true});
        }

    }

    useEffect(() => {
        consultarAPI();
        console.log(contacto)
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
                        <Link to={'/usuarios'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Cambie los campos que correspondan:  </h2>

                    <form onSubmit={actualizarContacto}>

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre:</label>
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
                            <label htmlFor="cargo">Cargo:</label>
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
                            <label htmlFor="correo">Correo:</label>
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
                            <label htmlFor="telefono">Teléfono:</label>
                            <input 
                                type="tel" 
                                id='telefono'
                                name='telefono'
                                placeholder='Teléfono del nuevo usuario'
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