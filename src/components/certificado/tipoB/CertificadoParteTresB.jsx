import React, { Fragment, useState } from 'react';

function CertificadoParteTresB({ guardarDatosTercero }) {

    const [ descripcion, guardarDescripcion ] = useState({
        observaciones: 'Llave de torque presentaba sus medidas fuera de los rangos de tolerancia aplicados.\nPor lo que se ajustaron sus medidas y la posición del cero.\nLlave de torque una vez calibrada, comparada, y con mantensión se determina:',
        nota: 'Se recomienda a los operarios de los equipos de medición, que éste es sólo para dar el torque requerido  después del apriete, no se debe usar por ningún motivo para el apriete o afloje de pernos o tuercas.\nLa aplicación de fuerza debe ser lenta y constante, no aplicar fuerza fuera del rango especificado, no golpearlo.\nNo guarde la herramienta sin antes regresar a posición de cero, ya que mantener el torque tensionado puede ocacionar su dascalibración paulatina.',
        rojo: 'OPERATIVA BAJO ESTANDARES DE SU FABRICANTE.',
        operativo: ''
    });    

    const actualizarState = (e) => {    
        guardarDescripcion({
            ...descripcion,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {

        if( !(!descripcion.nota.length || !descripcion.observaciones.length || !descripcion.operativo.length ) ){
            return false;
        }

        return true;

    }

    const enviar = (e) => {
        e.preventDefault();
        guardarDatosTercero(descripcion);
    }

    return (
        <Fragment>

            <form onSubmit={enviar}>
                
                <div className='campo'>
                    <label htmlFor="observaciones">Observaciones<span className='campo__obligatorio'>*</span>:</label>
                    <textarea 
                        name="observaciones" 
                        id="observaciones" 
                        cols="30" 
                        rows="5"
                        defaultValue={descripcion.observaciones}
                        onChange={actualizarState}
                    />                 
                </div>

                <div className='campo'>
                    <label htmlFor="rojo">Texto Remarcado<span className='campo__obligatorio'>*</span>:</label>
                    <input 
                        type="text" 
                        name='rojo'
                        id='rojo'
                        onChange={actualizarState}
                        defaultValue={descripcion.rojo}
                    />
                </div>
                    
                <div className='campo'>
                    <label htmlFor="Mantención">Nota<span className='campo__obligatorio'>*</span>:</label>
                    <textarea 
                        name="nota" 
                        id="nota" 
                        cols="30" 
                        rows="5"
                        defaultValue={descripcion.nota}
                        onChange={actualizarState}
                    />                 
                </div>

                <div className='campo'>
                    <label htmlFor="operativo">Estado<span className='campo__obligatorio'>*</span>:</label>
                    <select name="operativo" id="operativo" onChange={actualizarState} defaultValue={0}>
                        <option value={0} disabled> -- Seleccione -- </option>    
                        <option value={true}>Operativo</option>
                        <option value={false}>Dar de Baja</option>
                    </select>
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

export default CertificadoParteTresB;