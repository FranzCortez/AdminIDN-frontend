import React from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { TbFileInfo } from "react-icons/tb";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function IngresoInformacion(props) {

    const { ingreso } = props;

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const ConvertStringToHTML = (str) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/html');
        const comen = document.querySelector('#comentario');
        if(comen){
            comen.innerHTML= doc.body.firstElementChild.innerHTML;
        }
    };
    
    return (
        <div>
            <button className='btn-new btn-login' onClick={openModal}><TbFileInfo size={20}/></button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >

                <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
                <h2 className='modal__titulo'>Información Extra de "{props.nombre}"</h2>
                <div className='modal__grid'>

                    <div className='modal__herramienta'>
                        <h2>Sobre la Herramienta:</h2>

                        <p>OTIN: <span>{ingreso?.otin}</span></p>
                        <p>Nombre: <span>{ingreso?.nombre}</span></p>
                        <p>Fecha Ingreso: <span>{ingreso?.fecha}</span></p>
                        <p>Tipo de Herramienta: <span>{ingreso?.tipoHerramientum?.nombre}</span></p>
                        <p>Marca: <span>{ingreso?.marca}</span></p>
                        <p>Modelo: <span>{ingreso?.modelo}</span></p>
                        <p>N° Interno: <span>{ingreso?.numeroInterno}</span></p>
                        <p>N° Serie: <span>{ingreso?.numeroSerie}</span></p>
                        <p>N° Guía Cliente: <span>{ingreso?.numeroGuiaCliente}</span></p>
                    </div>

                    <div className='modal__herramienta'>
                        <h2>Sobre el Cliente:</h2>

                        <p>Nombre Empresa: <span>{ingreso?.clienteContacto?.clienteEmpresa?.nombre}</span></p>
                        <p>Nombre Contacto: <span>{ingreso?.clienteContacto?.nombre}</span></p>
                        <p>Correo Contacto: <span>{ingreso?.clienteContacto?.correo}</span></p>
                        <p>Telefono Contacto: <span>{ingreso?.clienteContacto?.telefono}</span></p>
                    </div>

                    <div>
                    <div className='modal__herramienta'>
                        <h2>Comentarios sobre la Herramienta:</h2>

                        { ingreso.comentario ? ConvertStringToHTML(ingreso.comentario) : null}
                        <div id='comentario'>
                        </div>
                    </div>
                    </div>
                </div>
                
            </Modal>
        </div>
    );
}

export default IngresoInformacion;
