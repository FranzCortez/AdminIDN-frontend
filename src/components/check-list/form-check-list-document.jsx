import { Fragment, useContext, useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormCheckListPart1 from "./form/form-check-list-part-1";
import FormCheckListPart2 from "./form/form-check-list-part-2";
import CheckListDocument from "./check-list-document";
import { CRMContext } from "../context/CRMContext";
import clienteAxios from "../../config/axios.js";
import Swal from "sweetalert2";

function FormCheckListDocument() {
  const { id } = useParams();

  let navigate = useNavigate();

  const [auth, guardarAuth] = useContext(CRMContext);

  const [equipo, setEquipo] = useState({});
  const [tipo, setTipo] = useState(0);
  const [continuar, setContinuar] = useState(1);
  const [recibe, setRecibe] = useState({
    name: "",
    rut: "",
    cargo: "",
    firma: "",
  });

  const [entrega, setEntrega] = useState({
    name: "",
    rut: "",
    cargo: "",
    firma: "",
  });

  const [dataPrimero, setDataPrimero] = useState([
    {
      id: 1,
      condicion: "Se observan componentes sueltos en la herramienta.",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 2,
      condicion:
        "La herramienta se encuentra limpia, sin residuos de aceite, barro, grasa, con pintura en buen estado.",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 3,
      condicion: "Estructura en buen estado",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 4,
      condicion: "Se realizaron pruebas de carga / hidráulicas / torque",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 5,
      condicion:
        "Cuenta con todos sus componentes y dispositivos para ser operado",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 6,
      condicion:
        "Cuenta con etiquetas de QR, aprobación, tonelaje, presión de trabajo, torque",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
  ]);

  const [dataSegundo, setDataSegundo] = useState([
    {
      id: 1,
      condicion: "Cables, conexiones eléctricas, conectores en buen estado",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 2,
      condicion: "Se realizan pruebas de voltaje / amperaje",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 3,
      condicion: "Interruptores y protecciones operativos",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 4,
      condicion: "Cables sin cortes ni empalmes inseguros o fuera de estándar",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 5,
      condicion: "Motor funcionando correctamente",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
  ]);

  const [dataTercero, setDataTercero] = useState([
    {
      id: 1,
      condicion: "Mangueras y acoples revisados y en buen estado",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 2,
      condicion: "Se detectan fugas visibles de aire, aceite, fluidos",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 3,
      condicion: "Se realizaron pruebas de presión / neumáticas de trabajo",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 4,
      condicion: "Cuenta con niveles de aceites correctos",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
  ]);

  const [dataCuarto, setDataCuarto] = useState([
    {
      id: 1,
      condicion: "Conectores/acoples/terminales revisados",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 2,
      condicion: "Calibración realizada",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 3,
      condicion: "Prueba de torque / impacto realizado",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
    {
      id: 4,
      condicion: "Cuenta con niveles de aceites correctos",
      si: false,
      no: false,
      na: false,
      adicional: "",
      observaciones: "",
    },
  ]);

  const [dataEntrega, setDataEntrega] = useState([
    {
      id: 1,
      condicion: "CLIENTE REVISÓ EL EQUIPO Y ESTÁ CONFORME",
      si: false,
      no: false,
      na: false,
      observaciones: "",
    },
    {
      id: 2,
      condicion: "CLIENTE RECIBE GUÍA DE DESPACHO / FACTURA",
      si: false,
      no: false,
      na: false,
      observaciones: "",
    },
    {
      id: 3,
      condicion: "CLIENTE RECIBE CERTIFICADO DE PRUEBA / CALIBRACIÓN",
      si: false,
      no: false,
      na: false,
      observaciones: "",
    },
  ]);

  const handleChangePrimero = (id, value, campo) => {
    setDataPrimero((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              si: ["si", "no", "na"].includes(value) ? value === "si" : item.si,
              no: ["si", "no", "na"].includes(value) ? value === "no" : item.no,
              na: ["si", "no", "na"].includes(value) ? value === "na" : item.na,
              [campo]: ["si", "no", "na"].includes(value) ? true : value,
              selected: ["si", "no", "na"].includes(value)
                ? value
                : item.selected,
            }
          : item
      )
    );
  };

  const handleChangeSegundo = (id, value, campo) => {
    setDataSegundo((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              si: ["si", "no", "na"].includes(value) ? value === "si" : item.si,
              no: ["si", "no", "na"].includes(value) ? value === "no" : item.no,
              na: ["si", "no", "na"].includes(value) ? value === "na" : item.na,
              [campo]: ["si", "no", "na"].includes(value) ? true : value,
              selected: ["si", "no", "na"].includes(value)
                ? value
                : item.selected,
            }
          : item
      )
    );
  };

  const handleChangeTercero = (id, value, campo) => {
    setDataTercero((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              si: ["si", "no", "na"].includes(value) ? value === "si" : item.si,
              no: ["si", "no", "na"].includes(value) ? value === "no" : item.no,
              na: ["si", "no", "na"].includes(value) ? value === "na" : item.na,
              [campo]: ["si", "no", "na"].includes(value) ? true : value,
              selected: ["si", "no", "na"].includes(value)
                ? value
                : item.selected,
            }
          : item
      )
    );
  };

  const handleChangeCuarto = (id, value, campo) => {
    setDataCuarto((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              si: ["si", "no", "na"].includes(value) ? value === "si" : item.si,
              no: ["si", "no", "na"].includes(value) ? value === "no" : item.no,
              na: ["si", "no", "na"].includes(value) ? value === "na" : item.na,
              [campo]: ["si", "no", "na"].includes(value) ? true : value,
              selected: ["si", "no", "na"].includes(value)
                ? value
                : item.selected,
            }
          : item
      )
    );
  };

  const handleChangeEntrega = (id, value, campo) => {
    setDataEntrega((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              si: ["si", "no", "na"].includes(value) ? value === "si" : item.si,
              no: ["si", "no", "na"].includes(value) ? value === "no" : item.no,
              na: ["si", "no", "na"].includes(value) ? value === "na" : item.na,
              [campo]: ["si", "no", "na"].includes(value) ? true : value,
              selected: ["si", "no", "na"].includes(value)
                ? value
                : item.selected,
            }
          : item
      )
    );
  };

  const handleChangeEntregaInfo = (id, value, campo) => {
    if (campo === "recibe") {
      setRecibe({
        ...recibe,
        [id]: value,
      });
    } else {
      setEntrega({
        ...entrega,
        [id]: value,
      });
    }
  };

  const selectionForm = (e) => {
    setTipo(Number(e.target.value));
  };

  const handleContinuar = (numero) => {
    setContinuar(continuar + numero);
  };

  const consultarAPI = async () => {
    try {
      const res = await clienteAxios.get(`ih/doc/checklist/info/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setEquipo(res.data);
    } catch (error) {
      if (error.request.status === 404) {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: error.response.data.msg,
          timer: 1500,
        });
      }
      // redireccionar
      navigate("/ingresos", { replace: true });
    }
  };

  useEffect(() => {
    if (!(auth.auth && localStorage.getItem("token") === auth.token)) {
      navigate("/login", { replace: true });
    } else if (auth.tipo !== 1 && auth.tipo !== 2) {
      navigate("/login", { replace: true });
    }

    consultarAPI();
  }, []);

  return (
    <Fragment>
      <div className="card contenedor">
        <div className="card-header">
          <VscTools size={50} color={"#ebe1e1"} />
          <h1>Checklist salida equipo</h1>
        </div>
        <div className="card-body">
          <div className="top-left">
            <Link to={"/ingresos"} className="btn-new btn-error">
              <IoArrowBackCircleOutline size={25} /> CANCELAR CHECKLIST SALIDA
            </Link>
          </div>

          {continuar === 1 ? (
            <FormCheckListPart1
              tipo={tipo}
              selectionForm={selectionForm}
              dataPrimero={dataPrimero}
              dataSegundo={dataSegundo}
              dataTercero={dataTercero}
              dataCuarto={dataCuarto}
              handleChangePrimero={handleChangePrimero}
              handleChangeSegundo={handleChangeSegundo}
              handleChangeTercero={handleChangeTercero}
              handleChangeCuarto={handleChangeCuarto}
            />
          ) : null}

          {continuar === 2 ? (
            <FormCheckListPart2
              data={dataEntrega}
              handleChange={handleChangeEntrega}
              entrega={entrega}
              recibe={recibe}
              onChange={handleChangeEntregaInfo}
            />
          ) : null}

          {continuar === 3 ? (
            <div style={{ width: "100%", margin: "0 auto" }}>
              <CheckListDocument
              dataPrimero={dataPrimero}
              dataSegundo={dataSegundo}
              dataTercero={dataTercero}
              dataCuarto={dataCuarto}
              dataEntrega={dataEntrega}
              entrega={entrega}
              recibe={recibe}
              equipo={equipo}
              id={id}
            />
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            {continuar !== 1 ? (
              <div className="enviar">
                <input
                  type="submit"
                  className="btn-new btn-return"
                  value="Regresar"
                  onClick={() => handleContinuar(-1)}
                />
              </div>
            ) : (
              <div></div>
            )}

            {continuar !== 3 ? (
              <div className="enviar">
                <input
                  type="submit"
                  className="btn-new btn-success-new"
                  value="Continuar"
                  onClick={() => handleContinuar(1)}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FormCheckListDocument;
