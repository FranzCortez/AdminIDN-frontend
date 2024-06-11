import React from 'react'

function Text({ label, id_name, value, saveValue, cols, rows, placeholder }) {
    return (
        <div className='componente__form'>
            <label htmlFor={id_name} className='componente__form-label' >{label}</label>
            <textarea name={id_name} id={id_name} value={value} onChange={saveValue} cols={cols} rows={rows} placeholder={placeholder}></textarea>
        </div>
    )
}

export default Text;