import React, { useState, Fragment, useEffect, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { RiContactsBook2Line } from "react-icons/ri";
import { FiPlusCircle } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';

import { CRMContext } from '../../context/CRMContext';

function FormNuevoEmpresaCom() {

    const [ empresa, guardarEmpresa ] = useState({
        nombre: '',
        rut: '',
        razonSocial: '',
        direccion: ''
    });

    const [ autoCompletarInfo, guardarAutoCompletarInfo ] = useState({
        nombre: '',
        rut: '',
        razonSocial: '',
        direccion: ''
    });

    const [ otro, guardarOtro ] = useState(false);

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);
    
    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarEmpresa({
            ...empresa,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {
        
        const { nombre, rut, razonSocial, direccion } = empresa;

        autoCompletar(nombre, rut, razonSocial);
        
        if( (nombre.length > 0 && rut.length > 0 && razonSocial.length > 0 && direccion.length > 0) ){
            return false;
        }

        return true;
    }

    const autoCompletar = async ( nombre, rut, razonSocial ) => {
        
        if ( nombre.length > 5 || rut.length > 4 || razonSocial.length > 5 ) {

            if ( otro ) return;

            try {

                const res = await clienteAxios.post(`/clientescom/`, { nombre, rut, razonSocial },{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                
                guardarAutoCompletarInfo(res.data);
                guardarOtro(!otro);
                
            } catch (error) {
                console.log(error)
            }

        }

    }

    const autoCompletarTodo = () => {

        guardarEmpresa(autoCompletarInfo);

    }

    const nuevaEmpresa = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.post(`/clientescom/empresacom`, empresa,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se agrego correctamente la empresa',
                text: res.data.msg,
                type: 'success',
                timer: 2500
            });
                
            // redireccionar
            navigate(`/clientescom`, {replace: true});
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
                <div className="card-header-com">
                    <FiPlusCircle size={25} color={"#ebe1e1"}/>
                    <RiContactsBook2Line size={50} color={"#ebe1e1"}/>
                    <h1>Crear Nuevo Contacto Comercializadora</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/clientescom`} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <form onSubmit={nuevaEmpresa}>

                        {
                            autoCompletarInfo.nombre !== '' ?

                            <Fragment>

                                <div className='autoCompletar'>
                                    <p><span>Nombre:</span> {autoCompletarInfo.nombre}</p>
                                    <p><span>RUT:</span> {autoCompletarInfo.rut}</p>
                                    <p><span>Razón Social:</span> {autoCompletarInfo.razonSocial}</p>
                                    <p><span>Dirección:</span> {autoCompletarInfo.direccion}</p>                                    
                                </div>
                                <div className='opciones'>
                                    <div className='btn-new btn-return' onClick={() => guardarOtro(!otro) }>Buscar otro cliente</div>
                                    <div className='btn-new btn-success-new' onClick={autoCompletarTodo}>Autocompletar datos</div>
                                </div>
                            </Fragment>

                            :
                            null
                        }

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre Empresa<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                value={empresa.nombre}
                                name='nombre'
                                placeholder='Nombre del cliente empresa'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="rut">Rut Empresa<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='rut'
                                name='rut'
                                value={empresa.rut}
                                placeholder='Rut del cliente empresa'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="razonSocial">Razón Social<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='razonSocial'
                                name='razonSocial'
                                value={empresa.razonSocial}
                                placeholder='Razón Social del cliente empresa'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="direccion">Dirección<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='direccion'
                                name='direccion'
                                value={empresa.direccion}
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

export default FormNuevoEmpresaCom
