import React, { Fragment, useContext, useEffect, useState } from 'react';
import { FaIdCardAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../../config/axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TarjetaEgreso from './TarjetaEgreso';
import moment from 'moment';
import { parseVulgars } from 'vulgar-fractions';


function FormTarjetaEgreso() {
  // usar context
  const [auth, guardarAuth] = useContext(CRMContext);

  const [otinTarjetaModificada, saveOtinTarjetaModificada] = useState({});

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

  const consultarAPI = async () => {
    try {

      const res = await clienteAxios.post('ih/ingreso/tarjeta', { otin }, {
        headers: {
            Authorization: `Bearer ${auth.token}`
        }
    });

    console.log(res.data);

    saveOtinTarjetaModificada({
      fecha: moment(res?.data?.fecha).format('DD-MM-YYYY'),
      fechaprox: moment(res?.data?.fechaprox).format('DD-MM-YYYY'),
      empresaNombre: res?.data?.clienteContacto?.clienteEmpresa?.nombre,
      otin: res?.data?.otin,
      equipoNombre: res?.data?.tipoHerramientum?.nombre,
      modelo: res?.data?.modelo,
      marca: res?.data?.marca,
      numeroSerie: res?.data?.numeroSerie,
      numeroInterno: res?.data?.numeroInterno,
      rango: res?.data?.rango,
      tonelaje: res?.data?.tonelaje,
      tecnico: res?.data?.tecnico
    });

  } catch (error) {
      console.log(error)
  }
  }

  const actualizarState = e => {

    saveOtinTarjetaModificada({
        ...otinTarjetaModificada,
        [e.target.name] : parseVulgars(e.target.value)
    });
  }

  useEffect(() => {
    if(auth.token !== '' && (auth.tipo === 1 || auth.tipo === 2 || auth.tipo === 4) ) {            
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

          <div className='tarjeta_campo'>
            <h3 className='tarjeta_titulo'>Campos:</h3>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">Mantención realizada:</label>
              <textarea rows={1} name="fecha" id="mantrealizada" defaultValue={otinTarjetaModificada?.fecha} onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">Prox. mantención:</label>
              <textarea rows={1} name="fechaprox" id="mantrealizada" defaultValue={otinTarjetaModificada?.fechaprox} onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">Empresa/sucursal:</label>
              <textarea rows={1} name="empresaNombre" id="mantrealizada" defaultValue={otinTarjetaModificada?.empresaNombre} onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">OTIN:</label>
              <textarea rows={1} name="otin" id="mantrealizada" defaultValue={otinTarjetaModificada?.otin} onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">Tipo equipo:</label>
              <textarea rows={1} name="equipoNombre" id="mantrealizada" defaultValue={otinTarjetaModificada?.equipoNombre} onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">Modelo:</label>
              <textarea rows={1} name="modelo" id="mantrealizada" defaultValue={otinTarjetaModificada?.modelo} onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">Marca:</label>
              <textarea rows={1} name="marca" id="mantrealizada" defaultValue={otinTarjetaModificada?.marca} onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">N°Serie:</label>
              <textarea rows={1} name="numeroSerie" id="mantrealizada" defaultValue={otinTarjetaModificada?.numeroSerie} onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">N°Interno:</label>
              <textarea rows={1} name="numeroInterno" id="mantrealizada" defaultValue={otinTarjetaModificada?.numeroInterno} onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">Rango de trabajo:</label>
              <textarea rows={1} name="rango" id="mantrealizada" onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">Tonelaje:</label>
              <textarea rows={1} name="tonelaje" id="mantrealizada" onChange={actualizarState}></textarea>
            </div>

            <div className="tarjeta_input_campo">
              <label htmlFor="mantrealizada">Técnico:</label>
              <textarea rows={1} name="tecnico" id="mantrealizada" defaultValue={otinTarjetaModificada?.tecnico} onChange={actualizarState}></textarea>
            </div>
          </div>

          <button onClick={handleDownload} style={styles.boton}>Descargar como PDF</button>
          <div className="card-body-tarjeta">
            <TarjetaEgreso otinTarjeta={otinTarjetaModificada}></TarjetaEgreso>
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

export default FormTarjetaEgreso;
