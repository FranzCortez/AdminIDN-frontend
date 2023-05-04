import { Fragment, useState, useEffect, useContext } from "react";
import { AiOutlineDownload } from "react-icons/ai";

import TablaResumenOtin from "./componenteBalance/TablaResumenOtin";
import TablaOtin from "./componenteBalance/TablaOtin";
import GraficoTortaComparacion from "./componenteBalance/GraficoTortaComparacion";

import clienteAxios from "../../config/axios";
import { CRMContext } from "../context/CRMContext";

function IngresoOtinAño({ pdfcrear, cambioActivo }) {

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

    const [ otinPrimero, guardarOtinPrimero ] = useState([]);
    const [ totalPrimero, guardarTotalPrimero ] = useState([]);
    const [ cantidadPrimero, guardarCantidadPrimero ] = useState(0);
    
    const [ otinSegundo, guardarOtinSegundo ] = useState([]);
    const [ totalSegundo, guardarTotalSegundo ] = useState([]);
    const [ cantidadSegundo, guardarCantidadSegundo ] = useState(0);

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
        
        const res = await clienteAxios.post('/ih/ingreso/mes', fecha,{
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        return { data: res.data, resultado: res.data.length };
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

    // obtiene ingresos de otin anual año 2
    const obtnerOtinAnualSegundo = async () => {

        try {
            
            const otinAño = [];
            const total = [];
            const info = [];
            
            const enero = await consultarPrimero({mes: 1, año: fechaSegundo.año});
            otinAño.push(enero.data);
            total.push(enero.resultado);
            info.push({ name:'Enero', value: enero.resultado });
            
            const febrero = await consultarPrimero({mes: 2, año: fechaSegundo.año});
            otinAño.push(febrero.data);
            total.push(febrero.resultado);
            info.push({ name:'Febrero', value: febrero.resultado });
            
            const marzo = await consultarPrimero({mes: 3, año: fechaSegundo.año});
            otinAño.push(marzo.data);
            total.push(marzo.resultado);
            info.push({ name:'Marzo', value: marzo.resultado });
            
            const abril = await consultarPrimero({mes: 4, año: fechaSegundo.año});
            otinAño.push(abril.data);
            total.push(abril.resultado);
            info.push({ name:'Abril', value: abril.resultado });
            
            const mayo = await consultarPrimero({mes: 5, año: fechaSegundo.año});
            otinAño.push(mayo.data);
            total.push(mayo.resultado);
            info.push({ name:'Mayo', value: mayo.resultado });
            
            const junio = await consultarPrimero({mes: 6, año: fechaSegundo.año});
            otinAño.push(junio.data);
            total.push(junio.resultado);
            info.push({ name:'Junio', value: junio.resultado });
            
            const julio = await consultarPrimero({mes: 7, año: fechaSegundo.año});
            otinAño.push(julio.data);
            total.push(julio.resultado);
            info.push({ name:'Julio', value: julio.resultado });
            
            const agosto = await consultarPrimero({mes: 8, año: fechaSegundo.año});
            otinAño.push(agosto.data);
            total.push(agosto.resultado);
            info.push({ name:'Agosto', value: agosto.resultado });
            
            const septiembre = await consultarPrimero({mes: 9, año: fechaSegundo.año});
            otinAño.push(septiembre.data);
            total.push(septiembre.resultado);
            info.push({ name:'Septiembre', value: septiembre.resultado });
            
            const octubre = await consultarPrimero({mes: 10, año: fechaSegundo.año});
            otinAño.push(octubre.data);
            total.push(octubre.resultado);
            info.push({ name:'Octubre', value: octubre.resultado });
            
            const noviembre = await consultarPrimero({mes: 11, año: fechaSegundo.año});
            otinAño.push(noviembre.data);
            total.push(noviembre.resultado);
            info.push({ name:'Noviembre', value: noviembre.resultado });
            
            const diciembre = await consultarPrimero({mes: 12, año: fechaSegundo.año});
            otinAño.push(diciembre.data);
            total.push(diciembre.resultado);
            info.push({ name:'Diciembre', value: diciembre.resultado });
            
            guardarTotalSegundo(total);
            guardarOtinSegundo(otinAño);
            guardarInfoGraficoSegundo(info);

            let cantidad = 0;

            total.forEach( element => cantidad+=element )

            guardarCantidadSegundo(cantidad)

        } catch (error) {
            console.log(error);
        }

    }

    // obtiene ingresos de otin anual 1
    const obtnerOtinAnualPrimero = async () => {

        try {
            
            const otinAño = [];
            const total = [];
            const info = [];
            
            const enero = await consultarPrimero({mes: 1, año: fechaPrimero.año});
            otinAño.push(enero.data);
            total.push(enero.resultado);
            info.push({ name:'Enero', value: enero.resultado });
            
            const febrero = await consultarPrimero({mes: 2, año: fechaPrimero.año});
            otinAño.push(febrero.data);
            total.push(febrero.resultado);
            info.push({ name:'Febrero', value: febrero.resultado });
            
            const marzo = await consultarPrimero({mes: 3, año: fechaPrimero.año});
            otinAño.push(marzo.data);
            total.push(marzo.resultado);
            info.push({ name:'Marzo', value: marzo.resultado });
            
            const abril = await consultarPrimero({mes: 4, año: fechaPrimero.año});
            otinAño.push(abril.data);
            total.push(abril.resultado);
            info.push({ name:'Abril', value: abril.resultado });
            
            const mayo = await consultarPrimero({mes: 5, año: fechaPrimero.año});
            otinAño.push(mayo.data);
            total.push(mayo.resultado);
            info.push({ name:'Mayo', value: mayo.resultado });
            
            const junio = await consultarPrimero({mes: 6, año: fechaPrimero.año});
            otinAño.push(junio.data);
            total.push(junio.resultado);
            info.push({ name:'Junio', value: junio.resultado });
            
            const julio = await consultarPrimero({mes: 7, año: fechaPrimero.año});
            otinAño.push(julio.data);
            total.push(julio.resultado);
            info.push({ name:'Julio', value: julio.resultado });
            
            const agosto = await consultarPrimero({mes: 8, año: fechaPrimero.año});
            otinAño.push(agosto.data);
            total.push(agosto.resultado);
            info.push({ name:'Agosto', value: agosto.resultado });
            
            const septiembre = await consultarPrimero({mes: 9, año: fechaPrimero.año});
            otinAño.push(septiembre.data);
            total.push(septiembre.resultado);
            info.push({ name:'Septiembre', value: septiembre.resultado });
            
            const octubre = await consultarPrimero({mes: 10, año: fechaPrimero.año});
            otinAño.push(octubre.data);
            total.push(octubre.resultado);
            info.push({ name:'Octubre', value: octubre.resultado });
            
            const noviembre = await consultarPrimero({mes: 11, año: fechaPrimero.año});
            otinAño.push(noviembre.data);
            total.push(noviembre.resultado);
            info.push({ name:'Noviembre', value: noviembre.resultado });
            
            const diciembre = await consultarPrimero({mes: 12, año: fechaPrimero.año});
            otinAño.push(diciembre.data);
            total.push(diciembre.resultado);
            info.push({ name:'Diciembre', value: diciembre.resultado });
            
            guardarTotalPrimero(total);
            guardarOtinPrimero(otinAño);
            guardarInfoGrafico(info);

            let cantidad = 0;

            total.forEach( element => cantidad+=element )

            guardarCantidadPrimero(cantidad)

        } catch (error) {
            console.log(error);
        }

    }

    const descargar = () => {
        cambioActivo();
        pdfcrear(`Balance Anual Ingreso ${fechaPrimero.año} VS Factura ${fechaSegundo.año}`, "#IngresoOtinAño", "a2", "portrait");
    }

    useEffect(() => {
        obtenerAños();

        if ( fechaPrimero.año !== 0 ){
            obtnerOtinAnualPrimero();
        }

        if ( fechaSegundo.año !== 0 ){
            obtnerOtinAnualSegundo();
        }

    },[fechaPrimero, fechaSegundo]);

    return (
        <Fragment>
            <div 
                id="btnCrearPdf" 
                className='btn-new btn-login' 
                onClick={descargar}
            >
                Descargar Balance Ingreso de OTIN Año VS Año
                <AiOutlineDownload size={25} />
            </div>
            <h2 className='card-body-subtitle'>Ingreso OTIN Año VS Año</h2>

            <form onSubmit={e => e.preventDefault()}>
                <div className='campo'>
                    <label htmlFor="año">Seleccione Año 1 Ingreso OTIN:</label>
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
                    <label htmlFor="año">Seleccione Año 2 Ingreso OTIN:</label>
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

            <div id="IngresoOtinAño">
                {
                    otinPrimero.length > 0 && otinSegundo.length > 0 ?
                        <Fragment>

                            <TablaResumenOtin meses={meses} data={totalPrimero} año={fechaPrimero.año} total={cantidadPrimero} tipo={'Ingreso OTIN'} />
                            <TablaResumenOtin meses={meses} data={totalSegundo} año={fechaSegundo.año} total={cantidadSegundo} tipo={'Ingreso OTIN'} />

                            <GraficoTortaComparacion
                                data01={infoGrafico}
                                data02={infoGraficoSegundo}
                            />

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[0]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[0]} total={totalPrimero[0]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[0]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[0]} total={totalSegundo[0]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[1]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[1]} total={totalPrimero[1]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[1]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[1]} total={totalSegundo[1]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[2]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[2]} total={totalPrimero[2]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[2]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[2]} total={totalSegundo[2]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[3]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[3]} total={totalPrimero[3]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[3]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[3]} total={totalSegundo[3]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[4]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[4]} total={totalPrimero[4]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[4]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[4]} total={totalSegundo[4]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[5]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[5]} total={totalPrimero[5]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[5]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[5]} total={totalSegundo[5]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[6]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[6]} total={totalPrimero[6]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[6]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[6]} total={totalSegundo[6]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[7]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[7]} total={totalPrimero[7]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[7]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[7]} total={totalSegundo[7]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[8]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[8]} total={totalPrimero[8]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[8]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[8]} total={totalSegundo[8]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[9]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[9]} total={totalPrimero[9]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[9]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[9]} total={totalSegundo[9]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[10]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[10]} total={totalPrimero[10]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[10]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[10]} total={totalSegundo[10]} />
                                </div>
                            </div>

                            <div className="balance_tablas">
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[11]} de {fechaPrimero.año} 
                                    </h2>
                                    <TablaOtin data={otinPrimero[11]} total={totalPrimero[11]} />
                                </div>
                                <div>
                                    <h2 className='card-body-subtitle'>
                                        Ingreso OTIN {meses[11]} de {fechaSegundo.año} 
                                    </h2>
                                    <TablaOtin data={otinSegundo[11]} total={totalSegundo[11]} />
                                </div>
                            </div>

                        </Fragment>
                    :
                        null
                }
            </div>

        </Fragment>
    )
}

export default IngresoOtinAño
