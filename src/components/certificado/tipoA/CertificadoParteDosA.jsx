import React, { Fragment, useState } from 'react';

function CertificadoParteDosA({ onButtonClick, guardarDatosSegundo, segundo }) {

    const [ descripcion, guardarDescripcion ] = useState({
        conclusion: segundo?.conclusion ? segundo?.conclusion?.join('\n') : '',
        mantencion: segundo?.mantencion ? segundo?.mantencion?.join('\n') : '',
    });    

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
    }

    const regresar = () => {
        onButtonClick("pagetwo");
    }

    return (
        <Fragment>

            <form onSubmit={e => e.preventDefault()}>
                
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