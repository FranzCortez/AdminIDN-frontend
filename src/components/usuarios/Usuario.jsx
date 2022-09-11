import React from 'react';
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

function Usuario({datos}) {

    let rut = datos.rut.split("");
    rut = rut[0] + rut[1] + "." + rut[2]+rut[3]+rut[4] + "." + rut[5]+rut[6]+rut[7] + "-" + rut[8];

    let tipo = 'Cliente Empresa';

    if(datos.tipo === 1) {
        tipo = 'Administrador';
    } else if(datos.tipo === 2) {
        tipo = 'Trabajador';
    }

    const eliminarCliente = (id) => {
        Swal.fire ({
            title: '¿Estas seguro de eliminarlo?',
            text: "Un usuario eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText : 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then( async (result) => {
            if (result.value) {

                await clienteAxios.delete(`/cuentas/usuario/${id}`).then(res => {
                    Swal.fire( 'Eliminado', res.data.mensaje, 'success');
                });
            }
        });
    }

    return (
        <tr className='table__tr'>
            <td>{datos.nombre}</td>
            <td>{rut}</td>
            <td>{datos.email}</td>
            <td>{datos.telefono}</td>
            <td>{tipo}</td>
            <td>
                <div className='table__opciones'>
                    <Link to={`editar/${datos.id}`} className="btn btn-warning"><FaUserEdit size={23} color="#ffff"/></Link>
                    <button type='button' className="btn btn-danger" onClick={() => eliminarCliente(datos.id)}><RiDeleteBin2Line size={23}/></button>
                </div>
            </td>
        </tr>
    )
}

export default Usuario