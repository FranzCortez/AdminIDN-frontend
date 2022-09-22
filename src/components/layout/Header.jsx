import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RiContactsBook2Line } from "react-icons/ri";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { CgEnter } from "react-icons/cg";
import { RiFileList2Line } from "react-icons/ri";
import { MdOutlineRequestQuote } from "react-icons/md";
import { ImQrcode } from "react-icons/im";
import { FiUsers } from "react-icons/fi";

import Sidebar from "./Sidebar";

import { CRMContext } from "../context/CRMContext";

function Header() {

    const [auth, guardarAuth] = useContext(CRMContext);
    
    if(!auth.auth) return null;

    let rutas = [
        {
            ruta: '/clientes',
            texto: 'Clientes',
            icono: <RiContactsBook2Line size={50} color={"#333333"}/>
        },
        {
            ruta: '/ingresos',
            texto: 'Ingresos',
            icono: <CgEnter size={50} color={"#333333"}/>
        },
        {
            ruta: '/cotizacion',
            texto: 'Cotización',
            icono: <MdOutlineRequestQuote size={50} color={"#333333"}/>
        },
        {
            ruta: '/informe',
            texto: 'Informe',
            icono: <RiFileList2Line size={50} color={"#333333"}/>
        },
        {
            ruta: '/facturas',
            texto: 'Facturas',
            icono: <AiOutlineDollarCircle size={50} color={"#333333"}/>
        },
        {
            ruta: '/qr',
            texto: 'QR',
            icono: <ImQrcode size={50} color={"#333333"}/>
        }        
    ]

    if(auth.tipo === 1) {
        rutas.push({
            ruta: '/usuarios',
            texto: 'Usuarios',
            icono: <FiUsers size={50} color={"#333333"}/>
        })
    } else if (auth.tipo === 3) {
        rutas = [
            {
                ruta: '/cotizacion',
                texto: 'Cotización',
                icono: <MdOutlineRequestQuote size={50} color={"#333333"}/>
            },
            {
                ruta: '/informe',
                texto: 'Informe',
                icono: <RiFileList2Line size={50} color={"#333333"}/>
            },
        ];
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
                            rutas.map((ruta, index) => (
                                <Sidebar ruta={ruta} key={index} />
                            ))
                       }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Header;