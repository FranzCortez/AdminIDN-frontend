import {React, Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";

import clienteAxios from '../../config/axios';
import Usuario from './Usuario';
import FormBuscarUsuario from './FormBuscarUsuario';

function Usuarios() {

    // state usuarios
    const [ usuarios, guardarUsuarios ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);

    const escucharCambio = () => {
        guardarCambio(!cambio);
    }

    useEffect(() => {
        const consultarAPI = async () => {
            
            try {
                // TODO Redireccionar y validar permiso
                const res = await clienteAxios.get('/cuentas/usuario');
                guardarUsuarios(res?.data);
                
            } catch (error) {
                console.log(error)
            }
        }
        
        consultarAPI();
        console.log("a")
        
    }, [cambio]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <FiUsers size={50} color={"#333333"}/>
                    <h1>Usuarios</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        <FormBuscarUsuario />

                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <IoPersonAddSharp size={25}/>
                            Nuevo Usuario
                        </Link>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Rut</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usuarios.map((datos) => (
                                        <Usuario datos={datos} key={datos.id} escucharCambio={escucharCambio}/>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Usuarios
