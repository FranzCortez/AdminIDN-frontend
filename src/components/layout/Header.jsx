import React, { useContext, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { VscTools } from 'react-icons/vsc';
import { RiContactsBook2Line } from "react-icons/ri";
import { AiOutlineDollarCircle, AiOutlinePoweroff, AiOutlineTool, AiFillHome } from "react-icons/ai";
import { ImQrcode } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { BsCalendarCheck, BsShopWindow } from "react-icons/bs";

import Sidebar from "./Sidebar";

import { CRMContext } from "../context/CRMContext";

function Header() {

    const [auth, guardarAuth] = useContext(CRMContext);
    const [lugar, guardarLugar] = useState(true);

    let navigate = useNavigate();
    
    if(!auth.auth) return null;

    const EIRL = {
        ruta: '/home',
        texto: 'EIRL',
        icono: <AiOutlineTool size={50} color={"#333333"} />
    }

    const comercializadora = {
        ruta: '/comercializadora',
        texto: 'Comercializadora',
        icono: <BsShopWindow size={50} color={"#333333"} />
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

    let rutas = [
        {
            ruta: '/home',
            texto: 'Inicio',
            icono: <AiFillHome size={50} color={"#333333"}/>
        },
        {
            ruta: '/clientes',
            texto: 'Clientes',
            icono: <RiContactsBook2Line size={50} color={"#333333"}/>
        },
        {
            ruta: '/ingresos',
            texto: 'Ingresos',
            icono: <AiOutlineTool size={50} color={"#333333"}/>
        },
        {
            ruta: '/ingresos/tipoherramienta',
            texto: 'Tipo Herramienta',
            icono: <VscTools size={50} color={"#333333"}/>
        },
        {
            ruta: '/qr/sd/form',
            texto: 'QR sin Datos',
            icono: <ImQrcode size={50} color={"#333333"}/>
        } 
    ]

    let rutaComercializadora = [
        {
            ruta: '/home',
            texto: 'Inicio',
            icono: <AiFillHome size={50} color={"#333333"}/>
        },
        {
            ruta: '/clientes',
            texto: 'Clientes',
            icono: <RiContactsBook2Line size={50} color={"#333333"}/>
        },
        {
            ruta: '/ingresos',
            texto: 'Ingresos',
            icono: <AiOutlineTool size={50} color={"#333333"}/>
        },
        {
            ruta: '/ingresos/tipoherramienta',
            texto: 'Tipo Herramienta',
            icono: <VscTools size={50} color={"#333333"}/>
        },
        {
            ruta: '/qr/sd/form',
            texto: 'QR sin Datos',
            icono: <ImQrcode size={50} color={"#333333"}/>
        } 
    ]
    if(auth.tipo === 1) {
        rutas.push(
            {
                ruta: '/facturas',
                texto: 'Facturas',
                icono: <AiOutlineDollarCircle size={50} color={"#333333"}/>
            },  
            {
                ruta: '/balance',
                texto: 'Balance',
                icono: <GoGraph size={50} color={"#333333"}/>
            },
            {
                ruta: '/usuarios',
                texto: 'Usuarios',
                icono: <FiUsers size={50} color={"#333333"}/>
            },
            {
                ruta: '/checklist',
                texto: 'Solicitudes',
                icono: < BsCalendarCheck size={50} color={"#333333"} />
            }
        )

        rutaComercializadora.push(
            {
                ruta: '/facturas',
                texto: 'Facturas',
                icono: <AiOutlineDollarCircle size={50} color={"#333333"}/>
            },  
            {
                ruta: '/balance',
                texto: 'Balance',
                icono: <GoGraph size={50} color={"#333333"}/>
            },
            {
                ruta: '/usuarios',
                texto: 'Usuarios',
                icono: <FiUsers size={50} color={"#333333"}/>
            },
            {
                ruta: '/checklist',
                texto: 'Solicitudes',
                icono: < BsCalendarCheck size={50} color={"#333333"} />
            }
        )
    }

    const cambio = () => {
        
        const sidebar = document.querySelector('.sidebar__color');
        const menu = document.querySelector('.sidebar__header');
        const header = document.querySelector('.header');
        const canvas = document.querySelector('.offcanvas-header');
        if ( lugar ) {
            sidebar.style.backgroundColor = '#2566e8'
            menu.style.backgroundColor = '#2566e8'
            canvas.style.backgroundColor = '#2566e8'
            header.style.backgroundColor = '#2566e8'
        } else {
            sidebar.style.backgroundColor = '#ff8533'
            header.style.backgroundColor = '#ff8533'
            canvas.style.backgroundColor = '#ff8533'
            menu.style.backgroundColor = '#ff8533'
        }

        guardarLugar(!lugar);
    }

    return (
        <Fragment>
            <div className="header">

                <div className="sidebar"  data-bs-toggle="offcanvas" data-bs-target="#sidebarActivo">
                    <FaBars size={25} color={"#f3f3f3"} />
                </div>

                <Link to="#">
                    <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className="header__logo" />
                </Link>
            </div>

            <div className="offcanvas offcanvas-start sidebar__color" tabIndex="-1" id="sidebarActivo" aria-labelledby="offcanvasExampleLabel">
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
                                            <Sidebar ruta={ruta} key={index} />
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
                                            <Sidebar ruta={ruta} key={index} />
                                        ))
                                    }
                                </Fragment>

                            :

                                rutas.map((ruta, index) => (
                                    <Sidebar ruta={ruta} key={index} />
                                ))
                       }
                       <div className="sidebar__ruta" data-bs-dismiss="offcanvas" onClick={cerrarSesion}>
                            <AiOutlinePoweroff size={50} color={"#333333"}/>
                            <h2 className="sidebar__text">Cerrar Sesión</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Header;