function FormSelectCheckList({ selectionForm }) {
    return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <button className='btn-new btn-login' onClick={selectionForm} value={1}>Herramienta Eléctrica</button>
        <button className='btn-new btn-login' onClick={selectionForm} value={2}>Herramienta Hidráulica / Neumática</button>
        <button className='btn-new btn-login' onClick={selectionForm} value={3}>Herramienta Torque / Impacto</button>
    </div>
  )
}

export default FormSelectCheckList