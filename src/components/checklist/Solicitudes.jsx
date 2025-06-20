import { Fragment, useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsCalendarCheck } from "react-icons/bs";
import { AiOutlineTool } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";

import Solicitud from "./Solicitud";

import { CRMContext } from "../context/CRMContext";
import clienteAxios from "../../config/axios"; 

import Spinner from "../layout/Spinner";
import Paginacion from "../layout/Paginacion";


function Solicitudes() {

    const location = useLocation();

    // state usuarios
    const [ solicitudes, guardarSolicitudes ] = useState([]); 
    const [ cambio, guardarCambio ] = useState(true);
    const [ spin, guardarSpin ] = useState(true);

    // filtro
    // const [ filtroLocal, guardarFiltroLocal ] = useState(localStorage.getItem('filtroIngreso'));
    // const [ filtros, guardarFiltros ] = useState(location.state?.from ? {
    //         fecha: '', 
    //         otin: location.state.from, 
    //         nombre: '',
    //         marca: '',
    //         modelo: '',
    //         numeroInterno: '',
    //         numeroSerie: '',
    //         empresaId: '',
    //         tipoHerramientaId: '',
    //         activo: ''
    //     } :
    //     filtroLocal?.split('-')[1] === 'in' ? JSON.parse(filtroLocal.split('-')[0]) : {}
    // );

    const guardarFiltro = (data) => {
        // localStorage.setItem('filtroIngreso', `${JSON.stringify(data)}-in`);
        // guardarFiltros(data);
    }

    // paginacion
    const [ cantPaginas, guardarCantPaginas ] = useState(0);
    const [ pag, guardarPag ] = useState(localStorage.getItem('pagina')?.split('-'));
    const [ offset, guardarOffset ] = useState(!!pag ? pag[1] === 'in' && parseInt(pag[0]) !== 0 ? parseInt(pag[0]) : 0 : 0);
    
    const pagActual = (numero) => {
        guardarOffset(numero)
    } 

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const escucharCambio = () => {
        guardarCambio(!cambio);
    }

    const consultarAPI = async () => {
        
        try {

            localStorage.setItem('pagina', `${offset}-ch`);

            const res = await clienteAxios.get(`checklist/${offset}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarSolicitudes(res.data?.solicitudes);
            guardarCantPaginas(res.data?.cantPag);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {        
        
        if(auth.token !== '' && (auth.tipo === 1  || auth.tipo === 4) ) {
            localStorage.setItem('ultima', `/checklist`);
            localStorage.removeItem('filtroEmpresa');
            localStorage.removeItem('filtroFactura');
            consultarAPI();
            
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
                <div className="card-header">
                    <BsCalendarCheck size={50} color={"#333333"}/>
                    <h1>Solicitudes</h1>
                </div>
                <div className="card-body">

                    <div className='card-body-options'>

                        {/* <FormFiltroIngreso guardarFiltro={guardarFiltro} escucharCambio={escucharCambio} filtros={filtros} /> */}

                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <MdAddCircle size={25}/>
                            <BsCalendarCheck size={25}/>
                            Nueva Solicitud
                        </Link>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover ">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Titulo</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Prioridad</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">De</th> 
                                    <th scope="col">Fecha Solicitud</th>
                                    <th scope="col">Fecha Respuesta</th>
                                    <th scope="col">Versión</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    solicitudes.length > 0 ? (
                                        solicitudes.map((datos) => (
                                            <Solicitud solicitud={datos} key={datos.id}/>
                                        ))
                                    ) : 
                                    spin ? 
                                    <Spinner/>                                        
                                        : 
                                    <tr><td><p className='mensaje-vacio'>Aun no hay ingresos registrados o nadie coincide con la búsqueda </p></td></tr>
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

export default Solicitudes
