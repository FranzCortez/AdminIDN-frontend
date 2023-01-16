import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineCamera } from "react-icons/ai";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

function FormFotoGaleria() {

    const { id } = useParams();

    const fileTypes = ["JPG", "PNG", "JPEG"];

    const [fotos, setFotos] = useState(null);

    const handleChange = (foto) => {
        setFotos( foto );
    };

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const agregarIngreso = async (e) => {
        e.preventDefault();
        
        try {            
            const res = await clienteAxios.post(`/ih/ingreso/foto/${id}`, fotos,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            Swal.fire({
                title: 'Foto agregada correctamente',
                text: res.data.msg,
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: 'Subir más fotos',
                denyButtonText: `Regresar Inicio`,
                cancelButtonText: 'Cotizar'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  
                } else if (result.isDenied) {
                    navigate('/ingresos', {replace: true});
                } else {
                    // cotizar
                    navigate(`/cotizacion/nuevo/${id}`, {replace: true});
                }
            });
                
            // redireccionar
        } catch (error) {
            console.log(error)
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.msg,
                timer: 1500
            });            
        }
        
    }

    const validarForm = () => {

        if( fotos !== null ){
            return false;
        }

        return true;
    }

    useEffect(() => {
        if(!(auth.auth && (localStorage.getItem('token') === auth.token))){  
            navigate('/login', {replace: true});
        } else if (auth.tipo !== 1 && auth.tipo !== 2){ 
            navigate('/login', {replace: true});
        }
    },[]);

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <AiOutlineCamera size={50} color={"#333333"}/>
                    <h1>Nueva Foto</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos'} className="btn-new btn-return"><IoArrowBackCircleOutline size={25}/> Regresar</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Seleccione la o las fotos: </h2>
                    <h3 className='card-body-subtitle'> IMPORTANTE: Debe seleccionar todas las fotos de una vez y darle a "subir" (no ir seleccionando de 1 en 1), cuando tenga nuevas fotos tendrá que repetir el proceso </h3>

                    <form onSubmit={agregarIngreso}>                                             

                        <div className="campo centerFlex">
                            
                            <label htmlFor="imagen">Foto Galería:<span className='campo__obligatorio'>*</span>:</label>
                            <FileUploader 
                                className={"foto"}
                                handleChange={handleChange} 
                                name="fotos" 
                                id="imagen"
                                types={fileTypes} 
                                multiple={true}
                                label={"Seleccione o Arrastre la Foto"}
                            />
                        </div>               

                        <div className="enviar">
                            <input 
                                type="submit" 
                                className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                                value="Subir Fotos"
                                disabled={validarForm()}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default FormFotoGaleria;