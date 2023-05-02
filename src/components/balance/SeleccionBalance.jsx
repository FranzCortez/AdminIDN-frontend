import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoGraph } from 'react-icons/go';
import html2pdf from 'html2pdf.js';

import FacturacionMes from './FacturacionMes';
import IngresoMes from './IngresoMes';
import IngresoFacturaMes from './IngresoFacturaMes';

import FacturacionAño from './FacturacionAño';
import IngresoAño from './IngresoAño';
import IngresoFacturaAño from './IngresoFacturaAño';

import { CRMContext } from '../context/CRMContext';

function SeleccionBalance() {

    const [ auth, guardarAuth ] = useContext(CRMContext);

    const [ tipoBalance, guardarTipoBalance ] = useState(0);
    const [ activo, guardarActivo ] = useState(true);

    let navigate = useNavigate();

    const seleccionTipo = ( e ) => {
        guardarTipoBalance(parseInt(e.target.value));
    }

    const cambioActivo = () => {
        guardarActivo(!activo);
    }

    const pdfcrear = async ( nombre, archivo, tamaño, horientacion ) => {

        if (!activo) {
            return;
        }

        await html2pdf()
        .set({
            margin: 0,
            filename: `${nombre}.pdf`,
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 3, // A mayor escala, mejores gráficos
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: tamaño,
                orientation: horientacion // landscape o portrait
            }
        })
        .from(document.querySelector(archivo))
        .save()
        .toPdf()
        .output('blob');

        cambioActivo();
    }

    useEffect(() => {
        if(auth.token !== '' && auth.tipo === 1 ) {
            localStorage.setItem('ultima', `/balance`);
        } else {
            navigate('/login', {replace: true});
        }  
    },[])

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <GoGraph size={50} color={"#333333"}/>
                    <h1> Balance </h1>
                </div>
                <div className="card-body">

                    <h2 className='card-body-subtitle'>
                        Para empezar seleccione una opción 
                    </h2>

                    <form onSubmit={e => e.preventDefault()}>
                        <div className='campo'>
                            <label htmlFor="tipo">Seleccione Tipo de Balance:</label>
                            <select name="tipo" id="tipo" defaultValue={tipoBalance} onChange={seleccionTipo} >
                                <option value={0} disabled> -- Seleccione -- </option>    
                                <option value={1} > Facturación por mes </option>    
                                <option value={2} > Ingreso por mes </option>    
                                <option value={3} > Ingreso Mes VS Factura Mes </option>    
                                <option value={4} > Facturación por año </option>    
                                <option value={5} > Ingreso por año </option>    
                                <option value={6} > Ingreso año vs Factura año </option>    
                                <option value={7} > Por empresa </option>    
                            </select>                  
                        </div> 
                    </form>

                    {
                        tipoBalance === 1 ?
                        <FacturacionMes pdfcrear={pdfcrear} cambioActivo={cambioActivo} />
                        :
                        tipoBalance === 2 ?
                        <IngresoMes pdfcrear={pdfcrear} cambioActivo={cambioActivo} />
                        :
                        tipoBalance === 3 ?
                        <IngresoFacturaMes pdfcrear={pdfcrear} cambioActivo={cambioActivo} />
                        :
                        tipoBalance === 4 ?
                        <FacturacionAño pdfcrear={pdfcrear} cambioActivo={cambioActivo} />
                        :
                        tipoBalance === 5 ?
                        <IngresoAño pdfcrear={pdfcrear} cambioActivo={cambioActivo} />
                        :
                        tipoBalance === 6 ?
                        <IngresoFacturaAño pdfcrear={pdfcrear} cambioActivo={cambioActivo} />
                        :
                        null
                    }
                    
                </div>
            </div>
        </Fragment>
    )
}

export default SeleccionBalance;
