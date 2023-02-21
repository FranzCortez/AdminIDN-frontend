import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';

import { CRMContext } from '../../context/CRMContext';

function ClienteContacto({datos, escucharCambio}) {

    const [auth, guardarAuth] = useContext(CRMContext);

    const eliminarContacto = (idEmpresa) => {
        Swal.fire ({
            title: '¿Estás seguro de eliminarlo?',
            text: "Un cliente eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText : 'Sí, ¡Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then( async (result) => {
            if (result.value) {

                try {
                    const res = await clienteAxios.delete(`contactos/contacto/${idEmpresa}/${datos.id}`,{
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                
                    if(res.status === 200) {
                        Swal.fire( 'Eliminado', res.data.mensaje, 'success');
                        escucharCambio();
                    }
                } catch (error) {
                    
                    Swal.fire({
                        type: 'error',
                        title: 'No se pudo eliminar',
                        text: error.response.data.msg,
                        timer: 3500
                    });
                }                   

            }
        });
    }

    return (
        <tr className='table__tr'>
            <td>{datos.nombre}</td>
            <td>{datos.cargo}</td>
            <td>{datos.correo}</td>
            <td>{datos.telefono ? datos.telefono : '-'}</td>
            <td>
                <div className='table__opciones'>
                    <Link to={`editar/${datos.id}`}><button type='button' className="btn btn-warning" ><FaUserEdit size={23} color="#ffff"/></button></Link>
                    <button type='button' className="btn btn-danger" onClick={() => {eliminarContacto(datos.clienteEmpresaId);}}><RiDeleteBin2Line size={23}/></button>
                </div>
            </td>
        </tr>
    )
}

export default ClienteContacto;