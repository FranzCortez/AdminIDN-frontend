import React, { Fragment, useState } from 'react';

function CertificadoParteUnoA({ onButtonClick, guardarDatosPrimero }) {

    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`

    const [ datos, guardarDatos ] = useState({
        fechaEmicion: fechaActual,
        fechaCalibracion: "",
        fechaProximaCalibracion: ""
    });

    const actualizarState = (e) => {
        
        if ( e.target.name === 'fechaCalibracion' ) {

            const proxima = e.target.value.split("-");
            
            guardarDatos({
                ...datos,
                fechaProximaCalibracion: `${parseInt(proxima[0]) + 1 }-${proxima[1]}-${proxima[2]}`,
                [e.target.name] : e.target.value
            });

        } else {
            guardarDatos({
                ...datos,
                [e.target.name] : e.target.value
            });
        }
    }

    const validarForm = () => {

        const { fechaEmicion, fechaCalibracion, fechaProximaCalibracion } = datos;

        if( !(!fechaCalibracion.length || !fechaEmicion.length || !fechaProximaCalibracion.length) ){
            return false;
        }

        return true;

    }

    const enviar = (e) => {
        e.preventDefault();
        onButtonClick("pagetwo");
        guardarDatosPrimero(datos);
    }

    return (
        <Fragment>
            <form onSubmit={enviar}>
                <div className='campo'>
                    <label htmlFor="fechaEmicion">Fecha Emición<span className='campo__obligatorio'>*</span>:</label>
                    <input 
                        type="date" 
                        id='fechaEmicion'
                        name='fechaEmicion'
                        defaultValue={datos.fechaEmicion}
                        onChange={actualizarState}
                    />
                </div>

                <h2 className="card-body-subtitle">Instrumento Patron</h2>

                <div className='campo'>
                    <label htmlFor="fechaCalibracion">Fecha Calibración:</label>
                    <input 
                        type="date" 
                        id='fechaCalibracion'
                        name='fechaCalibracion'
                        defaultValue={datos.fechaCalibracion}
                        onChange={actualizarState}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="fechaProximaCalibracion">Próxima Calibración:</label>
                    <input 
                        type="date" 
                        id='fechaProximaCalibracion'
                        name='fechaProximaCalibracion'
                        defaultValue={datos.fechaProximaCalibracion}
                        onChange={actualizarState}
                    />
                </div>

                <h2 className="card-body-subtitle">Campos Opcionales</h2>

                <div className='campo'>
                    <label htmlFor="toneladas">Toneladas:</label>
                    <input 
                        type="text" 
                        id='toneladas'
                        name='toneladas'
                        onChange={actualizarState}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="presion">Presión de Trabajo:</label>
                    <input 
                        type="text" 
                        id='presion'
                        name='presion'
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

export default CertificadoParteUnoA;
