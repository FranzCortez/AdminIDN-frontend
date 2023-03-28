import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDownload } from 'react-icons/ai';
import moment from 'moment';
import html2pdf from 'html2pdf.js';

function BoletaEstadoCuenta({ seleccion }) {    

    const [ vencido, guardarVencido ] = useState([]);
    const [ pendiente, guardarPendiente ] = useState([]);
    const [ vencidoTotal, guardarVencidoTotal ] = useState(0);
    const [ pendienteTotal, guardarPendienteTotal ] = useState(0);
    const [ empresa, guardarEmpresa ] = useState('');

    let hoja = '';

    let navigate = useNavigate();

    const pdfcrear = async () => {
        
        if ( (vencido.length <= 2 && pendiente.length === 0) || (vencido.length === 0 && pendiente.length <= 2) ) {
            hoja = "a5" 
        } else if ( (vencido.length <= 13 && pendiente.length === 0) || (vencido.length === 0 && pendiente.length <= 13) || ( (vencido.length + pendiente.length) <= 10 )){
            hoja =  "a4"
        } else if ((vencido.length <= 24 && pendiente.length === 0) || (vencido.length === 0 && pendiente.length <= 24) || ( (vencido.length + pendiente.length) <= 21 )) {
            hoja = "a3"
        } else {
            hoja = "a2"
        }        

        await html2pdf()
        .set({
            margin: 0,
            filename: `Estado de Cuenta ${empresa}.pdf`,
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
                format: hoja,
                orientation: 'landscape' // landscape o portrait
            }
        })
        .from(document.querySelector("#pdf"))
        .save();

        regresar();
    }

    const regresar = () => {
        navigate(0);
    }

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const analizarDatos = () => {
        
        if ( seleccion.length === 0 ) { 
            return;
        }

        const ven = [];
        const pen = [];
        let venTotal = 0;
        let penTotal = 0;
        let nombre = seleccion[0]?.cliente;
        let cambio = false;

        seleccion.forEach( factura => {

            if ( factura.estado === 'Vencido' ) {
                ven.push(factura);
                venTotal += parseInt(factura.valor.split('.').join(''));
            } else if ( factura.estado === 'Pendiente' ) {
                pen.push(factura);
                penTotal += parseInt(factura.valor.split('.').join(''));
            }

            if ( nombre !== factura.cliente ){
                cambio = true;
            }
        });
        

        guardarEmpresa( cambio ? 'Listado de Facturas' : ven.length === 0 ? pen[0].cliente : ven[0].cliente );
        guardarPendiente(pen);
        guardarVencido(ven);
        guardarPendienteTotal(penTotal);
        guardarVencidoTotal(venTotal);
    }

    useEffect(() => {
        
        analizarDatos();

    }, [seleccion]);

    return (
        <div id="usuarioEmpresa">
            <div 
                    id="btnCrearPdf" 
                    className='btn-new btn-login' 
                    onClick={pdfcrear}
                >
                    Descargar Estado de Cuenta
                    <AiOutlineDownload size={25} />
            </div>
            <div className='btn-new btn-return' onClick={regresar}>
                Regresar a las Facturas
            </div>
            <div id='pdf'>
                <div className='boleta'>
                    <div className='pdf__titulo'>
                        <h1>ESTADO DE CUENTA</h1>

                        <div className='pdf__titulo-data'>

                            <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                            <div className='boleta__fecha'>
                                <h2 className='pdf__titulo-otin'>Fecha Emisión:</h2>
                                <h2 className='pdf__titulo-otin'> {moment(Date.now()).format('DD-MM-YYYY')}</h2>
                            </div>
                        </div>
                    </div>    
                    
                    <div className='pdf__componente w-96 max-w-10-table'>
                        <div className='pdf__titulo-dueño certificado__subtitulo boleta__empresa'>
                            <h2>{empresa}</h2>
                        </div>
                    </div> 

                    {
                        vencido.length > 0 ? 
                            <div className='pdf__componente boleta__componente w-96 max-w-10-table'>
                                <div className='pdf__titulo-dueño certificado__subtitulo boleta__vencida'>
                                    <h2>FACTURAS VENCIDAS</h2>
                                </div>
                                <table className="table table-hover boleta__table">
                                    <thead>
                                        <tr className='table__head'>
                                            <th scope="col">OTIN</th>
                                            <th scope="col">FACTURA</th>
                                            <th scope="col">O.C/G.D</th>
                                            <th scope="col">Fecha Emisión Factura</th>
                                            {
                                                empresa === 'Listado de Facturas' ?
                                                
                                                    <th scope='col'>Cliente</th>
                                                :
                                                    null
                                            }
                                            <th scope="col">Fecha Vencimiento / Días Mora</th>
                                            <th scope="col">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            vencido.map( (vencer, index) => (
                                                <tr className='table__tr boleta__td' key={index}>
                                                    <td>{vencer.otin}</td>
                                                    <td>{vencer.factura}</td>
                                                    <td>{vencer.orden === '' || vencer.orden === '-' ? vencer.despacho : vencer.orden}</td>
                                                    <td>{vencer.fechafactura}</td>
                                                    {
                                                        empresa === 'Listado de Facturas' ?
                                                        
                                                            <td>{vencer.cliente}</td>
                                                        :
                                                            null
                                                    }
                                                    <td>{vencer.fechavencimiento}/<span className='boleta__mora'>{vencer.mora}</span></td>                               
                                                    <td>${valorNumero(parseInt(vencer.valor.split('.').join('')))}</td>                                    
                                                </tr> 
                                            ))
                                        }                               
                                        <tr className='table__tr boleta__total'>
                                            <td colSpan={6} ><span className='boleta__valor-total' >TOTAL:</span></td>
                                            <td><span className='boleta__valor-total'>${valorNumero(vencidoTotal)}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        :
                            null
                    }

                    {
                        pendiente.length > 0 ?
                            <div className='certificado__componente w-96 max-w-10-table'>
                            
                                <div className='pdf__titulo-dueño certificado__subtitulo boleta__vencer'>
                                    <h2>FACTURAS POR VENCER</h2>
                                </div>
                            
                                <table className="table table-hover boleta__table">
                                    <thead>
                                        <tr className='table__head'>
                                            <th scope="col">OTIN</th>
                                            <th scope="col">FACTURA</th>
                                            <th scope="col">O.C/G.D</th>
                                            <th scope="col">Fecha Emisión Factura</th>
                                            {
                                                empresa === 'Listado de Facturas' ?
                                                
                                                    <th scope="col">Cliente</th>
                                                :
                                                    null
                                            }
                                            <th scope="col">Fecha Vencimiento</th>
                                            <th scope="col">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pendiente.map( (pendient, index) => (
                                                <tr className='table__tr boleta__td' key={index}>
                                                    <td>{pendient.otin}</td>
                                                    <td>{pendient.factura}</td>
                                                    <td>{pendient.orden === '' || pendient.orden === '-' ? pendient.despacho : pendient.orden}</td>
                                                    <td>{pendient.fechafactura}</td>
                                                    {
                                                        empresa === 'Listado de Facturas' ?
                                                        
                                                            <td>{pendient.cliente}</td>
                                                        :
                                                            null
                                                    }
                                                    <td>{pendient.fechavencimiento}</td>                                    
                                                    <td>${valorNumero(parseInt(pendient.valor.split('.').join('')))}</td>                                    
                                                </tr> 
                                            ))
                                        }
                                        <tr className='table__tr boleta__total'>
                                            <td colSpan={6} ><span className='boleta__valor-total' >TOTAL:</span></td>
                                            <td><span className='boleta__valor-total'>${valorNumero(pendienteTotal)}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        :
                            null
                    }

                    <div className='pdf__componente w-96 max-w-10-table'>

                        <div className='pdf__pie-info-mantenimiento boleta__datos'>
                            <p>DATOS PARA TRANSFERENCIA:</p>
                            <p>NOMBRE: <span>ALBERTO GARCÍA LÓPEZ, REPARACIONES Y MANTENCION EIRL</span></p>
                            <p>RUT: <span>76.546.349-1</span></p>
                            <p>BANCO BCI - CUENTA CORRIENTE: <span>21785953</span></p>
                            <p>E-MAIL: <span>ADMINISTRACION@IMPACTODELNORTE.CL</span></p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default BoletaEstadoCuenta;