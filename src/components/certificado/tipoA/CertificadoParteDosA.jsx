import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function CertificadoParteDosA({ onButtonClick, guardarDatosSegundo, segundo, checkCertificados, guardarCheckCertificado }) {

    const {id} = useParams();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const [ check, guardarCheck ] = useState(checkCertificados);

    const [ descripcion, guardarDescripcion ] = useState({
        conclusion: segundo?.conclusion ? segundo?.conclusion?.join('\n') : '',
        mantencion: segundo?.mantencion ? segundo?.mantencion?.join('\n') : '',
    });    
    
    const actualizarCheck = (e) => {
        guardarCheck(!check);
    }

    const actualizarState = (e) => {    
        guardarDescripcion({
            ...descripcion,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {

        if( !(!descripcion.mantencion.length || !descripcion.conclusion.length ) ){
            return false;
        }

        return true;

    }

    const enviar = () => {
        guardarDatosSegundo(descripcion);
        guardarCheckCertificado(check);
    }

    const regresar = () => {
        onButtonClick("pagetwo");
    }

    const consultarAPI = async () => {
        
        try {

            const res = await clienteAxios.get(`tipo/falla/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            const conclu = await clienteAxios.get(`ih/info/conclu/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarDescripcion({
                mantencion: conclu.data.conclusion,
                conclusion: res.data.conclusion
            });

        } catch (error) {
            console.log(error)
        }
    }

    const avanzar = (event) => {
        if (event.keyCode === 13 && event.target.nodeName === "INPUT" && event.target.type !== 'submit') {
            var form = event.target.form;
            var index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2 || auth.tipo === 4) ) {            
            consultarAPI();
        }  
    }, []);

    return (
        <Fragment>

            <form onSubmit={e => e.preventDefault()} onKeyDown={avanzar}>
                
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
                    <label htmlFor="conclusion">Conclusión<span className='campo__obligatorio'>*</span>:</label>
                    <textarea 
                        name="conclusion" 
                        id="conclusion" 
                        cols="30" 
                        rows="5"
                        defaultValue={descripcion.conclusion}
                        onChange={actualizarState}
                    />                 
                </div>

                <div className='campo_check'>
                    <input type="checkbox" name="guardarFalla" id="guardarFalla" onChange={actualizarCheck} checked={check} />
                    <label htmlFor="guardarFalla">Agregar certificados.</label>
                </div>

                <div className='opciones' >
                    <div className='enviar' >
                        <div className='btn-new btn-return' onClick={regresar}>
                            Regresar
                        </div>
                    </div>

                    <div className="enviar">
                        <input 
                            type="submit" 
                            className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                            value="Generar Certificado"
                            disabled={validarForm()}
                            onClick={enviar}
                        />
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default CertificadoParteDosA