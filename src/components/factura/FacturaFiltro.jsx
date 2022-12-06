import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import Swal from 'sweetalert2';
import Modal from 'react-modal';

import clienteAxios from "../../config/axios";
import { CRMContext } from "../context/CRMContext";

Modal.setAppElement('#root');

function FacturaFiltro(props) {

    const [ empresas, guardarEmpresas ] = useState([]); 
    const [ year, guardarYear ] = useState([]);

    // filtro
    const [ filtro, guardarFiltro ] = useState({
        fechaFactura: '', 
        numeroFactura: '', 
        estado: 'Todos',
        mes: '',
        year: '',
        idEmpresa: '',
    });

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate(); 

    const consultarAPI = async () => {
        try {

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
            fechaFactura: '', 
            numeroFactura: '', 
            estado: '',
            idEmpresa: '',
        });

        props.guardarFiltro({
            fechaFactura: '', 
            numeroFactura: '', 
            estado: '',
            idEmpresa: '',
        });
    }

    const envio = () => {
        props.guardarFiltro(filtro);
    }

    const calcularYear = () => {
        
        const inicio = 2022;

        const fecha = parseInt(new Date().getFullYear());

        const lista = [];

        for (let i = inicio; i <= fecha; i++) {
            lista.push(i);
        }

        guardarYear(lista);
    }

    useEffect(() => {        
        
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {
            
            consultarAPI();
            calcularYear();
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
                className="Modal"
                contentLabel="Example Modal"
                overlayClassName="Overlay"
            >

                <p onClick={closeModal} className="modal__close"><AiOutlineClose/></p> 
                <h2 className='modal__titulo'>Filtros de Factura</h2>
                
                <form onSubmit={closeSearch}>

                    <div className='modal__grid'>
                        <div>

                            <div className='campo'>
                                <label htmlFor="idEmpresa">Empresa:</label>
                                <select name="idEmpresa" id="idEmpresa" 
                                    onChange={filtros}
                                    defaultValue={filtro.idEmpresa}
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
                                <label htmlFor="fechaFactura">Fecha Factura:</label>
                                <input 
                                    type="date" 
                                    id='fechaFactura'
                                    name='fechaFactura'
                                    onChange={filtros}
                                    value={filtro.fechaFactura}
                                />
                            </div>

                            <div className='campo'>
                                <label htmlFor="year">Año:</label>
                                <select name="year" id="year" 
                                    onChange={filtros}
                                    defaultValue={filtro.year}
                                >
                                    <option value="">Todos</option>
                                    {
                                        year.length > 0 ?
                                            year.map(data => (
                                                <option value={data} key={data}>{data}</option>
                                            ))
                                        :
                                            null
                                    }
                                </select>
                            </div> 
                        </div>

                        <div>
                                                        
                            <div className='campo'>
                                <label htmlFor="estado">Estado:</label>
                                <select name="estado" id="estado" 
                                    onChange={filtros}
                                    defaultValue={filtro.estado}
                                >
                                    <option value="Todos">Todos</option>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Pagado">Pagado</option>
                                    <option value="Vencido">Vencido</option>
                                    <option value="Anulada">Anulada</option>
                                </select>
                            </div>  

                            <div className='campo'>
                                <label htmlFor="numeroFactura">N° Factura:</label>
                                <input
                                    onChange={filtros} 
                                    type="number" 
                                    id='numeroFactura'
                                    name='numeroFactura'
                                    placeholder='N° Factura'
                                    value={filtro.numeroFactura}
                                />
                            </div>

                            <div className='campo'>
                                <label htmlFor="mes">Mes:</label>
                                <select name="mes" id="mes" 
                                    onChange={filtros}
                                    defaultValue={filtro.mes}
                                >
                                    <option value="">Todos</option>
                                    <option value="01">Enero</option>
                                    <option value="02">Febrero</option>
                                    <option value="03">Marzo</option>
                                    <option value="04">Abril</option>
                                    <option value="05">Mayo</option>
                                    <option value="06">Junio</option>
                                    <option value="07">Julio</option>
                                    <option value="08">Agosto</option>
                                    <option value="09">Septiembre</option>
                                    <option value="10">Octubre</option>
                                    <option value="11">Noviembre</option>
                                    <option value="12">Diciembre</option>
                                </select>
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
    )
}

export default FacturaFiltro;