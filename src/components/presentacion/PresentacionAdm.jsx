import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import './presentacion.css'

function PresentacionAdm() {
    
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                <Viewer fileUrl={'presentacion/PRESENTACION IMPACTO DEL NORTE ADMINISTRACION.pdf'} plugins={[defaultLayoutPluginInstance]} ></Viewer>
            </Worker>
        </div>
    )
}

export default PresentacionAdm
