import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineDownload } from 'react-icons/ai';
import moment from 'moment';
import html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function CertificadoUno({ primero, segundo, tercero, herramienta }) {

    const { id } = useParams();

    let navigate = useNavigate();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const pdfcrear = () => {

        html2pdf()
        .set({
            margin: 0,
            filename: `certificado OTIN ${herramienta?.otin}.pdf`,
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
                    timer: 1500
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
            // redireccionar
            navigate('/ingresos', {replace: true});
        });
    }

    return (
        <div id="usuarioEmpresa">
            <div 
                    id="btnCrearPdf" 
                    className='btn-new btn-login' 
                    onClick={pdfcrear}
                >
                    Descargar Certificado
                    <AiOutlineDownload size={25} />
            </div>
            <div id='pdf'>
                <div className='pdf'>
                    <div className='pdf__titulo'>
                        <h1>CERTIFICADO DE MANTENCIÓN y/o REPARACIÓN DE EQUIPOS</h1>
                        
                        <div className='pdf__titulo-data'>

                            <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                            <h2 className='pdf__titulo-otin'>OTIN {herramienta?.otin}</h2>

                            <div className='pdf__titulo-dueño'>
                                <h2>Fecha Emición {moment(primero?.fechaEmicion).format('DD/MM/YYYY')}</h2>
                            </div>
                        </div>

                        <div className='pdf__titulo-bloque-info'>
                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>Razón Social: </span>{herramienta?.clienteContacto?.clienteEmpresa?.nombre}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Dirección: </span>{herramienta?.clienteContacto?.clienteEmpresa?.direccion}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Contacto: </span>{herramienta?.clienteContacto?.nombre}</p>
                                </div>
                            </div>

                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>Rut: </span>{herramienta?.clienteContacto?.clienteEmpresa?.rut}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Fono: </span>{herramienta?.clienteContacto?.telefono}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>E-mail: </span>{herramienta?.clienteContacto?.correo}</p>
                                </div>                                
                            </div>
                        </div>

                    </div>    
                    
                    <div className='pdf__componente w-96 max-w-10-table'>
                        <div className='pdf__titulo-dueño certificado__subtitulo'>
                            <h2>Equipo a Certificar:</h2>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">N° Serie</th>
                                    <th scope="col">N° Interno</th>
                                    {
                                        primero?.toneladas ?
                                            <th scope="col">Toneladas</th>
                                        :
                                            null
                                    }
                                    {        
                                        primero?.presion ?                        
                                            <th scope="col">Presión de trabajo</th>
                                        :
                                            null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table__tr'>
                                    <td>{herramienta?.nombre}</td>
                                    <td>{herramienta?.marca}</td>
                                    <td>{herramienta?.modelo}</td>
                                    <td>{herramienta?.numeroSerie}</td>
                                    <td>{herramienta?.numeroInterno}</td>
                                    {
                                        primero?.toneladas ?
                                            <td>{primero?.toneladas}</td>
                                        :
                                            null
                                    }
                                    {        
                                        primero?.presion ?                        
                                            <td>{primero?.presion}</td>
                                        :
                                            null
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='pdf__componente w-96'>
                        <div className='pdf__titulo-dueño certificado__subtitulo'>
                            <h2>Instrumento Patron:</h2>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__head'>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Serie</th>
                                    <th scope="col">Unidad</th>
                                    <th scope="col">Fecha de Calibración</th>
                                    <th scope="col">Próxima Calibración</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">Emisor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table__tr'>
                                    <td>PARKER</td>
                                    <td>SCJR 8700-02</td>
                                    <td>Lb-pie</td>
                                    <td>{moment(primero?.fechaCalibracion).format('DD/MM/YYYY')}</td>
                                    <td>{moment(primero?.fechaProximaCalibracion).format('DD/MM/YYYY')}</td>
                                    <td>87000</td>
                                    <td>Impacto del Norte</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    {/* <div className='pdf__pie-compra info__falla__titulo info__certificado w-96'>
                        <h2 className=''>MANTENCIONES O REPARACIONES REALIZADAS</h2>
                        <div className='info__falla'>
                            <p>*  Revisión y evaluación</p>
                            <p>*  Reparación general del equipo</p>                            
                            <p>*  Sustitución de sellos de base y cilindro</p>                            
                            <p>*  Sustitución de aceite y filtro</p>                            
                            <p>*  Sustitución de manómetro</p>                            
                            <p>*  Sustitución de manilla de control de válvula</p>                            
                            <p>*  Mantenimiento preventivo a motor eléctrico</p>                            
                            <p>*  Prueba de funcionamiento correcta, sin fugas hidráulicas</p>                            
                            <p>*  Implementación de señaletica de precaución y tonelaje </p>                            
                            <p>*  Pruebas de carga en banco de prueba alcansando 150 Ton.</p>                            
                        </div>
                    </div>

                    <div className='pdf__pie-compra info__falla__titulo info__certificado w-96'>
                        <h2 className=''>CONCLUSIONES</h2>
                        <div className='info__falla'>
                            <p>Se realiza ensayo de equipo operando correctamente según sus características, alcanzando una presión de trabajo de 10.000 PSI y una variacion de +/- 0,3 %.</p>
                            <p>Se prueba equipo bajo presión de carga, alcanzando una fuerza de elevación nominal máxima de 150 Ton. sin pérdidas de presión.</p>                            
                            <p>Los valores entregados son bajo condiciones normales de operación.</p>                            
                            <p>Se certifica que esta herramienta luego de su intervención, reparación y prueba, se encuentra operando dentro de los rangos de trabajo recomendados por su fabricante para este tipo de equipos, determinándose  "OPERATIVA".</p>                         
                        </div>
                    </div> */}

                    <div className='pdf__pie-compra info__falla__titulo info__certificado w-96'>
                        <h2 className=''>MANTENCIONES O REPARACIONES REALIZADAS</h2>
                        <div className='info__falla'>
                            {
                                segundo?.mantencion ? 
                                    segundo?.mantencion.map( (text, index) => (
                                        <p key={index}>{text}</p>
                                    ))
                                : 
                                    ''
                            }                          
                        </div>
                    </div>

                    <div className='pdf__pie-compra info__falla__titulo info__certificado w-96'>
                        <h2 className=''>CONCLUSIONES</h2>
                        <div className='info__falla'>
                            {
                                segundo?.conclucion ? 
                                    segundo?.conclucion.map( (text, index) => (
                                        <p key={index}>{text}</p>
                                    ))
                                : 
                                    ''
                            }                       
                        </div>
                    </div>

                    {
                        tercero?.operativo ?
                            <div className='certificado__opcion'>
                                <div className='certificado__campo' >
                                    <h3>OPERATIVA</h3>
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
                                    <h3>OPERATIVA</h3>
                                    <h2></h2>
                                </div>
                                <div className='certificado__campo' >
                                    <h3>DAR DE BAJA</h3>
                                    <h2>X</h2>
                                </div>
                            </div>
                    }
                    
                    <h1>Proxima Manteción Recomendada: {moment(tercero?.proximaMantencion).format('DD/MM/YYYY')}</h1>

                    <div className='certificado__firma'>
                        
                        <img src="img/Firma/Firma_Alberto.png" alt="" />

                        <img src="img/Firma/Timbre.png" alt="" />

                    </div>

                    <div className='certificado__certificacion'>

                        <img src="img/Certificado/Iso.jpg" alt="" />
                        <img src="img/Certificado/CE.jpg" alt="" />
                        <img src="img/Certificado/UKAS.jpg" alt="" />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CertificadoUno;