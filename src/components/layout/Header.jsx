import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RiContactsBook2Fill } from "react-icons/ri";

import Sidebar from "./Sidebar";

function Header() {

    const rutas = [
        {
            ruta: '/clientes',
            texto: 'Clientes',
            icono: <RiContactsBook2Fill size={50} />
        },
        {
            ruta: '/usuarios',
            texto: 'Usuarios',
            icono: <RiContactsBook2Fill size={50} />
        }
    ]


    return (
        <Fragment>
            <div className="header">

                <div className="sidebar">
                    <FaBars size={25} color={"#f3f3f3"} data-bs-toggle="offcanvas" data-bs-target="#sidebarActivo" />
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