import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TbFileInfo } from "react-icons/tb";
import moment from 'moment';
import Modal from 'react-modal';

function IngresoInformacionModal(props) {
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
            <button className='btn-new btn-naranja' style={{margin:'0 auto'}} onClick={openModal}><TbFileInfo size={20}/></button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >

                <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
                <h1 className='modal__titulo'>Información Extra OVIN "{ingreso.ovin}"</h1>
                <div className='modal__grid ic__slice'>

                    <div className='modal__herramienta'>
                        <h2>Cliente:</h2>
                        <p>Nombre Empresa: <span>{ingreso?.clienteContactoCom?.clienteEmpresaCom?.nombre}</span></p>
                        <p>Nombre Contacto: <span>{ingreso?.clienteContactoCom?.nombre}</span></p>
                        <p>Correo Contacto: <span>{ingreso?.clienteContactoCom?.correo}</span></p>
                        <p>Teléfono Contacto: <span>{ingreso?.clienteContactoCom?.telefono}</span></p>
                    </div>

                    <div className='modal__herramienta'>
                        <h2>Extras:</h2>

                        <p>N° Order de Compra: <span>{ingreso?.numeroOrdenCompra}</span></p>
                        <p>Fecha Orden de Compra: <span>{moment(ingreso?.fechaOrdenCompra).format('DD-MM-YYYY')}</span></p>
                    </div>

                    <div>
                        <div className='modal__herramienta'>
                            <h2>Comentarios sobre la Herramienta:</h2>

                            { ingreso.comentario ? ingreso.comentario : null}
                            <div id='comentario'>
                            </div>
                        </div>

                        {
                            ingreso.proveedor ? 
                                <div className='modal__herramienta'>
                                    <h2>Proveedor(es):</h2>

                                    {
                                        ingreso.proveedorIngreso.map((proveedor, index) => (

                                            <Fragment>
                                                <h3 className='ic__sub3'>Proveedor {index + 1}</h3>
                                                <p>Proveedor: <span>{proveedor.proveedorContactoCom.proveedorCom.nombre}</span></p>
                                                <p>Proveedor Contacto: <span>{proveedor.proveedorContactoCom.nombre}</span></p>
                                                <p>Proveedor Correo: <span>{proveedor.proveedorContactoCom.correo}</span></p>
                                                <p>Proveedor Telefono: <span>{proveedor.proveedorContactoCom.telefono}</span></p>
                                                {
                                                    proveedor?.ocin?.length ? 
                                                    <Fragment>
                                                        <h4 className='ic__sub4'>Ocines</h4>
                                                        {
                                                            proveedor.ocin.map((ocin) => (
                                                                <Fragment>
                                                                    <p>Ocin: <span>{ocin.ocinCom.ocin}</span></p>
                                                                </Fragment>
                                                            ))
                                                        }
                                                    </Fragment>
                                                    :
                                                    null
                                                }
                                            </Fragment>
                                        ))
                                    }
                                </div>
                            :
                                null
                        }
                        {
                            ingreso.edp ? 
                                <div className='modal__herramienta'>
                                    <h2>Estado(s) de Pago:</h2>

                                    {
                                        ingreso.ingresoEdp.map((edp, index) => (
                                            <Fragment>
                                                <p>EDP {index + 1}: <span>{edp.edpCom.codigo}</span></p>
                                            </Fragment>
                                        ))
                                    }
                                </div>
                            :
                                null
                        }
                    </div>
                </div>

                <Link to={`editar/${ingreso.id}/1`} className="btn-new btn-return">
                    <FiEdit size={25}/> Editar Ingreso
                </Link>
            </Modal>
        </div>
    )
}

export default IngresoInformacionModal