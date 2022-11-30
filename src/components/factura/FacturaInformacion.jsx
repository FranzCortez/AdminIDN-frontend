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

                <div className='modal__herramienta'>
                    {/* <h2>Sobre la Herramienta:</h2> */}

                    <p>N° Orden de Compra: <span>{datos?.numeroCompra}</span></p>
                    <p>Fecha Orden de Compra: <span>{moment(datos?.fechaCompra).format('DD/MM/YYYY')}</span></p>
                    <p>Monto Neto: <span>${valorNumero(datos?.monto)}</span></p>
                    <p>IVA: <span>${valorNumero((datos?.monto * 0.19))}</span></p>
                    <p>Forma de Pago: <span>{datos?.formaPago}</span></p>
                    <p>Fecha Vencimiento: <span>{moment(fechaVencimiento).format('DD/MM/YYYY')}</span></p>
                    <p>Fecha de Pago: <span>{datos?.fechaPago === '0000-00-00' ? 'No hay pago' : moment(datos?.fechaPago).format('DD/MM/YYYY') }</span></p>
                    <p>Días de Mora: <span>{datos?.fechaPago === '0000-00-00' && new Date() >= fechaVencimiento ? ` ${diffInDays(new Date(), fechaVencimiento)} Días de mora` : 'No hay Mora'}</span></p>
                </div>

                <div>
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