import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineTool } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { TrixEditor } from "react-trix";
import Swal from 'sweetalert2';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

import EmpresaContacto from './componentesNuevoIngreso/EmpresaContacto';
import TipoHerramienta from './componentesNuevoIngreso/TipoHerramienta';


function FormNuevoIngreso() {
    
    const today = new Date();
    const dd = today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`
    
    const [ ingreso, guardarIngreso ] = useState({
        nombre: '',
        marca: '',
        fecha: fechaActual,
        modelo: '',
        comentario: '',
        numeroInterno: '',
        numeroGuiaCliente: '',
        numeroSerie: '',
        clienteContactoId: '',
        tipoHerramientaId: ''
    });

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();
    
    const actualizarState = e => {
        
        guardarIngreso({
            ...ingreso,
            [e.target.name] : e.target.value
        });
    }

    const agregarIngreso = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.post('/ih/ingreso', ingreso,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se agrego correctamente el ingreso',
                text: res.data.msg,
                type: 'success',
                timer: 3500
            });
                
            // redireccionar
            navigate('/ingresos', {replace: true});
        } catch (error) {
            console.log(error)
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.msg,
                timer: 1500
            });            
        }
        
    }

    const validarForm = () => {

        const { nombre, marca, fecha, modelo, comentario, clienteContactoId, tipoHerramientaId } = ingreso;
        
        if( !(!nombre.length || !marca.length || !fecha.length || !modelo.length || !clienteContactoId.length || !comentario.length || !tipoHerramientaId.length) ){
            return false;
        }

        return true;
    }

    const contactoListo = (e) => {
        guardarIngreso({
            ...ingreso,
            "clienteContactoId" : e.target.value
        });
    }

    const tipoListo = (e) => {
        guardarIngreso({
            ...ingreso,
            "tipoHerramientaId" : e.target.value
        });
    }

    const handleChange = (html, text) => {
        guardarIngreso({
            ...ingreso,
            "comentario" : html
        });
    }

    useEffect(() => {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        }
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <MdAddCircle size={50} color={"#333333"}/>
                    <AiOutlineTool size={50} color={"#333333"}/>
                    <h1>Crear Nuevo Ingreso</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>
                    <p className='text-center'>Asegúrese que están ingresados anteriormente los primeros 3 datos para poder seleccionarlos</p>

                    <form onSubmit={agregarIngreso}>
                        <EmpresaContacto contactoListo={contactoListo}/>                    
 
                        <TipoHerramienta tipoListo={tipoListo}/>                    

                        <div className='campo'>
                            <label htmlFor="fecha">Fecha Ingreso:</label>
                            <input 
                                type="date" 
                                id='fecha'
                                name='fecha'
                                value={fechaActual}
                                placeholder='Fecha Ingreso de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                placeholder='Nombre de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="marca">Marca:</label>
                            <input 
                                type="text" 
                                id='marca'
                                name='marca'
                                placeholder='Marca de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="modelo">Modelo:</label>
                            <input 
                                type="text" 
                                id='modelo'
                                name='modelo'
                                placeholder='Modelo de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="numeroSerie">N° Serie:</label>
                            <input 
                                type="number" 
                                id='numeroSerie'
                                name='numeroSerie'
                                placeholder='N° Serie de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="numeroInterno">N° Interno:</label>
                            <input 
                                type="number" 
                                id='numeroInterno'
                                name='numeroInterno'
                                placeholder='N° Interno de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="numeroGuiaCliente">N° Guía Cliente:</label>
                            <input 
                                type="number" 
                                id='numeroGuiaCliente'
                                name='numeroGuiaCliente'
                                placeholder='N° Guía Cliente de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="comentario">Comentario:</label>
                        </div>
                        <TrixEditor onChange={handleChange} name='comentario'/>

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

export default FormNuevoIngreso;