import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TbFileInfo } from "react-icons/tb";
import moment from 'moment';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function FacturaInformacion({datos}) {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function addDaysToDate(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const fechaVencimiento = datos.formaPago === 'Crédito' ? addDaysToDate(datos?.fechaFactura, 30) : addDaysToDate(datos?.fechaFactura, 1); // cambiar por credito o contado

    const diffInDays = (x, y) => Math.floor((x - y) / (1000 * 60 * 60 * 24));
    
    const observaciones = datos.observaciones.split("\n");

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
                <h1 className='modal__titulo'>Información Extra Factura</h1>

                <div className='modal__scroll'>
                    <div className='modal__herramienta'>
                        {/* <h2>Sobre la Herramienta:</h2> */}

                        {
                            datos.numeroNotaCredito ? 

                                <p>N° Nota de Crédito: <span>{datos?.numeroNotaCredito}</span></p>
                            :
                                null
                        }
                        
                        <p>N° Orden de Compra: <span>{datos?.herramientas?.length > 0 && datos?.numeroCompra > 0 ? datos?.numeroCompra : '-'}</span></p>
                        <p>Fecha Orden de Compra: <span>{datos?.herramientas?.length > 0 && ( datos?.fechaCompra !== "0000-00-00" && datos?.fechaCompra !== null) ? moment(datos?.fechaCompra).format('DD/MM/YYYY') : '-'}</span></p>
                        <p>Monto Neto: <span>${datos?.herramientas?.length > 0 ? valorNumero(datos?.monto) : '-'}</span></p>
                        <p>IVA: <span>${datos?.herramientas?.length > 0 ? valorNumero((datos?.monto * 0.19)) : '-'}</span></p>
                        <p>Monto Total: <span>${datos?.herramientas?.length > 0 ? valorNumero((datos?.monto + (datos?.monto * 0.19))) : '-'}</span></p>
                        <p>Forma de Pago: <span>{datos?.herramientas?.length > 0 ? datos?.formaPago : '-'}</span></p>
                        <p>Fecha Vencimiento: <span>{datos?.herramientas?.length > 0 ? moment(fechaVencimiento).format('DD/MM/YYYY') : '-'}</span></p>
                        <p>Fecha de Pago: <span>{ datos?.herramientas?.length > 0 ? (datos?.fechaPago === '0000-00-00' || datos?.fechaPago === null ? 'No hay pago' : moment(datos?.fechaPago).format('DD/MM/YYYY'))  : '-' }</span></p>
                        <p>Días de Mora: 
                            <span>{datos?.herramientas?.length > 0 ? ((datos?.fechaPago === '0000-00-00' || datos?.fechaPago === null) && new Date() >= fechaVencimiento ? ` ${diffInDays(new Date(), fechaVencimiento) +1} Día(s) de mora` : 'No hay Mora') : '-' }</span>
                        </p>
                    </div>

                
                    <div className='modal__herramienta'>
                        <h2>Observaciones:</h2>

                        { datos.observaciones ? 
                                observaciones.map( (obs, index) => (
                                    <p key={index}>{obs}</p>
                                ))
                            : 
                                null
                        }
                        <div id='comentario'>
                        </div>
                    </div>
                </div>
                

                {/* <Link to={`editar/${ingreso.id}`} className="btn-new btn-return">
                    <FiEdit size={25}/> Editar Ingreso
                </Link> */}
            </Modal>
        </div>
    );
}

export default FacturaInformacion;