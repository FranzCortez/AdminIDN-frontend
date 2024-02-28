import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { FaTruckMoving } from "react-icons/fa";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios.js';
import Paginacion from '../../layout/Paginacion.jsx';
import ProveedorCom from './ProveedorCom.jsx';
import { CRMContext } from '../../context/CRMContext.jsx';

import Spinner from '../../layout/Spinner.jsx';

function ProveedoresCom() {
    const [ proveedor, guardarProveedor ] = useState([]);
    const [ cambio, guardarCambio ] = useState(true);
    const [ filtroLocal, guardarFiltroLocal ] = useState(localStorage.getItem('filtroProveedor'));
    const [ filtrado, guardarFiltrado ] = useState(true);
    const [ busqueda, guardarBusqueda ] = useState(
        filtroLocal === 'filtroProveedor' ? filtroLocal.split(':')[1] : ''
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
        localStorage.setItem('filtroProveedor', `proveedor:${e.target.value}`);
    }

    const buscarProveedor = async (e) => {
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
            // TODO: crear filtro 
            const res = await clienteAxios.get(`/clientescom/empresacomBuscar/${busqueda}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            if(res.status === 200){
                guardarProveedor(res.data);
                guardarFiltrado(false)
            }
        }
    }

    const consultarAPI = async () => {

        try {

            localStorage.setItem('pagina', `${offset}-ce`);
            localStorage.removeItem('filtroEmpresa');
            
            const res = await clienteAxios.get(`proveedor/${offset}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarCantPaginas(res.data.cantPag);
            guardarProveedor(res?.data?.proveedores);
        } catch (error) {
            console.log(error);
        }
        
    }
    
    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {
            if ( busqueda === '' ) {
                consultarAPI();
            } else {
                // TODO: activar filtro
                // buscarProveedor();
            }
            // localStorage.setItem('ultima', `/clientescom`);
            localStorage.removeItem('filtroIngreso');
            localStorage.removeItem('filtroFactura');
            localStorage.removeItem('filtroEmpresa');
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
                <div className="card-header-com">
                    <FaTruckMoving size={50} color={"#ebe1e1"}/>
                    <h1>Proveedores Comercializadora</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        {/* <FormularioBuscarEmpresaCom leerBusqueda={leerBusqueda} buscarEmpresa={buscarEmpresa} escucharCambio={escucharCambio} texto={busqueda}/> */}

                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <FiPlusCircle size={25}/>
                            <FaTruckMoving size={25}/>
                            Nuevo Proveedor
                        </Link>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head-com'>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Rut</th>
                                    <th scope="col">Razón Social</th>
                                    <th scope="col">Dirección</th>
                                    {/* <th scope="col">Contactos</th> */}
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    proveedor.length > 0 ? (
                                        proveedor.map((datos) => (
                                            <ProveedorCom datos={datos} key={datos.id} escucharCambio={escucharCambio}/>
                                        ))
                                    ) : 
                                    spin ? 
                                            <Spinner/>
                                        
                                        :
                                    <tr><td><p className='mensaje-vacio'>Aun no hay proveedores registrados o nadie coincide con la búsqueda </p></td></tr>
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

export default ProveedoresCom;