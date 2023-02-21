import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdContactPhone } from "react-icons/md";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';

import { CRMContext } from '../../context/CRMContext';

function ClienteEmpresa({datos, escucharCambio}) {

    const [auth, guardarAuth] = useContext(CRMContext);

    let rut = datos.rut.split("");
    rut = rut[0] + rut[1] + "." + rut[2]+rut[3]+rut[4] + "." + rut[5]+rut[6]+rut[7] + "-" + rut[8];

    const eliminarEmpresa = (id) => {
        Swal.fire ({
            title: '¿Estás seguro de eliminarlo?',
            text: "Un cliente eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText : 'Sí, ¡Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then( (result) => {
            if (result.value) {
                clienteAxios.delete(`empresas/empresa/${id}`,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }).then(res => {
                    Swal.fire( 'Eliminado', res.data.mensaje, 'success');
                    escucharCambio();
                });
            }
        });
    }

    return (
        <tr className='table__tr'>
            <td>{datos.nombre}</td>
            <td>{rut}</td>
            <td>{datos.razonSocial}</td>
            <td>{datos.direccion}</td>
            <td>
                <div className='table__opciones'>

                    <Link to={`contacto/${datos.id}`}>
                        <button type='button' className="btn btn-primary" >
                            <MdContactPhone size={23} color="#ffff"/>
                        </button>
                    </Link>
                </div>
            </td>
            <td>
                <div className='table__opciones'>
                    <Link to={`editar/${datos.id}`}><button type='button' className="btn btn-warning" ><FaUserEdit size={23} color="#ffff"/></button></Link>
                    <button type='button' className="btn btn-danger" onClick={() => {eliminarEmpresa(datos.id);}}><RiDeleteBin2Line size={23}/></button>
                </div>
            </td>
        </tr>
    )
}

export default ClienteEmpresa;