import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import './presentacion.css'

function PresentacionVenta() {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // const toolbarPluginInstance = toolbarPlugin(props?: fullScreenPluginInstance);
    
    return (
        <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                <Viewer fileUrl={'presentacion/Ericka IdN.pdf'} plugins={[]} ></Viewer>
            </Worker>
        </div>
    )
}

export default PresentacionVenta;
