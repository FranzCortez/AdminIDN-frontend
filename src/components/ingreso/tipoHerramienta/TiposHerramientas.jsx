import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VscTools } from 'react-icons/vsc';
import { MdAddCircle } from 'react-icons/md';
import Swal from 'sweetalert2';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';
import TipoHerramientaTabla from './TipoHerramientaTabla';
import FormBuscarTipoHerramienta from './FormBuscarTipoHerramienta';

function TiposHerramientas() {

    // state usuarios
    const [ herramientas, guardarHerramientas ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);
    const [ busqueda, guardarBusqueda ] = useState('');

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const leerBusqueda = (e) => {
        guardarBusqueda(e.target.value);
    }

    const buscarHerramienta = async (e) => {
        e.preventDefault();

        if(e.nativeEvent.submitter.value === 'Limpiar Filtros'){
            escucharCambio();
            return;
        }

        if(busqueda.length < 3) {
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Debes tener mínimo 3 caracteres para buscar',
                timer: 1500
            });
        }else{
            const res = await clienteAxios.get(`tipo/categoria/${busqueda}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            if(res.status === 200){
                guardarHerramientas(res.data);
            }
        }
    }

    const escucharCambio = (e) => {
        document.querySelector('#buscar').value = "";
        guardarCambio(!cambio);
    }

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
            if(error.response.status === 404) {
                Swal.fire({
                    type: 'error',
                    title: 'Error!',
                    text: error.response.data.msg,
                    timer: 3500
                });
            }
        }
    }

    useEffect(() => {        
        
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }      
    }, [cambio]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <VscTools size={50} color={"#333333"}/>
                    <h1>Tipos de Herramienta</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>

                        <FormBuscarTipoHerramienta leerBusqueda={leerBusqueda} buscarHerramienta={buscarHerramienta} escucharCambio={escucharCambio}/>

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
                                    <th scope="col">Recomendacion</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    herramientas.length > 0 ? (
                                        herramientas.map((datos) => (
                                            <TipoHerramientaTabla datos={datos} key={datos.id}/>
                                        ))
                                    ) : <tr><td><p className='mensaje-vacio'>Aún no hay Tipos de Herramienta registrados o nadie coincide con la búsqueda </p></td></tr>
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

export default TiposHerramientas;
