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
                <span>Fecha:</span>
                <div className='tarjeta__mantencion tarjeta__input'>
                    {otinTarjeta?.fecha}
                </div>
            </div>

            <div className='tarjeta__campo'>
                <span>Empresa/ sucursal:</span>
                <div className='tarjeta__input'>
                    {otinTarjeta?.empresaNombre}
                </div>
            </div>

            <div className='tarjeta__campo'>
                <span>OTIN:</span>
                <div className='tarjeta__input'>
                    {otinTarjeta?.otin}
                </div>
            </div>

            <div className='tarjeta__campo'>
                <span>Tipo equipo:</span>
                <div className='tarjeta__input'>
                    {otinTarjeta?.equipoNombre}
                </div>
            </div>
            <div className='tarjeta__campo'>
                <span>Modelo:</span>
                <div className='tarjeta__input'>
                    {otinTarjeta?.modelo}
                </div>
            </div>
            <div className='tarjeta__campo'>
                <span>Marca:</span>
                <div className='tarjeta__input'>
                    {otinTarjeta?.marca}
                </div>
            </div>
            <div className='tarjeta__campo'>
                <span>N°Serie:</span>
                <div className='tarjeta__input'>
                    {otinTarjeta?.numeroSerie}
                </div>
            </div>
            <div className='tarjeta__campo'>
                <span>N°Interno:</span>
                <div className='tarjeta__input'>
                    {otinTarjeta?.numeroInterno}
                </div>
            </div>
            <div className='tarjeta__campo'>
                <span>Rango de trabajo:</span>
                <div className='tarjeta__input'>
                    {otinTarjeta?.rango}
                </div>
            </div>
            <div className='tarjeta__campo'>
                <span>Tonelaje:</span>
                <div className='tarjeta__input'>
                    {otinTarjeta?.tonelaje}
                </div>
            </div>
            <div className='tarjeta__campo'>
                <span>Técnico:</span>
                <div className='tarjeta__input'>
                    {otinTarjeta?.tecnico}
                </div>
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