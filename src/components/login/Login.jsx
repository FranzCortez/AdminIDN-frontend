import React, { useState, useContext, useEffect } from 'react';
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
            const { token, tipo, nombre, id } = res.data;
            console.log(res.data)
            localStorage.setItem('token', token);

            guardarAuth({
                token,
                auth: true,
                tipo,
                nombre,
                id
            });

            navigate('/home', {replace: true});

        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data?.mensaje ? error.response.data.mensaje : error.message
            })
        }
    }

    const validar = async (token) => {

        const res = await clienteAxios.get('/auth', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if ( res.status === 200 ) {
            guardarAuth({
                token,
                nombre: res.data.revisarToken.usuario,
                tipo: res.data.revisarToken.tipo,
                auth: true,
                id: res.data.revisarToken.id
            });
        }

        navigate(localStorage.getItem('ultima'), {replace: true})

    }

    const actualizarState = e => {
        
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
    }

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if ( token ) {
            validar(token);
        }

    }, [])

    return (
        <div className='center'>
            <div className="card contenedor login">
                <div className='login__img'>
                    <h1>Bienvenido a</h1>
                    <img className='login__logo' src="/img/LogoIDN.webp" alt="Logo Impacto del Norte" />
                </div>

                <div className='login__form'>
                    <div className="card-body">

                        <h1>Inicia sesión para poder entrar al sistema</h1>

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