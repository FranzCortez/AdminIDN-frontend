import React, { Fragment } from 'react';
import html2pdf from 'html2pdf.js';

function Cotizar() {
    

    const pdfcrear = () => {
        html2pdf()
        .set({
            margin: 0,
            filename: 'documento.pdf',
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
        .catch(err => console.log(err));
    }

    return (
        <Fragment>
            <div id='pdf' className='pdf'>

                <div className='pdf__titulo'>
                    <h1>Cotización impacto del norte</h1>
                    
                    <div className='pdf__titulo-data'>

                        <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                        <div className='pdf__titulo-dueño'>
                            <h2>ALBERTO GARCIA LOPEZ</h2>
                            <h2>REPARACIONES Y MANTENCION E.I.R.L</h2>
                            <h2>R.U.T 76.546.349-1</h2>
                        </div>

                        <h2 className='pdf__titulo-otin'>OTIN 1235-2022</h2>
                    </div>

                    <div className='pdf__titulo-bloque-info'>
                        <div className='pdf__titulo-info'>
                            <div className='pdf__titulo-campo'>
                                <p><span>Empresa: </span>Importadora Tech LTDA</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>Sucursal: </span>Juan Gutenberg#410, Antofagasta</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>Rut: </span>78.284.760-0</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>Giro: </span>Venta al por mayor no especializada</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>Atencion: </span>Mauricio Olivares</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>E-Mail: </span>molivares@techltda.cl.</p>
                            </div>
                        </div>

                        <div className='pdf__titulo-info'>
                            <div className='pdf__titulo-campo'>
                                <p><span>FECHA DE INGRESO: </span>28-07-2021</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>GUIA DE DESPACHO: </span></p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>FECHA DE EVALUACION: </span>04-07-2021</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>FECHA DE COTIZACION: </span>06-07-2021</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>TELEFONO: </span>569 9346 5906</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pdf__herramienta'>
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
                                <td>Gata neumohidraulica 50-80 ton</td>
                                <td>Jack</td>
                                <td>PD80-2</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='pdf__componente'>
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
                            <tr className='table__tr'>
                                <td className='fontbold' >1</td>
                                <td>Fabricación de sello de poliuretano de alta presión </td>
                                <td></td>   
                                <td>1</td>
                                <td className='fontbold' >$65000</td>
                                <td className='fontbold' >$65000</td>
                            </tr>
                            <tr className='table__tr'>
                                <td className='fontbold' >2</td>
                                <td>Fabricación de sello de poliuretano de alta presión </td>
                                <td></td>   
                                <td>1</td>
                                <td className='fontbold' >$65000</td>
                                <td className='fontbold' >$65000</td>
                            </tr>
                            <tr className='table__tr'>
                                <td className='fontbold' >3</td>
                                <td>Fabricación de sello de poliuretano de alta presión </td>
                                <td></td>   
                                <td>1</td>
                                <td className='fontbold' >$65000</td>
                                <td className='fontbold' >$65000</td>
                            </tr>
                            <tr className='table__tr'>
                                <td className='fontbold' >4</td>
                                <td>Fabricación de sello de poliuretano de alta presión </td>
                                <td></td>   
                                <td>1</td>
                                <td className='fontbold' >$65000</td>
                                <td className='fontbold' >$65000</td>
                            </tr>
                            <tr className='table__tr'>
                                <td className='fontbold' >5</td>
                                <td>Fabricación de sello de poliuretano de alta presión </td>
                                <td></td>   
                                <td>1</td>
                                <td className='fontbold' >$65000</td>
                                <td className='fontbold' >$65000</td>
                            </tr>
                            <tr className='table__tr'>
                                <td className='fontbold' >6</td>
                                <td>Fabricación de sello de poliuretano de alta presión </td>
                                <td></td>   
                                <td>1</td>
                                <td className='fontbold' >$65000</td>
                                <td className='fontbold' >$65000</td>
                            </tr>
                            <tr className='table__tr'>
                                <td className='fontbold' >7</td>
                                <td>Fabricación de sello de poliuretano de alta presión </td>
                                <td></td>   
                                <td>1</td>
                                <td className='fontbold' >$65000</td>
                                <td className='fontbold' >$65000</td>
                            </tr>
                            <tr className='table__tr'>
                                <td className='fontbold' >8</td>
                                <td>Fabricación de sello de poliuretano de alta presión </td>
                                <td></td>   
                                <td>1</td>
                                <td className='fontbold' >$65000</td>
                                <td className='fontbold' >$65000</td>
                            </tr>
                            <tr className='table__tr'>
                                <td className='fontbold' >9</td>
                                <td>Fabricación de sello de poliuretano de alta presión </td>
                                <td></td>   
                                <td>1</td>
                                <td className='fontbold' >$65000</td>
                                <td className='fontbold' >$65000</td>
                            </tr>
                            <tr className='table__tr'>
                                <td className='fontbold' >10</td>
                                <td>Fabricación de sello de poliuretano de alta presión </td>
                                <td></td>   
                                <td>1</td>
                                <td className='fontbold' >$65000</td>
                                <td className='fontbold' >$65000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='pdf__pie'>
                    <div className='pdf__pie-valor'>

                        <div className='pdf__pie-info'>
                            <div className='pdf__pie-info-mantenimiento'>
                                <p>CONDICIONES: <span>VALIDEZ DEL PRESUPUESTO ES DE 15 DÍAS.</span></p>
                                <p>PLAZO DE ENTREGA: <span>Inmediata, recibida la o/c</span></p>
                                <p>GARANTÍA DE 3 MESES, SÓLO DE COMPONENTES CAMBIADOS O REPARADOS.</p>
                            </div>
                        </div>

                        <div className='pdf__pie-final'>
                            <table className="table table-hover">                                
                                <tbody>
                                    <tr className='table__tr'>
                                        <th scope="col">Sub-Total:</th>
                                        <td>$202.000</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">Descuento:</th>
                                        <td>10%</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">Neto:</th>
                                        <td>$181.000</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">IVA (19%)</th>
                                        <td>$34.542</td>
                                    </tr>
                                    <tr className='table__tr'>
                                        <th scope="col">TOTAL:</th>
                                        <td>$216.345</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className='pdf__pie-compra'>
                        <h2>GENERAR ORDEN DE COMPRA</h2>
                        <div className='pdf__pie-compra-info'>
                            <div className='pdf__pie-compra-campos'>
                                <p><span>RUT: </span>76.546.349-1</p>
                                <p><span>RAZÓN SOCIAL: </span>ALBERTO GARCÍA LÓPEZ, REPARACIONES Y MANTENCIÓN E.I.R.L.</p>
                            </div>
                            <div className='pdf__pie-compra-campos'>
                                <p><span>DIRECCIÓN: </span>NICOLÁS TIRADO No. 150, ANTOFAGASTA</p>
                                <p><span>TELÉFONO: </span>+56978950016</p>
                                <p><span>CORREO: </span>impactodelnorte@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pdf__pie-img'>
                    <img src="/img/Cotizacion/LogoEmpresa.png" alt="" />
                    <div></div>
                </div>

            </div>
            <button id="btnCrearPdf" onClick={pdfcrear}>Click aquí</button>
        </Fragment>
    )
}

export default Cotizar;
