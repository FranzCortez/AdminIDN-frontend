import React, { Fragment } from 'react';
import html2pdf from "html2pdf.js"
import moment from 'moment';

function Informe({ primero, segundoFotoA, segundoTextoA, segundoFotoB, segundoTextoB, tercero, herramienta }) {

    const pdfcrear = () => {

        // ca();
        // console.log(document.getElementById(3));
        // var base64 = getBase64Image(document.getElementById(3));
        // console.log(base64)

        html2pdf()
        .set({
            margin: 0,
            filename: `cotizacion ${herramienta.otin}.pdf`,
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 3, // A mayor escala, mejores gráficos
                letterRendering: true,
                useCORS: true
            },
            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: 'portrait' // landscape o portrait
            }
        })
        .from(document.querySelector("#pdf"))
        .save()
        .toPdf()
        .output('blob')
        .then( async function (pdf) {

            const file = new File(
                [pdf],
                `cotizacion ${herramienta.otin}.pdf`,
                {type: 'application/pdf'}
            ); 

            // const formData = new FormData();        
            // formData.append("document", file);
            // formData.append("data", JSON.stringify(cotizacionBackend))
    
            // try {

            //     const res = await clienteAxios.post(`ih/ingreso/pdf`, formData,{
            //         headers: {
            //             Authorization: `Bearer ${auth.token}`
            //         }
            //     });       
                
            //     Swal.fire({
            //         title: 'Cotización Realizada con Exito',
            //         text: res.data.msg,
            //         timer: 1500
            //     })
    
            // } catch (error) {
            //     console.log(error)
            //     if(error.request.status === 404 ) {
            //         Swal.fire({
            //             type: 'error',
            //             title: 'Hubo un error',
            //             text: 'Error al guardar la cotización',
            //             timer: 1500
            //         })
            //     }
            //     // redireccionar
            //     navigate('/ingresos', {replace: true});
            // }            
        });
    }


    const toDataUrl = async function (url, callback) {
      //Convert to base64
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = () => {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          });
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
      });
    };

    const ca = () => {
        console.log("hola")
        var c=document.getElementById("myCanvas");
        console.log(c)
        var ctx=c.getContext("2d");
        console.log(ctx)
        console.log(segundoFotoB)
        segundoFotoB.map(foto => {
            console.log(foto)
            var img=document.getElementById(foto);
            console.log(img)
            ctx.drawImage(img,10,10);
        })
    };


    async function  exportToPDF() {
  
        // variables as  example
        let imagesUrls = [
          "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
          "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
          "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
        ];
        let content = "";
        content += "<h1> Test of html2pdf </h1>";
  
        //Converting to base 64 and adding to content
        for (let url of imagesUrls) {
          let urlBase64 = await toDataUrl(url);
          content += '<img src="' + urlBase64 + '" width="600" ><br>';
        }
        content += "<h3> End of test </h3>";
    
        // Images do not appear as "content" is changed after the call (asynchronous call to ToDataUrl)
    }

    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        console.log(canvas)
        console.log(ctx)
        var dataURL = canvas.toDataURL("image/jpeg");
        return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    }      
    
    return (

        <Fragment>
            <div 
                id="btnCrearPdf" 
                className='btn-new btn-login' 
                onClick={pdfcrear}
            >
                Descargar 
            </div>        

            <div id='pdf' className='pdf'>
                <div className='pdf__titulo'>
                    <h1>Informe técnico y registro fotográfico</h1>
                    
                    <div className='pdf__titulo-data'>

                        <img src="/img/LogoIDN.png" alt="Logo Impacto del Norte" className='pdf__titulo-logo' />

                        <div className='pdf__titulo-dueño'>
                            <h2>ALBERTO GARCIA LOPEZ</h2>
                            <h2>REPARACIONES Y MANTENCION E.I.R.L</h2>
                            <h2>R.U.T 76.546.349-1</h2>
                        </div>

                        <h2 className='pdf__titulo-otin'>OTIN {herramienta?.otin}</h2>
                    </div>

                    <div className='pdf__titulo-bloque-info'>
                        <div className='pdf__titulo-info'>
                            <div className='pdf__titulo-campo'>
                                <p><span>SEÑOR (ES): </span>{herramienta?.clienteContacto?.clienteEmpresa?.nombre}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>EQUIPO: </span>{herramienta?.nombre}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>MODELO: </span>{herramienta?.modelo}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>FECHA: </span>{moment(primero?.fecha).format('DD/MM/YYYY')}</p>
                            </div>
                        </div>

                        <div className='pdf__titulo-info'>
                            <div className='pdf__titulo-campo'>
                                <p><span>MARCA DE EQUIPO: </span>{herramienta?.marca}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>N° DE SERIE: </span>{herramienta?.numeroSerie}</p>
                            </div>

                            <div className='pdf__titulo-campo'>
                                <p><span>TÉCNICO A CARGO: </span>{primero?.nombre}</p>
                            </div>
                        </div>
                    </div>
                </div>        

                <div className='pdf__herramienta info__falla-cliente'>
                    <table className="table table-hover">
                        <thead>
                            <tr className='table__head'>
                                <th scope="col">FALLA INDICADA POR EL CLIENTE O DETECTADA AL INGRESAR LA HERRAMIENTA.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='table__tr'>
                                <td>{primero?.falla}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='pdf__componente info__cuerpo'>

                    <div className='info__table' >
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__tr'>
                                    <td>
                                        {
                                            segundoFotoA?.length > 0 ? 
                                            segundoFotoA?.map( (foto, index) => (                                            
                                                <img className='info__img' src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}${foto}`} alt="" key={index} id={index*3} crossOrigin="anonymous" />
                                            ))
                                            :
                                            <p>No existen imagenes</p>
                                        }
                                        {/* <img className='info__img' src={`data:image/jpeg;base64,${segundoFotoA}`} alt="" /> */}
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table__head'>
                                    <th scope="col" colSpan={3}>{segundoTextoA}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className='info__table' >
                        <table className="table table-hover">
                            <thead>
                                <tr className='table__tr'>
                                    <td>
                                        {
                                            segundoFotoB?.length > 0 ? 
                                            segundoFotoB?.map( (foto, index) => (                                            
                                                <img className='info__img' src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}${foto}`} alt="" key={index} id={foto} />
                                            ))
                                            :
                                            <p>No existen imagenes</p>
                                        }
                                        {/* <img className='info__img' src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}/images/6XUCpGd4pA.jpeg`} alt="" /> */}
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table__head'>
                                    <th scope="col" colSpan={3}>{segundoTextoB}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                
                <div className='pdf__pie-compra info__falla__titulo'>
                    <h2 className=''>OBSERVACIONES Y CONDICIONES GENERALES EN LA QUE SE ENCUENTRA EL EQUIPO, Y/O MEJORAS SUGERIDAS</h2>
                    <div className='info__falla'>
                        <h4>Equipo presenta las siguientes fallas:</h4>
                        <p>{tercero?.falla}</p>
                        
                        {
                            tercero?.conclusion?.length > 0 ? 
                            <Fragment>
                                <h4>CONCLUSIONES GENERALES:</h4>
                                <p>{tercero?.conclusion}</p>
                            </Fragment>
                            :
                            ''
                        }

                        {
                            tercero?.recomendacion?.length > 0 ? 
                            <Fragment>
                                <h4>RECOMENDACIONES  Y/O MEJORAS:</h4>
                                <p>{tercero?.recomendacion}</p>
                            </Fragment>
                            :
                            ''
                        }
                        
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default Informe;
