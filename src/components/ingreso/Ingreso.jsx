import React from 'react';

function Ingreso({datos}) {

    return (
        <tr className='table__tr'>
            <td>{datos.otin}</td>
            <td>{datos.clienteContacto.clienteEmpresa.nombre}</td>
            <td>{datos.fecha}</td>
            <td>{datos.nombre}</td>
            <td>{datos.marca}</td>
            <td>{datos.modelo}</td>
            <td>{datos.numeroInterno}</td>
            <td>{datos.numeroSerie}</td>
            <td>
                {/* <div className='table__opciones'>
                    <Link to={`editar/${datos.id}`}><button type='button' className="btn btn-warning" ><FaUserEdit size={23} color="#ffff"/></button></Link>
                    <button type='button' className="btn btn-danger" onClick={() => {eliminarCliente(datos.id);}}><RiDeleteBin2Line size={23}/></button>
                </div> */}
            </td>
        </tr>
    )
}

export default Ingreso;
