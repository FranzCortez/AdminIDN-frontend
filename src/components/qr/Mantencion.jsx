import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import clienteAxios from '../../config/axios';

import Spinner from '../layout/Spinner';

function Mantencion() {

    const { id, token } = useParams();

    const [ mantencion, guardarMantencion ] = useState('');
    const [ proxima, guardarProxima ] = useState('');
    const [ info, guardarInfo ] = useState({});

    let navigate = useNavigate();
 
    const whatsapp = () => {
        
        const archor = document.createElement("a");
        archor.href = `https://wa.me/+56978950016?text=Hola,%20soy%20el%20cliente%20${info?.clienteContacto?.clienteEmpresa?.nombre}%20y%20quiero%20programar%20la%20mantención%20de%20${info?.nombre}%20${info?.marca}%20que%20vence%20el%20${moment(proxima).format('DD-MM-YYYY')}`;
        archor.target = "_blank"
        document.body.appendChild(archor);
        archor.click();
        document.body.removeChild(archor);
    }

    const email = () => {
        
        const archor = document.createElement("a");        
        archor.href = `mailto:gerencia@impactodelnorte.cl?Subject=Contacto%20para%20mantención%20empresa%20${info?.clienteContacto?.clienteEmpresa?.nombre}`;
        archor.target = "_blank"
        document.body.appendChild(archor);
        archor.click();
        document.body.removeChild(archor);
    }

    const consultarAPI = async () => {

        try {
            
            const res = await clienteAxios.get(`ih/mantencion/${1}` ,{
                headers: {
                    authId: id, 
                    authToken: token
                }
            });

            guardarMantencion(res.data.mantencion);
            guardarProxima(res.data.proxima);
            guardarInfo(res.data.ingreso);

        } catch (error) {
            console.log(error)
            navigate("/", { replace: true });
        }

    }

    useEffect(() => {
        consultarAPI();
    },[])

    if ( mantencion === '' ) {
        return <Spinner/>;
    }

    return (
        <Fragment>

            <div className="header header--left ">
                <img src="/img/LogoIDN.webp" alt="Logo Impacto del Norte" className="header__logo" />
            </div>

            <div className="card contenedor">
                <div className="card-header">
                    <div>
                        <h1 className='card-body-subtitle'>Fecha para la Próxima Mantención:</h1>
                        <h2 className='mantencion__fecha'>{moment(proxima).format('DD/MM/YYYY')}</h2>
                    </div>
                </div>
                <div className="card-body">

                   <h1 className='card-body-subtitle'>Mantención Realizada:</h1>
                   <h2 className='mantencion__fecha-m'> {moment(mantencion).format('DD/MM/YYYY')}</h2>

                   <div className='mantencion'>
                        <div className="mantecion__info">
                            <h3 className='mantencion__titulo'>Información del Equipo:</h3>
                            <p className='mantencion__cuerpo' >Cliente: <span>{info?.clienteContacto?.clienteEmpresa?.nombre}</span></p>
                            <p className='mantencion__cuerpo' >Tipo de Equipo: <span>{info?.nombre}</span></p>
                            <p className='mantencion__cuerpo' >Marca: <span>{info?.marca}</span></p>
                            <p className='mantencion__cuerpo' >Modelo: <span>{info?.modelo}</span></p>
                            <p className='mantencion__cuerpo' >N.° Serie: <span>{info?.numeroSerie}</span></p>
                        </div>


                        <h3 className='mantencion__titulo'>Contáctanos para la próxima mantención:</h3>
                        <div className='mantencion__redes'>
                            <img className='mantencion__img' src="/img/redes/whatsapp.png" onClick={whatsapp} alt="whatsapp contacto" />
                            <img className='mantencion__img' src="/img/redes/email.png" onClick={email} alt="email contacto" />
                        </div>
                   </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Mantencion;
