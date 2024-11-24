import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoQrCodeOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import { BsBoxArrowInRight } from "react-icons/bs";
import Swal from 'sweetalert2';
import moment from 'moment';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

function FormQr() {

    const { id, tipo } = useParams();

    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}` : (today.getMonth()+1); //January is 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${yyyy}-${mm}-${dd}`

    const [ mantencionFecha, guardarMantencionFecha ] = useState({
        mantencion: '',
        proxima: '',
        guiaDespacho: '',
        fechaGuiaDespacho: ''
    });
    
    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {
        
        guardarMantencionFecha({
            ...mantencionFecha,
            [e.target.name] : e.target.value
        });
    }

    const fechaAutomatica = e => {

        if ( mantencionFecha.mantencion !== '' ) {

            let prox = mantencionFecha.mantencion.split('-');
            console.log(prox)
            prox[1] = (parseInt(prox[1]) + parseInt(e.target.id));
            console.log(prox)
            if ( prox[1] > 12 ) {
                prox[1] = (prox[1] - 12) < 10 ? '0' + (prox[1] - 12) : (prox[1] - 12);
                prox[0] = parseInt(prox[0]) + 1;
            } else if( prox[1] < 10 ) {
                prox[1] = '0' + prox[1];
            }
            console.log(prox)
            guardarMantencionFecha({
                ...mantencionFecha,
                proxima : prox.join('-')
            });
        
        }

    }

    const validarForm = () => {

        const { mantencion, proxima } = mantencionFecha;
        
        if( !(!mantencion.length || !proxima.length) ){
            return false;
        }

        return true;
    }

    const actualizarFecha = async () => {

        try {

            const res = await clienteAxios.put(`qr/${id}`, mantencionFecha,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                type: 'Actualización Correcta',
                title: 'Fecha de mantención cambiada para el ' + moment(mantencionFecha.proxima).format('DD/MM/YYYY'),
                text: res.data.msg,
                timer: 2500
            });

            navigate('/ingresos', {replace: true});
            
        } catch (error) {
            console.log(error);
        }
    }

    const crearQr = async () => {        
        try {
            const res = await clienteAxios.post(`qr/${id}`, mantencionFecha, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            return res.data;
            
        } catch (error) {
            console.log(error);
            navigate('/ingresos', { replace: true });
        }
    }

    const enviarForm = async (e) => {

        e.preventDefault();

        if( tipo === '2' ) {
            actualizarFecha()
        } else {
            const qrInfo = await crearQr();
            navigate(`/qr/${qrInfo.qr.token}/${qrInfo.qr.id}/${qrInfo.otin}`, { replace: true } );
        }
    }

    const consultarAPI = async () => {
        
        try {

            const ih = await clienteAxios.get(`ih/ingreso/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            if (tipo === '1') {
                guardarMantencionFecha({
                    mantencion: fechaActual,
                    proxima: '',
                    guiaDespacho: ih.data.guiaDespacho,
                    fechaGuiaDespacho: ih.data.fechaGuiaDespacho ?? fechaActual
                });
                return;
            }  

            const res = await clienteAxios.get(`qr/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });           

            if ( res.data.guiaDespacho === '' || res.data.guiaDespacho === null ) {
                guardarMantencionFecha({
                    mantencion: res.data.mantencion,
                    proxima: res.data.proxima,
                    guiaDespacho:  ih.data.guiaDespacho,
                    fechaGuiaDespacho: ih.data.fechaGuiaDespacho ?? fechaActual
                });
            } else {
                guardarMantencionFecha({
                    mantencion: res.data.mantencion,
                    proxima: res.data.proxima,
                    guiaDespacho:  res.data.guiaDespacho,
                    fechaGuiaDespacho: res.data.fechaGuiaDespacho
                });
            }
            
        } catch (error) {
            console.log(error);
            navigate('/ingreso', {replace: true});
        }
    }

    useEffect(() => {

        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        } 
        
        consultarAPI();
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <IoQrCodeOutline size={50} color={"#333333"}/>
                    <BsBoxArrowInRight size={50} color={"#333333"}/>
                    {
                        tipo === '1' ?
                        <h1>Crear Nuevo Qr</h1>
                        :
                        <h1>Modificar Qr</h1>
                    }
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene el campo según corresponda: </h2>

                    <form onSubmit={enviarForm}>
                        <div className='campo'>
                            <label htmlFor="mantencion">Fecha Mantención<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="date" 
                                id='mantencion'
                                name='mantencion'
                                defaultValue={mantencionFecha.mantencion}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="fecha">Próxima Mantención Automática:</label>
                            <div className='fecha__opciones'>
                                <div className='fecha__btn' onClick={fechaAutomatica} id='3' >3 Meses</div>
                                <div className='fecha__btn' onClick={fechaAutomatica} id='4' >4 Meses</div>
                                <div className='fecha__btn' onClick={fechaAutomatica} id='6' >6 Meses</div>
                                <div className='fecha__btn' onClick={fechaAutomatica} id='12' >12 Meses</div>
                            </div>
                        </div>
                        
                        <div className='campo'>
                            <label htmlFor="proxima">Fecha Próxima Mantención<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="date" 
                                id='proxima'
                                name='proxima'
                                defaultValue={mantencionFecha.proxima}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="guiaDespacho">Guía de Despacho IDN<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="text" 
                                id='guiaDespacho'
                                name='guiaDespacho'
                                defaultValue={mantencionFecha.guiaDespacho}
                                onChange={actualizarState}
                            />
                        </div>

                        <div className='campo'>
                            <label htmlFor="fechaGuiaDespacho">Fecha Guía de Despacho IDN<span className='campo__obligatorio'>*</span>:</label>
                            <input 
                                type="date" 
                                id='fechaGuiaDespacho'
                                name='fechaGuiaDespacho'
                                defaultValue={mantencionFecha.fechaGuiaDespacho}
                                onChange={actualizarState}
                            />
                        </div>
                        
                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value={ tipo === '1' ? "Crear Código QR" : "Actualizar Fecha Mantención"}
                                disabled={validarForm()}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormQr;
