import React, { useState } from 'react';
import { AiOutlineClose  } from "react-icons/ai";
import { RiInformationLine } from "react-icons/ri";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function SolicitudDescripcion({ id, titulo, descripcion }) {
    
    const [modalIsOpen, setIsOpen] = useState(false);


    function openModal() {
        if(id) {
            setIsOpen(true);        
        }
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div>
        
        <button className='btn-new btn-login' onClick={openModal}><RiInformationLine size={23} color="#fff"/></button>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
            contentLabel="Example Modal"
            overlayClassName="Overlay"
        >

            <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
            <h1 className='modal__titulo'>Solicitud: {id}</h1>

            <div className='modal__opcion'>

                <div className='modal__herramienta modal__opciones'>

                    <h2 className='modal__titulo'>Titulo:</h2>
                    
                    <h3 className='modal__titulo'>{titulo}</h3>

                    <h2 className='modal__titulo'>Descripción:</h2>
                    
                    <textarea name="" id="" cols="30" rows="10" value={descripcion} style={{ margin: '0 auto', width: '80%', display: 'flex' }} ></textarea>

                </div>

                
            </div>

            <div className='modal__grid'>
                
            </div>
            
        </Modal>

        </div>
    )
}

export default SolicitudDescripcion;
