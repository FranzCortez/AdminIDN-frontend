import { Fragment, useState, useEffect, useContext } from "react";

import TablaResumen from "./componenteBalance/TablaResumen";
import TablaBalance from "./componenteBalance/TablaBalance";
import GraficoTortaComparacion from "./componenteBalance/GraficoTortaComparacion";

import clienteAxios from "../../config/axios";
import { CRMContext } from "../context/CRMContext";

function IngresoFacturaAño() {

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
        año: 0
    });
    const [ fechaSegundo, guardarFechaSegundo ] = useState({
        año: 0
    });

    const [ facturaPrimero, guardarFacturaPrimero ] = useState([]);
    const [ totalMes, guardarTotalMes ] = useState([]);
    const [ totalPrimero, guardarTotalPrimero ] = useState(0);
    
    const [ facturaSegundo, guardarFacturaSegundo ] = useState([]);
    const [ totalMesSegundo, guardarTotalMesSegundo ] = useState([]);
    const [ totalSegundo, guardarTotalSegundo ] = useState(0);

    const [ infoGrafico, guardarInfoGrafico ] = useState([]);
    const [ infoGraficoSegundo, guardarInfoGraficoSegundo ] = useState([]);

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
    const consultarPrimero = async (fecha) => {
        
        const res = await clienteAxios.post('/factura/balance/ingreso/mes', fecha,{
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        let resultado = 0;

        res.data.forEach(data => {
            resultado += data?.monto;
        });

        return { data: res.data, resultado };
    } 

    //  Obtiene info de la primera fecha
    const consultarSegundo = async (fecha) => {
        
        const res = await clienteAxios.post('/factura/balance/factura/mes', fecha,{
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        let resultado = 0;

        res.data.forEach(data => {
            resultado += data?.monto;
        });

        return { data: res.data, resultado };
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

    // obtiene factura anual
    const obtnerFacturaAnual = async () => {

        try {
            
            const facturaAño = [];
            const totalMes = [];
            const info = [];
            
            const enero = await consultarSegundo({mes: 1, año: fechaSegundo.año});
            facturaAño.push(enero.data);
            totalMes.push(enero.resultado);
            info.push({ name:'Enero', value: enero.resultado });
            
            const febrero = await consultarSegundo({mes: 2, año: fechaSegundo.año});
            facturaAño.push(febrero.data);
            totalMes.push(febrero.resultado);
            info.push({ name:'Febrero', value: febrero.resultado });
            
            const marzo = await consultarSegundo({mes: 3, año: fechaSegundo.año});
            facturaAño.push(marzo.data);
            totalMes.push(marzo.resultado);
            info.push({ name:'Marzo', value: marzo.resultado });
            
            const abril = await consultarSegundo({mes: 4, año: fechaSegundo.año});
            facturaAño.push(abril.data);
            totalMes.push(abril.resultado);
            info.push({ name:'Abril', value: abril.resultado });
            
            const mayo = await consultarSegundo({mes: 5, año: fechaSegundo.año});
            facturaAño.push(mayo.data);
            totalMes.push(mayo.resultado);
            info.push({ name:'Mayo', value: mayo.resultado });
            
            const junio = await consultarSegundo({mes: 6, año: fechaSegundo.año});
            facturaAño.push(junio.data);
            totalMes.push(junio.resultado);
            info.push({ name:'Junio', value: junio.resultado });
            
            const julio = await consultarSegundo({mes: 7, año: fechaSegundo.año});
            facturaAño.push(julio.data);
            totalMes.push(julio.resultado);
            info.push({ name:'Julio', value: julio.resultado });
            
            const agosto = await consultarSegundo({mes: 8, año: fechaSegundo.año});
            facturaAño.push(agosto.data);
            totalMes.push(agosto.resultado);
            info.push({ name:'Agosto', value: agosto.resultado });
            
            const septiembre = await consultarSegundo({mes: 9, año: fechaSegundo.año});
            facturaAño.push(septiembre.data);
            totalMes.push(septiembre.resultado);
            info.push({ name:'Septiembre', value: septiembre.resultado });
            
            const octubre = await consultarSegundo({mes: 10, año: fechaSegundo.año});
            facturaAño.push(octubre.data);
            totalMes.push(octubre.resultado);
            info.push({ name:'Octubre', value: octubre.resultado });
            
            const noviembre = await consultarSegundo({mes: 11, año: fechaSegundo.año});
            facturaAño.push(noviembre.data);
            totalMes.push(noviembre.resultado);
            info.push({ name:'Noviembre', value: noviembre.resultado });
            
            const diciembre = await consultarSegundo({mes: 12, año: fechaSegundo.año});
            facturaAño.push(diciembre.data);
            totalMes.push(diciembre.resultado);
            info.push({ name:'Diciembre', value: diciembre.resultado });
            
            guardarTotalMesSegundo(totalMes);
            guardarFacturaSegundo(facturaAño);
            guardarInfoGraficoSegundo(info);

            let total = 0;

            totalMes.forEach(data => {
                total += data;
            });

            guardarTotalSegundo(total);

        } catch (error) {
            console.log(error);
        }

    }

    // obtiene factura anual
    const obtnerIngresoAnual = async () => {

        try {
            
            const facturaAño = [];
            const totalMes = [];
            const info = [];
            
            const enero = await consultarPrimero({mes: 1, año: fechaPrimero.año});
            facturaAño.push(enero.data);
            totalMes.push(enero.resultado);
            info.push({ name:'Enero', value: enero.resultado });
            
            const febrero = await consultarPrimero({mes: 2, año: fechaPrimero.año});
            facturaAño.push(febrero.data);
            totalMes.push(febrero.resultado);
            info.push({ name:'Febrero', value: febrero.resultado });
            
            const marzo = await consultarPrimero({mes: 3, año: fechaPrimero.año});
            facturaAño.push(marzo.data);
            totalMes.push(marzo.resultado);
            info.push({ name:'Marzo', value: marzo.resultado });
            
            const abril = await consultarPrimero({mes: 4, año: fechaPrimero.año});
            facturaAño.push(abril.data);
            totalMes.push(abril.resultado);
            info.push({ name:'Abril', value: abril.resultado });
            
            const mayo = await consultarPrimero({mes: 5, año: fechaPrimero.año});
            facturaAño.push(mayo.data);
            totalMes.push(mayo.resultado);
            info.push({ name:'Mayo', value: mayo.resultado });
            
            const junio = await consultarPrimero({mes: 6, año: fechaPrimero.año});
            facturaAño.push(junio.data);
            totalMes.push(junio.resultado);
            info.push({ name:'Junio', value: junio.resultado });
            
            const julio = await consultarPrimero({mes: 7, año: fechaPrimero.año});
            facturaAño.push(julio.data);
            totalMes.push(julio.resultado);
            info.push({ name:'Julio', value: julio.resultado });
            
            const agosto = await consultarPrimero({mes: 8, año: fechaPrimero.año});
            facturaAño.push(agosto.data);
            totalMes.push(agosto.resultado);
            info.push({ name:'Agosto', value: agosto.resultado });
            
            const septiembre = await consultarPrimero({mes: 9, año: fechaPrimero.año});
            facturaAño.push(septiembre.data);
            totalMes.push(septiembre.resultado);
            info.push({ name:'Septiembre', value: septiembre.resultado });
            
            const octubre = await consultarPrimero({mes: 10, año: fechaPrimero.año});
            facturaAño.push(octubre.data);
            totalMes.push(octubre.resultado);
            info.push({ name:'Octubre', value: octubre.resultado });
            
            const noviembre = await consultarPrimero({mes: 11, año: fechaPrimero.año});
            facturaAño.push(noviembre.data);
            totalMes.push(noviembre.resultado);
            info.push({ name:'Noviembre', value: noviembre.resultado });
            
            const diciembre = await consultarPrimero({mes: 12, año: fechaPrimero.año});
            facturaAño.push(diciembre.data);
            totalMes.push(diciembre.resultado);
            info.push({ name:'Diciembre', value: diciembre.resultado });
            
            guardarTotalMes(totalMes);
            guardarFacturaPrimero(facturaAño);
            guardarInfoGrafico(info);

            let total = 0;

            totalMes.forEach(data => {
                total += data;
            });

            guardarTotalPrimero(total);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        obtenerAños();

        if ( fechaPrimero.año !== 0 ){
            obtnerIngresoAnual();
        }

        if ( fechaSegundo.año !== 0 ){
            obtnerFacturaAnual();
        }

    },[fechaPrimero, fechaSegundo]);

    return (
        <Fragment>
            <h2 className='card-body-subtitle'>Ingreso Año VS Facturación Año</h2>

            <form onSubmit={e => e.preventDefault()}>
                <div className='campo'>
                    <label htmlFor="año">Seleccione Año Ingreso:</label>
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

                <div className='campo'>
                    <label htmlFor="año">Seleccione Año Factura:</label>
                    <select name="año" id="año" defaultValue={fechaSegundo.año} onChange={guardarSegundo} >
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

            {
                facturaPrimero.length > 0 && facturaSegundo.length > 0 ?
                    <Fragment>

                        <TablaResumen meses={meses} data={totalMes} año={fechaPrimero.año} total={totalPrimero} tipo={'Ingreso'} />
                        <TablaResumen meses={meses} data={totalMesSegundo} año={fechaSegundo.año} total={totalSegundo} tipo={'Facturación'} />

                        <GraficoTortaComparacion
                            data01={infoGrafico}
                            data02={infoGraficoSegundo}
                        />

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[0]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[0]} total={totalMes[0]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[0]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[0]} total={totalMesSegundo[0]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[1]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[1]} total={totalMes[1]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[1]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[1]} total={totalMesSegundo[1]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[2]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[2]} total={totalMes[2]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[2]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[2]} total={totalMesSegundo[2]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[3]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[3]} total={totalMes[3]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[3]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[3]} total={totalMesSegundo[3]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[4]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[4]} total={totalMes[4]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[4]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[4]} total={totalMesSegundo[4]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[5]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[5]} total={totalMes[5]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[5]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[5]} total={totalMesSegundo[5]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[6]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[6]} total={totalMes[6]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[6]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[6]} total={totalMesSegundo[6]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[7]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[7]} total={totalMes[7]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[7]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[7]} total={totalMesSegundo[7]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[8]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[8]} total={totalMes[8]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[8]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[8]} total={totalMesSegundo[8]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[9]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[9]} total={totalMes[9]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[9]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[9]} total={totalMesSegundo[9]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[10]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[10]} total={totalMes[10]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[10]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[10]} total={totalMesSegundo[10]} />
                            </div>
                        </div>

                        <div className="balance_tablas">
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Ingreso {meses[11]} de {fechaPrimero.año} 
                                </h2>
                                <TablaBalance data={facturaPrimero[11]} total={totalMes[11]} />
                            </div>
                            <div>
                                <h2 className='card-body-subtitle'>
                                    Facturación {meses[11]} de {fechaSegundo.año} 
                                </h2>
                                <TablaBalance data={facturaSegundo[11]} total={totalMesSegundo[11]} />
                            </div>
                        </div>

                    </Fragment>
                :
                    null
            }
        </Fragment>
    )
}

export default IngresoFacturaAño
