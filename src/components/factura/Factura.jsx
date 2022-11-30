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

function Factura({ datos }) {
    
    const [auth, guardarAuth] = useContext(CRMContext);

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const estadoClase = () => {
        if( datos.estado === 'Pendiente' ) {
            return 'table__estado-pendiente';
        } else if ( datos.estado === 'Pagado' ) {
            return 'table__estado-pagado';            
        } else if ( datos.estado === 'Anulada' ) {
            return 'table__estado-anulado'
        } else {
            return 'table__estado-vencido';            
        }
    }
    
    return (
        <tr className='table__tr'>
            <td className='select'><input type="checkbox" name="" id="" /></td>
            <td>{datos.numeroFactura}</td>
            <td>{moment(datos.fechaFactura).format('DD-MM-YYYY')}</td>
            <td>{datos.otines}</td>
            <td>{datos.herramientas[0].clienteContacto.clienteEmpresa.nombre}</td>
            <td>{datos.guiaDespacho} / {moment(datos.numeroInterno).format('DD-MM-YYYY')}</td>
            <td>${valorNumero( datos.monto + ( datos.monto * 0.19 ) )}</td>
            <td><p className={estadoClase()} >{datos.estado}</p></td>
            <td>
                <div className='table__opciones'>
                    <FacturaInformacion datos={datos}/>
                </div>                
            </td>   
            <td>
                <div className='table__opciones'>
                    <Link to={`editar/${datos.id}`}><button type='button' className="btn btn-warning" ><FiEdit size={23} color="#ffff"/></button></Link>
                    
                    {
                        datos.fechaPago === null || datos.fechaPago === '0000-00-00' ?

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
                        datos.numeroNotaCredito === '' || datos.numeroNotaCredito === null ? 

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