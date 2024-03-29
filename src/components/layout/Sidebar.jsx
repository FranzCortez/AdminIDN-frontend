import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ruta, lugar}) {

    return (
        <Link to={ruta.ruta}>
            <div className="sidebar__ruta" data-bs-dismiss="offcanvas" >
                {ruta.icono}
                <h2 className={ lugar ? "sidebar__text" : "sidebar__text-com" }>{ruta.texto}</h2>
            </div>
        </Link>
    )
}

export default Sidebar