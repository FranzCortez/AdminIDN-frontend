import React, { useState } from 'react';
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function FormNuevoContenido({actualizarContenido, activo}) {

    const [ contenido, guardarContenido ] = useState({
        nombre: '',
        descripcion: '',
        cantidad: '',
        valor: '',
    });
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const actualizarState = e => {
        
        guardarContenido({
            ...contenido,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {

        const {nombre, cantidad, valor} = contenido;

        if( nombre.length > 0 && cantidad.length > 0 && valor.length > 0 ) {
            return false;
        }

        return true;
    }

    const enviarInfo = (e) => {
        e.preventDefault();
        closeModal();
        actualizarContenido(contenido);
    }

    return (
        <div>
            <button className={activo ? 'btn-new' : 'btn-new btn-success-new'} onClick={openModal} disabled={activo}><AiOutlinePlusCircle size={20}/> Nuevo Contenido</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >

                <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
                <h2 className='modal__titulo'>Ingrese el nuevo cobro</h2>
                
                <form onSubmit={enviarInfo}>
                    <div className='campo'>
                        <label htmlFor="nombre">Nombre<span className='campo__obligatorio'>*</span>:</label>
                        <input 
                            type="text" 
                            id='nombre'
                            name='nombre'
                            placeholder='Nombre del Componente'
                            onChange={actualizarState}
                        />
                    </div>

                    <div className='campo'>
                        <label htmlFor="descripcion">Descripción:</label>
                        <input 
                            type="text" 
                            id='descripcion'
                            name='descripcion'
                            placeholder='Descripción del Componente'
                            onChange={actualizarState}
                        />
                    </div>

                    <div className='campo'>
                        <label htmlFor="cantidad">Cantidad<span className='campo__obligatorio'>*</span>:</label>
                        <input 
                            type="number" 
                            id='cantidad'
                            name='cantidad'
                            placeholder='Cantidad del Componente'
                            min="1"
                            onChange={actualizarState}
                        />
                    </div>

                    <div className='campo'>
                        <label htmlFor="valor">Valor<span className='campo__obligatorio'>*</span>:</label>
                        <input 
                            type="number" 
                            id='valor'
                            min="0"
                            name='valor'
                            placeholder='Valor del Componente'
                            onChange={actualizarState}
                        />
                    </div>

                    <div className="enviar">
                        <input 
                            type="submit" 
                            className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                            value="Crear Nuevo Cliente Empresa"
                            disabled={validarForm()}
                        />
                    </div>
                </form>                
            </Modal>
        </div>
    )
}

export default FormNuevoContenido;