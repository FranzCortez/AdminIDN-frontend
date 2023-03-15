import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineDollarCircle } from "react-icons/ai";
import { BsBoxArrowInRight } from "react-icons/bs";
import { TbFileInfo } from "react-icons/tb";
import moment from 'moment';
import Modal from 'react-modal';

import { CRMContext } from '../context/CRMContext';
import clienteAxios from '../../config/axios';

Modal.setAppElement('#root');


function InformacionFactura({ nFactura }) {

    const [modalIsOpen, setIsOpen] = useState(false);

    const [ factura, guardarFactura ] = useState({});

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);    

    function addDaysToDate(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }

    const valorNumero = (numero) => new Intl.NumberFormat().format(numero);

    const fechaVencimiento = factura?.formaPago === 'Crédito' ? addDaysToDate(factura?.fechaFactura, 30) : addDaysToDate(factura?.fechaFactura, 1); // cambiar por credito o contado

    const diffInDays = (x, y) => Math.floor((x - y) / (1000 * 60 * 60 * 24));
    
    const observaciones = factura?.observaciones?.split("\n");

    function openModal() {
        consultarAPI();
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const consultarAPI = async () => {
        
        try {

            const res = await clienteAxios.get(`factura/info/${nFactura}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarFactura(res.data);

        } catch (error) {
            console.log(error)
        }
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
                <h1 className='modal__titulo'>Información Extra Factura</h1>

                <div className='modal__scroll'>
                    <div className='modal__herramienta'>
                        {/* <h2>Sobre la Herramienta:</h2> */}

                        {
                            factura.numeroNotaCredito ? 

                                <p>N° Nota de Crédito: <span>{factura?.numeroNotaCredito}</span></p>
                            :
                                null
                        }
                        
                        <p>N° Orden de Compra: <span>{factura?.numeroCompra > 0 || factura?.numeroCompra?.length > 0 ? factura?.numeroCompra : 'Sin OC'}</span></p>
                        
                        <p>Fecha Orden de Compra: <span>{factura?.herramientas?.length > 0 && ( factura?.fechaCompra !== "0000-00-00" && factura?.fechaCompra !== null) ? moment(factura?.fechaCompra).format('DD/MM/YYYY') : 'Sin Fecha OC'}</span></p>
                        
                        <p>Monto Neto: <span>${valorNumero(factura?.monto)}</span></p>
                        
                        <p>IVA: <span>${valorNumero((factura?.monto * 0.19))}</span></p>
                       
                        <p>Monto Total: <span>${valorNumero((factura?.monto + (factura?.monto * 0.19)))}</span></p>
                        
                        <p>Forma de Pago: <span>{factura?.formaPago}</span></p>
                        
                        <p>Fecha Vencimiento: <span>{ factura?.estado === "Pagado" ? "Pagado" : moment(fechaVencimiento).format('DD/MM/YYYY')}</span></p>
                        
                        <p>Fecha de Pago: <span>{(factura?.fechaPago === '0000-00-00' || factura?.fechaPago === null ? 'No hay pago' : moment(factura?.fechaPago).format('DD/MM/YYYY'))}</span></p>
                        
                        <p>Días de Mora: 
                            <span> {((factura?.fechaPago === '0000-00-00' || factura?.fechaPago === null) && new Date() >= fechaVencimiento ? ` ${diffInDays(new Date(), fechaVencimiento) +1} Día(s) de mora` : 'No hay Mora')}</span>
                        </p>
                    </div>

                
                    <div className='modal__herramienta'>
                        <h2>Observaciones:</h2>

                        { factura.observaciones ? 
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
                

                <Link to={`/facturas`} state={{ from: `${nFactura}` }} className="btn-new btn-login">
                    <BsBoxArrowInRight size={25}/>
                    <AiOutlineDollarCircle size={25}/> Ir a la Factura
                </Link>
            </Modal>
        </div>
    )
}

export default InformacionFactura;
