import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

function InformeParteTres({ onButtonClick, guardarDatosTercero, tercero, datosInfo }) {

    const { id } = useParams();

    const [ descripcion, guardarDescripcion ] = useState({
        conclusion: tercero?.conclusion ? tercero.conclusion.join('\n') : '',
        descripcion: tercero?.descripcion ? tercero.descripcion.join('\n') : '',
        recomendacion: tercero?.recomendacion ? tercero.recomendacion.join('\n') : '',
        foto: tercero?.foto ? tercero.foto : false,
        guardarRecomendacion: tercero?.guardarRecomendacion ? tercero.guardarRecomendacion : false,
        guardarConclusion: tercero?.guardarConclusion ? tercero.guardarConclusion : false,
        guardarFalla: tercero?.guardarFalla ? tercero.guardarFalla : false,
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
            case 'guardarConclusion':
                guardarDescripcion({
                    ...descripcion,
                    [e.target.name] : !descripcion.guardarConclusion
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

        if(descripcion.guardarConclusion) {
            guardarConclusionSistema();
        }

        guardarDatosTercero(descripcion);
    }

    const regresar = () => {
        onButtonClick("pagetwo");
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

    const guardarConclusionSistema = async () => {
        try {

            await clienteAxios.put(`tipo/conclusion/${descripcion?.id}`, { conclusion: descripcion.conclusion }, {
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
                conclusion: res.data.conclusion,
                descripcion: res.data.descripcion,
                recomendacion: res.data.recomendacion,
                foto: false,
                guardarRecomendacion: false,
                guardarFalla: false,
            });

            if ( datosInfo.tecnico ) {
                if ( descripcion.conclusion != datosInfo.conclusion || descripcion.descripcion != datosInfo.fallaText || descripcion.recomendacion != datosInfo.recomendacion ) {
                    guardarDescripcion({
                        ...descripcion,
                        conclusion: datosInfo.conclusion,
                        recomendacion: datosInfo.recomendacion,
                        descripcion: datosInfo.fallaText
                    });
                }
            }

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
                    <label htmlFor="conclusion">Conclusión:</label>
                    <textarea 
                        name="conclusion" 
                        id="conclusion" 
                        cols="30" 
                        rows="5"
                        defaultValue={descripcion.conclusion}
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
                    <input type="checkbox" name="guardarConclusion" id="guardarConclusion" onChange={actualizarState} />
                    <label htmlFor="guardarConclusion">Guardar cambios en CONCLUSIÓN para el tipo de herramienta: {descripcion.nombre}.</label>
                </div>

                <div className='campo_check'>
                    <input type="checkbox" name="guardarRecomendacion" id="guardarRecomendacion" onChange={actualizarState} />
                    <label htmlFor="guardarRecomendacion">Guardar cambios en RECOMENDACIÓN para el tipo de herramienta: {descripcion.nombre}.</label>
                </div>
                
                <div className='campo_check'>
                    <input type="checkbox" name="foto" id="foto" onChange={actualizarState} />
                    <label htmlFor="foto">Generar hoja adicional con la foto galería sobrante.</label>
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
                            value="Generar Informe"
                            disabled={validarForm()}
                        />
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default InformeParteTres;
