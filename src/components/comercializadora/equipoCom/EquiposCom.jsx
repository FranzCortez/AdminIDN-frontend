import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VscTools } from 'react-icons/vsc';
import { MdAddCircle } from 'react-icons/md';
import Swal from 'sweetalert2';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';
import EquipoCom from './EquipoCom';

import Paginacion from '../../layout/Paginacion';

import Spinner from '../../layout/Spinner';

function EquiposCom() {
  
    // state usuarios
    const [ equipo, guardarEquipo ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);
    const [ busqueda, guardarBusqueda ] = useState('');
    const [ spin, guardarSpin ] = useState(true);

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);
    
    const [ pag, guardarPag ] = useState(localStorage.getItem('pagina')?.split('-'));
    const [ cantPaginas, guardarCantPaginas ] = useState(0);
    const [ offset, guardarOffset ] = useState(!!pag ? pag[1] === 'ie' && parseInt(pag[0]) !== 0 ? parseInt(pag[0]) : 0 : 0);

    let navigate = useNavigate();

    const pagActual = (numero) => {
        guardarOffset(numero)
    } 

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
            // todo: filtro

            // const res = await clienteAxios.get(`tipo/categoria/${busqueda}`,{
            //     headers: {
            //         Authorization: `Bearer ${auth.token}`
            //     }
            // });
            
            // if(res.status === 200){
            //     guardarEquipo(res.data);
            // }
        }
    }

    const escucharCambio = (e) => {
        document.querySelector('#buscar').value = "";
        guardarCambio(!cambio);
    }

    const consultarAPI = async () => {
        
        try {
            // localStorage.setItem('ultima', `/ingresos/tipoherramienta`);
            
            const res = await clienteAxios.get(`/equipo/padre/${offset}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarEquipo(res.data.equipo);
            guardarCantPaginas(res.data.cantPag);
            
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
        
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 3 || auth.tipo === 4) ) {
            consultarAPI();
            localStorage.removeItem('filtroEmpresa');
            localStorage.removeItem('filtroIngreso');
            localStorage.removeItem('filtroFactura');
            localStorage.removeItem('pagina');
        } else {
            navigate('/login', {replace: true});
        }      
    }, [cambio,offset]);

    setTimeout(() => {
        guardarSpin(false);
    }, 10000);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header-com">
                    <VscTools size={50} color={"#ebe1e1"}/>
                    <h1>Insumos/Equipos</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>

                        {/* <FormBuscarTipoHerramienta leerBusqueda={leerBusqueda} buscarHerramienta={buscarHerramienta} escucharCambio={escucharCambio}/> */}

                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <MdAddCircle size={25}/>
                            <VscTools size={25}/>
                            Nuevo Insumo/Equipo
                        </Link>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head-com'>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Insumo / Equipo</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    equipo.length > 0 ? (
                                        equipo.map((datos) => (
                                            <EquipoCom datos={datos} key={datos.id}/>
                                        ))
                                    ) : spin ?
                                    <Spinner/>
                                    :
                                    <tr><td><p className='mensaje-vacio'>Aún no hay Insumo/Equipos registrados o nadie coincide con la búsqueda </p></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <Paginacion cantPaginas={cantPaginas} pagActual={pagActual} offset={offset}/>
                </div>
            </div>
        </Fragment>
    )
}

export default EquiposCom
