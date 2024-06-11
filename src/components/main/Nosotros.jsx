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


function Nosotros() {

    const [offset, setOffset] = useState(0);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    function hashLinkScroll(hash) {
        if (hash !== '') {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) element.scrollIntoView();
          }, 0);
        }
    } 
    
    
    const onScroll = () => setOffset(window.pageYOffset);
    useEffect(() => {
        function handleResize() {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
        }
        window.removeEventListener('resize', handleResize);
        window.addEventListener('resize', handleResize);
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className="back__main" >
            <header>

                <div className="hero__espacio_nosotros" id="nosotros"></div>
                
                <nav className="lista">
                    <ul className="lista__opciones">
                        <li className="lista__opcion" >
                            {/* <div onClick={() => hashLinkScroll('hero__nosotros')} className="lista__link" >Inicio</div> */}
                            <Link to="/">
                                <div className="lista__link" >Inicio</div>
                            </Link>
                        </li>
                        {/* <li className="lista__opcion" >
                            <div onClick={() => hashLinkScroll('servicios__lista')} className="lista__link" >Nuestros Servicios</div>
                        </li> */}
                        <li className="lista__opcion" >
                            <div href="" className="lista__link" onClick={() => hashLinkScroll('nosotros')} >Nosotros</div>
                        </li>
                        {/* <li className="lista__opcion" >
                            <div href="" className="lista__link" >Galería</div>
                        </li> */}
                        <li className="lista__opcion" >
                            <div onClick={() => hashLinkScroll('footer')} className="lista__link" >Contacto</div>
                        </li>
                        <li className="lista__opcion" >
                            <div onClick={() => hashLinkScroll('footer')} className="lista__link" >Horario</div>
                        </li>
                        <li className="lista__opcion" >
                            <Link to="/login">
                                <div className="lista__link" >Sistema IDN</div>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="hero__nosotros" ></div>
                <h2 className="nosotros__main" >Sobre Nosotros</h2>
            </header>

            <section className="visionM">
                <h2 className="visionM__titulo">Nuestra Misión</h2>

                <p className="visionM__texto">Somos una empresa enfocada en responder eficazmente la demanda de servicios (reparación, mantención, fabricación, arriendo y venta de equipo e insumos) para las industrias minera, energética y de transporte. Con el objetivo de satisfacer las necesidades de nuestros clientes con profesionalismo, calidad, cumplimiento de plazos y precios competitivos.</p>

                <img src="/img/Inicio/banderas.jpg" alt="ejemplo" className="misionM__img" />

            </section>

            <section className="misionM">
                <h2 className="misionM__titulo">Nuestra Visión</h2>

                <p className="misionM__texto">Seguir siendo un referente de calidad y compromiso, atendiendo a cada vez más clientes (empresas, plantas y faenas), en proyectos de creciente importancia, y ampliando nuestros servicios, acorde a los requerimientos regionales (y a mediano plazo, nacionales e internacionales) de los sectores minero, energético y de transporte.</p>

                <img src="/img/LogoIDN.webp" alt="Logo IDN" className="visionM__img" />

            </section>

            <section className="valores">
                <h2 className="valores__titulo">Nuestros Valores</h2>

                <ul className="valores__texto valores__ul">
                    <li>Responsabilidad</li>
                    <li>Honestidad</li>
                    <li>Compromiso</li>
                    <li>Excelencia</li>
                    <li>Calidad</li>
                    <li>Trabajo en equipo</li>
                    <li>Lealtad</li>
                </ul>

                <div className="valores__bloque">
                    <img src="/img/Inicio/pintando.jpg" alt="ejemplo" className="valores__img" />

                    <img src="/img/Inicio/reparando.jpg" alt="ejemplo" className="valores__img" />
                </div>

            </section>

            <section className="equipo">
                
                <h2 className="nosotros__main" >Nuestro Equipo</h2>

                
                    <div className="equipo__flex">
                        <div className="equipo__persona">

                            <div className="equipo1__img">
                                <div className="equipo__info" >
                                    <h3 className="equipo__experiencia" >22 Años de Experiencia</h3>
                                    <h3 className="equipo__especializacion">Especialización en Hidráulica Y Neumática</h3>
                                </div>
                            </div>
                        
                            <div className="equipo__text">
                                <h2 className="equipo__nombre">Alberto García López</h2>
                                <h3 className="equipo__cargo">Fundador y Gerente técnico</h3>
                            </div>
                        </div>

                        <div className="equipo__persona">

                            <div className="equipo2__img">
                                <div className="equipo__info" >
                                    <h3 className="equipo__experiencia" >15 Años de Experiencia</h3>
                                    <h3 className="equipo__especializacion">Especialización en Gestión y Estrategia empresarial</h3>
                                </div>
                            </div>
                        
                            <div className="equipo__text">
                                <h2 className="equipo__nombre">Ericka Castellanos Moreno</h2>
                                <h3 className="equipo__cargo">Socia y Gestión administrativa</h3>
                            </div>
                        </div>

                    </div>
                    <div className="equipo__grid">
                        <div className="equipo__persona">

                            <div className="equipo3__img">
                                <div className="equipo__info" >
                                    <h3 className="equipo__experiencia" >10 Años de Experiencia</h3>
                                    <h3 className="equipo__especializacion">Especialización en Metalmecánica (torno) e Hidráulica.</h3>
                                </div>
                            </div>
                        
                            <div className="equipo__text">
                                <h2 className="equipo__nombre">Eduardo Beluzarán González</h2>
                                <h3 className="equipo__cargo">Técnico Neumohidráulico</h3>
                            </div>
                        </div>

                        <div className="equipo__persona">

                            <div className="equipo4__img">
                                <div className="equipo__info" >
                                    <h3 className="equipo__experiencia" >10 Años de Experiencia</h3>
                                    <h3 className="equipo__especializacion">Especialización en Neumática y equipos de  torque controlado, alto torque y de impacto</h3>
                                </div>
                            </div>
                        
                            <div className="equipo__text">
                                <h2 className="equipo__nombre">David Nilo Ramirez</h2>
                                <h3 className="equipo__cargo">Jefe de Taller</h3>
                            </div>
                        </div>

                        <div className="equipo__persona">

                            <div className="equipo9__img">
                                <div className="equipo__info" >
                                    <h3 className="equipo__experiencia" >40 Años de Experiencia</h3>
                                    <h3 className="equipo__especializacion">Especialización en Electrónica</h3>

                                </div>
                            </div>

                            <div className="equipo__text">
                                <h2 className="equipo__nombre">Santiago Gamboa López</h2>
                                <h3 className="equipo__cargo">Técnico Industrial</h3>
                            </div>
                        </div>

                        <div className="equipo__persona">

                             {/* <div className="equipo5__img">
                                <div className="equipo__info" >
                                    <h3 className="equipo__experiencia" >4 Años de Experiencia</h3>
                                    <h3 className="equipo__especializacion">Administración Bilingüe. Especialización en Ventas en Terreno</h3>

                                </div>
                            </div>
                        
                            <div className="equipo__text">
                                <h2 className="equipo__nombre">José Ampuero Osorio</h2>
                                <h3 className="equipo__cargo">Vendedor Técnico</h3>
                            </div>                          */}
                        </div>

                        <div className="equipo__persona">

                            <div className="equipo10__img">
                                <div className="equipo__info" >
                                    <h3 className="equipo__experiencia" >25 Años de Experiencia</h3>
                                    <h3 className="equipo__especializacion">Diplomado en: tributación, planificación tributaria, contabilidad internacional IFRS</h3>

                                </div>
                            </div>

                            <div className="equipo__text">
                                <h2 className="equipo__nombre">Pamela Araya Vilca</h2>
                                <h3 className="equipo__cargo">Contador Auditor</h3>
                            </div>
                        </div>

                        <div className="equipo__persona">

                            <div className="equipo7__img">
                                <div className="equipo__info" >
                                    <h3 className="equipo__experiencia" >3 Años de Experiencia</h3>
                                    <h3 className="equipo__especializacion">Especialización en Desarrollo Web, Metodología Ágiles y Base de Datos</h3>
                                </div>
                            </div>
                        
                            <div className="equipo__text">
                                <h2 className="equipo__nombre">Franz Cortez Olmedo</h2>
                                <h3 className="equipo__cargo">Desarrollador Full-Stack</h3>
                            </div>
                        </div>

                    </div>
                    <div className="equipo__flex">
                        <div className="equipo__persona">

                            <div className="equipo6__img">
                                <div className="equipo__info" >
                                    <h3 className="equipo__experiencia" >3 Años de Experiencia</h3>
                                    <h3 className="equipo__especializacion">Especialización en RRSS y marketing digital</h3>
                                </div>
                            </div>

                            <div className="equipo__text">
                                <h2 className="equipo__nombre">Joyce García Castellanos</h2>
                                <h3 className="equipo__cargo">Encargada Redes sociales</h3>
                            </div>
                        </div>

                        <div className="equipo__persona">

                            <div className="equipo8__img">
                                <div className="equipo__info" >
                                    <h3 className="equipo__experiencia" >2 Años de Experiencia</h3>
                                    <h3 className="equipo__especializacion">Especialización en Diseño y edición digital</h3>
                                </div>
                            </div>

                            <div className="equipo__text">
                                <h2 className="equipo__nombre">Iskander García Castellanos</h2>
                                <h3 className="equipo__cargo">Encargado Redes Sociales</h3>
                            </div>
                        </div>
                    </div>

                    <div className="equipo__persona">
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
                        <a href="https://maps.app.goo.gl/R1RngNobXN4ow4P8A" target="_blank" className="footer__a" rel="noreferrer"><SiGooglemaps size={15} color={"#e1e1e1"}/>&nbsp; Gran Avenida Radomiro Tomic 7176, Antofagasta</a>
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1537.2943644117688!2d-70.39523170701854!3d-23.592753740747565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96ae2b2f8e4f1c6d%3A0xf8368dc7b3de01e2!2sImpacto%20del%20norte!5e0!3m2!1ses!2scl!4v1692575903581!5m2!1ses!2scl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"/> */}
                    </div>
                </div>

                <p className="footer_r">Todos los derechos reservados Impacto del Norte Copyright ©</p>

            </footer>

        </div>
    )
}

export default Nosotros
