import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineTool } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { VscTools } from 'react-icons/vsc';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';
import Ingreso from './Ingreso';
import FormFiltroIngreso from './FormFiltroIngreso';

import Paginacion from '../layout/Paginacion';
import Spinner from '../layout/Spinner';

function Ingresos() {

    const location = useLocation();

    // state usuarios
    const [ ingresos, guardarIngresos ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);
    const [ spin, guardarSpin ] = useState(true);

    // filtro
    const [ filtroLocal, guardarFiltroLocal ] = useState(localStorage.getItem('filtroIngreso'));
    const [ filtros, guardarFiltros ] = useState(location.state?.from ? {
            fecha: '', 
            otin: location.state.from, 
            nombre: '',
            marca: '',
            modelo: '',
            numeroInterno: '',
            numeroSerie: '',
            empresaId: '',
            tipoHerramientaId: '',
            activo: ''
        } :
        filtroLocal?.split('-')[1] === 'in' ? JSON.parse(filtroLocal.split('-')[0]) : {}
    );

    const guardarFiltro = (data) => {
        localStorage.setItem('filtroIngreso', `${JSON.stringify(data)}-in`);
        guardarFiltros(data);
    }

    // paginacion
    const [ cantPaginas, guardarCantPaginas ] = useState(0);
    const [ pag, guardarPag ] = useState(localStorage.getItem('pagina')?.split('-'));
    const [ offset, guardarOffset ] = useState(!!pag ? pag[1] === 'in' && parseInt(pag[0]) !== 0 ? parseInt(pag[0]) : 0 : 0);
    
    const pagActual = (numero) => {
        guardarOffset(numero)
    } 

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const escucharCambio = () => {
        guardarCambio(!cambio);
    }

    const consultarAPI = async () => {
        
        try {

            localStorage.setItem('pagina', `${offset}-in`);

            const res = await clienteAxios.post(`ih/ingreso/obtener/${offset}`, filtros, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarIngresos(res.data.herramientaFiltro);
            guardarCantPaginas(res.data.cantPag);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {        
        
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {
            localStorage.setItem('ultima', `/ingresos`);
            localStorage.removeItem('filtroEmpresa');
            localStorage.removeItem('filtroFactura');
            consultarAPI();
            
        } else {
            navigate('/login', {replace: true});
        }      
    }, [cambio,offset]);

    setTimeout(() => {
        guardarSpin(false);
    }, 10000);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <AiOutlineTool size={50} color={"#333333"}/>
                    <h1>Ingresos</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>

                        <FormFiltroIngreso guardarFiltro={guardarFiltro} escucharCambio={escucharCambio} filtros={filtros} />

                        <Link to={"tipoherramienta"} type="button" className="btn-new btn-login">
                            <VscTools size={25}/>
                            Tipos de Herramientas
                        </Link>

                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <MdAddCircle size={25}/>
                            <AiOutlineTool size={25}/>
                            Nuevo Ingreso
                        </Link>
                    </div>

                    <div className="table-responsive ingreso__tabla">
                        <table className="table table-hover ">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">OTIN</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Fecha Ingreso</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">N° Serie</th>
                                    <th scope="col">N° Interno</th>
                                    <th scope="col">Más Info</th>
                                    <th scope="col">Ops</th>
                                    <th scope="col">Salida Equipo</th>
                                    <th scope="col">Guía Des. IN / Fecha</th>
                                    {
                                        auth.tipo === 1 ? 

                                        <th scope="col">Num. Fac. / Fecha</th>
                                        :
                                        null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ingresos.length > 0 ? (
                                        ingresos.map((datos) => (
                                            <Ingreso datos={datos} key={datos.id}/>
                                        ))
                                    ) : 
                                    spin ? 
                                    <Spinner/>                                        
                                        : 
                                    <tr><td><p className='mensaje-vacio'>Aun no hay ingresos registrados o nadie coincide con la búsqueda </p></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <Paginacion cantPaginas={cantPaginas} pagActual={pagActual} offset={offset}/>
                </div>
            </div>
        </Fragment>
    )
}

export default Ingresos;
