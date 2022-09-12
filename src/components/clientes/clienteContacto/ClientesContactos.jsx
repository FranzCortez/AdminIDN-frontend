import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { MdContactPhone } from "react-icons/md";

import clienteAxios from '../../../config/axios';
import ClienteContacto from './ClienteContacto';

function ClientesContactos() {

    const { id: idEmpresa } = useParams();

    const [ contactos, guardarContactos ] = useState([]);
    const [ cambio, guardarCambio ] = useState(true);

    const escucharCambio = () => {
        guardarCambio(!cambio);
    }

    const consultarAPI = async () => {

        try {
            
            // TODO Redireccionar y validar permiso

            const res = await clienteAxios.get(`contactos/contacto/${idEmpresa}`);
            guardarContactos(res?.data);
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
                    <MdContactPhone size={50} color={"#333333"}/>
                    <h1>Clientes Empresa</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        {/* <FormBuscarUsuario leerBusqueda={leerBusqueda} buscarUsuario={buscarUsuario} escucharCambio={escucharCambio}/>

                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <IoPersonAddSharp size={25}/>
                            Nuevo Usuario
                        </Link> */}
                    </div>


                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contactos.length > 0 ? (
                                        contactos.map((datos) => (
                                            <ClienteContacto datos={datos} key={datos.id} escucharCambio={escucharCambio}/>
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

export default ClientesContactos
