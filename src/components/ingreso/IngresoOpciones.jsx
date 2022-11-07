import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineDownload } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { MdOutlineRequestQuote, MdPhotoCamera } from "react-icons/md";
import Modal from 'react-modal';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

Modal.setAppElement('#root');

function IngresoOpciones({ ingreso }) {
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [ ruta, guardarRuta ] = useState("");

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);    

    function openModal() {
        setIsOpen(true);        
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
            
            guardarRuta(res.data?.archivo ? res.data.archivo : null);

        } catch (error) {
            console.log(error)
        }
    }
 
    const download = () => {

        let alink = document.createElement('a');
        alink.href = process.env.REACT_APP_BACKEND_URL_PUBLIC + ruta;
        alink.download = 'cot.pdf';
        alink.target = '_blank'
        alink.click();
    }

    useEffect(() =>{
        if ( ingreso.id ) {
            consultarAPI();
        }
    })

    return (
        <div>
        
        <button className='btn-new btn-return' onClick={openModal}><FiSettings size={20}/></button>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
            contentLabel="Example Modal"
            overlayClassName="Overlay"
        >

            <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
            <h1 className='modal__titulo'>Opciones</h1>
            <div className=''>

                <div className='modal__herramienta modal__opciones'>

                    <h2 className='modal__titulo'>Foto Galería</h2>
                    
                    <Link to={``} className="btn-new btn-login">
                        <MdPhotoCamera size={25}/> Ver Foto Galería
                    </Link>

                    {/* <Link to={``} className="btn-new btn-return">
                        <FiEdit size={25}/> Editar Ingreso
                    </Link> */}
                </div>

                <div className='modal__herramienta modal__opciones'>

                    <h2 className='modal__titulo'>Cotización</h2>

                    <Link to={`/cotizacion/nuevo/${ingreso.id}`} className="btn-new btn-success-new">
                        <MdOutlineRequestQuote size={25}/> Generar Cotización
                    </Link>

                    <div onClick={ ruta ? download : null} className={ ruta ? "btn-new btn-login" : "btn-new"}>
                        <AiOutlineDownload size={25}/> Descargar Cotización
                    </div>
                    
                </div>

                <div>
                    <div className='modal__herramienta'>
                        
                    </div>
                </div>
            </div>

            <div className='modal__grid'>
                
            </div>
            
        </Modal>

        </div>
    )
}

export default IngresoOpciones;
