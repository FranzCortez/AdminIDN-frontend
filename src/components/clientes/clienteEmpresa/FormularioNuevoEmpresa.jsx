import React, { useState, Fragment } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { RiContactsBook2Line } from "react-icons/ri";
import { FiPlusCircle } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';

function FormularioNuevoEmpresa() {

    const [ empresa, guardarEmpresa ] = useState({
        nombre: '',
        rut: '',
        razonSocial: '',
        direccion: ''
    });

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarEmpresa({
            ...empresa,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {
        
        const { nombre, rut, razonSocial, direccion } = empresa;
        
        if( (nombre.length > 0 && rut.length > 0 && razonSocial.length > 0 && direccion.length > 0) ){
            return false;
        }

        return true;
    }

    const nuevaEmpresa = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.post(`/empresas/empresa`, empresa);

            Swal.fire({
                title: 'Se agrego correctamente la empresa',
                text: res.data.msg,
                type: 'success',
                timer: 2500
            });
                
            // redireccionar
            navigate(`/clientes`, {replace: true});
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

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <FiPlusCircle size={25} color={"#333333"}/>
                    <RiContactsBook2Line size={50} color={"#333333"}/>
                    <h1>Crear Nuevo Contacto</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/clientes`} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <form onSubmit={nuevaEmpresa}>

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre Empresa:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                placeholder='Nombre del cliente empresa'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="rut">Rut Empresa:</label>
                            <input 
                                type="text" 
                                id='rut'
                                name='rut'
                                placeholder='Rut del cliente empresa'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="razonSocial">Razón Social:</label>
                            <input 
                                type="text" 
                                id='razonSocial'
                                name='razonSocial'
                                placeholder='Razón Social del cliente empresa'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="direccion">Dirección:</label>
                            <input 
                                type="text" 
                                id='direccion'
                                name='direccion'
                                placeholder='Dirección del cliente empresa'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Crear Nuevo Cliente Empresa"
                                disabled={validarForm()}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormularioNuevoEmpresa;