import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';

function EmpresaContacto(props) {

    const [ empresas, guardarEmpresas ] = useState([]);
    const [ contactos, guardarContactos ] = useState([]);

    let idEmpresa = 0;

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const consultarEmpresas = async (e) => {

        try {
            const res = await clienteAxios.get(`empresas/empresaNombre`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarEmpresas(res.data);
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
    
    const consultarContactos = async (e) => {
        try {
            idEmpresa = e.target.value;

            const res = await clienteAxios.get(`contactos/contacto/${idEmpresa}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarContactos(res.data);
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
            consultarEmpresas();
        } else {
            navigate('/login', {replace: true});
        }        
    },[]);

    return (
        <Fragment>
            <div className='campo'>
                <label htmlFor="nombre">Seleccione Empresa:</label>
                <select name="empresa" id="empresa"  defaultValue={0} onChange={consultarContactos}>
                    <option value={0} disabled> -- Seleccione -- </option>    
                    {
                        empresas.map(empresa => (
                            <option value={empresa.id} key={empresa.id}>{empresa.nombre}</option>
                        ))
                    }
                </select>     
                <Link to={'/clientes/nuevo'} className="btn-new btn-success-new">Crear Nueva Empresa</Link>                    
            </div>                                   

            <div className='campo'>
                <label htmlFor="nombre">Seleccione Contacto Empresa:</label>
                <select name="clienteContactoId" id="clienteContactoId"  defaultValue={0} onChange={props.contactoListo}>
                    <option value={0} disabled> -- Seleccione -- </option>    
                    {
                        contactos.map(contacto => (
                            <option value={contacto.id} key={contacto.id}>{contacto.nombre}</option>
                        ))
                    }
                </select>   
                <Link to={`/clientes/contacto/${idEmpresa}/nuevo`} className="btn-new btn-success-new">Crear Nueva Contacto</Link>                         
            </div>  
        </Fragment>
    )
}

export default EmpresaContacto