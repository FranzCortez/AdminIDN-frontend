import {React, Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import Usuario from './Usuario';
import FormBuscarUsuario from './FormBuscarUsuario';

function Usuarios() {

    // state usuarios
    const [ usuarios, guardarUsuarios ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);
    const [ busqueda, guardarBusqueda ] = useState('');

    const escucharCambio = () => {
        guardarCambio(!cambio);
    }

    const buscarUsuario = async (e) => {
        e.preventDefault();

        if(e.nativeEvent.submitter.value === 'Limpiar Filtros'){
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
            const res = await clienteAxios.get(`/cuentas/usuarioBuscar/${busqueda}`);

            if(res.status === 200){
                guardarUsuarios(res.data.usuarios);
            }
        }
    }

    const leerBusqueda = (e) => {
        guardarBusqueda(e.target.value);
    }

    const consultarAPI = async () => {
        
        try {
            // TODO Redireccionar y validar permiso
            const res = await clienteAxios.get('/cuentas/usuario');
            guardarUsuarios(res?.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {        
        consultarAPI();        
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
                        <FormBuscarUsuario leerBusqueda={leerBusqueda} buscarUsuario={buscarUsuario} escucharCambio={escucharCambio}/>

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
                                    usuarios.length > 0 ? (
                                        usuarios.map((datos) => (
                                            <Usuario datos={datos} key={datos.id} escucharCambio={escucharCambio}/>
                                        ))
                                    ) : <tr><td><p className='mensaje-vacio'>Aun no hay usuarios registrados o nadie coincide con la búsqueda </p></td></tr>
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
