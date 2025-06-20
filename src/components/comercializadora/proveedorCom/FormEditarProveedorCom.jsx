import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { FaTruckMoving } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function FormEditarProveedorCom() {

    const { id } = useParams();

    const [ proveedor, guardarProveedor ] = useState({
        nombre: '',
        rut: '',
        razonSocial: '',
        direccion: ''
    });

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
        
        if( (nombre.length > 0 && rut.length > 0 && razonSocial.length > 0 && direccion.length > 0) ){
            return false;
        }

        return true;
    }

    const actualizarProveedor = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.put(`/proveedor`, proveedor,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se actualizó correctamente el proveedor',
                text: res.data.msg,
                type: 'success',
                timer: 2500
            });
                
            // redireccionar
            navigate(`/proveedorescom`, {replace: true});
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
            const res = await clienteAxios.get(`/proveedor/obtener/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            console.log(res.data)
            guardarProveedor(res.data);
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
            navigate('/clientescom', {replace: true});
        }

    }

    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 3 || auth.tipo === 4) ) {
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header-com">
                    <BsPencilSquare size={25} color={"#ebe1e1"}/>
                    <FaTruckMoving size={50} color={"#ebe1e1"}/>
                    <h1>Editar Proveedor</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/proveedorescom`} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Cambie los campos según corresponda: </h2>

                    <form onSubmit={actualizarProveedor}>

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre Proveedor<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                placeholder='Nombre del Proveedor'
                                onChange={actualizarState}
                                value={proveedor?.nombre}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="rut">Rut proveedor<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='rut'
                                name='rut'
                                placeholder='Rut del Proveedor'
                                onChange={actualizarState}
                                value={proveedor?.rut}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="razonSocial">Razón Social<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='razonSocial'
                                name='razonSocial'
                                placeholder='Razón Social del Proveedor'
                                onChange={actualizarState}
                                value={proveedor?.razonSocial}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="direccion">Dirección<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='direccion'
                                name='direccion'
                                placeholder='Dirección del Proveedor'
                                onChange={actualizarState}
                                value={proveedor?.direccion}
                            />
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Actualizar Proveedor"
                                disabled={validarForm()}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormEditarProveedorCom
