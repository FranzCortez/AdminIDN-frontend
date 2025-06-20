import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import Swal from 'sweetalert2';
import Modal from 'react-modal';

import clienteAxios from "../../config/axios";
import { CRMContext } from "../context/CRMContext";

Modal.setAppElement('#root');

function FormFiltroIngreso(props) {

    const [ tipos, guardarTipos ] = useState([]); 
    const [ empresas, guardarEmpresas ] = useState([]); 

    // filtro
    const [ filtro, guardarFiltro ] = useState({
        fecha: props.filtros?.fecha ? props.filtros.fecha : '', 
        otin: props.filtros?.otin ? props.filtros.otin : '', 
        nombre: props.filtros?.nombre ? props.filtros.nombre : '',
        marca: props.filtros?.marca ? props.filtros.marca : '',
        modelo: props.filtros?.modelo ? props.filtros.modelo : '',
        numeroInterno: props.filtros?.numeroInterno ? props.filtros.numeroInterno : '',
        numeroSerie: props.filtros?.numeroSerie ? props.filtros.numeroSerie : '',
        empresaId: props.filtros?.empresaId ? props.filtros.empresaId : '',
        tipoHerramientaId: props.filtros?.tipoHerramientaId ? props.filtros.tipoHerramientaId : '',
        activo: props.filtros?.activo ? props.filtros.activo : ''
    });
    
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate(); 

    const consultarAPI = async () => {
        try {

            const resTipo = await clienteAxios.get(`tipo/categoria/herramienta`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
    
            guardarTipos(resTipo.data);

            const resEmpresa = await clienteAxios.get(`empresas/empresaNombre`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarEmpresas(resEmpresa.data);

        } catch (error) {
            console.log(error)
            if(error.request.status === 404 ) {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.msg,
                    timer: 1500
                })
            }
            // redireccionar
            navigate('/ingresos', {replace: true});
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    
    function closeSearch(e) {
        e.preventDefault();
        setIsOpen(false);
        props.escucharCambio();
    }

    const filtros = (e) => {
        guardarFiltro({
            ...filtro,
            [e.target.name] : e.target.value
        });
    }

    const reinicio = () => { 

        guardarFiltro({
            fecha: '', 
            otin: '', 
            nombre: '',
            marca: '',
            modelo: '',
            numeroInterno: '',
            numeroSerie: '',
            empresaId: '',
            tipoHerramientaId: '',
            activo: ''
        });

        props.guardarFiltro({
            fecha: '', 
            otin: '', 
            nombre: '',
            marca: '',
            modelo: '',
            numeroInterno: '',
            numeroSerie: '',
            empresaId: '',
            tipoHerramientaId: '',
            activo: ''
        });
    }

    const envio = () => {
        props.guardarFiltro(filtro);
    }

    useEffect(() => {        
        
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2 || auth.tipo === 4) ) {
            
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }      
    }, []);

    return (
        <div>
            <button className='btn-new btn-return' onClick={openModal}><FiFilter color={'#FFFFFF'} size={20}/> Filtros </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal modal__filtro"
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >

                <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
                <h2 className='modal__titulo'>Filtros de Ingreso</h2>
                
                <form onSubmit={closeSearch}>

                    <div className='modal__grid'>
                        <div>
                            <div className='campo'>
                                <label htmlFor="otin">OTIN:</label>
                                <input 
                                    type="text" 
                                    id='otin'
                                    name='otin'
                                    placeholder='OTIN'
                                    onChange={filtros}
                                    value={filtro.otin}
                                />
                            </div>

                            <div className='campo'>
                                <label htmlFor="empresaId">Empresa:</label>
                                <select name="empresaId" id="empresaId" 
                                    onChange={filtros}
                                    defaultValue={filtro.empresaId}
                                    >
                                <option value={0} > Todos </option>    
                                {
                                    empresas.map(empresa => (
                                        <option value={empresa.id} key={empresa.id}>{empresa.nombre}</option>
                                    ))
                                }
                            </select>
                            </div>

                            <div className='campo'>
                                <label htmlFor="tipoHerramientaId">Herramienta:</label>
                                <select name="tipoHerramientaId" id="tipoHerramientaId"
                                    onChange={filtros}
                                    defaultValue={filtro.tipoHerramientaId}
                                >
                                    <option value={0}> Todos </option>    
                                    {
                                        tipos.map(tipo => (
                                            <option value={tipo.id} key={tipo.id}>{tipo.nombre}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            
                            <div className='campo'>
                                <label htmlFor="activo">Activo:</label>
                                <select name="activo" id="activo" 
                                    onChange={filtros}
                                    defaultValue={filtro.activo}
                                >
                                    <option value="0">Cualquiera</option>
                                    <option value="1">Si</option>
                                    <option value="2">No</option>
                                </select>
                            </div>                            

                            <div className='campo'>
                                <label htmlFor="fecha">Fecha Ingreso:</label>
                                <input 
                                    type="date" 
                                    id='fecha'
                                    name='fecha'
                                    placeholder='Fecha Ingreso de la Herramienta'
                                    onChange={filtros}
                                    value={filtro.fecha}
                                />
                            </div>
                        </div>

                        <div>
                            <div className='campo'>
                                <label htmlFor="marca">Marca:</label>
                                <input
                                    onChange={filtros} 
                                    type="text" 
                                    id='marca'
                                    name='marca'
                                    placeholder='Marca'
                                    value={filtro.marca}
                                />
                            </div>

                            <div className='campo'>
                                <label htmlFor="modelo">Modelo:</label>
                                <input
                                    onChange={filtros} 
                                    type="text" 
                                    id='modelo'
                                    name='modelo'
                                    placeholder='Modelo'
                                    value={filtro.modelo}
                                />
                            </div>

                            <div className='campo'>
                                <label htmlFor="numeroSerie">N° Serie:</label>
                                <input
                                    onChange={filtros} 
                                    type="number" 
                                    id='numeroSerie'
                                    name='numeroSerie'
                                    placeholder='N° Serie'
                                    value={filtro.numeroSerie}
                                />
                            </div>

                            <div className='campo'>
                                <label htmlFor="numeroInterno">N° Interno:</label>
                                <input
                                    onChange={filtros} 
                                    type="number" 
                                    id='numeroInterno'
                                    name='numeroInterno'
                                    placeholder='N° Interno'
                                    value={filtro.numeroInterno}
                                />
                            </div>

                            <div className='campo'>
                                <label htmlFor="nombre">Nombre:</label>
                                <input
                                    onChange={filtros} 
                                    type="text" 
                                    id='nombre'
                                    name='nombre'
                                    placeholder='Nombre'
                                    value={filtro.nombre}
                                />
                            </div>
                        </div>

                        <div className='wifu'>
                            <div className="enviar filtro">
                                <input
                                    type="submit" 
                                    className={ 'btn-new btn-return'}
                                    value="Reiniciar Filtro"
                                    onClick={reinicio}
                                />
                                <input 
                                    className={ 'btn-new btn-login'}
                                    type="submit" 
                                    value="Buscar"
                                    onClick={envio}
                                />
                            </div>
                        </div>
                    </div>

                </form>
                
            </Modal>
        </div>
    );
}

export default FormFiltroIngreso;
