import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoQrCodeOutline } from "react-icons/io5";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import moment from "moment";
import Swal from 'sweetalert2';

import FacturaInformacion from './FacturaInformacion';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

function Factura({ datos, boleta }) {
    
    const [auth, guardarAuth] = useContext(CRMContext);

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    // const estadoClase = () => {
    //     if( datos.estado === 'Pendiente' ) {
    //         return 'table__estado-pendiente';
    //     } else if ( datos.estado === 'Pagado' ) {
    //         return 'table__estado-pagado';            
    //     } else if ( datos.estado === 'Anulada' ) {
    //         return 'table__estado-anulado'
    //     } else {
    //         return 'table__estado-vencido';            
    //     }
    // }

    const diffInDays = (x, y) => Math.floor((x - y) / (1000 * 60 * 60 * 24));

    function addDaysToDate(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }

    const fechaVencimiento = datos.formaPago === 'Crédito' ? addDaysToDate(datos?.fechaFactura, 30) : addDaysToDate(datos?.fechaFactura, 1); // cambiar por credito o contado

    const estadoRow = () => {
        if( datos.estado === 'Pendiente' ) {
            return 'table__tr table__row-estado-pendiente';
        } else if ( datos.estado === 'Pagado' ) {
            return 'table__tr table__row-estado-pagado';            
        } else if ( datos.estado === 'Anulada' ) {
            return 'table__tr table__row-estado-anulado'
        } else if ( datos.estado === 'Vencido' ) {
            return 'table__tr table__row-estado-vencido';            
        } else {
            return 'table__tr'
        }
    }

    return (
        <tr className={estadoRow()}>
            <td className='select'>
                <input 
                    type="checkbox" 
                    name="facturaId" 
                    id={datos?.id} 
                    data-estado={datos?.estado}
                    data-otin={datos?.otines}
                    data-valor={valorNumero( datos?.monto + parseInt( datos?.monto * 0.19 ) )}
                    data-factura={datos?.numeroFactura}
                    data-orden={datos?.numeroCompra}
                    data-despacho={datos?.guiaDespacho}
                    data-cliente={datos?.herramientas?.length > 0 ? datos?.herramientas[0].clienteContacto.clienteEmpresa.nombre : '-'}
                    data-fechafactura={moment(datos?.fechaFactura).format('DD-MM-YYYY')}
                    data-fechavencimiento={moment(fechaVencimiento).format('DD/MM/YYYY')}
                    data-mora={datos?.fechaPago === '0000-00-00' && new Date() >= fechaVencimiento ? ` ${diffInDays(new Date(), fechaVencimiento)} Días` : ''}
                    onChange={boleta} 
                    disabled={datos?.estado === 'Anulada' || datos?.estado === 'Pagado' || datos?.estado === 'No Existe' ? true : false}
                />
            </td>
            <td>{datos.numeroFactura}</td>
            <td>{datos?.herramientas?.length > 0 ? moment(datos.fechaFactura).format('DD-MM-YYYY') : '-'}</td>
            <td>{datos?.herramientas?.length > 0 ? datos.otines : '-'}</td>
            <td>{datos?.herramientas?.length > 0 ? datos.herramientas[0].clienteContacto.clienteEmpresa.nombre : '-'}</td>
            <td>{datos?.herramientas?.length > 0 ? datos.guiaDespacho : '- '} / {datos?.herramientas?.length > 0 && datos.fechaGuiaDespacho !== '0000-00-00' ? moment(datos.fechaGuiaDespacho).format('DD-MM-YYYY') : '-'}</td>
            <td>${datos?.herramientas?.length > 0 ? valorNumero( datos.monto + parseInt( datos.monto * 0.19 ) ) : '-'}</td>
            {/* <td><p className={estadoClase()} >{datos.estado}</p></td> */}
            <td>{datos.estado ? datos.estado : '-'}</td>
            <td>
                <div className='table__opciones'>
                    <FacturaInformacion datos={datos}/>
                </div>                
            </td>   
            <td>
                <div className='table__opciones'>
                     
                    {
                        datos?.herramientas?.length > 0 ?

                        <Link to={`editar/${datos.id}`}>
                            <button type='button' className="btn btn-warning" >
                                <FiEdit size={23} color="#ffff"/>
                            </button>
                        </Link>

                        :

                        <button type='button' className="btn-new" >
                            <FiEdit size={23} color="#ffff"/>
                        </button>
                    }
                    
                    {
                        (datos.fechaPago === null || datos.fechaPago === '0000-00-00') && datos?.herramientas?.length > 0 ?

                            <Link to={`pagar/${datos.id}`}>
                                <button type='button' className={'btn-new btn-success-new'} >
                                    <FaFileInvoiceDollar size={23} color="#ffff"/>
                                </button>
                            </Link>
                        :

                            <button type='button' className={ 'btn-new ' } >
                                <FaFileInvoiceDollar size={23} color="#ffff"/>
                            </button>

                    }

                    {
                        (datos.numeroNotaCredito === '' || datos.numeroNotaCredito === null) && datos.estado !== 'No Existe' ? 

                            <Link to={`nota/${datos.id}`}>
                                <button type='button' className="btn btn-danger">
                                    <GiCancel size={23}/>
                                </button>
                            </Link>
                        :
                            <button type='button' className="btn-new" >
                                <GiCancel size={23}/>
                            </button>
                    }
                    
                </div>
            </td>
        </tr>
    )
}

export default Factura