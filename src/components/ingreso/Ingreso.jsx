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

function Ingreso({datos}) {

    const [ ingreso, guardarIngreso ] = useState({});

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const generarQR = () => {
        Swal.fire ({
            title: '¿Estás seguro de marcar la salida de la herramienta?',
            text: "¡Solo se puede generar 1 vez el código Qr por herramienta!",
            type: 'warning',
            showCancelButton : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText : 'Si, Generar!',
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
            text: "¡El Qr se mantendra pero se cambiara la fecha!",
            type: 'warning',
            showCancelButton : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText : 'Si, Modificar!',
            cancelButtonText: 'Cancelar'
        }).then( (result) => {
            if (result.value) {
                navigate(`/qr/form/${datos.id}/${2}`, {replace: true});
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

    const informe = (estado) => {
        if ( estado ) {
            return 'table__tr-informe';
        }
    }

    useEffect(() => {                
        if(auth.token === '' && !(auth.tipo === 1 || auth.tipo === 2) ) {
            navigate('/login', {replace: true});
        }      
    }, []);

    return (
        <tr className='table__tr'>
            <td className={informe(datos.archivo)} >{datos.otin}</td>
            <td className={informe(datos.archivo)} >{datos.clienteContacto.clienteEmpresa.nombre}</td>
            <td className={informe(datos.archivo)} >{moment(datos.fecha).format('DD-MM-YYYY')}</td>
            <td className={informe(datos.archivo)} >{datos.nombre}</td>
            <td className={informe(datos.archivo)} >{datos.marca}</td>
            <td className={informe(datos.archivo)} >{datos.modelo}</td>
            <td className={informe(datos.archivo)} >{datos.numeroSerie}</td>
            <td className={informe(datos.archivo)} >{datos.numeroInterno}</td>
            <td className={informe(datos.archivo)} >
                <div className='table__opciones' onClick={consultarAPI}>
                    <IngresoInformacion nombre={datos.nombre} ingreso={ingreso}/>
                </div>                
            </td>
            <td className={informe(datos.archivo)} >
                <div className='table__opciones' onClick={consultarAPI}>
                    <IngresoOpciones ingreso={datos}/>
                </div>                
            </td>
            <td className={informe(datos.archivo)} >
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
            {
                datos.guiaDespacho === '-' || datos.guiaDespacho === null ? 
                    <td className={informe(datos.archivo)} >-</td>
                :
                    <td className={informe(datos.archivo)} >
                        <p className='ingreso__gd'>
                            {datos.guiaDespacho} / <span>{moment(datos.fechaGuiaDespacho).format('DD-MM-YYYY')}</span>
                        </p>
                    </td>
            }
            {
                datos.factura === '-' || datos.factura === null ? 
                    <td className={informe(datos.archivo)} >-</td>
                :
                    <td className={estadoRow(datos.factura.estado)} >
                        <p className='ingreso__gd'>
                            {datos.factura.numeroFactura} / <span>{moment(datos.factura.fechaFactura).format('DD-MM-YYYY')}</span>
                        </p>
                    </td>
            }
        </tr>
    )
}

export default Ingreso;  
