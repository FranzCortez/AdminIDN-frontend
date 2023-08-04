import { Fragment, useState, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";

function InicioPrueba() {

    const [offset, setOffset] = useState(0);

    const firstEfect = () => {
        const img = document.querySelector('#imagenServicios');
        img.classList.remove('dn');
        img.classList.add('nuestros__servicios-B');
    }

    if( offset > 276 ) {
        firstEfect();
    }

    const onScroll = () => setOffset(window.pageYOffset);
    useEffect(() => {
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    
    
    return(
        
        <div className="back__main" >
            <div className="hero__espacio"></div>
            <div className="hero__main" ></div>
            
            <img className="hero__logo" src="/img/LogoIDN.png" />

            <header>
                <nav className="lista">
                    <ul className="lista__opciones">
                        <li className="lista__opcion" >
                            <a href="" className="lista__link" >Inicio</a>
                        </li>
                        <li className="lista__opcion" >
                            <a href="" className="lista__link" >Nuestros Servicios</a>
                        </li>
                        <li className="lista__opcion" >
                            <a href="" className="lista__link" >Nosotros</a>
                        </li>
                        <li className="lista__opcion" >
                            <a href="" className="lista__link" >Galería</a>
                        </li>
                        <li className="lista__opcion" >
                            <a href="" className="lista__link" >Horario</a>
                        </li>
                        <li className="lista__opcion" >
                            <a href="" className="lista__link" >Contacto</a>
                        </li>
                        <li className="lista__opcion" >
                            <a href="" className="lista__link" >Sesión</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="nuestros__servicios">
                <div className="nuestros__servicios-A">
                    <h1 className="nuestros__servicios-AT" >Nuestros Servicios</h1>
                    <div className='servicios__lista' >
                        <div className='servicios__campo' >
                            {/* <MdOutlineVerified size={} className='servicios__ticket' /> */}
                            <img src="/img/Inicio/check.png" alt="check" className="servicios__ticket" />
                            <p className='servicios__texto' >Reparación de herramientas hidráulicas, neumáticas y de torque.</p>
                        </div>

                        <div className='servicios__campo' >
                            {/* <MdOutlineVerified size={} className='servicios__ticket' /> */}
                            <img src="/img/Inicio/check.png" alt="check" className="servicios__ticket" />
                            <p className='servicios__texto' >Venta de insumos y consumibles diversos (ferretería, soldadura, oficina, etc.).</p>
                        </div>

                        <div className='servicios__campo' >
                            {/* <MdOutlineVerified size={} className='servicios__ticket' /> */}
                            <img src="/img/Inicio/check.png" alt="check" className="servicios__ticket" />
                            <p className='servicios__texto' >Venta y arriendo de herramientas diversas</p>
                        </div>

                        <div className='servicios__campo' >
                            {/* <MdOutlineVerified size={} className='servicios__ticket' /> */}
                            <img src="/img/Inicio/check.png" alt="check" className="servicios__ticket" />
                            <p className='servicios__texto' >Fabricación de extensiones de impacto y para RAD, pernos de anclaje, abrazaderas y flexibles hidráulicos.</p>
                        </div>

                        <div className='servicios__campo' >
                            {/* <MdOutlineVerified size={} className='servicios__ticket' /> */}
                            <img src="/img/Inicio/check.png" alt="check" className="servicios__ticket" />
                            <p className='servicios__texto' >Servicios de torque en terreno.</p>
                        </div>
                    </div>
                </div>

                <div className="dn" id="imagenServicios" >
                    {/* <img src="/img/Inicio/broca.jpg" alt="broca" /> */}
                    <div></div>
                </div>

                <div class="clientes">
                    <div class="clientes-slide">
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

                    <div class="clientes-slide">
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

        </div>

    )
}

export default InicioPrueba;