import { Fragment, useState, useEffect, useContext } from "react";
import { AiOutlineDownload } from "react-icons/ai";

import TablaBalance from "./componenteBalance/TablaBalance";
import GraficoBarra from "./componenteBalance/GraficoBarra";

import clienteAxios from "../../config/axios";
import { CRMContext } from "../context/CRMContext";

function IngresoMes({ pdfcrear, cambioActivo }) {

    const [ auth, guardarAuth ] = useContext(CRMContext);

    const [ años, guardarAños ] = useState([]);
    const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    const [ fechaPrimero, guardarFechaPrimero ] = useState({
        mes: 0,
        año: 0
    });

    const [ facturaPrimero, guardarFacturaPrimero ] = useState([]);
    const [ totalPrimero, guardarTotalPrimero ] = useState(0);

    const [ fechaSegundo, guardarFechaSegundo ] = useState({
        mes: 0,
        año: 0
    });

    const [ facturaSegundo, guardarFacturaSegundo ] = useState([]);
    const [ totalSegundo, guardarTotalSegundo ] = useState(0);

    // guarda año y mes de la segunda
    const guardarPrimero = (e) => {
        guardarFechaPrimero({
            ...fechaPrimero,
            [e.target.name]: parseInt(e.target.value)
        });
    }    

    // guarda año y mes de la segunda
    const guardarSegundo = (e) => {
        guardarFechaSegundo({
            ...fechaSegundo,
            [e.target.name]: parseInt(e.target.value)
        });
    }

    //  Obtiene info de la primera fecha
    const consultarPrimero = async () => {
        
        const res = await clienteAxios.post('/factura/balance/ingreso/mes', fechaPrimero,{
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        
        guardarFacturaPrimero(res.data);

        let resultado = 0;

        res.data.forEach(data => {
            resultado += ( data?.monto + (data?.monto * .19) );
        });

        guardarTotalPrimero(resultado);
    } 

    // Obtiene info de la segunda fecha
    const consultarSegundo = async () => {

        const res = await clienteAxios.post('/factura/balance/ingreso/mes', fechaSegundo,{
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        guardarFacturaSegundo(res.data);

        let resultado = 0;

        res.data.forEach(data => {
            resultado += ( data?.monto + (data?.monto * .19) );
        });

        guardarTotalSegundo(resultado);
    } 

    // todos los años de registro
    const obtenerAños = () => {

        const añoActual = new Date().getFullYear();

        let inicio = 2022;

        const guardado = [];
        
        while(inicio <= añoActual) {

            guardado.push(inicio);

            inicio += 1;

        }

        guardarAños(guardado)
    }

    const descargar = () => {
        cambioActivo();
        pdfcrear(`Balance Ingreso ${meses[fechaPrimero.mes-1]} ${fechaPrimero.año} VS ${meses[fechaSegundo.mes-1]} ${fechaSegundo.año}`, "#ingresoMes", "a2", "portrait");
    }

    useEffect(() => {
        obtenerAños();

        if ( fechaPrimero.mes !== 0 && fechaPrimero.año !== 0 ){
            consultarPrimero();
        }

        if ( fechaSegundo.año !== 0 && fechaSegundo.mes !== 0 ) {
            consultarSegundo();
        }

    },[fechaPrimero, fechaSegundo]);

    return (
        <Fragment>

            <div 
                id="btnCrearPdf" 
                className='btn-new btn-login' 
                onClick={descargar}
            >
                Descargar Balance Ingreso por Mes
                <AiOutlineDownload size={25} />
            </div>

            <h2 className='card-body-subtitle'>Ingreso por Mes</h2>

            <form onSubmit={e => e.preventDefault()}>
                <div className='campo'>
                    <label htmlFor="mes">Seleccione Mes 1:</label>
                    <select name="mes" id="mes" defaultValue={fechaPrimero.mes} onChange={guardarPrimero} >
                        <option value={0} disabled> -- Seleccione -- </option>    
                        <option value={1} > Enero </option>    
                        <option value={2} > Febrero </option>    
                        <option value={3} > Marzo </option>    
                        <option value={4} > Abril </option>    
                        <option value={5} > Mayo </option>    
                        <option value={6} > Junio </option>    
                        <option value={7} > Julio </option>    
                        <option value={8} > Agosto </option>    
                        <option value={9} > Septiembre </option>    
                        <option value={10} > Octubre </option>    
                        <option value={11} > Noviembre </option>    
                        <option value={12} > Diciembre </option>    
                    </select>          

                    <label htmlFor="año">Seleccione Año:</label>
                    <select name="año" id="año" defaultValue={fechaPrimero.año} onChange={guardarPrimero} >
                        <option value={0} disabled> -- Seleccione -- </option>    
                        {
                            años.length !== 0 ?
                                años.map(año => (
                                    <option value={año} key={año} > {año} </option>
                                ))
                            :
                            null
                        }
                    </select>         
                </div> 

                <div className="campo">
                    <label htmlFor="mesComparar">Seleccione Mes 2:</label>            
                    <select name="mes" id="mesComparar" defaultValue={fechaSegundo.mes} onChange={guardarSegundo} >
                        <option value={0} > -- Seleccione -- </option>    
                        <option value={1} > Enero </option>    
                        <option value={2} > Febrero </option>    
                        <option value={3} > Marzo </option>    
                        <option value={4} > Abril </option>    
                        <option value={5} > Mayo </option>    
                        <option value={6} > Junio </option>    
                        <option value={7} > Julio </option>    
                        <option value={8} > Agosto </option>    
                        <option value={9} > Septiembre </option>    
                        <option value={10} > Octubre </option>    
                        <option value={11} > Noviembre </option>    
                        <option value={12} > Diciembre </option>    
                    </select> 

                    <label htmlFor="compararAño">Seleccione Año:</label>
                    <select name="año" id="compararAño" defaultValue={fechaSegundo.año} onChange={guardarSegundo} >
                        <option value={0} disabled> -- Seleccione -- </option>    
                        {
                            años.length !== 0 ?
                                años.map(año => (
                                    <option value={año} key={año} > {año} </option>
                                ))
                            :
                            null
                        }
                    </select>       
                </div>
            </form>

            <div id="ingresoMes" >
                {
                    facturaPrimero.length > 0 ?
                        <Fragment>
                            
                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso {meses[fechaPrimero.mes-1]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaBalance data={facturaPrimero} total={totalPrimero} />
                                </div>
                                {
                                    facturaSegundo.length > 0 ?
                                        <div>
                                            <h2 className='card-body-subtitle'>
                                                Ingreso {meses[fechaSegundo.mes-1]} de {fechaSegundo.año} 
                                            </h2>
                                            <TablaBalance data={facturaSegundo} total={totalSegundo} />
                                        </div>
                                    :
                                        null
                                }
                            </div>

                        </Fragment>
                    :
                        null
                }
                
                {
                    totalPrimero !== 0 && totalSegundo !== 0 ? 
                        <GraficoBarra 
                            totalPrimero={totalPrimero}
                            totalSegundo={totalSegundo}
                            texto={`Comparación Ingreso ${meses[fechaPrimero.mes-1]} de ${fechaPrimero.año} VS Ingreso ${meses[fechaSegundo.mes-1]} de ${fechaSegundo.año}`}
                            pv={`Ingreso ${meses[fechaPrimero.mes-1]} de ${fechaPrimero.año}`} 
                            uv={`Ingreso ${meses[fechaSegundo.mes-1]} de ${fechaSegundo.año}`}
                        />
                        :
                        null
                }
            </div>

        </Fragment>
    )
}

export default IngresoMes;