import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoGraph } from 'react-icons/go';

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

    let navigate = useNavigate();

    const seleccionTipo = ( e ) => {
        guardarTipoBalance(parseInt(e.target.value));
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
                        <FacturacionMes/>
                        :
                        tipoBalance === 2 ?
                        <IngresoMes/>
                        :
                        tipoBalance === 3 ?
                        <IngresoFacturaMes/>
                        :
                        tipoBalance === 4 ?
                        <FacturacionAño/>
                        :
                        tipoBalance === 5 ?
                        <IngresoAño/>
                        :
                        tipoBalance === 6 ?
                        <IngresoFacturaAño/>
                        :
                        null
                    }
                    
                </div>
            </div>
        </Fragment>
    )
}

export default SeleccionBalance;
