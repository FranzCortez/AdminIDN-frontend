import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineTool } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

function FormEditarIngreso() {

    const { id } = useParams();
    let entre = 0;

    const [ preInforme, guardarPreInforme ] = useState({
        falla: '',
        tecnico: ''
    });
    const [ ingreso, guardarIngreso ] = useState({
        nombre: '',
        marca: '',
        fecha: '',
        modelo: '',
        comentario: '',
        numeroInterno: '',
        numeroGuiaCliente: '',
        numeroSerie: '',
        clienteContactoId: '',
        tipoHerramientaId: 0,
        guiaDespacho: '',
        fechaGuiaDespacho: '',
        otin: ''
    });
    const [ tipos, guardarTipos ] = useState([]);
    const [ tipo, guardarTipo ] = useState(0);
    const [ empresas, guardarEmpresas ] = useState([]);
    const [ empresa, guardarEmpresa ] = useState(0);
    const [ contactos, guardarContactos ] = useState([]);
    const [ contacto, guardarContacto ] = useState(0);
    const [ fecha, guardarFecha ] = useState('');

    let idEmpresa = 0;

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

    const editarIngreso = async (e) => {
        e.preventDefault();

        if( entre > 0) {
            return;
        }
        
        entre = 1;

        try {
            const res = await clienteAxios.put(`/ih/ingreso/${id}`, ingreso,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            await clienteAxios.put(`/ih/preinforme/actualizar/${id}`, preInforme,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se actualizó correctamente el ingreso',
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

    const consultarAPI = async () => {
        try {
            const res = await clienteAxios.get(`ih/ingreso/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarIngreso({
                nombre: res.data.nombre,
                marca: res.data.marca,
                fecha: res.data.fecha,
                modelo: res.data.modelo,
                comentario: res.data.comentario,
                numeroInterno: res.data.numeroInterno,
                numeroGuiaCliente: res.data.numeroGuiaCliente,
                numeroSerie: res.data.numeroSerie,
                clienteContactoId: res.data.clienteContactoId,
                tipoHerramientaId: res.data.tipoHerramientaId,
                fechaGuiaDespacho: res.data.fechaGuiaDespacho,
                guiaDespacho: res.data.guiaDespacho,
                otin: res.data.otin
            });

            guardarFecha(res.data.fecha);

            const resTipo = await clienteAxios.get(`tipo/categoria/herramienta`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarTipo(res.data.tipoHerramientaId);
            guardarTipos(resTipo.data);

            const resEmpresa = await clienteAxios.get(`empresas/empresaNombre`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarEmpresas(resEmpresa.data);
            guardarEmpresa(res.data.clienteContacto.clienteEmpresa.id);

            idEmpresa = res.data.clienteContacto.clienteEmpresa.id;

            const resContacto = await clienteAxios.get(`contactos/contacto/${idEmpresa}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarContactos(resContacto.data);
            guardarContacto(res.data.clienteContactoId);

            const pre = await clienteAxios.get(`ih/preinforme/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarPreInforme({
                falla: pre.data?.falla ? pre.data.falla: '',
                tecnico: pre.data?.tecnico ? pre.data.tecnico: 'Alberto García'
            });

        } catch (error) {
            console.log(error)
            if(error.request.status === 404 ) {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.msg,
                    timer: 1500
                })
            }
            // redireccionar
            navigate('/ingresos', {replace: true});
        }
    }

    const consultarContactos = async (e) => {
        try {
            idEmpresa = (e.target.value);
            guardarEmpresa(e.target.value);
            guardarContacto(0);
            
            const res = await clienteAxios.get(`contactos/contacto/${idEmpresa}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarContactos(res.data);
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
            navigate('/ingresos', {replace: true});
        }        
    }

    const validarForm = () => {

        const { nombre, marca, fecha, modelo, comentario, clienteContactoId, tipoHerramientaId, otin } = ingreso;


        if( !(!nombre.length || !marca.length || !fecha.length || !modelo.length || !clienteContactoId || !comentario.length || !tipoHerramientaId || !otin) ){
            return false;
        }

        return true;
    }

    const contactoListo = (e) => {
        guardarIngreso({
            ...ingreso,
            "clienteContactoId" : e.target.value
        });
        guardarContacto(e.target.value);
    }

    const tipoListo = (e) => {
        guardarIngreso({
            ...ingreso,
            "tipoHerramientaId" : e.target.value
        });

        guardarTipo(e.target.value);
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
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        } else {
            consultarAPI();
        }
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <FiEdit size={50} color={"#333333"}/>
                    <AiOutlineTool size={50} color={"#333333"}/>
                    <h1>Editar Ingreso</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Modifique los campos según corresponda: </h2>
                    <p className='text-center'>Asegúrese que están ingresados anteriormente los primeros 3 datos para poder seleccionarlos</p>

                    <form onSubmit={editarIngreso} onKeyDown={avanzar}>
                        <div className='campo'>
                            <label htmlFor="nombre">Seleccione Empresa<span className='campo__obligatorio'>*</span>:</label>
                            <select name="empresa" id="empresa"  value={empresa} onChange={consultarContactos}>
                                <option value={0} disabled> -- Seleccione -- </option>    
                                {
                                    empresas.map(empresa => (
                                        <option value={empresa.id} key={empresa.id}>{empresa.nombre}</option>
                                    ))
                                }
                            </select>     
                            <Link to={'/clientes/nuevo'} className="btn-new btn-success-new">Crear Nueva Empresa</Link>                    
                        </div>                                   

                        <div className='campo'>
                            <label htmlFor="nombre">Seleccione Contacto Empresa<span className='campo__obligatorio'>*</span>:</label>
                            <select name="clienteContactoId" id="clienteContactoId"  value={contacto} onChange={contactoListo}>
                                <option value={0} disabled> -- Seleccione -- </option>    
                                {
                                    contactos.map(contacto => (
                                        <option value={contacto.id} key={contacto.id}>{contacto.nombre}</option>
                                    ))
                                }
                            </select>   
                            <Link to={`/clientes/contacto/${empresa}/nuevo`} className="btn-new btn-success-new">Crear Nueva Contacto</Link>                         
                        </div>                     
 
                        <div className='campo'>
                            <label htmlFor="nombre">Seleccione Tipo Herramienta<span className='campo__obligatorio'>*</span>:</label>
                            <select name="empresa" id="empresa"  value={tipo} onChange={tipoListo}>
                                <option value={0} disabled> -- Seleccione -- </option>    
                                {
                                    tipos.map(tipo => (
                                        <option value={tipo.id} key={tipo.id}>{tipo.nombre}</option>
                                    ))
                                }
                            </select>     
                            <Link to={'#'} className="btn-new btn-success-new">Crear Tipo Herramienta</Link>                    
                        </div>     

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
                                value={fecha}
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
                                value={ingreso.nombre}
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
                                value={ingreso.marca}
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
                                value={ingreso.modelo}
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
                                value={ingreso.numeroSerie}
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
                                value={ingreso.numeroInterno}
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
                                value={ingreso.numeroGuiaCliente}
                                placeholder='N° Guía Cliente de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="guiaDespacho">Guía de Despacho IDN</label>
                            <input 
                                type="text" 
                                id='guiaDespacho'
                                name='guiaDespacho'
                                value={ingreso.guiaDespacho}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="fechaGuiaDespacho">Fecha Guía de Despacho IDN</label>
                            <input 
                                type="date" 
                                id='fechaGuiaDespacho'
                                name='fechaGuiaDespacho'
                                value={ingreso.fechaGuiaDespacho}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="comentario">Comentario<span className='campo__obligatorio'>*</span>:</label>

                            <textarea name="comentario" id="comentario" cols="50" rows="10" defaultValue={ingreso.comentario} onChange={actualizarState} ></textarea>
                        </div>

                        <h2 className='card-body-subtitle'>Preinforme</h2>

                        <div className='campo'>
                            <label htmlFor="falla">Fallas Presentadas:</label>

                            <textarea name="falla" id="falla" cols="50" rows="10" onChange={actualizarPre} value={preInforme?.falla} ></textarea>
                        </div>

                        <div className='campo'>
                            <label htmlFor="tecnico" >Técnico:</label>
                            <select name="tecnico" id="tecnico" 
                                onChange={actualizarPre} value={preInforme?.tecnico}
                            >
                                <option value={'Alberto García'} > Alberto García </option>    
                                <option value={'Marco A. García'} > Marco A. García </option>    
                                <option value={'Juan P. Marca Bozo'} > Juan P. Marca Bozo </option>    
                                
                            </select>
                        </div>
 
                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Guardar Cambios"
                                disabled={validarForm()}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormEditarIngreso;
