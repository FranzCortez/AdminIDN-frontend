import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { RiContactsBook2Line } from "react-icons/ri";
import { FiPlusCircle } from "react-icons/fi";

import clienteAxios from '../../../config/axios.js';
import ClienteEmpresa from './ClienteEmpresa.jsx';

function ClientesEmpresas() {

    const [ empresas, guardarEmpresas ] = useState([]);
    const [ cambio, guardarCambio ] = useState(true);

    // paginacion
    const [ cantPaginas, guardarCantPaginas ] = useState(0);
    const [ offset, guardarOffset ] = useState(0);
    
    const pagActual = (numero) => {
        guardarOffset(numero)
    } 

    const escucharCambio = () => {
        guardarCambio(!cambio);
    }

    const consultarAPI = async () => {

        try {
            
            // TODO Redireccionar y validar permiso

            const res = await clienteAxios.get(`empresas/empresa/${offset}`);

            guardarCantPaginas(res.data.cantPag);
            guardarEmpresas(res?.data?.empresas);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        consultarAPI();
    },[cambio]);


    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <RiContactsBook2Line size={50} color={"#333333"}/>
                    <h1>Clientes Empresa</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        {/* <FormBuscarUsuario leerBusqueda={leerBusqueda} buscarUsuario={buscarUsuario} escucharCambio={escucharCambio}/> */}

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
                                    ) : <tr><td><p className='mensaje-vacio'>Aun no hay usuarios registrados o nadie coincide con la búsqueda </p></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <Paginacion cantPaginas={cantPaginas} pagActual={pagActual} offset={offset}/> */}
                </div>
            </div>
        </Fragment>
    )
}

export default ClientesEmpresas
