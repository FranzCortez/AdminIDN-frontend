import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';

function TipoHerramienta(props) {

    const [ tipos, guardarTipos ] = useState([]);

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const consultarAPI = async () => {
        try {
            const res = await clienteAxios.get(`tipo/categoria/herramienta`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarTipos(res.data);
        } catch (error) {
            if(error.request.status === 404 ) {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.msg,
                    timer: 1500
                })
            }
            // redireccionar
            navigate('/ingresos', {replace: true});
        }
    }

    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        } 
    }, []);

    return (
        <Fragment>
            <div className='campo'>
                <label htmlFor="nombre">Seleccione Tipo Herramienta:</label>
                <select name="empresa" id="empresa"  defaultValue={0} onChange={props.tipoListo}>
                    <option value={0} disabled> -- Seleccione -- </option>    
                    {
                        tipos.map(tipo => (
                            <option value={tipo.id} key={tipo.id}>{tipo.nombre}</option>
                        ))
                    }
                </select>     
                <Link to={'#'} className="btn-new btn-success-new">Crear Tipo Herramienta</Link>                    
            </div>  
        </Fragment>
    )
}

export default TipoHerramienta;