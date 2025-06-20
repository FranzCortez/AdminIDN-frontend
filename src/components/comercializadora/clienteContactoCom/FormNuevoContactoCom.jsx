import React, { useState, Fragment, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdContactPhone } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function FormNuevoContactoCom() {
    
    const { idEmpresa } = useParams();
    let entre = 0;

    const [ contacto, guardarContacto ] = useState({
        nombre: '',
        cargo: '',
        correo: '',
        telefono: ''
    });

    const [ autoCompletarInfo, guardarAutoCompletarInfo ] = useState({
        nombre: '',
        cargo: '',
        correo: '',
        telefono: ''
    });

    const [ otro, guardarOtro ] = useState(false);

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
        autoCompletar(nombre, cargo, correo);
        if( (nombre.length > 0 && cargo.length > 0 && correo.length > 0 ) ){
            return false;
        }

        return true;
    }

    const autoCompletar = async ( nombre, telefono, correo ) => {
        
        if ( nombre.length > 5 || telefono.length > 4 || correo.length > 5 ) {

            if ( otro ) return;

            try {

                const res = await clienteAxios.post(`/clientescom/`, { nombre, telefono, correo },{
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

        guardarContacto(autoCompletarInfo);

    }

    const nuevoContacto = async (e) => {
        e.preventDefault();
        if( entre > 0) {
            return;
        }
        
        entre = 1;
        try {            
            const res = await clienteAxios.post(`/clientescom/contactocom/${idEmpresa}`, contacto,{
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
            navigate(`/clientescom/contacto/${idEmpresa}`, {replace: true});
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
                    <MdContactPhone size={50} color={"#ebe1e1"}/>
                    <h1>Crear Nuevo Contacto</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/clientescom/contacto/${idEmpresa}`} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    {
                        autoCompletarInfo.nombre !== '' ?

                        <Fragment>

                            <div className='autoCompletar'>
                                <p><span>Nombre:</span> {autoCompletarInfo.nombre}</p>
                                <p><span>Correo:</span> {autoCompletarInfo.correo}</p>
                                <p><span>Cargo:</span> {autoCompletarInfo.cargo}</p>
                                <p><span>Teléfono:</span> {autoCompletarInfo.telefono}</p>                                    
                            </div>
                            <div className='opciones'>
                                <div className='btn-new btn-return' onClick={() => guardarOtro(!otro) }>Buscar otro cliente</div>
                                <div className='btn-new btn-success-new' onClick={autoCompletarTodo}>Autocompletar datos</div>
                            </div>
                        </Fragment>

                        :
                        null
                    }

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

export default FormNuevoContactoCom
