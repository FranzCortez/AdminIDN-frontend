import React, { useContext } from 'react';
import { AiOutlineDownload } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import moment from "moment";
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function PDF({ contenido, cotizacion, herramienta, cotizacionBackend }) {

    moment.locale('es-mx')

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const pdfcrear = () => {

        html2pdf()
        .set({
            margin: 0,
            filename: `cotizacion OTIN ${herramienta.otin}.pdf`,
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 3, // A mayor escala, mejores gráficos
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: 'portrait' // landscape o portrait
            }
        })
        .from(document.querySelector("#pdf"))
        .save()
        .toPdf()
        .output('blob')
        .then( async function (pdf) {

            const file = new File(
                [pdf],
                `cotizacion ${herramienta.otin}.pdf`,
                {type: 'application/pdf'}
            ); 

            const formData = new FormData();        
            formData.append("document", file);
            formData.append("data", JSON.stringify(cotizacionBackend))
    
            try {

                const res = await clienteAxios.post(`ih/ingreso/pdf`, formData,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });       
                
                Swal.fire({
                    title: 'Cotización Realizada con Exito',
                    text: res.data.msg,
                    timer: 1500
                })
    
            } catch (error) {
                console.log(error)
                if(error.request.status === 404 ) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Error al guardar la cotización',
                        timer: 1500
                    })
                }
                // redireccionar
                navigate('/ingresos', {replace: true});
            }            
        });
    }

    return (
        <div id="pdfCreador">

            <Link 
                to={"/ingresos"}
            >
                <div 
                    id="btnCrearPdf" 
                    className='btn-new btn-login' 
                    onClick={pdfcrear}
                >
                    Descargar 
                    <AiOutlineDownload size={25} />
                </div>
            </Link>

            <div id='pdf' className='pdf'>

                <div className='pdf__titulo'>
                    <h1>Cotización impacto del norte</h1>
                    
                    <div className='pdf__titulo-data'>

                        <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                        <div className='pdf__titulo-dueño'>
                            <h2>ALBERTO GARCÍA LÓPEZ</h2>
                            <h2>REPARACIONES Y MANTENCION E.I.R.L</h2>
                            <h2>R.U.T 76.546.349-1</h2>
                        </div>

                        <h2 className='pdf__titulo-otin'>OTIN {herramienta?.otin}</h2>
                    </div>

                    <div className='pdf__titulo-bloque-info pdf__titulo-bloque-info-m'>
                        <div className='pdf__titulo-info'>
                            <div className='pdf__titulo-campo'>
                                <p><span>Empresa: </span>{herramienta?.clienteContacto?.clienteEmpresa?.nombre}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>Sucursal: </span>{herramienta?.clienteContacto?.clienteEmpresa?.direccion}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>Rut: </span>{herramienta?.clienteContacto?.clienteEmpresa?.rut}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>Giro: </span>Venta al por mayor no especializada</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>Atención: </span>{herramienta?.clienteContacto?.nombre}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>E-Mail: </span>{herramienta?.clienteContacto?.correo}</p>
                            </div>
                        </div>

                        <div className='pdf__titulo-info'>
                            <div className='pdf__titulo-campo'>
                                <p><span>FECHA DE INGRESO: </span>{moment(herramienta?.fecha).format('DD/MM/YYYY')}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>GUIA DE DESPACHO: </span>{herramienta?.fechaGuiaDespacho ? moment(herramienta?.fechaGuiaDespacho).format('DD/MM/YYYY') : ''}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>FECHA DE EVALUACION: </span>{moment(cotizacion?.fechaEvaluacion).format('DD/MM/YYYY')}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>FECHA DE COTIZACION: </span>{moment(cotizacion?.fechaCotizacion).format('DD/MM/YYYY')}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>TELEFONO: </span>{herramienta?.clienteContacto?.telefono}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pdf__herramienta pdf__mt-05'>
                    <table className="table table-hover">
                        <thead>
                            <tr className='table__head'>
                                <th scope="col">Equipo</th>
                                <th scope="col">Marca</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">N° Serie</th>
                                <th scope="col">N° Interno</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='table__tr'>
                                <td>{herramienta?.nombre}</td>
                                <td>{herramienta?.marca}</td>
                                <td>{herramienta?.modelo}</td>
                                <td>{herramienta?.numeroSerie ? herramienta?.numeroSerie : ''}</td>
                                <td>{herramienta?.numeroInterno ? herramienta?.numeroInterno : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='pdf__componente pdf__mt-05'>
                    <table className="table table-hover">
                        <thead>
                            <tr className='table__head'>
                                <th scope="col"><div>ITEM</div></th>
                                <th scope="col">Nombre del Componente</th>
                                <th scope="col">Desc. Repuesto</th>
                                <th scope="col">Cant.</th>
                                <th scope="col">Valor Unit. Repuesto</th>
                                <th scope="col">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contenido.map( (data, index) => (
                                    <tr className='table__tr' key={index+1 * 3}>
                                        <td className='fontbold' >{data.nombre ? index+1 : ''}</td>
                                        <td>{data.nombre ? data.nombre : ''}</td>
                                        <td>{data.nombre ? data.descripcion : ''}</td>
                                        <td>{data.nombre ? data.cantidad : ''}</td>
                                        <td className='fontbold' >{data.nombre ? "$" + valorNumero(data.valor) : ''}</td>
                                        <td className='fontbold' >{data.nombre ? "$" + valorNumero((data.valor * data.cantidad)) : ''}</td>
                                    </tr>
                                ))                    
                            }
                        </tbody>
                    </table>
                </div>

                <div className='pdf__pie pdf__mt-05'>
                    <div className='pdf__pie-valor'>
                        
                        <div className='pdf__pie-info'>

                            <div className='pdf__pie-info-mantenimiento'>
                                <p>{cotizacion?.gastos}</p>
                            </div>

                            <div className='pdf__pie-info-mantenimiento'>
                                <p>CONDICIONES: <span>{cotizacion?.condiciones}</span></p>
                                <p>PLAZO DE ENTREGA: <span>{cotizacion?.plazoEntrega}</span></p>
                                <p>{cotizacion?.garantia}</p>
                            </div>
                        </div>

                        <div className='pdf__pie-final'>
                            <table className="table table-hover">                                
                                <tbody>
                                    <tr className='table__tr'>
                                        <th scope="col">Sub-Total:</th>
                                        <td>${valorNumero(cotizacion?.subtotal)}</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">Descuento:</th>
                                        <td>{cotizacion?.descuento}%</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">Neto:</th>
                                        <td>${valorNumero(cotizacion?.neto)}</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">IVA (19%)</th>
                                        <td>${valorNumero(cotizacion?.iva)}</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">TOTAL:</th>
                                        <td>${valorNumero(cotizacion?.total)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className='pdf__pie-compra pdf__mt-05'>
                        <h2>GENERAR ORDEN DE COMPRA</h2>
                        <div className='pdf__pie-compra-info'>
                            <div className='pdf__pie-compra-campos'>
                                <p><span>RUT: </span>76.546.349-1</p>
                                <p><span>RAZÓN SOCIAL: </span>ALBERTO GARCÍA LÓPEZ, REPARACIONES Y MANTENCIÓN E.I.R.L.</p>
                            </div>
                            <div className='pdf__pie-compra-campos'>
                                <p><span>DIRECCIÓN: </span>NICOLÁS TIRADO No. 150, ANTOFAGASTA</p>
                                <p><span>TELÉFONO: </span>+56 978 950 016</p>
                                <p><span>CORREO: </span>gerencia@impactodelnorte.cl</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pdf__pie-img'>
                    <img src="/img/Cotizacion/LogoEmpresa.jpeg" alt="" />
                    <div></div>
                </div>                

            </div>
            
        </div>
    )
}

export default PDF;
