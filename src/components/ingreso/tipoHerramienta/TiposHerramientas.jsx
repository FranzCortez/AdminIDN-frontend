import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VscTools } from 'react-icons/vsc';
import { MdAddCircle } from 'react-icons/md';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';

function TiposHerramientas() {

    // state usuarios
    const [ herramientas, guardarHerramientas ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);
    const [ busqueda, guardarBusqueda ] = useState('');

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const consultarAPI = async () => {
        
        try {
            
            const res = await clienteAxios.get(`tipo/categoria/herramientas`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarHerramientas(res.data);
            
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
                    <VscTools size={50} color={"#333333"}/>
                    <h1>Tipos de Herramienta</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        {/* <FormBuscarUsuario leerBusqueda={leerBusqueda} buscarUsuario={buscarUsuario} escucharCambio={escucharCambio}/> */}

                        <button>filtro</button>

                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <MdAddCircle size={25}/>
                            <VscTools size={25}/>
                            Nuevo Tipo de Herramienta
                        </Link>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripción Falla Común</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {
                                    ingresos.length > 0 ? (
                                        ingresos.map((datos) => (
                                            <Ingreso datos={datos} key={datos.id}/>
                                        ))
                                    ) : <tr><td><p className='mensaje-vacio'>Aun no hay ingresos registrados o nadie coincide con la búsqueda </p></td></tr>
                                } */}
                            </tbody>
                        </table>
                    </div>
                    {/* <Paginacion cantPaginas={cantPaginas} pagActual={pagActual} offset={offset}/> */}
                </div>
            </div>
        </Fragment>
    )
}

export default TiposHerramientas;
