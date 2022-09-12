import React from 'react';

function Paginacion(props) {

    const pag = [];

    for(let i = 0; i < props.cantPaginas; i++){
        pag.push(i);
    }

    return (
        <nav className="navigation-new">
            <ul className="pagination pagination-lg">

            {
                pag.map(item => (

                    item === props.offset ? 
                        <li className="page-item active" key={item} value={item} onClick={() => props.pagActual(item)}>
                            <p className='page-link'>{item+1}</p>
                        </li>
                    :
                    <li className="page-item" key={item} value={item} onClick={() => props.pagActual(item)}>
                        <p className='page-link'>{item+1}</p>
                    </li>
                    
                ))
            }
            </ul>
        </nav>
    )
}

export default Paginacion;