import React, { Fragment, useContext, useEffect, useState } from 'react';
import { FaIdCardAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';
import Tarjeta from './Tarjeta';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function FormTarjeta() {
  // usar context
  const [auth, guardarAuth] = useContext(CRMContext);

  const [ otinTarjeta, guardarOtinTarjeta ] = useState({});

  let navigate = useNavigate();

  const handleDownload = () => {
    const element = document.getElementById('imagen-contenedor');
    html2canvas(element, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [1062, 1417 ] // 9 cm x 12 cm en píxeles a 300 ppi
      });
      pdf.addImage(imgData, 'PNG', 0, 0, 1062, 1417);
      pdf.save('imagen-descargable.pdf');
    });
  };

  const { otin } = useParams();

  console.log(otin);

  const consultarAPI = async () => {
    try {

      const res = await clienteAxios.post('ih/ingreso/tarjeta', { otin }, {
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    });
      
    console.log(res.data);

    guardarOtinTarjeta(res.data);

  } catch (error) {
      console.log(error)
  }
  }

  useEffect(() => {
    if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2) ) {            
        consultarAPI();
    }  
}, []);

  return (
    <Fragment>
      <div className="card contenedor">
        <div className="card-header">
          <FaIdCardAlt size={50} color={"#333333"}/>
          <h1>Generar Tarjeta Ingreso</h1>
        </div>
        <div className="card-body">

          <div className='top-left'>
            <Link to={'/ingresos'} className="btn-new btn-error"><IoArrowBackCircleOutline size={25}/> Cancelar Tarjeta</Link>
          </div>

          <h2 className='card-body-subtitle'> Llene todos los campos según corresponda: </h2>
          <h3 className='card-body-subtitle'> Todos los campos son editables, las areas de texto son modificables, mientras no se salga del cuadro amarillo: </h3>

            <button onClick={handleDownload} style={styles.boton}>Descargar como PDF</button>
          <div className="card-body-tarjeta">
            <Tarjeta otinTarjeta={otinTarjeta}></Tarjeta>
          </div>
        </div>
      </div>        
  </Fragment>
    
  );
}

const styles = {
  
  boton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
}

export default FormTarjeta;
