import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlinePrecisionManufacturing, MdOutlineVerified, MdArrowForwardIos } from "react-icons/md";
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { VscTools } from "react-icons/vsc";
import { RiShoppingBagLine } from "react-icons/ri";
import { GiDrill } from "react-icons/gi";
import { HiMail } from "react-icons/hi";
import { BsTelephoneInbound, BsWhatsapp } from "react-icons/bs";
import { SiGooglemaps } from "react-icons/si"

function Fabricacion() {
    return (
        <div className="back__main">
        
            <header className="servicio__header">

                <div className="servicio__container">
                    <Link to={'/prueba'}>
                        <img className="servicio__logo" src="/img/LogoIDN.webp" alt="Logo IDN" />
                    </Link>
                </div>

                <h1 className="servicio__titulo">Fabricación de accesorios</h1>

                <MdOutlinePrecisionManufacturing size={80} color={"#e1e1e1"}/>

                <div className="regresar">
                    <Link to={'/prueba'}>
                        <button className="regresar__btn" >Regresar</button>
                    </Link>
                </div>

            </header>  

            <main className="fabriacion">
                <p>Las extensiones de impacto se utilizan como un brazo para extender el alcance de una llave de impacto,  y con ella poder retirar tuercas de neumáticos de camiones tipo CAEX, de gran uso en la minería.</p>

                <p>IMAGEN DE EXTENSION</p>

                <p>En <span>Impacto del Norte Fabricación</span> se crean extensiones de impacto <strong>acorde a las necesidades específicas de nuestros clientes que requieren medidas de difícil acceso o inexistentes en el mercado</strong>. Nuestras fabricaciones <strong>cumplen con los estándares</strong> de dureza y de alto impacto; su  diseño está respaldado con memoria de cálculo.</p>

                <p>IMAGEN DE IMPACTO</p>

                <p>También fabricamos pernos de anclaje, abrazaderas, flexibles hidráulicos, además de diseño y fabricación de piezas metalmecánicas.</p>

                <p>IMAGEN DE PERNOS</p>

                <h2>Algunos de nuestros trabajos:</h2>
            </main>

            <section className="conoce">

                <h2>¡Contáctanos para saber más!</h2>

                <div className="cotizacion__cuerpo">
                    <div className="cotizacion__texto-w">
                        <BsWhatsapp size={25} color={"#e1e1e1"}/>
                        <a className="cotizacion__a" href="https://wa.me/+56968659818" >&nbsp;+56 9 6865 9818</a>
                    </div>

                    <div className="cotizacion__texto-t">
                        <BsTelephoneInbound size={25} color={"#e1e1e1"}/>
                        <a className="cotizacion__a" href="tel:+56968659818" >&nbsp;+56 9 6865 9818</a>
                    </div>

                    <div className="cotizacion__texto-g">
                        <HiMail size={25} color={"#e1e1e1"}/>
                        <a className="cotizacion__a" href="mailto:administracion@impactodelnorte.cl" >&nbsp;administracion@impactodelnorte.cl</a>
                    </div>
                </div>

            </section> 

            <footer className="footer">

                <div className="footer__grid" id="footer">
                    <div className="footer__contacto">
                        <h3 className="footer__titulo" >Contáctanos</h3>
                        <a href="https://wa.me/+56968659818" className="footer__a"><BsWhatsapp size={15} color={"#e1e1e1"}/> &nbsp;+56 9 6865 9818</a>
                        <a href="tel:+56968659818" className="footer__a"><BsTelephoneInbound size={15} color={"#e1e1e1"}/>&nbsp; +56 9 6865 9818</a>
                        <a href="mailto:administracion@impactodelnorte.cl" className="footer__a"><HiMail size={15} color={"#e1e1e1"}/> &nbsp;administracion@impactodelnorte.cl</a>
                    </div>

                    <div className="footer__horario">
                        <h3 className="footer__titulo" >Nuestro Horario</h3>
                        <p>Lunes a Jueves: <strong>9:00 a 19:00</strong></p>
                        <p>Viernes: <strong>9:00 a 18:00</strong></p>
                        <p>Sábados, domingos y festivos: <strong>CERRADO</strong></p>
                    </div>

                    <div className="footer__ubicacion">
                        <h3 className="footer__titulo" >Encuéntranos</h3>
                        <a href="https://goo.gl/maps/1dMV6XkMWQdqCYpAA" target="_blank" className="footer__a" rel="noreferrer"><SiGooglemaps size={15} color={"#e1e1e1"}/>&nbsp; Nicolás Tirado 150, Antofagasta</a>
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1537.2943644117688!2d-70.39523170701854!3d-23.592753740747565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96ae2b2f8e4f1c6d%3A0xf8368dc7b3de01e2!2sImpacto%20del%20norte!5e0!3m2!1ses!2scl!4v1692575903581!5m2!1ses!2scl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"/> */}
                    </div>
                </div>

                <p className="footer_r">Todos los derechos reservados Impacto del Norte Copyright ©</p>

            </footer>
        </div>
    )
}

export default Fabricacion
