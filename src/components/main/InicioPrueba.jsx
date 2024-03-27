import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlinePrecisionManufacturing, MdOutlineVerified, MdArrowForwardIos } from "react-icons/md";
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { VscTools } from "react-icons/vsc";
import { RiShoppingBagLine } from "react-icons/ri";
import { GiDrill } from "react-icons/gi";
import { HiMail } from "react-icons/hi";
import { BsTelephoneInbound, BsWhatsapp } from "react-icons/bs";
import { SiGooglemaps } from "react-icons/si"
import Confeti from "../layout/Confeti";
import Modal from "./Modal";

import clienteAxios from "../../config/axios";
import { CRMContext } from '../context/CRMContext';

function InicioPrueba() {

    const [auth, guardarAuth] = useContext(CRMContext);

    const [ confeti, guardarConfeti ] = useState(false);
    
    const [isModalOpen, setModalOpen] = useState(0);

    const [offset, setOffset] = useState(0);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [e2, setE2] = useState(false);
    const [e3, setE3] = useState(false);

    const firstEffect = () => {
        const img = document.querySelector('#imagenServicios');
        img.classList.remove('dn');
        img.classList.add('nuestros__servicios-B');
    }

    const secondEffect = () => {
        if (e2) return
        const serv = document.querySelectorAll(".servicios__campo");
        serv.forEach(div=>div.classList.add('servicios__animacion'));
        setTimeout(() => {
            setE2(!e2);
            serv.forEach(div=>{
                div.classList.remove('servicios__animacion');
                div.classList.add('servicios__animacion-off');
            });
        }, 1500);
    }

      const closeModal = () => {
        setModalOpen(1);
      };

    const thirdEffect = () => {

        if (e3) return
        const sello = document.querySelectorAll(".sello__img");
        const text = document.querySelectorAll(".typing-animation");
        text.forEach( text => {
            text.classList.add('typing-animation-set');
        });
        sello.forEach(sello => {
            sello.classList.add('sello__img-e');
        })

        setE3(!e3);
    }

    if ( windowSize.width > 768 ) {
        if( offset > 276 ) {
            firstEffect();
        } 
        if ( offset > 400 ) {
            secondEffect();
        }
        if ( offset > 800) {
            thirdEffect()
        }
    } else {
        if( offset > 276 ) {
            firstEffect();
        } 
        if ( offset > 400 ) {
            secondEffect();
        }
        if ( offset > 1500) {
            thirdEffect()
        }
    }
    // console.log(windowSize.width)
    console.log(offset)

    function hashLinkScroll(hash) {
        if (hash !== '') {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) element.scrollIntoView();
          }, 0);
        }
    }
  
    const consultarAPI = async () => {
        
        try {
            const res = await clienteAxios.get(`efecto`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarConfeti(res.data.find(efecto=> efecto.nombre === 'Confeti' && efecto.activo === true))
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const onScroll = () => setOffset(window.pageYOffset);
    useEffect(() => {
        consultarAPI();
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
    
    
    return(
        
        <div className="back__main" >
            
            {
                confeti ? 
                <Confeti></Confeti>
                :
                null
            }

            {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>¡ Nueva ubicación de Impacto del Norte !</h2>
                <h1>Encuéntranos en:</h1>
                <a href="https://maps.app.goo.gl/R1RngNobXN4ow4P8A" target="_blank" className="modal-link" rel="noreferrer"><SiGooglemaps size={30} />&nbsp; Gran Avenida Radomiro Tomic 7176, Antofagasta</a> 
                <iframe title="impacto del norte mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.9901016713147!2d-70.38697995074226!3d-23.604687935778667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96ae2b2f8e4f1c6d%3A0xf8368dc7b3de01e2!2sImpacto%20del%20norte!5e0!3m2!1ses!2scl!4v1702584586260!5m2!1ses!2scl" style={{border: "0", display: 'block', margin: '0 auto'}} width="400" height="250" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <p className="modal-p">Haz clic en la ubicación para ir al mapa</p>
            </Modal> */}

            <div className="hero__espacio"></div>
            <div className="hero__main" id="hero__main"></div>
            
            <img className="hero__logo" src="/img/LogoIDN.webp" alt="logo IDN" />

            <header>
                <nav className="lista">
                    <ul className="lista__opciones">
                        <li className="lista__opcion" >
                            <div onClick={() => hashLinkScroll('hero__main')} className="lista__link" >Inicio</div>
                        </li>
                        <li className="lista__opcion" >
                            <div onClick={() => hashLinkScroll('servicios__lista')} className="lista__link" >Nuestros Servicios</div>
                        </li>
                        <li className="lista__opcion" >
                            {/* <div href="" className="lista__link" >Nosotros</div> */}
                            <Link to="/nosotros">
                                <div className="lista__link" >Nosotros</div>
                            </Link>
                        </li>
                        {/* <li className="lista__opcion" >
                            <div href="" className="lista__link" >Galería</div>
                        </li> */}
                        <li className="lista__opcion" >
                            <div onClick={() => hashLinkScroll('cotizacion')} className="lista__link" >Contacto</div>
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
            </header>

            <main className="nuestros__servicios">
                <div className="nuestros__servicios-A">
                    <h1 className="nuestros__servicios-AT" >Nuestros Servicios</h1>
                    <div className='servicios__lista' id="servicios__lista">
                        <div className='servicios__campo' >
                            {/* <img src="/img/Inicio/check.png" alt="check" className="servicios__ticket" /> */}
                            <VscTools size={50} color={"#e1e1e1"}/>
                            <p className='servicios__texto' >Reparación y mantención de herramientas hidráulicas, neumáticas y de torque</p>
                            <Link to={'/servicios/reparacion'}>
                                <button className="servicios__btn" >Conoce más <MdArrowForwardIos size={20} /></button>
                            </Link>
                        </div>

                        <div className='servicios__campo' >
                            {/* <img src="/img/Inicio/check.png" alt="check" className="servicios__ticket" /> */}
                            <HiOutlineShoppingCart size={50} color={"#e1e1e1"}/>
                            <p className='servicios__texto' >Venta de insumos y consumibles diversos (ferretería, soldadura, oficina, etc.)</p>
                            <Link to={'/servicios/insumos'}>
                                <button className="servicios__btn" >Conoce más <MdArrowForwardIos size={20} /></button>
                            </Link>
                        </div>

                        <div className='servicios__campo' >
                            {/* <img src="/img/Inicio/check.png" alt="check" className="servicios__ticket" /> */}
                            <RiShoppingBagLine size={50} color={"#e1e1e1"}/>
                            <p className='servicios__texto' >Venta y arriendo de herramientas diversas</p>
                            
                            <Link to={'/servicios/venta'}>
                                <button className="servicios__btn" >Conoce más <MdArrowForwardIos size={20} /></button>
                            </Link>
                        </div>

                        <div className='servicios__campo' >
                            {/* <img src="/img/Inicio/check.png" alt="check" className="servicios__ticket" /> */}
                            <MdOutlinePrecisionManufacturing size={50} color={"#e1e1e1"}/>
                            <p className='servicios__texto' >Fabricación de extensiones de impacto, pernos de anclaje, abrazaderas y flexibles hidráulicos</p>
                            <Link to={'/servicios/fabricacion'}>
                                <button className="servicios__btn" >Conoce más <MdArrowForwardIos size={20} /></button>
                            </Link>
                        </div>

                        <div className='servicios__campo' >
                            {/* <img src="/img/Inicio/check.png" alt="check" className="servicios__ticket" /> */}
                            <GiDrill size={50} color={"#e1e1e1"}/>
                            <p className='servicios__texto' >Servicios de torque en terreno</p>
                            <Link to={'/servicios/torque'}>

                                <button className="servicios__btn" >Conoce más <MdArrowForwardIos size={20} /></button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="dn" id="imagenServicios" >
                    {/* <img src="/img/Inicio/broca.jpg" alt="broca" /> */}
                    <div></div>
                </div>

                <div className="clientes">

            
                    <h1 className="noticias__titulo">Algunos de Nuestros clientes</h1>

                    <div className="clientes-slide">
                        <img src="img/Inicio/clientes/Bailac.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/HEMAQ.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Fernorte.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Sermaind.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/PowerTrain.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/ingSPA.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/CPK.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Mecamin.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Comercial-San-Ignacio.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/FCAB.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/ND_logo.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/MD-logo.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/tech.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/franca.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/gl.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/logo1024.webp" alt="Bailac" />
                        <img src="img/Inicio/clientes/ges.jpg" alt="Bailac" />
                        <img src="img/Inicio/clientes/qs.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/tc.jpeg" alt="Bailac" />
                        <img src="img/Inicio/clientes/sergomet.png" alt="Bailac" />
                    </div>

                    <div className="clientes-slide">
                        <img src="img/Inicio/clientes/Bailac.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/HEMAQ.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Fernorte.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Sermaind.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/PowerTrain.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/ingSPA.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/CPK.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Mecamin.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Comercial-San-Ignacio.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/FCAB.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/ND_logo.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/MD-logo.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/tech.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/franca.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/gl.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/logo1024.webp" alt="Bailac" />
                        <img src="img/Inicio/clientes/ges.jpg" alt="Bailac" />
                        <img src="img/Inicio/clientes/qs.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/tc.jpeg" alt="Bailac" />
                        <img src="img/Inicio/clientes/sergomet.png" alt="Bailac" />
                    </div>
                </div>
            </main>

            <section className="sello">
                <div className="sello__container">
                    <h1 className="sello__titulo" >Nuestro Sello <span>en mantención y reparación</span></h1>

                    <div className="sello__grupo">
                        <div className="sello__campo">
                            <img className="sello__img" src="/img/Inicio/Galeria/antes.jpg" alt="antes" />
                            <div className="typing-container">
                                <span className="typing-animation">&#10003; Entrega en tiempos establecidos</span>
                                <span className="typing-animation">&#10003; Precios justos</span>
                                <span className="typing-animation">&#10003; Calidad en nuestro trabajo</span>
                                <span className="typing-animation">&#10003; Responsabilidad y Honestidad</span>
                                <span className="typing-animation">&#10003; Hacemos un seguimiento de los <br />equipos de nuestros clientes donde siempre <br /> buscamos tener una <strong>MANTENCIÓN PREVENTIVA <br />ANTES QUE CORRECTIVA</strong></span>
                            </div>
                            <img className="sello__img" src="/img/Inicio/Galeria/despues.jpg" alt="despues" />
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="noticias">

                <h1 className="noticias__titulo">Noticias</h1>

                <div className="noticias__cuerpo">

                    <div className="noticias__card">
                        <div className="noticias__img">
                            <img src="/img/Inicio/red.png" alt="" />
                        </div>
                        <div className="noticias__body">
                            <h2 className="noticias__subtitulo">
                                ¡Desde 2022 ya somos parte!
                            </h2>
                            <p className="noticias__texto">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus molestias optio, cumque facere provident quaerat modi maxime alias laudantium aliquam eligendi quo, fugit maiores, obcaecati dolorum quibusdam quae soluta commodi.
                            </p>
                        </div>
                    </div>
                    <div className="noticias__card">
                        <div className="noticias__img">
                            <img src="/img/Inicio/red.png" alt="" />
                        </div>
                        <div className="noticias__body">
                            <h2 className="noticias__subtitulo">
                                ¡Desde 2022 ya somos parte!
                            </h2>
                            <p className="noticias__texto">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus molestias optio, cumque facere provident quaerat modi maxime alias laudantium aliquam eligendi quo, fugit maiores, obcaecati dolorum quibusdam quae soluta commodi.
                            </p>
                        </div>
                    </div>
                    <div className="noticias__card">
                        <div className="noticias__img">
                            <img src="/img/Inicio/red.png" alt="" />
                        </div>
                        <div className="noticias__body">
                            <h2 className="noticias__subtitulo">
                                ¡Desde 2022 ya somos parte!
                            </h2>
                            <p className="noticias__texto">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus molestias optio, cumque facere provident quaerat modi maxime alias laudantium aliquam eligendi quo, fugit maiores, obcaecati dolorum quibusdam quae soluta commodi.
                            </p>
                        </div>
                    </div>

                </div>
            </section> */}

            <section className="cotizacion" id="cotizar">
                <div className="cotizacion__card">
                    <h2 className="cotizacion__titulo">¡Cotiza con nosotros!</h2>
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
                    </div>
                </div>

                <p className="footer_r">Todos los derechos reservados Impacto del Norte Copyright ©</p>

            </footer>
        </div>

        

    )
}

export default InicioPrueba;