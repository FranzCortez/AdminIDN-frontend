import React from 'react';

function Paginacion(props) {

    const pag = [];

    for(let i = 0; i < props.cantPaginas; i++){

        if ( i + 1 === props.cantPaginas ) {
            pag.push(i);
        } else if ( ( props.offset > 8 ? 
            props.offset > props.cantPaginas - 11 ? 
            i >= props.cantPaginas-11
            :
            (props.offset-1) < i && i < ( props.offset + 9 )
            : i < 10 ) ) {
            pag.push(i);
        } else if ( i === ( props.offset + 10 ) ){
            pag.push('...');
        }
    }

    return (
        <nav className="navigation-new">
            <ul className="pagination pagination-lg">
                <li className="page-item" onClick={() => props.pagActual(0)}>
                    <p className='page-link'>{'<<'}</p>
                </li>

                <li className="page-item" onClick={() => props.pagActual( props.offset === 0 ? 0 : props.offset-1 )}>
                    <p className='page-link'>{'<'}</p>
                </li>
            {
                pag.map(item => (
                    
                    item === props.offset ? 
                        <li className="page-item active" key={item} value={item} onClick={() => item === '...' ? null : props.pagActual(item)}>
                            <p className='page-link'>{item === '...' ? item : item+1}</p>
                        </li>
                    :
                    <li className="page-item" key={item} value={item} onClick={() => item === '...' ? null : props.pagActual(item)}>
                        <p className='page-link'>{item === '...' ? item : item+1}</p>
                    </li>
                    
                ))
            }

                <li className="page-item" onClick={() => props.pagActual( props.offset === props.cantPaginas-1 ? (props.cantPaginas-1) : props.offset+1 )}>
                    <p className='page-link'>{'>'}</p>
                </li>

                <li className="page-item" onClick={() => props.pagActual(props.cantPaginas-1)}>
                        <p className='page-link'>{'>>'}</p>
                </li>
            </ul>
        </nav>
    )
}

export default Paginacion;