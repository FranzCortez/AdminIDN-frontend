import React, { useContext, Fragment } from 'react';
import { AiOutlineDownload } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import moment from "moment";
import Swal from 'sweetalert2';

import PDFMerger from 'pdf-merger-js';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

import InformeFotoGaleria from '../../informe/informeFotoGaleria/InformeFotoGaleria';

function PDF({ contenido, cotizacion, herramientaInfo, cotizacionBackend,
    primero,
    segundoFotoA,
    segundoTextoA,
    segundoFotoB,
    segundoTextoB,
    tercero,
    herramienta,
    id,
    fotoGaleria,
    fotosSeleccion }) {

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const pdfcrear = async () => {

        const merger = new PDFMerger()
        
        let info = '';
        let fotoInfo = '';

        await html2pdf()
        .set({
            margin: 0,
            filename: `1 ${herramientaInfo.otin}.pdf`,
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
        .from(document.querySelector("#infofoto"))
        .toPdf()
        .output('blob')
        .then( async function (pdf) {
            info = pdf;
        }); 

        if (fotoGaleria) {
            await html2pdf()
            .set({
                margin: 0,
                filename: `2 ${herramientaInfo.otin}.pdf`,
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
            .from(document.querySelector("#fotoInfo"))
            .toPdf()
            .output('blob')
            .then( async function (pdf) {
                fotoInfo = pdf;
            }); 
        }

        await html2pdf()
        .set({
            margin: 0,
            filename: `cotizacion OTIN ${herramientaInfo.otin}.pdf`,
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
        .from(document.querySelector("#pdfDescargar"))
        .toPdf()
        .output('blob')
        .then( async function (pdf) {
            
            await merger.add(pdf)
            await merger.add(info)

            if( fotoInfo !== '' ) {
                await merger.add(fotoInfo)
            }

            const mergerPDf = await merger.saveAsBlob();
            const url = URL.createObjectURL(mergerPDf);

            let alink = document.createElement('a');
            alink.href = url;
            alink.download = `cotizacion ${herramientaInfo.otin}.pdf`;
            alink.target = '_blank'
            alink.click();

            const file = new File(
                [mergerPDf],
                `cotizacion ${herramientaInfo.otin}.pdf`,
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
                // navigate('/ingresos', {replace: true});
            }            
        });
    }

    return (
        <div id="usuarioEmpresa">

            <Link 
                to={"/ingresos"}
            >
                <div 
                    id="btnCrearPdf" 
                    className='btn-new btn-login' 
                    onClick={pdfcrear}
                >
                    Descargar Cotización e Informe
                    <AiOutlineDownload size={25} />
                </div>
            </Link>

            <div id='pdfDescargar'>
                
                <div className='pdf'>

                    <div className='pdf__titulo'>
                        <h1>Cotización impacto del norte</h1>
                        
                        <div className='pdf__titulo-data'>

                            <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                            <div className='pdf__titulo-dueño'>
                                <h2>ALBERTO GARCÍA LÓPEZ</h2>
                                <h2>REPARACIONES Y MANTENCION E.I.R.L</h2>
                                <h2>R.U.T 76.546.349-1</h2>
                            </div>

                            <h2 className='pdf__titulo-otin'>OTIN {herramientaInfo?.otin}</h2>
                        </div>

                        <div className='pdf__titulo-bloque-info pdf__titulo-bloque-info-m'>
                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>Empresa: </span>{cotizacion.nombreCliente}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Sucursal: </span>{herramientaInfo?.clienteContacto?.clienteEmpresa?.direccion}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Rut: </span>{herramientaInfo?.clienteContacto?.clienteEmpresa?.rut}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Giro: </span>Venta al por mayor no especializada</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Atención: </span>{herramientaInfo?.clienteContacto?.nombre}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>E-Mail: </span>{herramientaInfo?.clienteContacto?.correo}</p>
                                </div>
                            </div>

                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>FECHA DE INGRESO: </span>{moment(herramientaInfo?.fecha).format('DD/MM/YYYY')}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>GUIA DE DESPACHO: </span>{herramientaInfo?.fechaGuiaDespacho ? moment(herramientaInfo?.fechaGuiaDespacho).format('DD/MM/YYYY') : ''}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>FECHA DE EVALUACION: </span>{moment(cotizacion?.fechaEvaluacion).format('DD/MM/YYYY')}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>FECHA DE COTIZACION: </span>{moment(cotizacion?.fechaCotizacion).format('DD/MM/YYYY')}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>TELEFONO: </span>{herramientaInfo?.clienteContacto?.telefono}</p>
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
                                    <td>{herramientaInfo?.nombre}</td>
                                    <td>{herramientaInfo?.marca}</td>
                                    <td>{herramientaInfo?.modelo}</td>
                                    <td>{herramientaInfo?.numeroSerie ? herramientaInfo?.numeroSerie : ''}</td>
                                    <td>{herramientaInfo?.numeroInterno ? herramientaInfo?.numeroInterno : ''}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='pdf__componente pdf__mt-05'>
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">ITEM</th>
                                    <th scope="col">Nombre Componente</th>
                                    <th scope="col">Descripción Repuesto</th>
                                    <th scope="col">Cant.</th>
                                    <th scope="col">Valor Unit.</th>
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
                    </div>    

                </div>     

            </div>
                
            <div id='infofoto'>

                <div className='informe'>
                    <div className='pdf__titulo'>
                        <h1>Informe técnico y registro fotográfico</h1>
                        
                        <div className='pdf__titulo-data'>

                            <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                            <div className='pdf__titulo-dueño'>
                                <h2>ALBERTO GARCÍA LÓPEZ</h2>
                                <h2>REPARACIONES Y MANTENCION E.I.R.L</h2>
                                <h2>R.U.T 76.546.349-1</h2>
                            </div>

                            <h2 className='pdf__titulo-otin'>OTIN {herramienta?.otin}</h2>
                        </div>

                        <div className='pdf__titulo-bloque-info'>
                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>CLIENTE: </span>{cotizacion.nombreCliente}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>EQUIPO: </span>{herramienta?.nombre}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>MODELO: </span>{herramienta?.modelo}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>FECHA: </span>{moment(primero?.fecha).format('DD/MM/YYYY')}</p>
                                </div>
                            </div>

                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>MARCA DE EQUIPO: </span>{herramienta?.marca}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>N° DE SERIE: </span>{herramienta?.numeroSerie}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>TÉCNICO A CARGO: </span>{primero?.nombre}</p>
                                </div>
                            </div>
                        </div>
                    </div>        

                    <div className='info__herramienta info__falla-cliente pdf__falla'>
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">FALLA INDICADA POR EL CLIENTE O DETECTADA AL INGRESAR LA HERRAMIENTA.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table__tr'>
                                    <td>{primero?.falla}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='info__componente info__cuerpo'>

                        <div className='info__table' >
                            <table className="table table-hover">
                                <thead>
                                    <tr className='table__tr'>
                                        <td>
                                            {
                                                segundoFotoA?.length > 0 ? 
                                                segundoFotoA?.map( (foto, index) => (                                            
                                                    <img className='info__img' src={`data:image/jpeg;base64,${foto}`} alt="" key={index} />
                                                ))
                                                :
                                                <p>No existen imagenes</p>
                                            }
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='table__head'>
                                        <th scope="col" colSpan={3}>{segundoTextoA}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div className='info__table' >
                            <table className="table table-hover">
                                <thead>
                                    <tr className='table__tr'>
                                        <td>
                                            {
                                                segundoFotoB?.length > 0 ? 
                                                segundoFotoB?.map( (foto, index) => (                                            
                                                    <img className='info__img' src={`data:image/jpeg;base64,${foto}`} alt="" key={index} />
                                                ))
                                                :
                                                <p>No existen imagenes</p>
                                            }
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='table__head'>
                                        <th scope="col" colSpan={3}>{segundoTextoB}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    
                    <div className='pdf__pie-compra info__falla__titulo'>
                        <h2 className=''>OBSERVACIONES Y CONDICIONES GENERALES EN LA QUE SE ENCUENTRA EL EQUIPO, Y/O MEJORAS SUGERIDAS</h2>
                        <div className='info__falla min-h-28'>
                            <h4>Equipo presenta las siguientes fallas:</h4>
                            {
                                    tercero?.falla ? 
                                    tercero?.falla.map( (text, index) => (
                                        <p key={index}>{text}</p>
                                    ))
                                : 
                                    ''
                            }
                            
                            {
                                tercero?.conclusion[0] !== '' ? 
                                    tercero?.conclusion[0] !== '' ?
                                        <Fragment>
                                            <h4>CONCLUSIONES GENERALES:</h4>
                                            {
                                                tercero?.conclusion.map( (text, index) => (
                                                    <p key={index}>{text}</p>
                                                ))
                                            }
                                        </Fragment>
                                    :
                                        ''
                                :
                                    ''
                            }

                            {
                                tercero?.recomendacion ? 

                                    tercero?.recomendacion[0] !== '' ? 
                                        <Fragment>
                                            <h4>RECOMENDACIONES  Y/O MEJORAS:</h4>
                                            {
                                                tercero?.recomendacion.map( (text, index) => (
                                                    <p key={index}>{text}</p>
                                                ))
                                            }
                                        </Fragment>
                                    : 
                                        ''
                                :
                                    ''
                            }
                            
                        </div>
                    </div>

                </div> 
            </div>
                
            {
                fotoGaleria ?

                <div>
                    
                    <div className="html2pdf__page-break"></div>
                    <InformeFotoGaleria
                        id={id}
                        fotosSeleccion={fotosSeleccion}
                        otin={herramienta?.otin}
                        fotoGaleria={fotoGaleria}
                    />
                </div>
                :
                null
            }

        </div>
    )
}

export default PDF;