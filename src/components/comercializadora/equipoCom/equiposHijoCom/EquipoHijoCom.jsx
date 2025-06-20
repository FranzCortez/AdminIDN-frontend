import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";

import { CRMContext } from '../../../context/CRMContext';

function EquipoHijoCom({ datos }) {
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    useEffect(() => {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 3 && auth.tipo !== 4) { 
            navigate('/login', {replace: true});
        }
    },[]);

    return (
        <tr className='table__tr'>
            <td>{datos.numeroSerie}</td>
            <td>{datos.nombre}</td>
            <td>{datos.tipo}</td>
            <td>{datos.marca}</td>
            <td>{datos.modelo}</td>
            <td>{datos.codigo}</td>
            <td>{datos.proveedorCom.nombre}</td>
            <td>
                {
                    datos.descripcion ? 
                    <textarea name="" id="" className='descripcion' value={datos.descripcion} disabled></textarea>
                    : 
                    '-'
                }
            </td>
            <td>{datos.stock}</td>
            <td>{datos.valor}</td>
            <td>
                <div className='table__opciones'>
                    <Link to={`editar/${datos.id}`}>
                        {/* <button type='button' className=" btn-warning"><BsPencilSquare size={23} color="#ffff" disabled/></button> */}
                        <button type='button' className="btn btn-warning"><BsPencilSquare size={23} color="#ffff" disabled/></button>
                    </Link>
                </div>
            </td>
        </tr>
    )
}

export default EquipoHijoCom
