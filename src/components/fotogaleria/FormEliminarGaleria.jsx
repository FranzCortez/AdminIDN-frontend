import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiFillPicture } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

function FormEliminarGaleria() {

    const { id } = useParams();

    const [ fotos, guardarFotos ] = useState({});
    const [ eliminar, guardarEliminar ] = useState([]);

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const actualizarState = e => {

        const guardar = [...eliminar];

        const repetido = guardar.find(foto => foto === e.target.name);

        if (repetido) {
            guardarEliminar(guardar.filter(foto => foto !== e.target.name));
            return;
        }

        guardar.push(e.target.name);

        guardarEliminar(guardar);
    }

    const validarForm = () => {
        
        if( eliminar.length !== 0 ){
            return false;
        }

        return true;
    }

    const eliminarFotos = (e) => {

        e.preventDefault();

        Swal.fire ({
            title: '¿Estás seguro de eliminar?',
            text: "Un foto eliminada no se puede recuperar",
            type: 'warning',
            showCancelButton : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText : 'Sí, ¡Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then( (result) => {
            if (result.value) {
                clienteAxios.post(`ih/ingreso/foto/eliminar/${id}`, {eliminar},{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }).then(res => {
                    Swal.fire( 'Eliminado', res.data.msg, 'success');
                    navigate(`/fotogaleria/${id}`, {replace: true});
                });
            }
        });
    }

    const consultarAPI = async () => {
        
        try {
            const res = await clienteAxios.get(`ih/ingreso/foto/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarFotos(res.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {        
        
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {
            
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }      
    }, []);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <AiFillPicture size={50} color={"#333333"}/>
                    <h1>Eliminar Fotos de Galería</h1>
                </div>

                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/fotogaleria/${id}`} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Seleccione la o las fotos a Eliminar: </h2>
                    <h3 className='card-body-subtitle'> Haga click en las imagenes a eliminar y luego oprima "Eliminar" </h3>

                    <form onSubmit={eliminarFotos}>                              
                        <div className='card-grid-img'> 
                            {
                                fotos.rutas ? 
                                fotos.rutas.map( (foto, index) => (
                                        <label htmlFor={index}>
                                            <input type="checkbox" name={foto} id={index} onClick={actualizarState} />
                                            <img className='card-img-grid' src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}${foto}`} key={index} alt="" id={index}/>
                                        </label>
                                ))
                                :
                                <h2 className='card-body-subtitle'>Agregue fotos a esta OTIN para poder verlas</h2>
                            }               
                        </div>

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-error'}
                                value="Eliminar Fotos"
                                disabled={validarForm()}
                            />
                        </div>
                    </form>

                </div>
            </div>
        </Fragment>
    )
}

export default FormEliminarGaleria
