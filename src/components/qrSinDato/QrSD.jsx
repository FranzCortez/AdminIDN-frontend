import React, { Fragment, useRef, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoQrCodeOutline } from "react-icons/io5";
import { BsBoxArrowInRight } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import QrCode from "qrcode.react";

import { CRMContext } from '../context/CRMContext';

function QrSD({ mantencion }) {
    
    // usar context
    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();      

    const qrRef = useRef();

    const descargar = () => {

        const canvas = qrRef.current.querySelector("canvas");
        const imagen = canvas.toDataURL("image/png");
        const archor = document.createElement("a");
        archor.href = imagen;
        archor.download = `QR-OTIN ${mantencion?.cliente}.png`;
        document.body.appendChild(archor);
        archor.click();
        document.body.removeChild(archor);

    }
    
    const qrCode = (
        <QrCode
            id='qrCodeId'
            size={1000}
            value={`https://impactodelnorte.cl/#/mantencion/b/${mantencion?.mantencion}/${mantencion?.proxima}/${mantencion?.nserie}/${mantencion?.modelo}/${mantencion?.marca}/${mantencion?.cliente}/${mantencion?.equipo}`}
            // value={`http://localhost:3000/#/mantencion/b/${mantencion?.mantencion}/${mantencion?.proxima}/${mantencion?.nserie}/${mantencion?.modelo}/${mantencion?.marca}/${mantencion?.cliente}/${mantencion?.equipo}`}
            bgColor="white"
            fgColor="black"
            level='H'
            // imageSettings= {{
            //     src: '/img/LogoIDN.png',
            //     excavate: true,
            //     width: 3500 * 0.1,
            //     height: 1500 * 0.1
            // }}
        />
    );
    
    useEffect(() => {        
        if(auth.token === '' && (auth.tipo !== 1 || auth.tipo !== 2 || auth.tipo !== 3 ) ) {
            navigate('/login', {replace: true});
        }
    }, [mantencion]); 

    return (
        <Fragment>

            <div className="card contenedor" id='usuarioEmpresa'>
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

export default QrSD
