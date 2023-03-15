import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoQrCodeOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import { BsBoxArrowInRight } from "react-icons/bs";
import Swal from 'sweetalert2';
import moment from 'moment';

import { CRMContext } from '../context/CRMContext';

import QrSD from './QrSD';

function FormQrSD() {

    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`

    const [ mantencion, guardarMantencion ] = useState({
        mantencion: fechaActual,
        proxima: '',
        nserie: '',
        modelo: '',
        marca: '',
        cliente: '',
        equipo: ''
    });
    
    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        if ( e.target.name === 'mantencion' || e.target.name === 'proxima' ) {
            guardarMantencion({
                ...mantencion,
                [e.target.name] : e.target.value
            });
        } else {
            guardarMantencion({
                ...mantencion,
                [e.target.name] : e.target.value.split(' ').join('-').replace('/', '%2F').replace('"', '%22')
            });
        }
    }

    const validarForm = () => {

        const { proxima, cliente, nserie, modelo, marca, equipo } = mantencion;
        
        if( !(!mantencion.mantencion.length || !proxima.length || !marca.length || !equipo.length || !cliente.length || !modelo.length || !nserie.length) ){
            return false;
        }

        return true;
    }

    const enviarForm = async (e) => {

        e.preventDefault();
        document.querySelector(".card").style.display = "none";
        document.querySelector("#usuarioEmpresa").style.display = "block";    
        
    }

    useEffect(() => {

        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        }
        localStorage.removeItem('filtroEmpresa');
        localStorage.removeItem('filtroIngreso');
        localStorage.removeItem('filtroFactura');
        localStorage.removeItem('pagina');

    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <IoQrCodeOutline size={50} color={"#333333"}/>
                    <BsBoxArrowInRight size={50} color={"#333333"}/>
                    <h1>Crear Nuevo Qr</h1>                    
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> IMPORTANTE: No usar tildes. (Se mantienen las reglas de funcionamiento como en la anterior página)</h2>

                    <form onSubmit={enviarForm}>
                        <div className='campo'>
                            <label htmlFor="mantencion">Fecha Mantención<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="date" 
                                id='mantencion'
                                name='mantencion'
                                defaultValue={mantencion.mantencion}
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="proxima">Fecha Próxima Mantención<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="date" 
                                id='proxima'
                                name='proxima'
                                defaultValue={mantencion.proxima}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="cliente">Nombre Cliente<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='cliente'
                                name='cliente'
                                defaultValue={mantencion.cliente}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="equipo">Nombre Equipo<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='equipo'
                                name='equipo'
                                defaultValue={mantencion.equipo}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="marca">Marca<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='marca'
                                name='marca'
                                defaultValue={mantencion.marca}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="modelo">Modelo<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='modelo'
                                name='modelo'
                                defaultValue={mantencion.modelo}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="nserie">N° Serie<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='nserie'
                                name='nserie'
                                defaultValue={mantencion.nserie}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value={"Crear Código QR"}
                                disabled={validarForm()}
                            />
                        </div>
                    </form>
                </div>
            </div>
            
            <QrSD
                mantencion={mantencion}
            />
        </Fragment>
    )
}

export default FormQrSD;
