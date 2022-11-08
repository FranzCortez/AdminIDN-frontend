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

                    <div className='card-body-options'>
                        
                        <div className='home'>
                            <h1>BIENVENIDO A LA VERSION 2.0!!</h1>
                            <h2>DEL SISTEMA DE ADMINITRACION DE "IMPACTO DEL NORTE"</h2>
                            <div className='info'>
                                <p>Información de la actualización 2.0:</p>
                                <ul>
                                    <li>Generación de Cotización AUTOMATICA!</li>
                                    <li>Descarga de Cotización generada</li>
                                    <li>Foto Galería! (ver, subir y eliminar fotos)</li>
                                    <li>Cambio en las opciones en ingreso</li>
                                    <li>Corrección de los campos al crear un ingreso</li>
                                    <li>Corrección de fallas menores</li>
                                </ul>
                            </div>
                            <p>IMPORTANTE: AUN HAY COSAS EN DESARROLLO Y PUEDE QUE COSAS FALLEN, EN CASO DE ENCONTRAR ALGUN ERROR O PROBLEMA, COMUNICARLO A FRANZ POR CUALQUIER MEDIO, EXPLICANDO COMO FUE EL ERROR Y EN LO POSIBLE CON UNA IMAGEN DE REFERENCIA</p>
                            <p>Para iniciar oprima las barras lateral izquierda <FaBars/> y navegue por las secciones</p>
                            <h2>Espero que disfruten su prueba!</h2>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home;