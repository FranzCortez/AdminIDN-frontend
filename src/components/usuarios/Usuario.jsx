import React from 'react';
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

function Usuario({datos}) {

    let rut = datos.rut.split("");
    rut = rut[0] + rut[1] + "." + rut[2]+rut[3]+rut[4] + "." + rut[5]+rut[6]+rut[7] + "-" + rut[8];

    let tipo = 'Cliente Empresa';

    if(datos.tipo === 1) {
        tipo = 'Administrador';
    } else if(datos.tipo === 2) {
        tipo = 'Trabajador';
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
                    <Link to={"#"} className="btn btn-danger"><RiDeleteBin2Line size={23}/></Link>
                </div>
            </td>
        </tr>
    )
}

export default Usuario