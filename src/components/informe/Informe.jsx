import React, { Fragment, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDownload } from "react-icons/ai";
import html2pdf from "html2pdf.js";
import moment from 'moment';
import Swal from "sweetalert2";

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

import InformeFotoGaleria from './informeFotoGaleria/InformeFotoGaleria';

function Informe({ primero, segundoFotoA, segundoTextoA, segundoFotoB, segundoTextoB, tercero, herramienta, id, fotoGaleria, fotosSeleccion }) {

    let navigate = useNavigate();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const pdfcrear = () => {
        
        html2pdf()
        .set({
            margin: 0,
            filename: `informe OTIN ${herramienta.otin}.pdf`,
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 3, // A mayor escala, mejores gráficos
                letterRendering: true,
                useCORS: true
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
                `informe ${herramienta.otin}.pdf`,
                {type: 'application/pdf'}
            ); 

            const formData = new FormData();        
            formData.append("document", file);
    
            try {

                const res = await clienteAxios.post(`ih/ingreso/informe/${id}`, formData,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });       
                
                Swal.fire({
                    title: 'Ingreso Realizado con Exito',
                    text: res.data.msg,
                    timer: 1500
                })
    
            } catch (error) {
                console.log(error)
                if(error.request.status === 404 ) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Error al guardar el informe',
                        timer: 1500
                    })
                }
                // redireccionar
            }            
            navigate('/ingresos', {replace: true});
        });
    }
    
    return (

        <div id={'usuarioEmpresa'}>

            <div 
                id="btnCrearPdf" 
                className='btn-new btn-login' 
                onClick={pdfcrear}
            >
                Descargar Informe
                <AiOutlineDownload size={25} />
            </div>
           
            <div id='pdf'>
                <div className='informe'>
                    <div className='pdf__titulo'>
                        <h1>Informe técnico y registro fotográfico</h1>
                        
                        <div className='pdf__titulo-data'>

                            <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                            <div className='pdf__titulo-dueño'>
                                <h2>ALBERTO GARCIA LOPEZ</h2>
                                <h2>REPARACIONES Y MANTENCION E.I.R.L</h2>
                                <h2>R.U.T 76.546.349-1</h2>
                            </div>

                            <h2 className='pdf__titulo-otin'>OTIN {herramienta?.otin}</h2>
                        </div>

                        <div className='pdf__titulo-bloque-info'>
                            <div className='pdf__titulo-info'>
                                <div className='pdf__titulo-campo'>
                                    <p><span>CLIENTE: </span>{herramienta?.clienteContacto?.clienteEmpresa?.nombre}</p>
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

                    <div className='pdf__herramienta info__falla-cliente pdf__falla'>
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

                    <div className='pdf__componente info__cuerpo'>

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
        </div>
    )
}

export default Informe;
