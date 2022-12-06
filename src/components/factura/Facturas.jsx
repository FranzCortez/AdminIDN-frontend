import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { FaRegMoneyBillAlt } from 'react-icons/fa';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

import Factura from './Factura';
import FacturaFiltro from './FacturaFiltro';

import Spinner from '../layout/Spinner';

import BoletaEstadoCuenta from './estadoCuenta/BoletaEstadoCuenta';

function Facturas() {

    // state usuarios
    const [ facturas, guardarFacturas ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);
    const [ busqueda, guardarBusqueda ] = useState('');
    const [ spin, guardarSpin ] = useState(true);

    const [ seleccion, guardarSeleccion ] = useState([]);

    const [ filtros, guardarFiltros ] = useState({});

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const boleta = async (e) => {

        let existe = [];

        existe = seleccion.filter( factura => factura.id !== e.target.id );

        if ( existe.length === seleccion.length ){
            // agrega

            existe.push({
                id: e.target.id,
                estado: e.target.dataset.estado,
                otin: e.target.dataset.otin,
                valor: e.target.dataset.valor,
                factura: e.target.dataset.factura,
                orden: e.target.dataset.orden,
                despacho: e.target.dataset.despacho,
                fechafactura: e.target.dataset.fechafactura,
                fechavencimiento: e.target.dataset.fechavencimiento,
                mora: e.target.dataset.mora,
                cliente: e.target.dataset.cliente
            });

            await guardarSeleccion(existe);

        } else {
            // elimina
            await guardarSeleccion(existe);
        }

    }

    const escucharCambio = (e) => {
        guardarCambio(!cambio);
    }

    const guardarFiltro = (data) => {
        guardarFiltros(data);
    }

    const generarEstado = () => {
        document.querySelector(".card").style.display = "none";
        document.querySelector("#usuarioEmpresa").style.display = "block";
    }

    const consultarAPI = async () => {
        
        try {
            const res = await clienteAxios.post(`/factura/filtro`, filtros, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarFacturas(res.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {        
        
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {
            
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }      
    }, [cambio]);

    setTimeout(() => {
        guardarSpin(false);
    }, 2000);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <AiOutlineDollarCircle size={50} color={"#333333"}/>
                    <h1>Facturas</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>

                        <FacturaFiltro guardarFiltro={guardarFiltro} escucharCambio={escucharCambio}/>

                        <button className={seleccion.length === 0 ? 'btn-new' : 'btn-new btn-login'} onClick={generarEstado} disabled={seleccion.length > 0 ? false : true}>
                            <FaRegMoneyBillAlt size={25}/>
                            Generar Estado de Cuenta
                        </button>

                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <MdAddCircle size={25}/>
                            <AiOutlineDollarCircle size={25}/>
                            Nueva Factura
                        </Link>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col"></th>
                                    <th scope="col">N° Factura</th>
                                    <th scope="col">Fecha Factura</th>
                                    <th scope="col">OTIN(es)</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Guía Despacho / Fecha</th>
                                    <th scope="col">Monto Total</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Más Info</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    facturas.length > 0 ? (
                                        facturas.map((datos) => (
                                            <Factura datos={datos} key={datos.id} boleta={boleta} />
                                        ))
                                    ) :
                                    spin ? 
                                            <Spinner/>
                                        
                                        :
                                    <tr><td><p className='mensaje-vacio'>Aún no hay facturas registradas o nada coincide con la búsqueda </p></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <Paginacion cantPaginas={cantPaginas} pagAct+
                    ual={pagActual} offset={offset}/> */}
                </div>
            </div>

            <BoletaEstadoCuenta
                seleccion={seleccion}
            />
        </Fragment>
    )
}

export default Facturas