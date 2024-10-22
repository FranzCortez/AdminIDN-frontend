import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { RiFileList2Line } from 'react-icons/ri';

import BarraProgreso from '../../layout/BarraProgreso';
import clienteAxios from '../../../config/axios';
import { CRMContext } from '../../context/CRMContext';

import CertificadoParteUnoA from './CertificadoParteUnoA';
import CertificadoParteDosA from './CertificadoParteDosA';
import CertificadoParteTresA from './CertificadoParteTresA';

import CertificadoUno from './CertificadoUno';

function FormCertificadoA() {

    const { id } = useParams();

    const [ herramienta, guardarHerramienta ] = useState({});

    const [ primero, guardarPrimero ] = useState({});
    const [ segundo, guardarSegundo ] = useState({});
    const [ tercero, guardarTercero ] = useState({});

    const [ certificados, guardarCertificados ] = useState(true);

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
        const mantencion = datos.mantencion.split("\n");
        const conclusion = datos.conclusion.split("\n");
        
        guardarSegundo({
            mantencion,
            conclusion
        });

        document.querySelector(".card").style.display = "none";
        document.querySelector("#usuarioEmpresa").style.display = "block"; 
    }

    const guardarDatosTercero = (datos) => {
        guardarTercero(datos);    
    }

    const guardarCheckCertificado = (check) => {
        guardarCertificados(check);
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
                    <h1>Generar Certificado de Mantención</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos'} className="btn-new btn-error"><IoArrowBackCircleOutline size={25}/> Cancelar Certificado</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <BarraProgreso page={page} onPageNumberClick={nextPageNumber} />
                    {
                        {
                            pageone: <CertificadoParteUnoA onButtonClick={nextPage} guardarDatosPrimero={guardarDatosPrimero} primero={primero} />,
                            pagetwo: <CertificadoParteTresA onButtonClick={nextPage} guardarDatosTercero={guardarDatosTercero} tercero={tercero} />,
                            pagethree: <CertificadoParteDosA onButtonClick={nextPage} guardarDatosSegundo={guardarDatosSegundo} segundo={segundo} checkCertificados={certificados} guardarCheckCertificado={guardarCheckCertificado} />
                        }[page]
                    }
                </div>
            </div>

            <CertificadoUno
                primero={primero}
                segundo={segundo}
                tercero={tercero}
                herramienta={herramienta}
                certificados={certificados}
            />
        
        </Fragment>
    )
}

export default FormCertificadoA;