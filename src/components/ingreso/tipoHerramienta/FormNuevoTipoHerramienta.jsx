import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { VscTools } from 'react-icons/vsc';
import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2';

import { parseVulgars } from 'vulgar-fractions';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';

function FormNuevoTipoHerramienta() {

    const [ herramienta, guardarHerramienta ] = useState({
        nombre: '',
        descripcion: '',
        recomendacion: '',
        conclusion: ''
    });
    let entre = 0;

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarHerramienta({
            ...herramienta,
            [e.target.name] : parseVulgars(e.target.value)
        });
    }

    const validarForm = () => {

        const { nombre } = herramienta;
        
        if( !(!nombre.length) ){
            return false;
        }

        return true;
    }

    const agregarTipoHerramienta = async (e) => {
        e.preventDefault();

        if( entre > 0) {
            return;
        }
        
        entre = 1;
        
        try {            
            const res = await clienteAxios.post('tipo/categoria/herramienta', herramienta,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se agrego correctamente el tipo de herramienta',
                text: res.data.msg,
                type: 'success',
                timer: 3500
            });
                
            // redireccionar
            navigate('/ingresos/tipoherramienta', {replace: true});
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
                    <VscTools size={50} color={"#333333"}/>
                    <h1>Crear Nuevo Tipo de Herramienta</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos/tipoherramienta'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <form onSubmit={agregarTipoHerramienta}>
                        
                        <div className='campo'>
                            <label htmlFor="nombre">Nombre Herramienta<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                placeholder='Nombre Genérico para el Tipo de Herramienta'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="descripcion">Descripción (opcional):</label>

                            <textarea name="descripcion" id="descripcion" cols="50" rows="10" onChange={actualizarState} ></textarea>
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="recomendacion">Recomendación (opcional):</label>

                            <textarea name="recomendacion" id="recomendacion" cols="50" rows="10" onChange={actualizarState} ></textarea>
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="conclusion">Conclusión (opcional):</label>

                            <textarea name="conclusion" id="conclusion" cols="50" rows="10" onChange={actualizarState} ></textarea>
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Crear Nuevo Tipo de Herramienta"
                                disabled={validarForm()}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormNuevoTipoHerramienta;