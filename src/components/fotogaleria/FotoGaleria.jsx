import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiFillPicture } from "react-icons/ai";
import { MdPhotoCamera } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

function FotoGaleria() {

    const { id } = useParams();

    const [ fotos, guardarFotos ] = useState({});

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const consultarAPI = async () => {
        
        try {
            const res = await clienteAxios.get(`ih/ingreso/foto/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            console.log(res.data.rutas.length  === 0)
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
                    <h1>Foto Galería</h1>
                </div>
                <div className="card-body">

                <div className='card-body-options'>

                    <Link to={'/ingresos'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>

                    <Link to={`/fotogaleria/eliminar/${id}`} type="button" className="btn-new btn-error">
                        <RiDeleteBin2Line size={25}/> Seleccionar y Eliminar Foto
                    </Link>

                    <Link to={`/fotogaleria/nuevo/${id}`} type="button" className="btn-new btn-success-new">
                        <MdPhotoCamera size={25}/> Subir Fotos
                    </Link>
                </div>

                    {
                        fotos.rutas && fotos.rutas?.length !== 0 ? 
                        null
                        :
                        <h1 className='card-body-subtitle'>Aun no hay fotos</h1>
                    }

                    <div className='card-grid-img'> 
                        
                        {
                            fotos.rutas && fotos.rutas?.length !== 0 ? 
                            fotos.rutas.map( (foto, index) => (
                                <img className='card-img-grid' src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}${foto}`} key={index} alt="" />
                            ))
                            :                            
                            <h2 className='card-body-subtitle'>Agregue fotos a esta OTIN para poder verlas</h2>
                        }

                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default FotoGaleria;