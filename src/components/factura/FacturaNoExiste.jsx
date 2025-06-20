import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

function FacturaNoExiste() {

    const location = useLocation();

    const [ factura, guardarFactura ] = useState({
        numeroFactura: location.state.from,
        fechaFactura: '',
        numeroCompra: '',
        fechaCompra: '',
        formaPago: '',
        monto: '',
        fechaPago: '',
        observaciones: '',
        guiaDespacho: '',
        fechaGuiaDespacho: '',
        estado: 'No Existe',
        guardarOtines: []
    });

    let entre = 0;

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarFactura({
            ...factura,
            [e.target.name] : e.target.value
        });
    }

    const agregarFactura = async (e) => {
        e.preventDefault();
        if( entre > 0) {
            return;
        }
        
        entre = 1;

        Swal.fire ({
            title: '¿Estás seguro de agregar este n° de factura?',
            text: "Una vez ingresado no se puede borrar",
            type: 'warning',
            showCancelButton : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText : 'Sí, Agregar!',
            cancelButtonText: 'Cancelar'
        }).then( async (result) => {
            if (result.value) {
                try {            
                    const res = await clienteAxios.post('/factura', factura,{
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
        
                    Swal.fire({
                        title: 'Se agrego correctamente la factura no existente',
                        text: res.data.msg,
                        type: 'success',
                        timer: 3500
                    });
                        
                    // redireccionar
                    navigate('/facturas', {replace: true});
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
        });
    }

    const validarForm = () => {

        const { numeroFactura } = factura;
        
        if( !(!numeroFactura.length) ){
            return false;
        }

        return true;
    }

    const consultarAPI = async () => {

        const nfact = await clienteAxios.get(`factura/`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        guardarFactura({
            ...factura,
            numeroFactura: nfact.data.numero + 1
        });
    }

    useEffect(() => {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 || auth.tipo !== 4){ 
            navigate('/login', {replace: true});
        }
        consultarAPI();
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <MdAddCircle size={50} color={"#333333"}/>
                    <AiOutlineDollarCircle size={50} color={"#333333"}/>
                    <h1>Crear Nueva Factura</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        <Link to={'/facturas'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>
                    <p className='text-center'>Una vez creada no se puede borrar, asegúrese que está ingresando correctamente el N° de Factura</p>

                    <form onSubmit={agregarFactura}>
    
                        <div className='campo'>
                            <label htmlFor="numeroFactura">Número Factura<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="number" 
                                id='numeroFactura'
                                name='numeroFactura'
                                placeholder='Número Factura'
                                onChange={actualizarState}
                                defaultValue={factura.numeroFactura}
                            />
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Crear Factura"
                                disabled={validarForm()}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FacturaNoExiste