import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineRequestQuote } from "react-icons/md";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';
import FormNuevoContenido from './FormNuevoContenido';

import FormInfoCot from './FormInfoCot';

function FormGenerarCot() {

    const { id } = useParams();

    const [ cotizacionBackend, guardarCotizacionBackend ] = useState({});
    const [ herramienta, guardarHerramienta ] = useState({});
    const [ contenido, guardarContenido ] = useState([]);
    const [ contenidoPdf, guardarContenidoPdf ] = useState([]);
    const [ cotizacion, guardarCotizacion ] = useState({
        fechaEvaluacion: '',
        fechaCotizacion: '',
        condiciones: 'VALIDEZ DEL PRESUPUESTO ES DE 15 DÍAS.',
        plazoEntrega: 'Inmediata, recibida la o/c',
        garantia: 'GARANTÍA DE 3 MESES, SÓLO DE COMPONENTES CAMBIADOS O REPARADOS.',
        gastos: 'De no aceptarse el presente presupuesto (o en caso de baja del equipo), se cobrarán $40.000, por gastos de desarme, evaluación e informe técnico.',
        descuento: 0,
        subtotal: 0,
        neto: 0,
        iva: 0,
        total: 0,
        nombreCliente: ''
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
        
        const { fechaCotizacion, fechaEvaluacion, descuento, condiciones, garantia, plazoEntrega } = cotizacion;
        if( (fechaCotizacion.length > 0 && fechaEvaluacion.length > 0 && descuento >= 0 && descuento !== '' && condiciones.length > 0 && garantia.length > 0 && plazoEntrega.length > 0) ){
            return false;
        }

        return true;
    }

    const relleno = (data) => {
        for (let i = 0; i < (10 - contenido.length); i++) {
            data.push({});
        }
        return data;
    }

    const crearPDF = async () => {

        guardarCotizacionBackend({
            otin: herramienta.otin,
            herramientumId: herramienta.id
        });

        if(contenido.length < 10) {
            let guardar = [...contenido];
            guardar = await relleno(guardar)
            guardarContenidoPdf(guardar);
        } 

        document.querySelector("#cot").classList.add("dn");
        document.querySelector("#cot").classList.remove("db");
        document.querySelector("#info").classList.remove("dn");
        document.querySelector("#info").classList.add("db");
    }

    const consultarAPI = async () => {
        try {

            const res = await clienteAxios.get(`ih/ingreso/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarHerramienta(res.data);

            guardarCotizacion({
                ...cotizacion,
                nombreCliente : res.data.clienteContacto?.clienteEmpresa?.nombre
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

    useEffect(()=> {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        } else {
            consultarAPI();
        }
        document.querySelector("#info").classList.add("dn");
    }, [contenido]);

    return (
        <Fragment>
            <div className="card contenedor" id='cot'>
                <div className="card-header">
                    <MdOutlineRequestQuote size={50} color={"#333333"}/>
                    <h1>Nueva Cotización para otin: {herramienta.otin}</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/ingresos`} className="btn-new btn-error"><ImCancelCircle size={25}/> Cancelar Informe</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <form onSubmit={e => e.preventDefault()}>

                        <div className="campo">
                            <label htmlFor="nombreCliente">Nombre Cliente<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nombreCliente'
                                name='nombreCliente'
                                placeholder='Nombre del Cliente'
                                defaultValue={cotizacion.nombreCliente}
                                onChange={actualizarState}
                            />
                        </div>

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

                        <div className='campo'>
                            <label htmlFor="condiciones">Condiciones<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='condiciones'
                                name='condiciones'
                                defaultValue={cotizacion.condiciones}
                                placeholder='Condiciones'
                                onChange={actualizarState}
                            />
                        </div>


                        <div className='campo'>
                            <label htmlFor="plazoEntrega">Plazo Entrega<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='plazoEntrega'
                                name='plazoEntrega'
                                defaultValue={cotizacion.plazoEntrega}
                                placeholder='Plazo de Entrega'
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="garantia">Garantía<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='garantia'
                                name='garantia'
                                placeholder='Garantía'
                                defaultValue={cotizacion.garantia}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="gastos">Gastos<span className='campo__obligatorio'>*</span>:</label>
                            <textarea name="gastos" id="gasto" cols="30" rows="2" onChange={actualizarState}>{cotizacion.gastos}</textarea>                            
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
                                        ) : <tr><td><p className='mensaje-vacio'>Aún no hay datos</p></td></tr>
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
                                value="Continuar con Informe"
                                disabled={validarForm()}
                                onClick={crearPDF}
                            />
                        </div>

                    </form>
                </div>
            </div>

            <FormInfoCot
                contenido={contenidoPdf} 
                cotizacion={cotizacion} 
                herramientaInfo={herramienta} 
                cotizacionBackend={cotizacionBackend}
            />

        </Fragment>
    )
}

export default FormGenerarCot;