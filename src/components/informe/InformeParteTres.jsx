import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

function InformeParteTres({ guardarDatosTercero }) {

    const { id } = useParams();

    const [ descripcion, guardarDescripcion ] = useState({
        conclusion: '',
        falla: '',
        recomendacion: ''
    });
    const [ falla, guardarFalla ] = useState({});

    let navigate = useNavigate();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext); 

    const actualizarState = (e) => {

        guardarDescripcion({
            ...descripcion,
            [e.target.name] : e.target.value
        });

    }

    const validarForm = () => {

        if( !(!descripcion.falla.length) ){
            return false;
        }

        return true;

    }

    const enviar = (e) => {
        e.preventDefault();
        guardarDatosTercero(descripcion);
    }

    const consultarAPI = async () => {
        
        try {

            const res = await clienteAxios.get(`tipo/falla/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarFalla(res.data)     
            
            guardarDescripcion({
                conclusion: '',
                falla: res.data.descripcion,
                recomendacion: res.data.recomendacion
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {            
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }   
    }, [])

    return (
        <Fragment>

        <h2 className='modal__subtitulo'>Autocompletado para el tipo de herramienta: {falla.nombre}.</h2>

            <form onSubmit={enviar}>
                
                <div className='campo'>
                    <label htmlFor="falla">Falla<span className='campo__obligatorio'>*</span>:</label>
                    <textarea 
                        name="falla" 
                        id="falla" 
                        cols="30" 
                        rows="5"
                        defaultValue={falla.descripcion}
                        onChange={actualizarState}
                    />                 
                </div>
                
                <div className='campo'>
                    <label htmlFor="conclusion">Conclución:</label>
                    <textarea 
                        name="conclusion" 
                        id="conclusion" 
                        cols="30" 
                        rows="5"
                        defaultValue={falla.recomendacion}
                        onChange={actualizarState}
                    />                 
                </div>

                <div className='campo'>
                    <label htmlFor="recomendacion">Recomendar:</label>
                    <textarea 
                        name="recomendacion" 
                        id="recomendacion" 
                        cols="30" 
                        rows="5"
                        onChange={actualizarState}
                    />                 
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                        value="Generar Informe"
                        disabled={validarForm()}
                    />
                </div>

            </form>
        </Fragment>
    )
}

export default InformeParteTres;
