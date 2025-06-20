import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { VscTools } from 'react-icons/vsc';
import { BsPencilSquare } from "react-icons/bs";
import Swal from 'sweetalert2';

import { parseVulgars } from 'vulgar-fractions';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';

function FormEditarEquipoCom() {

    const { id } = useParams();
    
    const [ equipo, guardarEquipo ] = useState({
        nombre: '',
        descripcion: ''
    });
    
    let entre = 0;

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarEquipo({
            ...equipo,
            [e.target.name] : parseVulgars(e.target.value)
        });
    }

    const validarForm = () => {

        const { nombre } = equipo;
        
        if( !(!nombre.length) ){
            return false;
        }

        return true;
    }

    const editarEquipoPadre = async (e) => {
        e.preventDefault();

        if( entre > 0) {
            return;
        }
        
        entre = 1;
        
        try {            
            const res = await clienteAxios.put('/equipo/padre/' + id, equipo,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se agrego actualizo el insumo/equipo',
                text: res.data.msg,
                type: 'success',
                timer: 3500
            });
                
            // redireccionar
            navigate('/equiposcom', {replace: true});
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
            const res = await clienteAxios.get(`equipo/padre/obtener/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarEquipo(res.data);
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
            navigate('/equiposcom', {replace: true});
        }

    }

    useEffect(() => {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 3 && auth.tipo !== 4){ 
            navigate('/login', {replace: true});
        }

        consultarAPI();
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header-com">
                    <BsPencilSquare size={50} color={"#ebe1e1"}/>
                    <VscTools size={50} color={"#ebe1e1"}/>
                    <h1>Editar Insumo/Equipo</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/equiposcom'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <form onSubmit={editarEquipoPadre}>
                        
                        <div className='campo'>
                            <label htmlFor="nombre">Nombre Insumo/Equipo<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombre'
                                name='nombre'
                                placeholder='Nombre genérico para el insumo/equipo'
                                onChange={actualizarState}
                                value={equipo.nombre}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="descripcion">Descripción (opcional):</label>

                            <textarea name="descripcion" id="descripcion" cols="50" rows="10" onChange={actualizarState} value={equipo.descripcion} ></textarea>
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Actualizar Insumo/Equipo"
                                disabled={validarForm()}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormEditarEquipoCom
