import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";

import { CRMContext } from '../../context/CRMContext';

function EquipoCom({ datos }) {
    console.log(datos)
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    useEffect(() => {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        }
    },[]);

    return (
        <tr className='table__tr'>
            <td>{datos.nombre}</td>
            <td>{datos.marca}</td>
            <td>{datos.modelo}</td>
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
            <td>{datos.clienteEmpresaCom.nombre}</td>
            <td>
                <div className='table__opciones'>
                    {/* <Link to={`editar/${datos.id}`}><button type='button' className="btn btn-warning" ><BsPencilSquare size={23} color="#ffff"/></button></Link> */}
                    <button type='button' className="btn btn-warning" disabled><BsPencilSquare size={23} color="#ffff"/></button>
                </div>
            </td>
        </tr>
    )
}

export default EquipoCom;