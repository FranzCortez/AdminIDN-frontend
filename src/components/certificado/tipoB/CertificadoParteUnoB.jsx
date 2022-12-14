import React, { Fragment, useState, useEffect, useContext } from 'react';

import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';

function CertificadoParteUnoB({ onButtonClick, guardarDatosPrimero, id }) {

    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`
    
    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const [ datos, guardarDatos ] = useState({
        fechaEmicion: fechaActual,        
        fechaComparacion: "",
        unidad: '',
        rango: '', 
        resolucion: '',
        fechaCalibracion: '',

        patron: 'CERTIFICATE',
        numeroSeriePatron: '413880020',
        marcaPatron: 'CDI',
        modeloPatron: '10005-F-DTT',
        unidadPatron: 'Lbrs/pie',
        rangoPatron: '0-1000',
        resolucionPatron: '0.1',
        fechaCalibracionPatron: "2021-12-15",
        proximaMantencion: ''
    });

    const actualizarState = (e) => {
        
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {

        const { fechaEmicion, fechaCalibracionPatron, fechaComparacion, unidad, rango, resolucion, patron, unidadPatron, numeroSeriePatron, marcaPatron, modeloPatron, rangoPatron, resolucionPatron, fechaCalibracion, proximaMantencion } = datos;

        if( !(!fechaCalibracionPatron.length || !fechaEmicion.length || !unidad.length || !rango.length || !resolucion.length || !patron.length || !numeroSeriePatron.length || !marcaPatron.length || !modeloPatron.length || !fechaComparacion.length || !unidadPatron.length || !rangoPatron.length || !resolucionPatron.length || !fechaCalibracion.length || !proximaMantencion.length) ){
            return false;
        }

        return true;

    }

    const enviar = (e) => {
        e.preventDefault();
        onButtonClick("pagetwo");
        guardarDatosPrimero(datos);
    }

    const consultarAPI = async () => {
        try {
            const res = await clienteAxios.get(`qr/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarDatos({
                ...datos,
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
                <label htmlFor="fechaEmicion">Fecha Emici??n<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="date" 
                    id='fechaEmicion'
                    name='fechaEmicion'
                    defaultValue={datos.fechaEmicion}
                    onChange={actualizarState}
                />
            </div>

            <h2 className="card-body-subtitle">Trazabilidad</h2>
                   
            <div className='campo'>
                <label htmlFor="patron">Instrumento Patr??n<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="text" 
                    id='patron'
                    name='patron'
                    placeholder='Instrumento Patr??n'
                    defaultValue={datos.patron}
                    onChange={actualizarState}
                />
            </div>
                   
            <div className='campo'>
                <label htmlFor="numeroSeriePatron">N?? de Serie<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="text" 
                    id='numeroSeriePatron'
                    name='numeroSeriePatron'
                    placeholder='N?? de Serie'
                    defaultValue={datos.numeroSeriePatron}
                    onChange={actualizarState}
                />
            </div>
                   
            <div className='campo'>
                <label htmlFor="marcaPatron">Marca<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="text" 
                    id='marcaPatron'
                    name='marcaPatron'
                    placeholder='Marca'
                    defaultValue={datos.marcaPatron}
                    onChange={actualizarState}
                />
            </div>
                   
            <div className='campo'>
                <label htmlFor="modeloPatron">Modelo<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="text" 
                    id='modeloPatron'
                    name='modeloPatron'
                    placeholder='Modelo'
                    defaultValue={datos.modeloPatron}
                    onChange={actualizarState}
                />
            </div>
                   
            <div className='campo'>
                <label htmlFor="unidadPatron">Unidad<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="text" 
                    id='unidadPatron'
                    name='unidadPatron'
                    placeholder='ejem: Lbrs/pie'
                    defaultValue={datos.unidadPatron}
                    onChange={actualizarState}
                />
            </div>
                   
            <div className='campo'>
                <label htmlFor="rangoPatron">Rango<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="text" 
                    id='rangoPatron'
                    name='rangoPatron'
                    placeholder='Rango'
                    defaultValue={datos.rangoPatron}
                    onChange={actualizarState}
                />
            </div>
                   
            <div className='campo'>
                <label htmlFor="resolucionPatron">Resoluci??n<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="text" 
                    id='resolucionPatron'
                    name='resolucionPatron'
                    placeholder='Resoluci??n'
                    defaultValue={datos.resolucionPatron}
                    onChange={actualizarState}
                />
            </div>
                   
            <div className='campo'>
                <label htmlFor="fechaCalibracionPatron">Fecha Calibraci??n<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="date" 
                    id='fechaCalibracionPatron'
                    name='fechaCalibracionPatron'
                    defaultValue={datos.fechaCalibracionPatron}
                    onChange={actualizarState}
                />
            </div>

            <h2 className="card-body-subtitle">Equipo a Certificar</h2>

            <div className='campo'>
                <label htmlFor="unidad">Unidad<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="text" 
                    id='unidad'
                    name='unidad'
                    placeholder='Unidad del Equipo'
                    defaultValue={datos.unidad}
                    onChange={actualizarState}
                />
            </div>

            <div className='campo'>
                <label htmlFor="rango">Rango<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="text" 
                    id='rango'
                    name='rango'
                    placeholder='Rango del Equipo'
                    defaultValue={datos.rango}
                    onChange={actualizarState}
                />
            </div>

            <div className='campo'>
                <label htmlFor="resolucion">Resoluci??n<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="text" 
                    id='resolucion'
                    name='resolucion'
                    placeholder='Resoluci??n del Equipo'
                    defaultValue={datos.resolucion}
                    onChange={actualizarState}
                />
            </div>

            <div className='campo'>
                <label htmlFor="fechaComparacion">Fecha Comparaci??n<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="date" 
                    id='fechaComparacion'
                    name='fechaComparacion'
                    defaultValue={datos.fechaComparacion}
                    onChange={actualizarState}
                />
            </div>

            <div className='campo'>
                <label htmlFor="fechaCalibracion">Fecha Calibraci??n<span className='campo__obligatorio'>*</span>:</label>
                <input 
                    type="date" 
                    id='fechaCalibracion'
                    name='fechaCalibracion'
                    defaultValue={datos.fechaCalibracion}
                    onChange={actualizarState}
                />
            </div>

            {
                datos.proximaMantencion === '' ?
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
                    defaultValue={datos.proximaMantencion}
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

export default CertificadoParteUnoB;