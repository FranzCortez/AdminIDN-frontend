import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

function FormInfoEntregaCheckList({ entrega, recibe, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null); // Para saber si es "entrega" o "recibe"
  const signatureRef = useRef(null);

  const handleOpenModal = (field) => {
    setCurrentField(field);
    setIsModalOpen(true);
  };

  const handleSaveSignature = () => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current.toDataURL(); // Obtiene la firma como base64
      onChange("firma", signatureData, currentField); // Guarda la firma en el estado correspondiente
    }
    setIsModalOpen(false);
  };

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear(); // Limpia el canvas
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <table
        style={{
          width: "100%",
          padding: "10px 0",
          fontSize: "8pt",
          textAlign: "left",
          textTransform: "uppercase",
        }}
      >
        <tr>
          <td
            colSpan={2}
            style={{
              padding: "10px 5px 10px 5px",
              fontWeight: "bold",
              fontSize: "9pt",
              width: "50%",
            }}
          >
            ENTREGA: RESPONSABLE, JEFE DE TALLER
          </td>
          <td
            colSpan={2}
            style={{
              padding: "10px 5px 10px 5px",
              fontWeight: "bold",
              fontSize: "9pt",
              width: "50%",
            }}
          >
            RECIBE: CLIENTE / TRANSPORTISTA
          </td>
        </tr>

        <tr>
          <td
            style={{
              border: "1px solid #bebebe",
              padding: "10px 5px 10px 5px",
              width: "10%",
            }}
          >
            NOMBRE
          </td>
          <td style={{ border: "1px solid #bebebe", padding: "10px 0" }}>
            <input
              style={{ width: "100%", fontSize: "8pt" }}
              type="text"
              name={`entrega-${entrega.name}`}
              value={entrega.name}
              onChange={(e) => onChange("name", e.target.value, "entrega")}
            />
          </td>
          <td
            style={{
              border: "1px solid #bebebe",
              padding: "10px 5px 10px 5px",
              width: "10%",
            }}
          >
            NOMBRE
          </td>
          <td style={{ border: "1px solid #bebebe", padding: "10px 0" }}>
            <input
              style={{ width: "100%", fontSize: "8pt" }}
              type="text"
              name={`recibe-${recibe.name}`}
              value={recibe.name}
              onChange={(e) => onChange("name", e.target.value, "recibe")}
            />
          </td>
        </tr>

        <tr>
          <td
            style={{
              border: "1px solid #bebebe",
              padding: "10px 5px 10px 5px",
              width: "10%",
            }}
          >
            RUT
          </td>
          <td style={{ border: "1px solid #bebebe", padding: "10px 0" }}>
            <input
              style={{ width: "100%", fontSize: "8pt" }}
              type="text"
              name={`entrega-${entrega.rut}`}
              value={entrega.rut}
              onChange={(e) => onChange("rut", e.target.value, "entrega")}
            />
          </td>
          <td
            style={{
              border: "1px solid #bebebe",
              padding: "10px 5px 10px 5px",
              width: "10%",
            }}
          >
            RUT
          </td>
          <td style={{ border: "1px solid #bebebe", padding: "10px 0" }}>
            <input
              style={{ width: "100%", fontSize: "8pt" }}
              type="text"
              name={`recibe-${recibe.rut}`}
              value={recibe.rut}
              onChange={(e) => onChange("rut", e.target.value, "recibe")}
            />
          </td>
        </tr>

        <tr>
          <td
            style={{
              border: "1px solid #bebebe",
              padding: "10px 5px 10px 5px",
              width: "10%",
            }}
          >
            cargo
          </td>
          <td style={{ border: "1px solid #bebebe", padding: "10px 0" }}>
            <input
              style={{ width: "100%", fontSize: "8pt" }}
              type="text"
              name={`entrega-${entrega.cargo}`}
              value={entrega.cargo}
              onChange={(e) => onChange("cargo", e.target.value, "entrega")}
            />
          </td>
          <td
            style={{
              border: "1px solid #bebebe",
              padding: "10px 5px 10px 5px",
              width: "10%",
            }}
          >
            cargo
          </td>
          <td style={{ border: "1px solid #bebebe", padding: "10px 0" }}>
            <input
              style={{ width: "100%", fontSize: "8pt" }}
              type="text"
              name={`recibe-${recibe.cargo}`}
              value={recibe.cargo}
              onChange={(e) => onChange("cargo", e.target.value, "recibe")}
            />
          </td>
        </tr>

        <tr>
          <td
            style={{
              border: "1px solid #bebebe",
              padding: "10px 5px 10px 5px",
              width: "10%",
            }}
          >
            firma
          </td>
          <td style={{ border: "1px solid #bebebe", padding: "10px 0" }}>
            <button className='btn-new btn-login' onClick={() => handleOpenModal("entrega")}>Firmar</button>
            {entrega.firma && (
              <img
                src={entrega.firma}
                alt="Firma entrega"
                style={{ width: "100px", height: "50px", marginTop: "10px" }}
              />
            )}
          </td>
          <td
            style={{
              border: "1px solid #bebebe",
              padding: "10px 5px 10px 5px",
              width: "10%",
            }}
          >
            firma
          </td>
          <td style={{ border: "1px solid #bebebe", padding: "10px 0" }}>
            <button className='btn-new btn-login' onClick={() => handleOpenModal("recibe")}>Firmar</button>
            {recibe.firma && (
              <img
                src={recibe.firma}
                alt="Firma recibe"
                style={{ width: "100px", height: "50px", marginTop: "10px" }}
              />
            )}
          </td>
        </tr>
      </table>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>Firma</h3>
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                width: 500,
                height: 200,
                className: "sigCanvas",
                style: { border: "1px solid #bebebe" },
              }}
            />
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleSaveSignature} style={{ marginRight: "10px" }}
          className="btn-new btn-success-new">
                Guardar
              </button>
              <button className="btn-new btn-return" onClick={handleClearSignature} style={{ marginRight: "10px" }}>
                Limpiar
              </button>
              <button className="btn-new btn-error" onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormInfoEntregaCheckList;
