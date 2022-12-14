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

    useEffect(() => {                
        if(auth.token === '' && !(auth.tipo === 1 || auth.tipo === 2) ) {
            navigate('/login', {replace: true});
        }      
    }, []);

    return (
        <tr className='table__tr'>
            <td>{datos.otin}</td>
            <td>{datos.clienteContacto.clienteEmpresa.nombre}</td>
            <td>{moment(datos.fecha).format('DD-MM-YYYY')}</td>
            <td>{datos.nombre}</td>
            <td>{datos.marca}</td>
            <td>{datos.modelo}</td>
            <td>{datos.numeroSerie}</td>
            <td>{datos.numeroInterno}</td>
            <td>
                <div className='table__opciones' onClick={consultarAPI}>
                    <IngresoInformacion nombre={datos.nombre} ingreso={ingreso}/>
                </div>                
            </td>
            <td>
                <div className='table__opciones' onClick={consultarAPI}>
                    <IngresoOpciones ingreso={datos}/>
                </div>                
            </td>
            <td>
                <div className='table__opciones'>
                    {
                        datos.activo ? 

                        <button type='button' className={"btn-new btn-success-new"} onClick={generarQR}>
                            <BsBoxArrowInRight size={25}/>
                            <IoQrCodeOutline size={25}/>
                        </button>

                        :
                        
                        <button type='button' className={"btn-new btn-return"} onClick={editarQR}>
                            <FiEdit size={25}/>
                            <IoQrCodeOutline size={25}/>
                        </button>
                    }
                </div>                
            </td>
            {
                datos.guiaDespacho === '-' || datos.guiaDespacho === null ? 
                    <td>-</td>
                :
                    <td>{datos.guiaDespacho} / {moment(datos.fechaGuiaDespacho).format('DD-MM-YYYY')}</td>
            }
        </tr>
    )
}

export default Ingreso;  
