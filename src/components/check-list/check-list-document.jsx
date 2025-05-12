import html2pdf from "html2pdf.js";
import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CheckListInfoTable from "./components/document/check-list-info-table";
import CheckListTable from "./components/document/check-list-table";
import CheckListTableEntrega from "./components/document/check-list-table-entrega";
import CheckListInfoTableEntrega from "./components/document/check-list-info-table-entrega";
import moment from "moment";
import clienteAxios from "../../config/axios";
import { CRMContext } from "../context/CRMContext";
import Swal from "sweetalert2";
import { AiOutlineDownload } from "react-icons/ai";

function CheckListDocument({
    id,
    equipo,
    dataPrimero,
    dataSegundo,
    dataTercero,
    dataCuarto,
    dataEntrega,
    entrega,
    recibe
}) {

    const navigate = useNavigate();
  const [auth, guardarAuth] = useContext(CRMContext);

    const pdfcrear = () => {
        
        html2pdf()
        .set({
        margin: [0, 0, 0, 0], // Márgenes en mm (arriba, derecha, abajo, izquierda)
        filename: `salida_OTIN ${equipo.otin}.pdf`,
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2, // Reduce la escala para evitar problemas de tamaño
            letterRendering: true,
            useCORS: true
        },
        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: 'portrait'
        }
    })
        .from(document.querySelector("#pdf"))
        .save()
        .toPdf()
        .output('blob')
        .then( async function (pdf) {

            const file = new File(
                [pdf],
                `salida_OTIN ${equipo.otin}.pdf`,
                {type: 'application/pdf'}
            ); 

            const formData = new FormData();        
            formData.append("document", file);
    
            try {

                const res = await clienteAxios.post(`ih/doc/checklist/${id}`, formData,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });       
                
                Swal.fire({
                    title: 'Ingreso Realizado con Exito',
                    text: res.data.msg,
                    timer: 1500
                })
    
            } catch (error) {
                console.log(error)
                if(error.request.status === 404 ) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Error al guardar el informe',
                        timer: 1500
                    })
                }
                // redireccionar
            }            

            navigate('/ingresos', {replace: true});
        });
    }

  return (
    <Fragment>

    <div 
                className='btn-new btn-login' 
                onClick={pdfcrear}
            >
                Guardar y Descargar Checklist de Salida
                <AiOutlineDownload size={25} />
            </div>

      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <div
          id="pdf"
        style={{
            width: "210mm",
            height: "296.5mm",
            boxSizing: "border-box",
            fontFamily: "Arial, sans-serif",
            fontSize: "10pt",
            lineHeight: "1.5",
            backgroundColor: "#ffffff",
            overflow: "hidden", 
            padding: "5px 20px"
        }}
      >

        <img src="img/informe/arriba.png" alt="" style={{width: "100%"}} />

        <div style={{ textAlign: "center", marginTop: "5px",  }}>

            <CheckListInfoTable 
                cliente={equipo.cliente}
                marca={equipo.marca}
                modelo={equipo.modelo}
                fecha={moment(new Date()).format('DD-MM-YYYY')}
                numeroInterno={equipo.numeroInterno}
                numeroSerie={equipo.numeroSerie}
                otin={equipo.otin}
                tecnicoResponsable={equipo.tecnico}
                tipoHerramienta={equipo.tipoHerramienta}
/>

            <div style={{ marginTop: "5px", textAlign: "left" }}>
                <CheckListTable condicion="CONDICIONES GENERALES DEL EQUIPO" adicional="---------" data={dataPrimero} />
                <CheckListTable primero={false} condicion="CONDICIONES DE HERRAMIENTAS ELÉCTRICAS " adicional="---------" data={dataSegundo} />
                <CheckListTable primero={false} condicion="CONDICIONES DE HERRAMIENTAS HIDRÁULICAS / NEUMÁTICAS" adicional="PSI/BAR" data={dataTercero} />
                <CheckListTable primero={false} condicion="CONDICIONES DE HERRAMIENTAS TORQUE / IMPACTO" adicional="NM/FT-LB" data={dataCuarto} />
            </div>

            <div style={{ marginTop: "10px", textAlign: "left" }}>
                <CheckListTableEntrega primero={false} condicion="DOCUMENTACIÓN ENTREGADA" data={dataEntrega} />
            </div>

            <div style={{ textAlign: "left" }}>
                <CheckListInfoTableEntrega
                    entrega={entrega}
                    recibe={recibe}
                />
            </div>

        </div>


        <img src="img/informe/abajo.png" alt="" style={{width: "100%"}} />
      </div>
      </div>
    </Fragment>
  );
}

export default CheckListDocument;
