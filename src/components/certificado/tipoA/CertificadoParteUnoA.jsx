import React, { Fragment, useState } from 'react';

function CertificadoParteUnoA({ onButtonClick, guardarDatosPrimero, primero }) {

    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`

    const [ datos, guardarDatos ] = useState({
        fechaEmicion: primero?.fechaEmicion ? primero.fechaEmicion : fechaActual,
        fechaCalibracion: primero?.fechaCalibracion ? primero.fechaCalibracion : "",
        fechaProximaCalibracion: primero?.fechaProximaCalibracion ? primero.fechaProximaCalibracion : "",
        toneladas: primero?.toneladas ? primero.toneladas : '',
        presion: primero?.presion ? primero.presion : '',
        marca: primero?.marca ? primero.marca : '',
        serie: primero?.serie ? primero.serie : '',
        unidad: primero?.unidad ? primero.unidad : '',
        modelo: primero?.modelo ? primero.modelo : '',
        emisor: primero?.emisor ? primero.emisor : 'Impacto del Norte'
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

    const avanzar = (event) => {
        if (event.keyCode === 13 && event.target.nodeName === "INPUT" && event.target.type !== 'submit') {
            var form = event.target.form;
            var index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

    return (
        <Fragment>
            <form onSubmit={enviar} onKeyDown={avanzar}>
                <div className='campo'>
                    <label htmlFor="fechaEmicion">Fecha Emisión<span className='campo__obligatorio'>*</span>:</label>
                    <input 
                        type="date" 
                        id='fechaEmicion'
                        name='fechaEmicion'
                        defaultValue={datos.fechaEmicion}
                        onChange={actualizarState}
                    />
                </div>

                <h2 className="card-body-subtitle">Instrumento Patrón</h2>

                <div className='campo'>
                    <label htmlFor="marca">Marca:</label>
                    <input 
                        type="text" 
                        id='marca'
                        name='marca'
                        defaultValue={datos.marca}
                        onChange={actualizarState}
                        placeholder='Marca de instrumento patrón'
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="serie">Serie:</label>
                    <input 
                        type="text" 
                        id='serie'
                        name='serie'
                        defaultValue={datos.serie}
                        onChange={actualizarState}
                        placeholder='Serie de instrumento patrón'
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="unidad">Unidad:</label>
                    <input 
                        type="text" 
                        id='unidad'
                        name='unidad'
                        defaultValue={datos.unidad}
                        onChange={actualizarState}
                        placeholder='Unidad de instrumento patrón'
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="fechaCalibracion">Fecha Certificación:</label>
                    <input 
                        type="date" 
                        id='fechaCalibracion'
                        name='fechaCalibracion'
                        defaultValue={datos.fechaCalibracion}
                        onChange={actualizarState}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="fechaProximaCalibracion">Próxima Certificación:</label>
                    <input 
                        type="date" 
                        id='fechaProximaCalibracion'
                        name='fechaProximaCalibracion'
                        defaultValue={datos.fechaProximaCalibracion}
                        onChange={actualizarState}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="modelo">Modelo:</label>
                    <input 
                        type="text" 
                        id='modelo'
                        name='modelo'
                        defaultValue={datos.modelo}
                        onChange={actualizarState}
                        placeholder='Modelo de instrumento patrón'
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="emisor">Emisor:</label>
                    <input 
                        type="text" 
                        id='emisor'
                        name='emisor'
                        defaultValue={datos.emisor}
                        onChange={actualizarState}
                        placeholder='Emisor de instrumento patrón'
                    />
                </div>

                <h2 className="card-body-subtitle">Campos Opcionales</h2>

                <div className='campo'>
                    <label htmlFor="toneladas">Toneladas:</label>
                    <input 
                        type="text" 
                        id='toneladas'
                        name='toneladas'
                        defaultValue={datos.toneladas}
                        onChange={actualizarState}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="presion">Presión de Trabajo:</label>
                    <input 
                        type="text" 
                        id='presion'
                        name='presion'
                        defaultValue={datos.presion}
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
