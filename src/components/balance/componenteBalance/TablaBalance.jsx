import React, { Fragment } from 'react';
import moment from 'moment';

function TablaBalance({ data, total }) {

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    return (
        <div className="table-responsive balance">
            <table className="table table-hover">
                <thead>
                    <tr className='table__head'>
                        <th scope="col">OTIN</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">N° Factura</th>
                        <th scope="col">Fecha Factura</th>
                        <th scope="col">Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?
                            data.map((info, index) => (
                                <tr key={index}>
                                    <td>{info?.otines}</td>
                                    <td>{info?.herramientas[0]?.clienteContacto?.clienteEmpresa?.nombre}</td>
                                    <td>{info?.numeroFactura}</td>
                                    <td>{moment(info?.fechaFactura).format('DD-MM-YYYY')}</td>
                                    <td>$ {valorNumero(info?.monto)}</td>
                                </tr>
                            ))
                        :
                            null
                    }

                    <tr className='table__tr boleta__total'>
                        <td colSpan={4} ><span className='boleta__valor-total' >TOTAL:</span></td>
                        <td><span className='boleta__valor-total'>${valorNumero(total)}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TablaBalance