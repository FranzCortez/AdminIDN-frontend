import React from 'react';
import { Fragment } from 'react';

function TablaResumenOtin({ meses, data, año, total, tipo }) {

    return (
        <Fragment>

            <h2 className='card-body-subtitle'>
                {tipo} año {año} 
            </h2>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr className='table__head'>
                            {
                                meses.length > 0 ?
                                    meses.map((mes,index) =>(
                                        <th scope="col" key={index}>{mes}</th>
                                    ))
                                :
                                null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        {
                            data.length > 0 ?
                                    data.map((info, index) => (
                                        <td  key={index} style={{textAlign:'center'}} >{(info)}</td>
                                    ))
                                    :
                                    null
                                }
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 className='card-body-subtitle'>
                {tipo} total: {(total)}
            </h3>
        </Fragment>
    )
}

export default TablaResumenOtin;
