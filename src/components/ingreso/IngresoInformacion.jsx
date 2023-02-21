import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TbFileInfo } from "react-icons/tb";
import moment from 'moment';
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

    
    return (
        <div>
            <button className='btn-new btn-naranja' onClick={openModal}><TbFileInfo size={20}/></button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >

                <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
                <h1 className='modal__titulo'>Información Extra de "{props.nombre}"</h1>
                <div className='modal__grid'>

                    <div className='modal__herramienta'>
                        <h2>Sobre la Herramienta:</h2>

                        <p>OTIN: <span>{ingreso?.otin}</span></p>
                        <p>Nombre: <span>{ingreso?.nombre}</span></p>
                        <p>Fecha Ingreso: <span>{moment(ingreso?.fecha).format('DD/MM/YYYY')}</span></p>
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
                        <p>Teléfono Contacto: <span>{ingreso?.clienteContacto?.telefono}</span></p>
                    </div>

                    <div>
                        <div className='modal__herramienta'>
                            <h2>Comentarios sobre la Herramienta:</h2>

                            { ingreso.comentario ? ingreso.comentario : null}
                            <div id='comentario'>
                            </div>
                        </div>
                    </div>
                </div>

                <Link to={`editar/${ingreso.id}`} className="btn-new btn-return">
                    <FiEdit size={25}/> Editar Ingreso
                </Link>
            </Modal>
        </div>
    );
}

export default IngresoInformacion;
