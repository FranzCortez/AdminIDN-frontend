import React, { useState } from 'react';

const CRMContext = React.createContext([ {}, () => {} ]);

const CRMPovider = props => {
    // definir el state
    const [auth, guardarAuth] = useState({
        token: '',
        auth: false
    });

    return (
        <CRMContext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </CRMContext.Provider>
    )
}

export { CRMContext, CRMPovider };