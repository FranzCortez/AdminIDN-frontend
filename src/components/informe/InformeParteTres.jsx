import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

function InformeParteTres({ guardarDatosTercero }) {

    const { id } = useParams();

    const [ descripcion, guardarDescripcion ] = useState({
        conclusion: '',
        descripcion: '',
        recomendacion: '',
        foto: false,
        guardarRecomendacion: false,
        guardarFalla: false,
    });

    let navigate = useNavigate();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext); 

    const actualizarState = (e) => {

        switch (e.target.name) {
            case 'foto':
                guardarDescripcion({
                    ...descripcion,
                    [e.target.name] : !descripcion.foto
                });
                break;
            
            case 'guardarFalla':
                guardarDescripcion({
                    ...descripcion,
                    [e.target.name] : !descripcion.guardarFalla
                });
                break;
            case 'guardarRecomendacion':
                guardarDescripcion({
                    ...descripcion,
                    [e.target.name] : !descripcion.guardarRecomendacion
                });
                break;
        default:
                guardarDescripcion({
                    ...descripcion,
                    [e.target.name] : e.target.value
                });
                break;
        }

    }

    const validarForm = () => {

        if( !(!descripcion.descripcion.length) ){
            return false;
        }

        return true;

    }

    const enviar = async (e) => {

        e.preventDefault();
        
        if (descripcion.guardarRecomendacion) {
            guardarRecomendacionSistema();
        }

        if(descripcion.guardarFalla) {
            guardarFallaSistema();
        }

        guardarDatosTercero(descripcion);
    }

    const guardarFallaSistema = async () => {
        try {

            await clienteAxios.put(`tipo/falla/${descripcion?.id}`, { descripcion: descripcion.descripcion }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    const guardarRecomendacionSistema = async () => {
        try {

            await clienteAxios.put(`tipo/recomendacion/${descripcion?.id}`, { recomendacion: descripcion.recomendacion }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    const consultarAPI = async () => {
        
        try {

            const res = await clienteAxios.get(`tipo/falla/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarDescripcion({
                id: res.data.id,
                nombre: res.data.nombre,
                conclusion: '',
                descripcion: res.data.descripcion,
                recomendacion: res.data.recomendacion,
                foto: false,
                guardarRecomendacion: false,
                guardarFalla: false,
            });

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

        <h2 className='modal__subtitulo'>Autocompletado para el tipo de herramienta: {descripcion.nombre}.</h2>

            <form onSubmit={enviar}>
                
                <div className='campo'>
                    <label htmlFor="descripcion">Falla<span className='campo__obligatorio'>*</span>:</label>
                    <textarea 
                        name="descripcion" 
                        id="descripcion" 
                        cols="30" 
                        rows="5"
                        defaultValue={descripcion.descripcion}
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
                        defaultValue={descripcion.recomendacion}
                        onChange={actualizarState}
                    />                 
                </div>

                <div className='campo_check'>
                    <input type="checkbox" name="guardarFalla" id="guardarFalla" onChange={actualizarState} />
                    <label htmlFor="guardarFalla">Guardar cambios en FALLA para el tipo de herramienta: {descripcion.nombre}.</label>
                </div>

                <div className='campo_check'>
                    <input type="checkbox" name="guardarRecomendacion" id="guardarRecomendacion" onChange={actualizarState} />
                    <label htmlFor="guardarRecomendacion">Guardar cambios en RECOMENDACIÓN para el tipo de herramienta: {descripcion.nombre}.</label>
                </div>
                
                <div className='campo_check'>
                    <input type="checkbox" name="foto" id="foto" onChange={actualizarState} />
                    <label htmlFor="foto">Generar hoja adicional con la foto galería sobrante.</label>
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
