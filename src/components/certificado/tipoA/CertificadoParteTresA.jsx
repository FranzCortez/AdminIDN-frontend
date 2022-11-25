import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function CertificadoParteTresA({ guardarDatosTercero }) {

    const { id } = useParams();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const [ datos, guardarDatos ] = useState({
        operativo: '',
        proximaMantencion: ''
    });

    const actualizarState = (e) => {
        
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {

        const { operativo, proximaMantencion } = datos;
        
        if( !(!proximaMantencion.length || !operativo.length) ){
            return false;
        }

        return true;

    }

    const enviar = (e) => {
        e.preventDefault();
        guardarDatosTercero(datos);
    }

    const consultarAPI = async () => {
        try {
            const res = await clienteAxios.get(`qr/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarDatos({
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
                    datos.proximaMantencion === '' ?
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
                        defaultValue={datos.proximaMantencion}
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