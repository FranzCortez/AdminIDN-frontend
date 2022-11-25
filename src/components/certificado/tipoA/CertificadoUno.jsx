import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

function CertificadoUno() {

    const pdfcrear = () => {

        html2pdf()
        .set({
            margin: 0,
            filename: `certificado OTIN PRUEBA.pdf`,
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

            // const file = new File(
            //     [pdf],
            //     `cotizacion ${herramienta.otin}.pdf`,
            //     {type: 'application/pdf'}
            // ); 

            // const formData = new FormData();        
            // formData.append("document", file);
            // formData.append("data", JSON.stringify(cotizacionBackend))
    
            // try {

            //     const res = await clienteAxios.post(`ih/ingreso/pdf`, formData,{
            //         headers: {
            //             Authorization: `Bearer ${auth.token}`
            //         }
            //     });       
                
            //     Swal.fire({
            //         title: 'Cotización Realizada con Exito',
            //         text: res.data.msg,
            //         timer: 1500
            //     })
    
            // } catch (error) {
            //     console.log(error)
            //     if(error.request.status === 404 ) {
            //         Swal.fire({
            //             type: 'error',
            //             title: 'Hubo un error',
            //             text: 'Error al guardar la cotización',
            //             timer: 1500
            //         })
            //     }
            //     // redireccionar
            //     navigate('/ingresos', {replace: true});
            // }            
        });
    }

    return (
        <div>
            <div 
                    id="btnCrearPdf" 
                    className='btn-new btn-login' 
                    onClick={pdfcrear}
                >
                    Descargar 
                    {/* <AiOutlineDownload size={25} /> */}
            </div>
            <div id='pdf'>
                <div className='pdf'>
                    <div className='pdf__titulo'>
                        <h1>CERTIFICADO DE MANTENCIÓN y/o REPARACIÓN DE EQUIPOS</h1>
                        
                        <div className='pdf__titulo-data'>

                            <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                            <h2 className='pdf__titulo-otin'>OTIN 2215-2022{}</h2>

                            <div className='pdf__titulo-dueño'>
                                <h2>Fecha Emición 23-11-2022</h2>
                            </div>
                        </div>

                        <div className='pdf__titulo-bloque-info'>
                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>Razón Social: </span>{}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Dirección: </span>{}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Contacto: </span>{}</p>
                                </div>
                            </div>

                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>Rut: </span>{}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>Fono: </span>{}</p>
                                </div>

                                <div className='pdf__titulo-campo'>
                                    <p><span>E-mail: </span>{}</p>
                                </div>                                
                            </div>
                        </div>

                    </div>    
                    
                    <div className='pdf__componente w-96'>
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
                                    <th scope="col">Toneladas</th>
                                    <th scope="col">Presión de trabajo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table__tr'>
                                    <td>LLAVE DE TORQUE HIDRÁULICA</td>
                                    <td>HYTORCASDSAD</td>
                                    <td>HY-10MXT</td>
                                    <td>M10WB2014-097</td>
                                    <td>N/A</td>
                                    <td>150</td>
                                    <td>10000 PSI</td>
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
                                    <td>JUNIO 01 del 2022</td>
                                    <td>01 JUNIO 2023</td>
                                    <td>87000</td>
                                    <td>Impacto del Norte</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className='pdf__pie-compra info__falla__titulo info__certificado w-96'>
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
                    </div>

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
                    
                    <h1>Proxima Manteción Recomendada: 23-11-2022</h1>

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