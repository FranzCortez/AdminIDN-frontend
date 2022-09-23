import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineTool } from "react-icons/ai";

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';
import Ingreso from './Ingreso';

function Ingresos() {

    // state usuarios
    const [ ingresos, guardarIngresos ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);
    const [ busqueda, guardarBusqueda ] = useState('');

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const consultarAPI = async () => {
        
        try {

            const res = await clienteAxios.post(`ih/ingreso/obtener`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarIngresos(res.data);
            
        } catch (error) {
            console.log(error)
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
            <div className="card contenedor">
                <div className="card-header">
                    <AiOutlineTool size={50} color={"#333333"}/>
                    <h1>Ingresos</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        {/* <FormBuscarUsuario leerBusqueda={leerBusqueda} buscarUsuario={buscarUsuario} escucharCambio={escucharCambio}/> */}

                        {/* <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <IoPersonAddSharp size={25}/>
                            Nuevo Usuario
                        </Link> */}
                    </div>


                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">OTIN</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Fecha Ingreso</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">Número Interno</th>
                                    <th scope="col">Número Serie</th>
                                    <th scope="col">Más Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ingresos.length > 0 ? (
                                        ingresos.map((datos) => (
                                            <Ingreso datos={datos} key={datos.id}/>
                                        ))
                                    ) : <tr><td><p className='mensaje-vacio'>Aun no hay ingresos registrados o nadie coincide con la búsqueda </p></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <Paginacion cantPaginas={cantPaginas} pagActual={pagActual} offset={offset}/> */}
                </div>
            </div>
        </Fragment>
    )
}

export default Ingresos;
