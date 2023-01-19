import React, { Fragment, useState } from 'react';

function InformeParteUno({ onButtonClick, guardarDatosPrimero, data }) {

    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`;
    
    const [ datos, guardarDatos ] = useState({
        fecha: data?.fecha ? data.fecha : fechaActual,
        nombre: data?.nombre ? data.nombre : "Alberto García",
        falla: data?.falla ? data.falla : ""
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

    const regresar = () => {
        document.querySelector("#info").classList.add("dn");
        document.querySelector("#info").classList.remove("db");
        document.querySelector("#cot").classList.remove("dn");
        document.querySelector("#cot").classList.add("db");
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
                        defaultValue={datos.falla}
                        placeholder='Falla Indicada por el Cliente'
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
                            value="Siguiente"
                            disabled={validarForm()}
                        />
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default InformeParteUno;