import { Link } from "react-router-dom";
import moment from "moment";
import { BiEditAlt } from 'react-icons/bi';
import SolicitudDescripcion from "./SolicitudDescripcion";

function Solicitud({ solicitud }) {

    const estado = (estado) => {
        switch (estado) {
            case 'En Proceso':
                return 'solicitud__estado-proceso';
            case 'En Revisión':
                return 'solicitud__estado-revison';
            case 'Aprobado':
                return 'solicitud__estado-aprobado';
            case 'Cancelado':
                return 'solicitud__estado-cancelado';
            case 'Entregado':
                return 'solicitud__estado-entregado';
            default:
                return '';
        }
    }
    
    return (
        <tr className='table__tr'>
                <td>{solicitud?.titulo}</td>
                <td className={estado(solicitud.estado)} >{solicitud?.estado}</td>
                <td>{solicitud?.prioridad}</td>
                <td>{solicitud?.tipo}</td>
                <td>{solicitud?.de}</td>
                <td>{moment(solicitud?.fechaSolicitud).format('DD-MM-YYYY')}</td>
                <td>{solicitud?.fechaRespuesta ? moment(solicitud?.fechaRespuesta).format('DD-MM-YYYY') : '-'}</td>
                <td>{solicitud?.version ? solicitud.version : '-'}</td>
                <td>
                    <div className='table__opciones'>
                        <Link to={`editar/${solicitud.id}`}><button type='button' className="btn btn-warning" ><BiEditAlt size={23} color="#ffff"/></button></Link>
                        <SolicitudDescripcion id={solicitud.id} descripcion={solicitud.descripcion} titulo={solicitud.titulo} />
                    </div>               
                </td>
            </tr>
    )
}

export default Solicitud
