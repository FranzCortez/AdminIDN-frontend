import React, { Fragment, useState } from 'react';

function InformeParteUno({ onButtonClick, guardarDatosPrimero }) {

    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`

    const [ datos, guardarDatos ] = useState({
        fecha: fechaActual,
        nombre: "Alberto García",
        falla: ""
    });

    const actualizarState = (e) => {

        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        });

    }

    const validarForm = () => {

        const { fecha, nombre, falla } = datos;

        if( !(!nombre.length || !fecha.length || !falla.length) ){
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
                    <label htmlFor="nombre">Técnico a Cargo<span className='campo__obligatorio'>*</span>:</label>
                    <input 
                        type="text" 
                        id='nombre'
                        name='nombre'
                        defaultValue={datos.nombre}
                        placeholder='Nombre del nuevo usuario'
                        onChange={actualizarState}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="fecha">Fecha:</label>
                    <input 
                        type="date" 
                        id='fecha'
                        name='fecha'
                        defaultValue={datos.fecha}
                        onChange={actualizarState}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="falla">Falla Indicada<span className='campo__obligatorio'>*</span>:</label>
                    <input 
                        type="text" 
                        id='falla'
                        name='falla'
                        placeholder='Falla Indicada por el Cliente'
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

export default InformeParteUno;