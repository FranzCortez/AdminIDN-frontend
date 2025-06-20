import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { RiFileEditFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { MdPhotoCamera } from 'react-icons/md';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

Modal.setAppElement('#root');

function SeleccionImagen({ primero }) {

    const { id } = useParams();

    const [ fotos, guardarFotos ] = useState([]);
    const [ seleccion, guardarSeleccion ] = useState([]);
    const [ texto, guardarTexto ] = useState('');

    let navigate = useNavigate();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext); 

    // MODAL
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);       
        guardarSeleccion([]); 
    }

    function closeModal() {
        setIsOpen(false);
    }

    const seleccionFotos = (e) => {

        let guardar = [...seleccion];

        const eliminar = guardar.find( (foto) => foto === e.target.value);

        if ( eliminar ) {
            
            guardar = guardar.filter( foto => foto !== e.target.value );
            
        } else {
            guardar.push(e.target.value);
        }

        guardarSeleccion(guardar);
    }

    const actualizarState = (e) => {
        guardarTexto({
            [e.target.name] : e.target.value
        });
    }

    const validarForm = () => {

        if( !(!texto?.texto?.length || !seleccion.length ) ){
            return false;
        }

        return true;
    }

    const enviar = e => {
        e.preventDefault();
        primero(texto.texto, seleccion);
        closeModal();
    }

    const consultarAPI = async () => {
        
        try {

            const res = await clienteAxios.get(`ih/ingreso/foto/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarFotos(res.data.rutas)            

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2 || auth.tipo === 4) ) {            
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }   
    }, [])

    return (
        <Fragment>
            
            <div className='enviar'>
                <button className='btn-new btn-success-new' onClick={openModal}> Editar Cuadro<RiFileEditFill size={20}/></button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >

                <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
                <h1 className='modal__titulo'>Edición Cuadro</h1>                
                
                <form onSubmit={enviar}>
                    <div className='seleccion overflow-auto'>
                        {
                            fotos ? 
                                fotos.map((foto, index) => (
                                    <label htmlFor={index} key={index}>
                                        <input type="checkbox" name={"foto"} value={foto} id={index} onChange={seleccionFotos} />
                                        <img src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}${foto}`} alt="" key={index} id={index} />
                                    </label>
                                ))
                            : 
                                <div>
                                    <p>No existen fotos, vaya la foto galería y suba fotos</p>
                                    <Link to={`/fotogaleria/nuevo/${id}`} className="btn-new btn-success-new">
                                        <MdPhotoCamera size={25}/> Subir Fotos
                                    </Link>
                                </div>
                        }
                    </div>

                    <div className="campo">
                        <label htmlFor="texto">Texto:<span className='campo__obligatorio'>*</span>:</label>
                        <input 
                            type="text" 
                            id='texto'
                            name='texto'
                            // defaultValue={datos.nombre}
                            placeholder='Descripción de las imagenes seleccionadas'
                            onChange={actualizarState}
                        />
                    </div>

                    <div className="enviar">
                        <input 
                            type="submit" 
                            className={ validarForm() ? "btn-new"  : 'btn-new btn-success-new'}
                            value="Guardar Cambios"
                            disabled={validarForm()}
                        />
                    </div>
                </form>
                
            </Modal>
        </Fragment>
    )
}

export default SeleccionImagen