import React from 'react'

function Select({ label, id_name, opciones, value, saveValue, disabledSelect = false }) {

    return (
        <div className='componente__form'>
            <label htmlFor={id_name} className='componente__form-label' >{label}</label>
            <select name={id_name} id={id_name} value={value} onChange={saveValue} className='componente__form-input' disabled={disabledSelect}>
                <option value={0} disabled>-- Seleccione --</option>
                {
                    opciones.map((data) => (
                        <option value={data.value} key={Math.floor(Math.random() * 1000000)}>{data.text}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Select;