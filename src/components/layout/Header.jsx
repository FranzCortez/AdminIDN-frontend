import React, { useContext, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTruckMoving, FaStore } from "react-icons/fa";
import { VscTools } from 'react-icons/vsc';
import { RiContactsBook2Line } from "react-icons/ri";
import { AiOutlineDollarCircle, AiOutlinePoweroff, AiOutlineTool, AiFillHome } from "react-icons/ai";
import { ImQrcode } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { BsCalendarCheck } from "react-icons/bs";
import { MdOutlinePlaylistAdd } from "react-icons/md";

import { CRMContext } from "../context/CRMContext";

function Header() {

    const [auth, guardarAuth] = useContext(CRMContext);

    const [ empresa, guardarEmpresa ] = useState(auth.tipo === 3 ? false : true); // true = eirl || false = spa

    React.useEffect(() => {
        guardarEmpresa(auth.tipo === 3 ? false : true);
    }, [auth.tipo]);

    const [expanded, setExpanded] = useState(false);

    let navigate = useNavigate();
    let revision = true;
    
    if(!auth.auth) return null;

    const handleMouseEnter = () => {
        setExpanded(true);
    };
    
    const handleMouseLeave = () => {
        setExpanded(false);
    };
    
    const handleClick = () => {
        setExpanded(!expanded);
    };
    
    const eirl = {
        ruta: '/home',
        texto: 'EIRL',
        icono: <AiOutlineTool size={30} color={"#ebe1e1"} />
    }

    const comercializadora = {
        ruta: '/homecom',
        texto: 'Comercializadora',
        icono: <FaStore  size={30} color={"#f5f5f5"} />
    }

    const cerrarSesion = () => {
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.removeItem('token');
        localStorage.removeItem('ultima');
        localStorage.removeItem('filtroEmpresa');
        localStorage.removeItem('filtroIngreso');
        localStorage.removeItem('filtroFactura');
        localStorage.removeItem('pagina');

        navigate('/login', {replace: true});
    }

    const rutaEirlGenerico = [
        {
            ruta: '/home',
            texto: 'Inicio',
            icono: <AiFillHome size={30} color={"#f5f5f5"}/>
        },
        {
            ruta: '/clientes',
            texto: 'Clientes',
            icono: <RiContactsBook2Line size={30} color={"#f5f5f5"}/>
        },
        {
            ruta: '/ingresos',
            texto: 'Ingresos',
            icono: <MdOutlinePlaylistAdd size={30} color={"#f5f5f5"}/>
        },
        {
            ruta: '/ingresos/tipoherramienta',
            texto: 'Tipo Herramienta',
            icono: <VscTools size={30} color={"#f5f5f5"}/>
        },
        {
            ruta: '/qr/sd/form',
            texto: 'QR sin Datos',
            icono: <ImQrcode size={30} color={"#f5f5f5"}/>
        }
    ];

    const rutaComercializadoraGenerico = [
        {
            ruta: '/homecom',
            texto: 'Inicio',
            icono: <AiFillHome size={30} color={"#ebe1e1"}/>
        },
        {
            ruta: '/clientescom',
            texto: 'Clientes',
            icono: <RiContactsBook2Line size={30} color={"#ebe1e1"}/>
        },
        {
            ruta: '/proveedorescom',
            texto: 'Proveedores',
            icono: <FaTruckMoving size={30} color={"#ebe1e1"}/>
        },
        {
            ruta: '/equiposcom',
            texto: 'Insumos/Equipos',
            icono: <VscTools size={30} color={"#ebe1e1"}/>
        },
        {
            ruta: '/ingresoscom',
            texto: 'Ingresos',
            icono: <MdOutlinePlaylistAdd size={30} color={"#f5f5f5"}/>
        },
    ]

    if(auth.tipo === 1) {
        rutaEirlGenerico.push(
            {
                ruta: '/facturas',
                texto: 'Facturas',
                icono: <AiOutlineDollarCircle size={30} color={"#f5f5f5"}/>
            },  
            {
                ruta: '/balance',
                texto: 'Balance',
                icono: <GoGraph size={30} color={"#f5f5f5"}/>
            },
            {
                ruta: '/usuarios',
                texto: 'Usuarios',
                icono: <FiUsers size={30} color={"#f5f5f5"}/>
            },
            {
                ruta: '/checklist',
                texto: 'Solicitudes',
                icono: < BsCalendarCheck size={30} color={"#f5f5f5"} />
            }
        )
    }

    return (
        <Fragment>
            <div className={`header ${empresa ? 'eirl' : 'com'}`}>

                <div className="sidebar" onClick={handleClick}>
                    <FaBars size={25} color={"#f3f3f3"} />
                </div>

                <Link to="#">
                    {/* <img src="/img/LogoIDN.webp" alt="Logo Impacto del Norte" className="header__logo" /> */}
                </Link>
            </div>

            <div className={`slider ${expanded ? 'expanded' : ''} ${empresa ? 'eirl' : 'com'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                
                <div className="slider__logo">
                    {
                        expanded ? 
                        <img src="/img/LogoIDN.webp" alt="Logo Impacto del Norte" className={`slider__logo-img ${expanded ? 'expanded' : ''}`} />
                        :
                        <div style={{ height: '130px' }}></div>

                    }
                </div>

                <div className="slider__info">
                    {
                        expanded ? 
                            <Fragment>
                                <h4 className="slider__info-nombre" >{auth.nombre}</h4>
                                <h5 className="slider__info-nombre">Impacto del Norte</h5>
                            </Fragment>
                        :
                            empresa ?
                                <h4 className="slider__info-nombre" >EIRL</h4>
                            :
                                <h4 className="slider__info-nombre" >SPA</h4>
                    }
                </div>

                <div className="slider__body">
                    {
                        auth.tipo === 1 ? 
                            <button className="slider__body-button">

                                {
                                    empresa ?
                                    <Link to={comercializadora.ruta}>
                                        <div className="slider__body-button-container" onClick={() => { guardarEmpresa(!empresa) }}>
                                            {comercializadora.icono}
                                            {
                                                expanded ? 
                                                    <h3 className={`slider__body-button-text ${expanded ? 'expanded' : ''}`}>{comercializadora.texto}</h3>
                                                :
                                                    null
                                            }
                                        </div>
                                    </Link>
                                    :
                                    <Link to={eirl.ruta}>
                                        <div className="slider__body-button-container" onClick={() => { guardarEmpresa(!empresa) }}>
                                            {eirl.icono}
                                            {
                                                expanded ? 
                                                    <h3 className={`slider__body-button-text ${expanded ? 'expanded' : ''}`}>{eirl.texto}</h3>
                                                :
                                                    null
                                            }
                                        </div>
                                    </Link>
                                }
                            </button>
                        :
                        null
                    }

                    {
                        empresa ?
                            rutaEirlGenerico.map((ruta, index) => (
                                <button className="slider__body-button" key={index * 3}>
                                    <Link to={ruta.ruta}>
                                        <div className="slider__body-button-container">
                                            {ruta.icono}
                                            {
                                                expanded ? 
                                                    <h3 className={`slider__body-button-text ${expanded ? 'expanded' : ''}`}>{ruta.texto}</h3>
                                                :
                                                    null
                                            }
                                        </div>
                                    </Link>
                                </button>
                            ))
                            :
                            rutaComercializadoraGenerico.map((ruta, index) => (
                                <button className="slider__body-button" key={index * 1000}>
                                    <Link to={ruta.ruta}>
                                        <div className="slider__body-button-container">
                                            {ruta.icono}
                                            {
                                                expanded ? 
                                                    <h3 className={`slider__body-button-text ${expanded ? 'expanded' : ''}`}>{ruta.texto}</h3>
                                                :
                                                    null
                                            }
                                        </div>
                                    </Link>
                                </button>
                            ))

                    }

                    <button className="slider__body-button" onClick={()=>{cerrarSesion()}}>
                        <div className="slider__body-button-container">
                            <AiOutlinePoweroff size={30} color={"#f5f5f5"}/>
                            {
                                expanded ? 
                                    <h3 className={`slider__body-button-text ${expanded ? 'expanded' : ''}`}>Cerrar Sesión</h3>
                                :
                                    null
                            }
                        </div>
                    </button>

                </div>
            </div>

            {/* <div className="offcanvas offcanvas-start sidebar__color" tabIndex="-1" id="sidebarActivo" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <div className="sidebar__header cincuenta">
                        <h1>Menú</h1>
                    </div>
                    <div  className="sidebar__cerrar">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                </div>
                <div className="offcanvas-body">
                    <div className="sidebar__cuerpo">
                       { // controlador a nuevos componente
                            auth.tipo === 1 ?

                                lugar ?

                                <Fragment>

                                    <button onClick={cambio} className="sidebar__none">

                                        <Link to={comercializadora.ruta}>
                                            <div className="sidebar__ruta" data-bs-dismiss="offcanvas" >
                                                {comercializadora.icono}
                                                <h2 className="sidebar__text">{comercializadora.texto}</h2>
                                            </div>
                                        </Link>

                                    </button>

                                    {
                                        rutas.map((ruta, index) => (
                                            <Sidebar ruta={ruta} key={index} lugar={lugar} />
                                        ))
                                    }
                                </Fragment>

                                :

                                <Fragment>

                                    <button onClick={cambio} className="sidebar__none">

                                        <Link to={EIRL.ruta}>
                                            <div className="sidebar__ruta" data-bs-dismiss="offcanvas" >
                                                {EIRL.icono}
                                                <h2 className="sidebar__text">{EIRL.texto}</h2>
                                            </div>
                                        </Link>

                                    </button>

                                    {
                                        rutaComercializadora.map((ruta, index) => (
                                            <Sidebar ruta={ruta} key={index} lugar={lugar} />
                                        ))
                                    }
                                </Fragment>

                            :

                                rutas.map((ruta, index) => (
                                    <Sidebar ruta={ruta} key={index} lugar={lugar} />
                                ))
                       }
                       <div className="sidebar__ruta" data-bs-dismiss="offcanvas" onClick={cerrarSesion}>
                            <AiOutlinePoweroff size={30} color={"#ebe1e1"}/>
                            <h2 className="sidebar__text">Cerrar Sesión</h2>
                        </div>
                    </div>
                </div>
            </div> */}
        </Fragment>
    )
}

export default Header;