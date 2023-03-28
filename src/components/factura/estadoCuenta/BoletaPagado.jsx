import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDownload } from 'react-icons/ai';
import moment from 'moment';
import html2pdf from 'html2pdf.js';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';
import Swal from 'sweetalert2';

function BoletaPagado({ pagado }) {

    const [ total, guardarTotal ] = useState(0);
    const [ pagar, guardarPagar ] = useState([]);

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let hoja = '';
    let navigate = useNavigate();

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const obtenerTotal = () => {
        console.log(pagado)
        let suma = 0;
        const id = [];

        pagado.forEach(boleta => {
            
            suma += parseInt(boleta?.valor);
            id.push(boleta.id);
        });
        console.log(id)
        console.log(suma)
        guardarPagar(id);
        guardarTotal(suma);

    }
    
    const pdfcrear = async () => {

        await guardarPagadas();
        
        if ( (pagado.length <= 2 ) ) {
            hoja = "a5" 
        } else if ( (pagado.length <= 13) ){
            hoja =  "a4"
        } else if ((pagado.length <= 24 )) {
            hoja = "a3"
        } else {
            hoja = "a2"
        }        

        await html2pdf()
        .set({
            margin: 0,
            filename: `Recepción de Pago de ${pagado[0].cliente}.pdf`,
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
        .from(document.querySelector("#pagado"))
        .save();

        regresar();
    }

    const regresar = () => {
        navigate(0);
    }

    const guardarPagadas = async () => {

        try {

            const res = await clienteAxios.post(`factura/boleta/pago`, pagar, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                title: 'Recepción de Pago',
                text: res.data.msg,
                type: 'success',
                timer: 2500
            });
            
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.msg,
                timer: 3500
            })
        }

    }

    useEffect(() => {
        obtenerTotal();
    }, [pagado]);

    return (
        <div className='dn' >
            <div 
                    id="btnCrearPdf" 
                    className='btn-new btn-login' 
                    onClick={pdfcrear}
                >
                    Descargar Recepción de Pago
                    <AiOutlineDownload size={25} />
            </div>
            <div className='btn-new btn-return' onClick={regresar}>
                Regresar a las Facturas
            </div>
            <div id='pagado'>
                <div className='boleta'>
                    <div className='pdf__titulo'>
                        <h1>RECEPCIÓN DE PAGO DE FACTURAS</h1>

                        <div className='pdf__titulo-data'>

                            <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                            <div className='boleta__fecha'>
                                <h2 className='pdf__titulo-otin'>Fecha Emisión:</h2>
                                <h2 className='pdf__titulo-otin'> {moment(Date.now()).format('DD-MM-YYYY')}</h2>
                            </div>
                        </div>
                    </div>    

                    <div className='pdf__componente boleta__componente w-96 max-w-10-table'>
                        {/* <div className='pdf__titulo-dueño certificado__subtitulo boleta__vencida'>
                            <h2>FACTURAS VENCIDAS</h2>
                        </div> */}
                        <table className="table table-hover boleta__table">
                            <thead>
                                <tr className='table__head table__pagado'>
                                    <th scope="col">Factura N°</th>
                                    <th scope="col">Fecha Pago</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                    pagado.map( boleta => (
                                        <tr className='table__tr boleta__td'>
                                            <td>{boleta?.factura}</td>
                                            <td>{boleta?.fechapago}</td>
                                            <td>{boleta?.cliente}</td>            
                                            <td>${valorNumero(parseInt(boleta?.valor.split('.').join('')))}</td>                                    
                                        </tr>
                                    ))
                                }
                                                             
                                <tr className='table__tr boleta__total'>
                                    <td colSpan={3} ><span className='boleta__valor-total' >TOTAL DE TRANSFERENCIA:</span></td>
                                    <td><span className='boleta__valor-total'>${valorNumero(total)}</span></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BoletaPagado;
