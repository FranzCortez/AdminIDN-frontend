import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { RiFileList2Line } from 'react-icons/ri';

import BarraProgreso from '../../layout/BarraProgreso';
import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

import CertificadoParteUnoB from './CertificadoParteUnoB';
import CertificadoParteDosB from './CertificadoParteDosB';
import CertificadoParteTresB from './CertificadoParteTresB';

import CertificadoDos from './CertificadoDos';

function FormCertificadoB() {

    const { id } = useParams();

    const [ herramienta, guardarHerramienta ] = useState({});

    const [ primero, guardarPrimero ] = useState({});
    const [ segundo, guardarSegundo ] = useState({});
    const [ tercero, guardarTercero ] = useState({});

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    // pagina
    const [page, setPage] = useState("pageone");

    const nextPage = (page) => {
        setPage(page);
    };

    const nextPageNumber = (pageNumber) => {
        switch (pageNumber) {
        case "1":
            setPage("pageone");
            break;
        case "2":
            setPage("pagetwo");
            break;
        case "3":
            setPage("pagethree");
            break;
        case "4":
            alert("Ooops! Seems like you did not fill the form.");
            break;
        default:
            setPage("1");
        }
    };

    const guardarDatosPrimero = (datos) => {
        guardarPrimero(datos);
    }

    const guardarDatosSegundo = (datos) => {
        guardarSegundo(datos);
    }

    const guardarDatosTercero = (datos) => {

        const observaciones = datos.observaciones.split("\n");
        const nota = datos.nota.split("\n");

        guardarTercero({
            observaciones,
            nota,
            rojo: datos.rojo,
            operativo: datos.operativo
        });    

        document.querySelector(".card").style.display = "none";
        document.querySelector("#usuarioEmpresa").style.display = "block";    
    }

    const consultarAPI = async () => {
        try {
            const res = await clienteAxios.get(`ih/ingreso/${id}`,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarHerramienta(res.data)

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
    },[])

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <RiFileList2Line size={50} color={"#333333"}/>
                    <h1>Generar Certificado de Calibración</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos'} className="btn-new btn-error"><IoArrowBackCircleOutline size={25}/> Cancelar Certificado</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <BarraProgreso page={page} onPageNumberClick={nextPageNumber} />
                    {
                        {
                            pageone: <CertificadoParteUnoB onButtonClick={nextPage} guardarDatosPrimero={guardarDatosPrimero} id={id} primero={primero} />,
                            pagetwo: <CertificadoParteDosB onButtonClick={nextPage} guardarDatosSegundo={guardarDatosSegundo} rango={primero.rango} unidad={primero.unidad} segundo={segundo} />,
                            pagethree: <CertificadoParteTresB onButtonClick={nextPage} guardarDatosTercero={guardarDatosTercero} tercero={tercero} />
                        }[page]
                    }
                </div>
            </div>

            <CertificadoDos
                primero={primero}
                segundo={segundo}
                tercero={tercero}
                herramienta={herramienta}
            />
        
        </Fragment>
    )
}

export default FormCertificadoB;