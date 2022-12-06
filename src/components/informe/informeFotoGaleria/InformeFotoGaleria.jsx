import React, { useState, useContext, useEffect } from 'react';

import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function InformeFotoGaleria({ id, fotosSeleccion, otin, fotoGaleria }) {

    const [ fotos, guardarFotos ] = useState([]);

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);   

    const consultarAPI = async () => {

        try {

            const res = await clienteAxios.get(`ih/ingreso/foto/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            if ( res?.data?.rutas ) {

                let final = res.data.rutas;
                                
                fotosSeleccion.forEach(seleccion => {
                    
                    final = final.filter( ruta => seleccion !== ruta );

                });

                const base = await clienteAxios.post(`ih/base/foto`, {fotos: final}, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                guardarFotos(base.data);

            }

            
        } catch (error) {
            console.log(error);   
        }
    }
    
    useEffect(() => {

        consultarAPI();
    },[fotoGaleria])
    
    return (
        <div>
            <div id='fotoInfo' className='pdf'>
                <div className='pdf__titulo'>
                    <h1>Foto Galería</h1>
                    
                    <div className='pdf__titulo-data'>

                        <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                        <div className='pdf__titulo-dueño'>
                            <h2>ALBERTO GARCÍA LÓPEZ</h2>
                            <h2>REPARACIONES Y MANTENCION E.I.R.L</h2>
                            <h2>R.U.T 76.546.349-1</h2>
                        </div>

                        <h2 className='pdf__titulo-otin'>OTIN {otin}</h2>
                    </div>                
                </div>

                <div className='pdf__componente info__cuerpo'>
                    <div className='info__foto-grid'>
                        {
                            fotos.length > 0 ?
                                fotos.map((foto, index) => (
                                    <img className='info__img' src={`data:image/jpeg;base64,${foto}`} alt="" key={index} />
                                ))
                            :
                                <p></p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformeFotoGaleria;