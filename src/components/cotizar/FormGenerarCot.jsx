import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineRequestQuote } from "react-icons/md";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';
import FormNuevoContenido from './FormNuevoContenido';

function FormGenerarCot() {

    const { id } = useParams();

    const [ herramienta, guardarHerramienta ] = useState({});
    const [ contenido, guardarContenido ] = useState([]);
    const [ cotizacion, guardarCotizacion ] = useState({
        fechaEvaluacion: '',
        fechaCotizacion: '',
        descuento: 0,
        subtotal: 0,
        neto: 0,
        iva: 0,
        total: 0
    });

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);
    
    let navigate = useNavigate();

    const actualizarState = e => {    
        if( e.target.name === 'descuento') {
            try {             

                let neto = cotizacion.subtotal - ( cotizacion.subtotal * (parseInt(e.target.value) / 100) );

                let iva = neto *0.19;

                let total = iva + neto;

                guardarCotizacion({
                    ...cotizacion,
                    neto,
                    iva,
                    total,
                    [e.target.name] : e.target.value
                });
                
            } catch (error) {
                console.log(error);
            }
        } else {
            guardarCotizacion({
                ...cotizacion,
                [e.target.name] : e.target.value
            });
        }
    }
    
    const actualizarContenido = (data) => {

        let guardar = [...contenido];
        guardar.push(data);
        
        let subtotal = 0;
        guardar.forEach(element => {
            subtotal += (element.valor * element.cantidad);
        });

        let neto = subtotal - ( subtotal * (cotizacion.descuento / 100) );

        let iva = neto *0.19;

        let total = iva + neto;

        guardarCotizacion({ 
            ...cotizacion, 
            subtotal,
            neto,
            total,
            iva
        });

        guardarContenido(guardar);
    }

    const eliminarContenido = (datos) => {
        
        let guardar = [...contenido];

        guardar = guardar.filter( data => data !== datos);

        guardarContenido(guardar);

        let subtotal = 0;
        guardar.forEach(element => {
            subtotal += (element.valor * element.cantidad);
        });

        let neto = subtotal - ( subtotal * (cotizacion.descuento / 100) );

        let iva = neto *0.19;

        let total = iva + neto;

        guardarCotizacion({ 
            ...cotizacion, 
            subtotal,
            neto,
            total,
            iva
        });
    }

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const validarForm = () => {
        
        const { fechaCotizacion, fechaEvaluacion, descuento } = cotizacion;
                
        if( (fechaCotizacion.length > 0 && fechaEvaluacion.length > 0 && descuento >= 0 && descuento.length > 0) ){
            return false;
        }

        return true;
    }

    const consultarAPI = async () => {
        try {

            const res = await clienteAxios.get(`ih/ingreso/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
    
            guardarHerramienta(res.data);

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

    useEffect(()=> {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        } else {
            consultarAPI();
        }
    }, [contenido]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <MdOutlineRequestQuote size={50} color={"#333333"}/>
                    <h1>Nueva Cotización para otin: {herramienta.otin}</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/ingresos`} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <form>

                        <div className='campo'>
                            <label htmlFor="fechaEvaluacion">Fecha Evaluación<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="date" 
                                id='fechaEvaluacion'
                                name='fechaEvaluacion'
                                placeholder='Fecha Evaluación de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="fechaCotizacion">Fecha Cotización<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="date" 
                                id='fechaCotizacion'
                                name='fechaCotizacion'
                                placeholder='Fecha Cotización de la Herramienta'
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <h2 className='card-body-subtitle'>Contenido de la Tabla</h2>
                        <h3 className='card-body-subtitle'>Maximo 10 Filas</h3>

                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr className='table__head'>
                                        <th scope="col">ITEM</th>
                                        <th scope="col">Nombre del Componente</th>
                                        <th scope="col">Desc. Repuesto</th>
                                        <th scope="col">Cant.</th>
                                        <th scope="col">Valor Unit. Repuesto</th>
                                        <th scope="col">Subtotal</th>
                                        <th scope="col">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contenido.length > 0 ? (
                                            contenido.map((datos, index) => (
                                                <tr className='table__tr' key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{datos.nombre}</td>
                                                    <td>{datos.descripcion}</td>
                                                    <td>{datos.cantidad}</td>
                                                    <td>${valorNumero(datos.valor)}</td>
                                                    <td>${valorNumero((datos.valor * datos.cantidad))}</td>
                                                    <td><button type='button' className="btn btn-danger" onClick={() => {eliminarContenido(datos);}}><RiDeleteBin2Line size={23}/></button></td>
                                                </tr>
                                            ))
                                        ) : <tr><td><p className='mensaje-vacio'>Aun no hay datos</p></td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="enviar mbt-2">
                            <FormNuevoContenido 
                                actualizarContenido={actualizarContenido}
                                activo={contenido.length >= 10 ? true : false}
                            />
                        </div>

                        <h2 className='card-body-subtitle'>Descuento</h2>
                        
                        <div className='campo'>
                            <label htmlFor="descuento">Descuento<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="number" 
                                id='descuento'
                                name='descuento'
                                min={0}
                                max={100}
                                defaultValue={0}
                                onChange={actualizarState}
                            /> 
                            <label htmlFor="descuento" className='porcentaje'>%</label>                            
                        </div>

                        <h2 className='card-body-subtitle'>Resumen Valor Total:</h2>
                        
                        <div className='font-2 pdf__pie-final'>
                            <table className="table table-hover">                                
                                <tbody>
                                    <tr className='table__tr'>
                                        <th scope="col">Sub-Total:</th>
                                        <td>${valorNumero(cotizacion.subtotal)}</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">Descuento:</th>
                                        <td>{cotizacion.descuento}%</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">Neto:</th>
                                        <td>${valorNumero(cotizacion.neto)}</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">IVA (19%)</th>
                                        <td>${valorNumero(cotizacion.iva)}</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">TOTAL:</th>
                                        <td>${valorNumero(cotizacion.total)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Generar Cotización"
                                disabled={validarForm()}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormGenerarCot;