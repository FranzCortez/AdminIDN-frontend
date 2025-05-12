import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineDownload, AiFillPicture } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaIdCardAlt } from "react-icons/fa";
import { TbFileCertificate } from 'react-icons/tb';
import { MdOutlineRequestQuote, MdPhotoCamera } from "react-icons/md";
import Modal from 'react-modal';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

Modal.setAppElement('#root');

function IngresoOpciones({ ingreso }) {
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [ rutaCotizacion, guardarRutaCotizacion ] = useState("");
    const [ rutaInforme, guardarRutaInforme ] = useState("");
    const [ rutaCertificado, guardarRutaCertificado ] = useState("");

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);    

    function openModal() {
        if(ingreso.id) {

            consultarAPI();
            setIsOpen(true);        
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    const consultarAPI = async () => {
        
        try {

            const res = await clienteAxios.get(`ih/ingreso/pdf/${ingreso.id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarRutaCotizacion(res.data?.rutaCotizacion ? res.data.rutaCotizacion : null);

            const resInfo = await clienteAxios.get(`ih/ingreso/informe/${ingreso.id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }); 
            
            guardarRutaInforme(resInfo.data?.rutaInforme ? resInfo.data.rutaInforme : null);

            const resCer = await clienteAxios.get(`ih/ingreso/certificado/${ingreso.id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }); 

            guardarRutaCertificado(resCer.data?.rutaCertificado ? resCer.data.rutaCertificado : null)

        } catch (error) {
            console.log(error)
        }
    }
 
    const download = (ruta) => {

        if( !ruta ) {
            return;
        }

        let alink = document.createElement('a');
        alink.href = process.env.REACT_APP_BACKEND_URL_PUBLIC + ruta;
        alink.download = 'cot.pdf';
        alink.target = '_blank'
        alink.click();
    }

    return (
        <div>
        
        <button className='btn-new btn-login' onClick={openModal}><FiSettings size={20}/></button>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
            contentLabel="Example Modal"
            overlayClassName="Overlay"
        >

            <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
            <h1 className='modal__titulo'>Opciones</h1>
            <h2 className='modal__subtitulo'>Baje para ver más opciones</h2>

            <div className='modal__opcion'>

                <div className='modal__herramienta modal__opciones'>

                    <h2 className='modal__titulo'>Foto Galería</h2>
                    
                    <Link to={`/fotogaleria/nuevo/${ingreso.id}`} className="btn-new btn-success-new">
                        <MdPhotoCamera size={25}/> Subir Fotos
                    </Link>

                    <Link to={`/fotogaleria/${ingreso.id}`} className="btn-new btn-login">
                        <AiFillPicture size={25}/> Ver Foto Galería
                    </Link>

                    <Link to={`/fotogaleria/eliminar/${ingreso.id}`} type="button" className="btn-new btn-error">
                        <RiDeleteBin2Line size={25}/> Seleccionar y Eliminar Foto
                    </Link>

                </div>

                <Fragment>
                    <div className='modal__herramienta modal__opciones'>

                        <h2 className='modal__titulo'>Salida de Herramienta</h2>

                        <Link to={`/doc/checklist/form/${ingreso.id}`} className={ ingreso.archivoSalida ? "btn-new btn-success-new" : "btn-new btn-success-new"}>
                            <MdOutlineRequestQuote size={25}/> Generar Checklist de Salida
                        </Link>

                        <div onClick={() => download(ingreso.archivoSalida)} className={ ingreso.archivoSalida ? "btn-new btn-login" : "btn-new"}>
                            <AiOutlineDownload size={25}/> Descargar Checklist de Salida
                        </div>

                    </div>
                </Fragment>

                {
                    auth.tipo === 1 ?

                    <Fragment>
                        <div className='modal__herramienta modal__opciones'>

                            <h2 className='modal__titulo'>Cotización e Informe</h2>

                            <Link to={`/cotizacion/nuevo/${ingreso.id}`} className="btn-new btn-success-new">
                                <MdOutlineRequestQuote size={25}/> Generar Cotización e Informe
                            </Link>

                            <div onClick={() => download(rutaCotizacion)} className={ rutaCotizacion ? "btn-new btn-login" : "btn-new"}>
                                <AiOutlineDownload size={25}/> Descargar Cotización e Informe
                            </div>

                        </div>
                    </Fragment>
                    
                :
                    null
                }
           
                <Fragment>

                    <div className='modal__herramienta modal__opciones'>

                        <h2 className='modal__titulo'>Tarjetas</h2>

                        <Link to={`/tarjeta/${ingreso.otin}`} className="btn-new btn-success-new">
                            <FaIdCardAlt  size={25}/> Tarjeta de Ingreso
                        </Link>

                        <Link to={`/tarjeta/egreso/${ingreso.otin}`} className="btn-new btn-success-new">
                            <FaIdCardAlt  size={25}/> Tarjeta de Egreso
                        </Link>

                    </div>
                </Fragment>
                {
                    auth.tipo === 1 ?
                    <Fragment>
                        <div className='modal__herramienta modal__opciones'>

                            <h2 className='modal__titulo'>Certificado</h2>

                            <div className='opciones__certificado'>
                                <Link to={`/certificado/tipoa/nuevo/${ingreso.id}`} className="btn-new btn-success-new" >
                                    <TbFileCertificate size={25}/> Generar Certificado Mantención
                                </Link>

                                <Link to={`/certificado/tipob/nuevo/${ingreso.id}`} className="btn-new btn-success-new" >
                                    <TbFileCertificate size={25}/> Generar Certificado Calibración
                                </Link>
                            </div>

                            <div onClick={() => download(rutaCertificado)} className={ rutaCertificado ? "btn-new btn-login" : "btn-new"}>
                                <AiOutlineDownload size={25}/> Descargar Certificado
                            </div>

                        </div>
                    </Fragment>
                    :
                    null
                }
            </div>

            <div className='modal__grid'>
                
            </div>
            
        </Modal>

        </div>
    )
}

export default IngresoOpciones;
