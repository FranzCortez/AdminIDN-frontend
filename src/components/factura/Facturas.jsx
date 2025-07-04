import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { FaRegMoneyBillAlt } from 'react-icons/fa';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

import Factura from './Factura';
import FacturaFiltro from './FacturaFiltro';

import Spinner from '../layout/Spinner';
import Paginacion from '../layout/Paginacion';

import BoletaEstadoCuenta from './estadoCuenta/BoletaEstadoCuenta';
import FormEstadoCuenta from './FormEstadoCuenta';
import BoletaPagado from './estadoCuenta/BoletaPagado';

function Facturas() {

    const location = useLocation();
    
    // state usuarios
    const [ facturas, guardarFacturas ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);
    const [ spin, guardarSpin ] = useState(true);

    const [ seleccion, guardarSeleccion ] = useState([]);
    const [ pagado, guardarPagado ] = useState([]);

    // filtro
    const [ filtroLocal, guardarFiltroLocal ] = useState(localStorage.getItem('filtroFactura'));
    const [ filtros, guardarFiltros ] = useState( location.state?.from ? {
        fechaFactura: '', 
        numeroFactura: location.state.from, 
        estado: 'Todos',
        mes: '',
        year: '',
        idEmpresa: '',
    } :
        filtroLocal?.split('-')[1] === 'fa' ? JSON.parse(filtroLocal.split('-')[0]) : {}
    );

    const guardarFiltro = (data) => {
        localStorage.setItem('filtroFactura', `${JSON.stringify(data)}-fa`);
        guardarFiltros(data);
    }

    // paginacion
    const [ cantPaginas, guardarCantPaginas ] = useState(0);
    const [ pag, guardarPag ] = useState(localStorage.getItem('pagina')?.split('-'));
    const [ offset, guardarOffset ] = useState(!!pag ? pag[1] === 'fa' && parseInt(pag[0]) !== 0 ? parseInt(pag[0]) : 0 : 0);

    const cantPaginaFactura = async () => {

        try {

            const res = await clienteAxios.get(`factura/fact/cant`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarCantPaginas(res.data.cantPag);
            
        } catch (error) {
            console.log(error);
        }

    }

    const pagActual = (numero) => {
        guardarOffset(numero)
    } 

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const boletaPago = (e) => {

        let existe = [];

        existe = pagado.filter( factura => factura.id !== e.target.id );

        if ( existe.length === pagado.length ){
            // agrega

            existe.push({
                id: e.target.id,
                valor: e.target.dataset.valor,
                factura: e.target.dataset.factura,
                fechapago: e.target.dataset.fechapago,
                cliente: e.target.dataset.cliente,
            });

            guardarPagado(existe);

        } else {
            // elimina
            guardarPagado(existe);
        }

    }

    const generarRecepcion = () => {
        document.querySelector("#fact").style.display = "none";
        document.querySelector(".dn").style.display = "block";
    }

    const boleta = (e) => {

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

            guardarSeleccion(existe);

        } else {
            // elimina
            guardarSeleccion(existe);
        }

    }

    const boletaAutomatica = (seleccion) => {
        guardarSeleccion(seleccion);
        document.querySelector(".boleta-automatico").style.display = "none"
        document.querySelector("#usuarioEmpresa").style.display = "block";
    }

    const escucharCambio = (e) => {
        guardarCambio(!cambio);
    }

    const generarEstado = () => {
        document.querySelector("#fact").style.display = "none";
        document.querySelector("#usuarioEmpresa").style.display = "block";
    }

    const opcionesAutomaticas = () => {
        document.querySelector("#fact").style.display = "none";
        document.querySelector(".boleta-automatico").style.display = "block"
    }

    const consultarAPI = async () => {
        
        try {

            if ( facturas.length === 0 ) {
                cantPaginaFactura();
            }

            localStorage.setItem('pagina', `${offset}-fa`);

            const res = await clienteAxios.post(`factura/filtro/${offset}`, filtros, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            console.log(res.data)
            guardarFacturas(res.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 4) ) {
            localStorage.setItem('ultima', `/facturas`);
            localStorage.removeItem('filtroEmpresa');
            localStorage.removeItem('filtroIngreso');
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }      
    }, [cambio, offset]);

    setTimeout(() => {
        guardarSpin(false);
    }, 10000);

    return (
        <Fragment>
            <div className="card contenedor" id='fact'>
                <div className="card-header">
                    <AiOutlineDollarCircle size={50} color={"#333333"}/>
                    <h1>Facturas</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>

                        <FacturaFiltro guardarFiltro={guardarFiltro} escucharCambio={escucharCambio} filtros={filtros} />

                        <button className={pagado.length === 0 ? 'btn-new' : 'btn-new btn-success-new'} onClick={generarRecepcion} disabled={pagado.length > 0 ? false : true}>
                            <FaRegMoneyBillAlt size={25}/>
                            Generar Recepción de Pago
                        </button>

                        <button className={'btn-new btn-login'} onClick={opcionesAutomaticas} >
                            <FaRegMoneyBillAlt size={25}/>
                            Generar Estado Automático
                        </button>

                        <button className={seleccion.length === 0 ? 'btn-new' : 'btn-new btn-login'} onClick={generarEstado} disabled={seleccion.length > 0 ? false : true}>
                            <FaRegMoneyBillAlt size={25}/>
                            Generar Estado Manual
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
                                            <Factura datos={datos} key={datos.id} boleta={boleta} boletaPago={boletaPago} />
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
                    {
                        filtros?.idEmpresa === '' || !filtros?.idEmpresa ?

                            <Paginacion cantPaginas={cantPaginas} pagActual={pagActual} offset={offset}/>
                        :
                            null
                    }
                </div>
            </div>

            <FormEstadoCuenta 
                boletaAutomatica={boletaAutomatica}
            />

            <BoletaEstadoCuenta
                seleccion={seleccion}
            />

            <BoletaPagado
                pagado={pagado}
            />

        </Fragment>
    )
}

export default Facturas