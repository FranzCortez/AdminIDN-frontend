import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoGraph } from 'react-icons/go';

import FacturacionMes from './FacturacionMes';

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
                                <option value={3} > Facturación por año </option>    
                                <option value={4} > Ingreso por año </option>    
                                <option value={5} > Ingreso vs Factura </option>    
                                <option value={6} > Por empresa </option>    
                            </select>                  
                        </div> 
                    </form>

                    {
                        tipoBalance === 1 ?

                        <FacturacionMes/>
                        : null
                    }
                    
                </div>
            </div>
        </Fragment>
    )
}

export default SeleccionBalance;
