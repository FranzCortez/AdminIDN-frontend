import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import Spinner from '../layout/Spinner';

function MantencionSD() {

    let { mantencion, proxima, nserie, modelo, marca, cliente, equipo } = useParams();
    
    nserie = nserie.split('-').join(' ').replace('%2F', '/').replace('%22','"');
    modelo = modelo.split('-').join(' ').replace('%2F', '/').replace('%22','"');
    marca = marca.split('-').join(' ').replace('%2F', '/').replace('%22','"');
    equipo = equipo.split('-').join(' ').replace('%2F', '/').replace('%22','"');
    cliente = cliente.split('-').join(' ').replace('%2F', '/').replace('%22','"');
    mantencion = moment(mantencion).format('DD/MM/YYYY');
    proxima = moment(proxima).format('DD/MM/YYYY');

    const whatsapp = () => {
        
        const archor = document.createElement("a");
        archor.href = `https://wa.me/+56978950016?text=Hola,%20soy%20el%20cliente%20${cliente}%20y%20quiero%20programar%20la%20mantención%20de%20${equipo}%20${marca}%20que%20vence%20el%20${proxima}`;
        archor.target = "_blank"
        document.body.appendChild(archor);
        archor.click();
        document.body.removeChild(archor);
    }

    const email = () => {
        
        const archor = document.createElement("a");        
        archor.href = `mailto:gerencia@impactodelnorte.cl?Subject=Contacto%20para%20mantención%20empresa%20${cliente}`;
        archor.target = "_blank"
        document.body.appendChild(archor);
        archor.click();
        document.body.removeChild(archor);
    }

    if ( mantencion === '' ) {
        return <Spinner/>;
    }

    return (
        <Fragment>

            <div className="header header--left ">
                <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className="header__logo" />
            </div>

            <div className="card contenedor">
                <div className="card-header">
                    <div>
                        <h1 className='card-body-subtitle'>Fecha para la Próxima Mantención:</h1>
                        <h2 className='mantencion__fecha'>{proxima}</h2>
                    </div>
                </div>
                <div className="card-body">

                   <h1 className='card-body-subtitle'>Mantención Realizada:</h1>
                   <h2 className='mantencion__fecha-m'> {mantencion}</h2>

                   <div className='mantencion'>
                        <div className="mantecion__info">
                            <h3 className='mantencion__titulo'>Información del Equipo:</h3>
                            <p className='mantencion__cuerpo' >Cliente: <span>{cliente}</span></p>
                            <p className='mantencion__cuerpo' >Tipo de Equipo: <span>{equipo}</span></p>
                            <p className='mantencion__cuerpo' >Marca: <span>{marca}</span></p>
                            <p className='mantencion__cuerpo' >Modelo: <span>{modelo}</span></p>
                            <p className='mantencion__cuerpo' >N.° Serie: <span>{nserie}</span></p>
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

export default MantencionSD;
