import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineDollarCircle } from "react-icons/ai";
import { BsBoxArrowInRight } from "react-icons/bs";
import { TbFileInfo } from "react-icons/tb";
import moment from 'moment';
import Modal from 'react-modal';
import { Fragment } from 'react';

Modal.setAppElement('#root');

function InfoOtines({ infoOtines, otines }) {

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className='center-btn-factura' >
            <button className='btn-new btn-factura' onClick={openModal}>
                <p className='ingreso__gd'>
                    {otines}
                </p>
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >

                <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
                <h1 className='modal__titulo'>Información Extra Otin(es)</h1>
                <h1 className='modal__subtitulo'>Baje para ver mas información</h1>

                <div className='modal__scroll'>
                    <div className='modal__herramienta'>
                        <h2>Sobre el Cliente:</h2>

                        <p>Nombre Empresa: <span>{infoOtines[0]?.clienteContacto?.clienteEmpresa?.nombre}</span></p>
                        <p>Nombre Contacto: <span>{infoOtines[0]?.clienteContacto?.nombre}</span></p>
                        <p>Correo Contacto: <span>{infoOtines[0]?.clienteContacto?.correo}</span></p>
                        <p>Teléfono Contacto: <span>{infoOtines[0]?.clienteContacto?.telefono}</span></p>
                    </div>

                    {
                        infoOtines.length > 0 ? 
                            infoOtines.map((otin, index) => (
                                <Fragment key={index}>
                                    <div className='modal__herramienta'>
                                        <h2>Sobre OTIN {otin?.otin}:</h2>

                                        <p>Nombre: <span>{otin?.nombre}</span></p>
                                        <p>Fecha Ingreso: <span>{moment(otin?.fecha).format('DD/MM/YYYY')}</span></p>
                                        <p>Tipo de Herramienta: <span>{otin?.tipoHerramientum?.nombre}</span></p>
                                        <p>Marca: <span>{otin?.marca}</span></p>
                                        <p>Modelo: <span>{otin?.modelo}</span></p>
                                        <p>N° Interno: <span>{otin?.numeroInterno}</span></p>
                                        <p>N° Serie: <span>{otin?.numeroSerie}</span></p>
                                        <p>N° Guía Cliente: <span>{otin?.numeroGuiaCliente}</span></p>
                                    </div>
                                    
                                    <Link to={`/ingresos`} state={{ from: `${otin.otin}` }} className="btn-new btn-login">
                                        <BsBoxArrowInRight size={25}/>Ir a la OTIN {otin?.otin}
                                    </Link>
                                </Fragment>
                            ))
                        :
                            null
                    }
                </div>
                

            </Modal>
        </div>
    )
}

export default InfoOtines;
