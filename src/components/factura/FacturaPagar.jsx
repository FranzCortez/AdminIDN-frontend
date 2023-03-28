import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

import { CRMContext } from '../context/CRMContext';

function FacturaPagar() {

    const { id } = useParams();
    
    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`

    const [ fecha, guaradrFecha ] = useState({
        fechaPago: fechaActual
    });
    let entre = 0;

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guaradrFecha({
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {           
        return false;
    }

    const pagarFactura = async (e) => {

        try {

            e.preventDefault();

            if( entre > 0) {
                return;
            }
            
            entre = 1;

            const res = await clienteAxios.post(`/factura/pagar/${id}`, fecha, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se Pago la Factura Correctamente',
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
        } else if (auth.tipo !== 1){ 
            navigate('/login', {replace: true});
        }
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <AiOutlineDollarCircle size={50} color={"#333333"}/>
                    <h1>Pagar Factura</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/facturas'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <form onSubmit={pagarFactura}>

                        <div className='campo'>
                            <label htmlFor="fechaPago">Fecha de Pago<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="date" 
                                id='fechaPago'
                                name='fechaPago'
                                onChange={actualizarState}
                                defaultValue={fecha.fechaPago}
                            />
                        </div>                        

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Pagar Factura"
                                disabled={validarForm()}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FacturaPagar;