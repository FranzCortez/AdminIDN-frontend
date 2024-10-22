import React from 'react'
import moment from 'moment';

function Tarjeta({
  otinTarjeta
}) {
  return (
    <div className='tarjeta'>
      <div id="imagen-contenedor" >
        <div className='tarjeta__background'>

            <div className='tarjeta__titulo'>
                <h1 >Ingreso</h1>
            </div>
            <div className='tarjeta__campo'>
                <span>Fecha:</span> <textarea rows={1} className='tarjeta__input' type="text" defaultValue={moment(otinTarjeta?.fecha).format('DD-MM-YYYY')} />
            </div>

            <div className='tarjeta__campo'>
                <span>Empresa/ sucursal:</span> <textarea rows={1} className='tarjeta__input' type="text" defaultValue={otinTarjeta?.clienteContacto?.clienteEmpresa?.nombre} />
            </div>

            <div className='tarjeta__campo'>
                <span>OTIN:</span> <textarea rows={1} className='tarjeta__input' type="text" defaultValue={otinTarjeta?.otin} />
            </div>

            <div className='tarjeta__campo'>
                <span>Tipo de equipo:</span> <textarea rows={1} className='tarjeta__input' type="text" defaultValue={otinTarjeta?.tipoHerramientum?.nombre} />
            </div>
            <div className='tarjeta__campo'>
                <span>Modelo:</span> <textarea rows={1} className='tarjeta__input' type="text" defaultValue={otinTarjeta.modelo} />
            </div>
            <div className='tarjeta__campo'>
                <span>Marca:</span> <textarea rows={1} className='tarjeta__input' type="text" defaultValue={otinTarjeta.marca}/>
            </div>
            <div className='tarjeta__campo'>
                <span>N°Serie:</span> <textarea rows={1} className='tarjeta__input' type="text" defaultValue={otinTarjeta.numeroSerie}/>
            </div>
            <div className='tarjeta__campo'>
                <span>N°Interno:</span> <textarea rows={1} className='tarjeta__input' type="text" defaultValue={otinTarjeta.modelo}/>
            </div>
            <div className='tarjeta__campo'>
                <span>Rango de trabajo:</span> <textarea rows={1} className='tarjeta__input' type="text" />
            </div>
            <div className='tarjeta__campo'>
                <span>Tonelaje:</span> <textarea rows={1} className='tarjeta__input' type="text" />
            </div>
            <div className='tarjeta__campo'>
                <span>Técnico:</span> <textarea rows={1} className='tarjeta__input' type="text" defaultValue={otinTarjeta.tecnico} />
            </div>
            
            <div className='tarjeta__contenedor'>
            </div>
            <div className='tarjeta__contenedor2'>
            </div>
        </div>
    </div>
    </div>

  )
}

export default Tarjeta;