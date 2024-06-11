import moment from 'moment';

import '../com.css';
import { Fragment } from 'react';

import IngresoInformacionModal from './IngresoInformacionModal';

function IngresoCom({ data }) {


    return (
        <tr className='ic__table-tr'>
            <td className='ic__table-td'>{data.ovin}</td>
            <td className='ic__table-td'>{ data.fecha !== '0000-00-00' ? moment(data.fecha).format('DD-MM-YYYY') : '--'}</td>
            <td className='ic__table-td'>{data.clienteContactoCom.clienteEmpresaCom.nombre}</td>
            <td className='ic__table-td'>{data.clienteContactoCom.nombre.split(' ')[0]}</td>
            <td className='ic__table-td'>{data.tipo}</td>
            <td className='ic__table-td'>
                <textarea disabled name="" id="" cols="30" rows="2">{data.descripcion}</textarea>
            </td>
            <td className='ic__table-td'>
                {
                    data.numeroGuiaDespacho ?
                        <Fragment>
                            {data.numeroGuiaDespacho} / { data.fechaGuiaDespacho !== '0000-00-00' ? moment(data.fechaGuiaDespacho).format('DD-MM-YYYY') : '--'}
                        </Fragment>
                    :
                    '--'
                }
            </td>
            <td className='ic__table-td'>--</td>
            <td className='ic__table-td'>{data.statusOrdenCompra ? 'Si' : 'No'}</td>
            <td className='ic__table-td'><buttonv className="btn-new" >Cotizar</buttonv></td>
            <td className='ic__table-td'><IngresoInformacionModal ingreso={data} /></td>
            <td className='ic__table-td' style={{background:data.usuario.color}} >{data.usuario.nombre.split(' ')[0]}</td>
        </tr>
    )
}

export default IngresoCom