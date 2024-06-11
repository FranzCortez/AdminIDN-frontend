import React from 'react'

function Input({ label, id_name, value, saveValue, disabled, tipo, placeholder }) {
    return (
        <div className='componente__form'>
            <label htmlFor={id_name} className='componente__form-label' >{label}</label>
            <input className='componente__form-input' id={id_name} name={id_name} type={tipo} disabled={disabled} value={value} onChange={saveValue} placeholder={placeholder} />
        </div>
    )
}

export default Input;