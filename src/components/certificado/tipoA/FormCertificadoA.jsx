import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { RiFileList2Line } from 'react-icons/ri';

import BarraProgreso from '../../layout/BarraProgreso';

import CertificadoParteUnoA from './CertificadoParteUnoA';
import CertificadoParteDosA from './CertificadoParteDosA';
import CertificadoParteTresA from './CertificadoParteTresA';

function FormCertificadoA() {

    const [ primero, guardarPrimero ] = useState({});
    const [ segundo, guardarSegundo ] = useState({});
    const [ tercero, guardarTercero ] = useState({});

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
        guardarTercero(datos);
    }

    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <RiFileList2Line size={50} color={"#333333"}/>
                    <h1>Generar Certificado</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos'} className="btn-new btn-error"><IoArrowBackCircleOutline size={25}/> Cancelar Certificado</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <BarraProgreso page={page} onPageNumberClick={nextPageNumber} />
                    {
                        {
                            pageone: <CertificadoParteUnoA onButtonClick={nextPage} guardarDatosPrimero={guardarDatosPrimero} />,
                            pagetwo: <CertificadoParteDosA onButtonClick={nextPage} guardarDatosSegundo={guardarDatosSegundo} />,
                            pagethree: <CertificadoParteTresA guardarDatosTercero={guardarDatosTercero}/>
                        }[page]
                    }
                </div>
            </div>
        
        </Fragment>
    )
}

export default FormCertificadoA;