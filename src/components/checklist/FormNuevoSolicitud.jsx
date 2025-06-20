import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineTool } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';


function FormNuevoSolicitud() {
    
    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`
    
    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);
    
    const [ solicitud, guardarSolicitud ] = useState({
        titulo: '',
        estado: 'En Revisión',
        prioridad: '',
        tipo: '',
        fechaSolicitud: fechaActual,
        descripcion: '',
        de: auth.nombre
    });
    let entre = 0;

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarSolicitud({
            ...solicitud,
            [e.target.name] : e.target.value
        });
    }

    const agregarSolicitud = async (e) => {
        e.preventDefault();
        if( entre > 0) {
            return;
        }
        
        entre = 1;
        
        try {            
            const res = await clienteAxios.post('/checklist/nuevo', solicitud,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se agrego correctamente la solicitud',
                text: res.data.msg,
                type: 'success',
                timer: 3500
            });
                
            // redireccionar
            navigate('/checklist', {replace: true});
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

        const { titulo, estado, fechaSolicitud, prioridad, tipo, descripcion, de } = solicitud;
        
        if( !(!titulo.length || !estado.length || !fechaSolicitud.length || !prioridad.length || !descripcion.length || !tipo.length || !de.length  ) ){
            return false;
        }

        return true;
    }

    const avanzar = (event) => {
        if (event.keyCode === 13 && event.target.nodeName === "INPUT" && event.target.type !== 'submit') {
            var form = event.target.form;
            var index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

    useEffect(() => {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 4) { 
            navigate('/login', {replace: true});
        }
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <MdAddCircle size={50} color={"#333333"}/>
                    <AiOutlineTool size={50} color={"#333333"}/>
                    <h1>Crear Nueva Solicitud</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/checklist'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <form onSubmit={agregarSolicitud} onKeyDown={avanzar}>
                        
                        <div className='campo'>
                            <label htmlFor="titulo">Título<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='titulo'
                                name='titulo'
                                placeholder='Título de la solicitud'
                                onChange={actualizarState}
                                defaultValue={solicitud.titulo}
                            />
                        </div>    

                        <div className='campo'>
                            <label htmlFor="descripcion">Descripción:</label>

                            <textarea name="descripcion" id="descripcion" cols="50" rows="10" onChange={actualizarState} ></textarea>
                        </div>

                        <div className='campo'>
                            <label htmlFor="tipo" >Tipo de solicitud:</label>
                            <select name="tipo" id="tipo" 
                                onChange={actualizarState}
                            >
                                <option value={'0'} disabled selected> -- Seleccione -- </option>    
                                <option value={'Solicitud'} > Solicitud </option>    
                                <option value={'Sugerencia'} > Sugerencia </option>    
                                <option value={'Bug'} > Bug </option>    
                                <option value={'Eliminar'} > Eliminar </option>    
                                <option value={'Error'} > Error </option>    
                            </select>
                        </div>

                        <div className='campo'>
                            <label htmlFor="prioridad" >Prioridad:</label>
                            <select name="prioridad" id="prioridad" 
                                onChange={actualizarState}
                            >
                                <option value={'0'} disabled selected> -- Seleccione -- </option> 
                                <option value={'Alta'} > Alta </option>    
                                <option value={'Media'} > Media </option>    
                                <option value={'Baja'} > Baja </option>    
                                
                            </select>
                        </div>

                        <div className='campo'>
                            <label htmlFor="estado" >Estado:</label>
                            <select name="estado" id="estado" 
                                onChange={actualizarState}
                            >
                                <option value={'En Revisión'} selected> En Revisión </option>    
                                <option value={'Aprobado'} > Aprobado </option>    
                                <option value={'En Proceso'} > En Proceso </option>    
                                <option value={'Entregado'} > Entregado </option>    
                                <option value={'Cancelado'} > Cancelado </option>    
                                
                            </select>
                        </div>

                        <div className='campo'>
                            <label htmlFor="fechaSolicitud">Fecha Solicitud<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="date" 
                                id='fechaSolicitud'
                                name='fechaSolicitud'
                                defaultValue={solicitud.fechaSolicitud}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Crear Nueva Solicitud"
                                disabled={validarForm()}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormNuevoSolicitud;