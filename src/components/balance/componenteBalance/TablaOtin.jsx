import React, { Fragment } from 'react';
import moment from 'moment';

function TablaOtin({ data, total }) {

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr className='table__head'>
                        <th scope="col"></th>
                        <th scope="col">OTIN</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?
                            data.map((info, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{info?.otin}</td>
                                    <td>{info?.nombre}</td>
                                    <td>{info?.clienteContacto?.clienteEmpresa?.nombre}</td>
                                    <td>{moment(info?.fecha).format('DD-MM-YYYY')}</td>
                                </tr>
                            ))
                        :
                            null
                    }

                    <tr className='table__tr boleta__total'>
                        <td colSpan={4} ><span className='boleta__valor-total' >TOTAL OTINES:</span></td>
                        <td><span className='boleta__valor-total'>{(total)}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TablaOtin;