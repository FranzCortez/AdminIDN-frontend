import {React, Fragment, useEffect, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

import packageJson from '../../../package.json';
import { CRMContext } from '../context/CRMContext';

import clienteAxios from '../../config/axios';

function Home() {

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    const [ efectos, guardarEfectos ] = useState([]);

    let navigate = useNavigate();

    const actualizarEfecto = async (e) => {
        try {
            const res = await clienteAxios.get(`efecto/${e.target.dataset.idefecto}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            console.log(res.data)
            consultarAPI();
        } catch (error) {
            console.log(error)
        }
    }

    const consultarAPI = async () => {
        
        try {
            const res = await clienteAxios.get(`efecto`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarEfectos(res.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {        
        if(auth.token === '' && (auth.tipo !== 1 || auth.tipo !== 2 || auth.tipo !== 3 ) ) {
            navigate('/login', {replace: true});
        }  
        localStorage.removeItem('filtroEmpresa');
        localStorage.removeItem('filtroIngreso');
        localStorage.removeItem('filtroFactura');
        localStorage.removeItem('pagina');
        consultarAPI();
    }, []);   

    localStorage.setItem('ultima', `/home`);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <div className='card-home'>
                        <div className='card-saludo'>
                            <AiFillHome size={50} color={"#333333"}/>
                            <h1>Hola! {auth.nombre}</h1>
                        </div>
                        <h2 className='version'>V{packageJson.version}</h2>
                    </div>
                </div>
                <div className="card-body">

                    <div className='home'>
                        <h2>BIENVENIDO AL</h2>
                        <h2>SISTEMA DE ADMINISTRACIÓN DE "IMPACTO DEL NORTE"</h2>
                        
                        <img className='home__logo' src="/img/LogoIDN.webp" alt="" />
                        
                        <p>Para iniciar oprima las barras lateral izquierda <FaBars/> y navegue por las secciones</p>
                    </div>
                </div>

                <form>
                    <h2>Efectos</h2>
                {
                    efectos.length > 0 ?

                    efectos.map(efecto=> (
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={efecto.activo} onChange={actualizarEfecto} data-idefecto={efecto.id}/>
                            <label className="form-check-label" for="flexSwitchCheckChecked"><strong>{efecto.nombre}</strong></label>
                        </div>
                    ))
                    :
                    null

                }

                </form>

            </div>
        </Fragment>
    )
}

export default Home;