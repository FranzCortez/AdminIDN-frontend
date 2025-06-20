import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

import { CRMContext } from '../context/CRMContext';

function FacturaNotaCredito() {
  
    const { id } = useParams();
    let entre = 0;
    
    const [ numero, guaradarNumero ] = useState({
        numeroNotaCredito: 0
    });

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guaradarNumero({
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {     
        
        if(numero.numeroNotaCredito <= 0) {
            return true
        }

        return false;
    }

    const notaCredito = (e) => {

        e.preventDefault();
        if( entre > 0) {
            return;
        }
        
        entre = 1;
        Swal.fire ({
            title: '¿Estás seguro de crear una nota de crédito?',
            text: "Una vez realizado no se puede borrar",
            type: 'warning',
            showCancelButton : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText : 'Sí, Crear!',
            cancelButtonText: 'Cancelar'
        }).then( (result) => {
            if (result.value) {
                crearNotaCredito();
            }
        });
    }

    const crearNotaCredito = async () => {

        try {            

            const res = await clienteAxios.post(`/factura/anular/${id}`, numero, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se realizo una nota de credito',
                text: res.data.msg,
                type: 'success',
                timer: 2500
            });
            
        } catch (error) {
            console.log(error);
        }
        navigate('/facturas', {replace: true});
    }

    useEffect(() => {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 || auth.tipo !== 4){ 
            navigate('/login', {replace: true});
        }
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <AiOutlineDollarCircle size={50} color={"#333333"}/>
                    <h1>Nota de Crédito para Factura</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/facturas'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <form onSubmit={notaCredito}>

                        <div className='campo'>
                            <label htmlFor="numeroNotaCredito">N° de Nota de Crédito<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="number" 
                                id='numeroNotaCredito'
                                name='numeroNotaCredito'
                                onChange={actualizarState}
                                defaultValue={numero.numeroNotaCredito}
                            />
                        </div>                        

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Crear Nota de Crédito"
                                disabled={validarForm()}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FacturaNotaCredito;