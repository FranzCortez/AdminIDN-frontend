import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import html2pdf from 'html2pdf.js';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';

function BoletaPagado({ fecha }) {

    const { id } = useParams();
    const [ factura, guardarFactura ] = useState({});

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const consultarAPI = async () => {

        const res = await clienteAxios.get(`/factura/${id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        res.data.valor = valorNumero(res.data.monto + parseInt(res.data.monto * 0.19));
        guardarFactura(res.data);

    }

    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <div id='usuarioEmpresa'>
            <div id='pdf'>
                <div className='boleta'>
                    <div className='pdf__titulo'>
                        <h1>RECEPCIÓN DE PAGO DE FACTURAS</h1>

                        <div className='pdf__titulo-data'>

                            <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                            <div className='boleta__fecha'>
                                <h2 className='pdf__titulo-otin'>Fecha Emisión:</h2>
                                <h2 className='pdf__titulo-otin'> {moment(Date.now()).format('DD-MM-YYYY')}</h2>
                            </div>
                        </div>
                    </div>    

                    <div className='pdf__componente boleta__componente w-96 max-w-10-table'>
                        {/* <div className='pdf__titulo-dueño certificado__subtitulo boleta__vencida'>
                            <h2>FACTURAS VENCIDAS</h2>
                        </div> */}
                        <table className="table table-hover boleta__table">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Factura N°</th>
                                    <th scope="col">Fecha Pago</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Fecha Emisión Factura</th>
                                    <th scope="col">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table__tr boleta__td'>
                                    <td>{factura.numeroFactura}</td>
                                    <td>{moment(fecha).format('DD-MM-YYYY')}</td>
                                    <td>{factura.herramientas[0].clienteContacto.clienteEmpresa.nombre}</td>
                                    <td>{factura.fechaFactura}</td>                             
                                    <td>${valorNumero(parseInt(factura.valor.split('.').join('')))}</td>                                    
                                </tr>                               
                                <tr className='table__tr boleta__total'>
                                    <td colSpan={5} ><span className='boleta__valor-total' >TOTAL DE TRANSFERENCIA:</span></td>
                                    <td><span className='boleta__valor-total'>${valorNumero(factura.valor)}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BoletaPagado;
