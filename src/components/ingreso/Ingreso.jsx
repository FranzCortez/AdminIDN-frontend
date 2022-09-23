import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import IngresoInformacion from './IngresoInformacion';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

function Ingreso({datos}) {

    const [ ingreso, guardarIngreso ] = useState({});

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

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

    useEffect(() => {                
        if(auth.token === '' && !(auth.tipo === 1 || auth.tipo === 2) ) {
            navigate('/login', {replace: true});
        }      
    }, []);

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
                <div className='table__opciones' onClick={consultarAPI}>
                    <IngresoInformacion nombre={datos.nombre} ingreso={ingreso}/>
                </div>                
            </td>
        </tr>
    )
}

export default Ingreso;
