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
import Draggable from "react-draggable";

function InicioPrueba() {

    const [auth, guardarAuth] = useContext(CRMContext);

    const [ confeti, guardarConfeti ] = useState(false);
    
    const [isModalOpen, setModalOpen] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const toggleWindow = () => {
        setIsVisible(!isVisible);
    };


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

            {isVisible && <div style={styles.overlay} className="over" />}

            {
                isVisible &&
                (<Draggable>
                    <div style={styles.window} className="window">
                        <div style={styles.header}>
                            INFORMACIÓN IMPORTANTE
                        <button style={styles.closeButton} onClick={toggleWindow}>
                            X
                        </button>
                        </div>
                        <div style={styles.content} className="window-content">
                            <div style={styles.center}>
                                <img src="/img/Inicio/iso.png" alt="nuevo" style={styles.img} />
                            </div>
                            <div style={styles.subcontent}>
                                <a href="https://maps.app.goo.gl/7f3ju2AiEkdFVL2v5" target="_blank" className="modal-link" rel="noreferrer"><SiGooglemaps size={30} />&nbsp; Colombia # 650, Antofagasta</a> 
                                <iframe  title="impacto del norte mapa"  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.3063227253406!2d-70.39147982310321!3d-23.629198460952207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96afd529376314eb%3A0x187091499750cd73!2sColombia%20650%2C%201242152%20Antofagasta!5e0!3m2!1ses!2scl!4v1727924003332!5m2!1ses!2scl" width="400" height="250" style={{border: "0", display: 'block', margin: '0 auto'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                <p className="modal-p">Haz clic en la ubicación para ir al mapa</p>
                            <button className="btn-new btn-error" onClick={toggleWindow} >OK</button>
                            </div>
                        </div>
                    </div>
                </Draggable>)
            }


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
                        <img src="img/Inicio/clientes/Fernorte.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Sermaind.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/PowerTrain.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/CPK.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Mecamin.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Comercial-San-Ignacio.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/FCAB.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/ND_logo.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/MD-logo.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/tech.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/qs.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/tc.jpeg" alt="Bailac" />
                        <img src="img/Inicio/clientes/sergomet.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/tormetal.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/rocktrain.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/feram.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/flanders.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/kaufmann.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/cobra.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/konecranes.png" alt="Bailac" />
                    </div>

                    <div className="clientes-slide">
                        <img src="img/Inicio/clientes/Bailac.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Fernorte.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Sermaind.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/PowerTrain.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/CPK.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Mecamin.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/Comercial-San-Ignacio.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/FCAB.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/ND_logo.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/MD-logo.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/tech.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/qs.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/tc.jpeg" alt="Bailac" />
                        <img src="img/Inicio/clientes/sergomet.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/tormetal.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/rocktrain.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/feram.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/flanders.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/kaufmann.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/cobra.png" alt="Bailac" />
                        <img src="img/Inicio/clientes/konecranes.png" alt="Bailac" />
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
                        <a href="https://maps.app.goo.gl/R1RngNobXN4ow4P8A" target="_blank" className="footer__a" rel="noreferrer"><SiGooglemaps size={15} color={"#e1e1e1"}/>&nbsp; Colombia # 650, Antofagasta</a>
                    </div>
                </div>

                <p className="footer_r">Todos los derechos reservados Impacto del Norte Copyright ©</p>

            </footer>
        </div>

        

    )
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semitransparente
    },
    window: {
        width: "90%",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        position: "fixed",
        top: "20%",
        left: "5%",
      },
      header: {
        backgroundColor: "#F58549",
        color: "white",
        padding: "10px",
        textAlign: "center",
        cursor: "move",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        fontsize: "20px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      closeButton: {
        backgroundColor: "transparent",
        border: "none",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
      },
      content: {
        padding: "15px",
        overflowY: "auto", // Habilitar scroll vertical si el contenido excede la altura
        maxHeight: "600px", // Altura máxima del contenido para que se habilite el scroll
        display: "flex",
        height: "100%",
        flexDirection: "column",
        gap: "10px",
      },
      subcontent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      img: {
        margin: "0 auto",
        height: "100%",
        width: "80%"
      },
      center: {
        display: "flex",
        justifyContent: "center",
      }
  };

export default InicioPrueba;