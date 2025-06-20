import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { RiContactsBook2Line } from "react-icons/ri";
import { FiPlusCircle } from "react-icons/fi";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios.js';
import Paginacion from '../../layout/Paginacion.jsx';
import ClienteEmpresa from './ClienteEmpresa.jsx';
import FormularioBuscarEmpresa from './FormularioBuscarEmpresa.jsx';
import { CRMContext } from '../../context/CRMContext.jsx';

import Spinner from '../../layout/Spinner.jsx';

function ClientesEmpresas() {

    const [ empresas, guardarEmpresas ] = useState([]);
    const [ cambio, guardarCambio ] = useState(true);
    const [ filtroLocal, guardarFiltroLocal ] = useState(localStorage.getItem('filtroEmpresa'));
    const [ filtrado, guardarFiltrado ] = useState(true);
    const [ busqueda, guardarBusqueda ] = useState(
        filtroLocal === 'filtroEmpresa' ? filtroLocal.split(':')[1] : ''
    );
    const [ spin, guardarSpin ] = useState(true);
    const [ pag, guardarPag ] = useState(localStorage.getItem('pagina')?.split('-'));

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    // paginacion
    const [ cantPaginas, guardarCantPaginas ] = useState(0);
    const [ offset, guardarOffset ] = useState(!!pag ? pag[1] === 'ce' && parseInt(pag[0]) !== 0 ? parseInt(pag[0]) : 0 : 0);
    
    const pagActual = (numero) => {
        guardarOffset(numero)
    } 

    const escucharCambio = () => {
        guardarCambio(!cambio);
        guardarBusqueda('')
    }

    const leerBusqueda = (e) => {
        guardarBusqueda(e.target.value);
        localStorage.setItem('filtroEmpresa', `empresa:${e.target.value}`);
    }

    const buscarEmpresa = async (e) => {
        e?.preventDefault();

        if(e?.nativeEvent?.submitter?.value === 'Limpiar Filtros'){
            guardarFiltrado(true);
            escucharCambio();
            return;
        }

        if(busqueda.length < 3) {
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Debes tener mínimo 3 caracteres para buscar',
                timer: 1500
            });
        }else{
            const res = await clienteAxios.get(`/empresas/empresaBuscar/${busqueda}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            if(res.status === 200){
                guardarEmpresas(res.data);
                guardarFiltrado(false)
            }
        }
    }

    const consultarAPI = async () => {

        try {

            localStorage.setItem('pagina', `${offset}-ce`);
            localStorage.removeItem('filtroEmpresa');
            
            const res = await clienteAxios.get(`empresas/empresa/${offset}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarCantPaginas(res.data.cantPag);
            guardarEmpresas(res?.data?.empresas);
        } catch (error) {
            console.log(error);
        }
        
    }
    
    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2 || auth.tipo === 4) ) {
            if ( busqueda === '' ) {
                consultarAPI();
            } else {
                buscarEmpresa();
            }
            localStorage.setItem('ultima', `/clientes`);
            localStorage.removeItem('filtroIngreso');
            localStorage.removeItem('filtroFactura');
        } else {
            navigate('/login', {replace: true});
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cambio,offset]);

    setTimeout(() => {
        guardarSpin(false);
    }, 10000);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <RiContactsBook2Line size={50} color={"#333333"}/>
                    <h1>Clientes Empresa</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        <FormularioBuscarEmpresa leerBusqueda={leerBusqueda} buscarEmpresa={buscarEmpresa} escucharCambio={escucharCambio} texto={busqueda}/>

                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <FiPlusCircle size={25}/>
                            <RiContactsBook2Line size={25}/>
                            Nuevo Cliente Empresa
                        </Link>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Rut</th>
                                    <th scope="col">Razón Social</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Contactos</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    empresas.length > 0 ? (
                                        empresas.map((datos) => (
                                            <ClienteEmpresa datos={datos} key={datos.id} escucharCambio={escucharCambio}/>
                                        ))
                                    ) : 
                                    spin ? 
                                            <Spinner/>
                                        
                                        :
                                    <tr><td><p className='mensaje-vacio'>Aun no hay usuarios registrados o nadie coincide con la búsqueda </p></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        filtrado ? 
                        <Paginacion cantPaginas={cantPaginas} pagActual={pagActual} offset={offset}/>
                        : null
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default ClientesEmpresas;