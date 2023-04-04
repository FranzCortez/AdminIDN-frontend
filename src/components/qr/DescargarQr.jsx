import { useState, useEffect, useContext, Fragment, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";
import { IoQrCodeOutline } from "react-icons/io5";
import { AiOutlineDownload } from "react-icons/ai";

import QrCode from "qrcode.react";

import clienteAxios from "../../config/axios";
import { CRMContext } from "../context/CRMContext";

function DescargarQr() {

    const { id } = useParams();

    const qrRef = useRef();

    const [ qr, guardarQr ] = useState({});

    const [ auth, guardarAuth ] = useContext(CRMContext);

    let navigate = useNavigate();

    const descargar = () => {

        const canvas = qrRef.current.querySelector("canvas");
        const imagen = canvas.toDataURL("image/png");
        const archor = document.createElement("a");
        archor.href = imagen;
        archor.download = `QR-OTIN ${qr.otin}.png`;
        document.body.appendChild(archor);
        archor.click();
        document.body.removeChild(archor);

    }

    const qrCode = (
        <QrCode
            id='qrCodeId'
            size={1000}
            value={`https://impactodelnorte.cl/#/mantencion/${qr.token}/${qr.id}`}
            // value={`http://localhost:3000/#/mantencion/${token}/${id}`}
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
            
            const res = await clienteAxios.get(`qr/info/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            guardarQr(res.data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(auth.token === '' && (auth.tipo !== 1 || auth.tipo !== 2 || auth.tipo !== 3 ) ) {
            navigate('/login', {replace: true});
        }
        consultarAPI();
    },[])

    return (
        <Fragment>

            <div className="card contenedor">
                <div className="card-header">
                    <BsBoxArrowInRight size={50} color={"#333333"}/>
                    <IoQrCodeOutline size={50} color={"#333333"}/>
                    <h1>Descargar Código Qr</h1>
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

export default DescargarQr;