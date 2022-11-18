import React, { Fragment, useState } from 'react';

import SeleccionImagen from './SeleccionImagen';

function InformeParteDos({ onButtonClick, guardarDatosSegundo }) {

    const [ textoPrimero, guardarTextoPrimero ] = useState('');
    const [ fotosPrimero, guardarFotosPrimero ] = useState([]);
    const [ textoSegundo, guardarTextoSegundo ] = useState('');
    const [ fotosSegundo, guardarFotosSegundo ] = useState([]);

    const primero = (texto, fotos) => {

        guardarTextoPrimero(texto);
        guardarFotosPrimero(fotos);

    }

    const segundo = (texto, fotos) => {

        guardarTextoSegundo(texto);
        guardarFotosSegundo(fotos);

    }

    const validarForm = () => {

        if( !(!fotosPrimero.length || !fotosSegundo.length ) ){
            return false;
        }

        return true;

    }

    const enviar = (e) => {
        onButtonClick("pagethree");
        guardarDatosSegundo(fotosPrimero, textoPrimero, fotosSegundo, textoSegundo);
    }

    return (
        <Fragment>
            <form onSubmit={e => e.preventDefault()}>

                <h2 className='modal__subtitulo'>Seleccione la(s) foto(s) para el cuadro (revise que estas no hagan 2 filas en la previsualización del cuadro), de ser asi cambie las fotos para que estas entren en 1 fila.</h2>

                <SeleccionImagen primero={primero} />

                <div className='info__table' >
                    <table className="table table-hover">
                        <thead>
                            <tr className='table__tr'>
                                <td>
                                    {
                                        fotosPrimero.length > 0 ? 
                                        fotosPrimero.map( (foto, index) => (                                            
                                            <img className='info__img' src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}${foto}`} alt="" key={index} />
                                        ))
                                        :
                                        <p>aún no selecciona imagenes</p>
                                    }
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='table__head'>
                                <th scope="col" colSpan={3}>
                                    {
                                        textoPrimero !== '' ? 
                                        textoPrimero
                                        :
                                        <p>aún no escribe una descripción</p>
                                    }
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <SeleccionImagen primero={segundo} />

                <div className='info__table' >
                    <table className="table table-hover">
                        <thead>
                            <tr className='table__tr'>
                                <td>
                                    {
                                        fotosSegundo.length > 0 ? 
                                        fotosSegundo.map( (foto, index) => (                                            
                                            <img className='info__img' src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}${foto}`} alt="" key={index} />
                                        ))
                                        :
                                        <p>aún no selecciona imagenes</p>
                                    }
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='table__head'>
                                <th scope="col" colSpan={3}>
                                    {
                                        textoSegundo !== '' ? 
                                        textoSegundo
                                        :
                                        <p>aún no escribe una descripción</p>
                                    }
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                        value="Siguiente"
                        disabled={validarForm()}
                        onClick={enviar}
                    />
                </div>

            </form>
        </Fragment>
    )
}

export default InformeParteDos;