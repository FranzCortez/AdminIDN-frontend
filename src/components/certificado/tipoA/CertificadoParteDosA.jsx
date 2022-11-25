import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function CertificadoParteDosA({ onButtonClick, guardarDatosSegundo }) {

    const [ descripcion, guardarDescripcion ] = useState({
        conclucion: '',
        mantencion: '',
    });    

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext); 

    const actualizarState = (e) => {    
        guardarDescripcion({
            ...descripcion,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {

        if( !(!descripcion.mantencion.length || !descripcion.conclucion.length ) ){
            return false;
        }

        return true;

    }

    const enviar = (e) => {
        e.preventDefault();
        onButtonClick("pagethree");
        guardarDatosSegundo(descripcion);
    }

    return (
        <Fragment>

            <form onSubmit={enviar}>
                
                <div className='campo'>
                    <label htmlFor="Mantención">Mantención o Reparación<span className='campo__obligatorio'>*</span>:</label>
                    <textarea 
                        name="mantencion" 
                        id="mantencion" 
                        cols="30" 
                        rows="5"
                        defaultValue={descripcion.mantencion}
                        onChange={actualizarState}
                    />                 
                </div>
                
                <div className='campo'>
                    <label htmlFor="conclucion">Conclución<span className='campo__obligatorio'>*</span>:</label>
                    <textarea 
                        name="conclucion" 
                        id="conclucion" 
                        cols="30" 
                        rows="5"
                        defaultValue={descripcion.conclucion}
                        onChange={actualizarState}
                    />                 
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                        value="Siguiente"
                        disabled={validarForm()}
                    />
                </div>

            </form>
        </Fragment>
    )
}

export default CertificadoParteDosA