import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function CertificadoParteTresA({ guardarDatosTercero }) {

    const { id } = useParams();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const [ tercero, guardarTercero ] = useState({
        operativo: '',
        proximaMantencion: ''
    });

    const actualizarState = (e) => {
        
        guardarTercero({
            ...tercero,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {

        const { operativo, proximaMantencion } = tercero;
        
        if( !(!proximaMantencion.length || !operativo.length) ){
            return false;
        }

        return true;

    }

    const enviar = (e) => {
        e.preventDefault();
        guardarDatosTercero(tercero);
    }

    const consultarAPI = async () => {
        try {
            const res = await clienteAxios.get(`qr/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarTercero({
                operativo: '',
                proximaMantencion: res?.data ? res.data.proxima : ''
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        consultarAPI();
    },[]);

    return (
        <Fragment>
            <form onSubmit={enviar}>
                
                <div className='campo'>
                    <label htmlFor="operativo">Estado<span className='campo__obligatorio'>*</span>:</label>
                    <select name="operativo" id="operativo" onChange={actualizarState} defaultValue={0}>
                        <option value={0} disabled> -- Seleccione -- </option>    
                        <option value={true}>Operativo</option>
                        <option value={false}>Dar de Baja</option>
                    </select>
                </div>

                {
                    tercero.proximaMantencion === '' ?
                        <h3 className='text-center' >A??n no se ha generado un codigo QR para saber la pr??xima mantenci??n, ingrese una fecha y aseg??rese que coincida con la que pondr?? en el QR</h3>
                    :
                        null                        
                }

                <div className='campo'>
                    <label htmlFor="proximaMantencion">Pr??xima Mantenci??n<span className='campo__obligatorio'>*</span>:</label>
                    <input 
                        type="date" 
                        id='proximaMantencion'
                        name='proximaMantencion'
                        defaultValue={tercero.proximaMantencion}
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                        value="Generar Certificado"
                        disabled={validarForm()}
                    />
                </div>

            </form>
        </Fragment>
    )
}

export default CertificadoParteTresA;