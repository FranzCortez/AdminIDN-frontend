import React from 'react';

function FormBuscarTipoHerramienta(props) {
    return (
        <form className='form-buscar' onSubmit={props.buscarHerramienta}>
            <div className='campo-buscar'>
                <input 
                    type="text" 
                    id='buscar'
                    name='buscar'
                    placeholder='Buscar por tipo de Herramienta'
                    onChange={props.leerBusqueda}
                />
                <input
                    className='campo-buscar-enviar'
                    type="submit" 
                    value={"Buscar"}                
                />
                <input
                    className='campo-buscar-limpiar'
                    type="submit" 
                    value={"Limpiar Filtros"} 
                    onClick={props.escucharCambio}               
                />
            </div>
        </form>
    )
}

export default FormBuscarTipoHerramienta;