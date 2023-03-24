import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { RiFileList2Line } from 'react-icons/ri';

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

import BarraProgreso from '../layout/BarraProgreso';

import InformeParteUno from '../informe/InformeParteUno';
import InformeParteDos from '../informe/InformeParteDos';
import InformeParteTres from '../informe/InformeParteTres';

import PDF from './pdf/PDF';

function FormInfoCot({ contenido, cotizacion, herramientaInfo, cotizacionBackend, contenidoBack, datosInfo }) {
    
    const { id } = useParams();

    const [ primero, guardarPrimero ] = useState({});
    const [ segundoFotoA, guardarSegundoFotoA ] = useState([]);
    const [ segundoTextoA, guardarSegundoTextoA ] = useState('');
    const [ segundoFotoB, guardarSegundoFotoB ] = useState([]);
    const [ segundoTextoB, guardarSegundoTextoB ] = useState('');
    const [ fotoA, guardarFotoA ] = useState([]);
    const [ fotoB, guardarFotoB ] = useState([]);
    const [ tercero, guardarTercero ] = useState({
        conclusion: [''],
        falla: [''],
        recomendacion: ['']
    });
    const [ herramienta, guardarHerramienta ] = useState({});
    const [ fotosSeleccion, guardarFotosSeleccion ] = useState([]);
    const [ fotoGaleria, guardarFotoGaleria ] = useState(false);

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

        guardarFotosSeleccion([...fotosPrimero, ...fotosSegundo]);

        guardarFotoA(fotosPrimero);
        guardarFotoB(fotosSegundo);

        guardarSegundoFotoA(await consultarBase(fotosPrimero));
        guardarSegundoFotoB(await consultarBase(fotosSegundo));
        
        guardarSegundoTextoA(textoPrimero);
        guardarSegundoTextoB(textoSegundo);
    }

    const guardarDatosTercero = (datos) => {
        
        const conclusion = datos.conclusion.split("\n");
        const falla = datos.descripcion.split("\n");
        const recomendacion = datos.recomendacion.split("\n");

        if( datos.foto ) {
            guardarFotoGaleria(!fotoGaleria);
        }

        document.querySelector("#info").classList.add("dn");
        document.querySelector("#info").classList.remove("db");
        document.querySelector("#usuarioEmpresa").style.display = "block";

        guardarTercero({
            conclusion,
            falla,
            recomendacion
        });
    }

    const consultarBase = async (fotos) => {
        try {

            if ( fotos[0] === segundoFotoA[0] || fotos[0] === segundoFotoB[0] ) {
                return fotos;
            }
            
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
        if(auth.token !== '' && (auth.tipo === 1) ) {            
            consultarAPI();
        } else {
            navigate('/login', {replace: true});
        }   
    }, [])
    
    return (
        <Fragment>
            <div className="card contenedor" id='info'>
                <div className="card-header">
                    <RiFileList2Line size={50} color={"#333333"}/>
                    <h1>Generar Informe</h1>
                </div>
                <div className="card-body">

                    <div className='top-left'>
                        <Link to={`/ingresos`} className="btn-new btn-error"><ImCancelCircle size={25}/> Cancelar Informe</Link>
                    </div>

                    <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>

                    <BarraProgreso page={page} onPageNumberClick={nextPageNumber} />
                    {
                        {
                            pageone: <InformeParteUno onButtonClick={nextPage} guardarDatosPrimero={guardarDatosPrimero} data={primero} datosInfo={datosInfo} id={id} />,
                            pagetwo: <InformeParteDos onButtonClick={nextPage} guardarDatosSegundo={guardarDatosSegundo} segundoFotoA={segundoFotoA} segundoTextoA={segundoTextoA} segundoFotoB={segundoFotoB} segundoTextoB={segundoTextoB} datosInfo={datosInfo} />,
                            pagethree: <InformeParteTres onButtonClick={nextPage} guardarDatosTercero={guardarDatosTercero} tercero={tercero} datosInfo={datosInfo} />
                        }[page]
                    }
                </div>
            </div>

            <PDF 
                contenido={contenido}
                cotizacion={cotizacion}
                herramientaInfo={herramientaInfo}
                cotizacionBackend={cotizacionBackend}
                contenidoBack={contenidoBack}

                primero={primero}
                segundoFotoA={segundoFotoA}
                segundoTextoA={segundoTextoA}
                segundoFotoB={segundoFotoB}
                segundoTextoB={segundoTextoB}
                tercero={tercero}
                herramienta={herramienta}
                id={id}
                fotoGaleria={fotoGaleria}
                fotosSeleccion={fotosSeleccion}
                fotoA={fotoA}
                fotoB={fotoB}
            />
        
        </Fragment>
    )
}

export default FormInfoCot;