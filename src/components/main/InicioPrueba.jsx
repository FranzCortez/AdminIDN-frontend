import { Fragment, useState, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";

function InicioPrueba() {

    const [offset, setOffset] = useState(0);

    const firstEfect = () => {
        const img = document.querySelector('#imagenServicios');
console.log("entre")
        img.classList.remove('dn');
        img.classList.add('nuestros__servicios-B');
        
    }

    if( offset > 276 ) {
        firstEfect();
    }
    console.log(offset > 276); 

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
                <nav>
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
                </div>

                <div className="dn" id="imagenServicios" >
                    {/* <img src="/img/Inicio/broca.jpg" alt="broca" /> */}
                    <div></div>
                </div>
            </main>

        </div>

    )
}

export default InicioPrueba;