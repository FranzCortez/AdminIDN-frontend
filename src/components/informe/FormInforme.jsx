import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { RiFileList2Line } from 'react-icons/ri';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

import BarraProgreso from '../layout/BarraProgreso';

import InformeParteUno from './InformeParteUno';
import InformeParteDos from './InformeParteDos';
import InformeParteTres from './InformeParteTres';

import Informe from "./Informe";

function FormInforme() {

    const { id } = useParams();

    const [ primero, guardarPrimero ] = useState({});
    const [ segundoFotoA, guardarSegundoFotoA ] = useState([]);
    const [ segundoTextoA, guardarSegundoTextoA ] = useState('');
    const [ segundoFotoB, guardarSegundoFotoB ] = useState([]);
    const [ segundoTextoB, guardarSegundoTextoB ] = useState('');
    const [ tercero, guardarTercero ] = useState({
        conclusion: [''],
        falla: [''],
        recomendacion: ['']
    });
    const [ herramienta, guardarHerramienta ] = useState({});

    let navigate = useNavigate();

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext); 

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
    
    const guardarDatosSegundo = async (fotosPrimero, textoPrimero, fotosSegundo, textoSegundo) => {

        guardarSegundoFotoA(await consultarBase(fotosPrimero));
        guardarSegundoFotoB(await consultarBase(fotosSegundo));
        
        guardarSegundoTextoA(textoPrimero);
        guardarSegundoTextoB(textoSegundo);
    }

    const guardarDatosTercero = (datos) => {

        const conclusion = datos.conclusion.split("\n");
        const falla = datos.falla.split("\n");
        const recomendacion = datos.recomendacion.split("\n");

        document.querySelector(".card").style.display = "none";
        document.querySelector("#usuarioEmpresa").style.display = "block";

        guardarTercero({
            conclusion,
            falla,
            recomendacion
        });
    }

    const consultarBase = async (fotos) => {
        try {
            console.log("entre")
            const res = await clienteAxios.post(`ih/base/foto`, {fotos: fotos}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            return res.data;

        } catch (error) {
            console.log(error)
            navigate('/ingresos', {replace: true});
        }
    }

    const consultarAPI = async () => {
        
        try {

            const res = await clienteAxios.get(`ih/ingreso/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarHerramienta(res.data);

        } catch (error) {
            console.log(error)
            navigate('/ingresos', {replace: true});
        }
    }

    useEffect(() => {
        if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {            
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }   
    }, [])
    
    return (
        <Fragment>
            <div className="card contenedor">
                <div className="card-header">
                    <RiFileList2Line size={50} color={"#333333"}/>
                    <h1>Generar Informe OTIN: #####</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={'/ingresos'} className="btn-new btn-error"><IoArrowBackCircleOutline size={25}/> Cancelar Informe</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <BarraProgreso page={page} onPageNumberClick={nextPageNumber} />
                    {
                        {
                            pageone: <InformeParteUno onButtonClick={nextPage} guardarDatosPrimero={guardarDatosPrimero} />,
                            pagetwo: <InformeParteDos onButtonClick={nextPage} guardarDatosSegundo={guardarDatosSegundo} />,
                            pagethree: <InformeParteTres guardarDatosTercero={guardarDatosTercero}/>
                        }[page]
                    }
                </div>
            </div>

            <Informe              
                primero={primero}
                segundoFotoA={segundoFotoA}
                segundoTextoA={segundoTextoA}
                segundoFotoB={segundoFotoB}
                segundoTextoB={segundoTextoB}
                tercero={tercero}
                herramienta={herramienta}
            />
        </Fragment>
    )
}

export default FormInforme;