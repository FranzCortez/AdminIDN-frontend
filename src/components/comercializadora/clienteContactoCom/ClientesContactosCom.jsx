import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdContactPhone } from "react-icons/md";
import { IoPersonAddSharp, IoArrowBackCircleOutline } from "react-icons/io5";

import clienteAxios from '../../../config/axios';
import ClienteContactoCom from './ClienteContactoCom';
import { CRMContext } from '../../context/CRMContext.jsx';

import Spinner from '../../layout/Spinner';

function ClientesContactosCom() {

    const { id: idEmpresa } = useParams();

    const [ contactos, guardarContactos ] = useState([]);
    const [ cambio, guardarCambio ] = useState(true);
    const [ spin, guardarSpin ] = useState(true);

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();
    
    const escucharCambio = () => {
        guardarCambio(!cambio);
    }

    const consultarAPI = async () => {

        try {
            
            // localStorage.setItem('ultima', `/clientes/contactocom/${idEmpresa}`);
            
            const res = await clienteAxios.get(`/clientescom/contactocom/${idEmpresa}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarContactos(res?.data);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 3 || auth.tipo === 4) ) {
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        } 
    },[cambio]);

    setTimeout(() => {
        guardarSpin(false);
    }, 10000);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header-com">
                    <MdContactPhone size={50} color={"#ebe1e1"}/>
                    <h1>Clientes Contacto Empresa Comercializadora</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        
                        <div className='top-left'>
                            <Link to={`/clientescom`} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                        </div>

                        <Link to={`nuevo`} type="button" className="btn-new btn-success-new">
                            <IoPersonAddSharp size={25}/>
                            Nuevo Contacto
                        </Link>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head-com'>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contactos.length > 0 ? (
                                        contactos.map((datos) => (
                                            <ClienteContactoCom datos={datos} key={datos.id} escucharCambio={escucharCambio}/>
                                        ))
                                    ) 
                                    :

                                        spin ? 
                                            <Spinner/>
                                        
                                        :

                                            <tr>                                  
                                                <td>
                                                    <p className='mensaje-vacio'>Aun no hay clientes registrados o nadie coincide con la búsqueda </p>
                                                </td>
                                            </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ClientesContactosCom
