import React, { Fragment, useState } from 'react';

import SeleccionImagen from './SeleccionImagen';

function InformeParteDos({ onButtonClick, guardarDatosSegundo, segundoFotoA, segundoTextoA, segundoFotoB, segundoTextoB, datosInfo }) {

    const [ textoPrimero, guardarTextoPrimero ] = useState(segundoTextoA);
    const [ fotosPrimero, guardarFotosPrimero ] = useState(segundoFotoA);
    const [ textoSegundo, guardarTextoSegundo ] = useState(segundoTextoB);
    const [ fotosSegundo, guardarFotosSegundo ] = useState(segundoFotoB);

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

    const regresar = () => {
        onButtonClick("pageone");
    }

    const enviar = (e) => {
        onButtonClick("pagethree");
        guardarDatosSegundo(fotosPrimero, textoPrimero, fotosSegundo, textoSegundo);
    }

    if ( textoPrimero === '' && textoSegundo === '' && datosInfo.cuadroA ) {
        guardarFotosPrimero(datosInfo.cuadroA.fotoA);
        guardarTextoPrimero(datosInfo.cuadroA.segundoTextoA);
        guardarFotosSegundo(datosInfo.cuadroB.fotoB);
        guardarTextoSegundo(datosInfo.cuadroB.segundoTextoB);
    }

    return (
        <Fragment>
            <form onSubmit={e => e.preventDefault()}>

                <h2 className='modal__subtitulo'>Seleccione la(s) foto(s) para el cuadro (revise que estas no hagan 2 filas en la previsualización del cuadro), de ser asi cambie las fotos para que estas entren en 1 fila.</h2>

                <SeleccionImagen primero={primero} />

                <div className='info__table' >
                    <table className="table table-hover  mb-0">
                        <thead>
                            <tr className='table__tr'>
                                <td>
                                    {
                                        fotosPrimero.length > 0 ? 

                                            fotosPrimero[0] === segundoFotoA[0] ?

                                                segundoFotoA?.map( (foto, index) => (                                            
                                                    <img className='info__img' src={`data:image/jpeg;base64,${foto}`} alt="" key={index} />
                                                ))
                                            :

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
                    <table className="table table-hover  mb-0">
                        <thead>
                            <tr className='table__tr'>
                                <td>
                                    {
                                        fotosSegundo.length > 0 ? 
                                            fotosSegundo[0] === segundoFotoB[0] ?

                                                segundoFotoB?.map( (foto, index) => (                                            
                                                    <img className='info__img' src={`data:image/jpeg;base64,${foto}`} alt="" key={index} />
                                                ))
                                            :

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
                            onClick={enviar}
                        />
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default InformeParteDos;