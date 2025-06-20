import React, { useState, Fragment, useEffect, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FaTruckMoving } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';

import { CRMContext } from '../../context/CRMContext';

function FormNuevoProveedorCom() {

    const [ proveedor, guardarProveedor ] = useState({
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
        
        guardarProveedor({
            ...proveedor,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {
        
        const { nombre, rut, razonSocial, direccion } = proveedor;

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

        guardarProveedor(autoCompletarInfo);

    }

    const nuevoProveedor = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.post(`/proveedor`, proveedor,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se agrego correctamente al proveedor',
                text: res.data.msg,
                type: 'success',
                timer: 2500
            });
                
            // redireccionar
            navigate(`/proveedorescom`, {replace: true});
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
        } else if (auth.tipo !== 1 && auth.tipo !== 3 && auth.tipo !== 4) { 
            navigate('/login', {replace: true});
        }
    }, []);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header-com">
                    <FiPlusCircle size={25} color={"#ebe1e1"}/>
                    <FaTruckMoving size={50} color={"#ebe1e1"}/>
                    <h1>Crear Nuevo Proveedor Comercializadora</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/proveedorescom`} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <form onSubmit={nuevoProveedor}>

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
                                    <div className='btn-new btn-return' onClick={() => guardarOtro(!otro) }>Buscar otro proveedor</div>
                                    <div className='btn-new btn-success-new' onClick={autoCompletarTodo}>Autocompletar datos</div>
                                </div>
                            </Fragment>

                            :
                            null
                        }

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre Proveedor<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                value={proveedor.nombre}
                                name='nombre'
                                placeholder='Nombre del proveedor'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="rut">Rut Proveedor<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='rut'
                                name='rut'
                                value={proveedor.rut}
                                placeholder='Rut del proveedor'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="razonSocial">Razón Social<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='razonSocial'
                                name='razonSocial'
                                value={proveedor.razonSocial}
                                placeholder='Razón Social del proveedor'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="direccion">Dirección<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='direccion'
                                name='direccion'
                                value={proveedor.direccion}
                                placeholder='Dirección del proveedor'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Crear Nuevo Proveedor"
                                disabled={validarForm()}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormNuevoProveedorCom
