import React, { Fragment, } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineVerified } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

// Default theme
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';

function Inicio() {

    const fotos = [];

    for (let i = 0; i < 24; i++) {
        
        fotos.push(`galeria-${i+1}.jpg`);
    }

    function hashLinkScroll(hash) {
        if (hash !== '') {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) element.scrollIntoView();
          }, 0);
        }
    }

    const numero = () => {
        
        const archor = document.createElement("a");
        archor.href = `tel:+56968659818`;
        archor.target = "_blank"
        document.body.appendChild(archor);
        archor.click();
        document.body.removeChild(archor);
    }
    
    const mapa = () => {
        
        const archor = document.createElement("a");
        archor.href = `https://www.google.cl/maps/place/Impacto+del+norte/@-23.5924716,-70.3944617,17z/data=!3m1!4b1!4m5!3m4!1s0x96ae2b2f8e4f1c6d:0xf8368dc7b3de01e2!8m2!3d-23.5924986!4d-70.3922737`;
        archor.target = "_blank"
        document.body.appendChild(archor);
        archor.click();
        document.body.removeChild(archor);
    }
    
    const mail = () => {
        
        const archor = document.createElement("a");
        archor.href = `mailto:administracion@impactodelnorte.cl?Subject=Contacto%20para%20mantención%20empresa%20`;
        archor.target = "_blank"
        document.body.appendChild(archor);
        archor.click();
        document.body.removeChild(archor);
    }

    return (
        <Fragment>

            <header className='header-inicio' id='inicio'>
                <nav className='nav'>
                    <button className='nav__button' onClick={() => hashLinkScroll('inicio')}>
                        <img className='nav__logo' src="/img/LogoIDN.png" alt="" />
                    </button>

                    <button className='nav__button' onClick={() => hashLinkScroll('servicios')}>
                        <h3 className='nav__btn' >Nuestros Servicios</h3>
                    </button>

                    <button className='nav__button' onClick={() => hashLinkScroll('nosotros')} >
                        <h3 className='nav__btn' >¿Quienes Somos?, Nosotros</h3>
                    </button>

                    <button className='nav__button' onClick={() => hashLinkScroll('galeria')} >
                        <h3 className='nav__btn' >Galería</h3>
                    </button>

                    <button className='nav__button' onClick={() => hashLinkScroll('horario')} >
                        <h3 className='nav__btn' >Nuestro Horario</h3>
                    </button>

                    <button className='nav__button' onClick={() => hashLinkScroll('contacto')} >
                        <h3 className='nav__btn' >Contactanos</h3>
                    </button>

                    <Link to="/login">
                        <h3 className='nav__btn' >Iniciar Sesión</h3>
                    </Link>
                </nav>

                <div className='header-inicio__hero' >
                    <img src="/img/LogoIDN.png" className='header-inicio__logo' alt="" />
                </div>
            </header>

            <main className='servicios' id='servicios'>
                <h1 className='servicios__title'>Nuestros Servicios</h1>

                <div className='servicios__main'>
                    
                    <div className='servicios__lista' >
                        <div className='servicios__campo' >
                            <MdOutlineVerified className='servicios__ticket' />
                            <p className='servicios__texto' >Reparación de herramientas hidráulicas, neumáticas y de torque.</p>
                        </div>

                        <div className='servicios__campo' >
                            <MdOutlineVerified className='servicios__ticket' />
                            <p className='servicios__texto' >Fabricación de pernos de anclaje, abrazaderas y flexibles.</p>
                        </div>

                        <div className='servicios__campo' >
                            <MdOutlineVerified className='servicios__ticket' />
                            <p className='servicios__texto' >Servicios de torque en terreno, con personal capacitado.</p>
                        </div>

                        <div className='servicios__campo' >
                            <MdOutlineVerified className='servicios__ticket' />
                            <p className='servicios__texto' >Insumos y consumibles del área de soldadura.</p>
                        </div>

                        <div className='servicios__campo' >
                            <MdOutlineVerified className='servicios__ticket' />
                            <p className='servicios__texto' >Venta y arriendo de herramientas y maquinaria.</p>
                        </div>
                    </div>

                    <div>

                    </div>
                </div>
            </main>

            <section className='nosotros' id='nosotros'>

                <div className='nosotros__contenedor' >
                    <h1 className='nosotros__titulo' >Quienes Somos</h1>

                    <div className='nosotros__flex'>
                        <img className='nosotros__img' src="/img/Inicio/grupo1.jpg" alt="Quienes Somos" />
                    
                        <div className='nosotros__flex-text'>
                            <p className='nosotros__text' >Nuestra empresa surge en noviembre de 2015 como Impacto del Norte LTDA, como la consolidación del interés y compromiso de su dueño y fundador, Alberto García López, quien proyectó un espacio en el que los clientes pudieran ser óptimamente atendidos en sus requerimientos de eficiencia, rapidez y calidad en la reparación y mantención de equipos electrohidráulicos, neumáticos y de torque; así como en sus necesidades de arriendo y compra de insumos. Es así como da el primer paso en la instalación de un modesto taller, porque desde sus inicios, ha tenido como desafío crecer y afianzarse como un referente en la ciudad y la región.</p>

                            <p className='nosotros__text' >El trabajo arduo y comprometido del servicio técnico de Impacto del Norte LTDA, así como la confianza de los clientes que día a día acuden a solicitar nuestros servicios, han permitido que en el segundo semestre del 2017 se abra una nueva etapa en nuestra empresa. Como respuesta a la mayor y más variada demanda de reparaciones, mantenciones, arriendos y venta de insumos celebramos la transición a nuevas instalaciones que se correspondan con el crecimiento de nuestra empresa. Y sabemos que el éxito de nuestra historia se sigue escribiendo día a día, herramienta a herramienta, cliente a cliente.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section  className='bases'>

                <div className='vision'>

                    <div className='vision__campo'>
                        <h1 className='vision__titulo' >Visión</h1>

                        <p className='vision__texto'>Seguir siendo un referente de calidad y compromiso en la región de Antofagasta y sus alrededores, atendiendo a cada vez más clientes y faenas de las distintas empresas del rubro. Así como ampliar los servicios que se brindan y la amplitud de nuestro alcance geográfico como empresa</p>
                    </div>

                    <img className='vision__img' src="/img/LogoIDN.png" alt="Vision" />
                </div>
                
                <div className='mision'>

                    <img className='mision__img' src="/img/Inicio/quienes.jpg" alt="Vision" />
    
                    <div className='mision__campo'>
                        <h1 className='mision__titulo'>Misión</h1>

                        <p className='mision__texto'>Somos una empresa enfocada en posicionarnos en la industria y responder eficazmente la demanda de servicios de reparación, mantención y arriendo de herramientas y maquinaria asociadas a la minería, en la macro zona norte de Chile (Región de Antofagasta y alrededores).Lo que nos caracteriza es el servicio y atención con profesionalismo, calidad, seriedad y prontitud buscando siempre la satisfacción de todos nuestros clientes (grandes y pequeños sin distinción alguna); ofreciendo, además de servicios de calidad en reparación, mantención y arriendo de herramientas, el cumplimiento de plazos y precios competitivos.</p>
                    </div>
                
                </div>
            
            </section>

            <section className='galeria' id='galeria'>

                <h1 className='galeria__titulo'>Galería</h1>

                <Splide                     
                    options={ {
                        rewind: true,
                        width : 800,
                        gap   : '1rem',
                        type   : 'loop',
                        autoplay: true
                    } }
                    hasTrack={ false }
                >
                    <SplideTrack>
                        {
                            fotos.length > 0 ?

                            fotos.map( ruta => (
                                <SplideSlide key={ruta}>
                                    <img src={`/img/Inicio/Galeria/${ruta}`} alt="Galeria"/>
                                </SplideSlide>
                            ))
                            :
                            null
                        }
                    </SplideTrack>
                </Splide>

            </section>

            <section className='datos'>
                <section className='horario' id='horario'>

                    <h1 className='horario__titulo'>Nuestro Horario</h1>

                    <table className="tabla">
                        <thead className="tabla__thead">
                            <tr>
                                <th className="tabla__th">Día</th>
                                <th className="tabla__th">De</th>
                                <th className="tabla__th">Hasta</th>
                            </tr>
                        </thead>
                        
                        <tbody className="tabla__tbody">
                            <tr className="tabla__tr">
                                <td className="tabla__td">Lunes</td>
                                <td className="tabla__td">09:00</td>
                                <td className="tabla__td">19:00</td>
                            </tr>
                            
                            <tr className="tabla__tr">
                                <td className="tabla__td">Martes</td>
                                <td className="tabla__td">09:00</td>
                                <td className="tabla__td">19:00</td>
                            </tr>

                            <tr className="tabla__tr">
                                <td className="tabla__td">Miércoles</td>
                                <td className="tabla__td">09:00</td>
                                <td className="tabla__td">19:00</td>
                            </tr>

                            <tr className="tabla__tr">
                                <td className="tabla__td">Jueves</td>
                                <td className="tabla__td">09:00</td>
                                <td className="tabla__td">19:00</td>
                            </tr>

                            <tr className="tabla__tr">
                                <td className="tabla__td">Viernes</td>
                                <td className="tabla__td">09:00</td>
                                <td className="tabla__td">19:00</td>
                            </tr>

                            <tr className="tabla__tr">
                                <td className="tabla__td">Sábado</td>
                                <td className="tabla__td" colSpan="2">Cerrado</td>
                            </tr>

                            <tr className="tabla__tr">
                                <td className="tabla__td">Domingo</td>
                                <td className="tabla__td" colSpan="2">Cerrado</td>
                            </tr>
                        </tbody>
                    </table>

                </section>

                <section className='contacto' id='contacto'>

                    <h1 className='contacto__titulo'>Contactanos</h1>

                    <div className='contacto__campo'>
                        <BsFillTelephoneFill className='contacto__icono' onClick={numero}/>
                        <h2 className='contacto__text'>+56 968 659 818</h2>
                    </div>

                    <div className='contacto__campo'>
                        <FaMapMarkedAlt className='contacto__icono' onClick={mapa}/>
                        <h2 className='contacto__text'>Nicolás Tirado 150, Antofagasta, Chile</h2>
                    </div>

                    <div className='contacto__campo'onClick={mail}>
                        <GrMail className='contacto__icono'/>
                        <h2 className='contacto__text'>administracion@impactodelnorte.cl</h2>
                    </div>

                    <img onClick={() => hashLinkScroll('inicio')} className='contacto__logo' src="/img/LogoIDN.png" alt="Logo IDN" />

                </section>
            </section>

        </Fragment>
    )
}

export default Inicio;