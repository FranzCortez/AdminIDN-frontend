import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function CertificadoParteTresA({ onButtonClick, guardarDatosTercero, tercero }) {

    const { id } = useParams();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);
    
    const [ data, guardarData ] = useState({
        operativo: tercero?.operativo ? tercero.operativo : 0,
        proximaMantencion: tercero?.proximaMantencion ? tercero?.proximaMantencion : ''
    });

    const actualizarState = (e) => {
        
        guardarData({
            ...data,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {

        const { operativo, proximaMantencion } = data;
        
        if( (proximaMantencion !== '' && operativo !== 0) || ( tercero.proximaMantencion && tercero?.proximaMantencion !== '' && tercero?.operativo !== 0 ) ){
            return false;
        }

        return true;

    }

    const enviar = () => {
        onButtonClick("pagethree");
        
        if ( tercero.proximaMantencion && data.proximaMantencion !== tercero.proximaMantencion && data.proximaMantencion === '' && data.operativo === 0) {
            guardarDatosTercero(tercero)
        } else {
            const guardar = data;
            guardar.operativo = guardar.operativo === '' || guardar.operativo === 0 ? tercero.operativo : guardar.operativo;
            guardar.proximaMantencion = guardar.proximaMantencion === '' || guardar.proximaMantencion === 0 ? tercero.proximaMantencion : guardar.proximaMantencion;
            guardarDatosTercero(guardar);
        }

    }

    const consultarAPI = async () => {
        try {
            const res = await clienteAxios.get(`qr/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            // manesentao
            guardarData({
                operativo: '',
                proximaMantencion: res?.data ? res.data.proxima : ''
            })

        } catch (error) {
            console.log(error)
        }
    }

    const regresar = () => {
        onButtonClick("pageone")
    }

    const avanzar = (event) => {
        if (event.keyCode === 13 && event.target.nodeName === "INPUT" && event.target.type !== 'submit') {
            var form = event.target.form;
            var index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

    useEffect(() => {
        consultarAPI();
    },[]);

    return (
        <Fragment>
            <form onSubmit={e => e.preventDefault()} onKeyDown={avanzar} >
                
                <h3 className='text-center' >En caso de "Dar de Baja" seleccione una fecha al azar</h3>

                <div className='campo'>
                    <label htmlFor="operativo">Estado<span className='campo__obligatorio'>*</span>:</label>
                    <select name="operativo" id="operativo" onChange={actualizarState} defaultValue={data.operativo}>
                        <option value={0} disabled> -- Seleccione -- </option>    
                        <option value={true}>Operativo</option>
                        <option value={false}>Dar de Baja</option>
                    </select>
                </div>

                {
                    data.proximaMantencion === '' ?
                        <h3 className='text-center' >Aún no se ha generado un codigo QR para saber la próxima mantención, ingrese una fecha y asegúrese que coincida con la que pondrá en el QR</h3>
                    :
                        null                        
                }

                <div className='campo'>
                    <label htmlFor="proximaMantencion">Próxima Mantención<span className='campo__obligatorio'>*</span>:</label>
                    <input 
                        type="date" 
                        id='proximaMantencion'
                        name='proximaMantencion'
                        defaultValue={data.proximaMantencion}
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
                            onClick={enviar}
                        />
                    </div>
                </div>

            </form>
        </Fragment>
    )
}

export default CertificadoParteTresA;