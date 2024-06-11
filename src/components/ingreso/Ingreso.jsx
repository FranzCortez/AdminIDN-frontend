import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoQrCodeOutline } from "react-icons/io5";
import { BsBoxArrowInRight } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import Swal from 'sweetalert2';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

import IngresoInformacion from './IngresoInformacion';
import IngresoOpciones from './IngresoOpciones';
import InformacionFactura from './InformacionFactura';

function Ingreso({datos, spa}) {

    const [ ingreso, guardarIngreso ] = useState({});

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const generarQR = () => {
        Swal.fire ({
            title: '¿Estás seguro de marcar la salida de la herramienta?',
            text: "¡Sólo se puede generar 1 vez el código QR por herramienta!",
            type: 'warning',
            showCancelButton : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText : 'Sí, ¡Generar!',
            cancelButtonText: 'Cancelar'
        }).then( (result) => {
            if (result.value) {
                navigate(`/qr/form/${datos.id}/${1}`, {replace: true});
            }
        });
    }

    const editarQR = () => {
        Swal.fire ({
            title: '¿Estás seguro de querer modificar la fecha de próxima mantención?',
            text: "¡El QR se mantendrá pero se cambiará la fecha!",
            type: 'warning',
            showCancelButton : true,
            showDenyButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText : 'Sí, ¡Modificar!',
            denyButtonText: 'Descagar Qr',
            denyButtonColor: '#ECA400',
            cancelButtonText: 'Cancelar'
        }).then( (result) => {
            
            if (result.isConfirmed) {
                navigate(`/qr/form/${datos.id}/${2}`, {replace: true});
            } else if (result.isDenied) {
                navigate(`/qr/descargar/${datos.id}`, {replace: true});
            }
        });
    }

    const consultarAPI = async () => {
        
        try {
            const res = await clienteAxios.get(`ih/ingreso/${datos.id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarIngreso(res.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    moment.locale('es-mx')

    const estadoRow = (estado) => {
        if( estado === 'Pendiente' ) {
            return 'factura__pendiente';
        } else if ( estado === 'Pagado' ) {
            return 'factura__pagado';            
        } else if ( estado === 'Vencido' ) {
            return 'factura__vencido';            
        } else {
            return ''
        }
    }

    const informe = (datos) => {
        if ( datos.archivo ) {
            return 'table__tr-informe';
        } else if ( datos.preinforme ) {
            return 'table__tr-preinforme';
        }
    }

    useEffect(() => {                
        if(auth.token === '' && !(auth.tipo === 1 || auth.tipo === 2) ) {
            navigate('/login', {replace: true});
        }      
    }, []);

    return (
        <tr className='table__tr'>
            <td className={informe(datos)} >{datos.otin}</td>
            <td className={informe(datos)} >{datos.clienteContacto.clienteEmpresa.nombre}</td>
            <td className={informe(datos)} >{moment(datos.fecha).format('DD-MM-YYYY')}</td>
            <td className={informe(datos)} >{datos.nombre}</td>
            <td className={informe(datos)} >{datos.marca}</td>
            <td className={informe(datos)} >{datos.modelo}</td>
            <td className={informe(datos)} >{datos.numeroSerie}</td>
            <td className={informe(datos)} >{datos.numeroInterno}</td>
            <td className={informe(datos)} >
                <div className='table__opciones' onClick={consultarAPI}>
                    <IngresoInformacion nombre={datos.nombre} ingreso={ingreso}  spa={spa}/>
                </div>                
            </td>
            
            {
                spa ?
                null
                :
                <td className={informe(datos)} >
                    <div className='table__opciones' onClick={consultarAPI}>
                        <IngresoOpciones ingreso={datos}/>
                    </div>                
                </td>
            }

            {
                spa ?
                null
                :
                <td className={informe(datos)} >
                    <div className='table__opciones'>
                        {
                            datos.activo ? 

                            <button type='button' className={"btn-new btn-success-new"} onClick={generarQR}>
                                <BsBoxArrowInRight size={20}/>
                                <IoQrCodeOutline size={20}/>
                            </button>

                            :
                            
                            <button type='button' className={"btn-new btn-return"} onClick={editarQR}>
                                <FiEdit size={20}/>
                                <IoQrCodeOutline size={20}/>
                            </button>
                        }
                    </div>                
                </td>
            }
            {
                datos.guiaDespacho === '-' || datos.guiaDespacho === null ? 
                    <td className={informe(datos)} >-</td>
                :
                    <td className={informe(datos)} >
                        <p className='ingreso__gd'>
                            {datos.guiaDespacho} / <span>{moment(datos.fechaGuiaDespacho).format('DD-MM-YYYY')}</span>
                        </p>
                    </td>
            }
            {
                auth.tipo === 1 ? 

                    datos.factura === '-' || datos.factura === null ? 
                        <td className={informe(datos)} >-</td>
                    :
                        <td className={estadoRow(datos.factura.estado)} >
                            <InformacionFactura nFactura={datos.factura.numeroFactura} fechaFactura={datos.factura.fechaFactura} />
                        </td>
                :
                    null
            }
        </tr>
    )
}

export default Ingreso;  
