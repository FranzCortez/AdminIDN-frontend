import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

function Header() {
    return (
        <div className="header">
            <Link to="#">
                <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className="header__logo" />
            </Link>

            <div className="header__user">
                <h3>Hola! Carlos</h3>
                <button type="button" className="btn btn-cerrar">
                    Cerrar Sesión <BiLogOut/>
                </button>
            </div>
        </div>
    )
}

export default Header;