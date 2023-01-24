import {React, Fragment, useEffect, useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

import { CRMContext } from '../context/CRMContext';

function Home() {

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    useEffect(() => {        
        if(auth.token === '' && (auth.tipo !== 1 || auth.tipo !== 2 || auth.tipo !== 3 ) ) {
            navigate('/login', {replace: true});
        }  
    }, []);   

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <AiFillHome size={50} color={"#333333"}/>
                    <h1>Hola! {auth.nombre}</h1>
                </div>
                <div className="card-body">

                    <div className='home'>
                        <h2>BIENVENIDO A LA VERSION FINAL 2.1</h2>
                        <h2>DEL SISTEMA DE ADMINITRACION DE "IMPACTO DEL NORTE"</h2>
                        
                        <img className='home__logo' src="/img/LogoIDN.png" alt="" />
                        
                        <p>Para iniciar oprima las barras lateral izquierda <FaBars/> y navegue por las secciones</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home;