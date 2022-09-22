import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

import { CRMContext } from '../context/CRMContext';

function Login() {

    const [ auth, guardarAuth ] = useContext(CRMContext);

    const  [ datos, guardarDatos ] = useState({
        email: '',
        password: ''
    });

    let navigate = useNavigate();

    const iniciarSesion = async e => {
        e.preventDefault();

        try {
            
            const res = await clienteAxios.post('/login', datos);
            
            const { token, tipo } = res.data;
            
            localStorage.setItem('token', token);

            guardarAuth({
                token,
                auth: true,
                tipo
            });

            navigate('/clientes', {replace: true});

        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje || error.message
            })
        }
    }

    const actualizarState = e => {
        
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
    }

    return (
        <div className='center'>
            <div className="card contenedor login">
                <div className='login__img'>
                    <h1>Bienvenido a</h1>
                    <img className='login__logo' src="/img/LogoIDN.png" alt="Logo Impacto del Norte" />
                </div>

                <div className='login__form'>
                    <div className="card-body">

                        <h1>Incia sesión para poder entrar al sistema</h1>

                        <form onSubmit={iniciarSesion}>
                            <div className='campo'>
                                <label htmlFor="correo">Correo:</label>
                                <input 
                                    type="email" 
                                    id='correo'
                                    name='email'
                                    placeholder='correo@correo.com'
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className='campo'>
                                <label htmlFor="password">Contraseña:</label>
                                <input 
                                    type="password" 
                                    id='password'
                                    name='password'
                                    placeholder='password'
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="enviar">
                                <input 
                                    type="submit" 
                                    className='btn-new btn-login'
                                    value="Iniciar Sesión"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;