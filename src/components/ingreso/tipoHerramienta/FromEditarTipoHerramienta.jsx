import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { VscTools } from 'react-icons/vsc';
import { BsPencilSquare } from "react-icons/bs";
import Swal from 'sweetalert2';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';

function FromEditarTipoHerramienta() {

    const { id } = useParams();

    const [ herramienta, guardarHerramienta ] = useState({
        nombre: '',
        descripcion: '',
    });

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarHerramienta({
            ...herramienta,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {

        const { nombre } = herramienta;
        
        if( !(!nombre.length) ){
            return false;
        }

        return true;
    }

    const guardarTipoHerramienta = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.put(`tipo/categoria/herramienta/${id}`, herramienta,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se actualizo correctamente el tipo de herramienta',
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

    const consultarAPI = async () => {

        try {
            const res = await clienteAxios.get(`tipo/categoria/herramienta/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            console.log(res.data)

            guardarHerramienta(res.data);
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
            navigate('/ingresos/tipoherramienta', {replace: true});
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
                    <BsPencilSquare size={50} color={"#333333"}/>
                    <VscTools size={50} color={"#333333"}/>
                    <h1>Editar Tipo de Herramienta</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos/tipoherramienta'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Modifique los campos según corresponda: </h2>

                    <form onSubmit={guardarTipoHerramienta}>
                        
                        <div className='campo'>
                            <label htmlFor="nombre">Nombre Herramienta:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                value={herramienta.nombre}
                                placeholder='Nombre Generico para el Tipo de Herramienta'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="descripcion">Descripción (opcional):</label>

                            <textarea name="descripcion" id="descripcion" cols="50" value={herramienta.descripcion} rows="10" onChange={actualizarState} ></textarea>
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

export default FromEditarTipoHerramienta;