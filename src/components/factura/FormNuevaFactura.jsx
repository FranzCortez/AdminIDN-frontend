import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2';
import { MultiSelect } from "react-multi-select-component";
import moment from 'moment';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

function FormNuevaFactura() {

    let entre = 0;

    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`
    
    const [ factura, guardarFactura ] = useState({
        numeroFactura: '',
        fechaFactura: fechaActual,
        numeroCompra: '',
        // fechaCompra: '',
        formaPago: 'Crédito',
        monto: '',
        // fechaPago: '',
        observaciones: '',
        guiaDespacho: '',
        fechaGuiaDespacho: '',
        estado: 'Pendiente',
        guardarOtines: []
    });
    const [ empresas, guardarEmpresas ] = useState([]);
    const [ otines, guardarOtines ] = useState([]);
    const [ otinesSeleccionadas, guardarOtinesSeleccionadas ] = useState([]);
    const [ texto, guardarTexto ] = useState(false);
    const [ segundaFactura, guardarSegundaFactura ] = useState(false);
    const [ segundaOtin, guardarSegundaOtin ] = useState('');
    const [ errorSegunda, guardarErrorSegunda ] = useState(false);

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();
    
    const actualizarState = e => {
        
        guardarFactura({
            ...factura,
            [e.target.name] : e.target.value
        });
    }

    const actualizarSegundaOtin = e => {
        guardarSegundaOtin(e.target.value);
    }

    const obtenerOtinManual = async e => {
        try {
            
            const res = await clienteAxios.post('ih/manual/otin', { otin: segundaOtin }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            if ( res.data == null ){
                guardarErrorSegunda(true);
                return
            }

            const otin = [];

            otin.push({ label: `OTIN ${res.data.otin}`, value: res.data.id, data: res.data.guiaDespacho, fechaData: res.data.fechaGuiaDespacho });

            guiasDespachoAutoCompletado(otin);

            guardarErrorSegunda(false);
        } catch (error) {
            console.log(error);
            guardarErrorSegunda(true);
        }
    }

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const agregarFactura = async (e) => {
        e.preventDefault();

        if( entre > 0) {
            return;
        }
        
        entre = 1;
        
        
        try {            
            const res = await clienteAxios.post('/factura', factura,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Se agrego correctamente la factura',
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

    const validarForm = () => {

        const { fechaFactura, guardarOtines, monto } = factura;
        
        if( (!!fechaFactura.length && (guardarOtines.length) && monto.length ) ){
            return false;
        }

        return true;
    }

    const obtenerOtin = async (e) => {
        try {

            guardarOtines([]);
            guardarOtinesSeleccionadas([]);

            const res = await clienteAxios.post('ih/ingreso/empresa', { empresaId: e.target.value }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            const otin = [];
            
            res.data.forEach(data => {
                if ( data.facturaId === null ) {
                    otin.push({ label: `OTIN ${data.otin}`, value: data.id, data: data.guiaDespacho, fechaData: data.fechaGuiaDespacho });
                }
            });

            guardarOtines(otin);

        } catch (error) {
            console.log(error);
            navigate('/facturas', { replace: true });
        }
    }

    const consultarAPI = async () => {

        try {
            
            const res = await clienteAxios.get(`empresas/empresaNombre`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarEmpresas(res.data);

            const nfact = await clienteAxios.get(`factura/`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarFactura({
                ...factura,
                numeroFactura: nfact.data.numero + 1
            });

        } catch (error) {
            console.log(error);
            navigate('/facturas', { replace: true });
        }

    }

    const guiasDespachoAutoCompletado = async (e) => {
        console.log(e)
        guardarOtinesSeleccionadas(e)

        let guiaDespacho = '';
        let observaciones = '';
        const guardarOtines = [];

        await e.forEach(element => {
            
            if( element.data !== '-' ) {
                if ( guiaDespacho === '' ) {
                    guiaDespacho = element.data;
                } else {
                    guiaDespacho = element.data + ',' + guiaDespacho;
                }
                observaciones = element.label + ':\n   -Guía Despacho:' + element.data + "\n   -Fecha Guía Despacho: " + moment(element.fechaData).format('DD/MM/YYYY') + "\n" + observaciones;
            }
            guardarOtines.push({id: element.value});
        });

        guardarFactura({
            ...factura,
            guiaDespacho,
            observaciones,
            guardarOtines
        });

        guardarTexto(!texto);
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
        } else if (auth.tipo !== 1 && auth.tipo !== 4){ 
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

                        <Link to={'/facturas/error'} state={{ from: `${factura.numeroFactura}` }} className="btn-new btn-cerrar"><IoArrowBackCircleOutline size={25}/> N° Factura No Existente</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>
                    <p className='text-center'>Asegúrese que están ingresados anteriormente los primeros 3 datos para poder seleccionarlos</p>

                    <form onSubmit={agregarFactura} onKeyDown={avanzar}>

                        {/** EMPRESA */}
                        <div className='campo'>
                            <label htmlFor="empresa">Seleccione Empresa a Facturar<span className='campo__obligatorio'>*</span>:</label>
                            <select name="empresa" id="empresa"  defaultValue={0} onChange={obtenerOtin} >
                                <option value={0} disabled> -- Seleccione -- </option>    
                                {
                                    empresas.map(empresa => (
                                        <option value={empresa.id} key={empresa.id}>{empresa.nombre}</option>
                                    ))
                                }
                            </select>               
                        </div>     

                        {
                            // seleccion de otines
                            otines.length !== 0 ? 

                                <Fragment>
                                    <div className='campo'>
                                        <label htmlFor="otines">Seleccione la(s) OTIN(es)<span className='campo__obligatorio'>*</span>:</label>
                                        <MultiSelect
                                            id="otines"
                                            options={otines}
                                            value={otinesSeleccionadas}
                                            onChange={guiasDespachoAutoCompletado}
                                            labelledBy="Seleccione la(s) OTIN(es)"                                        
                                            className='multipleSelect'
                                        />             
                                    </div>    
                                    
                                    <div className='segundaFactura' >
                                        <div className="btn-new btn-return" onClick={() => {guardarSegundaFactura(!segundaFactura)}} >Segunda Factura</div>
                                    </div>
                                </Fragment>
                            :
                                null
                        }       

                        {
                            segundaFactura ?
                                <Fragment>
                                    <div className='campo'>
                                        <label htmlFor="otines">Seleccione la OTIN (DOBLE FACTURA)<span className='campo__obligatorio'>*</span>:</label>
                                        <input 
                                            type="otines" 
                                            id='otines'
                                            name='otines'
                                            placeholder='Buscar OTIN EJEM: 1234-2023'
                                            onChange={actualizarSegundaOtin}
                                        />
                                    </div>

                                    <div className='segundaFactura' >
                                        <div className="btn-new btn-return" onClick={() => {obtenerOtinManual()}} >Buscar OTIN manual</div>
                                    </div>
                                </Fragment>
                            :
                                null
                        }

                        {
                            otinesSeleccionadas.length === 0 ?
                                null
                            :
                            <Fragment>
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

                                <div className='campo'>
                                    <label htmlFor="fechaFactura">Fecha Factura<span className='campo__obligatorio'>*</span>:</label>
                                    <input 
                                        type="date" 
                                        id='fechaFactura'
                                        name='fechaFactura'
                                        defaultValue={factura.fechaFactura}
                                        onChange={actualizarState}
                                    />
                                </div>

                                <div className='campo'>
                                    <label htmlFor="guiaDespacho">Guía Despacho<span className='campo__obligatorio'>*</span>:</label>
                                    <input 
                                        type="text" 
                                        id='guiaDespacho'
                                        name='guiaDespacho'
                                        placeholder='Guía de Despacho de la Factura'
                                        defaultValue={factura.guiaDespacho}
                                        onChange={actualizarState}
                                    />
                                </div>

                                <h3 className='card-body-subtitle' > La(s) fecha(s) de guía de despacho es/son: </h3>
                                
                                {otinesSeleccionadas.map((otin, index) => (
                                    <h4 className='card-body-subtitle' key={index} > {otin.label}: {otin.fechaData ? moment(otin.fechaData).format('DD/MM/YYYY') : 'No tiene fecha'} </h4>
                                ))}
                                
                                <div className='campo'>
                                    <label htmlFor="fechaGuiaDespacho">Fecha Guía Despacho:</label>
                                    <input 
                                        type="date" 
                                        id='fechaGuiaDespacho'
                                        name='fechaGuiaDespacho'
                                        defaultValue={factura.fechaGuiaDespacho}
                                        onChange={actualizarState}
                                    />
                                </div>

                                <div className='campo' >
                                    <label htmlFor="estado">Estado<span className='campo__obligatorio'>*</span>:</label>
                                    <select name="estado" id="estado"  defaultValue={0} onChange={actualizarState} >
                                        <option value={'Pendiente'}> Pendiente </option>
                                        <option value={'Pagado'}> Pagado </option>
                                        <option value={'Vencido'}> Vencido </option>
                                    </select>  
                                </div>

                                <div className='campo' >
                                    <label htmlFor="formaPago">Forma Pago:</label>
                                    <select name="formaPago" id="formaPago"  defaultValue={0} onChange={actualizarState} >
                                        <option value={'Crédito'}> Crédito </option>
                                        <option value={'Contado'}> Contado </option>
                                    </select>  
                                </div>

                                <div className='campo'>
                                    <label htmlFor="fechaPago">Fecha Pago:</label>
                                    <input 
                                        type="date" 
                                        id='fechaPago'
                                        name='fechaPago'
                                        defaultValue={factura.fechaPago}
                                        onChange={actualizarState}
                                    />
                                </div>                                

                                <div className='campo'>
                                    <label htmlFor="monto">Monto<span className='campo__obligatorio'>*</span>:</label>
                                    <input 
                                        onKeyDown={e => e.keyCode === 38 || e.keyCode === 40 ? e.preventDefault() : null }
                                        type="number" 
                                        id='monto'
                                        name='monto'                                        
                                        defaultValue={factura.monto}
                                        onChange={actualizarState}
                                    />
                                </div>
                                
                                {
                                    factura.monto !== '' ?
                                        <h3 className='card-body-subtitle' >Total + IVA: ${valorNumero(( parseInt(factura.monto) + parseInt( factura.monto*0.19 ) ))}</h3>
                                    :
                                        null
                                }

                                <div className='campo'>
                                    <label htmlFor="numeroCompra">Número Orden de Compra:</label>
                                    <input 
                                        type="text" 
                                        id='numeroCompra'
                                        name='numeroCompra'
                                        placeholder='Número Orden de Compra'
                                        onChange={actualizarState}
                                    />
                                </div>

                                <div className='campo'>
                                    <label htmlFor="fechaCompra">Fecha Orden de Compra:</label>
                                    <input 
                                        type="date" 
                                        id='fechaCompra'
                                        name='fechaCompra'
                                        defaultValue={factura.fechaCompra}
                                        onChange={actualizarState}
                                    />
                                </div>

                                {
                                    texto ? 
                                        <div className='campo'>
                                            <label htmlFor="observaciones">Observaciones:</label>

                                            <textarea name="observaciones" id="observaciones" cols="50" rows="10" 
                                            defaultValue={factura.observaciones} onChange={actualizarState} 
                                            ></textarea>
                                        </div>
                                    :
                                        <div className='campo'>
                                            <label htmlFor="observaciones">Observaciones<span className='campo__obligatorio'>*</span>:</label>

                                            <textarea name="observaciones" id="observaciones" cols="50" rows="10" 
                                            defaultValue={factura.observaciones} onChange={actualizarState} 
                                            ></textarea>
                                        </div>
                                }

                            </Fragment>
                        }                           

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

export default FormNuevaFactura;