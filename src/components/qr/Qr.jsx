import React, { Fragment, useRef, useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoQrCodeOutline } from "react-icons/io5";
import { BsBoxArrowInRight } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import QrCode from "qrcode.react";

import clienteAxios from '../../config/axios';
import { CRMContext } from '../context/CRMContext';

function Qr() {

    const { id } = useParams();
    
    const [ qrInfo, guardarQrInfo ] = useState({});

    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();   

    

    const qrRef = useRef();

    const descargar = () => {

        let canvas = qrRef.current.querySelector("canvas");
        let imagen = canvas.toDataURL("image/png");
        let archor = document.createElement("a");
        archor.href = imagen;
        archor.download = "qr-demo.png";
        document.body.appendChild(archor);
        archor.click();
        document.body.removeChild(archor);

    }

    const qrCode = (
        <QrCode
            id='qrCodeId'
            size={1000}
            // value={`https://www.impactodelnorte.cl/#/mantencion/${qrInfo.token}/${qrInfo.id}`}
            value={`http://localhost:3000/#/mantencion/${qrInfo.token}/${qrInfo.id}`}
            bgColor="white"
            fgColor="black"
            level='H'
            imageSettings= {{
                src: '/img/LogoIDN.png',
                excavate: true,
                width: 3500 * 0.1,
                height: 1500 * 0.1
            }}
        />
    );

    const consultarAPI = async () => {        
        try {
            const res = await clienteAxios.post(`qr/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            guardarQrInfo(res.data);
            
        } catch (error) {
            console.log(error);
            navigate('/ingresos', { replace: true });
        }
    }

    useEffect(() => {        
        if(auth.token === '' && (auth.tipo !== 1 || auth.tipo !== 2 || auth.tipo !== 3 ) ) {
            navigate('/login', {replace: true});
        }  
        consultarAPI();
    }, []); 

    return (
        <Fragment>

            <div className="card contenedor">
                <div className="card-header">
                    <BsBoxArrowInRight size={50} color={"#333333"}/>
                    <IoQrCodeOutline size={50} color={"#333333"}/>
                    <h1>Generar Código Qr</h1>
                </div>
                <div className="card-body">

                    <div className='qr'>
                        <Link 
                            to={"/ingresos"}
                        >
                            <div 
                                id="btnCrearPdf" 
                                className='btn-new btn-login' 
                                onClick={descargar}
                            >
                                Descargar 
                                <AiOutlineDownload size={25} />
                            </div>
                        </Link>

                        <div ref={qrRef} className="qr_code">
                            {qrCode}
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Qr;
