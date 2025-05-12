function CheckListInfoTableEntrega({
  entrega,
  recibe
}) {
  return (
    <div style={{ width: "100%" }}>
      <table style={{ width: "100%", padding: "10px 0", fontSize: "8pt", textAlign: "left", textTransform: "uppercase" }}>
        <tr>
          <td colSpan={2} style={{padding: "10px 5px 10px 5px", fontWeight: 'bold', fontSize: "9pt", width: "50%"}}>ENTREGA: RESPONSABLE, JEFE DE TALLER</td>
          <td colSpan={2} style={{padding: "10px 5px 10px 5px", fontWeight: 'bold', fontSize: "9pt", width: "50%"}}>RECIBE: CLIENTE / TRANSPORTISTA</td>
        </tr>

        <tr>
          <td style={{border: "1px solid #bebebe", padding: "10px 5px 10px 5px", width: "10%"}}>NOMBRE</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 0"}}>{entrega.name}</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 5px 10px 5px", width: "10%"}}>NOMBRE</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 0"}}>{recibe.name}</td>
        </tr>

        <tr>
          <td style={{border: "1px solid #bebebe", padding: "10px 5px 10px 5px", width: "10%"}}>RUT</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 0"}}>{entrega.rut}</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 5px 10px 5px", width: "10%"}}>RUT</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 0"}}>{recibe.rut}</td>
        </tr>

        <tr>
          <td style={{border: "1px solid #bebebe", padding: "10px 5px 10px 5px", width: "10%"}}>cargo</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 0"}}>{entrega.cargo}</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 5px 10px 5px", width: "10%"}}>cargo</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 0"}}>{recibe.cargo}</td>
        </tr>

        <tr>
          <td style={{border: "1px solid #bebebe", padding: "0 5px 0 5px", width: "10%"}}>firma</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 0"}}>
            <img src={entrega.firma} alt=""
                style={{ width: "150px", height: "50px" }} />
          </td>
          <td style={{border: "1px solid #bebebe", padding: "0 5px 0 5px", width: "10%"}}>firma</td>
          <td style={{border: "1px solid #bebebe", padding: "10px 0"}}>
            <img src={recibe.firma} alt=""
                style={{ width: "150px", height: "50px" }} />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default CheckListInfoTableEntrega;