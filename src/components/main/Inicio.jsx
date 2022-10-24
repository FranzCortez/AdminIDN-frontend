import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div><h1>inicio</h1>
        <Link to={`/login`}>INICIAR SESION</Link>
    </div>
  )
}

export default Inicio;