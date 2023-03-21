import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import moment from 'moment';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

function FormEstadoCuenta({ boletaAutomatica }) {

    const [ empresas, guardarEmpresas ] = useState([]);
    const [ opciones, guardarOpciones ] = useState({
        empresa: 0,
        estado: 0
    });

    const regresar = () => {
        document.querySelector("#fact").style.display = "block";
        document.querySelector(".boleta-automatico").style.display = "none"
    }

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarOpciones({
            ...opciones,
            [e.target.name] : e.target.value
        });
    }

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const diffInDays = (x, y) => Math.floor((x - y) / (1000 * 60 * 60 * 24));

    function addDaysToDate(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }

    const fechaVencimiento = (formaPago, fechaFactura) => {
        return formaPago === 'Crédito' ? addDaysToDate(fechaFactura, 29) : addDaysToDate(fechaFactura, 0); // cambiar por credito o contado
    }

    const obtenerFacturas = async (e) => {

        e.preventDefault();

        try {
            
            const res = await clienteAxios.post(`factura/boleta/facturar`, opciones ,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            const facturas = [];
            res.data.forEach( async fac => {

                const fecha =  fechaVencimiento(fac?.formaPago, fac?.fechaFactura);
                
                fac.valor = valorNumero(fac?.monto + parseInt(fac?.monto * 0.19));
                fac.fechafactura = moment(fac?.fechaFactura).format('DD-MM-YYYY');
                fac.fechavencimiento = moment(fecha).format('DD/MM/YYYY');
                fac.mora = (fac?.fechaPago === '0000-00-00' || fac?.fechaPago === null) && new Date() >= fecha ? ` ${diffInDays(new Date(), fecha)+1} Día(s)` : '';
                fac.otin = fac.otines;
                fac.factura = fac.numeroFactura;
                fac.orden=fac?.numeroCompra;
                fac.despacho=fac?.guiaDespacho;
                fac.cliente = fac?.herramientas[0].clienteContacto.clienteEmpresa.nombre 

                facturas.push(fac);
            } );
            
            boletaAutomatica(facturas);

        } catch (error) {
            console.log(error);
        }

    }

    const consultarAPI = async () => {

        try {
            
            if(auth.token === '') {
                return;
            }

            const res = await clienteAxios.get(`empresas/empresaNombre`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarEmpresas(res.data);
            
        } catch (error) {
            console.log(error);
            navigate('/facturas', { replace: true });
        }

    }

    useEffect(() => {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        }
        consultarAPI();
    },[]);
    
    return (
        <Fragment>
            <div className="card contenedor boleta-automatico">
                <div className="card-header">
                    <AiOutlineDollarCircle size={50} color={"#333333"}/>
                    <h1>Estado de Cuenta Automático</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        <div onClick={regresar} className="btn-new btn-return">
                            <IoArrowBackCircleOutline size={25}/> Regresar
                        </div>
                    </div>

                    <form onSubmit={obtenerFacturas}>
                        <div className='campo'>
                            <label htmlFor="empresa">Seleccione Empresa<span className='campo__obligatorio'>*</span>:</label>
                            
                            <select name="empresa" id="empresa" value={empresas} onChange={actualizarState}>
                                <option value={0}> Todas </option>    
                                {
                                    empresas.map(empresa => (
                                        <option value={empresa.id} key={empresa.id}>{empresa.nombre}</option>
                                    ))
                                }
                            </select>               
                        </div> 
                        
                        <div className='campo'>
                            <label htmlFor="estado">Seleccione el Estado<span className='campo__obligatorio'>*</span>:</label>
                            
                            <select name="estado" id="estado" defaultValue={opciones.estado} onChange={actualizarState}>
                                <option value={0} > Vencidas </option>    
                                <option value={1} > Pendientes </option>    
                                <option value={2} > Vencidas y Pendientes </option>
                            </select>               
                        </div> 

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={'btn-new btn-success-new'}
                                value="Generar Estado de Cuenta Automático"
                            />
                        </div>
                    </form>

                </div>
            </div>
        </Fragment>
    )
}

export default FormEstadoCuenta
