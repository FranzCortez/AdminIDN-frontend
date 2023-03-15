import React from 'react';

function FormularioBuscarEmpresa(props) {
    return (
        <form className='form-buscar' onSubmit={props.buscarEmpresa}>
            <div className='campo-buscar'>
                <input 
                    type="text" 
                    id='buscar'
                    name='buscar'
                    placeholder='Buscar por nombre de empresa'
                    onChange={props.leerBusqueda}
                    value={props.texto}
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

export default FormularioBuscarEmpresa;