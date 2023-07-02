import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineDownload } from 'react-icons/ai';
import html2pdf from 'html2pdf.js';
import moment from 'moment';
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function CertificadoDos({ primero, segundo, tercero, herramienta }) {

    const { id } = useParams();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);
    
    let navigate = useNavigate();

    let entre = 0;

    const pdfcrear = () => {

        if( entre > 0) {
            return;
        }
        
        entre = 1;

        html2pdf()
        .set({
            margin: 0,
            filename: `Certificado Calibración OTIN ${herramienta?.otin}.pdf`,
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
                `certificado ${herramienta?.otin}.pdf`,
                {type: 'application/pdf'}
            ); 

            const formData = new FormData();        
            formData.append("document", file);
    
            try {

                const res = await clienteAxios.post(`ih/ingreso/certificado/${id}`, formData,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });       
                
                Swal.fire({
                    title: 'Certificado Realizado con Exito',
                    text: res.data.msg,
                    showDenyButton: true,
                    confirmButtonText: 'Regresar a Ingresos',
                    denyButtonText: `Quedarme para Editar`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      // redireccionar
                      navigate('/ingresos', {replace: true});
                    }
                })
    
            } catch (error) {
                console.log(error)
                if(error.request.status === 404 ) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Error al guardar el certificado',
                        timer: 1500
                    })
                }
            }
        });
    }

    const desviacionCalculo = (index, estado) => {
        
        if ( estado ) {

            return (segundo?.entregaFinal[index]?.numero - segundo?.comparacionFinal[index]?.numero).toFixed(1);                

        }
        
        return (segundo?.llegadaFinal[index]?.numero - segundo?.comparacionFinal[index]?.numero).toFixed(1);
    }

    const porcentajeDesviacion = (index, estado) => {
        
        const res = ((desviacionCalculo(index, estado) * 100) / segundo?.comparacionFinal[index]?.numero).toFixed(1);

        return isNaN(res) ? null : res;

    }

    const regresar = () => {
        document.querySelector(".card").style.display = "block";
        document.querySelector("#usuarioEmpresa").style.display = "none"; 
    }

    return (
        <div id='usuarioEmpresa'>

            <div className='btn-new btn-return' onClick={regresar}>
                Regresar a Editar los Datos
            </div>

            <div 
                    id="btnCrearPdf" 
                    className='btn-new btn-login' 
                    onClick={pdfcrear}
                >
                    Descargar 
                    <AiOutlineDownload size={25} />
            </div>

            <div id='pdf'>
                <div className='pdf certificado'>
                    <div className='pdf__titulo'>
                        <h1>CERTIFICADO calibración</h1>
                        
                        <div className='pdf__titulo-data'>

                            <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                            <h2 className='pdf__titulo-otin'>OTIN {herramienta?.otin}</h2>

                            <div className='pdf__titulo-dueño'>
                                <h2>Fecha Emisión {moment(primero?.fechaEmicion).format('DD-MM-YYYY')}</h2>
                            </div>
                        </div>

                        <div className='pdf__titulo-bloque-info'>
                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>Cliente: </span>{herramienta?.clienteContacto?.clienteEmpresa?.nombre}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Instrumento a Comparar: </span>{herramienta?.nombre}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>N° de serie: </span>{herramienta?.numeroSerie}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Marca: </span>{herramienta?.marca}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Unidad: </span>{primero?.unidad}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Rango: </span>{primero?.rango}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Resolución: </span>{primero?.resolucion}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>N° de Informe: </span>{herramienta?.otin}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Fecha de Comparación: </span>{moment(primero?.fechaComparacion).format('DD-MM-YYYY')}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Próxima Calibración: </span>{moment(primero?.proximaMantencion).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>

                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>Instrumento Patrón: </span>{primero?.patron}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>N° de Serie: </span>{primero?.numeroSeriePatron}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Marca: </span>{primero?.marcaPatron}</p>
                                </div>                                

                                <div className='pdf__titulo-campo'>
                                    <p><span>Modelo: </span>{primero?.modeloPatron}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Unidad: </span>{primero?.unidadPatron}</p>
                                </div>    

                                <div className='pdf__titulo-campo'>
                                    <p><span>Rango: </span>{primero?.rangoPatron}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Resolución: </span>{primero?.resolucionPatron}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Fecha de Calibración: </span>{moment(primero?.fechaCalibracionPatron).format('DD-MM-YYYY')}</p>
                                </div>                                
                            </div>
                        </div>
                    </div>   
                
                    <div className='certificado__componente w-96 mt-1'>
                        <div className='pdf__titulo-dueño certificado__subtitulo certificado__titulo'>
                            <h2>Condiciones De Recepción Del Instrumento:</h2>
                        </div>
                        <table className="table table-hover certificado__table">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Rango</th>
                                    <th scope="col">Lectura de Patrón</th>
                                    <th scope="col">Lectura de Instrumento</th>
                                    <th scope="col">Desviación</th>
                                    <th scope="col">Porcentaje de Desviación</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table__tr'>
                                    <td className='certificado__tabla-rango' >{primero?.rango} {primero?.unidad}</td>
                                    <td>
                                        <p className='pdf__tabla__titulo' >Ascendente</p>
                                        {
                                            segundo?.llegadaFinal?.length > 0 ?
                                                segundo.llegadaFinal.map( (data, index) => (
                                                    <p className='certificado__tabla-data' key={index} >{data.numero}</p>
                                                ))
                                            :
                                                null
                                        }
                                    </td>
                                    <td>
                                        <p className='pdf__tabla__titulo' >Ascendente</p>
                                        {
                                            segundo?.comparacionFinal?.length > 0 ?
                                                segundo.comparacionFinal.map( (data, index) => (
                                                    <p className='certificado__tabla-data' key={index} >{data.numero}</p>
                                                ))
                                            :
                                                null
                                        }
                                    </td>
                                    <td>
                                        <p className='certificado__invisible' >aaa</p>
                                        {
                                            (segundo?.comparacionFinal?.length === segundo?.llegadaFinal?.length) && segundo?.llegadaFinal?.length > 0 ? 

                                            segundo.comparacionFinal.map((data, index) => (
                                                    <p className='certificado__tabla-data' key={index} >{desviacionCalculo(index, false)}</p>
                                                ))
                                            :
                                                null
                                        }
                                    </td>
                                    <td>
                                        <p className='certificado__invisible' >aaa</p>
                                        {
                                            (segundo?.comparacionFinal?.length === segundo?.llegadaFinal?.length) && segundo?.llegadaFinal?.length > 0 ? 

                                            segundo.comparacionFinal.map((data, index) => (
                                                    <p className='certificado__tabla-data' key={index} >{porcentajeDesviacion(index, false)}</p>
                                                ))
                                            :
                                                null
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='certificado__componente w-96 mt-1'>
                        <div className='pdf__titulo-dueño certificado__subtitulo certificado__titulo'>
                            <h2>Condiciones De Entrega Del Instrumento:</h2>
                        </div>
                        <table className="table table-hover certificado__table">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Rango</th>
                                    <th scope="col">Lectura de Patrón</th>
                                    <th scope="col">Lectura de Instrumento</th>
                                    <th scope="col">Desviación</th>
                                    <th scope="col">Porcentaje de Desviación</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table__tr'>
                                    <td className='certificado__tabla-rango' >{primero?.rango} {primero?.unidad}</td>
                                    <td>
                                        <p className='pdf__tabla__titulo' >Ascendente</p>
                                        {
                                            segundo?.entregaFinal?.length > 0 ?
                                                segundo.entregaFinal.map( (data, index) => (
                                                    <p className='certificado__tabla-data' key={index} >{data.numero}</p>
                                                ))
                                            :
                                                null
                                        }
                                    </td>
                                    <td>
                                        <p className='pdf__tabla__titulo' >Ascendente</p>
                                        {
                                            segundo?.comparacionFinal?.length > 0 ?
                                                segundo.comparacionFinal.map( (data, index) => (
                                                    <p className='certificado__tabla-data' key={index} >{data.numero}</p>
                                                ))
                                            :
                                                null
                                        }
                                    </td>
                                    <td>
                                        <p className='certificado__invisible' >aaa</p>
                                        {
                                            (segundo?.comparacionFinal?.length === segundo?.entregaFinal?.length) && segundo?.entregaFinal?.length > 0 ? 

                                            segundo.comparacionFinal.map((data, index) => (
                                                    <p className='certificado__tabla-data' key={index} >{desviacionCalculo(index, true)}</p>
                                                ))
                                            :
                                                null
                                        }
                                    </td>
                                    <td>
                                        <p className='certificado__invisible' >aaa</p>
                                        {
                                            (segundo?.comparacionFinal?.length === segundo?.entregaFinal?.length) && segundo?.entregaFinal?.length > 0 ? 

                                            segundo.comparacionFinal.map((data, index) => (
                                                    <p className='certificado__tabla-data' key={index} >{porcentajeDesviacion(index, true)}</p>
                                                ))
                                            :
                                                null
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className='certificado__tolerancia' >Tolerancia del Equipo en Comparación = ± 5%</p>

                    <div className='pdf__pie-compra info__falla__titulo info__certificado w-96 mt-1 certificado__obs'>
                        <h2 className=''>Observaciones</h2>
                        <div className='info__falla'>
                            {
                                tercero?.observaciones ? 
                                    tercero?.observaciones.map( (text, index) => (
                                        <p key={index}>{text}</p>
                                    ))
                                : 
                                    ''
                            }
                            {
                                tercero?.rojo ? 
                                    <p>{tercero?.rojo}</p>
                                    
                                : 
                                    ''
                            }           
                            <p>NOTA:</p>                 
                            {
                                tercero?.nota ? 
                                    tercero?.nota.map( (text, index) => (
                                        <p key={index}>{text}</p>
                                    ))
                                : 
                                    ''
                            }         
                        </div>
                    </div>

                    {
                        tercero?.operativo === 'true' ?
                            <div className='certificado__opcion'>
                                <div className='certificado__campo' >
                                    <h3>OPERATIVO</h3>
                                    <h2>X</h2>
                                </div>
                                <div className='certificado__campo' >
                                    <h3>DAR DE BAJA</h3>
                                    <h2></h2>
                                </div>
                            </div>
                        :
                            <div className='certificado__opcion'>
                                <div className='certificado__campo' >
                                    <h3>OPERATIVO</h3>
                                    <h2></h2>
                                </div>
                                <div className='certificado__campo' >
                                    <h3>DAR DE BAJA</h3>
                                    <h2>X</h2>
                                </div>
                            </div>
                    }

                    <div className='certificado__firma certificado__tipob'>
                        
                        <img src="img/Firma/Firma_Alberto.png" alt="" />

                        <img src="img/Firma/Timbre.png" alt="" />

                    </div>

                    <div className='certificado__certificacion certificado__certificacion__tipob'>

                        <img src="img/Certificado/CE.jpg" alt="" />
                        <img src="img/Certificado/UKAS.jpg" alt="" />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CertificadoDos;