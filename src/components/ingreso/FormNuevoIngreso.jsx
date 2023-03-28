import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineTool } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

import EmpresaContacto from './componentesNuevoIngreso/EmpresaContacto';
import TipoHerramienta from './componentesNuevoIngreso/TipoHerramienta';


function FormNuevoIngreso() {
    
    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`
    
    const [ preInforme, guardarPreInforme ] = useState({
        falla: '',
        tecnico: 'Alberto García'
    });
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
        tipoHerramientaId: '',
        otin: ''
    });
    const [ fecha, guardarFecha ] = useState(fechaActual);

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();
    
    const actualizarPre = e => {
        
        guardarPreInforme({
            ...preInforme,
            [e.target.name] : e.target.value
        });

    }

    const actualizarState = e => {
        
        guardarIngreso({
            ...ingreso,
            [e.target.name] : e.target.value
        });
        if(e.target.name === 'fecha'){
            guardarFecha(e.target.value)
        }
    }

    const agregarIngreso = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.post('/ih/ingreso', ingreso,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            const { herramientumId } = res.data;
            
            const datosPreinforme = {
                herramientumId,
                falla: preInforme.falla,
                tecnico: preInforme.tecnico
            }

            await clienteAxios.post('/ih/preinforme', datosPreinforme,{
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

        const { nombre, marca, fecha, modelo, comentario, clienteContactoId, tipoHerramientaId, otin } = ingreso;
        
        if( !(!nombre.length || !marca.length || !fecha.length || !modelo.length || !clienteContactoId.length || !comentario.length || !tipoHerramientaId.length  || !otin.length) ){
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

    const handleChange = (e) => {
        guardarIngreso({
            ...ingreso,
            "comentario" : e.target.value
        });
    }

    const avanzar = (event) => {
        if (event.keyCode === 13 && event.target.nodeName === "INPUT" && event.target.type !== 'submit') {
            var form = event.target.form;
            var index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

    const consultarAPI = async () => {

        try {        

            const res = await clienteAxios.get('/ih/otin',{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarIngreso({
                ...ingreso,
                otin: res.data
            })

        } catch (error) {
            console.log(error);     
            Swal.fire({
                type: 'error',
                title: 'Error en la OTIN',
                text: error.response.data.msg,
                timer: 1500
            }); 
            // redireccionar
            navigate('/ingresos', {replace: true});
        }
    }

    useEffect(() => {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        }
        consultarAPI();
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

                    <form onSubmit={agregarIngreso} onKeyDown={avanzar}>
                        <EmpresaContacto contactoListo={contactoListo}/>                    
 
                        <TipoHerramienta tipoListo={tipoListo}/>  
                        
                        <div className='campo'>
                            <label htmlFor="otin">OTIN<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='otin'
                                name='otin'
                                placeholder='otin de la Herramienta'
                                onChange={actualizarState}
                                defaultValue={ingreso.otin}
                                disabled={ auth.tipo === 2 ? true : false }
                            />
                        </div>                  

                        <div className='campo'>
                            <label htmlFor="fecha">Fecha Ingreso<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="date" 
                                id='fecha'
                                name='fecha'
                                defaultValue={fecha}
                                placeholder='Fecha Ingreso de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="nombre">Nombre<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                placeholder='Nombre de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="marca">Marca<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='marca'
                                name='marca'
                                placeholder='Marca de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="modelo">Modelo<span className='campo__obligatorio'>*</span>:</label>
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
                                type="text" 
                                id='numeroSerie'
                                name='numeroSerie'
                                placeholder='N° Serie de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="numeroInterno">N° Interno:</label>
                            <input 
                                type="text" 
                                id='numeroInterno'
                                name='numeroInterno'
                                placeholder='N° Interno de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="numeroGuiaCliente">N° Guía Cliente:</label>
                            <input 
                                type="text" 
                                id='numeroGuiaCliente'
                                name='numeroGuiaCliente'
                                placeholder='N° Guía Cliente de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="guiaDespacho">Guía de Despacho IDN:</label>
                            <input 
                                type="text" 
                                id='guiaDespacho'
                                name='guiaDespacho'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="fechaGuiaDespacho">Fecha Guía de Despacho IDN:</label>
                            <input 
                                type="date" 
                                id='fechaGuiaDespacho'
                                name='fechaGuiaDespacho'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="comentario">Comentario<span className='campo__obligatorio'>*</span>:</label>

                            <textarea name="comentario" id="comentario" cols="50" rows="10" defaultValue={ingreso.comentario}onChange={handleChange} ></textarea>
                        </div>

                        <h2 className='card-body-subtitle'>Preinforme</h2>

                        <div className='campo'>
                            <label htmlFor="falla">Fallas Presentadas:</label>

                            <textarea name="falla" id="falla" cols="50" rows="10" onChange={actualizarPre} ></textarea>
                        </div>

                        <div className='campo'>
                            <label htmlFor="tecnico" >Técnico:</label>
                            <select name="tecnico" id="tecnico" 
                                onChange={actualizarPre}
                            >
                                <option value={'Alberto García'} > Alberto García </option>    
                                <option value={'David Nilo'} > David Nilo </option>    
                                <option value={'Eduardo Beluzarán'} > Eduardo Beluzarán </option>    
                                
                            </select>
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Crear Nuevo Ingreso"
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