import React, {Fragment} from 'react';
import { FiUsers } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoPersonAddSharp } from "react-icons/io5";

function Usuarios() {
    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <FiUsers size={50} color={"#333333"}/>
                    <h1>Usuarios</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        <input type="text" />

                        <button button type="button" className="btn-new btn-success-new">
                            <IoPersonAddSharp size={25}/>
                            Nuevo Usuario
                        </button>
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
                                <tr className='table__tr'>
                                    <td>Carlos Maquena Roberto</td>
                                    <td>20.408.302-9</td>
                                    <td>mark@impactodelnorte.cl</td>
                                    <td>+56933546064</td>
                                    <td>Trabajador</td>
                                    <td>
                                        <div className='table__opciones'>
                                            <button type="button" className="btn btn-danger"><RiDeleteBin2Line size={23}/></button>
                                            <button type="button" className="btn btn-warning"><FaUserEdit size={23}/></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='table__tr'>
                                    <td>Carlos Maquena Roberto</td>
                                    <td>20.408.302-9</td>
                                    <td>mark@impactodelnorte.cl</td>
                                    <td>+56933546064</td>
                                    <td>Trabajador</td>
                                    <td>
                                        <div className='table__opciones'>
                                            <button type="button" className="btn btn-danger"><RiDeleteBin2Line size={23}/></button>
                                            <button type="button" className="btn btn-warning"><FaUserEdit size={23}/></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='table__tr'>
                                    <td>Carlos Maquena Roberto</td>
                                    <td>20.408.302-9</td>
                                    <td>mark@impactodelnorte.cl</td>
                                    <td>+56933546064</td>
                                    <td>Trabajador</td>
                                    <td>
                                        <div className='table__opciones'>
                                            <button type="button" className="btn btn-danger"><RiDeleteBin2Line size={23}/></button>
                                            <button type="button" className="btn btn-warning"><FaUserEdit size={23}/></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Usuarios
