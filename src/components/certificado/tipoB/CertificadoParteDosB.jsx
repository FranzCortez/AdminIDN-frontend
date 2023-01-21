import React, { Fragment, useState, useEffect } from 'react';

function CertificadoParteDosB({ onButtonClick, guardarDatosSegundo, rango, unidad, segundo }) {

    if ( segundo.llegadaFinal && segundo?.llegadaFinal[segundo?.llegadaFinal?.length-1].usado !== false ) {
        segundo.llegadaFinal.push({
            name: (parseInt(segundo.llegadaFinal[segundo.llegadaFinal.length - 1].name) + 1).toString(),
            numero: 0,
            usado:false
        });
    }

    if ( segundo.comparacionFinal && segundo?.comparacionFinal[segundo?.comparacionFinal?.length-1].usado !== false ) {
        segundo.comparacionFinal.push({
            name: (parseInt(segundo.comparacionFinal[segundo.comparacionFinal.length - 1].name) + 1).toString(),
            numero: 0,
            usado:false
        });
    }

    if ( segundo.entregaFinal && segundo?.entregaFinal[segundo?.entregaFinal?.length-1].usado !== false ) {
        segundo.entregaFinal.push({
            name: (parseInt(segundo.entregaFinal[segundo.entregaFinal.length - 1].name) + 1).toString(),
            numero: 0,
            usado:false
        });
    }

    const [ tabla, guardarTabla ] = useState({
        llegada: segundo.llegadaFinal ? segundo.llegadaFinal : [{
            name: '0',
            numero: 0,
            usado: false
        }],
        comparcion: segundo.comparacionFinal ? segundo.comparacionFinal : [{
            name: '0',
            numero: 0,
            usado: false
        }],
        entrega: segundo.entregaFinal ? segundo.entregaFinal : [{
            name: '0',
            numero: 0,
            usado: false
        }],
    });    

    const actualizarInstrumentoI = (e) => {

        const existe = tabla.llegada.find(dato => dato.name === e.target.name);

        if ( existe ) {

            const actualizar = tabla.llegada;

            actualizar[existe.name].numero = parseFloat(e.target.value);
            
            if ( !actualizar[existe.name].numero ) {
                actualizar[existe.name].usado = false;
            } else {                
                actualizar[existe.name].usado = true;
            }

            const nuevo = actualizar.find( data => data.name == (parseInt(e.target.name) + 1));
        
            if ( !nuevo && actualizar.length < 7 ) {

                actualizar.push({
                    name: `${parseInt(e.target.name) + 1}`,
                    numero: 0,
                    usado: false
                });

            }

            guardarTabla({
                ...tabla,
                llegada: actualizar
            });

        }
    }

    const actualizarComparacion = (e) => {

        const existe = tabla.comparcion.find(dato => dato.name === e.target.name);

        if ( existe ) {

            const actualizar = tabla.comparcion;

            actualizar[existe.name].numero = parseFloat(e.target.value);

            if ( !actualizar[existe.name].numero ) {
                actualizar[existe.name].usado = false;
            } else {                
                actualizar[existe.name].usado = true;
            }

            const nuevo = actualizar.find( data => data.name == (parseInt(e.target.name) + 1));
        
            if ( !nuevo && actualizar.length < 7 ) {

                actualizar.push({
                    name: `${parseInt(e.target.name) + 1}`,
                    numero: 0,
                    usado: false
                });

            }

            guardarTabla({
                ...tabla,
                comparcion: actualizar
            });

        }
    }

    const actualizarEntrega = (e) => {
        
        const existe = tabla.entrega.find(dato => dato.name === e.target.name);

        if ( existe ) {

            const actualizar = tabla.entrega;

            actualizar[existe.name].numero = parseFloat(e.target.value);

            if ( !actualizar[existe.name].numero ) {
                actualizar[existe.name].usado = false;
            } else {                
                actualizar[existe.name].usado = true;
            }

            const nuevo = actualizar.find( data => data.name == (parseInt(e.target.name) + 1));
        
            if ( !nuevo && actualizar.length < 7 ) {

                actualizar.push({
                    name: `${parseInt(e.target.name) + 1}`,
                    numero: 0,
                    usado: false
                });

            }

            guardarTabla({
                ...tabla,
                entrega: actualizar
            });

        }
    }

    const desviacionCalculo = (index, estado) => {
        
        if ( estado ) {

            return (tabla.entrega[index].numero - tabla.comparcion[index].numero).toFixed(1);                

        }

        return (tabla.llegada[index].numero - tabla.comparcion[index].numero).toFixed(1);
    }

    const porcentajeDesviacion = (index, estado) => {

        const res = ((desviacionCalculo(index, estado) * 100) / tabla.comparcion[index].numero).toFixed(1);

        return isNaN(res) ? null : res;

    }

    const validarForm = () => {

        const { llegada, comparcion, entrega } = tabla;
        
        if( !( llegada.length === comparcion.length === entrega.length ) && ( llegada.length > 0 || comparcion.length > 0 || entrega.length > 0 ) ){
            return false;
        }

        return true;

    }

    const enviar = (e) => {

        e.preventDefault();
        
        const llegadaFinal = tabla.llegada.filter(dato => dato.usado === true);
        const comparacionFinal = tabla.comparcion.filter(dato => dato.usado === true);
        const entregaFinal = tabla.entrega.filter(dato => dato.usado === true);

        guardarDatosSegundo({
            llegadaFinal,
            comparacionFinal,
            entregaFinal
        });

        onButtonClick("pagethree");
    }

    const regresar = () => {
        onButtonClick("pageone")
    }

    useEffect(() => {

    }, [tabla.comparcion, tabla.entrega, tabla.llegada]);

    return (
        <Fragment>

            <form onSubmit={enviar} className='certificado__form-mw'>
                
                <h3 className="card-body-subtitle">No importa si deja casillas en blanco</h3>

                <div className='certificado__componente certificado__componente__rango certificado-wd mt-1'>
                    <div className='pdf__titulo-dueño certificado__subtitulo certificado__titulo'>
                        <h2>Condiciones De Recepción Del Instrumento:</h2>
                    </div>
                    <table className="table table-hover certificado__table">
                        <thead>
                            <tr className='table__head'>
                                <th scope="col">Rango</th>
                                <th scope="col"></th>
                                <th scope="col">Lectura Instrumento</th>
                                <th scope="col">Desviación</th>
                                <th scope="col">% Desviación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='table__tr'>
                                <td className='certificado__inp'>{rango}</td>

                                <td>
                                    <p className='pdf__tabla__titulo' >Ascendente</p>
                                    <div>
                                        {
                                            tabla.llegada.length > 0 ? 

                                                tabla.llegada.map((dato, index) => (
                                                    <div key={index} >
                                                        <input 
                                                            type="text"
                                                            name={index}
                                                            className={'certificado__inp'}
                                                            onChange={actualizarInstrumentoI}
                                                            defaultValue={isNaN(dato.numero) || dato.numero === 0 ? null : dato.numero}
                                                        /> {unidad}
                                                    </div>
                                                ))
                                            :
                                                null
                                        }
                                    </div>
                                    {/* <p className='pdf__tabla__certificado' >SCJR 8700-02</p> */}
                                </td>

                                <td>
                                    <p className='pdf__tabla__titulo' >Ascendente</p>
                                    <div>
                                        {
                                            tabla.comparcion.length > 0 ? 

                                                tabla.comparcion.map((dato, index) => (
                                                    <div key={index} >
                                                        <input 
                                                            type="text"
                                                            name={index}
                                                            className={'certificado__inp'}
                                                            onChange={actualizarComparacion}
                                                            defaultValue={ isNaN(dato.numero) || dato.numero === 0 ? null : dato.numero}
                                                        /> {unidad}
                                                    </div>
                                                ))
                                            :
                                                null
                                        }
                                    </div>
                                </td>

                                <td>
                                    <p className='certificado__invisible' >aaa</p>
                                    <div>
                                        {
                                            tabla.comparcion.length === tabla.llegada.length ? 

                                                tabla.comparcion.map((dato, index) => (
                                                    <div key={index} >
                                                        <input 
                                                            type="text"
                                                            name={index}
                                                            disabled={true}
                                                            className={'certificado__inp'}
                                                            // onChange={actualizarComparacion}
                                                            value={desviacionCalculo(index, false)}
                                                        />
                                                    </div>
                                                ))
                                            :
                                                null
                                        }
                                    </div>
                                </td>

                                <td>
                                    <p className='certificado__invisible' >aaa</p>
                                    <div>
                                        {
                                            tabla.comparcion.length === tabla.llegada.length ? 

                                                tabla.comparcion.map((dato, index) => (
                                                    <div key={index} >
                                                        <input 
                                                            type="text"
                                                            name={index}
                                                            disabled={true}
                                                            className={'certificado__inp'}
                                                            // onChange={actualizarComparacion}
                                                            value={porcentajeDesviacion(index, false)}
                                                        />
                                                    </div>
                                                ))
                                            :
                                                null
                                        }
                                    </div>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="card-body-subtitle">No importa si deja casillas en blanco</h3>

                <div className='certificado__componente certificado__componente__rango certificado-wd mt-1'>
                    <div className='pdf__titulo-dueño certificado__subtitulo certificado__titulo'>
                        <h2>Condiciones De Entrega Del Instrumento:</h2>
                    </div>
                    <table className="table table-hover certificado__table">
                        <thead>
                            <tr className='table__head'>
                                <th scope="col">Rango</th>
                                <th scope="col"></th>
                                <th scope="col">Lectura Instrumento</th>
                                <th scope="col">Desviación</th>
                                <th scope="col">% Desviación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='table__tr'>
                                <td className='certificado__inp'>{rango}</td>

                                <td>
                                    <p className='pdf__tabla__titulo' >Ascendente</p>
                                    <div>
                                        {
                                            tabla.entrega.length > 0 ? 

                                                tabla.entrega.map((dato, index) => (
                                                    <div key={index} >
                                                        <input 
                                                            type="text"
                                                            name={index}
                                                            className={'certificado__inp'}
                                                            onChange={actualizarEntrega}
                                                            defaultValue={isNaN(dato.numero) || dato.numero === 0 ? null : dato.numero}
                                                        /> {unidad}
                                                    </div>
                                                ))
                                            :
                                                null
                                        }
                                    </div>
                                    {/* <p className='pdf__tabla__certificado' >SCJR 8700-02</p> */}
                                </td>

                                <td>
                                    <p className='pdf__tabla__titulo' >Ascendente</p>
                                    <div>
                                        {
                                            tabla.comparcion.length > 0 ? 

                                                tabla.comparcion.map((dato, index) => (
                                                    <div key={index} >
                                                        <input 
                                                            type="text"
                                                            name={index}
                                                            className={'certificado__inp'}
                                                            onChange={actualizarComparacion}
                                                            defaultValue={ isNaN(dato.numero) || dato.numero === 0 ? null : dato.numero}
                                                        /> {unidad}
                                                    </div>
                                                ))
                                            :
                                                null
                                        }
                                    </div>
                                </td>

                                <td>
                                    <p className='certificado__invisible' >aaa</p>
                                    <div>
                                        {
                                            tabla.comparcion.length === tabla.entrega.length ? 

                                                tabla.comparcion.map((dato, index) => (
                                                    <div key={index} >
                                                        <input 
                                                            type="text"
                                                            name={index}
                                                            disabled={true}
                                                            className={'certificado__inp'}
                                                            value={desviacionCalculo(index, true)}
                                                        />
                                                    </div>
                                                ))
                                            :
                                                null
                                        }
                                    </div>
                                </td>

                                <td>
                                    <p className='certificado__invisible' >aaa</p>
                                    <div>
                                        {
                                            tabla.comparcion.length === tabla.entrega.length ? 

                                                tabla.comparcion.map((dato, index) => (
                                                    <div key={index} >
                                                        <input 
                                                            type="text"
                                                            name={index}
                                                            disabled={true}
                                                            className={'certificado__inp'}
                                                            value={porcentajeDesviacion(index, true)}
                                                        />
                                                    </div>
                                                ))
                                            :
                                                null
                                        }
                                    </div>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                        />
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default CertificadoParteDosB
