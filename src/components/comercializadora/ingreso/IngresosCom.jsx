import { useState, useContext, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { MdOutlinePlaylistAdd } from "react-icons/md";
import Swal from 'sweetalert2';

import '../com.css';
import 'react-loading-skeleton/dist/skeleton.css'

import Paginacion from '../../layout/Paginacion';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';
import IngresoCom from './IngresoCom';
import Ingreso from '../../ingreso/Ingreso';

function IngresosCom() {

    const [auth, guardarAuth] = useContext(CRMContext);

    const [cargando, guardarCargando] = useState(true);

    // paginacion
    const [ cantPaginas, guardarCantPaginas ] = useState(0);
    const [ pag, guardarPag ] = useState(localStorage.getItem('pagina')?.split('-'));
    const [ offset, guardarOffset ] = useState(!!pag ? pag[1] === 'incom' && parseInt(pag[0]) !== 0 ? parseInt(pag[0]) : 0 : 0);
    const [ cantPaginasEirl, guardarCantPaginasEirl ] = useState(0);
    const [ pagEirl, guardarPagEirl ] = useState(localStorage.getItem('pagina')?.split('-'));
    const [ offsetEirl, guardarOffsetEirl ] = useState(!!pagEirl ? pagEirl[1] === 'incom' && parseInt(pagEirl[0]) !== 0 ? parseInt(pagEirl[0]) : 0 : 0);

    let navigate = useNavigate();

    const [ seleccion, guardarSeleccion ] = useState(1);

    const [ dataSpa, guardarDataSpa ] = useState([]);
    const [ ingresos, guardarIngresos ] = useState([]); 

    const pagActual = (numero) => {
        guardarOffset(numero)
    }
    const pagActualEirl = (numero) => {
        guardarOffsetEirl(numero)
    }

    const consultarAPI = async (seleccion) => {
        try {
 
            guardarCargando(true);

            //com
            if ( seleccion === 1 ) {
                
                localStorage.setItem('pagina', `${offset}-incom`);
    
                const res = await clienteAxios.get(`/ingresocom/ovin/${auth.tipo}/${auth.id}/${offset}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                console.log(res.data)
                guardarDataSpa(res.data.data)
                guardarCantPaginas(res.data.cantPag);
            } else {

                localStorage.setItem('pagina', `${offset}-in`);

                const res = await clienteAxios.post(`ih/ingreso/obtener/${offsetEirl}/${auth.tipo === 1 ? 0 : auth.id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                console.log(res.data)
                console.log(auth)
                console.log(auth.tipo === 1 ? 0 : auth.id)
                guardarIngresos(res.data.herramientaFiltro);
                guardarCantPaginasEirl(res.data.cantPag);
                
            }


            setTimeout(() => {
                guardarCargando(false);
            }, 3000);

        } catch (error) {
            console.error(error);     
            Swal.fire({
                type: 'error',
                title: 'Error en la sección ingreso',
                text: error.response.data.msg,
                timer: 2500
            }); 
            // redireccionar
            navigate('/homecom', {replace: true});
        }
    }

    useEffect(() => {
        const tipos = [1,3,4]
        if(auth.token === '' || !tipos.includes(auth.tipo) ) navigate('/login', {replace: true}); 

        consultarAPI(seleccion);
    }, [offsetEirl,offset]);

    return (
        <section className='ingresoscom'>

            <div className='ic__header'>
                <h1 className='ic__header-h1'><MdOutlinePlaylistAdd size={50} color={"#333333"}/>Ingresos</h1>
            </div>

            <div className='ic__body'>
                
                <div className='ic__viñeta'>
                    <h3 className={`ic__viñeta-h3 ${seleccion === 1 ? 'ic__viñeta-com' : 'ic__viñeta-com-off'}`} onClick={() => {guardarSeleccion(1); consultarAPI(1)}}>SPA</h3>
                    <h3 className={`ic__viñeta-h3 ${seleccion === 2 ? 'ic__viñeta-eirl' : 'ic__viñeta-eirl-off'}`} onClick={() => {guardarSeleccion(2); consultarAPI(2)}}>EIRL</h3>
                </div>
                <div className={`ic__card ${seleccion === 1 ? 'ic__card-com' : 'ic__card-eirl'}`}>
                    
                    <div className='ic__opciones'>
                        {/* <button>Filtros</button> */}
                        <Link to={"nuevo"} type="button" className="btn-new btn-success-new">
                            <MdOutlinePlaylistAdd size={25}/>
                            Nuevo Ingreso
                        </Link>
                    </div>

                    {
                        seleccion === 1 ?
                        <table className='ic__table'>

                            <thead className='ic__table-head com'>
                                <th className='ic__table-th'>OVIN</th>
                                <th className='ic__table-th'>Fecha Ingreso</th>
                                <th className='ic__table-th'>Cliente</th>
                                <th className='ic__table-th'>Contacto</th>
                                <th className='ic__table-th'>Tipo</th>
                                <th className='ic__table-th'>Descripción</th>
                                <th className='ic__table-th'>GD / Fecha</th>
                                <th className='ic__table-th'>Factura</th>
                                <th className='ic__table-th'>OC</th>
                                <th className='ic__table-th'>Cotizar</th>
                                <th className='ic__table-th'>Más Información</th>
                                <th className='ic__table-th'>Vendedor</th>
                            </thead>
                            <tbody className='ic__table-body'>

                                {
                                    dataSpa.length && !cargando ?

                                    dataSpa.map((data, index) => (
                                        <IngresoCom data={data} key={index} />
                                    ))

                                    :
                                    <Fragment>
                                        {
                                            cargando ? 
                                            null
                                            :
                                            <tr>
                                                <td colSpan={100}>No existen registros</td>
                                            </tr>
                                        }
                                    </Fragment>
                                }
                                {
                                    cargando ?
                                    <Fragment>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                    </Fragment>
                                    :
                                    null
                                }
                            </tbody>
                        </table>

                        :

                        <table className='ic__table'>
                            <thead className='ic__table-head eirl'>
                                <th className='ic__table-th'>OTIN</th>
                                <th className='ic__table-th'>Cliente</th>
                                <th className='ic__table-th'>Fecha Ingreso</th>
                                <th className='ic__table-th'>Nombre</th>
                                <th className='ic__table-th'>Marca</th>
                                <th className='ic__table-th'>Modelo</th>
                                <th className='ic__table-th'>N° Serie</th>
                                <th className='ic__table-th'>N° Interno</th>
                                <th className='ic__table-th'>Más Información</th>
                                <th className='ic__table-th'>Guía Des. IN / Fecha</th>
                                <th className='ic__table-th'>Num. Fac. / Fecha</th>
                            </thead>

                            <tbody>

                                {
                                    ingresos.length && !cargando ?

                                    ingresos.map((datos) => (
                                        <Ingreso datos={datos} spa={true} key={datos.id}/>
                                    ))
                                    :
                                    <Fragment>
                                        {
                                            cargando ? 
                                            null
                                            :
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={100}>No existen registros</td>
                                            </tr>
                                        }
                                    </Fragment>
                                }
                                {
                                    cargando ?
                                    <Fragment>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                        <tr className='ic__table-tr'>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                            <td className='ic__table-td'><Skeleton/></td>
                                        </tr>
                                    </Fragment>
                                    :
                                    null
                                }
                            </tbody>
                        </table>
                    }

                    {
                        seleccion === 1 ?
                            <Paginacion cantPaginas={cantPaginas} pagActual={pagActual} offset={offset}/>
                        :
                            <Paginacion cantPaginas={cantPaginasEirl} pagActual={pagActualEirl} offset={offsetEirl}/>
                    }
                </div>
                
            </div>

        </section>
    )
}

export default IngresosCom;