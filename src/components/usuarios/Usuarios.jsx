import {React, Fragment, useEffect, useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUsers } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';
import Paginacion from '../layout/Paginacion';
import Usuario from './Usuario';
import FormBuscarUsuario from './FormBuscarUsuario';

import Spinner from '../layout/Spinner';

function Usuarios() {

    // state usuarios
    const [ usuarios, guardarUsuarios ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);
    const [ busqueda, guardarBusqueda ] = useState('');
    const [ spin, guardarSpin ] = useState(true);

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    // paginacion
    const [ cantPaginas, guardarCantPaginas ] = useState(0);
    const [ offset, guardarOffset ] = useState(0);
    
    const pagActual = (numero) => {
        guardarOffset(numero)
    } 


    const escucharCambio = () => {
        document.querySelector('#buscar').value = "";
        guardarCambio(!cambio);
    }

    const buscarUsuario = async (e) => {
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
            const res = await clienteAxios.get(`/cuentas/usuarioBuscar/${busqueda}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            if(res.status === 200){
                guardarUsuarios(res.data);
            }
        }
    }

    const leerBusqueda = (e) => {
        guardarBusqueda(e.target.value);
    }

    const consultarAPI = async () => {
        
        try {

            const res = await clienteAxios.get(`/cuentas/usuario/${offset}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarCantPaginas(res.data.cantPag);
            guardarUsuarios(res?.data?.usuarios);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {        
        
        if(auth.token !== '' && auth.tipo === 1) {
            consultarAPI();
            localStorage.removeItem('filtroEmpresa');
            localStorage.removeItem('filtroIngreso');
            localStorage.removeItem('filtroFactura');
            localStorage.removeItem('pagina');
        } else {
            navigate('/login', {replace: true});
        }      
    }, [cambio, offset]);

    setTimeout(() => {
        guardarSpin(false);
    }, 10000);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <FiUsers size={50} color={"#333333"}/>
                    <h1>Usuarios</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>
                        <FormBuscarUsuario leerBusqueda={leerBusqueda} buscarUsuario={buscarUsuario} escucharCambio={escucharCambio}/>

                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <IoPersonAddSharp size={25}/>
                            Nuevo Usuario
                        </Link>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Rut</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usuarios.length > 0 ? (
                                        usuarios.map((datos) => (
                                            <Usuario datos={datos} key={datos.id} escucharCambio={escucharCambio}/>
                                        ))
                                    ) : spin ? 
                                    <Spinner/>                                        
                                        : 
                                        <tr><td><p className='mensaje-vacio'>Aun no hay usuarios registrados o nadie coincide con la búsqueda </p></td></tr>
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

export default Usuarios
